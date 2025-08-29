import * as xlsx from 'xlsx';
import type { ParsedData, School, Score, SupportLevel } from '../types';
import { ALL_SCORE_FIELDS, FIELD_HEBREW_MAP } from '../constants';

const createEmptySchool = (id: number): School => {
    const school: any = {
        id, name: '', principal: '', students: '', supportLevel: '', notes: ''
    };
    ALL_SCORE_FIELDS.forEach(field => {
        school[field] = '';
    });
    return school as School;
};

const parseRow = (row: any[], columnIndexMap: (keyof School | string)[]): School => {
    const school = createEmptySchool(0); // ID will be assigned later
    row.forEach((value, i) => {
        const field = columnIndexMap[i] as keyof School;
        if (field && school.hasOwnProperty(field)) {
            (school as any)[field] = String(value || '').trim();
        }
    });
    return school;
}

const getColumnIndexMap = (headers: string[]): (keyof School | string)[] => {
    const reversedHebrewMap = Object.entries(FIELD_HEBREW_MAP).reduce((acc, [key, val]) => {
        // Normalize headers for robust matching
        acc[val.trim().toLowerCase()] = key as keyof School;
        return acc;
    }, {} as Record<string, keyof School>);

    const fieldMap: Record<string, keyof School> = { ...reversedHebrewMap };
    const baseMappings: [string[], keyof School][] = [
        [['שם בית הספר', 'בית ספר', 'school name', 'school'], 'name'],
        [['שם המנהל/ת', 'מנהל/ת', 'מנהל', 'principal'], 'principal'],
        [["מספר תלמידים", "מס' תלמידים", 'תלמידים', 'students'], 'students'],
        [['רמת ליווי', 'ליווי', 'support level'], 'supportLevel'],
        [['הערות', 'notes'], 'notes'],
    ];
    baseMappings.forEach(([variations, field]) => {
        variations.forEach(v => fieldMap[v.trim().toLowerCase()] = field);
    });

    return headers.map(header => fieldMap[header.trim().toLowerCase()] || header);
}


const parseSchoolsFromCSV = (csvText: string): School[] => {
    let text = csvText;
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

    const rows = text.split(/\r?\n/).filter(row => row.trim() !== '');
    if (rows.length < 2) throw new Error("CSV must have a header row and at least one data row.");

    const headerRow = rows[0];
    const dataRows = rows.slice(1);
    const delimiter = [',', ';', '\t'].sort((a, b) => headerRow.split(b).length - headerRow.split(a).length)[0];
    const headers = headerRow.split(delimiter).map(h => h.trim().replace(/"/g, ''));
    
    const columnIndexMap = getColumnIndexMap(headers);

    return dataRows.map((rowStr, index) => {
        const values = rowStr.split(delimiter).map(v => v.trim().replace(/"/g, ''));
        const school = parseRow(values, columnIndexMap);
        school.id = index + 1;
        if (!school.name) school.name = `בית ספר ${index + 1}`;
        return school;
    });
};

const parseSchoolsFromXLSX = (data: ArrayBuffer): School[] => {
    const workbook = xlsx.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    if (json.length < 2) throw new Error("Excel must have a header row and at least one data row.");

    const headers = (json[0] as any[]).map(h => String(h || '').trim());
    const dataRows = json.slice(1);
    
    const columnIndexMap = getColumnIndexMap(headers);
    
    return dataRows.map((row: any[], index) => {
        const school = parseRow(row, columnIndexMap);
        school.id = index + 1;
        if (!school.name) school.name = `בית ספר ${index + 1}`;
        return school;
    });
};

export const parseFile = async (file: File): Promise<ParsedData> => {
    const reader = new FileReader();
    const schools: School[] = await new Promise((resolve, reject) => {
        reader.onload = (event) => {
            try {
                const result = event.target?.result;
                if (!result) {
                    reject(new Error("Failed to read file."));
                    return;
                }

                const fileName = (file.name || '').toLowerCase().trim();
                const mimeType = (file.type || '').toLowerCase();

                const looksLikeExcelByName = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
                const looksLikeExcelByMime = mimeType.includes('spreadsheetml') || mimeType.includes('ms-excel');
                const looksLikeCsvByName = fileName.endsWith('.csv') || fileName.endsWith('.txt');
                const looksLikeCsvByMime = mimeType.includes('text/csv') || mimeType.includes('csv') || mimeType.includes('text/plain');

                // We always read as ArrayBuffer first for robust detection
                const arrayBuffer = result as ArrayBuffer;

                const tryParseExcel = (): School[] => {
                    const wb = xlsx.read(arrayBuffer, { type: 'array' });
                    const sheetName = wb.SheetNames[0];
                    if (!sheetName) throw new Error('Workbook contains no sheets');
                    const ws = wb.Sheets[sheetName];
                    const json: any[][] = xlsx.utils.sheet_to_json(ws, { header: 1 });
                    if (!Array.isArray(json) || json.length < 2) throw new Error('Excel must have a header row and at least one data row.');
                    const headers = (json[0] as any[]).map(h => String(h || '').trim());
                    const dataRows = json.slice(1);
                    const columnIndexMap = getColumnIndexMap(headers);
                    return dataRows.map((row: any[], index) => {
                        const school = parseRow(row, columnIndexMap);
                        school.id = index + 1;
                        if (!school.name) school.name = `בית ספר ${index + 1}`;
                        return school;
                    });
                };

                const tryParseCsv = (): School[] => {
                    const decoder = new TextDecoder('utf-8');
                    const text = decoder.decode(new Uint8Array(arrayBuffer));
                    return parseSchoolsFromCSV(text);
                };

                if (looksLikeExcelByName || looksLikeExcelByMime) {
                    resolve(tryParseExcel());
                    return;
                }
                if (looksLikeCsvByName || looksLikeCsvByMime) {
                    resolve(tryParseCsv());
                    return;
                }

                // Fallback: detect by magic number for XLSX (PK\x03\x04 as ZIP) and try both
                const signature = new Uint8Array(arrayBuffer.slice(0, 4));
                const isZip = signature[0] === 0x50 && signature[1] === 0x4B; // 'PK'
                if (isZip) {
                    try {
                        resolve(tryParseExcel());
                        return;
                    } catch (e) {
                        // fallthrough
                    }
                }
                // Try CSV as last resort
                try {
                    resolve(tryParseCsv());
                    return;
                } catch (e) {
                    reject(new Error("Unsupported or corrupted file. Please upload a valid CSV or Excel file."));
                    return;
                }
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });

    return {
        schools,
        metadata: {
            fileName: file.name,
            fileType: file.type || 'N/A',
            columns: schools.length > 0 ? Object.keys(schools[0]) : [],
        },
    };
};
