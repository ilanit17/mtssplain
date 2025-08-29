import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { School, AnalysisData, Insight, SchoolForAnalysis, Score } from '../types';
import { ALL_SCORE_FIELDS, HIERARCHICAL_CATEGORIES, NEW_CHALLENGE_CATEGORIES_FOR_REPORT } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LabelList } from 'recharts';
import SchoolDataTable from './SchoolDataTable';
import DetailedSchoolReport from './SchoolReportCard';
import { SchoolAssessmentData, SchoolReportCard as SchoolReportCardType } from '../types/schoolAssessmentTypes';
import ExportControls from './ExportControls';


interface Step2Props {
  schoolsData: School[];
  onAnalysisComplete: (data: AnalysisData) => void;
}

const COLORS = ['#e74c3c', '#f39c12', '#27ae60'];
const PIE_COLORS = ['#667eea', '#764ba2', '#8e44ad', '#9b59b6'];

// Function to generate local insights based on analysis data
const generateLocalInsights = (data: AnalysisData): Insight[] => {
    const insights: Insight[] = [];
    const totalSchools = data.summary.totalSchools;
    if (totalSchools === 0) return [{ title: "אין נתונים לניתוח", text: "לא נטענו בתי ספר, ולכן לא ניתן להפיק תובנות."}];

    const tier3Percentage = Math.round((data.mtssClassification.tier3.length / totalSchools) * 100);
    if (tier3Percentage > 20) {
        insights.push({
            title: "אחוז גבוה של בתי ספר בסיכון",
            text: `${tier3Percentage}% מהבתי ספר מסווגים בשכבה 3 (התערבות אינטנסיבית). זה מצביע על צורך בהקצאת משאבים מיידית ותמיכה מערכתית.`
        });
    }
    
    // Additional insights can be added here...
    
    if (insights.length === 0) {
        insights.push({
            title: "ניתוח נתונים הושלם בהצלחה",
            text: "הנתונים נאספו ונותחו. השתמש בתרשימים ובטבלאות כדי לזהות מגמות ואזורים הדורשים התערבות."
        });
    }
    
    return insights;
};


const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
    </div>
);

const MTSS_TIERS_INFO = {
    tier1: { title: "שכבה 1 - מענה אוניברסלי", description: "בתי ספר בתפקוד תקין.", style: "bg-green-50 border-green-500", titleStyle: "text-green-700", countStyle: "bg-green-600" },
    tier2: { title: "שכבה 2 - תמיכה ממוקדת", description: "בתי ספר עם אתגרים מתונים.", style: "bg-yellow-50 border-yellow-500", titleStyle: "text-yellow-700", countStyle: "bg-yellow-500" },
    tier3: { title: "שכבה 3 - התערבות אינטנסיבית", description: "בתי ספר בסיכון גבוה.", style: "bg-red-50 border-red-500", titleStyle: "text-red-700", countStyle: "bg-red-600" }
};

const TierDisplay: React.FC<{ tier: 'tier1' | 'tier2' | 'tier3', schools: SchoolForAnalysis[] }> = ({ tier, schools }) => {
    const [isOpen, setIsOpen] = useState(false);
    const info = MTSS_TIERS_INFO[tier];

    return (
         <div className={`${info.style} p-4 rounded-lg border-r-4 shadow-sm`}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <h3 className={`text-lg font-bold ${info.titleStyle}`}>{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`${info.countStyle} text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg`}>{schools.length}</span>
                    <span className={`text-xl text-gray-500 transform transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}>▼</span>
                </div>
            </div>
            {isOpen && (
                 <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {schools.length > 0 ? schools.map(school => (
                        <div key={school.id} className="bg-white p-3 rounded-md shadow border text-sm">
                            <p className="font-bold text-gray-800 truncate">{school.name}</p>
                            <p className="text-xs text-gray-500">מנהל/ת: {school.principal || '-'}</p>
                        </div>
                    )) : <p className="text-gray-500 col-span-full text-center py-4">אין בתי ספר בשכבה זו.</p>}
                </div>
            )}
        </div>
    );
};

const AggregateDashboard: React.FC<{ analysisData: AnalysisData }> = ({ analysisData }) => {
    const { summary, mtssClassification, insights, schoolSizeData, overallPerformanceData } = analysisData;
    
    const mainDomainAverages = HIERARCHICAL_CATEGORIES.map(mainCat => {
        const allMetrics = mainCat.subCategories.flatMap(sc => sc.metrics);
        const allScores = analysisData.schools.flatMap(school => allMetrics.map(m => parseInt(school[m.key] as string, 10)).filter(s => !isNaN(s) && s > 0));
        const average = allScores.length > 0 ? allScores.reduce((a,b) => a + b, 0) / allScores.length : 0;
        return { name: mainCat.name, value: parseFloat(average.toFixed(2)) };
    });

    return (
         <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center"><h3 className="text-blue-800 text-lg font-semibold">📚 סך בתי ספר</h3><div className="text-blue-900 text-4xl font-bold mt-2">{summary.totalSchools}</div></div>
                <div className="bg-green-100 p-6 rounded-xl shadow-md text-center"><h3 className="text-green-800 text-lg font-semibold">👨‍🎓 סך תלמידים</h3><div className="text-green-900 text-4xl font-bold mt-2">{summary.totalStudents.toLocaleString()}</div></div>
                <div className="bg-red-100 p-6 rounded-xl shadow-md text-center"><h3 className="text-red-800 text-lg font-semibold">⚠️ בתי ספר בסיכון</h3><div className="text-red-900 text-4xl font-bold mt-2">{summary.riskySchools}</div></div>
                <div className="bg-yellow-100 p-6 rounded-xl shadow-md text-center"><h3 className="text-yellow-800 text-lg font-semibold">⭐ בתי ספר מובילים</h3><div className="text-yellow-900 text-4xl font-bold mt-2">{summary.excellentSchools}</div></div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🎯 סיווג MTSS - חלוקה לשכבות התערבות</h2>
                 <div className="space-y-6">
                    <TierDisplay tier="tier1" schools={mtssClassification.tier1} />
                    <TierDisplay tier="tier2" schools={mtssClassification.tier2} />
                    <TierDisplay tier="tier3" schools={mtssClassification.tier3} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                     <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📈 מדד תפקוד כללי (מס' בתי ספר)</h3>
                     <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={overallPerformanceData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="name" />
                             <YAxis allowDecimals={false} />
                             <Tooltip />
                             <Bar dataKey="value">
                                 <LabelList dataKey="value" position="top" style={{ fill: '#374151', fontWeight: 'bold' }} />
                                {overallPerformanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                             </Bar>
                         </BarChart>
                     </ResponsiveContainer>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                     <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🏢 התפלגות גודל בתי ספר</h3>
                     <ResponsiveContainer width="100%" height={300}>
                         <PieChart>
                            <Pie data={schoolSizeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {schoolSizeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                         </PieChart>
                     </ResponsiveContainer>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-lg shadow-md lg:col-span-2">
                     <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📊 ממוצע ציונים בתחומי העל</h3>
                     <ResponsiveContainer width="100%" height={400}>
                         <BarChart data={mainDomainAverages} layout="vertical" margin={{ top: 5, right: 20, left: 150, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis type="number" domain={[0, 4]}/>
                             <YAxis type="category" dataKey="name" width={150} />
                             <Tooltip formatter={(value) => (value as number).toFixed(2)} />
                             <Bar dataKey="value" fill="#82ca9d" >
                                <LabelList dataKey="value" position="right" style={{ fill: '#374151' }} formatter={(value: number) => value.toFixed(2)} />
                             </Bar>
                         </BarChart>
                     </ResponsiveContainer>
                 </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">💡 תובנות מרכזיות ודפוסים</h2>
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div key={index} className="bg-gradient-to-r from-teal-50 to-blue-50 p-5 rounded-lg border-r-4 border-teal-500 shadow">
                            <h4 className="font-bold text-teal-800 text-lg">{insight.title}</h4>
                            <p className="text-gray-700 mt-1">{insight.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const DynamicDataAnalyzer: React.FC<Step2Props> = ({ schoolsData, onAnalysisComplete }) => {
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'schools' | 'aggregate'>('schools');
    const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

    const aggregateDashboardRef = useRef<HTMLDivElement>(null);
    const schoolTableContainerRef = useRef<HTMLDivElement>(null);
    const schoolReportContainerRef = useRef<HTMLDivElement>(null);

    const performAnalysis = useMemo(() => {
        return (data: School[]): AnalysisData => {
            const getTier = (school: School): 1 | 2 | 3 => {
                 const scores = ALL_SCORE_FIELDS.map(s => parseInt(school[s] as string) || 0).filter(s => s > 0);
                 if (scores.length === 0) return 1;
                 const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                 if (avg <= 2.2) return 3;
                 if (avg <= 3.2) return 2;
                 return 1;
            }

            const schoolsForAnalysis: SchoolForAnalysis[] = data.map(school => ({
                ...school,
                characterization: 'N/A',
                specificChallenges: [],
                tier: getTier(school)
            }));
            
            const tier1 = schoolsForAnalysis.filter(s => s.tier === 1);
            const tier2 = schoolsForAnalysis.filter(s => s.tier === 2);
            const tier3 = schoolsForAnalysis.filter(s => s.tier === 3);

            const summary = {
                totalSchools: data.length,
                totalStudents: data.reduce((sum, s) => sum + (parseInt(s.students) || 0), 0),
                riskySchools: tier3.length,
                excellentSchools: tier1.length,
            };

            const overallPerformanceData = [
                { name: 'רמה 3 (נמוך)', value: tier3.length },
                { name: 'רמה 2 (בינוני)', value: tier2.length },
                { name: 'רמה 1 (גבוה)', value: tier1.length }
            ];

            const schoolSizeData = [
                { name: 'קטן (עד 300)', value: data.filter(s => (parseInt(s.students) || 0) <= 300).length },
                { name: 'בינוני (301-500)', value: data.filter(s => (parseInt(s.students) || 0) > 300 && (parseInt(s.students) || 0) <= 500).length },
                { name: 'גדול (501+)', value: data.filter(s => (parseInt(s.students) || 0) > 500).length },
            ].filter(d => d.value > 0);

            return {
                schools: schoolsForAnalysis,
                summary,
                mtssClassification: { tier1, tier2, tier3 },
                overallPerformanceData,
                schoolSizeData,
                // These are placeholders for now as their logic depends on the final data structure
                subjectDistribution: {},
                challengesAnalysis: {}, 
                insights: [],
                heatmapData: [],
                organizationalData: [],
                coreSubjectsData: [],
            };
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        const data = performAnalysis(schoolsData);
        const localInsights: Insight[] = generateLocalInsights(data);
        setAnalysisData({ ...data, insights: localInsights });
        if (schoolsData.length > 0) {
            setSelectedSchoolId(schoolsData[0].id);
        }
        setLoading(false);
    }, [schoolsData, performAnalysis]);
    
    const schoolTableData = useMemo((): SchoolAssessmentData[] => {
        if (!analysisData) return [];
        return analysisData.schools.map(school => {
            const scores = ALL_SCORE_FIELDS.map(field => parseInt(school[field] as string) || 0).filter(s => s > 0);
            const overallAverage = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            
            let riskLevel = 'נמוך';
            if (school.tier === 2) riskLevel = 'בינוני';
            if (school.tier === 3) riskLevel = 'גבוה';

            return {
                id: school.id,
                schoolName: school.name,
                principalName: school.principal,
                overallAverage: overallAverage,
                mtssTier: school.tier,
                riskLevel: riskLevel,
            };
        });
    }, [analysisData]);

    const handleExportSchoolsCSV = useCallback(() => {
        if (!schoolTableData) return;
    
        const headers = ['שם בית הספר', 'מנהל/ת', 'ממוצע כללי', 'רמת MTSS', 'רמת סיכון'];
        
        const csvRows = schoolTableData.map(school => {
            const row = [
                school.schoolName,
                school.principalName,
                school.overallAverage.toFixed(2),
                school.mtssTier,
                school.riskLevel
            ];
            return row.map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(',');
        });
    
        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'רשימת_בתי_ספר.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [schoolTableData]);

    const handleExportHTML = useCallback(() => {
        if (!analysisData) return;

        const calculateSubCategoryAverage = (school: School, subCategoryKey: string): number => {
            for (const cat of HIERARCHICAL_CATEGORIES) {
                const subCat = cat.subCategories.find(sc => sc.key === subCategoryKey);
                if (subCat) {
                    const scores = subCat.metrics
                        .map(m => parseInt(school[m.key] as string, 10))
                        .filter(s => !isNaN(s) && s > 0);
                    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                }
            }
            return 0;
        };

        const challengeCounts: { [key: string]: { name: string, count: number } } = {};
        HIERARCHICAL_CATEGORIES.forEach(cat => cat.subCategories.forEach(sc => {
            challengeCounts[sc.key] = { name: sc.name, count: 0 };
        }));

        analysisData.schools.forEach(school => {
            for (const subCatKey in challengeCounts) {
                if (calculateSubCategoryAverage(school, subCatKey) <= 3.0) {
                    challengeCounts[subCatKey].count++;
                }
            }
        });

        const totalSchools = analysisData.summary.totalSchools;
        const challengeData = Object.values(challengeCounts)
            .map(item => ({
                name: item.name,
                percentage: totalSchools > 0 ? Math.round((item.count / totalSchools) * 100) : 0,
                count: item.count
            }))
            .filter(item => item.count > 0)
            .sort((a, b) => b.percentage - a.percentage);

        const challengeDataJSON = JSON.stringify(challengeData);
        
        const totalSchoolCount = analysisData.summary.totalSchools;
        const challengeDomainCount = challengeData.length;
        const maxChallengePercentage = challengeData.length > 0 ? challengeData[0].percentage : 0;
        const riskySchoolCount = analysisData.mtssClassification.tier3.length;
        
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ניתוח אתגרים בבתי ספר</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f6f8fc 0%, #e8f2ff 100%); min-height: 100vh; direction: rtl; color: #333; padding: 20px; }
                .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
                .header h1 { font-size: 2.5rem; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
                .header p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 20px; }
                .stats-banner { display: flex; justify-content: center; gap: 40px; margin-top: 20px; flex-wrap: wrap; }
                .stat-item { text-align: center; }
                .stat-number { font-size: 2rem; font-weight: bold; margin-bottom: 5px; }
                .stat-label { font-size: 0.9rem; opacity: 0.8; }
                .chart-section { padding: 60px 40px; }
                .chart-title { font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 15px; color: #2d3748; }
                .chart-subtitle { font-size: 1.1rem; text-align: center; color: #718096; margin-bottom: 40px; }
                .chart-container { position: relative; height: 600px; margin-bottom: 40px; }
                .data-table { margin-top: 40px; background: #f7fafc; border-radius: 15px; padding: 30px; }
                .table-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 20px; color: #2d3748; text-align: center; }
                table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                th { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; text-align: center; font-weight: 600; }
                td { padding: 12px 15px; text-align: center; border-bottom: 1px solid #e2e8f0; }
                tr:nth-child(even) { background-color: #f8f9fa; }
                tr:hover { background-color: #e8f2ff; }
                .percentage-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin: 5px 0; }
                .percentage-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }
                .level-critical { background: #e53e3e; } .level-high { background: #f56565; } .level-medium { background: #ed8936; } .level-low { background: #38a169; }
                @media (max-width: 768px) { .header { padding: 30px 20px; } .header h1 { font-size: 2rem; } .chart-section { padding: 40px 20px; } .stats-banner { flex-direction: column; gap: 20px; } .chart-container { height: 400px; } }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>ניתוח אתגרים בבתי ספר באזור הפיקוח</h1>
                    <p>גרף עמודות מפורט המציג את התפלגות האתגרים לפי תחומים</p>
                    <div class="stats-banner">
                        <div class="stat-item"><div class="stat-number">${totalSchoolCount}</div><div class="stat-label">בתי ספר</div></div>
                        <div class="stat-item"><div class="stat-number">${challengeDomainCount}</div><div class="stat-label">תחומי אתגר</div></div>
                        <div class="stat-item"><div class="stat-number">${maxChallengePercentage}%</div><div class="stat-label">אתגר מקסימלי</div></div>
                        <div class="stat-item"><div class="stat-number">${riskySchoolCount}</div><div class="stat-label">בתי ספר בסיכון</div></div>
                    </div>
                </div>
                <div class="chart-section">
                    <h2 class="chart-title">התפלגות האתגרים לפי תחומים</h2>
                    <p class="chart-subtitle">אחוז בתי הספר המתמודדים עם כל אתגר - מדורג מהגבוה לנמוך</p>
                    <div class="chart-container"><canvas id="mainChart"></canvas></div>
                    <div class="data-table">
                        <h3 class="table-title">טבלת נתונים מפורטת</h3>
                        <table>
                            <thead><tr><th>דירוג</th><th>תחום האתגר</th><th>מספר בתי ספר</th><th>אחוז</th><th>עוצמת האתגר</th><th>ייצוג חזותי</th></tr></thead>
                            <tbody id="dataTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <script>
                const challengeData = ${challengeDataJSON};
                const totalSchools = ${totalSchoolCount};
                function getColor(p) { if (p >= 70) return '#e53e3e'; if (p >= 50) return '#f56565'; if (p >= 30) return '#ed8936'; return '#38a169'; }
                function getIntensityLevel(p) { if (p >= 70) return 'קריטי'; if (p >= 50) return 'גבוה'; if (p >= 30) return 'בינוני'; return 'נמוך'; }
                function createChart() {
                    const ctx = document.getElementById('mainChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: challengeData.map(item => item.name),
                            datasets: [{
                                label: 'אחוז בתי ספר מושפעים',
                                data: challengeData.map(item => item.percentage),
                                backgroundColor: challengeData.map(item => getColor(item.percentage) + '80'),
                                borderColor: challengeData.map(item => getColor(item.percentage)),
                                borderWidth: 3, borderRadius: 8, borderSkipped: false,
                            }]
                        },
                        options: {
                            responsive: true, maintainAspectRatio: false,
                            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => \`אחוז: \${c.parsed.y}%, בתי ספר: \${challengeData[c.dataIndex].count} מתוך \${totalSchools}\` } } },
                            scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }, x: { ticks: { maxRotation: 45, minRotation: 30 } } }
                        }
                    });
                }
                function populateTable() {
                    const tbody = document.getElementById('dataTableBody');
                    challengeData.forEach((item, index) => {
                        const row = document.createElement('tr');
                        const levelClass = item.percentage >= 70 ? 'level-critical' : item.percentage >= 50 ? 'level-high' : item.percentage >= 30 ? 'level-medium' : 'level-low';
                        row.innerHTML = \`<td><strong>\${index + 1}</strong></td><td style="text-align: right; font-weight: 600;">\${item.name}</td><td><strong>\${item.count}</strong> / \${totalSchools}</td><td><strong>\${item.percentage}%</strong></td><td><span style="color: \${getColor(item.percentage)}; font-weight: 600;">\${getIntensityLevel(item.percentage)}</span></td><td><div class="percentage-bar"><div class="percentage-fill \${levelClass}" style="width: \${item.percentage}%"></div></div></td>\`;
                        tbody.appendChild(row);
                    });
                }
                document.addEventListener('DOMContentLoaded', () => { createChart(); populateTable(); });
            </script>
        </body>
        </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'דוח_ניתוח_אתגרים.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [analysisData]);

    const handleExportMTSSTierReportHTML = useCallback(() => {
        if (!analysisData) return;

        // 1. Define critical challenges and helper functions
        const CRITICAL_CHALLENGE_KEYS = {
            leadership: 'managementTeam',
            stability: 'staffWellbeing',
            quality: 'staffLearning'
        };

        const calculateSubCategoryAverage = (school: School, subCategoryKey: string): number => {
            for (const cat of HIERARCHICAL_CATEGORIES) {
                const subCat = cat.subCategories.find(sc => sc.key === subCategoryKey);
                if (subCat) {
                    const scores = subCat.metrics
                        .map(m => parseInt(school[m.key] as string, 10))
                        .filter(s => !isNaN(s) && s > 0);
                    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                }
            }
            return 0;
        };
        
        // 2. Enhance school data with metrics needed for the report
        const enhancedSchools = analysisData.schools.map(school => {
            const scores = ALL_SCORE_FIELDS.map(field => parseInt(school[field] as string) || 0).filter(s => s > 0);
            const overallAverage = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            
            let totalChallenges = 0;
            HIERARCHICAL_CATEGORIES.forEach(cat => {
                cat.subCategories.forEach(subCat => {
                    if (calculateSubCategoryAverage(school, subCat.key) <= 3.0) {
                        totalChallenges++;
                    }
                });
            });

            const leadershipAvg = calculateSubCategoryAverage(school, CRITICAL_CHALLENGE_KEYS.leadership);
            const stabilityAvg = calculateSubCategoryAverage(school, CRITICAL_CHALLENGE_KEYS.stability);
            const qualityAvg = calculateSubCategoryAverage(school, CRITICAL_CHALLENGE_KEYS.quality);

            const criticalChallengesCount = [leadershipAvg, stabilityAvg, qualityAvg].filter(avg => avg <= 2.2).length;

            return { ...school, overallAverage, totalChallenges, criticalChallengesCount };
        });

        // 3. Group schools by tier
        const tier1Schools = enhancedSchools.filter(s => s.tier === 1).sort((a,b) => b.overallAverage - a.overallAverage);
        const tier2Schools = enhancedSchools.filter(s => s.tier === 2).sort((a,b) => b.overallAverage - a.overallAverage);
        const tier3Schools = enhancedSchools.filter(s => s.tier === 3).sort((a,b) => b.overallAverage - a.overallAverage);

        // 4. Calculate summary stats
        const totalSchools = analysisData.summary.totalSchools;
        const totalStudents = analysisData.summary.totalStudents;
        const tier3Percentage = totalSchools > 0 ? ((tier3Schools.length / totalSchools) * 100).toFixed(1) : '0';

        const calculateTierStats = (schoolsInTier: typeof enhancedSchools) => {
            const schoolCount = schoolsInTier.length;
            const studentCount = schoolsInTier.reduce((sum, s) => sum + (parseInt(s.students) || 0), 0);
            const schoolPercentage = totalSchools > 0 ? ((schoolCount / totalSchools) * 100).toFixed(1) : '0';
            const studentPercentage = totalStudents > 0 ? ((studentCount / totalStudents) * 100).toFixed(1) : '0';
            
            let scoreRange = 'N/A';
            if (schoolCount > 0) {
                const scores = schoolsInTier.map(s => s.overallAverage);
                const min = Math.min(...scores).toFixed(2);
                const max = Math.max(...scores).toFixed(2);
                scoreRange = min === max ? min : `${min}-${max}`;
            }
            
            const avgCriticalChallenges = schoolCount > 0 ? (schoolsInTier.reduce((sum, s) => sum + s.criticalChallengesCount, 0) / schoolCount).toFixed(0) : '0';

            return { schoolCount, studentCount, schoolPercentage, studentPercentage, scoreRange, avgCriticalChallenges };
        };
        
        const tier1Stats = calculateTierStats(tier1Schools);
        const tier2Stats = calculateTierStats(tier2Schools);
        const tier3Stats = calculateTierStats(tier3Schools);

        // 5. Helper functions for generating HTML rows and styles
        const getScoreClass = (score: number) => {
            if (score >= 3.5) return 'score-excellent';
            if (score >= 3.0) return 'score-good';
            if (score >= 2.5) return 'score-fair';
            return 'score-poor';
        };

        const getChallengesClass = (count: number) => {
            if (count >= 10) return 'challenges-critical';
            if (count >= 7) return 'challenges-high';
            if (count >= 4) return 'challenges-medium';
            if (count > 0) return 'challenges-low';
            return 'challenges-none';
        };
        
        const getCriticalChallengesClass = (count: number) => {
            if (count >= 3) return 'challenges-critical';
            if (count === 2) return 'challenges-high';
            if (count === 1) return 'challenges-medium';
            return 'challenges-none';
        }

        const createSchoolRow = (school: typeof enhancedSchools[0]) => `
            <tr>
                <td class="school-name">${school.name}</td>
                <td class="students-count">${parseInt(school.students) || 'N/A'}</td>
                <td><span class="score ${getScoreClass(school.overallAverage)}">${school.overallAverage.toFixed(2)}</span></td>
                <td><span class="challenges-indicator ${getChallengesClass(school.totalChallenges)}">${school.totalChallenges}</span></td>
                <td><span class="challenges-indicator ${getCriticalChallengesClass(school.criticalChallengesCount)}">${school.criticalChallengesCount}</span></td>
                <td><span class="intervention-level ${
                    school.tier === 3 ? 'intervention-intensive' :
                    school.tier === 2 ? 'intervention-targeted' :
                    'intervention-prevention'
                }">${
                    school.tier === 3 ? 'התערבות דחופה' :
                    school.tier === 2 ? 'תמיכה ממוקדת' :
                    'מניעה'
                }</span></td>
            </tr>
        `;

        const tier1Rows = tier1Schools.map(createSchoolRow).join('');
        const tier2Rows = tier2Schools.map(createSchoolRow).join('');
        const tier3Rows = tier3Schools.map(createSchoolRow).join('');
        
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>טבלת סיווג MTSS - בתי ספר באזור הפיקוח</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; direction: rtl; color: #333; padding: 20px; }
                .container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
                .header h1 { font-size: 2.5rem; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
                .header p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 20px; }
                .stats-overview { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
                .stat-card { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; text-align: center; backdrop-filter: blur(10px); }
                .stat-number { font-size: 2rem; font-weight: bold; margin-bottom: 5px; }
                .stat-label { font-size: 0.9rem; opacity: 0.8; }
                .content { padding: 40px; }
                .tier-section { margin-bottom: 40px; }
                .tier-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; padding: 20px; border-radius: 15px; font-weight: 600; font-size: 1.3rem; }
                .tier-1 { background: linear-gradient(135deg, #d4edda, #c3e6cb); color: #155724; border-right: 5px solid #28a745; }
                .tier-2 { background: linear-gradient(135deg, #fff3cd, #ffeaa7); color: #856404; border-right: 5px solid #ffc107; }
                .tier-3 { background: linear-gradient(135deg, #f8d7da, #f5c6cb); color: #721c24; border-right: 5px solid #dc3545; }
                .tier-icon { font-size: 2rem; }
                .tier-summary { background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-right: 4px solid #6c757d; }
                .summary-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px; }
                .summary-stat { text-align: center; }
                .summary-stat strong { display: block; font-size: 1.5rem; color: #495057; }
                .schools-table { width: 100%; border-collapse: collapse; margin-top: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
                .schools-table th { background: linear-gradient(135deg, #495057, #6c757d); color: white; padding: 15px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #343a40; }
                .schools-table td { padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6; }
                .schools-table tr:nth-child(even) { background-color: #f8f9fa; }
                .schools-table tr:hover { background-color: #e9ecef; }
                .school-name { text-align: right !important; font-weight: 600; color: #495057; min-width: 200px; }
                .score { font-weight: 600; padding: 8px 12px; border-radius: 8px; }
                .score-excellent { background: #d4edda; color: #155724; }
                .score-good { background: #d1ecf1; color: #0c5460; }
                .score-fair { background: #fff3cd; color: #856404; }
                .score-poor { background: #f8d7da; color: #721c24; }
                .challenges-indicator { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
                .challenges-critical { background: #dc3545; color: white; }
                .challenges-high { background: #fd7e14; color: white; }
                .challenges-medium { background: #ffc107; color: #212529; }
                .challenges-low { background: #28a745; color: white; }
                .challenges-none { background: #6f42c1; color: white; }
                .intervention-level { padding: 8px 15px; border-radius: 25px; font-weight: 600; font-size: 0.9rem; }
                .intervention-intensive { background: #dc3545; color: white; }
                .intervention-targeted { background: #ffc107; color: #212529; }
                .intervention-prevention { background: #28a745; color: white; }
                .students-count { font-weight: 600; color: #6c757d; }
                .legend { background: #f8f9fa; padding: 25px; border-radius: 15px; margin-top: 30px; }
                .legend h3 { color: #495057; margin-bottom: 20px; text-align: center; }
                .legend-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .legend-section { background: white; padding: 20px; border-radius: 12px; border-right: 4px solid #6c757d; }
                .legend-section h4 { margin-bottom: 15px; color: #495057; }
                @media (max-width: 768px) { .header { padding: 30px 20px; } .header h1 { font-size: 2rem; } .content { padding: 20px; } .schools-table { font-size: 0.85rem; } .schools-table th, .schools-table td { padding: 8px 6px; } .tier-header { flex-direction: column; text-align: center; } }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>סיווג MTSS - בתי ספר באזור הפיקוח</h1>
                    <p>מודל התערבות מדורג למיקוד בסוגייה המרכזית</p>
                    <div class="stats-overview">
                        <div class="stat-card"><div class="stat-number">${totalSchools}</div><div class="stat-label">בתי ספר</div></div>
                        <div class="stat-card"><div class="stat-number">${totalStudents.toLocaleString()}</div><div class="stat-label">תלמידים</div></div>
                        <div class="stat-card"><div class="stat-number">3</div><div class="stat-label">שכבות התערבות</div></div>
                        <div class="stat-card"><div class="stat-number">${tier3Percentage}%</div><div class="stat-label">זקוקים להתערבות דחופה</div></div>
                    </div>
                </div>
                <div class="content">
                    <!-- שכבה 1 -->
                    <div class="tier-section">
                        <div class="tier-header tier-1"><span class="tier-icon">🟢</span><div><div>שכבה 1: מניעה ושימור</div><div style="font-size: 0.9rem; font-weight: normal; opacity: 0.8;">בתי ספר מתפקדים היטב</div></div></div>
                        <div class="tier-summary">
                            <strong>מאפיינים עיקריים:</strong> מנהיגות חזקה, צוות יציב ואיכותי, אקלים חיובי, ביצועים גבוהים
                            <div class="summary-stats">
                                <div class="summary-stat"><strong>${tier1Stats.schoolCount}</strong><span>בתי ספר (${tier1Stats.schoolPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier1Stats.studentCount.toLocaleString()}</strong><span>תלמידים (${tier1Stats.studentPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier1Stats.scoreRange}</strong><span>ממוצע ציונים</span></div>
                                <div class="summary-stat"><strong>${tier1Stats.avgCriticalChallenges}</strong><span>אתגרים קריטיים (ממוצע)</span></div>
                            </div>
                        </div>
                        <table class="schools-table">
                            <thead><tr><th>שם בית הספר</th><th>מספר תלמידים</th><th>ממוצע ציונים</th><th>אתגרים כללי</th><th>אתגרים קריטיים</th><th>רמת התערבות</th></tr></thead>
                            <tbody>${tier1Rows}</tbody>
                        </table>
                    </div>
                    <!-- שכבה 2 -->
                    <div class="tier-section">
                        <div class="tier-header tier-2"><span class="tier-icon">🟡</span><div><div>שכבה 2: תמיכה ממוקדת</div><div style="font-size: 0.9rem; font-weight: normal; opacity: 0.8;">בתי ספר זקוקים לחיזוק</div></div></div>
                        <div class="tier-summary">
                            <strong>מאפיינים עיקריים:</strong> מנהיגות בינונית, יציבות חלקית, פערים בין תחומים, פוטנציאל לשיפור
                            <div class="summary-stats">
                                <div class="summary-stat"><strong>${tier2Stats.schoolCount}</strong><span>בתי ספר (${tier2Stats.schoolPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier2Stats.studentCount.toLocaleString()}</strong><span>תלמידים (${tier2Stats.studentPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier2Stats.scoreRange}</strong><span>ממוצע ציונים</span></div>
                                <div class="summary-stat"><strong>${tier2Stats.avgCriticalChallenges}</strong><span>אתגרים קריטיים (ממוצע)</span></div>
                            </div>
                        </div>
                        <table class="schools-table">
                           <thead><tr><th>שם בית הספר</th><th>מספר תלמידים</th><th>ממוצע ציונים</th><th>אתגרים כללי</th><th>אתגרים קריטיים</th><th>רמת התערבות</th></tr></thead>
                           <tbody>${tier2Rows}</tbody>
                        </table>
                    </div>
                    <!-- שכבה 3 -->
                    <div class="tier-section">
                        <div class="tier-header tier-3"><span class="tier-icon">🔴</span><div><div>שכבה 3: התערבות אינטנסיבית</div><div style="font-size: 0.9rem; font-weight: normal; opacity: 0.8;">בתי ספר זקוקים להתערבות דחופה</div></div></div>
                        <div class="tier-summary">
                             <strong>מאפיינים עיקריים:</strong> משבר מנהיגות, תחלופה גבוהה, איכות צוות נמוכה, מצב מערכתי קשה
                            <div class="summary-stats">
                                <div class="summary-stat"><strong>${tier3Stats.schoolCount}</strong><span>בתי ספר (${tier3Stats.schoolPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier3Stats.studentCount.toLocaleString()}</strong><span>תלמידים (${tier3Stats.studentPercentage}%)</span></div>
                                <div class="summary-stat"><strong>${tier3Stats.scoreRange}</strong><span>ממוצע ציונים</span></div>
                                <div class="summary-stat"><strong>${tier3Stats.avgCriticalChallenges}</strong><span>אתגרים קריטיים (ממוצע)</span></div>
                            </div>
                        </div>
                        <table class="schools-table">
                            <thead><tr><th>שם בית הספר</th><th>מספר תלמידים</th><th>ממוצע ציונים</th><th>אתגרים כללי</th><th>אתגרים קריטיים</th><th>רמת התערבות</th></tr></thead>
                            <tbody>${tier3Rows}</tbody>
                        </table>
                    </div>
                    <div class="legend">
                        <h3>מקרא ומדדים</h3>
                        <div class="legend-grid">
                            <div class="legend-section">
                                <h4>אתגרים קריטיים</h4>
                                <p style="font-size: 0.9rem; color: #6c757d;">
                                    מספר האתגרים הקריטיים מחושב על בסיס ציון נמוך (2.2 ומטה) בתחומי המפתח הבאים: <strong>צוות הנהלה</strong> (מנהיגות), <strong>רווחה ויציבות</strong> (יציבות צוות), ו<strong>למידה והתמקצעות</strong> (איכות צוות).
                                </p>
                            </div>
                            <div class="legend-section">
                                <h4>קריטריוני סיווג MTSS (לפי הניתוח באפליקציה)</h4>
                                <div style="font-size: 0.9rem; line-height: 1.6;">
                                    <strong>שכבה 1 (מניעה):</strong> ממוצע ציונים כללי גבוה מ-3.2<br>
                                    <strong>שכבה 2 (תמיכה ממוקדת):</strong> ממוצע ציונים כללי בין 2.3 ל-3.2<br>
                                    <strong>שכבה 3 (התערבות אינטנסיבית):</strong> ממוצע ציונים כללי 2.2 או פחות
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const statCards = document.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    
                    const tableRows = document.querySelectorAll('.schools-table tbody tr');
                    tableRows.forEach((row, index) => {
                        row.style.opacity = '0';
                        row.style.transform = 'translateX(50px)';
                        setTimeout(() => {
                            row.style.transition = 'all 0.4s ease';
                            row.style.opacity = '1';
                            row.style.transform = 'translateX(0)';
                        }, 1000 + (index * 100));
                    });
                    
                    const tierHeaders = document.querySelectorAll('.tier-header');
                    tierHeaders.forEach((header, index) => {
                        header.style.opacity = '0';
                        header.style.transform = 'translateY(-30px)';
                        setTimeout(() => {
                            header.style.transition = 'all 0.8s ease';
                            header.style.opacity = '1';
                            header.style.transform = 'translateY(0)';
                        }, 500 + (index * 300));
                    });
                });
            </script>
        </body>
        </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'דוח_סיווג_MTSS.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [analysisData]);

    const createReportCardData = (schoolId: number): SchoolReportCardType | null => {
        if (!analysisData) return null;
        
        const school = analysisData.schools.find(s => s.id === schoolId);
        if (!school) return null;

        const scores = ALL_SCORE_FIELDS.map(field => ({ field, score: parseInt(school[field] as string) || 0 })).filter(item => item.score > 0);
        const overallAverage = scores.length > 0 ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length : 0;
        
        const domainAverages: { [key: string]: number } = {};
        HIERARCHICAL_CATEGORIES.forEach(cat => {
            const catFields = cat.subCategories.flatMap(sc => sc.metrics.map(m => m.key));
            const catScores = scores.filter(s => catFields.includes(s.field as any)).map(s => s.score);
            if (catScores.length > 0) {
                domainAverages[cat.name] = catScores.reduce((a, b) => a + b, 0) / catScores.length;
            } else {
                domainAverages[cat.name] = 0;
            }
        });

        const strengths: string[] = Object.entries(domainAverages)
            .filter(([_, avg]) => avg >= 3.0)
            .map(([domain, _]) => domain);
        
        return {
            school: school,
            schoolName: school.name,
            principalName: school.principal,
            studentCount: parseInt(school.students) || 0,
            supportLevel: school.supportLevel || "לא צוין",
            overallAverage: overallAverage,
            mtssTier: school.tier,
            riskLevel: 'N/A', // Placeholder
            domainAverages,
            strengths,
            challenges: [], // Placeholder
            recommendations: [] // Placeholder
        };
    };

    const selectedSchoolReport = useMemo(() => {
        if (selectedSchoolId === null) return null;
        return createReportCardData(selectedSchoolId);
    }, [selectedSchoolId, analysisData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!analysisData) {
        return <div className="text-center p-8 text-red-500">לא הצלחנו לנתח את הנתונים.</div>;
    }
    
    return (
        <div className="space-y-6">
            <div className="flex justify-center border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
                <button 
                    onClick={() => setView('schools')} 
                    className={`px-6 py-3 font-semibold transition-colors focus:outline-none ${view === 'schools' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                    ניתוח ברמת בית ספר
                </button>
                <button 
                    onClick={() => setView('aggregate')} 
                    className={`px-6 py-3 font-semibold transition-colors focus:outline-none ${view === 'aggregate' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                    ניתוח רשותי (מצטבר)
                </button>
            </div>

            {view === 'aggregate' && (
                 <div ref={aggregateDashboardRef} className="bg-white p-6 rounded-lg shadow-md">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">סיכום רשותי</h2>
                        <ExportControls 
                            targetRef={aggregateDashboardRef} 
                            reportName="סיכום-רשותי" 
                            onExportHTML={handleExportHTML}
                            onExportHTMLReport2={handleExportMTSSTierReportHTML}
                        />
                    </div>
                    <AggregateDashboard analysisData={analysisData} />
                </div>
            )}

            {view === 'schools' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div ref={schoolTableContainerRef} className="bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">רשימת בתי ספר</h2>
                             <ExportControls 
                                targetRef={schoolTableContainerRef} 
                                reportName="רשימת-בתי-ספר"
                                onExportCSV={handleExportSchoolsCSV}
                             />
                        </div>
                        <SchoolDataTable 
                            schools={schoolTableData}
                            onSchoolSelect={(id) => setSelectedSchoolId(id)}
                            selectedSchoolId={selectedSchoolId}
                        />
                    </div>
                    <div ref={schoolReportContainerRef} className="bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">דוח בית ספרי</h2>
                         </div>
                        {selectedSchoolReport ? (
                            <DetailedSchoolReport report={selectedSchoolReport} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-center text-gray-500 rounded-lg bg-gray-50 min-h-[400px]">
                                <p>בחר/י בית ספר מהרשימה כדי להציג את הדוח המפורט.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8 text-center">
                <button onClick={() => onAnalysisComplete(analysisData)} className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-bold rounded-lg shadow-xl hover:from-green-600 hover:to-teal-700 transition transform hover:scale-105">
                   המשך להגדרת סוגייה מרכזית ←
                </button>
            </div>
        </div>
    );
};

export default DynamicDataAnalyzer;