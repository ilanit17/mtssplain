import { Score } from "./types";

export const ALL_SCORE_FIELDS: (keyof import('./types').School)[] = [
    'vision_clearAndAgreedScore', 'vision_educationalConceptTranslatedScore', 'vision_resourcesAndEdgesScore', 'vision_strategicPlanningScore', 'vision_measurableGoalsScore', 'vision_communityPartnershipScore',
    'workPlan_needsBasedScore', 'workPlan_clearGoalsAndMetricsScore', 'workPlan_systematicMonitoringScore',
    'managementTeam_teamworkBasedScore', 'managementTeam_clearRolesScore', 'managementTeam_middleLeadershipInvolvedScore', 'managementTeam_roleHoldersCoachingScore', 'managementTeam_dataBasedDecisionsScore', 'managementTeam_teacherCollaborationScore',
    'routines_adaptedTimetableScore', 'routines_orderlyMeetingRoutinesScore', 'routines_decisionMakingProcessesScore',
    'resources_systematicAllocationScore', 'resources_resourceUtilizationTrackingScore', 'resources_controlAndImprovementScore',
    'staffCommitment_teamEngagementScore', 'staffCommitment_highSenseOfCapabilityScore', 'staffCommitment_highExpectationsScore',
    'staffLearning_adaptedProfessionalDevelopmentScore', 'staffLearning_connectingDevelopmentToPracticeScore', 'staffLearning_subjectAreaTrainingScore', 'staffLearning_peerLearningCultureScore', 'staffLearning_innovativeInitiativesScore', 'staffLearning_highExpectationsOfAchievementsScore',
    'staffWellbeing_teachersReceiveSupportScore', 'staffWellbeing_structuredOnboardingProcessesScore', 'staffWellbeing_wellbeingAndResilienceSupportScore', 'staffWellbeing_cohesionBuildingActivitiesScore', 'staffWellbeing_highStaffStabilityScore', 'staffWellbeing_highSatisfactionScore',
    'climateMapping_climateDataAnalysisScore', 'climateMapping_monitoringAndEvaluationRoutinesScore', 'climateMapping_detectionAndTreatmentMechanismsScore',
    'climateSafety_proceduresAndRulesEnforcedScore', 'climateSafety_safetyReinforcementProgramsScore', 'climateSafety_socialActivitiesScore', 'climateSafety_fewViolenceIncidentsScore', 'climateSafety_recognitionAndAppreciationCultureScore',
    'climateRelationships_personalSocialEmotionalDialogueScore', 'climateRelationships_familiarityAndPersonalConnectionScore', 'climateRelationships_teacherToolsAndCoachingScore', 'climateRelationships_optimalSocialAtmosphereScore',
    'sel_lifeSkillsProgramScore', 'sel_parentalConnectionScore', 'sel_diverseSupportOptionsScore',
    'language_adequateReadingComprehensionScore', 'language_developedWritingSkillsScore', 'language_broadVocabularyScore', 'language_clearOralExpressionScore', 'language_establishedReadingCultureScore', 'language_differentiatedResponseScore',
    'math_basicSkillsMasteryScore', 'math_effectiveStrategiesScore', 'math_optimalAnxietyCopingScore', 'math_useOfVisualAidsScore', 'math_sufficientDifferentiationScore', 'math_linkToDailyLifeScore',
    'english_studentsConfidentInUseScore', 'english_exposureOutsideClassScore', 'english_adaptedTeachingMethodsScore', 'english_useOfTechnologicalToolsScore', 'english_groupSizeAllowsGrowthScore', 'english_useOfAuthenticMaterialsScore',
    'science_sufficientLabEquipmentScore', 'science_developedInquirySkillsScore', 'science_practicalExperiencesScore', 'science_developedScientificThinkingScore', 'science_updatedCurriculumScore', 'science_linkToEnvironmentAndCommunityScore',
    'pedagogyPlanning_knowledgeAndSkillsMappingScore', 'pedagogyPlanning_findingsTranslatedScore', 'pedagogyPlanning_effectivenessReviewScore', 'pedagogyPlanning_literacyPromotionEffortsScore', 'pedagogyPlanning_entrepreneurshipAndInnovationCultureScore',
    'pedagogyPractices_lessonsIncludeVarietyScore', 'pedagogyPractices_diverseLearningMethodsScore', 'pedagogyPractices_useOfDigitalToolsScore', 'pedagogyPractices_differentiatedTeachingScore', 'pedagogyPractices_teachingPromotesThinkingScore', 'pedagogyPractices_teachingLearningSkillsScore',
    'pedagogyFeedback_managedEvaluationProcessesScore', 'pedagogyFeedback_teachersHaveKnowledgeAndSkillsScore', 'pedagogyFeedback_feedbackAndReflectionProcessesScore', 'pedagogyFeedback_evaluationCriteriaScore',
    'pedagogyFlexibility_flexibleLearningOrganizationScore', 'pedagogyFlexibility_focusedCurriculumScore', 'pedagogyFlexibility_teachersHaveInterdisciplinaryKnowledgeScore',
    'pedagogyCollaboration_jointPlanningRoutinesScore', 'pedagogyCollaboration_adaptedPracticesScore', 'pedagogyCollaboration_jointExaminationScore', 'pedagogyCollaboration_openDialogueForImprovementScore', 'pedagogyCollaboration_opennessToLearningScore', 'pedagogyCollaboration_beliefInAbilitiesScore',
    'communityContinuum_enrichmentProgramsOfferedScore', 'communityContinuum_tripsConnectedToCurriculumScore', 'communityContinuum_diverseEducationalFrameworksScore',
    'communitySocial_socialEducationIsAdaptedScore', 'communitySocial_teachersHaveKnowledgeAndToolsScore', 'communitySocial_teachingAssistantsPotentialRealizedScore',
    'communityLeisure_collaborationsWithOrganizationsScore', 'communityLeisure_encouragementAndGuidanceForParticipationScore', 'communityLeisure_wideRangeOfActivitiesScore',
    'communityPartnerships_parentParticipationInMeetingsScore', 'communityPartnerships_continuousCommunicationToFamiliesScore', 'communityPartnerships_parentsInvolvedInActivitiesScore', 'communityPartnerships_parentsHaveToolsToSupportScore', 'communityPartnerships_effectiveDialogueWithAuthorityScore', 'communityPartnerships_externalResourcesUtilizedScore'
];


export const FIELD_HEBREW_MAP: { [key: string]: string } = {
    'vision_clearAndAgreedScore': 'חזון ברור - החזון ברור ומוסכם',
    'vision_educationalConceptTranslatedScore': 'חזון ברור - התפיסה החינוכית מתורגמת',
    'vision_resourcesAndEdgesScore': 'חזון ברור - משאבים וקצו',
    'vision_strategicPlanningScore': 'חזון ברור - תכנון אסטרטגי',
    'vision_measurableGoalsScore': 'חזון ברור - היעדים מדידים',
    'vision_communityPartnershipScore': 'חזון ברור - הקהילה שותפה',
    'workPlan_needsBasedScore': 'תוכנית עבודה - מבוססת על מיפוי צרכים',
    'workPlan_clearGoalsAndMetricsScore': 'תוכנית עבודה - יעדים ומדדים ברורים',
    'workPlan_systematicMonitoringScore': 'תוכנית עבודה - מעקב שיטתי',
    'managementTeam_teamworkBasedScore': 'צוות הנהלה - עבודת צוות מתבססת',
    'managementTeam_clearRolesScore': 'צוות הנהלה - הגדרות תפקידים ברורות',
    'managementTeam_middleLeadershipInvolvedScore': 'צוות הנהלה - מנהיגות הביניים שותפה',
    'managementTeam_roleHoldersCoachingScore': 'צוות הנהלה - בעלי תפקידים מקבלים ליווי',
    'managementTeam_dataBasedDecisionsScore': 'צוות הנהלה - קבלת החלטות מבוססת נתונים',
    'managementTeam_teacherCollaborationScore': 'צוות הנהלה - שיתוף פעולה צוות מורים',
    'routines_adaptedTimetableScore': 'שגרות ארגוניות - מערכת שעות מותאמת',
    'routines_orderlyMeetingRoutinesScore': 'שגרות ארגוניות - שגרות ישיבות סדורות',
    'routines_decisionMakingProcessesScore': 'שגרות ארגוניות - תהליכי קבלת החלטות',
    'resources_systematicAllocationScore': 'ניהול משאבים - הקצאת משאבים שיטתית',
    'resources_resourceUtilizationTrackingScore': 'ניהול משאבים - מעקב ניצול משאבים',
    'resources_controlAndImprovementScore': 'ניהול משאבים - בקרה ושיפור',
    'staffCommitment_teamEngagementScore': 'מחויבות צוות - הצוות נרתם ומחויב',
    'staffCommitment_highSenseOfCapabilityScore': 'מחויבות צוות - תחושת מסוגלות גבוהה',
    'staffCommitment_highExpectationsScore': 'מחויבות צוות - רף ציפיות גבוה',
    'staffLearning_adaptedProfessionalDevelopmentScore': 'למידה והתמקצעות - פיתוח מקצועי מותאם',
    'staffLearning_connectingDevelopmentToPracticeScore': 'למידה והתמקצעות - חיבור פיתוח ליישום',
    'staffLearning_subjectAreaTrainingScore': 'למידה והתמקצעות - הדרכה בתחומי דעת',
    'staffLearning_peerLearningCultureScore': 'למידה והתמקצעות - תרבות למידת עמיתים',
    'staffLearning_innovativeInitiativesScore': 'למידה והתמקצעות - יוזמות חדשניות',
    'staffLearning_highExpectationsOfAchievementsScore': 'למידה והתמקצעות - ציפיות גבוהות מהישגים',
    'staffWellbeing_teachersReceiveSupportScore': 'רווחה ויציבות - מורים זוכים לליווי',
    'staffWellbeing_structuredOnboardingProcessesScore': 'רווחה ויציבות - תהליכי קליטה מובנים',
    'staffWellbeing_wellbeingAndResilienceSupportScore': 'רווחה ויציבות - מענים לרווחה וחוסן',
    'staffWellbeing_cohesionBuildingActivitiesScore': 'רווחה ויציבות - פעילויות חיזוק לכידות',
    'staffWellbeing_highStaffStabilityScore': 'רווחה ויציבות - יציבות הצוות גבוהה',
    'staffWellbeing_highSatisfactionScore': 'רווחה ויציבות - שביעות רצון גבוהה',
    'climateMapping_climateDataAnalysisScore': 'מיפוי אקלים - ניתוח נתוני אקלים',
    'climateMapping_monitoringAndEvaluationRoutinesScore': 'מיפוי אקלים - שגרות למעקב והערכה',
    'climateMapping_detectionAndTreatmentMechanismsScore': 'מיפוי אקלים - מנגנוני איתור וטיפול',
    'climateSafety_proceduresAndRulesEnforcedScore': 'מוגנות ושייכות - נהלים וכללים נאכפים',
    'climateSafety_safetyReinforcementProgramsScore': 'מוגנות ושייכות - תוכניות חיזוק מוגנות',
    'climateSafety_socialActivitiesScore': 'מוגנות ושייכות - פעילויות חברתיות',
    'climateSafety_fewViolenceIncidentsScore': 'מוגנות ושייכות - אירועי אלימות מצומצמים',
    'climateSafety_recognitionAndAppreciationCultureScore': 'מוגנות ושייכות - תרבות הכרה והוקרה',
    'climateRelationships_personalSocialEmotionalDialogueScore': 'יחסי קרבה - שיח אישי רגשי חברתי',
    'climateRelationships_familiarityAndPersonalConnectionScore': 'יחסי קרבה - היכרות וקשר אישי',
    'climateRelationships_teacherToolsAndCoachingScore': 'יחסי קרבה - למורים כלים וליווי',
    'climateRelationships_optimalSocialAtmosphereScore': 'יחסי קרבה - אווירה חברתית מיטבית',
    'sel_lifeSkillsProgramScore': 'מיומנויות רגשיות - תוכנית כישורי חיים',
    'sel_parentalConnectionScore': 'מיומנויות רגשיות - קיום קשר עם הורים',
    'sel_diverseSupportOptionsScore': 'מיומנויות רגשיות - מגוון מענים לטיפול',
    'language_adequateReadingComprehensionScore': 'שפה - רמת הבנת הנקרא מספקת',
    'language_developedWritingSkillsScore': 'שפה - כישורי כתיבה מפותחים',
    'language_broadVocabularyScore': 'שפה - אוצר מילים רחב',
    'language_clearOralExpressionScore': 'שפה - ביטוי בעל פה ברור',
    'language_establishedReadingCultureScore': 'שפה - תרבות קריאה מבוססת',
    'language_differentiatedResponseScore': 'שפה - מענה דיפרנציאלי',
    'math_basicSkillsMasteryScore': 'מתמטיקה - מיומנויות יסוד בשליטה',
    'math_effectiveStrategiesScore': 'מתמטיקה - אסטרטגיות יעילות',
    'math_optimalAnxietyCopingScore': 'מתמטיקה - התמודדות מיטבית חרדה',
    'math_useOfVisualAidsScore': 'מתמטיקה - שימוש אמצעי המחשה',
    'math_sufficientDifferentiationScore': 'מתמטיקה - דיפרנציאציה מספקת',
    'math_linkToDailyLifeScore': 'מתמטיקה - קישור לחיי יומיום',
    'english_studentsConfidentInUseScore': 'אנגלית - תלמידים בטוחים בשימוש',
    'english_exposureOutsideClassScore': 'אנגלית - חשיפה מחוץ לשיעור',
    'english_adaptedTeachingMethodsScore': 'אנגלית - שיטות הוראה מותאמות',
    'english_useOfTechnologicalToolsScore': 'אנגלית - שימוש כלים טכנולוגיים',
    'english_groupSizeAllowsGrowthScore': 'אנגלית - גודל קבוצות מאפשר מגדל',
    'english_useOfAuthenticMaterialsScore': 'אנגלית - שימוש חומרים אותנטיים',
    'science_sufficientLabEquipmentScore': 'מדעים - ציוד מעבדה מספק',
    'science_developedInquirySkillsScore': 'מדעים - מיומנויות חקר מפותחות',
    'science_practicalExperiencesScore': 'מדעים - התנסויות מעשיות',
    'science_developedScientificThinkingScore': 'מדעים - חשיבה מדעית מפותחת',
    'science_updatedCurriculumScore': 'מדעים - תוכנית מעודכנת לחזית',
    'science_linkToEnvironmentAndCommunityScore': 'מדעים - קישור לסביבה ולקהילה',
    'pedagogyPlanning_knowledgeAndSkillsMappingScore': 'תכנון הוראה - מיפוי ידע ומיומנויות',
    'pedagogyPlanning_findingsTranslatedScore': 'תכנון הוראה - ממצאי המיפוי מתורגמים',
    'pedagogyPlanning_effectivenessReviewScore': 'תכנון הוראה - בחינת אפקטיביות',
    'pedagogyPlanning_literacyPromotionEffortsScore': 'תכנון הוראה - המאמצים לקידום אוריינות',
    'pedagogyPlanning_entrepreneurshipAndInnovationCultureScore': 'תכנון הוראה - תרבות יזמות וחדשנות',
    'pedagogyPractices_lessonsIncludeVarietyScore': 'פרקטיקות הוראה - שיעורים כוללים מגוון',
    'pedagogyPractices_diverseLearningMethodsScore': 'פרקטיקות הוראה - דרכי למידה מגוונות',
    'pedagogyPractices_useOfDigitalToolsScore': 'פרקטיקות הוראה - שימוש כלים דיגיטליים',
    'pedagogyPractices_differentiatedTeachingScore': 'פרקטיקות הוראה - הוראה דיפרנציאלית',
    'pedagogyPractices_teachingPromotesThinkingScore': 'פרקטיקות הוראה - ההוראה מקדמת חשיבה',
    'pedagogyPractices_teachingLearningSkillsScore': 'פרקטיקות הוראה - הקנייה מיומנויות למידה',
    'pedagogyFeedback_managedEvaluationProcessesScore': 'משוב והערכה - תהליכי הערכה מנוהלים',
    'pedagogyFeedback_teachersHaveKnowledgeAndSkillsScore': 'משוב והערכה - למורים ידע ומיומנויות',
    'pedagogyFeedback_feedbackAndReflectionProcessesScore': 'משוב והערכה - תהליכי משוב ורפלקציה',
    'pedagogyFeedback_evaluationCriteriaScore': 'משוב והערכה - קריטריונים להערכה',
    'pedagogyFlexibility_flexibleLearningOrganizationScore': 'גמישות פדגוגית - ארגון הלמידה גמיש',
    'pedagogyFlexibility_focusedCurriculumScore': 'גמישות פדגוגית - תוכנית הלימודים ממוקדת',
    'pedagogyFlexibility_teachersHaveInterdisciplinaryKnowledgeScore': 'גמישות פדגוגית - למורים ידע למידה בין תחומית',
    'pedagogyCollaboration_jointPlanningRoutinesScore': 'שיתוף פעולה הוראה - שגרות תכנון משותף',
    'pedagogyCollaboration_adaptedPracticesScore': 'שיתוף פעולה הוראה - פרקטיקות מותאמות',
    'pedagogyCollaboration_jointExaminationScore': 'שיתוף פעולה הוראה - בחינה משותפת',
    'pedagogyCollaboration_openDialogueForImprovementScore': 'שיתוף פעולה הוראה - שיח פתוח לשיפור',
    'pedagogyCollaboration_opennessToLearningScore': 'שיתוף פעולה הוראה - פתיחות ללמידה',
    'pedagogyCollaboration_beliefInAbilitiesScore': 'שיתוף פעולה הוראה - אמונה ביכולות',
    'communityContinuum_enrichmentProgramsOfferedScore': 'מענים לרצף - קיים היצע תוכניות העשרה',
    'communityContinuum_tripsConnectedToCurriculumScore': 'מענים לרצף - טיולים מחוברים לתוכנית',
    'communityContinuum_diverseEducationalFrameworksScore': 'מענים לרצף - מסגרות חינוכיות מגוונות',
    'communitySocial_socialEducationIsAdaptedScore': 'חינוך חברתי - החינוך החברתי מותאם',
    'communitySocial_teachersHaveKnowledgeAndToolsScore': 'חינוך חברתי - למורים ידע וכלים',
    'communitySocial_teachingAssistantsPotentialRealizedScore': 'חינוך חברתי - מוצה פוטנציאל תומכי הוראה',
    'communityLeisure_collaborationsWithOrganizationsScore': 'פעילות פנאי - שיתופי פעולה ארגונים',
    'communityLeisure_encouragementAndGuidanceForParticipationScore': 'פעילות פנאי - עידוד והכוונה השתתפות',
    'communityLeisure_wideRangeOfActivitiesScore': 'פעילות פנאי - היצע חוגים רחב',
    'communityPartnerships_parentParticipationInMeetingsScore': 'קשרי קהילה - השתתפות הורים במפגשים',
    'communityPartnerships_continuousCommunicationToFamiliesScore': 'קשרי קהילה - תקשורת רציפה למשפחות',
    'communityPartnerships_parentsInvolvedInActivitiesScore': 'קשרי קהילה - הורים מעורבים בפעילויות',
    'communityPartnerships_parentsHaveToolsToSupportScore': 'קשרי קהילה - להורים כלים לתמיכה',
    'communityPartnerships_effectiveDialogueWithAuthorityScore': 'קשרי קהילה - שיח אפקטיבי עם רשות',
    'communityPartnerships_externalResourcesUtilizedScore': 'קשרי קהילה - משאבים חיצוניים מנוצלים'
};

export const CHALLENGES: Record<string, string[]> = {
    vision: [
        "החזון הבית ספרי אינו ברור, מוסכם, או אינו מבטא את זהות בית הספר.",
        "התפיסה החינוכית אינה מתורגמת באופן עקבי לתוכנית העבודה הבית ספרית.",
        "קיים קושי בקידום פעילויות והקצאת משאבים להטמעת התפיסה החינוכית.",
        "היעדר תכנון אסטרטגי ארוך טווח.",
        "הגדרת יעדים לא מדידים או לא ריאליים.",
        "חוסר שיתוף הקהילה בגיבוש החזון הבית ספרי."
    ],
    workPlan: [
        "תוכנית העבודה אינה מבוססת מספיק על מיפוי צרכים ואיסוף נתונים שיטתי.",
        "תוכנית העבודה חסרה יעדים ומדדים ברורים, או שהקצאת המשאבים אינה מוגדרת.",
        "המעקב אחר יישום תוכנית העבודה וניצול המשאבים אינו שיטתי ומספק."
    ],
    managementTeam: [
        "הגדרות התפקידים אינן ברורות דיין וקיימת חפיפה או חוסר איזון בחלוקת האחריות.",
        "מנהיגות הביניים אינה שותפה מספיק בהובלה או שאינה לוקחת אחריות מספקת.",
        "בעלי התפקידים אינם מקבלים ליווי מקצועי וכלים מספקים לניהול והובלה.",
        "תהליכי קבלת החלטות לא מבוססי נתונים."
    ],
    routines: [
        "מערכת השעות אינה מותאמת באופן מיטבי לצרכים שעלו במיפוי ואינה מבטאת את יעדי בית הספר.",
        "שגרות ישיבות ההנהלה והצוות אינן קבועות, סדורות או מתועדות כנדרש."
    ],
    resources: [
        "הקצאת המשאבים אינה מתבססת באופן שיטתי על מיפוי צרכים ואינה תואמת את יעדי בית הספר.",
        "המעקב אחר אופן ניצול המשאבים לקוי ואינו כולל איסוף נתונים שיטתי.",
        "תהליכי הבקרה וההערכה על אפקטיביות השימוש בשעות התקן והשעות הפרטניות אינם מספקים."
    ],
    staffCommitment: [
        "רמת המחויבות וההירתמות של הצוות החינוכי לקידום משימות בית ספריות אינה מספקת.",
        "תחושת המסוגלות של הצוות נמוכה, וקיים ספק ביכולת לתת מענה למגוון צורכי התלמידים.",
        "רף הציפיות של הצוות מהתלמידים אינו גבוה מספיק, וקיימת אי-אחידות בציפיות."
    ],
    staffLearning: [
        "הפיתוח המקצועי אינו מותאם מספיק לצורכי המורים כפי שעולים מהשטח.",
        "קיים פער בין הנלמד בפיתוח המקצועי לבין יישומו בפועל בכיתות.",
        "ההדרכה בתחומי הדעת אינה סדורה ואינה עונה באופן מלא על צורכי המורים.",
        "תרבות למידת העמיתים אינה מפותחת מספיק ואינה מובילה לשיפור באיכות ההוראה.",
        "מיעוט יוזמות חדשניות בתחום הפדגוגיה.",
        "ציפיות נמוכות מהישגי התלמידים."
    ],
    staffWellbeing: [
        "הליווי והחניכה האישית למורים לחיזוק עבודתם הפדגוגית אינם מספקים או שיטתיים.",
        "תהליכי הקליטה והליווי של מורים חדשים אינם מובנים ואינם מותאמים לצרכיהם.",
        "קיים חסר במענים לרווחתם ולחוסנם הרגשי של המורים (ייעוץ, ליווי, תמיכה).",
        "מיעוט פעילויות גיבוש וחוסר השקעה בלכידות הצוות.",
        "תחלופה גבוהה של צוות הוראה והסתמכות גבוהה על מורים מחליפים.",
        "שביעות רצון נמוכה בקרב צוות ההוראה."
    ],
    climateMapping: [
        "ניתוח נתוני האקלים אינו מוביל להקצאת מענים רגשיים-חברתיים מותאמים.",
        "המנגנונים לאיתור וטיפול בתלמידים בסיכון אינם יעילים או שיטתיים מספיק."
    ],
    climateSafety: [
        "קיימת אי-אחידות באכיפת הנהלים והכללים שבתקנון הבית ספרי.",
        "התוכניות לחיזוק תחושת המוגנות של תלמידים וצוות אינן מספקות או שאינן אפקטיביות.",
        "מיעוט פעילויות חברתיות הפוגע בתחושת השייכות וגאוות היחידה.",
        "אירועי אלימות תכופים הדורשים התערבות.",
        "היעדר תרבות של הכרה והוקרת הישגים."
    ],
    climateRelationships: [
        "שיח אישי רגשי-חברתי בין מורים לתלמידים אינו מתקיים באופן סדור ושיטתי.",
        "קיים ריחוק וקושי ביצירת היכרות וטיפוח קשר אישי בין מורים לתלמידים.",
        "המורים חסרים כלים וליווי מקצועי לקיום שיח אישי ומתן תמיכה רגשית לתלמידים.",
        "האווירה החברתית בכיתה אינה מיטבית, וקיים קושי ביצירת קהילת לומדים מכבדת."
    ],
    sel: [
        "תוכנית כישורי חיים אינה מיושמת באופן עקבי או שאינה מותאמת לגיל התלמידים.",
        "הקשר עם ההורים בנושא ההתפתחות הרגשית-חברתית של ילדיהם לקוי, ושיתופם בתהליך נמוך.",
        "מגוון המענים לטיפול בקשיים רגשיים והתנהגותיים אינו רחב מספיק או שאינו זמין."
    ],
    language: [
        "רמת הבנת הנקרא אינה מספקת",
        "כישורי כתיבה הדורשים שיפור",
        "אוצר מילים מוגבל ביחס לדרישות תוכנית הלימודים",
        "קושי בביטוי בעל פה ובניסוח רעיונות",
        "היעדר תרבות קריאה מבוססת בבית הספר",
        "מחסור במענה דיפרנציאלי לתלמידים דוברי שפות אחרות"
    ],
    math: [
        "קושי באסטרטגיות לפתרון בעיות מתמטיות",
        "חרדת מתמטיקה המשפיעה על הישגי התלמידים",
        "מחסור בשימוש באמצעי המחשה ואמצעים דידקטיים",
        "היעדר דיפרנציאציה מספקת בהוראה",
        "חוסר בקישור בין המתמטיקה לחיי היומיום"
    ],
    english: [
        "חוסר ביטחון בשימוש בשפה האנגלית בעל פה",
        "חשיפה מוגבלת לאנגלית מחוץ למסגרת השיעור",
        "שיטות הוראה שאינן מותאמות לצרכי המאה ה-21",
        "שימוש מוגבל בכלים טכנולוגיים להוראת השפה",
        "קבוצות למידה גדולות המקשות על תרגול אפקטיבי",
        "מחסור בשימוש בחומרים אותנטיים בהוראה"
    ],
    science: [
        "מחסור בציוד מעבדה ואמצעי המחשה",
        "פיתוח לא מספק של מיומנויות חקר מדעי",
        "מיעוט התנסויות מעשיות בתהליכי למידה",
        "תוכנית לימודים שאינה מעודכנת לחזית המדע",
        "חוסר בקישור בין תכני המדע לסביבה ולקהילה"
    ],
    pedagogyPlanning: [
        "קיים קושי בתרגום ממצאי המיפוי ליעדים מדידים ולמענים לימודיים מותאמים.",
        "בחינת אפקטיביות המענים אינה מבוססת נתונים ואינה מובילה להסקת מסקנות ושיפור.",
        "המאמצים לקידום אוריינות וצמצום פערים אינם מספקים ואינם משיגים את התוצאות הרצויות.",
        "תרבות של יזמות וחדשנות פדגוגית אינה מפותחת דיה בקרב הצוות החינוכי."
    ],
    pedagogyPractices: [
        "ההוראה בכיתות מונוטונית ואינה כוללת מגוון רחב של פרקטיקות הוראה.",
        "דרכי הלמידה בשיעורים אינן מגוונות וממוקדות בעיקר בהוראה פרונטלית.",
        "השימוש בכלים דיגיטליים ושיטות למידה היברידיות מועט ואינו מותאם לשכבת הגיל.",
        "ההוראה אינה דיפרנציאלית מספיק ואינה נותנת מענה לשונות בין התלמידים.",
        "ההוראה אינה מקדמת מספיק פיתוח מיומנויות חשיבה מסדר גבוה.",
        "קיים חסר בהקניית מיומנויות למידה עצמית ופיתוח תפקודים ניהוליים אצל התלמידים."
    ],
    pedagogyFeedback: [
        "תהליכי הערכה אינם מנוהלים בצמתים מרכזיים ואינם מובילים למתן מענים מותאמים.",
        "המורים חסרים ידע ומיומנויות להובלת תהליכי הערכה פנימית אפקטיביים.",
        "תהליכי משוב, רפלקציה והערכה עצמית אינם חלק אינטגרלי מתהליכי ההוראה-למידה.",
        "הקריטריונים להערכת תלמידים אינם ברורים, אחידים או שאינם מבוססי מחוונים."
    ],
    pedagogyFlexibility: [
        "קיימת נוקשות רבה בארגון הלמידה ובבחירת תכנים, המגבילה את הגמישות הפדגוגית.",
        "תוכנית הלימודים עמוסה ואינה ממוקדת, מה שמקשה על העמקה.",
        "המורים חסרים ידע ומיומנויות להובלת למידה בין-תחומית משמעותית."
    ],
    pedagogyCollaboration: [
        "היעדר שגרות של תכנון הוראה משותף.",
        "פרקטיקות הוראה אינן מותאמות לצרכי התלמידים.",
        "היעדר ניתוח שיטתי ומשותף של נתוני התלמידים.",
        "היעדר שיח פתוח וכנה על הצורך בשיפור ההוראה.",
        "היעדר פתיחות ללמידה של דרכי הוראה חדשות.",
        "היעדר אמונה ביכולות התלמידים והטלת האחריות עליהם."
    ],
    communityContinuum: [
        "היצע תוכניות ההעשרה וההעצמה דל ואינו מותאם לצרכים שעלו במיפוי.",
        "הטיולים אינם מחוברים באופן מספק לתוכנית הלימודים או שאינם מותאמים לשכבת הגיל.",
        "היעדר מסגרות חינוכיות מגוונות לתלמידים במהלך החופשות."
    ],
    communitySocial: [
        "החינוך החברתי והמעורבות החברתית אינם מותאמים מספיק לצורכי הגיל.",
        "הפוטנציאל של תומכי ההוראה בתחום החברתי (מורות חיילות, ש\"ש) אינו ממוצה."
    ],
    communityLeisure: [
        "שיתופי הפעולה עם ארגוני חינוך בלתי פורמלי חלשים או לא קיימים.",
        "קיים עידוד נמוך להשתתפות בחינוך בלתי פורמלי ואין מעקב מסודר אחר ההשתתפות.",
        "היצע החוגים ופעילויות הפנאי אחרי שעות הלימודים מצומצם ואינו עונה על צורכי התלמידים."
    ],
    communityPartnerships: [
        "השתתפות מוגבלת של הורים במפגשים בית ספריים.",
        "תקשורת לא רציפה בין בית הספר למשפחות התלמידים.",
        "מעורבות מוגבלת של הורים בפעילויות בית ספריות.",
        "מחסור בכלים להורים לתמיכה בלמידה בבית.",
        "היעדר שיח אפקטיבי עם הרשות לליווי ותמיכה.",
        "ניצול לא מיטבי של משאבים חיצוניים."
    ]
};

export const HIERARCHICAL_CATEGORIES = [
    {
        name: 'מנהיגות ותרבות בית ספרית',
        subCategories: [
            { name: 'חזון ברור', key: 'vision', metrics: [
                { key: 'vision_clearAndAgreedScore', name: 'החזון ברור ומוסכם'},
                { key: 'vision_educationalConceptTranslatedScore', name: 'התפיסה החינוכית מתורגמת'},
                { key: 'vision_resourcesAndEdgesScore', name: 'משאבים וקצו'},
                { key: 'vision_strategicPlanningScore', name: 'תכנון אסטרטגי'},
                { key: 'vision_measurableGoalsScore', name: 'היעדים מדידים'},
                { key: 'vision_communityPartnershipScore', name: 'הקהילה שותפה'},
            ]},
            { name: 'תוכנית עבודה', key: 'workPlan', metrics: [
                { key: 'workPlan_needsBasedScore', name: 'מבוססת על מיפוי צרכים'},
                { key: 'workPlan_clearGoalsAndMetricsScore', name: 'יעדים ומדדים ברורים'},
                { key: 'workPlan_systematicMonitoringScore', name: 'מעקב שיטתי'},
            ]},
            { name: 'צוות הנהלה', key: 'managementTeam', metrics: [
                { key: 'managementTeam_teamworkBasedScore', name: 'עבודת צוות מתבססת'},
                { key: 'managementTeam_clearRolesScore', name: 'הגדרות תפקידים ברורות'},
                { key: 'managementTeam_middleLeadershipInvolvedScore', name: 'מנהיגות הביניים שותפה'},
                { key: 'managementTeam_roleHoldersCoachingScore', name: 'בעלי תפקידים מקבלים ליווי'},
                { key: 'managementTeam_dataBasedDecisionsScore', name: 'קבלת החלטות מבוססת נתונים'},
                { key: 'managementTeam_teacherCollaborationScore', name: 'שיתוף פעולה צוות מורים'},
            ]},
            { name: 'שגרות ארגוניות', key: 'routines', metrics: [
                { key: 'routines_adaptedTimetableScore', name: 'מערכת שעות מותאמת'},
                { key: 'routines_orderlyMeetingRoutinesScore', name: 'שגרות ישיבות סדורות'},
                { key: 'routines_decisionMakingProcessesScore', name: 'תהליכי קבלת החלטות'},
            ]},
            { name: 'ניהול משאבים', key: 'resources', metrics: [
                { key: 'resources_systematicAllocationScore', name: 'הקצאת משאבים שיטתית'},
                { key: 'resources_resourceUtilizationTrackingScore', name: 'מעקב ניצול משאבים'},
                { key: 'resources_controlAndImprovementScore', name: 'בקרת ושיפור'},
            ]},
        ]
    },
    {
        name: 'צוות חינוכי',
        subCategories: [
            { name: 'מחויבות צוות', key: 'staffCommitment', metrics: [
                { key: 'staffCommitment_teamEngagementScore', name: 'הצוות נרתם ומחויב'},
                { key: 'staffCommitment_highSenseOfCapabilityScore', name: 'תחושת מסוגלות גבוהה'},
                { key: 'staffCommitment_highExpectationsScore', name: 'רף ציפיות גבוה'},
            ]},
            { name: 'למידה והתמקצעות', key: 'staffLearning', metrics: [
                 { key: 'staffLearning_adaptedProfessionalDevelopmentScore', name: 'פיתוח מקצועי מותאם'},
                { key: 'staffLearning_connectingDevelopmentToPracticeScore', name: 'חיבור פיתוח ליישום'},
                { key: 'staffLearning_subjectAreaTrainingScore', name: 'הדרכה בתחומי דעת'},
                { key: 'staffLearning_peerLearningCultureScore', name: 'תרבות למידת עמיתים'},
                { key: 'staffLearning_innovativeInitiativesScore', name: 'יוזמות חדשניות'},
                { key: 'staffLearning_highExpectationsOfAchievementsScore', name: 'ציפיות גבוהות מהישגים'},
            ]},
            { name: 'רווחה ויציבות', key: 'staffWellbeing', metrics: [
                { key: 'staffWellbeing_teachersReceiveSupportScore', name: 'מורים זוכים לליווי'},
                { key: 'staffWellbeing_structuredOnboardingProcessesScore', name: 'תהליכי קליטה מובנים'},
                { key: 'staffWellbeing_wellbeingAndResilienceSupportScore', name: 'מענים לרווחה וחוסן'},
                { key: 'staffWellbeing_cohesionBuildingActivitiesScore', name: 'פעילויות חיזוק לכידות'},
                { key: 'staffWellbeing_highStaffStabilityScore', name: 'יציבות הצוות גבוהה'},
                { key: 'staffWellbeing_highSatisfactionScore', name: 'שביעות רצון גבוהה'},
            ]},
        ]
    },
    {
        name: 'למידה רגשית-חברתית ואקלים',
        subCategories: [
            { name: 'מיפוי אקלים', key: 'climateMapping', metrics: [
                { key: 'climateMapping_climateDataAnalysisScore', name: 'ניתוח נתוני אקלים'},
                { key: 'climateMapping_monitoringAndEvaluationRoutinesScore', name: 'שגרות למעקב והערכה'},
                { key: 'climateMapping_detectionAndTreatmentMechanismsScore', name: 'מנגנוני איתור וטיפול'},
            ]},
            { name: 'מוגנות ושייכות', key: 'climateSafety', metrics: [
                { key: 'climateSafety_proceduresAndRulesEnforcedScore', name: 'נהלים וכללים נאכפים'},
                { key: 'climateSafety_safetyReinforcementProgramsScore', name: 'תוכניות חיזוק מוגנות'},
                { key: 'climateSafety_socialActivitiesScore', name: 'פעילויות חברתיות'},
                { key: 'climateSafety_fewViolenceIncidentsScore', name: 'אירועי אלימות מצומצמים'},
                { key: 'climateSafety_recognitionAndAppreciationCultureScore', name: 'תרבות הכרה והוקרה'},
            ]},
            { name: 'יחסי קרבה', key: 'climateRelationships', metrics: [
                { key: 'climateRelationships_personalSocialEmotionalDialogueScore', name: 'שיח אישי רגשי חברתי'},
                { key: 'climateRelationships_familiarityAndPersonalConnectionScore', name: 'היכרות וקשר אישי'},
                { key: 'climateRelationships_teacherToolsAndCoachingScore', name: 'למורים כלים וליווי'},
                { key: 'climateRelationships_optimalSocialAtmosphereScore', name: 'אווירה חברתית מיטבית'},
            ]},
            { name: 'מיומנויות רגשיות', key: 'sel', metrics: [
                { key: 'sel_lifeSkillsProgramScore', name: 'תוכנית כישורי חיים'},
                { key: 'sel_parentalConnectionScore', name: 'קיום קשר עם הורים'},
                { key: 'sel_diverseSupportOptionsScore', name: 'מגוון מענים לטיפול'},
            ]},
        ]
    },
    {
        name: 'הישגים בתחומי הליבה',
        subCategories: [
             { name: 'שפה', key: 'language', metrics: [
                { key: 'language_adequateReadingComprehensionScore', name: 'רמת הבנת הנקרא מספקת'},
                { key: 'language_developedWritingSkillsScore', name: 'כישורי כתיבה מפותחים'},
                { key: 'language_broadVocabularyScore', name: 'אוצר מילים רחב'},
                { key: 'language_clearOralExpressionScore', name: 'ביטוי בעל פה ברור'},
                { key: 'language_establishedReadingCultureScore', name: 'תרבות קריאה מבוססת'},
                { key: 'language_differentiatedResponseScore', name: 'מענה דיפרנציאלי'},
            ]},
            { name: 'מתמטיקה', key: 'math', metrics: [
                { key: 'math_basicSkillsMasteryScore', name: 'מיומנויות יסוד בשליטה'},
                { key: 'math_effectiveStrategiesScore', name: 'אסטרטגיות יעילות'},
                { key: 'math_optimalAnxietyCopingScore', name: 'התמודדות מיטבית חרדה'},
                { key: 'math_useOfVisualAidsScore', name: 'שימוש אמצעי המחשה'},
                { key: 'math_sufficientDifferentiationScore', name: 'דיפרנציאציה מספקת'},
                { key: 'math_linkToDailyLifeScore', name: 'קישור לחיי יומיום'},
            ]},
            { name: 'אנגלית', key: 'english', metrics: [
                { key: 'english_studentsConfidentInUseScore', name: 'תלמידים בטוחים בשימוש'},
                { key: 'english_exposureOutsideClassScore', name: 'חשיפה מחוץ לשיעור'},
                { key: 'english_adaptedTeachingMethodsScore', name: 'שיטות הוראה מותאמות'},
                { key: 'english_useOfTechnologicalToolsScore', name: 'שימוש כלים טכנולוגיים'},
                { key: 'english_groupSizeAllowsGrowthScore', name: 'גודל קבוצות מאפשר מגדל'},
                { key: 'english_useOfAuthenticMaterialsScore', name: 'שימוש חומרים אותנטיים'},
            ]},
            { name: 'מדעים', key: 'science', metrics: [
                { key: 'science_sufficientLabEquipmentScore', name: 'ציוד מעבדה מספק'},
                { key: 'science_developedInquirySkillsScore', name: 'מיומנויות חקר מפותחות'},
                { key: 'science_practicalExperiencesScore', name: 'התנסויות מעשיות'},
                { key: 'science_developedScientificThinkingScore', name: 'חשיבה מדעית מפותחת'},
                { key: 'science_updatedCurriculumScore', name: 'תוכנית מעודכנת לחזית'},
                { key: 'science_linkToEnvironmentAndCommunityScore', name: 'קישור לסביבה ולקהילה'},
            ]},
        ]
    },
    {
        name: 'תהליכי הוראה-למידה-הערכה',
        subCategories: [
            { name: 'תכנון הוראה', key: 'pedagogyPlanning', metrics: [
                { key: 'pedagogyPlanning_knowledgeAndSkillsMappingScore', name: 'מיפוי ידע ומיומנויות'},
                { key: 'pedagogyPlanning_findingsTranslatedScore', name: 'ממצאי המיפוי מתורגמים'},
                { key: 'pedagogyPlanning_effectivenessReviewScore', name: 'בחינת אפקטיביות'},
                { key: 'pedagogyPlanning_literacyPromotionEffortsScore', name: 'המאמצים לקידום אוריינות'},
                { key: 'pedagogyPlanning_entrepreneurshipAndInnovationCultureScore', name: 'תרבות יזמות וחדשנות'},
            ]},
            { name: 'פרקטיקות הוראה', key: 'pedagogyPractices', metrics: [
                { key: 'pedagogyPractices_lessonsIncludeVarietyScore', name: 'שיעורים כוללים מגוון'},
                { key: 'pedagogyPractices_diverseLearningMethodsScore', name: 'דרכי למידה מגוונות'},
                { key: 'pedagogyPractices_useOfDigitalToolsScore', name: 'שימוש כלים דיגיטליים'},
                { key: 'pedagogyPractices_differentiatedTeachingScore', name: 'הוראה דיפרנציאלית'},
                { key: 'pedagogyPractices_teachingPromotesThinkingScore', name: 'ההוראה מקדמת חשיבה'},
                { key: 'pedagogyPractices_teachingLearningSkillsScore', name: 'הקנייה מיומנויות למידה'},
            ]},
            { name: 'משוב והערכה', key: 'pedagogyFeedback', metrics: [
                 { key: 'pedagogyFeedback_managedEvaluationProcessesScore', name: 'תהליכי הערכה מנוהלים'},
                { key: 'pedagogyFeedback_teachersHaveKnowledgeAndSkillsScore', name: 'למורים ידע ומיומנויות'},
                { key: 'pedagogyFeedback_feedbackAndReflectionProcessesScore', name: 'תהליכי משוב ורפלקציה'},
                { key: 'pedagogyFeedback_evaluationCriteriaScore', name: 'קריטריונים להערכה'},
            ]},
            { name: 'גמישות פדגוגית', key: 'pedagogyFlexibility', metrics: [
                { key: 'pedagogyFlexibility_flexibleLearningOrganizationScore', name: 'ארגון הלמידה גמיש'},
                { key: 'pedagogyFlexibility_focusedCurriculumScore', name: 'תוכנית הלימודים ממוקדת'},
                { key: 'pedagogyFlexibility_teachersHaveInterdisciplinaryKnowledgeScore', name: 'למורים ידע למידה בין תחומית'},
            ]},
            { name: 'שיתוף פעולה הוראה', key: 'pedagogyCollaboration', metrics: [
                { key: 'pedagogyCollaboration_jointPlanningRoutinesScore', name: 'שגרות תכנון משותף'},
                { key: 'pedagogyCollaboration_adaptedPracticesScore', name: 'פרקטיקות מותאמות'},
                { key: 'pedagogyCollaboration_jointExaminationScore', name: 'בחינה משותפת'},
                { key: 'pedagogyCollaboration_openDialogueForImprovementScore', name: 'שיח פתוח לשיפור'},
                { key: 'pedagogyCollaboration_opennessToLearningScore', name: 'פתיחות ללמידה'},
                { key: 'pedagogyCollaboration_beliefInAbilitiesScore', name: 'אמונה ביכולות'},
            ]},
        ]
    },
    {
        name: 'חינוך חברתי קהילתי',
        subCategories: [
            { name: 'מענים לרצף', key: 'communityContinuum', metrics: [
                { key: 'communityContinuum_enrichmentProgramsOfferedScore', name: 'קיים היצע תוכניות העשרה'},
                { key: 'communityContinuum_tripsConnectedToCurriculumScore', name: 'טיולים מחוברים לתוכנית'},
                { key: 'communityContinuum_diverseEducationalFrameworksScore', name: 'מסגרות חינוכיות מגוונות'},
            ]},
            { name: 'חינוך חברתי', key: 'communitySocial', metrics: [
                { key: 'communitySocial_socialEducationIsAdaptedScore', name: 'החינוך החברתי מותאם'},
                { key: 'communitySocial_teachersHaveKnowledgeAndToolsScore', name: 'למורים ידע וכלים'},
                { key: 'communitySocial_teachingAssistantsPotentialRealizedScore', name: 'מוצה פוטנציאאל תומכי הוראה'},
            ]},
            { name: 'פעילות פנאי', key: 'communityLeisure', metrics: [
                { key: 'communityLeisure_collaborationsWithOrganizationsScore', name: 'שיתופי פעולה ארגונים'},
                { key: 'communityLeisure_encouragementAndGuidanceForParticipationScore', name: 'עידוד והכוונה השתתפות'},
                { key: 'communityLeisure_wideRangeOfActivitiesScore', name: 'היצע חוגים רחב'},
            ]},
            { name: 'קשרי קהילה', key: 'communityPartnerships', metrics: [
                { key: 'communityPartnerships_parentParticipationInMeetingsScore', name: 'השתתפות הורים במפגשים'},
                { key: 'communityPartnerships_continuousCommunicationToFamiliesScore', name: 'תקשורת רציפה למשפחות'},
                { key: 'communityPartnerships_parentsInvolvedInActivitiesScore', name: 'הורים מעורבים בפעילויות'},
                { key: 'communityPartnerships_parentsHaveToolsToSupportScore', name: 'להורים כלים לתמיכה'},
                { key: 'communityPartnerships_effectiveDialogueWithAuthorityScore', name: 'שיח אפקטיבי עם רשות'},
                { key: 'communityPartnerships_externalResourcesUtilizedScore', name: 'משאבים חיצוניים מנוצלים'},
            ]},
        ]
    }
];

export const NEW_CHALLENGE_CATEGORIES_FOR_REPORT = HIERARCHICAL_CATEGORIES.map(main => ({
    name: main.name,
    subCategories: main.subCategories.map(sub => ({
        name: sub.name,
        key: sub.key,
        // The key for challenges is the sub-category key (e.g., 'leadership_vision')
        // The score key for analysis is constructed from the sub-category key
        scoreKey: `${sub.key}Score`
    }))
}));