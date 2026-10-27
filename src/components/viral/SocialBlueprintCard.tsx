'use client';

import React, { useRef, useState } from 'react';
import { Download, Check, Sparkles, MessageSquareCode } from 'lucide-react';
import { FullMetabolicReport, UserBiometrics, CalculatorTab, kgToLbs } from '@/lib/formulas';

export interface SocialBlueprintCardProps {
  biometrics: UserBiometrics;
  report: FullMetabolicReport;
  activeTab?: CalculatorTab;
}

export function SocialBlueprintCard({
  biometrics,
  report,
  activeTab = 'recomp',
}: SocialBlueprintCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedReddit, setCopiedReddit] = useState(false);

  const displayWeight =
    biometrics.unitSystem === 'imperial'
      ? `${kgToLbs(biometrics.weightKg)} lbs`
      : `${Math.round(biometrics.weightKg * 10) / 10} kg`;

  const getTabLabel = (tab: CalculatorTab): string => {
    switch (tab) {
      case 'glp1':
        return 'GLP-1 Muscle Guard';
      case 'perimenopause':
        return 'Perimenopause Hormone Macro';
      case 'fasting':
        return 'Intermittent Fasting';
      case 'electrolytes':
        return 'Creatine & Electrolyte';
      case 'ffmi':
        return 'Leucine & FFMI';
      case 'reverse':
        return 'Reverse Diet Recovery';
      default:
        return 'Body Recomposition';
    }
  };

  const generateAndDownloadCard = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // 1080x1350 Instagram Story / Portrait Card resolution
    canvas.width = 1080;
    canvas.height = 1350;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 1080, 1350);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#111827');
    grad.addColorStop(1, '#042f2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Accent Border
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1000, 1270);

    // Helper: Stat Box
    const drawStatBox = (
      x: number,
      y: number,
      w: number,
      h: number,
      label: string,
      value: string,
      sub: string
    ) => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#5eead4';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(label, x + 25, y + 45);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px sans-serif';
      ctx.fillText(value, x + 25, y + 115);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px sans-serif';
      ctx.fillText(sub, x + 25, y + 152);
    };

    // Helper: Large Panel Box
    const drawLargePanel = (
      x: number,
      y: number,
      w: number,
      h: number,
      bgColor: string,
      borderColor: string,
      headerColor: string,
      title: string,
      primaryVal: string,
      splitText: string,
      noteText: string
    ) => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = headerColor;
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(title, x + 35, y + 45);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText(primaryVal, x + 35, y + 105);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(splitText, x + 35, y + 155);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px sans-serif';
      ctx.fillText(noteText, x + 35, y + 192);
    };

    // Top Header Badge
    let badgeText = 'CLINICAL METABOLIC BLUEPRINT';
    let badgeColor = '#0d9488';
    if (activeTab === 'glp1') {
      badgeText = 'GLP-1 ANTI-SARCOPENIA PROTOCOL';
      badgeColor = '#be123c';
    } else if (activeTab === 'perimenopause') {
      badgeText = 'PERIMENOPAUSE HORMONE METABOLICS';
      badgeColor = '#7e22ce';
    } else if (activeTab === 'fasting') {
      badgeText = 'INTERMITTENT FASTING TIMELINE & MACROS';
      badgeColor = '#0284c7';
    } else if (activeTab === 'electrolytes') {
      badgeText = 'ELECTROLYTE & OSMOLYTE BLUEPRINT';
      badgeColor = '#059669';
    } else if (activeTab === 'ffmi') {
      badgeText = 'LEUCINE TRIGGER & FFMI LAB';
      badgeColor = '#6d28d9';
    } else if (activeTab === 'reverse') {
      badgeText = 'REVERSE DIETING METABOLIC RESTORATION';
      badgeColor = '#ea580c';
    }

    ctx.fillStyle = badgeColor;
    ctx.fillRect(80, 85, 480, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(badgeText, 100, 114);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText('SmartMacroCalc.com', 80, 195);

    // Profile Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    const profileSummary = `Profile: ${biometrics.sex.toUpperCase()} • ${biometrics.age}y • ${displayWeight} • ${biometrics.bodyFatPct}% BF (LBM: ${report.leanBodyMassLbs} lbs)`;
    ctx.fillText(profileSummary, 80, 245);

    // Dynamic Content Rendering by activeTab
    if (activeTab === 'glp1') {
      // GLP-1 Top Stat Boxes
      drawStatBox(
        80,
        290,
        440,
        180,
        'CALORIC INTAKE CEILING',
        `${report.glp1Protocol?.targetCalories || 1450} kcal`,
        'Preserves 90%+ Lean Body Mass'
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'CRITICAL PROTEIN FLOOR',
        `${report.glp1Protocol?.criticalProteinFloorGrams || 110}g / day`,
        '1.8g/kg LBM Anti-Sarcopenia'
      );

      // GLP-1 Panel 1: Optimal Protein Target
      drawLargePanel(
        80,
        510,
        920,
        220,
        '#1e1b4b',
        '#6366f1',
        '#a5b4fc',
        'OPTIMAL PROTEIN TARGET (2.2g/kg LBM PROTEIN ROOF)',
        `${report.glp1Protocol?.optimalProteinGrams || 135}g Protein / day`,
        `Pacing: ${report.glp1Protocol?.proteinPerMealGrams || 35}g / meal across ${biometrics.mealsPerDay || 4} feedings`,
        'Crosses 3.0g Leucine mTOR threshold per feeding before early fullness'
      );

      // GLP-1 Panel 2: Motility & Hydration
      drawLargePanel(
        80,
        765,
        920,
        220,
        '#064e3b',
        '#10b981',
        '#6ee7b7',
        'GASTRIC MOTILITY, PREBIOTIC FIBER & FLUID DEFENSE',
        `${report.glp1Protocol?.solubleFiberGrams || 32}g Soluble Fiber / day`,
        `Hydration Target: ${report.glp1Protocol?.hydrationLiters || 3.2} Liters (${report.glp1Protocol?.hydrationOz || 108} oz) Daily`,
        'Mitigates GLP-1 hypomotility and prevents appendicular lean mass catabolism'
      );

      // Bottom Row
      drawStatBox(80, 1020, 290, 175, 'STARTING LBM', `${report.leanBodyMassLbs} lbs`, 'Contractile Muscle');
      drawStatBox(
        395,
        1020,
        290,
        175,
        'LEUCINE / MEAL',
        `${report.glp1Protocol?.leucinePerMealGrams || 3.1}g`,
        'mTORC1 Switch'
      );
      drawStatBox(
        710,
        1020,
        290,
        175,
        'RISK RATING',
        `${report.glp1Protocol?.muscleLossRiskScore || 'Low'}`,
        'Lean Tissue Status'
      );
    } else if (activeTab === 'perimenopause') {
      const pProto = report.perimenopauseProtocol;
      const trainCals = pProto?.trainingDayMacros?.calories || report.trainingDayMacros.calories;
      const restCals = pProto?.restDayMacros?.calories || report.restDayMacros.calories;
      const breakfastAnchor = pProto?.breakfastProteinAnchorGrams || 35;
      const safeFloor = pProto?.cortisolSafetyCalorieFloor || Math.max(1350, Math.round(report.tdee * 0.82));

      drawStatBox(
        80,
        290,
        440,
        180,
        'MAINTENANCE TDEE',
        `${report.tdee} kcal`,
        'Energy Expenditure Baseline'
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'MINIMUM CALORIE FLOOR',
        `${safeFloor} kcal`,
        'Preserves Thyroid T3 & Cortisol'
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#3b0764',
        '#c084fc',
        '#e9d5ff',
        'TRAINING DAYS (CORTISOL & THYROID SHIELD)',
        `${trainCals} kcal / day`,
        `Protein: ${pProto?.trainingDayMacros?.proteinGrams || report.trainingDayMacros.proteinGrams}g • Carbs: ${pProto?.trainingDayMacros?.carbsGrams || report.trainingDayMacros.carbsGrams}g • Fat: ${pProto?.trainingDayMacros?.fatGrams || report.trainingDayMacros.fatGrams}g`,
        'Targeted carbohydrates support GLUT4 and prevent cortisol-driven visceral storage'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#1e1b4b',
        '#818cf8',
        '#c7d2fe',
        'REST DAYS & 35g+ LEUCINE BREAKFAST ANCHOR',
        `${breakfastAnchor}g+ Protein Morning Anchor`,
        `Rest Calories: ${restCals} kcal • Fats: ${pProto?.restDayMacros?.fatGrams || report.restDayMacros.fatGrams}g (Steroidogenesis)`,
        'Overcomes estrogen anabolic resistance and suppresses the Cortisol Awakening Response'
      );

      drawStatBox(80, 1020, 290, 175, 'AGE COHORT', `${biometrics.age} Years`, '38–55 Target Group');
      drawStatBox(
        395,
        1020,
        290,
        175,
        'BREAKFAST ANCHOR',
        `${breakfastAnchor}g Protein`,
        'Within 60m of Waking'
      );
      drawStatBox(
        710,
        1020,
        290,
        175,
        'FIBER FLOOR',
        `${pProto?.estrogenSupportFiberGrams || 32}g / day`,
        'Estrogen Clearance'
      );
    } else if (activeTab === 'fasting') {
      const fProto = report.fastingProtocol;
      const protoType = fProto?.protocol || fProto?.protocolType || '16:8';
      const fastH = fProto?.fastingHours || 16;
      const eatH = fProto?.eatingHours || 8;
      const windowStr = fProto?.formattedWindow || fProto?.defaultWindow || '12:00 PM – 8:00 PM';

      drawStatBox(
        80,
        290,
        440,
        180,
        'FASTING PROTOCOL',
        `${protoType} TIMELINE`,
        `${fastH}h Fasting / ${eatH}h Eating`
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'DAILY CALORIE BUDGET',
        `${fProto?.dailyCalories || report.weeklyAverageMacros.calories} kcal`,
        'Calibrated Fat Loss Deficit'
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#083344',
        '#06b6d4',
        '#67e8f9',
        `CIRCADIAN FEEDING WINDOW (${eatH} HOURS)`,
        `Window: ${windowStr}`,
        `Feedings: ${fProto?.mealsInWindow || 3} Structured Meals • Protein: ${fProto?.macros?.proteinGrams || report.trainingDayMacros.proteinGrams}g Daily`,
        'Stimulates AMPK and autophagic clearance without prolonged catabolism'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#1e1b4b',
        '#6366f1',
        '#a5b4fc',
        'PROTEIN BOLUS PACING & MUSCLE RETENTION',
        'Min 35g–45g Protein per Meal',
        `Carbs: ${fProto?.macros?.carbsGrams || report.weeklyAverageMacros.carbsGrams}g • Fats: ${fProto?.macros?.fatGrams || report.weeklyAverageMacros.fatGrams}g • Fiber: ${fProto?.macros?.fiberGrams || report.weeklyAverageMacros.fiberGrams}g`,
        'Prevents single-bolus OMAD appendicular lean mass catabolism (TREAT Trial)'
      );

      drawStatBox(80, 1020, 290, 175, 'FASTING HOURS', `${fastH} Hours`, 'Lipolysis & Autophagy');
      drawStatBox(395, 1020, 290, 175, 'FEEDING HOURS', `${eatH} Hours`, '2–3 Protein Boluses');
      drawStatBox(
        710,
        1020,
        290,
        175,
        'LEAN RETENTION',
        `${fProto?.muscleRetentionRisk || '95%+ Retained'}`,
        'Sarcopenia Shielded'
      );
    } else if (activeTab === 'electrolytes') {
      const el = report.electrolyteResult;
      drawStatBox(
        80,
        290,
        440,
        180,
        'DAILY WATER INTAKE',
        `${el.totalDailyWaterLiters} L`,
        `${el.totalDailyWaterOz} oz Total Volume`
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'DAILY SODIUM TARGET',
        `${el.sodiumMg} mg`,
        'Sweat + Keto Adjusted'
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#064e3b',
        '#10b981',
        '#6ee7b7',
        'TARGET MINERAL PROFILE (OSMOLYTE BALANCE)',
        `Na: ${el.sodiumMg}mg • K: ${el.potassiumMg}mg`,
        `Elemental Magnesium: ${el.magnesiumMg}mg (Glycinate/Malate)`,
        'Prevents aldosterone-mediated keto-flu, orthostatic dizziness, and cramping'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#172554',
        '#3b82f6',
        '#93c5fd',
        'CREATINE MONOHYDRATE INTRACELLULAR LOADING',
        `${el.creatineDailyGrams}g / day Maintenance`,
        `5-Day Saturation Phase: ${el.creatineLoadingGrams}g/day (Divided into 4 doses of ~5g)`,
        'Maximizes phosphocreatine reserves & muscle water without extracellular bloat'
      );

      drawStatBox(
        80,
        1020,
        290,
        175,
        'SWEAT LOSS',
        `${el.sweatReplacementLiters} L / session`,
        `${biometrics.workoutMinutes || 60}m Workout`
      );
      drawStatBox(395, 1020, 290, 175, 'POTASSIUM', `${el.potassiumMg} mg`, 'Intracellular Balance');
      drawStatBox(710, 1020, 290, 175, 'MAGNESIUM', `${el.magnesiumMg} mg`, 'Neuromuscular Function');
    } else if (activeTab === 'ffmi') {
      const ffmi = report.ffmiResult;
      drawStatBox(
        80,
        290,
        440,
        180,
        'NORMALIZED FFMI',
        `${ffmi.normalizedFfmi}`,
        ffmi.ffmiCategory.slice(0, 24)
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'LEUCINE MEAL FLOOR',
        `${ffmi.perMealProteinTargetGrams}g / meal`,
        '3.0g Pure L-Leucine'
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#2e1065',
        '#a855f7',
        '#d8b4fe',
        'NATURAL MUSCULAR GENETIC CEILING',
        `Potential: ${ffmi.naturalPotentialPct}% of Natural Max`,
        `Raw FFMI: ${ffmi.rawFfmi} • Normalized FFMI: ${ffmi.normalizedFfmi} / 25.0`,
        'Stature-normalized to 1.80m baseline (Kouri et al. 1995 natural index)'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#064e3b',
        '#10b981',
        '#6ee7b7',
        '3.0g LEUCINE ANABOLIC TRIGGER (MPS THRESHOLD)',
        `${ffmi.perMealProteinTargetGrams}g Protein per Feeding`,
        'Whey Isolate: 27g • Chicken: 36g • Pea/Rice: 35g • Tofu: 39g',
        'Saturates Sestrin2-mTORC1 cascade to switch on skeletal muscle protein synthesis'
      );

      drawStatBox(80, 1020, 290, 175, 'RAW FFMI', `${ffmi.rawFfmi}`, `Height: ${biometrics.heightCm}cm`);
      drawStatBox(395, 1020, 290, 175, 'LEUCINE TARGET', '3.0g Leucine', 'Per Bolus');
      drawStatBox(710, 1020, 290, 175, 'POTENTIAL %', `${ffmi.naturalPotentialPct}%`, 'Genetic Limit');
    } else if (activeTab === 'reverse') {
      const firstWeekCals = report.reverseDietSchedule[0]?.dailyCalories || report.selectedBmr;
      drawStatBox(
        80,
        290,
        440,
        180,
        'INITIAL DEFICIT',
        `${firstWeekCals} kcal`,
        'Starting Step-Up Point'
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'TARGET TDEE',
        `${report.tdee} kcal`,
        'Full Metabolic Baseline'
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#451a03',
        '#f97316',
        '#fdba74',
        'STEP-UP REVERSE DIET (+80 KCAL / WEEK)',
        '+80 kcal / week Systematic Increase',
        'Weekly Step: +15g Carbs, +2g Fat • High Protein Floor Preserved',
        'Gradually restores active thyroid T3, leptin, and NEAT without fat rebound'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#1e293b',
        '#64748b',
        '#cbd5e1',
        'METABOLIC ADAPTATION RECOVERY SCHEDULE',
        `${report.reverseDietSchedule.length} Weeks to Full Baseline`,
        `Start: ${firstWeekCals} kcal → Goal: ${report.tdee} kcal / day`,
        'Prevents rapid adipose hyper-hyperplasia following hypocaloric deficit'
      );

      drawStatBox(80, 1020, 290, 175, 'WEEKLY STEP', '+80 kcal / wk', 'Controlled Surplus');
      drawStatBox(
        395,
        1020,
        290,
        175,
        'SCHEDULE',
        `${report.reverseDietSchedule.length} Weeks`,
        'Gradual Restoration'
      );
      drawStatBox(710, 1020, 290, 175, 'GOAL TDEE', `${report.tdee} kcal`, 'Target Homeostasis');
    } else {
      // Default: Recomp
      drawStatBox(
        80,
        290,
        440,
        180,
        'BASAL METABOLIC RATE',
        `${report.selectedBmr} kcal`,
        `Formula: ${biometrics.formula.toUpperCase()}`
      );
      drawStatBox(
        560,
        290,
        440,
        180,
        'MAINTENANCE TDEE',
        `${report.tdee} kcal`,
        `${biometrics.trainingDaysPerWeek}x Lifting Sessions / Week`
      );

      drawLargePanel(
        80,
        510,
        920,
        220,
        '#064e3b',
        '#10b981',
        '#6ee7b7',
        `TRAINING DAYS (${biometrics.trainingDaysPerWeek}d/wk • ${biometrics.trainingDaySurplusPct >= 0 ? '+' : ''}${biometrics.trainingDaySurplusPct}% ANABOLIC REFEED)`,
        `${report.trainingDayMacros.calories} kcal / day`,
        `Protein: ${report.trainingDayMacros.proteinGrams}g • Carbs: ${report.trainingDayMacros.carbsGrams}g • Fat: ${report.trainingDayMacros.fatGrams}g`,
        'High carbohydrate availability upregulates GLUT4 and drives muscle protein synthesis'
      );

      drawLargePanel(
        80,
        765,
        920,
        220,
        '#1e1b4b',
        '#6366f1',
        '#a5b4fc',
        `REST & RECOVERY DAYS (${7 - biometrics.trainingDaysPerWeek}d/wk • ${biometrics.restDayDeficitPct}% FAT OXIDATION)`,
        `${report.restDayMacros.calories} kcal / day`,
        `Protein: ${report.restDayMacros.proteinGrams}g • Carbs: ${report.restDayMacros.carbsGrams}g • Fat: ${report.restDayMacros.fatGrams}g`,
        'Caloric deficit oxidizes subcutaneous & visceral adipose tissue with high protein defense'
      );

      drawStatBox(
        80,
        1020,
        290,
        175,
        'NORMALIZED FFMI',
        `${report.ffmiResult.normalizedFfmi}`,
        report.ffmiResult.ffmiCategory.slice(0, 24)
      );
      drawStatBox(
        395,
        1020,
        290,
        175,
        'LEUCINE FLOOR',
        `${report.ffmiResult.perMealProteinTargetGrams}g / meal`,
        '3.0g Leucine mTOR'
      );
      drawStatBox(
        710,
        1020,
        290,
        175,
        'HYDRATION & SALT',
        `${report.electrolyteResult.totalDailyWaterLiters} L/day`,
        `${report.electrolyteResult.sodiumMg}mg Na`
      );
    }

    // Footer Watermark
    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Generate your free science-backed protocol at SmartMacroCalc.com', 80, 1265);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `smartmacrocalc-${activeTab}-${Math.round(kgToLbs(biometrics.weightKg))}lb-${biometrics.sex}.png`;
    link.href = dataUrl;
    link.click();
    setIsGenerating(false);
  };

  const copyRedditMarkdown = () => {
    let md = '';

    if (activeTab === 'glp1') {
      const glp = report.glp1Protocol;
      md = `### My GLP-1 Muscle Preservation & Anti-Sarcopenia Protocol (${displayWeight}, ${biometrics.glp1Medication || 'Semaglutide'})
* **Lean Body Mass (LBM):** ${report.leanBodyMassLbs} lbs (${report.leanBodyMassKg} kg) | **Body Fat:** ${biometrics.bodyFatPct}%
* **Target Daily Calories:** ${glp.targetCalories} kcal/day | **Maintenance TDEE:** ${report.tdee} kcal/day

| Parameter | Target Value | Clinical Guideline & Physiological Rationale |
| :--- | :--- | :--- |
| **Critical Protein Floor** | **${glp.criticalProteinFloorGrams}g / day** | Minimum anti-sarcopenia floor (1.8g/kg LBM) to avoid muscle wasting (STEP-1 DXA) |
| **Optimal Protein Target** | **${glp.optimalProteinGrams}g / day** | 2.2g/kg LBM required to stimulate muscle protein synthesis during hypocaloric intake |
| **Per-Meal Protein Pacing** | **${glp.proteinPerMealGrams}g / feeding** | Distributed across ${biometrics.mealsPerDay || 4} feedings to trigger ~3.0g Leucine before early satiety sets in |
| **Prebiotic Soluble Fiber** | **${glp.solubleFiberGrams}g / day** | Essential for mitigating GLP-1 induced gastric hypomotility and constipation |
| **Electrolyte Hydration** | **${glp.hydrationLiters} Liters / day** | ${glp.hydrationOz} oz fluid replacement to support renal filtration and blood volume |

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 33567185, 35658024)*`;
    } else if (activeTab === 'perimenopause') {
      const pProto = report.perimenopauseProtocol;
      const train = pProto?.trainingDayMacros || report.trainingDayMacros;
      const rest = pProto?.restDayMacros || report.restDayMacros;
      const safeFloor = pProto?.cortisolSafetyCalorieFloor || Math.max(1350, Math.round(report.tdee * 0.82));

      md = `### My Perimenopause Hormone & Metabolic Macro Plan (Age ${biometrics.age}, ${displayWeight})
* **Lean Body Mass (LBM):** ${report.leanBodyMassLbs} lbs | **Maintenance TDEE:** ${report.tdee} kcal/day
* **Minimum Safe Calorie Floor:** ${safeFloor} kcal/day (Preserves active T3 thyroid output & prevents cortisol spikes)

| Day / Metric | Daily Energy | Protein | Carbs | Fats | Fiber | Hormone Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Training Days (Refeed)** | **${train.calories} kcal** | ${train.proteinGrams}g | ${train.carbsGrams}g | ${train.fatGrams}g | ${train.fiberGrams}g | Carbohydrates timed around lifting for GLUT4 and nocturnal cortisol suppression |
| **Rest Days (Deficit)** | **${rest.calories} kcal** | ${rest.proteinGrams}g | ${rest.carbsGrams}g | ${rest.fatGrams}g | ${rest.fiberGrams}g | Dietary fat elevated to 38-42% to support steroidogenesis & hormone precursors |
| **Morning Leucine Anchor** | **35g+ Protein** | ~3.2g Leucine | - | - | - | Within 60m of waking to overcome estrogen-deficient anabolic resistance |
| **Daily Estrogen Fiber Floor** | **${pProto?.estrogenSupportFiberGrams || 32}g** | - | - | - | 32g | Optimizes gut beta-glucuronidase and estrogen metabolite clearance |

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 24092765, 36085402)*`;
    } else if (activeTab === 'fasting') {
      const fProto = report.fastingProtocol;
      const protoType = fProto?.protocol || fProto?.protocolType || '16:8';
      const fastH = fProto?.fastingHours || 16;
      const eatH = fProto?.eatingHours || 8;
      const windowStr = fProto?.formattedWindow || fProto?.defaultWindow || '12:00 PM – 8:00 PM';
      const fastMacros = fProto?.macros || report.weeklyAverageMacros;

      md = `### My Intermittent Fasting Timeline & Macro Breakdown (${protoType}, ${displayWeight})
* **Lean Body Mass (LBM):** ${report.leanBodyMassLbs} lbs | **Daily Calorie Target:** ${fastMacros.calories} kcal/day
* **Feeding Window:** ${windowStr} (${eatH}h eating / ${fastH}h fasting)

| Fasting Phase | Duration | Window Time | Target Intake / Process |
| :--- | :--- | :--- | :--- |
| **Fasting Window** | **${fastH} Hours** | Fasting Duration | Glycogen depletion, AMPK activation, FFA oxidation & autophagy onset |
| **Eating Window** | **${eatH} Hours** | ${windowStr} | Nutrient assimilation, MPS stimulation (${fastMacros.proteinGrams}g protein divided into $\\ge 35g$ boluses) |
| **Daily Macronutrients** | 7-Day Target | **${fastMacros.calories} kcal** | Protein: ${fastMacros.proteinGrams}g • Carbs: ${fastMacros.carbsGrams}g • Fat: ${fastMacros.fatGrams}g |

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 27737674, 33002478)*`;
    } else if (activeTab === 'electrolytes') {
      const el = report.electrolyteResult;
      md = `### My Clinical Electrolyte & Creatine Loading Protocol (${displayWeight}, ${biometrics.isKetoOrLowCarb ? 'Ketogenic Diet' : 'Standard Carb'})
* **Total Daily Fluid Target:** ${el.totalDailyWaterLiters} Liters (${el.totalDailyWaterOz} oz)
* **Training Volume:** ${biometrics.workoutMinutes || 60} min/session | **Sauna Sessions:** ${biometrics.saunaSessionsPerWeek || 0}x/week

| Mineral / Osmolyte | Daily Target | Physiological Mechanism & Guidelines |
| :--- | :--- | :--- |
| **Sodium (Na+)** | **${el.sodiumMg} mg** | Basal 2,300mg + sweat loss replacement + keto natriuresis correction |
| **Potassium (K+)** | **${el.potassiumMg} mg** | Maintains intracellular membrane potential and counteracts aldosterone retention |
| **Magnesium (Mg2+)** | **${el.magnesiumMg} mg** | Elemental magnesium (glycinate/malate) for ATP enzymatic cofactor & sleep support |
| **Creatine Monohydrate** | **${el.creatineDailyGrams}g / day** | Maintenance saturation; 5-day optional loading dose: ${el.creatineLoadingGrams}g/day (4 x 5g) |

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 28615996, 29141965)*`;
    } else if (activeTab === 'ffmi') {
      const ffmi = report.ffmiResult;
      md = `### My Normalized FFMI & Leucine Threshold Analysis (${displayWeight}, ${biometrics.bodyFatPct}% BF)
* **Lean Body Mass (LBM):** ${report.leanBodyMassLbs} lbs (${report.leanBodyMassKg} kg) | **Height:** ${biometrics.heightCm} cm
* **Normalized FFMI:** **${ffmi.normalizedFfmi}** (Raw: ${ffmi.rawFfmi}) | **Classification:** ${ffmi.ffmiCategory}
* **Natural Ceiling Potential:** ${ffmi.naturalPotentialPct}% of natural limit (Kouri et al. 1995)

| Metric | Target Value | Clinical Guideline |
| :--- | :--- | :--- |
| **Per-Meal Protein Target** | **${ffmi.perMealProteinTargetGrams}g / feeding** | Required to yield 3.0g intra-myocellular L-leucine to saturate Sestrin2-mTORC1 |
| **Whey Isolate Efficiency** | 27g protein (115 kcal) | 11.1% Leucine density |
| **Chicken Breast Efficiency** | 36g protein (190 kcal) | 8.3% Leucine density |
| **70:30 Pea/Rice Blend** | 35g protein (150 kcal) | 8.6% Leucine density (optimal vegan blend) |
| **Tofu / Tempeh** | 39g protein (340 kcal) | 7.7% Leucine density |

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 7496846, 26224750)*`;
    } else if (activeTab === 'reverse') {
      const firstWeekCals = report.reverseDietSchedule[0]?.dailyCalories || report.selectedBmr;
      md = `### My Metabolic Recovery & Reverse Dieting Schedule (+80 kcal/week)
* **Starting Deficit Caloric Intake:** ${firstWeekCals} kcal/day
* **Goal Maintenance TDEE:** ${report.tdee} kcal/day | **Weekly Step-Up:** +80 kcal/week (+15g Carbs, +2g Fat)

| Week | Daily Energy | Protein | Carbs | Fats | Metabolic Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
${report.reverseDietSchedule.slice(0, 8).map((w) => `| Week ${w.week} | **${w.dailyCalories} kcal** | ${w.proteinGrams}g | ${w.carbsGrams}g | ${w.fatGrams}g | ${w.metabolicStatus} |`).join('\n')}

*Calculated via the Clinical Health & Bioenergetics Engine at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 24571926)*`;
    } else {
      // Recomp
      md = `### My Body Recomposition & Calorie Cycling Breakdown (${displayWeight}, ${biometrics.bodyFatPct}% BF)
* **Lean Body Mass (LBM):** ${report.leanBodyMassLbs} lbs (${report.leanBodyMassKg} kg) | **Normalized FFMI:** ${report.ffmiResult.normalizedFfmi}
* **BMR (${biometrics.formula.toUpperCase()}):** ${report.selectedBmr} kcal/day | **Maintenance TDEE:** ${report.tdee} kcal/day

| Day Type | Frequency | Daily Calories | Protein (g) | Carbs (g) | Fats (g) | Fiber (g) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Training Days (+${biometrics.trainingDaySurplusPct}%)** | ${biometrics.trainingDaysPerWeek} days/wk | **${report.trainingDayMacros.calories} kcal** | ${report.trainingDayMacros.proteinGrams}g | ${report.trainingDayMacros.carbsGrams}g | ${report.trainingDayMacros.fatGrams}g | ${report.trainingDayMacros.fiberGrams}g |
| **Rest Days (${biometrics.restDayDeficitPct}%)** | ${7 - biometrics.trainingDaysPerWeek} days/wk | **${report.restDayMacros.calories} kcal** | ${report.restDayMacros.proteinGrams}g | ${report.restDayMacros.carbsGrams}g | ${report.restDayMacros.fatGrams}g | ${report.restDayMacros.fiberGrams}g |
| **7-Day Weekly Avg** | 7 days | **${report.weeklyAverageMacros.calories} kcal** | ${report.weeklyAverageMacros.proteinGrams}g | ${report.weeklyAverageMacros.carbsGrams}g | ${report.weeklyAverageMacros.fatGrams}g | ${report.weeklyAverageMacros.fiberGrams}g |

*Calculated via the 3-Formula Clinical Engine (Mifflin-St Jeor / Katch-McArdle / Cunningham) at [SmartMacroCalc.com](https://smartmacrocalc.com) (PMID: 26817506, 29405780)*`;
    }

    navigator.clipboard.writeText(md);
    setCopiedReddit(true);
    setTimeout(() => setCopiedReddit(false), 2500);
  };

  const nicheLabel = getTabLabel(activeTab);

  return (
    <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-5 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-2.5 py-0.5 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            Clinical Metabolic Passport • Shareable {nicheLabel} Summary
          </div>
          <h3 className="mt-1.5 text-lg font-bold text-white">
            Download Your {nicheLabel} Blueprint Card (PNG)
          </h3>
          <p className="mt-0.5 text-xs text-slate-300">
            Generates a high-contrast 1080×1350 visual card for Instagram Stories or 1-click sharing on{' '}
            <span className="font-mono text-teal-300">r/Fitness</span>,{' '}
            <span className="font-mono text-teal-300">r/loseit</span>,{' '}
            <span className="font-mono text-teal-300">r/xxfitness</span> &amp;{' '}
            <span className="font-mono text-teal-300">r/MacroFactor</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={generateAndDownloadCard}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-teal-400"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? 'Rendering PNG...' : `Download ${nicheLabel} Card (PNG)`}
          </button>

          <button
            type="button"
            onClick={copyRedditMarkdown}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-teal-500 hover:text-white"
          >
            {copiedReddit ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <MessageSquareCode className="h-4 w-4 text-teal-400" />
            )}
            {copiedReddit ? 'Reddit Table Copied!' : `Copy ${nicheLabel} Reddit Table`}
          </button>
        </div>
      </div>

      {/* Hidden Canvas used for crisp client-side PNG generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
