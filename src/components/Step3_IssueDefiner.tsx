import React from 'react';
import type { AnalysisData, FinalIssue } from '../types';

interface Step3Props {
    analysisData: AnalysisData;
    onIssueDefined: (issue: FinalIssue) => void;
}

const Step3_IssueDefiner: React.FC<Step3Props> = ({ analysisData, onIssueDefined }) => {
    
    const handleDefineIssue = () => {
        // Mock issue definition
        const mockIssue: FinalIssue = {
            mainIssue: "ירידה בהישגים במקצועות הליבה",
            rootCauses: ["חוסר התאמה של תכניות הלימודים", "מחסור בשעות פרטניות"],
            affectedSchools: analysisData.schools.filter(s => s.tier === 3).map(s => s.id),
        };
        onIssueDefined(mockIssue);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">שלב 3: הגדרת סוגייה מרכזית</h2>
            <p className="mb-6 text-gray-600">
                בהתבסס על ניתוח הנתונים, שלב זה מיועד להגדרת הסוגייה המרכזית להתערבות.
                כרגע זהו רכיב ממלא מקום.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-semibold text-lg">ממצאי הניתוח העיקריים:</h3>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li>{analysisData.summary.riskySchools} בתי ספר בסיכון גבוה.</li>
                    <li>זוהו אתגרים משמעותיים בתחומים: {analysisData.heatmapData.filter(h => h.percentage > 50).map(h => h.field).join(', ') || 'N/A'}.</li>
                </ul>
            </div>
            <button 
                onClick={handleDefineIssue}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                הגדר סוגייה (דמו) והמשך
            </button>
        </div>
    );
};

export default Step3_IssueDefiner;