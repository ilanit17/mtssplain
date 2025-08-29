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
                const data = event.target?.result;
                if (!data) {
                    reject(new Error("Failed to read file."));
                    return;
                }
                if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
                    resolve(parseSchoolsFromCSV(data as string));
                } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                    resolve(parseSchoolsFromXLSX(data as ArrayBuffer));
                } else {
                    reject(new Error("Unsupported file type. Please upload CSV or Excel."));
                }
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = (error) => reject(error);

        if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            reader.readAsText(file, 'UTF-8');
        } else {
            reader.readAsArrayBuffer(file);
        }
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
