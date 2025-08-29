import React from 'react';
import type { AnalysisData, FinalIssue, InterventionPlan, SupportPlan } from '../types';

interface Step4Props {
    analysisData: AnalysisData;
    finalIssue: FinalIssue;
    onPlanComplete: (ivp: InterventionPlan, sp: SupportPlan) => void;
    onReset: () => void;
}

const Step4_InterventionPlan: React.FC<Step4Props> = ({ analysisData, finalIssue, onPlanComplete, onReset }) => {

    const handleCompletePlan = () => {
        const mockIVP: InterventionPlan = {
            goal: "שיפור של 15% בממוצע ציוני הליבה בבתי הספר המושפעים",
            actions: ["הטמעת תכנית לימודים חדשה", "סדנאות פיתוח מקצועי למורים"],
            timeline: "שנת הלימודים תשפ\"ה",
            metrics: ["ציוני מבחנים רבעוניים", "סקרי שביעות רצון מורים"],
        };
        const mockSP: SupportPlan = {
            supportType: "ליווי פדגוגי צמוד",
            resources: ["מדריכים מקצועיים", "תקציב נוסף לחומרי למידה"],
            responsibleTeam: "צוות הפיקוח וההדרכה המחוזי",
        };
        onPlanComplete(mockIVP, mockSP);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">שלב 4: בניית תכנית התערבות</h2>
            <p className="mb-6 text-gray-600">
                בשלב זה בונים תכנית התערבות ותמיכה מפורטת.
                כרגע זהו רכיב ממלא מקום.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-semibold text-lg">הסוגייה שהוגדרה: {finalIssue.mainIssue}</h3>
                <p className="mt-2 text-gray-700">
                    <strong>סיבות שורש:</strong> {finalIssue.rootCauses.join(', ')}
                </p>
            </div>
            <button 
                onClick={handleCompletePlan}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition mr-4"
            >
                סיים והפק תכנית (דמו)
            </button>
             <button 
                onClick={onReset}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            >
                התחל מחדש
            </button>
        </div>
    );
};

export default Step4_InterventionPlan;