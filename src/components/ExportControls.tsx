import React, { useState, useRef, useEffect } from 'react';

// Declare globals for CDN scripts
declare const html2canvas: any;

// Fix: Augment the Window interface to define the jspdf property,
// which is added by a CDN script and not known by TypeScript by default.
declare global {
    interface Window {
        jspdf: any;
    }
}

interface ExportControlsProps {
  targetRef: React.RefObject<HTMLElement>;
  reportName: string;
  onExportCSV?: () => void;
  onExportHTML?: () => void;
  onExportHTMLReport2?: () => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({ 
    targetRef, 
    reportName, 
    onExportCSV,
    onExportHTML,
    onExportHTMLReport2
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePrint = () => {
        setIsOpen(false);
        const element = targetRef.current;
        if (!element) return;
        document.body.classList.add('printing');
        element.classList.add('printable');
        setTimeout(() => {
            window.print();
            document.body.classList.remove('printing');
            element.classList.remove('printable');
        }, 100);
    };
    
    const exportAs = async (format: 'png' | 'pdf') => {
        setIsOpen(false);
        setIsExporting(true);
        const element = targetRef.current;
        if (!element || typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
            alert('Export functionality is not available.');
            setIsExporting(false);
            return;
        }
        
        try {
            const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
            
            if (format === 'png') {
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${reportName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (format === 'pdf') {
                const { jsPDF } = window.jspdf;
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height],
                    hotfixes: ['px_scaling'],
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save(`${reportName}.pdf`);
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('An error occurred during export.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleAction = (action?: () => void) => {
        setIsOpen(false);
        if (action) {
            action();
        }
    }


    return (
        <div className="relative inline-block text-left no-print" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isExporting}
                >
                    {isExporting ? 'מייצא...' : 'הורדה / הדפסה'}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handlePrint} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            🖨️ הדפסה
                        </button>
                        <button onClick={() => exportAs('pdf')} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            📄 הורדה כ-PDF
                        </button>
                        <button onClick={() => exportAs('png')} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            🖼️ הורדה כ-PNG
                        </button>
                         {onExportCSV && (
                            <button onClick={() => handleAction(onExportCSV)} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                📊 הורדה כ-CSV (לעריכה)
                            </button>
                        )}
                        {onExportHTML && (
                             <button onClick={() => handleAction(onExportHTML)} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                📈 הורדה כ-HTML (ניתוח אתגרים)
                            </button>
                        )}
                        {onExportHTMLReport2 && (
                             <button onClick={() => handleAction(onExportHTMLReport2)} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                📋 הורדה כ-HTML (סיווג MTSS)
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportControls;