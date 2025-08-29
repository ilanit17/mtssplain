// General types for the application
export type Score = '1' | '2' | '3' | '4' | '';
export type SupportLevel = 'מלא' | 'חלקי' | 'מצומצם' | 'מנהלים חדשים' | '';

export interface School {
    id: number;
    name: string;
    principal: string;
    students: string;
    supportLevel: SupportLevel;
    notes: string;

    // --- חזון ברור ---
    vision_clearAndAgreedScore: Score;
    vision_educationalConceptTranslatedScore: Score;
    vision_resourcesAndEdgesScore: Score;
    vision_strategicPlanningScore: Score;
    vision_measurableGoalsScore: Score;
    vision_communityPartnershipScore: Score;

    // --- תוכנית עבודה ---
    workPlan_needsBasedScore: Score;
    workPlan_clearGoalsAndMetricsScore: Score;
    workPlan_systematicMonitoringScore: Score;

    // --- צוות הנהלה ---
    managementTeam_teamworkBasedScore: Score;
    managementTeam_clearRolesScore: Score;
    managementTeam_middleLeadershipInvolvedScore: Score;
    managementTeam_roleHoldersCoachingScore: Score;
    managementTeam_dataBasedDecisionsScore: Score;
    managementTeam_teacherCollaborationScore: Score;

    // --- שגרות ארגוניות ---
    routines_adaptedTimetableScore: Score;
    routines_orderlyMeetingRoutinesScore: Score;
    routines_decisionMakingProcessesScore: Score;

    // --- ניהול משאבים ---
    resources_systematicAllocationScore: Score;
    resources_resourceUtilizationTrackingScore: Score;
    resources_controlAndImprovementScore: Score;

    // --- מחויבות צוות ---
    staffCommitment_teamEngagementScore: Score;
    staffCommitment_highSenseOfCapabilityScore: Score;
    staffCommitment_highExpectationsScore: Score;

    // --- למידה והתמקצעות ---
    staffLearning_adaptedProfessionalDevelopmentScore: Score;
    staffLearning_connectingDevelopmentToPracticeScore: Score;
    staffLearning_subjectAreaTrainingScore: Score;
    staffLearning_peerLearningCultureScore: Score;
    staffLearning_innovativeInitiativesScore: Score;
    staffLearning_highExpectationsOfAchievementsScore: Score;

    // --- רווחה ויציבות ---
    staffWellbeing_teachersReceiveSupportScore: Score;
    staffWellbeing_structuredOnboardingProcessesScore: Score;
    staffWellbeing_wellbeingAndResilienceSupportScore: Score;
    staffWellbeing_cohesionBuildingActivitiesScore: Score;
    staffWellbeing_highStaffStabilityScore: Score;
    staffWellbeing_highSatisfactionScore: Score;

    // --- מיפוי אקלים ---
    climateMapping_climateDataAnalysisScore: Score;
    climateMapping_monitoringAndEvaluationRoutinesScore: Score;
    climateMapping_detectionAndTreatmentMechanismsScore: Score;

    // --- מוגנות ושייכות ---
    climateSafety_proceduresAndRulesEnforcedScore: Score;
    climateSafety_safetyReinforcementProgramsScore: Score;
    climateSafety_socialActivitiesScore: Score;
    climateSafety_fewViolenceIncidentsScore: Score;
    climateSafety_recognitionAndAppreciationCultureScore: Score;

    // --- יחסי קרבה ---
    climateRelationships_personalSocialEmotionalDialogueScore: Score;
    climateRelationships_familiarityAndPersonalConnectionScore: Score;
    climateRelationships_teacherToolsAndCoachingScore: Score;
    climateRelationships_optimalSocialAtmosphereScore: Score;

    // --- מיומנויות רגשיות ---
    sel_lifeSkillsProgramScore: Score;
    sel_parentalConnectionScore: Score;
    sel_diverseSupportOptionsScore: Score;

    // --- שפה ---
    language_adequateReadingComprehensionScore: Score;
    language_developedWritingSkillsScore: Score;
    language_broadVocabularyScore: Score;
    language_clearOralExpressionScore: Score;
    language_establishedReadingCultureScore: Score;
    language_differentiatedResponseScore: Score;

    // --- מתמטיקה ---
    math_basicSkillsMasteryScore: Score;
    math_effectiveStrategiesScore: Score;
    math_optimalAnxietyCopingScore: Score;
    math_useOfVisualAidsScore: Score;
    math_sufficientDifferentiationScore: Score;
    math_linkToDailyLifeScore: Score;

    // --- אנגלית ---
    english_studentsConfidentInUseScore: Score;
    english_exposureOutsideClassScore: Score;
    english_adaptedTeachingMethodsScore: Score;
    english_useOfTechnologicalToolsScore: Score;
    english_groupSizeAllowsGrowthScore: Score;
    english_useOfAuthenticMaterialsScore: Score;

    // --- מדעים ---
    science_sufficientLabEquipmentScore: Score;
    science_developedInquirySkillsScore: Score;
    science_practicalExperiencesScore: Score;
    science_developedScientificThinkingScore: Score;
    science_updatedCurriculumScore: Score;
    science_linkToEnvironmentAndCommunityScore: Score;

    // --- תכנון הוראה ---
    pedagogyPlanning_knowledgeAndSkillsMappingScore: Score;
    pedagogyPlanning_findingsTranslatedScore: Score;
    pedagogyPlanning_effectivenessReviewScore: Score;
    pedagogyPlanning_literacyPromotionEffortsScore: Score;
    pedagogyPlanning_entrepreneurshipAndInnovationCultureScore: Score;

    // --- פרקטיקות הוראה ---
    pedagogyPractices_lessonsIncludeVarietyScore: Score;
    pedagogyPractices_diverseLearningMethodsScore: Score;
    pedagogyPractices_useOfDigitalToolsScore: Score;
    pedagogyPractices_differentiatedTeachingScore: Score;
    pedagogyPractices_teachingPromotesThinkingScore: Score;
    pedagogyPractices_teachingLearningSkillsScore: Score;

    // --- משוב והערכה ---
    pedagogyFeedback_managedEvaluationProcessesScore: Score;
    pedagogyFeedback_teachersHaveKnowledgeAndSkillsScore: Score;
    pedagogyFeedback_feedbackAndReflectionProcessesScore: Score;
    pedagogyFeedback_evaluationCriteriaScore: Score;

    // --- גמישות פדגוגית ---
    pedagogyFlexibility_flexibleLearningOrganizationScore: Score;
    pedagogyFlexibility_focusedCurriculumScore: Score;
    pedagogyFlexibility_teachersHaveInterdisciplinaryKnowledgeScore: Score;

    // --- שיתוף פעולה הוראה ---
    pedagogyCollaboration_jointPlanningRoutinesScore: Score;
    pedagogyCollaboration_adaptedPracticesScore: Score;
    pedagogyCollaboration_jointExaminationScore: Score;
    pedagogyCollaboration_openDialogueForImprovementScore: Score;
    pedagogyCollaboration_opennessToLearningScore: Score;
    pedagogyCollaboration_beliefInAbilitiesScore: Score;

    // --- מענים לרצף ---
    communityContinuum_enrichmentProgramsOfferedScore: Score;
    communityContinuum_tripsConnectedToCurriculumScore: Score;
    communityContinuum_diverseEducationalFrameworksScore: Score;

    // --- חינוך חברתי ---
    communitySocial_socialEducationIsAdaptedScore: Score;
    communitySocial_teachersHaveKnowledgeAndToolsScore: Score;
    communitySocial_teachingAssistantsPotentialRealizedScore: Score;

    // --- פעילות פנאי ---
    communityLeisure_collaborationsWithOrganizationsScore: Score;
    communityLeisure_encouragementAndGuidanceForParticipationScore: Score;
    communityLeisure_wideRangeOfActivitiesScore: Score;

    // --- קשרי קהילה ---
    communityPartnerships_parentParticipationInMeetingsScore: Score;
    communityPartnerships_continuousCommunicationToFamiliesScore: Score;
    communityPartnerships_parentsInvolvedInActivitiesScore: Score;
    communityPartnerships_parentsHaveToolsToSupportScore: Score;
    communityPartnerships_effectiveDialogueWithAuthorityScore: Score;
    communityPartnerships_externalResourcesUtilizedScore: Score;

    // Challenges are not part of the score fields but are linked conceptually
    [key: string]: any; // Allow indexing by string
}


export interface ParsedData {
    schools: School[];
    metadata: {
        fileName: string;
        fileType: string;
        columns: string[];
    };
}

export interface SchoolForAnalysis extends School {
    characterization: string;
    specificChallenges: string[];
    tier: 1 | 2 | 3;
}

export interface Insight {
    title: string;
    text: string;
}

export interface AnalysisData {
    schools: SchoolForAnalysis[];
    summary: {
        totalSchools: number;
        totalStudents: number;
        riskySchools: number;
        excellentSchools: number;
    };
    subjectDistribution: {
        [subjectName: string]: Record<string, number>;
    };
    challengesAnalysis: {
        [category: string]: {
            challenges: Record<string, number>;
            affectedSchools: number;
        }
    };
    mtssClassification: {
        tier1: SchoolForAnalysis[];
        tier2: SchoolForAnalysis[];
        tier3: SchoolForAnalysis[];
    };
    insights: Insight[];
    heatmapData: { field: string; percentage: number; lowSchools: number }[];
    organizationalData: { name: string; value: number }[];
    coreSubjectsData: { name:string; value: number }[];
    overallPerformanceData: { name: string; value: number }[];
    schoolSizeData: { name: string; value: number }[];
}

export interface FinalIssue {
    mainIssue: string;
    rootCauses: string[];
    affectedSchools: number[];
}

export interface InterventionPlan {
    goal: string;
    actions: string[];
    timeline: string;
    metrics: string[];
}

export interface SupportPlan {
    supportType: string;
    resources: string[];
    responsibleTeam: string;
}
