import React, { useState, useCallback } from 'react';
import { parseFile } from '../services/fileParserService';
import { ParsedData, School, AnalysisData, FinalIssue, InterventionPlan, SupportPlan } from '../types';
import DynamicDataAnalyzer from './DynamicDataAnalyzer';
import Step1_DataMapping from './Step1_DataMapping';
import Step3_IssueDefiner from './Step3_IssueDefiner';
import Step4_InterventionPlan from './Step4_InterventionPlan';

// קומפוננטה ראשית שמתחילה מהעלאת קובץ
const FileUploadAnalyzer: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'upload' | 'data-mapping' | 'analysis' | 'issue' | 'plan'>('upload');
    const [schoolsData, setSchoolsData] = useState<School[]>([]);
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [finalIssue, setFinalIssue] = useState<FinalIssue | null>(null);
    const [interventionPlan, setInterventionPlan] = useState<InterventionPlan | null>(null);
    const [supportPlan, setSupportPlan] = useState<SupportPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // טיפול בהעלאת קובץ
    const handleFileUpload = useCallback(async (file: File) => {
        try {
            setLoading(true);
            setError(null);
            
            const parsedData = await parseFile(file);
            
            const schoolsWithIds = parsedData.schools.map((school, index) => ({
                ...school,
                id: school.id || index + 1
            }));
            setSchoolsData(schoolsWithIds);
            setCurrentStep('data-mapping');
            
        } catch (error) {
            setError(`שגיאה בעיבוד הקובץ: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDataMappingComplete = useCallback(() => {
        if (schoolsData.length === 0) {
            setError("יש להזין נתונים עבור בית ספר אחד לפחות.");
            return;
        }
        setCurrentStep('analysis');
    }, [schoolsData]);

    // טיפול בהשלמת ניתוח
    const handleAnalysisComplete = useCallback((data: AnalysisData) => {
        setAnalysisData(data);
        setCurrentStep('issue');
    }, []);

    // טיפול בהגדרת בעיה
    const handleIssueDefined = useCallback((issue: FinalIssue) => {
        setFinalIssue(issue);
        setCurrentStep('plan');
    }, []);

    // טיפול בהשלמת תכנית
    const handlePlanComplete = useCallback((ivp: InterventionPlan, sp: SupportPlan) => {
        setInterventionPlan(ivp);
        setSupportPlan(sp);
        alert("תכנית התערבות נוצרה בהצלחה!");
    }, []);

    // איפוס הכלי
    const handleReset = useCallback(() => {
        setCurrentStep('upload');
        setSchoolsData([]);
        setAnalysisData(null);
        setFinalIssue(null);
        setInterventionPlan(null);
        setSupportPlan(null);
        setError(null);
    }, []);

    // רכיב העלאת קובץ
    const FileUploadStep = () => (
        <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    🚀 מתכנן התערבויות MTSS
                </h1>
                <p className="text-xl text-gray-600">
                    העלה קובץ נתונים, אמת את המידע והתחל בניתוח אוטומטי
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        העלאת קובץ נתונים
                    </h2>
                    <p className="text-gray-600">
                        העלה קובץ Excel או CSV עם נתוני בתי הספר
                    </p>
                </div>

                {error && (
                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                         <p className="text-sm text-red-800">{error}</p>
                     </div>
                )}
               
                {loading ? (
                     <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-white bg-blue-600 rounded-md shadow-sm">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            מעבד קובץ...
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">לחץ להעלאה</span> או גרור לכאן</p>
                                <p className="text-xs text-gray-500">נתמכים: Excel (.xlsx/.xls), CSV</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(file);
                                }}
                            />
                        </label>
                    </div>
                )}
                 <div className="mt-8 text-center">
                    <button onClick={() => setCurrentStep('data-mapping')} className="text-blue-600 hover:underline">
                        או המשך להזנה ידנית
                    </button>
                </div>
            </div>
        </div>
    );
    
    // רכיב ניתוח נתונים
    const AnalysisStep = () => (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
                    📊 ניתוח נתונים
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    ניתוח אוטומטי של הנתונים שהועלו
                </p>
            </header>

            <DynamicDataAnalyzer
                schoolsData={schoolsData}
                onAnalysisComplete={handleAnalysisComplete}
            />

            <div className="mt-8 text-center">
                 <button
                    onClick={() => setCurrentStep('data-mapping')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105 mr-4"
                >
                    ← חזור לעריכת נתונים
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition transform hover:scale-105"
                >
                    🔄 התחל מחדש
                </button>
            </div>
        </div>
    );

    // רכיב הגדרת בעיה
    const IssueStep = () => (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
                    🎯 הגדרת בעיה מרכזית
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    זיהוי הבעיה המרכזית והסיבות השורש
                </p>
            </header>

            {analysisData && (
                <Step3_IssueDefiner
                    analysisData={analysisData}
                    onIssueDefined={handleIssueDefined}
                />
            )}

            <div className="mt-8 text-center">
                <button
                    onClick={() => setCurrentStep('analysis')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105 mr-4"
                >
                    ← חזור לניתוח
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition transform hover:scale-105"
                >
                    🔄 התחל מחדש
                </button>
            </div>
        </div>
    );

    // רכיב תכנית התערבות
    const PlanStep = () => (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
                    📋 תכנית התערבות ותמיכה
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    בניית תכנית התערבות מפורטת
                </p>
            </header>

            {analysisData && finalIssue && (
                <Step4_InterventionPlan
                    analysisData={analysisData}
                    finalIssue={finalIssue}
                    onPlanComplete={handlePlanComplete}
                    onReset={handleReset}
                />
            )}

            <div className="mt-8 text-center">
                <button
                    onClick={() => setCurrentStep('issue')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105 mr-4"
                >
                    ← חזור להגדרת בעיה
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition transform hover:scale-105"
                >
                    🔄 התחל מחדש
                </button>
            </div>
        </div>
    );

    // רינדור השלב הנוכחי
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'upload':
                return <FileUploadStep />;
            case 'data-mapping':
                return <Step1_DataMapping schools={schoolsData} setSchools={setSchoolsData} onComplete={handleDataMappingComplete} onReset={handleReset} />;
            case 'analysis':
                return <AnalysisStep />;
            case 'issue':
                return <IssueStep />;
            case 'plan':
                return <PlanStep />;
            default:
                return <FileUploadStep />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {renderCurrentStep()}
        </div>
    );
};

export default FileUploadAnalyzer;