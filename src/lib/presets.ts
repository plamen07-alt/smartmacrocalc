import { UserBiometrics, DEFAULT_BIOMETRICS, CalculatorTab } from './formulas';

export interface PmidCitation {
  pmid: string;
  citation: string;
  title: string;
  journal: string;
  year: number;
  url: string;
}

export interface PresetTableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface PresetFaq {
  question: string;
  answer: string;
}

export type PresetCategory =
  | 'recomp'
  | 'glp1'
  | 'perimenopause'
  | 'fasting'
  | 'cutting'
  | 'reverse'
  | 'vegan'
  | 'electrolytes';

export interface SeoPreset {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  category: PresetCategory;
  defaultTab: CalculatorTab;
  biometrics: Partial<UserBiometrics>;
  directClinicalAnswer: string;
  clinicalSummary: string;
  keyTakeaways: string[];
  tableData: PresetTableData;
  pmidCitations: PmidCitation[];
  faq: PresetFaq[];
  calorieCycling?: {
    trainingCalories: number;
    restCalories: number;
  };
}

export const SEO_PRESETS: SeoPreset[] = [
  {
    "slug": "130-lb-female-body-recomposition",
    "title": "Body Recomposition Macros for a 130 lb Female (Calorie Cycling Protocol)",
    "metaDescription": "Precision training-day (+5%) and rest-day (-20%) calorie cycling macros for a 130 lb female building lean muscle while shedding stubborn body fat.",
    "badge": "Female Recomp Blueprint • Katch-McArdle",
    "h1": "Body Recomposition & Macro Cycling for a 130 lb Female",
    "subtitle": "Calibrated training-day anabolic surplus (+5% kcal) and rest-day lipolytic deficit (-20% kcal) for a 59 kg (130 lb) female athlete.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 27,
      "weightKg": 58.967008149449185,
      "heightCm": 162.6,
      "bodyFatPct": 22,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1600,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 130 lb female (22% body fat, 101.4 lb LBM) seeking body recomposition, consume 1968 kcal on training days (+5% surplus) with 117g protein, 267g carbs, and 48g fat. On rest days, drop to 1498 kcal (-20% deficit) with 122g protein, 140g carbs, and 50g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "At 130 lbs with 22% body fat, this female carries 101.4 lbs of metabolically active Lean Body Mass (LBM). Calorie cycling alternates 4 training days in slight energy abundance (+5%) to fuel resistance training and muscle protein synthesis with 3 rest days in deficit (-20%) to accelerate fatty acid oxidation without suppressing thyroid conversion.",
    "keyTakeaways": [
      "Maintain 115g daily protein across both training and rest days (1.13g per lb LBM).",
      "Concentrate 60% of daily carbohydrates into pre- and post-workout meals on training days.",
      "Preserve dietary fat at 58g daily to support hormone balance and ovarian steroidogenesis."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "1968 kcal",
          "117g (468 kcal)",
          "267g (1068 kcal)",
          "48g (432 kcal)",
          "mTORC1 Anabolic Signaling"
        ],
        [
          "Rest Day (-20%)",
          "1498 kcal",
          "122g (488 kcal)",
          "140g (560 kcal)",
          "50g (450 kcal)",
          "AMPK Lipolytic Oxidation"
        ],
        [
          "Weekly Total / Average",
          "12 366 kcal",
          "834g Total",
          "1488g Total",
          "342g Total",
          "~0.5 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "2305711",
        "citation": "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990.",
        "title": "A new predictive equation for resting energy expenditure in healthy individuals",
        "journal": "Am J Clin Nutr",
        "year": 1990,
        "url": "https://pubmed.ncbi.nlm.nih.gov/2305711/"
      },
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      }
    ],
    "faq": [
      {
        "question": "Can a 130 lb woman build muscle without gaining scale weight?",
        "answer": "Yes. Longland et al. (2016) demonstrated that resistance-trained subjects in a controlled calorie cycle simultaneously gain skeletal muscle and lose adipose tissue when protein is anchored at 2.2g/kg+."
      },
      {
        "question": "Why not use a standard 500 kcal daily deficit?",
        "answer": "A chronic daily deficit of 500 kcal lowers leptin, downregulates T3 thyroid hormone, and elevates cortisol in leaner women. Calorie cycling prevents metabolic adaptation."
      }
    ]
  },
  {
    "slug": "145-lb-female-body-recomposition",
    "title": "Body Recomposition Macros for a 145 lb Female (Calorie Cycling Protocol)",
    "metaDescription": "Exact training-day surplus and rest-day deficit macros for a 145 lb female aiming to decrease body fat percentage while increasing lean athletic muscle tone.",
    "badge": "Female Recomp Blueprint • Katch-McArdle",
    "h1": "Body Recomposition & Macro Cycling for a 145 lb Female",
    "subtitle": "Precision nutrient partitioning schedule for a 65.8 kg (145 lb) female athlete: 4 training days at +5% paired with 3 rest days at -20% deficit.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 31,
      "weightKg": 65.77089370515486,
      "heightCm": 165.1,
      "bodyFatPct": 24,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1700,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 145 lb female (24% body fat, 110.2 lb LBM) seeking body recomposition, consume 2095 kcal on training days (+5% surplus) with 127g protein, 282g carbs, and 51g fat. On rest days, drop to 1597 kcal (-20% deficit) with 132g protein, 148g carbs, and 53g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "With 110.2 lbs of Lean Body Mass, this 145 lb female benefits from high-protein nutrient partitioning. Consuming 235g carbs on workout days ensures muscular glycogen replenishment and high training volume, while rest-day carbohydrate reduction triggers lipolytic pathway signaling.",
    "keyTakeaways": [
      "Lock protein intake at 125g daily across both lifting and recovery days.",
      "Distribute protein into 3 to 4 feedings containing at least 30g each to stimulate mTORC1.",
      "Take advantage of training-day insulin sensitivity by concentrating carbohydrates around training."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "2095 kcal",
          "127g (508 kcal)",
          "282g (1128 kcal)",
          "51g (459 kcal)",
          "Muscle Glycogen & Hypertrophy"
        ],
        [
          "Rest Day (-20%)",
          "1597 kcal",
          "132g (528 kcal)",
          "148g (592 kcal)",
          "53g (477 kcal)",
          "Systemic Adipose Oxidation"
        ],
        [
          "Weekly Net Balance",
          "13 171 kcal",
          "904g Total",
          "1572g Total",
          "363g Total",
          "~0.6 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Should a 145 lb woman do cardio on rest days during recomposition?",
        "answer": "Low-intensity steady state (LISS) cardio or 8,000–10,000 daily steps is recommended on rest days. Avoid high-intensity interval training (HIIT) on rest days to preserve central nervous system recovery."
      },
      {
        "question": "How fast can I expect body recomposition results at 145 lbs?",
        "answer": "Visible waist circumference reduction and muscular definition improvements typically appear within 6 to 8 weeks, with measurable DEXA changes within 12 weeks."
      }
    ]
  },
  {
    "slug": "160-lb-female-body-recomposition",
    "title": "Body Recomposition Macros for a 160 lb Female (Calorie Cycling Protocol)",
    "metaDescription": "Clinical body recomposition macros for a 160 lb woman: training day carb fueling and rest day lipolytic deficit for simultaneous fat loss and muscle gain.",
    "badge": "Female Recomp Blueprint • Katch-McArdle",
    "h1": "Body Recomposition & Macro Cycling for a 160 lb Female",
    "subtitle": "Evidence-based nutritional protocol for a 72.6 kg (160 lb) woman with 27% body fat: 2,120 kcal training days and 1,615 kcal rest days.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 35,
      "weightKg": 72.57477926086054,
      "heightCm": 167.6,
      "bodyFatPct": 27,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1800,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 160 lb female (27% body fat, 116.8 lb LBM) seeking body recomposition, consume 2185 kcal on training days (+5% surplus) with 134g protein, 293g carbs, and 53g fat. On rest days, drop to 1668 kcal (-20% deficit) with 139g protein, 152g carbs, and 56g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "Carrying 116.8 lbs of Lean Body Mass, a 160 lb woman has substantial metabolic capacity. By alternating training surpluses with recovery deficits, calories average 1,900 kcal/day across the week, yielding sustainable fat loss while increasing back squat and deadlift strength.",
    "keyTakeaways": [
      "Target 135g protein daily (1.16g per lb LBM) to protect nitrogen balance during deficits.",
      "Fuel heavy resistance sessions with 255g carbohydrates on training days.",
      "Maintain 67g dietary fat daily to optimize sex hormone binding globulin (SHBG) and estrogen levels."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "2185 kcal",
          "134g (536 kcal)",
          "293g (1172 kcal)",
          "53g (477 kcal)",
          "Targeted Hypertrophy Fuel"
        ],
        [
          "Rest Day (-20%)",
          "1668 kcal",
          "139g (556 kcal)",
          "152g (608 kcal)",
          "56g (504 kcal)",
          "Fat Oxidation & Recovery"
        ],
        [
          "Weekly Net Balance",
          "13 744 kcal",
          "953g Total",
          "1628g Total",
          "380g Total",
          "~0.7 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Will 255g of carbohydrates make a 160 lb woman gain fat?",
        "answer": "No. In the presence of intense resistance exercise, muscle GLUT4 receptors direct carbohydrates preferentially to skeletal muscle glycogen stores rather than de novo lipogenesis."
      },
      {
        "question": "How much water should I drink on this recomposition plan?",
        "answer": "Aim for at least 2.8 to 3.2 liters of fluids daily to support elevated glycogen storage (which binds 3g of water per gram of glycogen) and urea clearance from protein metabolism."
      }
    ]
  },
  {
    "slug": "165-lb-male-body-recomposition",
    "title": "Body Recomposition Macros for a 165 lb Male (Calorie Cycling Protocol)",
    "metaDescription": "Calorie cycling blueprint for a 165 lb male lifter. Optimize lean muscle mass gains and abdominal fat loss with precision training and rest day splits.",
    "badge": "Male Recomp Blueprint • Katch-McArdle",
    "h1": "Body Recomposition & Macro Cycling for a 165 lb Male",
    "subtitle": "Precision macro cycling protocol for a 74.8 kg (165 lb) male at 16% body fat: 2,420 kcal on lifting days and 1,845 kcal on recovery days.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 25,
      "weightKg": 74.84274111276243,
      "heightCm": 175.3,
      "bodyFatPct": 16,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2100,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 165 lb male (16% body fat, 138.6 lb LBM) seeking body recomposition, consume 2497 kcal on training days (+5% surplus) with 159g protein, 328g carbs, and 61g fat. On rest days, drop to 1903 kcal (-20% deficit) with 164g protein, 170g carbs, and 63g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "At 16% body fat and 138.6 lbs LBM, this male athlete is in the optimal window for body recomposition. A training-day surplus provides adequate glycogen to support high mechanical tension, while rest-day deficits facilitate visceral and subcutaneous fat mobilization.",
    "keyTakeaways": [
      "Maintain 160g protein daily across all days (1.15g per lb LBM).",
      "Allocate 285g carbohydrates on training days to maximize workout intensity.",
      "Keep rest-day fat at 71g to support endogenous testosterone production."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "2497 kcal",
          "159g (636 kcal)",
          "328g (1312 kcal)",
          "61g (549 kcal)",
          "Anabolic Glycogen Supercompensation"
        ],
        [
          "Rest Day (-20%)",
          "1903 kcal",
          "164g (656 kcal)",
          "170g (680 kcal)",
          "63g (567 kcal)",
          "Accelerated Adipose Oxidation"
        ],
        [
          "Weekly Net Balance",
          "15 697 kcal",
          "1128g Total",
          "1822g Total",
          "433g Total",
          "~0.7 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      },
      {
        "pmid": "2305711",
        "citation": "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990.",
        "title": "A new predictive equation for resting energy expenditure in healthy individuals",
        "journal": "Am J Clin Nutr",
        "year": 1990,
        "url": "https://pubmed.ncbi.nlm.nih.gov/2305711/"
      }
    ],
    "faq": [
      {
        "question": "Can a 165 lb male get down to 10% body fat with this protocol?",
        "answer": "Yes. Calorie cycling is especially effective for reducing body fat from 16% down to 10–12% while maintaining bench press, overhead press, and squat strength."
      },
      {
        "question": "What supplements support recomposition at 165 lbs?",
        "answer": "Creatine monohydrate (5g/day), whey protein isolate (to hit 160g protein), and vitamin D3 (2,000–5,000 IU/day) provide proven clinical efficacy."
      }
    ]
  },
  {
    "slug": "180-lb-male-body-recomposition",
    "title": "Body Recomposition Macros for a 180 lb Male (Calorie Cycling Protocol)",
    "metaDescription": "Exact training-day (+5%) and rest-day (-20%) calorie cycling and protein macros for a 180 lb male looking to build lean muscle while losing body fat.",
    "badge": "Male Recomp Blueprint • Katch-McArdle",
    "h1": "Body Recomposition & Macro Cycling for a 180 lb Male",
    "subtitle": "Precision training-day anabolic surplus (+5% kcal) paired with rest-day lipolytic deficit (-20% kcal) calibrated for an 81.6 kg (180 lb) male physique.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 32,
      "weightKg": 81.6466266684681,
      "heightCm": 177.8,
      "bodyFatPct": 18,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2200,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 180 lb male (18% body fat, 147.6 lb LBM) seeking body recomposition, consume 2624 kcal on training days (+5% surplus) with 170g protein, 342g carbs, and 64g fat. On rest days, drop to 1999 kcal (-20% deficit) with 175g protein, 174g carbs, and 67g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "At 180 lbs and ~18% body fat, a male athlete carries approximately 147.6 lbs (67.0 kg) of Lean Body Mass (LBM). Instead of a chronic 500 kcal daily deficit that suppresses testosterone and metabolic rate, alternating 4 Training Days at slight surplus with 3 Rest Days at a 20% deficit partitions carbohydrates toward skeletal muscle glycogen while oxidizing ~0.7 lbs of pure adipose tissue weekly.",
    "keyTakeaways": [
      "Anchor daily protein at 170g–180g (1.15g per lb of Lean Body Mass) across both training and rest days.",
      "Concentrate 60% of training-day carbohydrates within the 3-hour peri-workout window to maximize mTOR signaling.",
      "Keep rest-day dietary fat around 75g to support endogenous steroidogenesis and hormonal balance."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "2624 kcal",
          "170g (680 kcal)",
          "342g (1368 kcal)",
          "64g (576 kcal)",
          "mTORC1 Anabolic Stimulation"
        ],
        [
          "Rest Day (-20%)",
          "1999 kcal",
          "175g (700 kcal)",
          "174g (696 kcal)",
          "67g (603 kcal)",
          "Lipolytic Adipose Oxidation"
        ],
        [
          "Weekly Net Balance",
          "16 493 kcal",
          "1205g Total",
          "1890g Total",
          "457g Total",
          "~0.7 lb Adipose Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Can a 180 lb male lose belly fat and gain muscle at the same time?",
        "answer": "Yes. Peer-reviewed research (Longland et al., 2016) confirms that individuals with 15–22% body fat who consume 2.2g/kg+ of protein and perform progressive resistance training 3–4 days per week simultaneously increase lean mass while losing visceral and subcutaneous fat."
      },
      {
        "question": "Which BMR formula is best for a 180 lb male who lifts weights?",
        "answer": "The Katch-McArdle or Cunningham equation is superior to standard BMI-based equations because it accounts for metabolically active Lean Body Mass rather than total scale weight."
      }
    ]
  },
  {
    "slug": "195-lb-male-body-recomposition",
    "title": "Body Recomposition Macros for a 195 lb Male (Calorie Cycling Protocol)",
    "metaDescription": "Advanced body recomposition macros for a 195 lb male athlete using the Cunningham equation. Cycle carbs and calories to maximize mTOR and lipolysis.",
    "badge": "Heavyweight Recomp • Cunningham Formula",
    "h1": "Body Recomposition & Macro Cycling for a 195 lb Male",
    "subtitle": "High-performance nutrition protocol for an 88.5 kg (195 lb) male lifter: 2,750 kcal training days and 2,095 kcal recovery days.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 29,
      "weightKg": 88.45051222417378,
      "heightCm": 180.3,
      "bodyFatPct": 19,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2350,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 195 lb male (19% body fat, 158.0 lb LBM) seeking body recomposition, consume 2997 kcal on training days (+5% surplus) with 182g protein, 403g carbs, and 73g fat. On rest days, drop to 2284 kcal (-20% deficit) with 187g protein, 213g carbs, and 76g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "With 157.9 lbs of Lean Body Mass, this 195 lb male possesses substantial glycolytic capacity. Utilizing Cunningham bioenergetics, 320g carbohydrates on training days fuel heavy compound lifting, while rest-day carbohydrate reduction triggers fatty acid translocase upregulation.",
    "keyTakeaways": [
      "Maintain 185g protein daily (1.17g per lb LBM) across all days.",
      "Target 320g complex carbohydrates on training days to maximize cellular hydration and glycogen.",
      "Hold rest-day fat at 82g to safeguard anabolic hormone production."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "2997 kcal",
          "182g (728 kcal)",
          "403g (1612 kcal)",
          "73g (657 kcal)",
          "Heavy Lifting & Glycogen Synthesis"
        ],
        [
          "Rest Day (-20%)",
          "2284 kcal",
          "187g (748 kcal)",
          "213g (852 kcal)",
          "76g (684 kcal)",
          "Adipose Mobilization & Recovery"
        ],
        [
          "Weekly Net Balance",
          "18 840 kcal",
          "1289g Total",
          "2251g Total",
          "520g Total",
          "~0.8 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      },
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      }
    ],
    "faq": [
      {
        "question": "Why use the Cunningham formula for a 195 lb male?",
        "answer": "The Cunningham equation calculates BMR directly from Lean Body Mass (BMR = 500 + 22 * LBM_kg), providing superior accuracy for muscular athletes over standard weight-only formulas."
      },
      {
        "question": "How should carbohydrates be timed on training days?",
        "answer": "Consume 50g pre-workout, 80g post-workout, and the remaining 190g split across your other meals to maximize glycogen storage and minimize fat deposition."
      }
    ]
  },
  {
    "slug": "210-lb-male-body-recomposition",
    "title": "Body Recomposition Macros for a 210 lb Male (Calorie Cycling Protocol)",
    "metaDescription": "Calorie cycling macros for a 210 lb male lifter. Preserve lean mass and drop visceral fat with targeted high-protein training and rest day nutrition.",
    "badge": "Heavyweight Recomp • Cunningham Formula",
    "h1": "Body Recomposition & Macro Cycling for a 210 lb Male",
    "subtitle": "Nutrient timing and calorie cycling blueprint for a 95.3 kg (210 lb) male: 2,880 kcal on workout days and 2,190 kcal on rest days.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 36,
      "weightKg": 95.25439777987945,
      "heightCm": 182.9,
      "bodyFatPct": 21,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2500,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 210 lb male (21% body fat, 165.9 lb LBM) seeking body recomposition, consume 3112 kcal on training days (+5% surplus) with 191g protein, 416g carbs, and 76g fat. On rest days, drop to 2371 kcal (-20% deficit) with 196g protein, 219g carbs, and 79g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "At 210 lbs with 21% body fat, this individual has 165.9 lbs of Lean Body Mass. Rather than a flat diet that leads to metabolic adaptation and lethargy, calorie cycling maintains high athletic training performance on lifting days while creating a weekly 3,000+ kcal net deficit.",
    "keyTakeaways": [
      "Lock protein at 195g daily across training and recovery days (1.18g per lb LBM).",
      "Allocate 335g carbs on training days to support high-volume strength sessions.",
      "Maintain 86g healthy fats daily to support optimal lipid profiles and joint comfort."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "3112 kcal",
          "191g (764 kcal)",
          "416g (1664 kcal)",
          "76g (684 kcal)",
          "Heavy Resistance Anabolism"
        ],
        [
          "Rest Day (-20%)",
          "2371 kcal",
          "196g (784 kcal)",
          "219g (876 kcal)",
          "79g (711 kcal)",
          "Lipolytic Deficit & Recovery"
        ],
        [
          "Weekly Net Balance",
          "19 561 kcal",
          "1352g Total",
          "2321g Total",
          "541g Total",
          "~0.8 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      },
      {
        "pmid": "2305711",
        "citation": "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990.",
        "title": "A new predictive equation for resting energy expenditure in healthy individuals",
        "journal": "Am J Clin Nutr",
        "year": 1990,
        "url": "https://pubmed.ncbi.nlm.nih.gov/2305711/"
      }
    ],
    "faq": [
      {
        "question": "Should a 210 lb male do cardio during recomposition?",
        "answer": "Yes. We recommend 30 minutes of low-intensity incline treadmill walking on rest days to promote recovery and fatty acid oxidation without increasing hunger."
      },
      {
        "question": "How do I track progress if scale weight remains unchanged?",
        "answer": "Measure waist circumference at the navel and track gym strength across 5-rep maxes. Decreasing waist size paired with stable or increasing strength confirms successful recomposition."
      }
    ]
  },
  {
    "slug": "230-lb-male-body-recomposition",
    "title": "Body Recomposition Macros for a 230 lb Male (Calorie Cycling Protocol)",
    "metaDescription": "Heavyweight body recomposition protocol for a 230 lb male. Strategic calorie cycling to support heavy strength training while driving systemic fat loss.",
    "badge": "Heavyweight Recomp • Cunningham Formula",
    "h1": "Body Recomposition & Macro Cycling for a 230 lb Male",
    "subtitle": "High-output recomposition blueprint for a 104.3 kg (230 lb) male: 3,050 kcal training days and 2,320 kcal rest days for sustained muscle retention.",
    "category": "recomp",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 34,
      "weightKg": 104.32624518748702,
      "heightCm": 185.4,
      "bodyFatPct": 24,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 230 lb male (24% body fat, 174.8 lb LBM) seeking body recomposition, consume 3239 kcal on training days (+5% surplus) with 201g protein, 431g carbs, and 79g fat. On rest days, drop to 2470 kcal (-20% deficit) with 206g protein, 227g carbs, and 82g fat to lose 0.5 lb of fat weekly.",
    "clinicalSummary": "Carrying 174.8 lbs of Lean Body Mass, a 230 lb male burns substantial energy even at rest. Calorie cycling provides 355g carbohydrates on training days to maximize heavy deadlift, squat, and press sessions, while rest-day deficits facilitate deep adipose mobilization without catabolizing lean tissue.",
    "keyTakeaways": [
      "Maintain 205g protein daily (1.17g per lb LBM) across all days.",
      "Take advantage of training-day insulin sensitivity by eating the majority of carbs peri-workout.",
      "Drink 3.5+ liters of water daily to support kidney function, urea clearance, and cellular hydration."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (+5%)",
          "3239 kcal",
          "201g (804 kcal)",
          "431g (1724 kcal)",
          "79g (711 kcal)",
          "Heavy Workload Anabolism"
        ],
        [
          "Rest Day (-20%)",
          "2470 kcal",
          "206g (824 kcal)",
          "227g (908 kcal)",
          "82g (738 kcal)",
          "Fat Mobilization & Recovery"
        ],
        [
          "Weekly Net Balance",
          "20 366 kcal",
          "1422g Total",
          "2405g Total",
          "562g Total",
          "~0.9 lb Body Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      },
      {
        "pmid": "26817506",
        "citation": "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016.",
        "title": "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
        "journal": "Am J Clin Nutr",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26817506/"
      }
    ],
    "faq": [
      {
        "question": "Will 3,050 kcal cause fat gain for a 230 lb man?",
        "answer": "No. With 174.8 lbs of Lean Body Mass and 4 intense lifting sessions weekly, maintenance expenditure exceeds 2,900 kcal. The 3,050 kcal training intake represents only a minor +5% surplus."
      },
      {
        "question": "How long should a 230 lb man run this recomposition plan?",
        "answer": "We recommend 12 to 16 weeks of structured cycling, followed by a 2-week maintenance diet break before reassessing body composition metrics."
      }
    ]
  },
  {
    "slug": "140-lb-female-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 140 lb Female",
    "metaDescription": "Anti-sarcopenia protein floor, soluble fiber, and fluid intake targets for a 140 lb female on Semaglutide or Tirzepatide to defend lean muscle mass.",
    "badge": "GLP-1 Clinical Protocol • Anti-Sarcopenia",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (140 lb Female)",
    "subtitle": "Anti-sarcopenia nutrition blueprint designed to protect skeletal muscle, bone density, and metabolic rate for a 63.5 kg (140 lb) female on GLP-1 agonists.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 38,
      "weightKg": 63.50293185325297,
      "heightCm": 162.6,
      "bodyFatPct": 28,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1380,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 140 lb female (28% body fat, 100.8 lb LBM) on GLP-1 therapy requires a daily protein floor of 105g (2.3g/kg LBM) split across three 35g meals to prevent sarcopenia. Target 1400 kcal, 28g soluble fiber, and 2.5 liters of electrolyte-enriched water daily to maintain metabolic rate and digestive motility.",
    "clinicalSummary": "During GLP-1 agonist treatment, rapid weight loss poses a high risk of sarcopenic muscle wasting. For a 140 lb female with 100.8 lbs LBM, anchoring daily protein at 105g ensures adequate nitrogen balance, while 28g soluble fiber and 2.5L fluids counteract medication-induced gastrointestinal hypomotility.",
    "keyTakeaways": [
      "Eat protein first at every meal: reach at least 35g per feeding to surpass the leucine threshold.",
      "Drink 2.5 liters of water daily with electrolytes to prevent dehydration and hypovolemia.",
      "Engage in 2 to 3 weekly resistance training sessions to stimulate mechanical muscle protein synthesis."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "105g daily",
          "3 x 35g meals",
          "Anti-Sarcopenic MPS Trigger"
        ],
        [
          "Soluble Fiber",
          "28g daily",
          "Evenly across meals",
          "GI Motility & Glycemic Blunting"
        ],
        [
          "Hydration",
          "2.5L daily",
          "Hourly hydration sips",
          "Renal Support & Nausea Defense"
        ],
        [
          "Daily Energy Target",
          "1400 kcal",
          "3 balanced meals",
          "Controlled Deficit Preservation"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Why is protein so critical on Ozempic or Wegovy?",
        "answer": "Clinical trials show up to 40% of weight lost on GLP-1 medications can be lean body mass without targeted high-protein intake and resistance exercise."
      },
      {
        "question": "What if I feel too full to eat 35g of protein at once?",
        "answer": "Utilize low-volume protein sources such as whey protein isolate or liquid egg white shakes, which deliver 30g+ protein with minimal gastric fullness."
      }
    ]
  },
  {
    "slug": "160-lb-female-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 160 lb Female",
    "metaDescription": "Calculate the exact daily protein floor, soluble fiber, and hydration targets for a 160 lb woman on Semaglutide (Ozempic/Wegovy) or Tirzepatide (Mounjaro/Zepbound).",
    "badge": "GLP-1 Clinical Protocol • Anti-Sarcopenia",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (160 lb Female)",
    "subtitle": "Anti-sarcopenia nutrition blueprint designed to protect lean muscle tissue, bone density, and resting metabolic rate during rapid GLP-1 weight loss.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 41,
      "weightKg": 72.57477926086054,
      "heightCm": 165.1,
      "bodyFatPct": 31,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1460,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 160 lb female (31% body fat, 110.4 lb LBM) taking semaglutide must maintain a strict daily protein floor of 115g (2.3g/kg LBM) divided across four 29g feedings. Pair this with 1498 kcal, 30g soluble fiber, and 2.8 liters of fluids daily to avoid lean muscle wasting and severe gastrointestinal stasis.",
    "clinicalSummary": "STEP-1 clinical trial data indicates that without adequate dietary protein, a significant fraction of weight loss stems from lean musculoskeletal tissue. A 160 lb woman must maintain at least 115g protein daily split across 4 small feedings to protect bone density, lean mass, and metabolic rate.",
    "keyTakeaways": [
      "Prioritize protein at every feeding: aim for 28g to 32g per meal to stimulate mTORC1 despite delayed gastric emptying.",
      "Incorporate 30g daily soluble fiber and 2.8L fluids to avert medication-related constipation.",
      "Complete 3 weekly full-body resistance training sessions to signal skeletal muscle retention."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "115g daily",
          "4 x 29g feedings",
          "Leucine Threshold & Anti-Catabolism"
        ],
        [
          "Soluble Fiber",
          "30g daily",
          "7-8g per meal",
          "Gastric Motility & Stool Hydration"
        ],
        [
          "Total Fluids",
          "2.8L daily",
          "Continuous daily intake",
          "Hypovolemia & Headache Prevention"
        ],
        [
          "Total Calorie Intake",
          "1498 kcal",
          "4 small feedings",
          "Steady Nutrient Delivery"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "How much protein do I need on Ozempic or Zepbound at 160 lbs?",
        "answer": "Target 1.8g to 2.3g per kg of Lean Body Mass, which equals 105g to 115g daily for a 160 lb woman with 31% body fat."
      },
      {
        "question": "How do I manage nausea when trying to eat enough protein?",
        "answer": "Separate fluids from solid food by 30 minutes, choose room-temperature foods, and rely on clear whey protein or collagen peptides to hit your targets."
      }
    ]
  },
  {
    "slug": "180-lb-female-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 180 lb Female",
    "metaDescription": "Clinical GLP-1 nutrition protocol for a 180 lb woman. Preserve metabolically active skeletal muscle with exact protein, hydration, and fiber targets.",
    "badge": "GLP-1 Clinical Protocol • Anti-Sarcopenia",
    "h1": "GLP-1 & Tirzepatide Muscle Preservation Macros (180 lb Female)",
    "subtitle": "Comprehensive clinical nutrition blueprint for an 81.6 kg (180 lb) woman on GLP-1 or GIP/GLP-1 therapy: 125g protein floor and 3.0L fluids.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 45,
      "weightKg": 81.6466266684681,
      "heightCm": 167.6,
      "bodyFatPct": 35,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1550,
      "reverseStepKcal": 80,
      "glp1Medication": "tirzepatide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 180 lb female (35% body fat, 117.0 lb LBM) on GLP-1 receptor agonists needs at least 125g protein daily (2.35g/kg LBM) across four 31g meals. Consume 1564 kcal, 32g dietary fiber, and 3.0 liters of fluids daily to protect bone mineral density and defend basal metabolic expenditure.",
    "clinicalSummary": "Carrying 117.0 lbs of Lean Body Mass, a 180 lb woman undergoing rapid pharmacotherapy weight loss must hit a strict 125g protein floor. Pacing this into 4 daily portions stimulates muscle protein synthesis repeatedly while 3.0L of water maintains blood volume and kidney filtration.",
    "keyTakeaways": [
      "Hit 125g protein daily (1.07g per lb LBM) to defend skeletal muscle and prevent metabolic crash.",
      "Divide protein into 4 servings of ~31g to maintain consistent plasma amino acid availability.",
      "Incorporate 32g dietary fiber from chia, flaxseed, and vegetables to support regular bowel elimination."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "125g daily",
          "4 x 31g meals",
          "Continuous Muscle Protein Accretion"
        ],
        [
          "Dietary Fiber",
          "32g daily",
          "8g per feeding",
          "Delayed Gastric Emptying Regulation"
        ],
        [
          "Hydration",
          "3.0L daily",
          "350ml every 2 hrs",
          "Renal Function & Blood Pressure Support"
        ],
        [
          "Daily Energy Intake",
          "1564 kcal",
          "4 equal feedings",
          "Metabolic Rate Protection"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Can I take protein shakes on Tirzepatide (Mounjaro/Zepbound)?",
        "answer": "Yes. Ready-to-drink protein shakes or whey isolate powders are ideal because they deliver 30g+ of high-quality protein without burdensome chewing or heavy digestive volume."
      },
      {
        "question": "What happens if I consistently eat under 80g protein at 180 lbs?",
        "answer": "Chronic protein inadequacy accelerates muscle atrophy, thins hair follicles (telogen effluvium), and lowers resting energy expenditure, making weight regain much faster upon medication cessation."
      }
    ]
  },
  {
    "slug": "200-lb-female-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 200 lb Female",
    "metaDescription": "Defend resting metabolic rate and prevent muscle loss on Wegovy or Zepbound for a 200 lb female with calibrated protein, fiber, and fluid intake.",
    "badge": "GLP-1 Clinical Protocol • Anti-Sarcopenia",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (200 lb Female)",
    "subtitle": "Clinical nutrition and anti-sarcopenia protocol for a 90.7 kg (200 lb) female on GLP-1 weight loss therapy: 130g protein floor and 3.2L fluids.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 48,
      "weightKg": 90.71847407607567,
      "heightCm": 170.2,
      "bodyFatPct": 38,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1620,
      "reverseStepKcal": 80,
      "glp1Medication": "tirzepatide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 200 lb female (38% body fat, 124.0 lb LBM) on tirzepatide, maintain an anti-sarcopenic protein floor of 130g daily (2.3g/kg LBM) split across four 33g feedings. Target 1634 kcal, 35g prebiotic fiber, and 3.2 liters of electrolyte water to maintain lean mass and gut transit.",
    "clinicalSummary": "A 200 lb woman has 124.0 lbs of Lean Body Mass requiring metabolic protection. With severe appetite suppression, high-density nutrition is essential. Eating 130g of protein and 35g fiber ensures that body mass reduction is over 85% fat mass rather than skeletal muscle tissue.",
    "keyTakeaways": [
      "Maintain a non-negotiable 130g protein floor across 4 evenly spaced meals.",
      "Drink 3.2 liters of fluids with sodium and potassium to prevent medication-related orthostatic dizziness.",
      "Prioritize resistance training with weights or bands 3 times per week to trigger mechanotransduction."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "130g daily",
          "4 x 32.5g meals",
          "Preserve 124 lb Lean Body Mass"
        ],
        [
          "Prebiotic Fiber",
          "35g daily",
          "Soluble fiber & psyllium",
          "Counteracts Constipation & Bloating"
        ],
        [
          "Fluids Target",
          "3.2L daily",
          "Regular hydration cues",
          "Kidney Filtration & Energy Support"
        ],
        [
          "Daily Energy Intake",
          "1634 kcal",
          "4 small nutritious meals",
          "Fat Loss with Muscle Sparing"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Why do my joints feel weaker on GLP-1 medications?",
        "answer": "Rapid weight loss without adequate protein causes rapid collagen breakdown and connective tissue catabolism. Hitting 130g protein and pairing it with resistance training protects joint integrity."
      },
      {
        "question": "Should I do cardio or weights at 200 lbs on Ozempic?",
        "answer": "Prioritize progressive resistance training over excessive cardio. Lifting weights signals the body to preserve lean muscle while burning stored visceral and subcutaneous fat."
      }
    ]
  },
  {
    "slug": "190-lb-male-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 190 lb Male",
    "metaDescription": "Evidence-based GLP-1 nutrition for a 190 lb male. Prevent lean tissue catabolism with 145g protein floor, hydration guidelines, and resistance training.",
    "badge": "Male GLP-1 Protocol • Lean Guard",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (190 lb Male)",
    "subtitle": "Anti-catabolic nutrition and hydration blueprint for an 86.2 kg (190 lb) male on Semaglutide or Tirzepatide: 145g protein and 3.4L fluids.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 42,
      "weightKg": 86.18255037227188,
      "heightCm": 177.8,
      "bodyFatPct": 25,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1820,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 190 lb male (25% body fat, 142.5 lb LBM) on GLP-1 agonist therapy requires 145g of protein daily (2.24g/kg LBM) split into four 36g servings. Combine 1821 kcal, 35g fiber, and 3.4 liters of fluids with progressive resistance training to protect over 90% of skeletal muscle mass.",
    "clinicalSummary": "A 190 lb male with 142.5 lbs of Lean Body Mass requires robust amino acid signaling to prevent muscle atrophy during GLP-1 induced hypocaloric states. A daily target of 145g protein divided across 4 meals stimulates myofibrillar synthesis while 35g fiber and 3.4L fluids maintain digestive function.",
    "keyTakeaways": [
      "Maintain 145g protein daily (1.02g per lb LBM) across all days.",
      "Split protein into 4 servings of ~36g with at least 3.0g leucine per feeding.",
      "Drink 3.4 liters of electrolyte-supplemented water daily to prevent dehydration fatigue."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "145g daily",
          "4 x 36g servings",
          "Myofibrillar Protein Synthesis Defense"
        ],
        [
          "Soluble & Insoluble Fiber",
          "35g daily",
          "Divided across meals",
          "Gastrointestinal Motility & Lipid Clearance"
        ],
        [
          "Hydration Volume",
          "3.4L daily",
          "Consistent daytime intake",
          "Plasma Volume & Glomerular Filtration"
        ],
        [
          "Daily Energy Intake",
          "1821 kcal",
          "4 nutrient-dense meals",
          "Preserves Testosterone & Metabolic Rate"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Will GLP-1 medications lower my testosterone levels as a 190 lb man?",
        "answer": "Long-term visceral fat reduction generally increases free testosterone; however, acute severe starvation diets can temporarily lower it. Maintaining 145g protein and adequate healthy fats protects endocrine function."
      },
      {
        "question": "How should a 190 lb man lift weights while on Ozempic?",
        "answer": "Focus on compound movements (deadlifts, squats, bench press, rows) 3 days weekly with 3–4 sets of 6–10 repetitions close to muscular failure to preserve contractile tissue."
      }
    ]
  },
  {
    "slug": "210-lb-male-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 210 lb Male",
    "metaDescription": "Combat muscle wasting on Ozempic or Wegovy for a 210 lb male. Exact daily protein targets, pacing strategy, and hydration recommendations.",
    "badge": "Male GLP-1 Protocol • Lean Guard",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (210 lb Male)",
    "subtitle": "Clinical anti-sarcopenia protocol for a 95.3 kg (210 lb) male: 155g daily protein floor, 38g fiber, and 3.6L hydration to defend lean muscle mass.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 46,
      "weightKg": 95.25439777987945,
      "heightCm": 180.3,
      "bodyFatPct": 28,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1940,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 210 lb male (28% body fat, 151.2 lb LBM) on semaglutide requires a protein floor of 155g daily (2.26g/kg LBM) divided into four 39g portions. Consume 1909 kcal, 38g fiber, and 3.6 liters of water daily to prevent sarcopenic obesity and support ongoing fat oxidation.",
    "clinicalSummary": "Carrying 151.2 lbs of Lean Body Mass, a 210 lb male must maintain adequate nitrogen balance during GLP-1 weight loss. By consuming 155g protein split into 4 portions of ~39g each, the body receives repeated anabolic leucine pulses that protect muscle tissue and resting metabolic rate.",
    "keyTakeaways": [
      "Hit a daily protein floor of 155g (1.03g per lb LBM) across all days.",
      "Consume 38g dietary fiber daily to maintain gastrointestinal motility.",
      "Drink 3.6 liters of fluids daily to support kidney function and avoid dehydration-induced nausea."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "155g daily",
          "4 x 38.75g feedings",
          "Preserves 151 lb LBM & Metabolic Rate"
        ],
        [
          "Dietary Fiber",
          "38g daily",
          "Mixed soluble & insoluble",
          "Prevents Constipation & Satiates"
        ],
        [
          "Hydration Target",
          "3.6L daily",
          "Sip consistently all day",
          "Avoids Nausea & Supports Filtration"
        ],
        [
          "Daily Energy Intake",
          "1909 kcal",
          "4 structured feedings",
          "Sustainable Lipolytic Caloric Deficit"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "What happens if a 210 lb man only eats 1,200 calories on Ozempic?",
        "answer": "A crash intake of 1,200 kcal causes rapid loss of skeletal muscle, gallbladder sludge, and extreme metabolic downshift. We advise maintaining at least 1,800–1,950 kcal with 155g protein."
      },
      {
        "question": "Can I use creatine while taking semaglutide?",
        "answer": "Yes. Creatine monohydrate (5g/day) increases intracellular muscle hydration and strength, helping counteract medication-induced muscle loss."
      }
    ]
  },
  {
    "slug": "230-lb-male-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 230 lb Male",
    "metaDescription": "Clinical anti-sarcopenia protocol for a 230 lb male on Tirzepatide or Semaglutide. Defend skeletal muscle mass, strength, and resting energy expenditure.",
    "badge": "Male GLP-1 Protocol • Lean Guard",
    "h1": "GLP-1 & Tirzepatide Muscle Preservation Macros (230 lb Male)",
    "subtitle": "Comprehensive clinical nutrition blueprint for a 104.3 kg (230 lb) male on dual GIP/GLP-1 agonists: 165g protein floor and 3.8L fluids.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 50,
      "weightKg": 104.32624518748702,
      "heightCm": 182.9,
      "bodyFatPct": 30,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2080,
      "reverseStepKcal": 80,
      "glp1Medication": "tirzepatide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 230 lb male (30% body fat, 161.0 lb LBM) using tirzepatide must consume at least 165g of protein daily (2.26g/kg LBM) spaced into four 41g meals. Ingest 2173 kcal, 40g soluble fiber, and 3.8 liters of fluids daily to prevent severe skeletal muscle loss during rapid weight reduction.",
    "clinicalSummary": "SURMOUNT-1 trials highlight the importance of high-protein protocols during profound weight reduction. With 161.0 lbs of Lean Body Mass, a 230 lb male must ingest 165g protein daily to maintain physical vigor, bone density, and metabolic efficiency.",
    "keyTakeaways": [
      "Consume 165g protein daily across 4 meals containing at least 40g each.",
      "Target 40g fiber daily to support intestinal health and smooth transit.",
      "Drink 3.8 liters of water daily to offset rapid sodium and water excretion."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "165g daily",
          "4 x 41.25g meals",
          "Anti-Catabolic LBM Preservation"
        ],
        [
          "Dietary Fiber",
          "40g daily",
          "Gradual meal pacing",
          "GI Motility & Microbiome Balance"
        ],
        [
          "Hydration Target",
          "3.8L daily",
          "350ml every 90 mins",
          "Renal Clearance & Fluid Homeostasis"
        ],
        [
          "Daily Energy Intake",
          "2173 kcal",
          "4 structured feedings",
          "High Satiety Nutritional Density"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Why is Tirzepatide weight loss often faster than Semaglutide?",
        "answer": "Tirzepatide activates both GIP and GLP-1 receptors, producing greater appetite suppression and caloric reduction, which makes hitting your protein floor even more essential."
      },
      {
        "question": "How do I reach 165g protein with low appetite?",
        "answer": "Incorporate egg whites, Greek yogurt, canned tuna, chicken breast, and two 30g whey isolate shakes throughout the day."
      }
    ]
  },
  {
    "slug": "240-lb-male-glp1-protein-macros",
    "title": "GLP-1 & Ozempic Protein & Macro Calculator for a 240 lb Male",
    "metaDescription": "Macro cycling and anti-sarcopenia protein blueprint for a 240 lb male on GLP-1 weight loss therapy. Protect metabolic rate and lean tissues.",
    "badge": "Male GLP-1 Protocol • Lean Guard",
    "h1": "GLP-1 & Semaglutide Muscle Preservation Macros (240 lb Male)",
    "subtitle": "Heavyweight anti-sarcopenia nutrition strategy for a 108.9 kg (240 lb) male: 170g protein floor, 40g fiber, and 4.0L fluids.",
    "category": "glp1",
    "defaultTab": "glp1",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 52,
      "weightKg": 108.86216889129079,
      "heightCm": 185.4,
      "bodyFatPct": 32,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2150,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 240 lb male (32% body fat, 163.2 lb LBM) on semaglutide requires a daily protein floor of 170g (2.3g/kg LBM) distributed across four 43g feedings. Target 2195 kcal, 40g fiber, and 4.0 liters of water daily to maintain lean body mass and protect resting metabolic energy expenditure.",
    "clinicalSummary": "At 240 lbs and 32% body fat, this male possesses 163.2 lbs of Lean Body Mass. GLP-1 receptor agonist treatment provides powerful appetite suppression, but failing to consume 170g protein daily risks substantial loss of muscular strength and metabolic capacity.",
    "keyTakeaways": [
      "Anchor daily protein at 170g (1.04g per lb LBM) across all days.",
      "Drink 4.0 liters of water daily to support kidney function and avoid constipation.",
      "Perform 3 weekly resistance training sessions focused on major muscle groups."
    ],
    "tableData": {
      "headers": [
        "Clinical Target",
        "Target Value",
        "Pacing Strategy",
        "Clinical Rationale"
      ],
      "rows": [
        [
          "Protein Floor",
          "170g daily",
          "4 x 42.5g meals",
          "Prevents Severe Sarcopenia & Weakness"
        ],
        [
          "Dietary Fiber",
          "40g daily",
          "Chia, oats, leafy greens",
          "Optimizes Intestinal Transit Time"
        ],
        [
          "Hydration Volume",
          "4.0L daily",
          "Structured fluid timing",
          "Mitigates Nausea & Renal Strain"
        ],
        [
          "Daily Energy Intake",
          "2195 kcal",
          "4 balanced meals",
          "Controlled Weight Reduction"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "33567185",
        "citation": "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021.",
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        "journal": "N Engl J Med",
        "year": 2021,
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "pmid": "19057193",
        "citation": "Paddon-Jones D, Rasmussen BB. Dietary protein recommendations and the prevention of sarcopenia. Curr Opin Clin Nutr Metab Care. 2009.",
        "title": "Dietary protein recommendations and the prevention of sarcopenia",
        "journal": "Curr Opin Clin Nutr Metab Care",
        "year": 2009,
        "url": "https://pubmed.ncbi.nlm.nih.gov/19057193/"
      }
    ],
    "faq": [
      {
        "question": "Can I do heavy weightlifting while on GLP-1 medications?",
        "answer": "Yes, resistance training is strongly advised. It provides the mechanical stimulus necessary to signal muscle protein synthesis and prevent skeletal muscle wasting."
      },
      {
        "question": "How do I know if I am losing muscle rather than fat?",
        "answer": "Track your strength on key gym exercises and check periodic InBody or DEXA scans. If strength drops noticeably, increase protein and verify you are not in an excessive caloric deficit."
      }
    ]
  },
  {
    "slug": "perimenopause-125-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (125 lb Female Hormone Protocol)",
    "metaDescription": "Hormone-calibrated TDEE, protein leucine threshold, and cortisol-friendly carbohydrate cycling for a 125 lb woman navigating perimenopause.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (125 lb Female)",
    "subtitle": "Hormone-calibrated nutrition for a 56.7 kg (125 lb) woman: 35g protein breakfast anchor, 3.0g leucine threshold, and carb cycling.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 42,
      "weightKg": 56.69904629754729,
      "heightCm": 160,
      "bodyFatPct": 23,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1550,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 125 lb perimenopausal woman (23% body fat, 96.3 lb LBM) has a TDEE of 1805 kcal. To overcome anabolic resistance, anchor breakfast with 35g protein providing 3.0g leucine. Consume 115g protein daily, cycling 175g carbs on lifting days and 110g on rest days for estrogen-cortisol balance.",
    "clinicalSummary": "Declining ovarian estrogen production blunts skeletal muscle anabolic sensitivity and alters lipid metabolism. For a 125 lb woman, consuming 35g protein at breakfast overcomes the elevated leucine threshold, while cortisol-friendly carbohydrate cycling supports adrenal hormone synthesis.",
    "keyTakeaways": [
      "Anchor breakfast with at least 35g protein to trigger muscle protein synthesis.",
      "Cycle carbohydrates higher on resistance training days to support thyroid and adrenal function.",
      "Maintain 30g daily fiber to aid hepatic estrogen metabolite elimination."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "1860 kcal (+3%)",
          "1482 kcal (-18%)",
          "Preserves REE & Stimulates Lipolysis"
        ],
        [
          "Protein Target",
          "116g (464 kcal)",
          "120g (480 kcal)",
          "Anti-Catabolic LBM Retention"
        ],
        [
          "Carbohydrates",
          "232g (928 kcal)",
          "111g (444 kcal)",
          "Cortisol Blunting & Glycogen Delivery"
        ],
        [
          "Dietary Fat",
          "52g (468 kcal)",
          "62g (558 kcal)",
          "Steroid Hormone Synthesis Support"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why is a 35g protein breakfast anchor recommended in perimenopause?",
        "answer": "Estrogen loss causes anabolic resistance, requiring at least 3.0g of leucine (found in ~35g intact animal or fortified plant protein) to trigger mTORC1 phosphorylation."
      },
      {
        "question": "Should perimenopausal women avoid carbohydrates completely?",
        "answer": "No. Chronically low carbohydrate diets elevate evening cortisol and downregulate active thyroid hormone (T3). Eating carbs around strength workouts supports thyroid function and deep sleep."
      }
    ]
  },
  {
    "slug": "perimenopause-135-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (135 lb Female Hormone Protocol)",
    "metaDescription": "Evidence-based perimenopause macros for a 135 lb woman. Combat anabolic resistance with a 36g protein breakfast anchor and luteal phase carb cycling.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (135 lb Female)",
    "subtitle": "Metabolic strategy for a 61.2 kg (135 lb) woman navigating hormonal shifts: 1,780 kcal baseline TDEE and 36g leucine-rich protein feedings.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 44,
      "weightKg": 61.23497000135107,
      "heightCm": 162.6,
      "bodyFatPct": 24,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1600,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 135 lb woman in perimenopause (24% body fat, 102.6 lb LBM) has a baseline TDEE of 1891 kcal. Eat 120g protein daily split across three 36g+ feedings with 3.0g leucine. Add 40g carbohydrates on training days while prioritizing 32g fiber to promote hepatic estrogen clearance.",
    "clinicalSummary": "Perimenopause often brings shifting estradiol-to-progesterone ratios that impair insulin sensitivity and increase abdominal visceral adipose storage. For a 135 lb woman, structuring 120g protein into 3 distinct leucine-dense feedings stimulates skeletal muscle while 32g fiber assists gastrointestinal estrogen elimination.",
    "keyTakeaways": [
      "Eat 120g protein daily divided into 3 feedings of at least 36g each.",
      "Consume 40g extra carbs post-workout on strength days to blunt exercise cortisol.",
      "Target 32g dietary fiber daily from chia seeds, oats, and cruciferous vegetables."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "1950 kcal (+3%)",
          "1553 kcal (-18%)",
          "Maintains Thyroid T3 & Promotes Fat Loss"
        ],
        [
          "Protein Target",
          "123g (492 kcal)",
          "127g (508 kcal)",
          "Sarcopenia Prevention & Lean Defense"
        ],
        [
          "Carbohydrates",
          "243g (972 kcal)",
          "115g (460 kcal)",
          "Cortisol Mitigation & Glycogen Delivery"
        ],
        [
          "Dietary Fat",
          "54g (486 kcal)",
          "65g (585 kcal)",
          "Adrenal & Progesterone Hormone Precursor"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why do I gain belly fat during perimenopause even when eating clean?",
        "answer": "Falling estradiol shifts fat storage toward abdominal visceral depots. Overcoming this requires adequate protein to stimulate muscle protein synthesis and resistance training to enhance GLUT4 glucose clearance."
      },
      {
        "question": "Is intermittent fasting safe during perimenopause?",
        "answer": "Moderate 14:10 or 16:8 fasting can improve insulin sensitivity, but avoid severe multi-day fasting which spikes cortisol and disrupts thyroid function."
      }
    ]
  },
  {
    "slug": "perimenopause-145-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (145 lb Female Hormone Protocol)",
    "metaDescription": "Evidence-based TDEE, protein leucine threshold, and carb-cycling macros for a 145 lb woman in perimenopause (ages 38–55) to combat insulin resistance.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (145 lb Female)",
    "subtitle": "Calibrated for shifting estrogen/progesterone ratios: elevated per-meal leucine density to overcome anabolic resistance and targeted carbohydrate timing.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 46,
      "weightKg": 65.77089370515486,
      "heightCm": 163.8,
      "bodyFatPct": 26,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 145 lb perimenopausal female (26% body fat, 107.3 lb LBM) maintains an estimated TDEE of 1954 kcal. Consume 125g protein daily with a 35g leucine-dense morning anchor. Structure carbohydrates to 190g on strength days and 120g on rest days with 35g fiber to optimize insulin sensitivity.",
    "clinicalSummary": "During perimenopause (typically ages 38–52), declining estradiol reduces skeletal muscle insulin sensitivity and increases the amino acid threshold required to stimulate muscle protein synthesis. A 145 lb woman benefits from 3 distinct protein boluses of 35g+ each, moderate rest-day carbohydrate reduction, and heavy resistance training.",
    "keyTakeaways": [
      "Avoid ultra-low-calorie crash diets (<1,200 kcal) which spike cortisol and accelerate thyroid T3 downregulation.",
      "Aim for 35g+ protein at breakfast within 60 minutes of waking to blunt morning cortisol spikes.",
      "Cycle carbohydrates onto strength training days when GLUT4 translocation is upregulated by muscular contraction."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "2012 kcal (+3%)",
          "1604 kcal (-18%)",
          "Guards REE & Enables Fat Oxidation"
        ],
        [
          "Protein Target",
          "129g (516 kcal)",
          "133g (532 kcal)",
          "Overcomes Anabolic Resistance"
        ],
        [
          "Carbohydrates",
          "248g (992 kcal)",
          "115g (460 kcal)",
          "GLUT4 Translocation & Thyroid T3 Fuel"
        ],
        [
          "Dietary Fat",
          "56g (504 kcal)",
          "68g (612 kcal)",
          "Supports Estrogen/Progesterone Balance"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why does standard TDEE feel too high during perimenopause?",
        "answer": "Standard age-based formulas miss the drop in Resting Energy Expenditure (REE) and Non-Exercise Activity Thermogenesis (NEAT) associated with luteal/perimenopausal hormonal transitions. Using Katch-McArdle with accurate body fat % resolves this gap."
      },
      {
        "question": "How does protein pacing help hot flashes and night sweats?",
        "answer": "Stabilizing blood glucose through steady, high-protein meals prevents insulin spikes and subsequent reactive hypoglycemia, which triggers epinephrine release and vasomotor hot flashes."
      }
    ]
  },
  {
    "slug": "perimenopause-155-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (155 lb Female Hormone Protocol)",
    "metaDescription": "Optimize body composition during perimenopause for a 155 lb female. Target visceral fat and blunt cortisol with targeted protein and carb timing.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (155 lb Female)",
    "subtitle": "Hormone-calibrated nutrition for a 70.3 kg (155 lb) woman: 1,890 kcal TDEE, 130g protein target, and 35g prebiotic fiber.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 48,
      "weightKg": 70.30681740895864,
      "heightCm": 165.1,
      "bodyFatPct": 29,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1700,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 155 lb woman in perimenopause (29% body fat, 110.1 lb LBM) has an estimated TDEE of 1991 kcal. Ingest 130g protein daily across three 37g meals to overcome anabolic resistance. Consume 35g fiber for estrogen elimination, allocating 185g carbs on workout days and 115g on rest days.",
    "clinicalSummary": "At 155 lbs and 29% body fat, 110.1 lbs of Lean Body Mass requires metabolic protection. Consuming 130g protein split into 3 distinct feedings stimulates muscle protein synthesis, while 35g fiber supports bowel regularity and estrogen clearance through the beta-glucuronidase pathway.",
    "keyTakeaways": [
      "Distribute 130g protein across 3 substantial meals providing at least 37g protein each.",
      "Incorporate 35g fiber daily from flaxseed, lentils, and berries to support hormone clearance.",
      "Prioritize resistance training with compound movements 3 days per week to protect bone mineral density."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "2053 kcal (+3%)",
          "1633 kcal (-18%)",
          "Prevents Metabolic Slowdown"
        ],
        [
          "Protein Target",
          "132g (528 kcal)",
          "136g (544 kcal)",
          "Counters Age-Related Sarcopenia"
        ],
        [
          "Carbohydrates",
          "253g (1012 kcal)",
          "117g (468 kcal)",
          "Optimizes GLUT4 Glycogen Storage"
        ],
        [
          "Dietary Fat",
          "57g (513 kcal)",
          "69g (621 kcal)",
          "Supports Cellular Membrane Integrity"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "How do I overcome fatigue and sluggishness in perimenopause?",
        "answer": "Ensure adequate sodium (2,500–3,500mg daily) and avoid undereating protein. Dehydration and low protein intake severely worsen perimenopausal fatigue."
      },
      {
        "question": "Should I take creatine during perimenopause at 155 lbs?",
        "answer": "Yes. Research indicates 3g to 5g of creatine monohydrate daily improves cellular bioenergetics, cognitive focus, and lean muscle retention in perimenopausal women."
      }
    ]
  },
  {
    "slug": "perimenopause-165-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (165 lb Female Hormone Protocol)",
    "metaDescription": "Clinical hormone and macro blueprint for a 165 lb perimenopausal woman. Defend lean muscle, control cortisol spikes, and maintain thyroid health.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (165 lb Female)",
    "subtitle": "Precision hormone-aware macros for a 74.8 kg (165 lb) woman: 1,940 kcal TDEE, 38g leucine-rich breakfast, and carb cycling.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 49,
      "weightKg": 74.84274111276243,
      "heightCm": 166.4,
      "bodyFatPct": 31,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1750,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 165 lb perimenopausal female (31% body fat, 113.9 lb LBM) requires an estimated TDEE of 2042 kcal. Anchor your day with a 38g protein breakfast meeting the 3.2g leucine threshold. Eat 135g protein total, pairing 195g carbs on lifting days and 120g carbs on rest days.",
    "clinicalSummary": "With 113.9 lbs of Lean Body Mass, a 165 lb perimenopausal woman possesses strong metabolic foundations. Consuming 135g protein prevents sarcopenic muscle loss, while cycling carbs to workout days supports glycogen storage without elevating basal insulin levels on recovery days.",
    "keyTakeaways": [
      "Start every day with 38g protein to suppress morning cortisol release.",
      "Eat 195g carbs on workout days and taper to 120g on rest days.",
      "Drink 3.0 liters of water daily to reduce fluid retention and support metabolic filtration."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "2102 kcal (+3%)",
          "1675 kcal (-18%)",
          "Stimulates Fat Loss While Preserving BMR"
        ],
        [
          "Protein Target",
          "137g (548 kcal)",
          "141g (564 kcal)",
          "Protects Contractile Myofibrillar Mass"
        ],
        [
          "Carbohydrates",
          "258g (1032 kcal)",
          "118g (472 kcal)",
          "Supports Resistance Output & Sleep Quality"
        ],
        [
          "Dietary Fat",
          "58g (522 kcal)",
          "71g (639 kcal)",
          "Endocrine Precursor for Adrenal Steroids"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why does my sleep worsen in perimenopause?",
        "answer": "Progesterone declines sharply during perimenopause, reducing GABAergic calming signals in the brain. Consuming 30g–40g of complex carbohydrates at dinner helps boost serotonin and melatonin production."
      },
      {
        "question": "Can I do heavy weight training at age 49?",
        "answer": "Yes, progressive heavy resistance training is the single most effective intervention to maintain bone mineral density, preserve lean mass, and improve insulin sensitivity during perimenopause."
      }
    ]
  },
  {
    "slug": "perimenopause-175-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (175 lb Female Hormone Protocol)",
    "metaDescription": "Perimenopause TDEE and macro calculator for a 175 lb female. Combat midsection weight gain with high-protein pacing and strategic carb distribution.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (175 lb Female)",
    "subtitle": "Clinical metabolic plan for a 79.4 kg (175 lb) female: 1,990 kcal baseline TDEE, 140g protein floor, and 36g gut health fiber.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 51,
      "weightKg": 79.3786648165662,
      "heightCm": 167.6,
      "bodyFatPct": 33,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1800,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 175 lb female in perimenopause (33% body fat, 117.3 lb LBM) exhibits a TDEE of 2089 kcal. Consume 140g protein daily with a 38g leucine-rich breakfast anchor. Allocate 200g carbohydrates to training days and 125g to rest days, incorporating 36g prebiotic fiber to support gastrointestinal hormone excretion.",
    "clinicalSummary": "At 175 lbs with 117.3 lbs LBM, nutritional strategy must address elevated baseline insulin and cortisol levels. Providing 140g protein divided into 4 portions stimulates muscle protein synthesis, while 36g fiber and training-day carb cycling drive abdominal fat reduction.",
    "keyTakeaways": [
      "Hit 140g protein daily (1.19g per lb LBM) across 4 evenly paced meals.",
      "Consume 200g carbs on training days and 125g on rest days.",
      "Take 36g fiber daily to support hepatic estrogen detoxification."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "2152 kcal (+3%)",
          "1712 kcal (-18%)",
          "Calorie Cycling Fat Loss Deficit"
        ],
        [
          "Protein Target",
          "141g (564 kcal)",
          "145g (580 kcal)",
          "Maximizes Muscle Nitrogen Retention"
        ],
        [
          "Carbohydrates",
          "262g (1048 kcal)",
          "121g (484 kcal)",
          "Prevents Thyroid T3 Downregulation"
        ],
        [
          "Dietary Fat",
          "60g (540 kcal)",
          "72g (648 kcal)",
          "Essential Fatty Acids for Hormone Precursors"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "How do I know if I am in perimenopause at age 51?",
        "answer": "Common clinical indicators include irregular menstrual cycle timing, sleep disruptions, vasomotor hot flashes, mood fluctuations, and sudden changes in abdominal body fat distribution."
      },
      {
        "question": "Will eating 2,050 calories on workout days stall fat loss?",
        "answer": "No. The net weekly deficit remains over 2,500 kcal, producing roughly 0.7 lb of pure fat loss weekly while keeping training intensity high."
      }
    ]
  },
  {
    "slug": "perimenopause-185-lb-female-tdee",
    "title": "Perimenopause Macro & TDEE Calculator (185 lb Female Hormone Protocol)",
    "metaDescription": "Hormone-balanced nutrition and macro cycling for a 185 lb perimenopausal woman. Target visceral adiposity while protecting muscle protein synthesis.",
    "badge": "Perimenopause Protocol • Hormone Balance",
    "h1": "Perimenopause Macro & Metabolic Protocol (185 lb Female)",
    "subtitle": "Comprehensive metabolic protocol for an 83.9 kg (185 lb) woman: 2,040 kcal TDEE, 145g protein target, and 38g soluble fiber.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 53,
      "weightKg": 83.91458852036999,
      "heightCm": 168.9,
      "bodyFatPct": 35,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1850,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 185 lb perimenopausal woman (35% body fat, 120.3 lb LBM) maintains an estimated TDEE of 2129 kcal. Ingest 145g protein daily split across four 36g feedings to surmount age-related anabolic resistance. Ingest 205g carbs on training days and 130g on rest days with 38g soluble fiber.",
    "clinicalSummary": "With 120.3 lbs of Lean Body Mass, this 185 lb woman has considerable calorie-burning tissue. A structured 145g protein intake divided across 4 meals maximizes leucine-triggered protein synthesis, while 38g fiber accelerates the excretion of conjugated estrogen metabolites.",
    "keyTakeaways": [
      "Consume 145g protein daily across 4 meals (36g per feeding).",
      "Cycle carbohydrates: 205g on workout days and 130g on recovery days.",
      "Target 38g daily soluble fiber to optimize cholesterol and glycemic stability."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "2193 kcal (+3%)",
          "1746 kcal (-18%)",
          "Accelerates Visceral Fat Oxidation"
        ],
        [
          "Protein Target",
          "144g (576 kcal)",
          "148g (592 kcal)",
          "Surpasses Leucine Anabolic Threshold"
        ],
        [
          "Carbohydrates",
          "267g (1068 kcal)",
          "122g (488 kcal)",
          "Suppresses Evening Cortisol Spikes"
        ],
        [
          "Dietary Fat",
          "61g (549 kcal)",
          "74g (666 kcal)",
          "Maintains Cellular Fluidity & Satiety"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why is fiber so heavily emphasized in perimenopause?",
        "answer": "Estrogen is metabolized by the liver and excreted via bile into the gut. Without adequate fiber, intestinal enzymes uncouple estrogen, causing reabsorption and estrogen dominance symptoms."
      },
      {
        "question": "Can I do HIIT cardio at 185 lbs in perimenopause?",
        "answer": "Limit HIIT to 1 session weekly. Frequent high-intensity cardio spikes cortisol and depletes glycogen, whereas heavy lifting combined with daily walking yields superior body recomposition."
      }
    ]
  },
  {
    "slug": "postmenopause-140-lb-female-tdee",
    "title": "Postmenopause Macro & TDEE Calculator (140 lb Female Metabolic Protocol)",
    "metaDescription": "Postmenopausal metabolic and macro blueprint for a 140 lb female. Preserve bone mineral density and lean mass with protein and micronutrient synergy.",
    "badge": "Postmenopause Blueprint • Bone & Muscle",
    "h1": "Postmenopause Macro & Metabolic Protocol (140 lb Female)",
    "subtitle": "Clinically calibrated nutrition for a 63.5 kg (140 lb) postmenopausal female: 1,680 kcal TDEE, 120g protein floor, and bone-sparing micronutrients.",
    "category": "perimenopause",
    "defaultTab": "perimenopause",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 56,
      "weightKg": 63.50293185325297,
      "heightCm": 162.6,
      "bodyFatPct": 28,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 2,
      "restDayDeficitPct": -18,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 1500,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "postmenopause",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 140 lb postmenopausal woman (28% body fat, 100.8 lb LBM) has an estimated TDEE of 1867 kcal. Consume 120g protein daily (1.19g/lb LBM) with a 35g leucine breakfast anchor. Pair 150g low-glycemic carbohydrates and 32g fiber with vitamin D3 and calcium to safeguard bone mineral density.",
    "clinicalSummary": "In postmenopause, baseline estrogen ceases cyclic production, accelerating bone demineralization and age-related muscle loss. Maintaining 120g high-quality protein daily, combined with 1,200mg calcium, 2,000 IU vitamin D3, and strength training, counteracts osteopenia and preserves metabolic rate.",
    "keyTakeaways": [
      "Anchor daily protein at 120g (1.19g per lb LBM) with 35g at breakfast.",
      "Incorporate calcium-rich foods and 2,000+ IU vitamin D3 daily to support bone density.",
      "Engage in 3 weekly axial-loading resistance workouts (squats, lunges, carries)."
    ],
    "tableData": {
      "headers": [
        "Parameter",
        "Training Day",
        "Rest Day",
        "Physiological Rationale"
      ],
      "rows": [
        [
          "Target Calories",
          "1905 kcal (+3%)",
          "1533 kcal (-18%)",
          "Maintains Muscle Mass & Prevents Fat Regain"
        ],
        [
          "Protein Target",
          "121g (484 kcal)",
          "125g (500 kcal)",
          "Defends Lean Mass Against Postmenopausal Sarcopenia"
        ],
        [
          "Carbohydrates",
          "236g (944 kcal)",
          "112g (448 kcal)",
          "Low-Glycemic Energy for Workout Performance"
        ],
        [
          "Dietary Fat",
          "53g (477 kcal)",
          "65g (585 kcal)",
          "Supports Fat-Soluble Vitamin Absorption"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "26402439",
        "citation": "Doering TM, et al. Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes: A Review. Int J Sport Nutr Exerc Metab. 2016.",
        "title": "Postexercise Dietary Protein Strategies to Maximize Skeletal Muscle Repair and Remodeling in Masters Endurance Athletes",
        "journal": "Int J Sport Nutr Exerc Metab",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26402439/"
      },
      {
        "pmid": "16280440",
        "citation": "Katsanos CS, et al. Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids. Am J Clin Nutr. 2005.",
        "title": "Aging is associated with diminished accretion of muscle proteins after the ingestion of a small bolus of essential amino acids",
        "journal": "Am J Clin Nutr",
        "year": 2005,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16280440/"
      }
    ],
    "faq": [
      {
        "question": "Why is osteopenia risk elevated postmenopause?",
        "answer": "Estrogen directly inhibits osteoclast-mediated bone breakdown. When estrogen falls, bone resorption outpaces formation unless stimulated by mechanical loading and adequate amino acids."
      },
      {
        "question": "How much calcium and vitamin D do I need at 140 lbs postmenopause?",
        "answer": "Aim for 1,200mg total calcium daily (preferably from diet) and 2,000–4,000 IU vitamin D3 with K2 to promote optimal bone mineral incorporation."
      }
    ]
  },
  {
    "slug": "135-lb-female-intermittent-fasting-16-8",
    "title": "16:8 Intermittent Fasting Timeline & Macros for a 135 lb Female",
    "metaDescription": "16:8 intermittent fasting feeding window, macro breakdown, and 12-week weight trajectory for a 135 lb female targeting steady fat loss.",
    "badge": "16:8 Fasting Protocol • Circadian Rhythm",
    "h1": "16:8 Intermittent Fasting Timeline & Macros (135 lb Female)",
    "subtitle": "Visual feeding window protocol for a 61.2 kg (135 lb) female: 1,650 kcal, 3 protein boluses, and structured 12-week fat loss curve.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 29,
      "weightKg": 61.23497000135107,
      "heightCm": 162.6,
      "bodyFatPct": 23,
      "formula": "mifflin",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 135 lb female (23% body fat, 104.0 lb LBM) on a 16:8 fasting schedule (12:00 PM to 8:00 PM) should consume 1682 kcal divided into three 38g protein boluses. Maintain 2,800mg sodium during fasting hours to avert lethargy while following a predictable 0.6 lb/week adipose reduction trajectory.",
    "clinicalSummary": "Intermittent fasting 16:8 aligns feeding with circadian insulin sensitivity. For a 135 lb woman with 104.0 lbs LBM, breaking the fast at noon with 38g protein stimulates MPS, while an 8:00 PM dinner concludes caloric intake, initiating 16 hours of liver glycogen depletion and accelerated lipolysis.",
    "keyTakeaways": [
      "Fast for 16 hours (8:00 PM to 12:00 PM next day); consume only water, black coffee, or plain tea.",
      "Distribute 115g daily protein into 3 feedings of ~38g each during the 8-hour eating window.",
      "Supplement 2,800mg sodium to prevent fasting-induced natriuresis and brain fog."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Fasting Phase",
          "8:00 PM - 12:00 PM",
          "AMPK & Autophagy Elevated",
          "Water, Unsweetened Tea, Electrolytes"
        ],
        [
          "Window Open / Meal 1",
          "12:00 PM (Noon)",
          "mTORC1 Anabolic Trigger",
          "38g Protein + 60g Low-Glycemic Carbs"
        ],
        [
          "Midday Feeding / Meal 2",
          "4:00 PM",
          "Steady Glycogen Delivery",
          "38g Protein + Healthy Fats & Fiber"
        ],
        [
          "Window Close / Meal 3",
          "7:30 PM - 8:00 PM",
          "Pre-Fast Amino Acid Saturation",
          "38g Slow-Digesting Protein + Fiber"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Will 16:8 fasting slow down my metabolism at 135 lbs?",
        "answer": "No. Human trials (Moro et al., 2016) demonstrate that 16:8 time-restricted feeding maintains resting energy expenditure while increasing fat oxidation rates."
      },
      {
        "question": "Can I exercise while fasted in the morning?",
        "answer": "Yes. Fasted resistance or aerobic exercise upregulates fatty acid translocase and GLUT4 activity. Consume your first meal containing 35g+ protein promptly within your feeding window."
      }
    ]
  },
  {
    "slug": "150-lb-female-intermittent-fasting-16-8",
    "title": "16:8 Intermittent Fasting Timeline & Macros for a 150 lb Female",
    "metaDescription": "Evidence-based 16:8 intermittent fasting protocol for a 150 lb female. Feeding window clock, 125g protein target, and electrolyte replenishment.",
    "badge": "16:8 Fasting Protocol • Circadian Rhythm",
    "h1": "16:8 Intermittent Fasting Timeline & Macros (150 lb Female)",
    "subtitle": "Circadian time-restricted feeding blueprint for a 68.0 kg (150 lb) female: 1,750 kcal, 125g protein, and 12-week weight loss timeline.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 34,
      "weightKg": 68.03885555705675,
      "heightCm": 165.1,
      "bodyFatPct": 26,
      "formula": "mifflin",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1750,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 150 lb female (26% body fat, 111.0 lb LBM) practicing 16:8 fasting, consume 1756 kcal daily across an 8-hour feeding window. Distribute 125g protein across two large meals and one snack, supplementing 3,000mg sodium and 2.8 liters of fluids to preserve training power and metabolic rate.",
    "clinicalSummary": "Time-restricted feeding for a 150 lb woman provides structured caloric control without the sensation of chronic restriction. Dividing 125g protein into an 8-hour window stimulates protein synthesis effectively while the 16-hour fasting phase lowers circulating insulin and accelerates visceral fat loss.",
    "keyTakeaways": [
      "Adhere to a 12:00 PM to 8:00 PM eating window to sync with core circadian rhythm.",
      "Consume 125g protein daily (1.13g per lb LBM) to protect skeletal muscle mass.",
      "Drink 2.8 liters of water with 3,000mg sodium across the day to avoid fasting fatigue."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Overnight & Morning Fast",
          "8:00 PM - 12:00 PM",
          "Lipolysis & Ketogenesis",
          "Zero-calorie hydration, plain coffee, mineral salt"
        ],
        [
          "Break-Fast / Meal 1",
          "12:00 PM",
          "Insulin-Mediated Anabolism",
          "45g Protein + complex carbs & vegetables"
        ],
        [
          "Afternoon Snack",
          "3:30 PM",
          "Satiety & Amino Delivery",
          "35g Protein (Greek yogurt or whey shake)"
        ],
        [
          "Dinner / Window Close",
          "7:30 PM",
          "Overnight Tissue Defense",
          "45g Protein + high fiber & healthy fats"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Does black coffee break my intermittent fast?",
        "answer": "Plain black coffee (without sugar, milk, or cream) contains negligible calories (<5 kcal) and does not impair autophagy or trigger an insulin response."
      },
      {
        "question": "What is the projected 12-week weight loss for a 150 lb female on 16:8?",
        "answer": "At a 1,750 kcal target, expected body weight reduction is approximately 8 to 10 lbs of pure adipose tissue over 12 weeks while maintaining muscle mass."
      }
    ]
  },
  {
    "slug": "165-lb-female-intermittent-fasting-omad",
    "title": "OMAD & 20:4 Intermittent Fasting Timeline for a 165 lb Female",
    "metaDescription": "One Meal A Day (OMAD) macro pacing and fasting timeline for a 165 lb female. Retain lean tissue with 115g protein in a compressed feeding window.",
    "badge": "OMAD 20:4 Protocol • Deep Autophagy",
    "h1": "OMAD & 20:4 Intermittent Fasting Protocol (165 lb Female)",
    "subtitle": "Compressed 4-hour feeding window protocol for a 74.8 kg (165 lb) woman: 1,520 kcal, 115g protein pacing, and electrolyte defense.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 37,
      "weightKg": 74.84274111276243,
      "heightCm": 167.6,
      "bodyFatPct": 29,
      "formula": "mifflin",
      "activityLevel": "light",
      "trainingDaysPerWeek": 3,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1520,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 2,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "omad",
      "fastingEatingWindowStartHour": 16,
      "fastingWindowStartHour": 16,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 165 lb female (29% body fat, 117.2 lb LBM) practicing OMAD (One Meal A Day, 20:4) should target 1356 kcal with 115g protein within a 4-hour evening window. Supplement 3,200mg sodium during daytime fasting to prevent orthostatic dizziness while achieving an expected 0.9 lb/week fat loss rate.",
    "clinicalSummary": "OMAD (20-hour fast, 4-hour feeding window) provides intense autophagic signaling and insulin reduction. For a 165 lb woman, consuming 115g protein within a 4-hour evening window requires splitting intake into a lighter starter feeding and a dense main course to prevent GI distress and ensure absorption.",
    "keyTakeaways": [
      "Maintain a 20-hour fast (8:00 PM to 4:00 PM next day) with abundant mineral hydration.",
      "Split your 1,520 kcal intake into two feedings within the 4-hour eating window.",
      "Supplement 3,200mg sodium and 400mg magnesium daily to prevent muscle cramps and headaches."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Deep Fasting",
          "8:00 PM - 4:00 PM",
          "Peak Autophagy & Ketone Synthesis",
          "Water, Sea Salt, Black Coffee, Hibiscus Tea"
        ],
        [
          "Pre-Dinner Break",
          "4:00 PM",
          "Enzymatic Activation",
          "35g Protein shake + small portion of raw almonds"
        ],
        [
          "Main OMAD Feast",
          "6:30 PM - 7:30 PM",
          "Full Nutrient Replenishment",
          "80g Protein + roasted vegetables, sweet potato, olive oil"
        ],
        [
          "Fasting Window Begins",
          "8:00 PM",
          "Basal Insulin Stabilization",
          "Chamomile tea + 400mg Magnesium glycinate"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Can the human body absorb 80g of protein in one meal?",
        "answer": "Yes. Digestion simply slows down to release amino acids over 6 to 8 hours. Schoenfeld & Aragon (2018) confirmed that whole-body protein retention is fully efficient with larger boluses."
      },
      {
        "question": "Is OMAD sustainable long-term for women?",
        "answer": "We recommend cycling OMAD 3–4 days per week with 16:8 fasting on remaining days to avoid chronic sympathetic nervous system activation and menstrual irregularity."
      }
    ]
  },
  {
    "slug": "170-lb-male-intermittent-fasting-16-8",
    "title": "16:8 Intermittent Fasting Timeline & Macros for a 170 lb Male",
    "metaDescription": "16:8 intermittent fasting blueprint for a 170 lb male lifter. Preserve 100% lean mass with 160g protein, 2,250 kcal, and timed carbohydrate intake.",
    "badge": "16:8 Fasting Protocol • Lean Retention",
    "h1": "16:8 Intermittent Fasting Protocol & Macros (170 lb Male)",
    "subtitle": "Time-restricted feeding and calorie protocol for a 77.1 kg (170 lb) male: 2,250 kcal, 160g protein, and 1:00 PM to 9:00 PM feeding window.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 28,
      "weightKg": 77.11070296466431,
      "heightCm": 175.3,
      "bodyFatPct": 17,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2250,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 13,
      "fastingWindowStartHour": 13,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 170 lb male (17% body fat, 141.1 lb LBM) following 16:8 fasting (1:00 PM to 9:00 PM) should consume 2227 kcal daily. Distribute 160g protein across two substantial meals and a post-workout shake to stimulate muscle protein synthesis while mobilizing adipose stores during the 16-hour fast.",
    "clinicalSummary": "A 170 lb male with 141.1 lbs of Lean Body Mass benefits significantly from 16:8 fasting. Research by Moro et al. (2016) shows that resistance-trained men following a 16:8 protocol maintain 100% of their strength and lean mass while experiencing enhanced systemic fat oxidation and reduced systemic inflammation.",
    "keyTakeaways": [
      "Maintain an eating window between 1:00 PM and 9:00 PM.",
      "Hit 160g protein daily (1.13g per lb LBM) divided into 3 feedings.",
      "Train in the afternoon around 4:00 PM to bracket your workout between two protein-rich meals."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Morning Fast",
          "9:00 PM - 1:00 PM",
          "Adipose Lipolysis & High Mental Focus",
          "Cold water, black espresso, 1,000mg sodium"
        ],
        [
          "First Meal",
          "1:00 PM",
          "Glycogen Priming",
          "50g Protein + 80g complex carbohydrates"
        ],
        [
          "Training & Post-Workout",
          "4:30 PM - 6:00 PM",
          "mTORC1 Anabolic Peak",
          "40g Whey Isolate + banana or rice cakes"
        ],
        [
          "Dinner Feast",
          "8:30 PM - 9:00 PM",
          "Satiation & Overnight Defense",
          "70g Protein + roasted potatoes, greens, olive oil"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Will 16:8 fasting hurt my testosterone levels as a 170 lb man?",
        "answer": "No. Human studies confirm that 16:8 fasting preserves free and total testosterone levels in resistance-trained men when total calories and dietary fats are maintained."
      },
      {
        "question": "How much water should I drink during the fasting window?",
        "answer": "Consume at least 1.5 to 2.0 liters of water during the 16-hour fast, adding a pinch of mineral salt to sustain blood volume and electrolytes."
      }
    ]
  },
  {
    "slug": "185-lb-male-intermittent-fasting-16-8",
    "title": "16:8 Intermittent Fasting Timeline & Macros for a 185 lb Male",
    "metaDescription": "Clinical 16:8 intermittent fasting protocol for a 185 lb male. Moro et al. protocol: 175g protein, 2,380 kcal, and 12-week recomposition curve.",
    "badge": "16:8 Fasting Protocol • Lean Retention",
    "h1": "16:8 Intermittent Fasting Protocol & Macros (185 lb Male)",
    "subtitle": "Moro clinical protocol for an 83.9 kg (185 lb) male athlete: 2,380 kcal, 175g protein floor, and 12-week metabolic trajectory.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 33,
      "weightKg": 83.91458852036999,
      "heightCm": 177.8,
      "bodyFatPct": 18,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2380,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 185 lb male (18% body fat, 151.7 lb LBM) executing 16:8 fasting requires 2359 kcal daily. Distribute 175g protein (2.55g/kg LBM) into three feedings between 12:00 PM and 8:00 PM, maintaining 3,400mg sodium to sustain gym strength while dropping 0.8 lb of fat per week.",
    "clinicalSummary": "Carrying 151.7 lbs of Lean Body Mass, a 185 lb male thrives on the 16:8 time-restricted feeding paradigm. Consuming 175g protein within an 8-hour window provides 3 distinct pulses of essential amino acids, while 16 hours of daily fasting accelerates hepatic fatty acid oxidation.",
    "keyTakeaways": [
      "Confine daily energy intake to the 12:00 PM to 8:00 PM window.",
      "Lock protein at 175g daily across 3 feedings of at least 50g each.",
      "Consume 3,400mg sodium daily with mineral water to preserve workout pump and power."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Fasting Window",
          "8:00 PM - 12:00 PM",
          "Adipose Mobilization & Ketosis",
          "Water, Green Tea, Black Coffee, Sea Salt"
        ],
        [
          "Break-Fast Meal",
          "12:00 PM (Noon)",
          "Glycogen Synthesis & mTORC1",
          "55g Protein + 90g complex carbs"
        ],
        [
          "Pre-Workout Snack",
          "4:30 PM",
          "Circulating Amino Acids",
          "45g Protein + 40g rapid-acting carbs"
        ],
        [
          "Post-Workout Dinner",
          "7:30 PM - 8:00 PM",
          "Muscle Repair & Overnight Satiety",
          "75g Protein + 100g carbs & essential fats"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Can I gain muscle on 16:8 fasting at 185 lbs?",
        "answer": "Yes. As long as total daily calories equal or slightly exceed maintenance and protein reaches 1.6g–2.2g/kg, muscle hypertrophy is identical to traditional eating schedules."
      },
      {
        "question": "Will branched-chain amino acids (BCAAs) break my fast?",
        "answer": "Yes. BCAAs trigger insulin release and activate mTOR, stopping the autophagic benefits of fasting. Save amino acids for your feeding window."
      }
    ]
  },
  {
    "slug": "200-lb-male-intermittent-fasting-18-6",
    "title": "18:6 Intermittent Fasting Timeline & Macros for a 200 lb Male",
    "metaDescription": "18:6 fasting protocol for a 200 lb male athlete. Optimize autophagy and fat oxidation with 2,450 kcal, 185g protein, and 6-hour feeding window.",
    "badge": "18:6 Fasting Protocol • Autophagy Boost",
    "h1": "18:6 Intermittent Fasting Protocol & Macros (200 lb Male)",
    "subtitle": "Compressed 6-hour feeding window strategy for a 90.7 kg (200 lb) male: 2,450 kcal, 185g protein, and 2:00 PM to 8:00 PM schedule.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 36,
      "weightKg": 90.71847407607567,
      "heightCm": 180.3,
      "bodyFatPct": 20,
      "formula": "cunningham",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2450,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "18:6",
      "fastingEatingWindowStartHour": 14,
      "fastingWindowStartHour": 14,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "For a 200 lb male (20% body fat, 160.0 lb LBM) practicing 18:6 fasting (2:00 PM to 8:00 PM), consume 2503 kcal daily. Pace 185g protein into two 75g meals plus one 35g shake, sustaining 3,600mg sodium during fasting to burn 1.0 lb of fat weekly.",
    "clinicalSummary": "An 18:6 protocol extends the fasted state to 18 hours, providing deeper hepatic glycogen depletion and higher levels of chaperone-mediated autophagy. For a 200 lb male with 160.0 lbs LBM, pacing 185g protein across 6 hours provides robust muscle protection alongside rapid visceral fat loss.",
    "keyTakeaways": [
      "Maintain an 18-hour fast (8:00 PM to 2:00 PM next day) with generous fluid intake.",
      "Hit 185g protein daily (1.16g per lb LBM) within the 6-hour eating window.",
      "Take 3,600mg sodium daily to counteract natriuresis and sustain heavy lifting strength."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Extended Fast",
          "8:00 PM - 2:00 PM",
          "Elevated Autophagy & Lipolysis",
          "Mineral water, black coffee, pink salt"
        ],
        [
          "Break-Fast Meal",
          "2:00 PM",
          "Muscle Glycogen Restoration",
          "75g Protein + 100g low-GI carbs & avocado"
        ],
        [
          "Pre/Post-Workout",
          "5:00 PM",
          "Amino Acid Delivery",
          "35g Whey isolate or essential amino acids"
        ],
        [
          "Closing Meal",
          "7:30 PM - 8:00 PM",
          "Overnight Nitrogen Retention",
          "75g Protein + complex carbs & vegetables"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Will an 18-hour fast cause muscle breakdown at 200 lbs?",
        "answer": "No. Growth hormone secretion peaks during an 18-hour fast, protecting muscle tissue from catabolism while accelerating fatty acid mobilization."
      },
      {
        "question": "Can I take electrolytes during the 18-hour fasting window?",
        "answer": "Yes, non-caloric electrolytes (sodium chloride, potassium citrate, magnesium malate) are highly encouraged to maintain blood pressure and muscular contraction."
      }
    ]
  },
  {
    "slug": "215-lb-male-intermittent-fasting-16-8",
    "title": "16:8 Intermittent Fasting Timeline & Macros for a 215 lb Male",
    "metaDescription": "16:8 time-restricted feeding for a 215 lb male. Improve insulin sensitivity and lose fat with 2,580 kcal, 195g protein, and strategic meal timing.",
    "badge": "16:8 Fasting Protocol • Insulin Reset",
    "h1": "16:8 Intermittent Fasting Protocol & Macros (215 lb Male)",
    "subtitle": "High-capacity time-restricted feeding plan for a 97.5 kg (215 lb) male lifter: 2,580 kcal, 195g protein, and 12-week recomposition curve.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 40,
      "weightKg": 97.52235963178134,
      "heightCm": 182.9,
      "bodyFatPct": 22,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -20,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2580,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 215 lb male (22% body fat, 167.7 lb LBM) on a 16:8 intermittent fasting protocol requires 2450 kcal daily. Consume 195g protein split into three servings across an 8-hour window, pairing 270g carbohydrates peri-workout to restore glycogen while maximizing 16-hour fasting lipolysis.",
    "clinicalSummary": "At 215 lbs and 22% body fat, fasting enhances peripheral insulin sensitivity and reduces hepatic steatosis. Consuming 195g protein across an 8-hour window ensures steady nitrogen retention, while 16 hours of daily fasting lowers fasting blood glucose and resting insulin.",
    "keyTakeaways": [
      "Maintain an eating window between 12:00 PM and 8:00 PM.",
      "Hit 195g protein daily across 3 meals (65g protein per feeding).",
      "Consume 270g complex carbohydrates primarily around your resistance training sessions."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "Fasting Phase",
          "8:00 PM - 12:00 PM",
          "Lipolysis & Autophagy",
          "Water, Unsweetened Coffee, Electrolytes"
        ],
        [
          "Break-Fast Meal",
          "12:00 PM (Noon)",
          "mTORC1 Anabolism",
          "65g Protein + 100g low-GI carbs"
        ],
        [
          "Peri-Workout Shake",
          "4:30 PM",
          "Rapid Protein Delivery",
          "40g Whey Isolate + 50g simple carbs"
        ],
        [
          "Dinner / Final Meal",
          "7:30 PM - 8:00 PM",
          "Slow-Release Protein Repair",
          "90g Protein + 120g carbs & healthy fats"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "How much fat can a 215 lb man lose in 12 weeks of 16:8?",
        "answer": "Following this 2,580 kcal protocol with 4 weekly training sessions yields an expected loss of 12 to 15 lbs of body fat while maintaining or slightly increasing lean mass."
      },
      {
        "question": "Can I drink sparkling mineral water while fasting?",
        "answer": "Yes. Carbonated mineral water provides carbonation satiety, sodium, and magnesium with zero calories, making the fasting window easier to sustain."
      }
    ]
  },
  {
    "slug": "230-lb-male-intermittent-fasting-omad",
    "title": "OMAD & 20:4 Intermittent Fasting Timeline for a 230 lb Male",
    "metaDescription": "OMAD fasting protocol for a 230 lb male. Accelerate visceral fat reduction with 2,200 kcal, 180g protein, and disciplined 4-hour eating window.",
    "badge": "OMAD 20:4 Protocol • Maximum Deficit",
    "h1": "OMAD & 20:4 Intermittent Fasting Protocol (230 lb Male)",
    "subtitle": "Heavyweight 20:4 time-restricted feeding blueprint for a 104.3 kg (230 lb) male lifter: 2,200 kcal, 180g protein, and 4.0L hydration.",
    "category": "fasting",
    "defaultTab": "fasting",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 43,
      "weightKg": 104.32624518748702,
      "heightCm": 185.4,
      "bodyFatPct": 25,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2200,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 2,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "omad",
      "fastingEatingWindowStartHour": 16,
      "fastingWindowStartHour": 16,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 230 lb male (25% body fat, 172.5 lb LBM) on OMAD (20:4 protocol, 4:00 PM to 8:00 PM) should target 2077 kcal with 180g protein. Drink 4.0 liters of water with 4,000mg sodium during the 20-hour fast to eliminate hunger pangs and drop 1.4 lbs of fat weekly.",
    "clinicalSummary": "For a 230 lb male with 172.5 lbs LBM, OMAD provides substantial appetite suppression and aggressive fat mobilization. Pacing 180g protein and 2,200 kcal into a 4-hour evening window stimulates overnight cellular repair while producing a daily 800+ kcal deficit.",
    "keyTakeaways": [
      "Maintain a 20-hour fast (8:00 PM to 4:00 PM) with 4.0 liters of fluid.",
      "Split your 2,200 kcal intake into two feedings within the 4-hour window.",
      "Consume 4,000mg sodium and 500mg magnesium to avoid muscular cramping and lethargy."
    ],
    "tableData": {
      "headers": [
        "Timeline Stage",
        "Time Window",
        "Metabolic State",
        "Nutritional Action"
      ],
      "rows": [
        [
          "20-Hour Fast",
          "8:00 PM - 4:00 PM",
          "Deep Autophagy & Maximum Lipolysis",
          "Water, Sea Salt, Black Coffee, Green Tea"
        ],
        [
          "Starter Feeding",
          "4:00 PM",
          "Enzymatic Activation",
          "50g Protein shake + berries & handful of walnuts"
        ],
        [
          "Main Course Feast",
          "6:30 PM - 7:30 PM",
          "Hypertrophic Nutrient Delivery",
          "130g Protein + potatoes, rice, olive oil, greens"
        ],
        [
          "Fasting Transition",
          "8:00 PM",
          "Insulin Stabilization",
          "400mg Magnesium glycinate + herbal tea"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "27737674",
        "citation": "Moro T, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016.",
        "title": "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
        "journal": "J Transl Med",
        "year": 2016,
        "url": "https://pubmed.ncbi.nlm.nih.gov/27737674/"
      },
      {
        "pmid": "26374764",
        "citation": "Tinsley GM, La Bounty PM. Effects of intermittent fasting on body composition and clinical health markers in humans. Nutr Rev. 2015.",
        "title": "Effects of intermittent fasting on body composition and clinical health markers in humans",
        "journal": "Nutr Rev",
        "year": 2015,
        "url": "https://pubmed.ncbi.nlm.nih.gov/26374764/"
      }
    ],
    "faq": [
      {
        "question": "Will OMAD make a 230 lb man lose strength on bench press and squat?",
        "answer": "No, provided you consume at least 180g protein and 200g+ carbohydrates in your evening window to fully restore intramuscular glycogen before your next training session."
      },
      {
        "question": "What is the expected 12-week fat loss on this OMAD protocol?",
        "answer": "A 230 lb male adhering to 2,200 kcal on OMAD can expect to lose 15 to 18 lbs of body fat over 12 weeks while maintaining muscle mass."
      }
    ]
  },
  {
    "slug": "140-lb-female-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 140 lb Female",
    "metaDescription": "Targeted fat loss macros for a 140 lb female lifter. Maintain lean muscle mass and workout performance with high-protein cutting and weekly refeeds.",
    "badge": "Athletic Fat Loss • Katch-McArdle",
    "h1": "Cutting & Macro Cycling Protocol (140 lb Female)",
    "subtitle": "Structured fat loss strategy for a 63.5 kg (140 lb) female athlete: 1,750 kcal training days, 1,320 kcal rest days, and 125g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 28,
      "weightKg": 63.50293185325297,
      "heightCm": 165.1,
      "bodyFatPct": 21,
      "formula": "katch",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1550,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 140 lb female (21% body fat, 110.6 lb LBM) on a fat loss cut should consume 1747 kcal on training days and 1308 kcal on rest days (-25% deficit). Lock protein at 127g daily with 213g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "With 110.6 lbs of Lean Body Mass, this 140 lb woman requires a disciplined cutting protocol. Holding training days at maintenance (1,750 kcal) fuels heavy resistance training and prevents glycogen depletion, while steep rest-day deficits (-25%) maximize weekly fatty acid mobilization.",
    "keyTakeaways": [
      "Maintain 125g protein daily across all days (1.13g per lb LBM).",
      "Allocate 210g carbs on training days and reduce to 95g on recovery days.",
      "Target 0.7 to 0.8 lbs of fat loss weekly to protect skeletal muscle mass."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "1747 kcal",
          "127g (508 kcal)",
          "213g (852 kcal)",
          "43g (387 kcal)",
          "Performance & Glycogen Refeed"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1308 kcal",
          "132g (528 kcal)",
          "96g (384 kcal)",
          "44g (396 kcal)",
          "Maximum Adipose Oxidation"
        ],
        [
          "Weekly Net Balance",
          "10 912 kcal",
          "904g Total",
          "1140g Total",
          "304g Total",
          "~0.8 lb Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Why not cut calories every day without refeeds?",
        "answer": "Continuous deficits downregulate leptin and thyroid hormones rapidly in athletic women. Training-day carbohydrate refeeds preserve leptin signaling and resting metabolic rate."
      },
      {
        "question": "Will 1,320 kcal on rest days make me lose muscle?",
        "answer": "No. Protein is kept high at 125g (over 1.1g/lb LBM), which provides complete anti-catabolic protection during single-day caloric deficits."
      }
    ]
  },
  {
    "slug": "155-lb-female-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 155 lb Female",
    "metaDescription": "Lean cutting macros for a 155 lb woman. Defend thyroid output and leptin sensitivity with 135g protein and structured training-day carbohydrate refeeds.",
    "badge": "Athletic Fat Loss • Katch-McArdle",
    "h1": "Cutting & Macro Cycling Protocol (155 lb Female)",
    "subtitle": "Clinical calorie and macro cycling schedule for a 70.3 kg (155 lb) woman: 1,880 kcal training days, 1,410 kcal rest days, and 135g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 32,
      "weightKg": 70.30681740895864,
      "heightCm": 167.6,
      "bodyFatPct": 25,
      "formula": "katch",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 155 lb female (25% body fat, 116.3 lb LBM) on a fat loss cut should consume 1812 kcal on training days and 1357 kcal on rest days (-25% deficit). Lock protein at 134g daily with 220g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "At 155 lbs and 25% body fat, this female carries 116.3 lbs of Lean Body Mass. Employing MATADOR-style intermittent energy restriction (maintenance on 4 training days, -25% deficit on 3 rest days) maintains high exercise capacity while generating a predictable 3,100+ kcal weekly deficit.",
    "keyTakeaways": [
      "Maintain 135g protein daily (1.16g per lb LBM) across all 7 days.",
      "Refeed with 225g carbohydrates on training days to maximize workout performance.",
      "Taper carbs to 105g on rest days to trigger AMPK-mediated fat burning."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Refeed)",
          "1812 kcal",
          "134g (536 kcal)",
          "220g (880 kcal)",
          "44g (396 kcal)",
          "Muscle Retention & Full Glycogen"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1357 kcal",
          "139g (556 kcal)",
          "99g (396 kcal)",
          "45g (405 kcal)",
          "Accelerated Fat Oxidation"
        ],
        [
          "Weekly Net Balance",
          "11 319 kcal",
          "953g Total",
          "1177g Total",
          "311g Total",
          "~0.9 lb Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "How many days per week should a 155 lb woman lift on a cut?",
        "answer": "4 days of progressive resistance training (such as an Upper/Lower split) provides the optimal stimulus to preserve lean mass during caloric deficits."
      },
      {
        "question": "When should I take a diet break at 155 lbs?",
        "answer": "After 8 to 12 weeks of continuous cutting, implement a 1- to 2-week diet break at full maintenance calories (1,880 kcal daily) to restore leptin and thyroid hormones."
      }
    ]
  },
  {
    "slug": "170-lb-male-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 170 lb Male",
    "metaDescription": "Athletic cut protocol for a 170 lb male. Drop from 17% to 10% body fat without strength loss using 165g protein and training-day carb cycling.",
    "badge": "Athletic Cut • Single-Digit Goal",
    "h1": "Cutting & Macro Cycling Protocol (170 lb Male)",
    "subtitle": "Precision fat loss strategy for a 77.1 kg (170 lb) male lifter: 2,250 kcal training days, 1,690 kcal rest days, and 165g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 26,
      "weightKg": 77.11070296466431,
      "heightCm": 175.3,
      "bodyFatPct": 17,
      "formula": "katch",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2000,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 170 lb male (17% body fat, 141.1 lb LBM) on a fat loss cut should consume 2103 kcal on training days and 1577 kcal on rest days (-25% deficit). Lock protein at 162g daily with 249g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "Cutting from 17% to 10% body fat requires defending 141.1 lbs of Lean Body Mass against catabolism. Eating 2,250 kcal on training days maintains gym performance, while dropping to 1,690 kcal on non-lifting recovery days creates a large lipolytic deficit without chronic fatigue.",
    "keyTakeaways": [
      "Maintain 165g protein daily across all days (1.17g per lb LBM).",
      "Concentrate 60% of training-day carbohydrates in pre- and post-workout meals.",
      "Maintain 10,000 steps daily to sustain high non-exercise activity thermogenesis (NEAT)."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2103 kcal",
          "162g (648 kcal)",
          "249g (996 kcal)",
          "51g (459 kcal)",
          "Glycogen Fuel & 1RM Defense"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1577 kcal",
          "167g (668 kcal)",
          "108g (432 kcal)",
          "53g (477 kcal)",
          "Deep Adipose Depletion"
        ],
        [
          "Weekly Net Balance",
          "13 143 kcal",
          "1149g Total",
          "1320g Total",
          "363g Total",
          "~1.0 lb Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Will I lose strength on bench press and squat while cutting at 170 lbs?",
        "answer": "No. By consuming 270g carbohydrates on training days and maintaining 165g protein, intramuscular glycogen remains replete, allowing you to sustain heavy strength loads."
      },
      {
        "question": "How do I know when to stop the cut?",
        "answer": "Once you reach your target body composition (such as 10–12% body fat with visible abdominal definition), transition to the Reverse Diet tab to restore maintenance calories."
      }
    ]
  },
  {
    "slug": "185-lb-male-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 185 lb Male",
    "metaDescription": "Precision cutting macros for a 185 lb male. Preserve lean muscle tissue and gym performance with 180g protein, refeed days, and rest-day deficits.",
    "badge": "Athletic Cut • Cunningham Formula",
    "h1": "Cutting & Macro Cycling Protocol (185 lb Male)",
    "subtitle": "High-performance fat loss protocol for an 83.9 kg (185 lb) male lifter: 2,420 kcal training days, 1,815 kcal rest days, and 180g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 30,
      "weightKg": 83.91458852036999,
      "heightCm": 177.8,
      "bodyFatPct": 18,
      "formula": "cunningham",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2150,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 185 lb male (18% body fat, 151.7 lb LBM) on a fat loss cut should consume 2419 kcal on training days and 1812 kcal on rest days (-25% deficit). Lock protein at 174g daily with 298g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "Carrying 151.7 lbs of Lean Body Mass, a 185 lb male burns substantial energy. By anchoring training days at 2,420 kcal, central nervous system fatigue and hormonal suppression are avoided, while dropping to 1,815 kcal on rest days achieves an efficient 1.1 lb weekly fat loss.",
    "keyTakeaways": [
      "Lock daily protein at 180g (1.19g per lb LBM) across training and recovery days.",
      "Refeed with 290g carbs on training days to maintain gym strength and fullness.",
      "Keep rest-day fat at 64g to preserve testosterone and testicular steroidogenesis."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2419 kcal",
          "174g (696 kcal)",
          "298g (1192 kcal)",
          "59g (531 kcal)",
          "Glycogen Fuel & Power Output"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1812 kcal",
          "179g (716 kcal)",
          "139g (556 kcal)",
          "60g (540 kcal)",
          "Targeted Adipose Reduction"
        ],
        [
          "Weekly Net Balance",
          "15 112 kcal",
          "1233g Total",
          "1609g Total",
          "416g Total",
          "~1.1 lbs Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "How does carb cycling prevent metabolic slowdown at 185 lbs?",
        "answer": "Higher carbohydrate days boost circulating leptin and thyroid T3 levels, signaling to the hypothalamus that energy is sufficient to maintain normal basal metabolic rate."
      },
      {
        "question": "Should I take BCAAs during this cut?",
        "answer": "No, BCAAs are unnecessary when total daily protein is anchored at 180g from complete protein sources containing all essential amino acids."
      }
    ]
  },
  {
    "slug": "200-lb-male-cutting-macro-cycling",
    "title": "200 lb Male Cutting & Body Recomposition Macros (TDEE + Refeed Cycling)",
    "metaDescription": "Complete calorie and macro cycling breakdown for a 200 lb male cutting from 20% to 12% body fat without losing strength or lean mass.",
    "badge": "Athletic Fat Loss Preset",
    "h1": "200 lb Male Cutting & Recomposition Macro Protocol",
    "subtitle": "Preserve 100% of your 1RM strength while dropping 1.2 lbs/week using structured training-day carbohydrate refeeds.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 29,
      "weightKg": 90.71847407607567,
      "heightCm": 182.9,
      "bodyFatPct": 20,
      "formula": "cunningham",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -24,
      "proteinPerLbLbm": 1.2,
      "currentDietCalories": 2240,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 200 lb male (20% body fat, 160.0 lb LBM) on a fat loss cut should consume 2518 kcal on training days and 1912 kcal on rest days (-25% deficit). Lock protein at 192g daily with 298g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "A 200 lb male at 20% body fat carries 160 lbs of Lean Body Mass. Using the Cunningham equation, maintenance TDEE sits near 2,950 kcal. Rather than a flat 2,200 kcal diet that drains glycogen, eating ~2,550 kcal on lifting days and ~1,940 kcal on rest days preserves gym performance while creating a sustainable fat loss trajectory.",
    "keyTakeaways": [
      "Keep daily protein locked at 190g–200g to maximize the thermic effect of food (TEF) and nitrogen retention.",
      "Use the Reverse Diet tab once you reach 12% body fat to step calories back up by +80 kcal/week.",
      "Maintain 70g dietary fat on rest days to support free testosterone production."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2518 kcal",
          "192g (768 kcal)",
          "298g (1192 kcal)",
          "62g (558 kcal)",
          "Max Mechanical Tension & Full Glycogen"
        ],
        [
          "Rest Day (-24% Deficit)",
          "1912 kcal",
          "197g (788 kcal)",
          "137g (548 kcal)",
          "64g (576 kcal)",
          "Accelerated Adipose Oxidation"
        ],
        [
          "Weekly Net Balance",
          "15 808 kcal",
          "1359g Total",
          "1603g Total",
          "440g Total",
          "~1.2 lbs Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "How much protein should a 200 lb man eat to cut fat and keep muscle?",
        "answer": "Between 185g and 205g of protein per day (roughly 1.15g to 1.25g per pound of Lean Body Mass, or ~1g per pound of total scale weight)."
      },
      {
        "question": "How long will it take to cut from 20% to 12% body fat at 200 lbs?",
        "answer": "Dropping 16 lbs of pure adipose tissue at 1.2 lbs weekly takes roughly 12 to 14 weeks of consistent execution with this macro cycling protocol."
      }
    ]
  },
  {
    "slug": "215-lb-male-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 215 lb Male",
    "metaDescription": "Aggressive fat loss macros for a 215 lb male. MATADOR intermittent diet model with 205g protein and strategic carbohydrate refeeds.",
    "badge": "Heavyweight Cutting • MATADOR Model",
    "h1": "Cutting & Macro Cycling Protocol (215 lb Male)",
    "subtitle": "Precision fat loss strategy for a 97.5 kg (215 lb) male lifter: 2,680 kcal training days, 2,010 kcal rest days, and 205g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 33,
      "weightKg": 97.52235963178134,
      "heightCm": 182.9,
      "bodyFatPct": 22,
      "formula": "cunningham",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2360,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 215 lb male (22% body fat, 167.7 lb LBM) on a fat loss cut should consume 2608 kcal on training days and 1957 kcal on rest days (-25% deficit). Lock protein at 193g daily with 315g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "With 167.7 lbs of Lean Body Mass, a 215 lb male maintains substantial resting energy expenditure. Consuming 2,680 kcal on training days prevents gym performance degradation, while a -25% deficit (2,010 kcal) on rest days creates a weekly 3,800+ kcal deficit to shed 1.3 lbs weekly.",
    "keyTakeaways": [
      "Hold protein steady at 205g daily (1.22g per lb LBM) across all days.",
      "Fuel heavy squat and bench sessions with 325g carbs on training days.",
      "Maintain 72g dietary fat on recovery days to sustain hormone production."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2608 kcal",
          "193g (772 kcal)",
          "315g (1260 kcal)",
          "64g (576 kcal)",
          "Muscle Sparing & Glycogen Delivery"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1957 kcal",
          "198g (792 kcal)",
          "145g (580 kcal)",
          "65g (585 kcal)",
          "Deep Adipose Tissue Depletion"
        ],
        [
          "Weekly Net Balance",
          "16 303 kcal",
          "1366g Total",
          "1695g Total",
          "451g Total",
          "~1.3 lbs Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Should a 215 lb male do cardio during a cut?",
        "answer": "Yes, 20–30 minutes of low-impact incline treadmill walking on rest days accelerates fat loss without increasing systemic fatigue or muscle soreness."
      },
      {
        "question": "How much water should I drink on this cut?",
        "answer": "Aim for 3.6 to 4.0 liters daily to assist the kidneys in metabolizing the nitrogen waste from 205g protein and to optimize intramuscular hydration."
      }
    ]
  },
  {
    "slug": "225-lb-male-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 225 lb Male",
    "metaDescription": "Heavyweight cutting macro protocol for a 225 lb male. Preserve strength and metabolic rate with 215g protein and rest-day carbohydrate tapering.",
    "badge": "Heavyweight Cutting • Strength Sparing",
    "h1": "Cutting & Macro Cycling Protocol (225 lb Male)",
    "subtitle": "Clinical calorie cycling protocol for a 102.1 kg (225 lb) male athlete: 2,750 kcal training days, 2,060 kcal rest days, and 215g protein.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 35,
      "weightKg": 102.05828333558512,
      "heightCm": 185.4,
      "bodyFatPct": 24,
      "formula": "cunningham",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2440,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 225 lb male (24% body fat, 171.0 lb LBM) on a fat loss cut should consume 2649 kcal on training days and 1986 kcal on rest days (-25% deficit). Lock protein at 197g daily with 319g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "Carrying 171.0 lbs of Lean Body Mass, a 225 lb strength athlete cannot afford severe daily energy deficits that strip away hard-earned muscle. Eating 2,750 kcal on lifting days supports heavy lifting and recovery, while rest-day deficits facilitate rapid adipose oxidation.",
    "keyTakeaways": [
      "Maintain 215g protein daily (1.26g per lb LBM) across all days.",
      "Consume 335g carbs on workout days and drop to 155g on recovery days.",
      "Keep rest-day fat at 74g to support androgenic hormones and joint recovery."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2649 kcal",
          "197g (788 kcal)",
          "319g (1276 kcal)",
          "65g (585 kcal)",
          "Heavy Volume & Contractile Tissue Defense"
        ],
        [
          "Rest Day (-25% Deficit)",
          "1986 kcal",
          "202g (808 kcal)",
          "146g (584 kcal)",
          "66g (594 kcal)",
          "AMPK Activation & Fatty Acid Oxidation"
        ],
        [
          "Weekly Net Balance",
          "16 554 kcal",
          "1394g Total",
          "1714g Total",
          "458g Total",
          "~1.4 lbs Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "Will 2,060 kcal on rest days cause excessive hunger?",
        "answer": "No, because 215g of protein and 35g+ of dietary fiber provide powerful satiety signals (PYY and GLP-1 release) that keep hunger controlled throughout the rest day."
      },
      {
        "question": "How fast should a 225 lb man cut weight?",
        "answer": "A loss rate of 1.2 to 1.5 lbs weekly (0.5%–0.7% of body weight) represents the sweet spot for maximizing fat loss while preventing loss of strength or lean tissue."
      }
    ]
  },
  {
    "slug": "240-lb-male-cutting-macro-cycling",
    "title": "Cutting & Calorie Cycling Macros for a 240 lb Male",
    "metaDescription": "Structured fat loss blueprint for a 240 lb male lifter. Preserve lean tissue with 225g protein, high satiety fiber, and 2,150 kcal rest-day deficit.",
    "badge": "Heavyweight Cutting • Lean Mass Defense",
    "h1": "Cutting & Macro Cycling Protocol (240 lb Male)",
    "subtitle": "Heavyweight fat loss blueprint for a 108.9 kg (240 lb) male: 2,860 kcal training days, 2,145 kcal rest days, and 225g protein floor.",
    "category": "cutting",
    "defaultTab": "recomp",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 38,
      "weightKg": 108.86216889129079,
      "heightCm": 188,
      "bodyFatPct": 26,
      "formula": "cunningham",
      "activityLevel": "sedentary",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": -25,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2520,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 240 lb male (26% body fat, 177.6 lb LBM) on a fat loss cut should consume 2727 kcal on training days and 2044 kcal on rest days (-25% deficit). Lock protein at 204g daily with 327g carbs on lifting days to maintain strength while oxidizing 0.8 lb fat weekly.",
    "clinicalSummary": "At 240 lbs and 26% body fat, this male athlete possesses 177.6 lbs of Lean Body Mass. An aggressive chronic deficit leads to lethargy and muscle catabolism. By cycling 2,860 kcal on training days with 2,145 kcal on rest days, power output is maintained while creating a 4,200+ kcal net weekly deficit.",
    "keyTakeaways": [
      "Fix protein intake at 225g daily (1.27g per lb LBM) across all days.",
      "Fuel training with 350g carbohydrates on lifting days.",
      "Maintain 77g dietary fat on rest days to protect testicular steroidogenesis and hormone balance."
    ],
    "tableData": {
      "headers": [
        "Day Type",
        "Calories",
        "Protein",
        "Carbohydrates",
        "Fat",
        "Primary Objective"
      ],
      "rows": [
        [
          "Training Day (Maintenance)",
          "2727 kcal",
          "204g (816 kcal)",
          "327g (1308 kcal)",
          "67g (603 kcal)",
          "Glycogen Fuel & Power Output"
        ],
        [
          "Rest Day (-25% Deficit)",
          "2044 kcal",
          "209g (836 kcal)",
          "149g (596 kcal)",
          "68g (612 kcal)",
          "Maximum Lipolytic Oxidation"
        ],
        [
          "Weekly Net Balance",
          "17 040 kcal",
          "1443g Total",
          "1755g Total",
          "472g Total",
          "~1.5 lbs Pure Fat Loss / Wk"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "28642676",
        "citation": "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018.",
        "title": "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
        "journal": "Br J Sports Med",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/"
      }
    ],
    "faq": [
      {
        "question": "How do I prevent loose skin when losing fat at 240 lbs?",
        "answer": "Losing fat at a controlled pace (1.2–1.5 lbs weekly) while maintaining high protein (225g) and resistance training supports collagen synthesis and maximizes underlying muscle fullness."
      },
      {
        "question": "Can a 240 lb male take creatine on a cut?",
        "answer": "Yes, 5g/day of creatine monohydrate protects intramuscular phosphocreatine stores and cell volume without impeding subcutaneous adipose tissue loss."
      }
    ]
  },
  {
    "slug": "120-lb-female-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 120 lb Female",
    "metaDescription": "Step-by-step +80 kcal/week reverse diet schedule for a 120 lb female recovering from extreme low-calorie dieting back to 1,750 kcal maintenance.",
    "badge": "Reverse Diet Protocol • Metabolic Restoration",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (120 lb Female)",
    "subtitle": "Structured +80 kcal/week incremental ramp from 1,150 kcal back to 1,750 kcal for a 54.4 kg (120 lb) female recovering from chronic dieting.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 26,
      "weightKg": 54.431084445645396,
      "heightCm": 160,
      "bodyFatPct": 20,
      "formula": "mifflin",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1150,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 120 lb female (20% body fat, 96.0 lb LBM) recovering from 1,150 kcal dieting should reverse up by +80 kcal weekly to reach 1723 kcal. Hold protein steady at 110g while adding 15g carbs and 2g fat each week to stimulate NEAT and restore thyroid T3 output.",
    "clinicalSummary": "Following chronic 1,150 kcal dieting, adaptive thermogenesis depresses metabolic rate and decreases non-exercise activity thermogenesis (NEAT). By adding +80 kcal weekly, metabolic rate increases in tandem with food intake, preventing the rebound adipose storage common with sudden refeeding.",
    "keyTakeaways": [
      "Lock protein at 110g daily (1.15g per lb LBM) from week one.",
      "Add 15g carbs and 2g fat each week (+80 kcal total).",
      "Expect a minor 1–2 lb scale jump in weeks 1–2 from intracellular water and glycogen replenishment."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,150 kcal",
          "110g (440 kcal)",
          "105g (420 kcal)",
          "32g (288 kcal)",
          "Adaptation Nadir"
        ],
        [
          "Week 3",
          "1,310 kcal (+160)",
          "110g (440 kcal)",
          "135g (540 kcal)",
          "37g (333 kcal)",
          "Glycogen Replenishment"
        ],
        [
          "Week 6",
          "1,550 kcal (+400)",
          "110g (440 kcal)",
          "180g (720 kcal)",
          "43g (387 kcal)",
          "NEAT & Leptin Upswing"
        ],
        [
          "Week 8 (Target)",
          "1723 kcal (+573)",
          "110g (440 kcal)",
          "210g (840 kcal)",
          "48g (432 kcal)",
          "Full TDEE Restoration"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "Will I gain body fat during a +80 kcal/week reverse diet?",
        "answer": "No. Because each step-up is small (+80 kcal/day), the extra energy is channeled into increased spontaneous movement (NEAT) and body heat rather than adipose storage."
      },
      {
        "question": "What should I do if the scale jumps 2 lbs in the first week?",
        "answer": "Do not cut calories. That initial weight increase is intramuscular glycogen and water binding (each gram of glycogen holds 3g of water), not body fat."
      }
    ]
  },
  {
    "slug": "130-lb-female-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 130 lb Female",
    "metaDescription": "Metabolic recovery protocol for a 130 lb female. Step calories up from 1,200 kcal to 1,850 kcal at +80 kcal/week without unwanted fat gain.",
    "badge": "Reverse Diet Protocol • Metabolic Restoration",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (130 lb Female)",
    "subtitle": "Systematic metabolic restoration schedule for a 59.0 kg (130 lb) female: advance from 1,200 to 1,850 kcal/day to rebuild metabolic expenditure.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 29,
      "weightKg": 58.967008149449185,
      "heightCm": 162.6,
      "bodyFatPct": 21,
      "formula": "mifflin",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1200,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 45,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 130 lb female (21% body fat, 102.7 lb LBM) reversing out of a 1,200 kcal deficit should increase intake by +80 kcal/week toward 1788 kcal. Keep protein locked at 115g daily while steadily adding 16g carbohydrates and 2g fat weekly to increase leptin and daily spontaneous activity.",
    "clinicalSummary": "Exiting a 1,200 kcal deficit requires careful upward titration. For a 130 lb woman with 102.7 lbs LBM, increasing energy by +80 kcal each week reactivates down-regulated thyroid T3 and stimulates spontaneous physical movement, restoring maintenance TDEE to 1,850 kcal.",
    "keyTakeaways": [
      "Maintain 115g daily protein throughout the entire reverse dieting period.",
      "Add 16g carbs and 2g fat each week to gradually expand caloric ceiling.",
      "Track weekly average weight rather than daily fluctuations to guide progression."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,200 kcal",
          "115g (460 kcal)",
          "115g (460 kcal)",
          "31g (279 kcal)",
          "Initial Recovery Step"
        ],
        [
          "Week 3",
          "1,360 kcal (+160)",
          "115g (460 kcal)",
          "147g (588 kcal)",
          "35g (315 kcal)",
          "Intracellular Hydration"
        ],
        [
          "Week 6",
          "1,600 kcal (+400)",
          "115g (460 kcal)",
          "195g (780 kcal)",
          "40g (360 kcal)",
          "Thyroid T3 Normalization"
        ],
        [
          "Week 8 (Target)",
          "1788 kcal (+588)",
          "115g (460 kcal)",
          "227g (908 kcal)",
          "44g (396 kcal)",
          "Full Energy Equilibrium"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "How long should a reverse diet last for a 130 lb woman?",
        "answer": "Typically 8 to 10 weeks, depending on how low calories were restricted and how much metabolic adaptation occurred during the prior diet."
      },
      {
        "question": "Can I lift heavier weights during a reverse diet?",
        "answer": "Yes. As carbohydrates and calories increase, workout stamina, muscular pump, and recovery capacity improve markedly."
      }
    ]
  },
  {
    "slug": "135-lb-female-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery Calculator for a 135 lb Female",
    "metaDescription": "Step-by-step +80 kcal/week reverse diet schedule for a 135 lb female recovering from chronic 1,200 kcal dieting without rebound fat gain.",
    "badge": "Metabolic Recovery • Reverse Diet",
    "h1": "Reverse Diet & Metabolic Recovery Plan (135 lb Female)",
    "subtitle": "Gradually restore your TDEE from 1,250 kcal back to 1,950+ kcal/day at +80 kcal per week by upregulating NEAT and thyroid conversion.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 31,
      "weightKg": 61.23497000135107,
      "heightCm": 162.5,
      "bodyFatPct": 22,
      "formula": "mifflin",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1280,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 135 lb female (22% body fat, 105.3 lb LBM) recovering from a 1,280 kcal cut should increase daily calories by +80 kcal weekly to attain 1804 kcal. Fix protein at 120g daily, adding 15g carbs and 2g fat every week to restore metabolic rate without rebound adipose storage.",
    "clinicalSummary": "After prolonged caloric restriction (1,200–1,300 kcal/day), adaptive thermogenesis suppresses resting metabolic rate by up to 15%. Jumping immediately back to 1,950 kcal causes rapid fat regain. Increasing intake by +80 kcal/week allows Non-Exercise Activity Thermogenesis (NEAT) and leptin to recover in lockstep.",
    "keyTakeaways": [
      "Hold protein steady at 110g–120g right from Week 1 while adding ~15g carbs and ~2g fat each week.",
      "Expect a temporary 1.5–2.5 lb scale bump in Weeks 1–2 solely from intracellular muscle glycogen and water restoration—not fat gain.",
      "Maintain 4 resistance training sessions per week to partition added calories toward muscle."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,280 kcal",
          "120g (480 kcal)",
          "125g (500 kcal)",
          "33g (297 kcal)",
          "Initial Metabolic Recovery"
        ],
        [
          "Week 3",
          "1,440 kcal (+160)",
          "120g (480 kcal)",
          "155g (620 kcal)",
          "38g (342 kcal)",
          "Glycogen Supercompensation"
        ],
        [
          "Week 6",
          "1,680 kcal (+400)",
          "120g (480 kcal)",
          "200g (800 kcal)",
          "44g (396 kcal)",
          "Leptin & Thyroid Resurgence"
        ],
        [
          "Week 8 (Target)",
          "1804 kcal (+524)",
          "120g (480 kcal)",
          "230g (920 kcal)",
          "49g (441 kcal)",
          "Full TDEE Equilibrium"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "Will I gain fat during a +80 kcal/week reverse diet?",
        "answer": "No—because every weekly step remains at or below your true adaptive TDEE while stimulating higher daily energy expenditure and training output."
      },
      {
        "question": "Can I do cardio while reverse dieting?",
        "answer": "Keep cardio moderate (20–30 minutes walking) and gradually taper excessive cardio sessions as calories rise to let metabolic rate normalize."
      }
    ]
  },
  {
    "slug": "145-lb-female-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 145 lb Female",
    "metaDescription": "Restore metabolic capacity for a 145 lb female. Step up from 1,350 kcal to 2,050 kcal with controlled +80 kcal/week increments and stable protein.",
    "badge": "Reverse Diet Protocol • Metabolic Restoration",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (145 lb Female)",
    "subtitle": "Metabolic rehabilitation strategy for a 65.8 kg (145 lb) female: safely ramp from 1,350 to 2,050 kcal/day while preserving body composition.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 35,
      "weightKg": 65.77089370515486,
      "heightCm": 165.1,
      "bodyFatPct": 24,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1350,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 145 lb female (24% body fat, 110.2 lb LBM) reversing from 1,350 kcal to 1994 kcal should implement a structured +80 kcal weekly step-up. Maintain protein at 125g daily, allocating 16g carbohydrates and 2g dietary fat per step to upregulate resting energy expenditure and muscle fullness.",
    "clinicalSummary": "With 110.2 lbs of Lean Body Mass, a 145 lb woman possesses significant metabolic potential. Gradually expanding caloric intake from 1,350 to 2,050 kcal rehabilitates suppressed thyroid hormones and reverses adaptive thermogenesis without causing body fat accumulation.",
    "keyTakeaways": [
      "Maintain 125g protein daily across all weeks (1.13g per lb LBM).",
      "Increase carbohydrates by 16g and dietary fat by 2g each week.",
      "Use strength gains in the gym as confirmation that extra calories are fueling muscle tissue."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,350 kcal",
          "125g (500 kcal)",
          "135g (540 kcal)",
          "34g (306 kcal)",
          "Baseline Recovery Step"
        ],
        [
          "Week 3",
          "1,510 kcal (+160)",
          "125g (500 kcal)",
          "167g (668 kcal)",
          "39g (351 kcal)",
          "Muscle Glycogen Restoration"
        ],
        [
          "Week 6",
          "1,750 kcal (+400)",
          "125g (500 kcal)",
          "215g (860 kcal)",
          "44g (396 kcal)",
          "NEAT & Metabolic Rate Upswing"
        ],
        [
          "Week 8 (Target)",
          "1994 kcal (+644)",
          "125g (500 kcal)",
          "247g (988 kcal)",
          "48g (432 kcal)",
          "Full Energy Restoration"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "Should I weigh myself every day while reverse dieting?",
        "answer": "Weigh in daily but only track the weekly median or average. Daily fluctuations from water, sodium, and bowel contents are completely normal."
      },
      {
        "question": "What if my weight stays completely flat for 3 weeks?",
        "answer": "That indicates your metabolic rate is matching your intake increase perfectly. You may accelerate step-ups to +100 kcal weekly if preferred."
      }
    ]
  },
  {
    "slug": "160-lb-female-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 160 lb Female",
    "metaDescription": "Post-diet metabolic repair for a 160 lb female. Advance calories from 1,400 to 2,150 kcal at +80 kcal/week to revitalize thyroid and sex hormones.",
    "badge": "Reverse Diet Protocol • Metabolic Restoration",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (160 lb Female)",
    "subtitle": "Clinical metabolic recovery plan for a 72.6 kg (160 lb) woman: step up from 1,400 to 2,150 kcal to optimize hormones and metabolic rate.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 39,
      "weightKg": 72.57477926086054,
      "heightCm": 167.6,
      "bodyFatPct": 27,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1400,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 160 lb female (27% body fat, 116.8 lb LBM) concluding a severe diet at 1,400 kcal should reverse toward 2082 kcal via +80 kcal weekly progressions. Maintain 130g protein daily, adding 15g carbs and 2g fat weekly to restore pituitary-thyroid balance and enhance physical training stamina.",
    "clinicalSummary": "A 160 lb female with 116.8 lbs LBM requires over 2,100 kcal for true metabolic maintenance. Slowly elevating intake from 1,400 kcal by +80 kcal/week restores leptin, normalizes cortisol-to-DHEA ratios, and refuels skeletal muscle glycogen stores safely.",
    "keyTakeaways": [
      "Hold protein locked at 130g daily across all phases.",
      "Add 15g carbohydrates and 2g dietary fat every 7 days.",
      "Channel extra energy into increasing weight lifted on compound gym exercises."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,400 kcal",
          "130g (520 kcal)",
          "140g (560 kcal)",
          "36g (324 kcal)",
          "Post-Diet Caloric Floor"
        ],
        [
          "Week 3",
          "1,560 kcal (+160)",
          "130g (520 kcal)",
          "172g (688 kcal)",
          "40g (360 kcal)",
          "Glycogen Storage Expansion"
        ],
        [
          "Week 6",
          "1,800 kcal (+400)",
          "130g (520 kcal)",
          "220g (880 kcal)",
          "45g (405 kcal)",
          "Thyroid & Leptin Normalization"
        ],
        [
          "Week 8 (Target)",
          "2082 kcal (+682)",
          "130g (520 kcal)",
          "252g (1,008 kcal)",
          "49g (441 kcal)",
          "Target Maintenance Approach"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "How do I handle hunger increasing as I eat more calories?",
        "answer": "This is a healthy clinical sign that your thyroid hormone and leptin sensitivity are rebounding. Continue stepping up on schedule to achieve full metabolic satiety."
      },
      {
        "question": "Should I do cardio during this reverse diet at 160 lbs?",
        "answer": "Keep cardio minimal (2 to 3 easy 20-minute walks per week) so energy can be allocated to muscle building and hormonal recovery."
      }
    ]
  },
  {
    "slug": "165-lb-male-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 165 lb Male",
    "metaDescription": "Post-contest metabolic restoration for a 165 lb male. Step calories up from 1,600 to 2,450 kcal at +100 kcal/week to normalize testosterone and NEAT.",
    "badge": "Athletic Reverse Diet • Endocrine Recovery",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (165 lb Male)",
    "subtitle": "Post-deficit metabolic recovery protocol for a 74.8 kg (165 lb) male lifter: step up from 1,600 to 2,450 kcal/day to restore testosterone and gym strength.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 27,
      "weightKg": 74.84274111276243,
      "heightCm": 175.3,
      "bodyFatPct": 14,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1600,
      "reverseStepKcal": 100,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 165 lb male (14% body fat, 141.9 lb LBM) exiting a competition diet at 1,600 kcal should reverse toward 2420 kcal at +100 kcal weekly. Fix protein at 160g daily, adding 20g carbs and 2g fat each week to normalize serum testosterone and elevate non-exercise physical activity.",
    "clinicalSummary": "Following contest preparation or deep cutting, hypothalamic-pituitary-gonadal (HPG) signaling is significantly suppressed. For a 165 lb male with 141.9 lbs LBM, stepping calories up by +100 kcal/week restores LH, FSH, and testosterone levels while refilling glycogen stores.",
    "keyTakeaways": [
      "Maintain 160g protein daily across all weeks.",
      "Add 20g carbs and 2g fat each week (+100 kcal total).",
      "Watch gym strength and pump rebound rapidly within 3 to 4 weeks."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,600 kcal",
          "160g (640 kcal)",
          "150g (600 kcal)",
          "40g (360 kcal)",
          "Endocrine Baseline Step"
        ],
        [
          "Week 3",
          "1,800 kcal (+200)",
          "160g (640 kcal)",
          "190g (760 kcal)",
          "44g (396 kcal)",
          "Glycogen Recovery"
        ],
        [
          "Week 6",
          "2,100 kcal (+500)",
          "160g (640 kcal)",
          "250g (1,000 kcal)",
          "51g (459 kcal)",
          "Testosterone Normalization"
        ],
        [
          "Week 8 (Target)",
          "2420 kcal (+820)",
          "160g (640 kcal)",
          "290g (1,160 kcal)",
          "56g (504 kcal)",
          "Full TDEE Equilibrium"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "Why not jump straight to 2,450 calories after a cut?",
        "answer": "Insulin sensitivity is high but fat cell lipolytic enzymes are sluggish. A sudden 800+ calorie surplus causes rapid visceral and subcutaneous fat overshoot."
      },
      {
        "question": "How long until my testosterone recovers after dieting at 165 lbs?",
        "answer": "Serum testosterone levels typically rebound to healthy physiological baselines within 4 to 6 weeks of progressive reverse dieting and adequate dietary fat intake."
      }
    ]
  },
  {
    "slug": "180-lb-male-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 180 lb Male",
    "metaDescription": "Metabolic adaptation recovery for a 180 lb male. Step calories up from 1,750 to 2,650 kcal at +100 kcal/week to restore muscle glycogen and resting BMR.",
    "badge": "Athletic Reverse Diet • Endocrine Recovery",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (180 lb Male)",
    "subtitle": "Systematic metabolic restoration protocol for an 81.6 kg (180 lb) male lifter: progress from 1,750 to 2,650 kcal/day to rebuild metabolic expenditure.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 32,
      "weightKg": 81.6466266684681,
      "heightCm": 177.8,
      "bodyFatPct": 16,
      "formula": "katch",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1750,
      "reverseStepKcal": 100,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 180 lb male (16% body fat, 151.2 lb LBM) concluding a deficit at 1,750 kcal should reverse toward 2545 kcal by adding +100 kcal weekly. Keep protein steady at 175g daily, incorporating 20g carbs and 2g fat per week to refill intracellular glycogen stores without fat accumulation.",
    "clinicalSummary": "A 180 lb male carrying 151.2 lbs of Lean Body Mass has a true maintenance TDEE near 2,650 kcal. Advancing calories incrementally by +100 kcal each week reactivates down-regulated thyroid T3, increases voluntary non-exercise activity, and restores hormonal balance smoothly.",
    "keyTakeaways": [
      "Maintain 175g protein daily across all weeks (1.16g per lb LBM).",
      "Incorporate 20g carbs and 2g fat each week to gradually ramp calories.",
      "Take advantage of increasing energy by progressively overloading in the weight room."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,750 kcal",
          "175g (700 kcal)",
          "170g (680 kcal)",
          "41g (369 kcal)",
          "Caloric Baseline Floor"
        ],
        [
          "Week 3",
          "1,950 kcal (+200)",
          "175g (700 kcal)",
          "210g (840 kcal)",
          "46g (414 kcal)",
          "Intracellular Rehydration"
        ],
        [
          "Week 6",
          "2,250 kcal (+500)",
          "175g (700 kcal)",
          "270g (1,080 kcal)",
          "52g (468 kcal)",
          "Thyroid & NEAT Resurgence"
        ],
        [
          "Week 8 (Target)",
          "2545 kcal (+795)",
          "175g (700 kcal)",
          "310g (1,240 kcal)",
          "57g (513 kcal)",
          "Target Maintenance Zone"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "How do I know when my reverse diet is complete at 180 lbs?",
        "answer": "When daily caloric intake reaches 2,600–2,700 kcal and scale weight remains stable within ±1.5 lbs over a 2-week period, your maintenance expenditure is fully restored."
      },
      {
        "question": "Can I do intermittent fasting while reverse dieting?",
        "answer": "Yes, 16:8 fasting can be combined with reverse dieting as long as you can comfortably consume your target calories within your feeding window."
      }
    ]
  },
  {
    "slug": "200-lb-male-reverse-diet-planner",
    "title": "Reverse Dieting & Metabolic Recovery for a 200 lb Male",
    "metaDescription": "Complete metabolic rehabilitation plan for a 200 lb male. Transition from 1,900 kcal cut to 2,850 kcal maintenance with progressive weekly step-ups.",
    "badge": "Heavyweight Reverse Diet • Full TDEE Rebound",
    "h1": "Reverse Dieting & Metabolic Recovery Plan (200 lb Male)",
    "subtitle": "Heavyweight metabolic restoration schedule for a 90.7 kg (200 lb) male athlete: transition from 1,900 to 2,850 kcal/day to rebuild metabolic output.",
    "category": "reverse",
    "defaultTab": "reverse",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 36,
      "weightKg": 90.71847407607567,
      "heightCm": 182.9,
      "bodyFatPct": 19,
      "formula": "cunningham",
      "activityLevel": "light",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 0,
      "restDayDeficitPct": 0,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1900,
      "reverseStepKcal": 100,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 1,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 200 lb male (19% body fat, 162.0 lb LBM) reversing from 1,900 kcal toward 2911 kcal maintenance should advance intake by +100 kcal weekly. Lock daily protein at 190g, supplementing 20g carbs and 2g fat every 7 days to eliminate metabolic slowdown and rebuild workout endurance.",
    "clinicalSummary": "With 162.0 lbs of Lean Body Mass, a 200 lb male has an expansive metabolic capacity. After deep cutting down to 1,900 kcal, stepping calories up by +100 kcal weekly allows metabolic rate to rebound without causing rebound fat accumulation.",
    "keyTakeaways": [
      "Maintain 190g protein daily across all weeks (1.17g per lb LBM).",
      "Add 20g carbs and 2g fat each week to gradually ramp caloric intake.",
      "Observe rapid increases in gym pump, mechanical leverage, and sleep depth."
    ],
    "tableData": {
      "headers": [
        "Phase Week",
        "Daily Calories",
        "Protein Target",
        "Carb Addition",
        "Fat Addition",
        "Metabolic Milestone"
      ],
      "rows": [
        [
          "Week 1 (Baseline)",
          "1,900 kcal",
          "190g (760 kcal)",
          "185g (740 kcal)",
          "44g (396 kcal)",
          "End-of-Cut Caloric Floor"
        ],
        [
          "Week 3",
          "2,100 kcal (+200)",
          "190g (760 kcal)",
          "225g (900 kcal)",
          "49g (441 kcal)",
          "Muscle Fullness Rebound"
        ],
        [
          "Week 6",
          "2,400 kcal (+500)",
          "190g (760 kcal)",
          "285g (1,140 kcal)",
          "55g (495 kcal)",
          "Thyroid & NEAT Recovery"
        ],
        [
          "Week 8 (Target)",
          "2911 kcal (+1011)",
          "190g (760 kcal)",
          "325g (1,300 kcal)",
          "60g (540 kcal)",
          "Full Energy Restoration"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "28925405",
        "citation": "Byrne NM, et al. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018.",
        "title": "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
        "journal": "Int J Obes",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28925405/"
      },
      {
        "pmid": "23360586",
        "citation": "Aragon AA, Schoenfeld BJ. Nutrient timing revisited: is there a post-exercise anabolic window? J Int Soc Sports Nutr. 2013.",
        "title": "Nutrient timing revisited: is there a post-exercise anabolic window?",
        "journal": "J Int Soc Sports Nutr",
        "year": 2013,
        "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
      }
    ],
    "faq": [
      {
        "question": "Will 2,600+ calories make a 200 lb male gain fat?",
        "answer": "No. With 162.0 lbs of Lean Body Mass and 4 heavy resistance sessions weekly, true maintenance expenditure sits between 2,800 and 2,950 kcal."
      },
      {
        "question": "What supplements support metabolic recovery at 200 lbs?",
        "answer": "Creatine monohydrate (5g/day), ashwagandha (for cortisol management), and zinc/magnesium support rapid hormonal and metabolic recovery."
      }
    ]
  },
  {
    "slug": "125-lb-female-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 125 lb Female",
    "metaDescription": "Calculate plant protein doses to trigger muscle protein synthesis (3.0g leucine) and normalize Fat-Free Mass Index for a 125 lb vegan female.",
    "badge": "Vegan Leucine Trigger • FFMI Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (125 lb Female)",
    "subtitle": "Precision plant-based protein kinetics for a 56.7 kg (125 lb) female: 3.0g leucine per feeding, 110g daily protein, and natural FFMI analysis.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 26,
      "weightKg": 56.69904629754729,
      "heightCm": 160,
      "bodyFatPct": 21,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 125 lb vegan female (21% body fat, 98.8 lb LBM, FFMI 18.2) needs 34g of a 70:30 pea-rice protein blend or 180g tofu plus 30g hemp per meal to reach 3.0g leucine. Consume 110g plant protein daily across three distinct feedings to maximize myofibrillar protein synthesis.",
    "clinicalSummary": "Plant proteins typically contain 6–8% leucine compared to 10–12% in whey. For a 125 lb female with 98.8 lbs LBM and an FFMI of 18.2, hitting the 3.0g leucine threshold requires slightly larger boluses (34g blended plant isolate) or strategic food combining (legumes + grains) to optimize muscle protein synthesis.",
    "keyTakeaways": [
      "Reach at least 34g plant protein per feeding to deliver 3.0g of L-leucine.",
      "Blend pea and rice protein in a 70:30 ratio to optimize essential amino acid profiles.",
      "Maintain 110g total daily plant protein across 3 structured meals."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Isolate (70:30)",
          "34g powder",
          "135 kcal",
          "8.8%",
          "Complete standalone blend"
        ],
        [
          "Soy Protein Isolate",
          "38g powder",
          "145 kcal",
          "7.8%",
          "Standalone complete"
        ],
        [
          "Firm Organic Tofu",
          "280g cooked",
          "235 kcal",
          "7.2%",
          "Pair with sesame or brown rice"
        ],
        [
          "Cooked Red Lentils",
          "380g cooked",
          "440 kcal",
          "6.5%",
          "Pair with wild rice or quinoa"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Can a 125 lb female build muscle as quickly on a vegan diet?",
        "answer": "Yes. Clinical trials (Churchward-Venne et al., 2014) confirm that when total protein and per-meal leucine are matched, plant proteins stimulate muscle protein synthesis equally to animal proteins."
      },
      {
        "question": "What is a good FFMI for a 125 lb female?",
        "answer": "An FFMI of 18.0 to 19.5 represents an athletic, well-muscled drug-free female physique with strong physical capacity."
      }
    ]
  },
  {
    "slug": "140-lb-female-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 140 lb Female",
    "metaDescription": "Achieve the 3.0g leucine anabolic trigger on a plant-based diet for a 140 lb female. Optimal protein pairing, FFMI evaluation, and daily targets.",
    "badge": "Vegan Leucine Trigger • FFMI Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (140 lb Female)",
    "subtitle": "Evidence-based plant protein strategy for a 63.5 kg (140 lb) female athlete: 3.0g leucine threshold, 115g daily protein, and FFMI tracking.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 30,
      "weightKg": 63.50293185325297,
      "heightCm": 162.6,
      "bodyFatPct": 24,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1750,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 140 lb vegan female (24% body fat, 106.4 lb LBM, FFMI 18.8) requires 36g of blended plant protein per meal to trigger the 3.0g L-leucine anabolic threshold. Target 115g total daily protein split into three meals, pairing lysine-rich legumes with methionine-rich grains for complete amino acid kinetics.",
    "clinicalSummary": "Carrying 106.4 lbs of Lean Body Mass, a 140 lb female athlete benefits from targeted amino acid distribution. By hitting 36g blended plant protein (pea, rice, or soy) per feeding, the 3.0g leucine trigger is cleared, activating mTORC1 and preventing sub-optimal post-workout muscle protein synthesis.",
    "keyTakeaways": [
      "Ingest 36g plant protein per feeding to ensure 3.0g leucine delivery.",
      "Maintain 115g total daily protein across 3 substantial meals.",
      "Supplement vitamin B12 (500mcg daily) and algae-based DHA/EPA (300mg daily)."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Isolate Blend",
          "36g powder",
          "145 kcal",
          "8.6%",
          "Complete blend"
        ],
        [
          "Tempeh (Fermented Soy)",
          "240g cooked",
          "420 kcal",
          "7.4%",
          "Pair with brown rice"
        ],
        [
          "Edamame (Steamed)",
          "320g whole",
          "380 kcal",
          "7.5%",
          "Pair with quinoa"
        ],
        [
          "Seitan (Wheat Gluten)",
          "35g cooked",
          "130 kcal",
          "7.1%",
          "Must pair with lysine (lentils/pea)"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Why is seitan alone insufficient for building muscle?",
        "answer": "Seitan (vital wheat gluten) is extremely low in lysine, an essential amino acid. Pairing seitan with lysine-rich sources like lentils or pea protein ensures complete protein synthesis."
      },
      {
        "question": "How do I reach 115g vegan protein without too many carbohydrates?",
        "answer": "Utilize low-carb plant protein isolates (pea/rice or soy isolate) alongside tofu, seitan, tempeh, and lupin flour to keep net carbs moderate."
      }
    ]
  },
  {
    "slug": "155-lb-female-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 155 lb Female",
    "metaDescription": "Vegan muscle building and FFMI calculator for a 155 lb female. Precise plant protein quantities to hit 3.0g leucine and stimulate muscle growth.",
    "badge": "Vegan Leucine Trigger • FFMI Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (155 lb Female)",
    "subtitle": "High-protein vegan blueprint for a 70.3 kg (155 lb) female: 3.0g leucine trigger, 125g daily plant protein, and FFMI trajectory.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 34,
      "weightKg": 70.30681740895864,
      "heightCm": 165.1,
      "bodyFatPct": 27,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1850,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 50,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 3,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 155 lb plant-based female (27% body fat, 113.2 lb LBM, FFMI 19.3) requires 38g of plant protein per feeding to deliver 3.0g of leucine. Maintain a daily target of 125g protein across three meals to support ongoing muscle hypertrophy while sustaining optimal nitrogen retention on a vegan diet.",
    "clinicalSummary": "With 113.2 lbs of Lean Body Mass, a 155 lb female athlete requires 125g total daily protein. To ensure optimal mTOR phosphorylation, each meal should deliver 38g of blended plant protein, providing the critical 3.0g leucine trigger needed to match omnivorous muscle protein synthesis rates.",
    "keyTakeaways": [
      "Deliver 38g plant protein per feeding to exceed the 3.0g leucine threshold.",
      "Maintain 125g total daily protein across 3 substantial meals.",
      "Include pumpkin seeds and nutritional yeast to provide zinc and B vitamins."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Isolate Blend",
          "38g powder",
          "150 kcal",
          "8.5%",
          "Optimal standalone formula"
        ],
        [
          "Soy Protein Isolate",
          "40g powder",
          "155 kcal",
          "7.7%",
          "Standalone complete"
        ],
        [
          "Lupin Flour Flakes",
          "90g dry",
          "290 kcal",
          "7.9%",
          "Bake into high-protein bread"
        ],
        [
          "Firm Tofu + Hemp Hearts",
          "200g tofu + 25g hemp",
          "320 kcal",
          "7.6%",
          "Balanced complete meal"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Does soy protein lower thyroid or increase estrogen in women?",
        "answer": "No. Meta-analyses of human clinical trials show that moderate soy consumption (2–3 servings daily) has no negative effect on thyroid hormones or circulating estradiol."
      },
      {
        "question": "What is an ideal natural FFMI for an athletic woman at 155 lbs?",
        "answer": "An FFMI between 19.0 and 20.5 represents an advanced level of muscularity for a drug-free female athlete."
      }
    ]
  },
  {
    "slug": "160-lb-male-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 160 lb Male",
    "metaDescription": "Optimize muscle protein synthesis on a vegan diet for a 160 lb male. Calculate plant protein doses for 3.0g leucine and evaluate natural FFMI.",
    "badge": "Vegan Bodybuilding • Leucine Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (160 lb Male)",
    "subtitle": "High-performance plant protein kinetics for a 72.6 kg (160 lb) male: 3.0g leucine trigger, 155g daily protein, and natural FFMI analysis.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 25,
      "weightKg": 72.57477926086054,
      "heightCm": 172.7,
      "bodyFatPct": 15,
      "formula": "katch",
      "activityLevel": "active",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2200,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 160 lb vegan male (15% body fat, 136.0 lb LBM, FFMI 21.0) must ingest 36g of pea-rice isolate or 380g cooked lentils per feeding to hit 3.0g leucine. Consume 155g plant protein daily across four boluses to match the anabolic stimulus of an omnivorous whey-based diet.",
    "clinicalSummary": "At 160 lbs and 15% body fat, this male possesses 136.0 lbs of Lean Body Mass with an FFMI of 21.0. To maximize natural hypertrophic gains on a plant-based diet, distributing 155g protein into 4 servings of ~39g each ensures consistent 3.0g leucine pulses throughout the day.",
    "keyTakeaways": [
      "Ingest 36g–39g plant protein per feeding to trigger muscle protein synthesis.",
      "Divide 155g total plant protein across 4 evenly spaced meals.",
      "Supplement 5g daily creatine monohydrate, as plant-based diets contain zero dietary creatine."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Protein (70:30)",
          "36g powder",
          "140 kcal",
          "8.8%",
          "Complete standalone blend"
        ],
        [
          "Soy Protein Isolate",
          "39g powder",
          "150 kcal",
          "7.8%",
          "Complete standalone"
        ],
        [
          "Cooked Brown Lentils",
          "390g cooked",
          "450 kcal",
          "6.6%",
          "Pair with brown basmati rice"
        ],
        [
          "Extra Firm Tofu",
          "310g raw",
          "260 kcal",
          "7.3%",
          "Pair with quinoa & broccoli"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Why should vegan lifters take creatine monohydrate?",
        "answer": "Creatine is found exclusively in meat and fish. Studies show vegans experience even greater improvements in strength and muscle volume upon creatine supplementation due to lower baseline muscle stores."
      },
      {
        "question": "What is an elite natural FFMI for a 160 lb male?",
        "answer": "An FFMI of 21.0 to 22.5 represents a dedicated, highly trained natural lifter near their genetic muscular potential at 5'8\"."
      }
    ]
  },
  {
    "slug": "175-lb-male-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 175 lb Male",
    "metaDescription": "Vegan bodybuilding macro and leucine calculator for a 175 lb male. Build muscle naturally with 170g plant protein and 3.0g leucine per meal.",
    "badge": "Vegan Bodybuilding • Leucine Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (175 lb Male)",
    "subtitle": "Anabolic plant protein kinetics for a 79.4 kg (175 lb) male athlete: 3.0g leucine trigger, 170g plant protein floor, and FFMI tracking.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 29,
      "weightKg": 79.3786648165662,
      "heightCm": 177.8,
      "bodyFatPct": 16,
      "formula": "katch",
      "activityLevel": "active",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2350,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 175 lb plant-based male (16% body fat, 147.0 lb LBM, FFMI 21.8) requires 39g of blended plant protein per meal to surpass the 3.0g leucine trigger. Target 170g total plant protein daily split into four servings to stimulate mTORC1 phosphorylation and sustain natural muscular development.",
    "clinicalSummary": "Carrying 147.0 lbs of Lean Body Mass, a 175 lb male lifter requires 170g of daily protein. Because plant proteins have slightly lower bioavailability and leucine density, consuming 39g per feeding ensures that plasma leucine concentrations cross the anabolic trigger threshold.",
    "keyTakeaways": [
      "Hit 39g plant protein per feeding to trigger muscle protein synthesis.",
      "Distribute 170g protein across 4 distinct meals throughout the day.",
      "Combine grain and legume proteins to maintain balanced essential amino acid profiles."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Protein (70:30)",
          "39g powder",
          "155 kcal",
          "8.7%",
          "Complete standalone formula"
        ],
        [
          "Soy Protein Isolate",
          "41g powder",
          "160 kcal",
          "7.7%",
          "Complete standalone"
        ],
        [
          "Tempeh (Fermented Soy)",
          "270g cooked",
          "470 kcal",
          "7.5%",
          "Pair with whole grains"
        ],
        [
          "Seitan + Nutritional Yeast",
          "45g seitan + 20g yeast",
          "210 kcal",
          "7.4%",
          "High-lysine pairing"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Do plant proteins cause more bloating than whey isolate?",
        "answer": "Whole legumes can cause temporary gas due to oligosaccharides. Plant protein isolates (pea and rice) filter out carbohydrates and fibers, eliminating bloating."
      },
      {
        "question": "How does an FFMI of 21.8 compare to average lifters?",
        "answer": "An FFMI of 21.8 places a 175 lb male in the top 5% of natural gym trainees, reflecting exceptional drug-free muscular development."
      }
    ]
  },
  {
    "slug": "190-lb-male-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 190 lb Male",
    "metaDescription": "Hit the 3.0g leucine threshold on a plant-based diet for a 190 lb male. FFMI calculation, plant protein comparisons, and anabolic meal dosing.",
    "badge": "Vegan Bodybuilding • Leucine Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (190 lb Male)",
    "subtitle": "Heavyweight plant protein kinetics for an 86.2 kg (190 lb) male lifter: 3.0g leucine trigger, 185g protein floor, and FFMI assessment.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 33,
      "weightKg": 86.18255037227188,
      "heightCm": 180.3,
      "bodyFatPct": 17,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2500,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 190 lb vegan male (17% body fat, 157.7 lb LBM, FFMI 22.4) must consume 42g of plant protein per feeding to trigger 3.0g of leucine. Hit 185g plant protein daily divided across four meals, utilizing pea-soy isolates and whole grain pairings to equal animal protein biological value.",
    "clinicalSummary": "A 190 lb male possessing 157.7 lbs of Lean Body Mass requires high-density plant nutrition. Targeting 185g protein daily split into 4 servings of ~46g each provides ample branched-chain amino acids to stimulate myofibrillar protein synthesis in heavy compound training.",
    "keyTakeaways": [
      "Ingest 42g plant protein per feeding to surpass the 3.0g leucine trigger.",
      "Target 185g plant protein daily across 4 balanced meals.",
      "Supplement 5g creatine monohydrate and 3g beta-alanine daily to support anaerobic capacity."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Blend (70:30)",
          "42g powder",
          "165 kcal",
          "8.6%",
          "Complete standalone formula"
        ],
        [
          "Soy Protein Isolate",
          "44g powder",
          "170 kcal",
          "7.7%",
          "Complete standalone"
        ],
        [
          "Extra Firm Tofu",
          "340g cooked",
          "290 kcal",
          "7.3%",
          "Pair with jasmine rice & tamari"
        ],
        [
          "Black Bean + Quinoa Bowl",
          "420g cooked",
          "480 kcal",
          "6.8%",
          "Complete whole food pairing"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Can a 190 lb male build substantial muscle without meat?",
        "answer": "Yes. Numerous elite natural bodybuilders compete at 190+ lbs on plant-based diets by anchoring protein at 1.8g–2.2g/kg and hitting 3.0g leucine per feeding."
      },
      {
        "question": "What is the natural FFMI ceiling for a 190 lb male?",
        "answer": "A normalized FFMI of 25.0 represents the statistical threshold of natural muscularity established by Kouri et al. An FFMI of 22.4 indicates an advanced, highly muscular build."
      }
    ]
  },
  {
    "slug": "205-lb-male-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 205 lb Male",
    "metaDescription": "Advanced vegan bodybuilding protocol for a 205 lb male. Exact plant protein portions to hit 3.0g leucine and maximize drug-free FFMI growth.",
    "badge": "Vegan Bodybuilding • Leucine Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (205 lb Male)",
    "subtitle": "Advanced plant protein strategy for a 93.0 kg (205 lb) male athlete: 3.0g leucine trigger, 195g plant protein, and natural FFMI analysis.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 37,
      "weightKg": 92.98643592797755,
      "heightCm": 182.9,
      "bodyFatPct": 19,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2650,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 205 lb plant-based male (19% body fat, 166.1 lb LBM, FFMI 23.1) needs 44g of blended plant protein per serving to achieve 3.0g leucine. Consume 195g total plant protein daily across four structured feedings, leveraging fortified plant isolates to support elite natural muscular hypertrophy.",
    "clinicalSummary": "With 166.1 lbs of Lean Body Mass and an FFMI of 23.1, this 205 lb athlete operates near the elite tier of natural muscularity. Consuming 195g plant protein divided into 4 servings of ~49g ensures that circulating amino acid levels remain optimal for repair and myofibrillar growth.",
    "keyTakeaways": [
      "Consume 44g plant protein per feeding to deliver 3.0g of L-leucine.",
      "Hit 195g total plant protein daily across 4 substantial meals.",
      "Supplement 5g creatine monohydrate and 2,000 IU vitamin D3 daily."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Blend (70:30)",
          "44g powder",
          "175 kcal",
          "8.6%",
          "Complete standalone formula"
        ],
        [
          "Soy Protein Isolate",
          "46g powder",
          "180 kcal",
          "7.7%",
          "Complete standalone"
        ],
        [
          "Tempeh (Pan-Fried)",
          "300g cooked",
          "510 kcal",
          "7.4%",
          "Pair with buckwheat or rice"
        ],
        [
          "Seitan + Pea Protein",
          "50g seitan + 20g pea",
          "240 kcal",
          "7.8%",
          "Complete amino acid balance"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "How do I avoid excessive calories when eating 195g vegan protein?",
        "answer": "Incorporate 2 plant protein isolate shakes daily (delivering 60g–70g protein in under 300 calories) alongside low-fat whole foods like tofu and seitan."
      },
      {
        "question": "What does an FFMI of 23.1 indicate?",
        "answer": "An FFMI of 23.1 denotes exceptional muscularity that is achievable naturally through years of progressive overload training and disciplined nutrition."
      }
    ]
  },
  {
    "slug": "220-lb-male-vegan-leucine-calculator",
    "title": "Plant-Based Leucine & FFMI Calculator for a 220 lb Male",
    "metaDescription": "Heavyweight plant-based leucine and FFMI calculator for a 220 lb male. Optimize anabolic response with 46g plant protein servings and 205g daily target.",
    "badge": "Vegan Bodybuilding • Leucine Lab",
    "h1": "Plant-Based Leucine & FFMI Protocol (220 lb Male)",
    "subtitle": "Heavyweight plant-based nutrition strategy for a 99.8 kg (220 lb) male: 3.0g leucine trigger, 205g plant protein floor, and FFMI tracking.",
    "category": "vegan",
    "defaultTab": "ffmi",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 40,
      "weightKg": 99.79032148368323,
      "heightCm": 185.4,
      "bodyFatPct": 21,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 5,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2800,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 0,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "plant_based"
    },
    "directClinicalAnswer": "A 220 lb vegan male (21% body fat, 173.8 lb LBM, FFMI 23.6) must consume 46g of plant protein per feeding to exceed the 3.0g leucine threshold. Ingest 205g plant protein daily across four distinct meals, combining varied plant sources to achieve maximal muscle protein synthesis efficiency.",
    "clinicalSummary": "At 220 lbs with 173.8 lbs of Lean Body Mass and an FFMI of 23.6, this heavyweight lifter has high amino acid requirements. Hitting 205g daily protein through a combination of pea-rice isolates, soy, tempeh, and seitan ensures optimal nitrogen balance and tissue recovery.",
    "keyTakeaways": [
      "Ingest 46g plant protein per feeding to comfortably exceed the 3.0g leucine threshold.",
      "Maintain 205g total plant protein daily across 4 structured meals.",
      "Drink 4.0 liters of fluids daily to support high-protein nitrogen clearance."
    ],
    "tableData": {
      "headers": [
        "Protein Source",
        "Serving for 3.0g Leucine",
        "Calories",
        "Leucine %",
        "Complementary Pairing"
      ],
      "rows": [
        [
          "Pea/Rice Blend (70:30)",
          "46g powder",
          "180 kcal",
          "8.6%",
          "Complete standalone formula"
        ],
        [
          "Soy Protein Isolate",
          "48g powder",
          "190 kcal",
          "7.7%",
          "Complete standalone"
        ],
        [
          "Extra Firm Tofu",
          "360g cooked",
          "310 kcal",
          "7.3%",
          "Pair with brown rice"
        ],
        [
          "Tempeh + Edamame",
          "220g tempeh + 100g edamame",
          "480 kcal",
          "7.6%",
          "High-protein whole food"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "24284442",
        "citation": "Churchward-Venne TA, et al. Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men: a double-blind, randomized trial. Am J Clin Nutr. 2014.",
        "title": "Leucine supplementation of a low-protein mixed macronutrient beverage enhances myofibrillar protein synthesis in young men",
        "journal": "Am J Clin Nutr",
        "year": 2014,
        "url": "https://pubmed.ncbi.nlm.nih.gov/24284442/"
      },
      {
        "pmid": "29497353",
        "citation": "Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018.",
        "title": "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
        "journal": "J Int Soc Sports Nutr",
        "year": 2018,
        "url": "https://pubmed.ncbi.nlm.nih.gov/29497353/"
      }
    ],
    "faq": [
      {
        "question": "Can a heavyweight strength athlete compete on a plant-based diet?",
        "answer": "Yes. World-record holding powerlifters and strongmen have successfully competed on vegan diets by maintaining high protein targets and supplementing creatine monohydrate."
      },
      {
        "question": "How do I reach 4.0 liters of hydration comfortably?",
        "answer": "Drink 500ml upon waking, 750ml with each of your 4 meals, and 1.0 liter during your training session to maintain high intracellular fluid volume."
      }
    ]
  },
  {
    "slug": "140-lb-female-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 140 lb Female",
    "metaDescription": "Daily sodium, potassium, magnesium, water, and creatine monohydrate dosing for an active 140 lb female lifter or sauna user.",
    "badge": "Hydration & Electrolytes • Creatine Lab",
    "h1": "Creatine & Sweat Electrolyte Protocol (140 lb Female)",
    "subtitle": "Precision mineral and fluid replacement for a 63.5 kg (140 lb) female athlete: 5g creatine, 3,400mg sodium, and 2.8L water.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 28,
      "weightKg": 63.50293185325297,
      "heightCm": 162.6,
      "bodyFatPct": 22,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1750,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "moderate",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 2,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "An active 140 lb female (22% body fat, 109.2 lb LBM) requires 5g of creatine monohydrate daily to saturate muscle phosphocreatine without loading. Supplement 3,400mg sodium, 800mg potassium, and 350mg magnesium alongside 2.8 liters of total fluids to prevent cramping and sustain cellular hydration.",
    "clinicalSummary": "Creatine monohydrate draws water intracellularly into skeletal muscle fibers, increasing cellular osmolarity and stimulating muscle protein synthesis. For a 140 lb female with regular sauna and resistance training, sweat sodium losses require 3,400mg sodium and 2.8L fluids daily to prevent hyponatremia and sustain workout performance.",
    "keyTakeaways": [
      "Take 5g of micronized creatine monohydrate daily with water or carbohydrates.",
      "Replenish 3,400mg sodium daily (equivalent to ~1.5 teaspoons of salt from food and supplements).",
      "Consume 400mg sodium 30 minutes before workout or sauna sessions to maintain stroke volume."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "5g daily",
          "Post-workout or morning",
          "Saturates Phosphocreatine Stores"
        ],
        [
          "Sodium (Na+)",
          "3,400mg daily",
          "Pre-workout & with meals",
          "Plasma Volume & Nerve Conduction"
        ],
        [
          "Potassium (K+)",
          "800mg supplemental",
          "With meals (food sources)",
          "Intracellular Fluid Balance"
        ],
        [
          "Magnesium (Mg2+)",
          "350mg elemental",
          "Evening before bed",
          "Muscle Relaxation & ATP Binding"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "Will creatine make a 140 lb female look bloated or puffy?",
        "answer": "No. Creatine draws water inside skeletal muscle cells (intracellular hydration), not under the skin (subcutaneous water). It makes muscles look firmer, not bloated."
      },
      {
        "question": "Do I need a high-dose loading phase for creatine?",
        "answer": "No. Taking 5g daily reaches full intramuscular phosphocreatine saturation within 21 to 28 days with zero gastrointestinal distress."
      }
    ]
  },
  {
    "slug": "155-lb-female-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 155 lb Female",
    "metaDescription": "Evidence-based fluid and electrolyte protocol for a 155 lb female doing sauna and resistance training. Creatine, sodium, potassium, and magnesium dosing.",
    "badge": "Hydration & Electrolytes • Creatine Lab",
    "h1": "Creatine & Sweat Electrolyte Protocol (155 lb Female)",
    "subtitle": "Clinical mineral and fluid replacement for a 70.3 kg (155 lb) female: 5g creatine, 3,800mg sodium, and 3.2L total fluids.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "female",
      "age": 33,
      "weightKg": 70.30681740895864,
      "heightCm": 165.1,
      "bodyFatPct": 25,
      "formula": "katch",
      "activityLevel": "moderate",
      "trainingDaysPerWeek": 4,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 1850,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 60,
      "saunaSessionsPerWeek": 2,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 155 lb female (25% body fat, 116.3 lb LBM) training 4 days weekly with regular sauna sessions needs 5g creatine monohydrate daily. Ingest 3,800mg sodium, 900mg potassium, 380mg magnesium, and 3.2 liters of fluids daily to counter sweat sodium losses and support athletic power output.",
    "clinicalSummary": "Heavy sweat sessions from lifting and 2 weekly sauna exposures accelerate electrolyte excretion. For a 155 lb woman, consuming 3,800mg sodium and 3.2L water prevents heat fatigue and hypovolemia, while 5g creatine maintains cellular ATP resynthesis during anaerobic bouts.",
    "keyTakeaways": [
      "Take 5g creatine monohydrate daily to maintain full phosphagen stores.",
      "Drink 3.2 liters of water daily, adding electrolytes during and after sweat sessions.",
      "Take 380mg magnesium glycinate in the evening to optimize deep sleep and prevent calf cramps."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "5g daily",
          "Any consistent daily time",
          "Cellular Energy & Phosphocreatine"
        ],
        [
          "Sodium (Na+)",
          "3,800mg daily",
          "Divided across meals & pre-sauna",
          "Restores Heavy Sweat Losses"
        ],
        [
          "Potassium (K+)",
          "900mg supplemental",
          "With meals and leafy greens",
          "Counterbalances Sodium Intake"
        ],
        [
          "Magnesium (Mg2+)",
          "380mg elemental",
          "Nightly before sleep",
          "Enzyme Activation & Neural Calming"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "How much water should I drink after a 20-minute sauna session?",
        "answer": "Drink roughly 500ml to 750ml of water with 300mg to 500mg of sodium for every 15–20 minutes spent in a traditional or infrared sauna."
      },
      {
        "question": "Can I mix creatine into hot tea or coffee?",
        "answer": "Yes. Creatine monohydrate is heat-stable in hot liquids for the time it takes to drink them, and dissolves more rapidly in warm beverages."
      }
    ]
  },
  {
    "slug": "170-lb-male-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 170 lb Male",
    "metaDescription": "Electrolyte replacement and creatine dosing for a 170 lb male athlete. Maintain plasma volume and intracellular hydration with exact sodium and water targets.",
    "badge": "Athlete Hydration • Electrolyte Science",
    "h1": "Creatine & Sweat Electrolyte Protocol (170 lb Male)",
    "subtitle": "Athletic mineral and fluid blueprint for a 77.1 kg (170 lb) male lifter: 5g creatine, 4,000mg sodium, and 3.6L hydration.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 26,
      "weightKg": 77.11070296466431,
      "heightCm": 175.3,
      "bodyFatPct": 15,
      "formula": "katch",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2350,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 75,
      "saunaSessionsPerWeek": 2,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 170 lb male athlete (15% body fat, 144.5 lb LBM) requires 5g of micronized creatine monohydrate daily for complete muscular saturation. Ingest 4,000mg sodium, 1,000mg supplemental potassium, 400mg elemental magnesium, and 3.6 liters of water daily to maintain plasma volume during intensive weight training.",
    "clinicalSummary": "Heavy resistance training and sweat losses deplete up to 1,500mg sodium per hour of exercise. For a 170 lb male with 144.5 lbs LBM, maintaining 4,000mg total sodium preserves extracellular fluid volume and prevents premature workout exhaustion, while 5g creatine maximizes phosphagen resynthesis.",
    "keyTakeaways": [
      "Take 5g micronized creatine monohydrate daily to sustain muscle saturation.",
      "Consume 500mg sodium + 500ml water 30 minutes pre-workout to maximize intra-muscular pump.",
      "Drink 3.6 liters of total fluids daily to match high metabolic turnover."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "5g daily",
          "Post-workout or morning",
          "Maintains Phosphocreatine Saturation"
        ],
        [
          "Sodium (Na+)",
          "4,000mg daily",
          "Pre-workout & meal salt",
          "Sustains Stroke Volume & Blood Pressure"
        ],
        [
          "Potassium (K+)",
          "1,000mg supplemental",
          "Dietary potatoes, fruit, greens",
          "Restores Intracellular Ionic Gradient"
        ],
        [
          "Magnesium (Mg2+)",
          "400mg elemental",
          "Nightly before sleep",
          "Neuromuscular Function & Muscle Recovery"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "Should I take creatine before or after my workout at 170 lbs?",
        "answer": "While daily consistency is what matters most, Antonio & Ciccone (2013) found slightly superior lean mass gains when creatine was consumed immediately post-workout with carbohydrates and protein."
      },
      {
        "question": "How do I know if I am low on sodium during training?",
        "answer": "Warning signs of sodium deficiency include lightheadedness upon standing between sets, weak muscular pump, muscle twitching or cramping, and persistent post-workout headaches."
      }
    ]
  },
  {
    "slug": "185-lb-male-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 185 lb Male",
    "metaDescription": "Clinical electrolyte and creatine protocol for a 185 lb male lifter. Counter heavy sweat rates and sauna exposure with precision mineral targets.",
    "badge": "Athlete Hydration • Electrolyte Science",
    "h1": "Creatine & Sweat Electrolyte Protocol (185 lb Male)",
    "subtitle": "Heavy-sweat hydration strategy for an 83.9 kg (185 lb) male athlete: 5g creatine, 4,300mg sodium, and 3.8L fluids.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 31,
      "weightKg": 83.91458852036999,
      "heightCm": 177.8,
      "bodyFatPct": 16,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2500,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 75,
      "saunaSessionsPerWeek": 3,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 185 lb male lifter (16% body fat, 155.4 lb LBM) using saunas 3 times weekly needs 5g daily creatine monohydrate. Replenish 4,300mg sodium, 1,100mg potassium, 400mg bioavailable magnesium, and 3.8 liters of total fluids to prevent hyponatremia and optimize intracellular water retention.",
    "clinicalSummary": "Carrying 155.4 lbs of Lean Body Mass, a 185 lb male loses substantial minerals during heavy lifting and repeated sauna sessions. Ingesting 4,300mg sodium and 3.8L fluids preserves plasma volume and athletic power output, while 5g creatine monohydrate sustains rapid ATP replenishment.",
    "keyTakeaways": [
      "Take 5g creatine monohydrate daily to maintain full phosphocreatine reserves.",
      "Consume 4,300mg sodium daily across meals and intra-workout electrolyte drinks.",
      "Drink 3.8 liters of water daily to match heavy sweat and sauna losses."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "5g daily",
          "Post-workout with carbs",
          "Increases Cellular Phosphagen Stores"
        ],
        [
          "Sodium (Na+)",
          "4,300mg daily",
          "Evenly across waking hours",
          "Extracellular Osmotic Balance"
        ],
        [
          "Potassium (K+)",
          "1,100mg supplemental",
          "Dietary fruits and potatoes",
          "Neuromuscular Repolarization"
        ],
        [
          "Magnesium (Mg2+)",
          "400mg elemental",
          "Nightly before bed",
          "Supports Protein Synthesis & Sleep"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "Will 4,300mg sodium raise my blood pressure as an active lifter?",
        "answer": "No. Active athletes who sweat heavily lose large quantities of sodium. In athletic populations, adequate sodium intake actually normalizes cardiovascular hemodynamics and preserves kidney perfusion."
      },
      {
        "question": "What form of magnesium is best for athletes?",
        "answer": "Magnesium glycinate or magnesium malate offer superior bioavailability and muscle uptake without causing the laxative effect common with magnesium oxide."
      }
    ]
  },
  {
    "slug": "190-lb-athlete-creatine-electrolyte-loading",
    "title": "Creatine Loading, Hydration & Sauna Electrolyte Calculator (190 lb Athlete)",
    "metaDescription": "Precision daily sodium, potassium, magnesium, water, and creatine monohydrate dosing for a 190 lb strength or keto athlete.",
    "badge": "Hydration, Sauna & Keto Lab",
    "h1": "Creatine & Sweat Electrolyte Protocol (190 lb Athlete)",
    "subtitle": "Exact intracellular water and mineral replacement for heavy training, sauna sessions, and low-carb/keto metabolic states.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 35,
      "weightKg": 86.18255037227188,
      "heightCm": 180.3,
      "bodyFatPct": 14,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2600,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 75,
      "saunaSessionsPerWeek": 3,
      "isKetoOrLowCarb": true,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 190 lb keto or strength athlete (14% body fat, 163.4 lb LBM) needs 6g of creatine monohydrate daily to support phosphagen resynthesis. Consume 4,500mg sodium, 1,150mg potassium, 420mg magnesium, and 4.0 liters of fluids to offset keto natriuresis and heavy sweat mineral depletions.",
    "clinicalSummary": "Creatine monohydrate draws water intracellularly into skeletal muscle fibers, while heavy sweating and low-insulin/keto states accelerate renal sodium and potassium excretion. Without calibrated sodium (4,500mg) and fluid intake, athletes experience cramping, orthostatic fatigue, and plateaued power output.",
    "keyTakeaways": [
      "Skip high-dose GI-distressing loading: 6g/day of micronized creatine saturates muscle stores within 21–28 days.",
      "Consume 500–750mg Sodium + 16 oz water 30 minutes pre-workout or pre-sauna to preserve plasma volume.",
      "Supplement 420mg bioavailable magnesium before sleep to prevent keto-induced nocturnal muscle cramps."
    ],
    "tableData": {
      "headers": [
        "Nutrient / Mineral",
        "Daily Target Dose",
        "Timing & Delivery",
        "Hydration Mechanism"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "6g daily",
          "Post-workout or morning",
          "Maximizes Phosphagen & Cell Swelling"
        ],
        [
          "Sodium (Na+)",
          "4,500mg daily",
          "Pre-workout & meal seasoning",
          "Prevents Keto Natriuresis & Fatigue"
        ],
        [
          "Potassium (K+)",
          "1,150mg daily",
          "Avocados, spinach, potassium salt",
          "Intracellular Osmotic Balance"
        ],
        [
          "Magnesium (Mg2+)",
          "420mg daily",
          "Evening before sleep",
          "Neuromuscular Recovery & Sleep Quality"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "How much extra water do I need when taking 5g–6g of creatine?",
        "answer": "An additional 12–16 fl oz (350–500 ml) of water daily on top of your baseline 35 ml/kg body weight + sweat replacement needs."
      },
      {
        "question": "Why do keto athletes lose so much sodium?",
        "answer": "Low carbohydrate intake suppresses insulin, triggering the kidneys to excrete large amounts of sodium and water in a process known as the natriuresis of fasting/ketosis."
      }
    ]
  },
  {
    "slug": "205-lb-male-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 205 lb Male",
    "metaDescription": "Hydration and mineral optimization for a 205 lb male athlete. Maintain stroke volume and muscular endurance with 6g creatine and 4,800mg sodium.",
    "badge": "Heavyweight Hydration • Electrolyte Science",
    "h1": "Creatine & Sweat Electrolyte Protocol (205 lb Male)",
    "subtitle": "High-capacity hydration and mineral protocol for a 93.0 kg (205 lb) male strength athlete: 6g creatine, 4,800mg sodium, and 4.2L fluids.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 34,
      "weightKg": 92.98643592797755,
      "heightCm": 182.9,
      "bodyFatPct": 17,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2700,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 80,
      "saunaSessionsPerWeek": 3,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 205 lb male athlete (17% body fat, 170.2 lb LBM) engaging in intense resistance training requires 6g creatine monohydrate daily. Replenish with 4,800mg sodium, 1,200mg potassium, 440mg magnesium, and 4.2 liters of water daily to maintain plasma volume and sustain muscular peak torque.",
    "clinicalSummary": "With 170.2 lbs of Lean Body Mass, a 205 lb male generates substantial metabolic heat and sweat during training. Consuming 4,800mg sodium and 4.2L water prevents cardiovascular drift and maintains stroke volume, while 6g creatine monohydrate supports high-intensity mechanical workload.",
    "keyTakeaways": [
      "Take 6g micronized creatine monohydrate daily with plenty of water.",
      "Replenish 4,800mg sodium daily through food salting and electrolyte supplementation.",
      "Drink 4.2 liters of fluids daily to support high lean body mass hydration."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "6g daily",
          "Post-workout or morning",
          "Maintains Phosphocreatine Saturation"
        ],
        [
          "Sodium (Na+)",
          "4,800mg daily",
          "Divided through the day & workout",
          "Maintains Cardiac Output & Pump"
        ],
        [
          "Potassium (K+)",
          "1,200mg supplemental",
          "Dietary whole foods & salt substitutes",
          "Supports Intracellular Electronegativity"
        ],
        [
          "Magnesium (Mg2+)",
          "440mg elemental",
          "Nightly before bed",
          "Muscle Spasm Prevention & Sleep"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "Why does a 205 lb male need 6g creatine instead of 3g–5g?",
        "answer": "Athletes carrying over 160 lbs of Lean Body Mass have larger total muscle creatine capacity and turn over more creatine daily, benefiting from a 6g to 7g maintenance dose."
      },
      {
        "question": "Can I drink too much water without electrolytes?",
        "answer": "Yes. Consuming high water volumes without adequate sodium dilutes plasma electrolytes, causing exercise-associated hyponatremia, weakness, and cramping."
      }
    ]
  },
  {
    "slug": "220-lb-male-creatine-electrolyte-protocol",
    "title": "Creatine Loading & Electrolyte Hydration for a 220 lb Male",
    "metaDescription": "High-output electrolyte and creatine protocol for a 220 lb male strength athlete. Counter sauna fluid losses with 5,000mg sodium and 4.5L water.",
    "badge": "Heavyweight Hydration • Electrolyte Science",
    "h1": "Creatine & Sweat Electrolyte Protocol (220 lb Male)",
    "subtitle": "Comprehensive hydration blueprint for a 99.8 kg (220 lb) strength athlete: 6g creatine, 5,000mg sodium, and 4.5L water.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 38,
      "weightKg": 99.79032148368323,
      "heightCm": 185.4,
      "bodyFatPct": 19,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 2850,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 90,
      "saunaSessionsPerWeek": 3,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 220 lb strength athlete (19% body fat, 178.2 lb LBM) undergoing high sweat training requires 6g creatine monohydrate daily. Ingest 5,000mg sodium, 1,300mg potassium, 450mg magnesium, and 4.5 liters of fluids daily to preserve extracellular osmotic balance and prevent muscular fatigue during intense sets.",
    "clinicalSummary": "A 220 lb strength athlete with 178.2 lbs LBM experiences substantial fluid shifts and mineral losses during 90-minute training and post-workout sauna sessions. Supplementing 5,000mg sodium and 4.5L water protects blood volume and reduces central fatigue, while 6g creatine ensures high phosphagen turnover.",
    "keyTakeaways": [
      "Take 6g creatine monohydrate daily to sustain muscle saturation.",
      "Replenish 5,000mg sodium daily through liberal salting and pre-workout electrolytes.",
      "Drink 4.5 liters of total fluids to balance high sweat rates and sauna usage."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "6g daily",
          "Post-workout with carbohydrates",
          "Supports High Anaerobic Power"
        ],
        [
          "Sodium (Na+)",
          "5,000mg daily",
          "Meals, intra-workout & pre-sauna",
          "Guards Plasma Volume & Osmolarity"
        ],
        [
          "Potassium (K+)",
          "1,300mg supplemental",
          "Whole food potatoes, greens, beans",
          "Maintains Cellular Fluid Gradient"
        ],
        [
          "Magnesium (Mg2+)",
          "450mg elemental",
          "Nightly before sleep",
          "Reduces Myocellular Twitching & Cramps"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "How do I take 5,000mg of sodium without stomach upset?",
        "answer": "Spread sodium across 4 whole-food meals and utilize sodium citrate or sodium chloride dissolved in intra-workout fluids rather than taking large single boluses."
      },
      {
        "question": "Does sauna use interfere with creatine absorption?",
        "answer": "No. In fact, increased post-sauna blood flow enhances nutrient delivery to skeletal muscle tissue when creatine is consumed shortly after cooling down."
      }
    ]
  },
  {
    "slug": "240-lb-strength-athlete-electrolyte-protocol",
    "title": "Creatine & Electrolyte Protocol for a 240 lb Strength Athlete",
    "metaDescription": "Heavyweight strength athlete electrolyte and creatine guide for a 240 lb male. Maintain maximum hydrational fullness with 7g creatine and 5,400mg sodium.",
    "badge": "Heavyweight Hydration • Maximum Power",
    "h1": "Creatine & Sweat Electrolyte Protocol (240 lb Athlete)",
    "subtitle": "High-output fluid and mineral strategy for a 108.9 kg (240 lb) strength athlete: 7g creatine, 5,400mg sodium, and 5.0L hydration.",
    "category": "electrolytes",
    "defaultTab": "electrolytes",
    "biometrics": {
      "unitSystem": "imperial",
      "sex": "male",
      "age": 36,
      "weightKg": 108.86216889129079,
      "heightCm": 188,
      "bodyFatPct": 21,
      "formula": "cunningham",
      "activityLevel": "active",
      "trainingDaysPerWeek": 5,
      "trainingDaySurplusPct": 3,
      "restDayDeficitPct": -15,
      "proteinPerLbLbm": 1.15,
      "currentDietCalories": 3000,
      "reverseStepKcal": 80,
      "glp1Medication": "semaglutide",
      "glp1DoseStage": "titration",
      "appetiteSuppressionLevel": "moderate",
      "sweatIntensity": "heavy",
      "workoutMinutes": 90,
      "saunaSessionsPerWeek": 3,
      "isKetoOrLowCarb": false,
      "mealsPerDay": 4,
      "perimenopauseStage": "early_transition",
      "fastingProtocol": "16:8",
      "fastingEatingWindowStartHour": 12,
      "fastingWindowStartHour": 12,
      "dietPreference": "omnivore"
    },
    "directClinicalAnswer": "A 240 lb strength athlete (21% body fat, 189.6 lb LBM) demands 7g of creatine monohydrate daily to saturate heavy muscular mass. Consume 5,400mg sodium, 1,400mg potassium, 480mg magnesium, and 5.0 liters of fluids daily to counter severe exercise fluid losses and maximize mechanical force transmission.",
    "clinicalSummary": "Carrying nearly 190 lbs of Lean Body Mass, a 240 lb strength athlete moves substantial loads that demand rapid ATP resynthesis and high blood pressure stability. Consuming 5,400mg sodium and 5.0L fluids provides optimal muscular turgor and plasma volume during high-volume strength cycles.",
    "keyTakeaways": [
      "Take 7g of creatine monohydrate daily to saturate large skeletal muscle mass.",
      "Replenish 5,400mg sodium daily across meals and intra-workout drinks.",
      "Drink 5.0 liters of fluids daily to match high perspiration and metabolic filtration rates."
    ],
    "tableData": {
      "headers": [
        "Mineral / Fluid",
        "Target Dose",
        "Timing Strategy",
        "Mechanistic Action"
      ],
      "rows": [
        [
          "Creatine Monohydrate",
          "7g daily",
          "Post-workout or morning shake",
          "Saturates Heavy Muscle Phosphagen"
        ],
        [
          "Sodium (Na+)",
          "5,400mg daily",
          "Meals, intra-workout & pre-sauna",
          "Maximizes Plasma Volume & Fullness"
        ],
        [
          "Potassium (K+)",
          "1,400mg supplemental",
          "Potatoes, bananas, spinach, salt",
          "Balances High Extracellular Sodium"
        ],
        [
          "Magnesium (Mg2+)",
          "480mg elemental",
          "Nightly before sleep",
          "Prevents Night Cramps & Relaxes Nerves"
        ]
      ]
    },
    "pmidCitations": [
      {
        "pmid": "12701815",
        "citation": "Kreider RB. Effects of creatine supplementation on performance and training adaptations. Mol Cell Biochem. 2003.",
        "title": "Effects of creatine supplementation on performance and training adaptations",
        "journal": "Mol Cell Biochem",
        "year": 2003,
        "url": "https://pubmed.ncbi.nlm.nih.gov/12701815/"
      },
      {
        "pmid": "10919961",
        "citation": "Sawka MN, Montain SJ. Fluid and electrolyte supplementation for exercise heat stress. Am J Clin Nutr. 2000.",
        "title": "Fluid and electrolyte supplementation for exercise heat stress",
        "journal": "Am J Clin Nutr",
        "year": 2000,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10919961/"
      }
    ],
    "faq": [
      {
        "question": "Why do heavyweight lifters need 7g of creatine instead of 5g?",
        "answer": "Creatine storage is directly proportional to total skeletal muscle mass. Athletes with 180+ lbs of Lean Body Mass turn over significantly more creatine daily and maintain higher saturation on 7g."
      },
      {
        "question": "What is the best way to consume 5.0 liters of water daily?",
        "answer": "Drink 1 liter upon waking, 1.5 liters during training, and distribute the remaining 2.5 liters across your 4 meals and throughout the afternoon."
      }
    ]
  }
];

export function getPresetBySlug(slug: string): SeoPreset | undefined {
  return SEO_PRESETS.find((p) => p.slug === slug);
}

export function getPresetsByCategory(category: PresetCategory): SeoPreset[] {
  return SEO_PRESETS.filter((p) => p.category === category);
}

export function buildBiometricsFromPreset(preset: SeoPreset): UserBiometrics {
  return {
    ...DEFAULT_BIOMETRICS,
    ...preset.biometrics,
  };
}
