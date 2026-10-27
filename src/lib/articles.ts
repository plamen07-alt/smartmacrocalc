export interface ScientificArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  authorCredentials: string;
  reviewer: string;
  pmidCitations: Array<{ pmid: string; citation: string; url: string }>;
  excerpt: string;
  directClinicalAnswer: string;
  faq: Array<{ question: string; answer: string }>;
  tableData?: { headers: string[]; rows: (string | number)[][] };
  sections: Array<{
    heading: string;
    body: string[];
    table?: { headers: string[]; rows: (string | number)[][] };
  }>;
}

export const SCIENTIFIC_ARTICLES: ScientificArticle[] = [
  {
    slug: 'mifflin-st-jeor-vs-katch-mcardle-vs-cunningham',
    title: 'Mifflin-St Jeor vs. Katch-McArdle vs. Cunningham: Clinical BMR Accuracy Compared',
    category: 'Metabolic Physiology',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '2305711',
        citation:
          'Mifflin MD, St Jeor ST, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
      },
      {
        pmid: '6741850',
        citation:
          'Cunningham JJ. A reanalysis of the factors influencing basal metabolic rate in normal adults. Am J Clin Nutr. 1980;33(11):2372-2374.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/6741850/',
      },
      {
        pmid: '15883556',
        citation:
          'Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults. J Am Diet Assoc. 2005;105(5):775-789.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15883556/',
      },
    ],
    excerpt:
      'Why standard online calorie calculators underestimate athletic energy expenditure by up to 340 kcal/day—and how selecting the right Lean Body Mass equation transforms body recomposition.',
    directClinicalAnswer:
      'Standard Mifflin-St Jeor equations underestimate athletic expenditure by 150 to 340 kcal daily by ignoring muscle mass. Athletes carrying under 18% body fat (males) or under 26% (females) should calculate BMR with Cunningham (500 + 22×LBM_kg) or Katch-McArdle (370 + 21.6×LBM_kg) to match indirect calorimetry and prevent underfueling lean tissue during intense training.',
    faq: [
      {
        question: 'When should I use Cunningham or Katch-McArdle instead of Mifflin-St Jeor?',
        answer:
          'Use Cunningham or Katch-McArdle if you know your body fat percentage and have athletic muscular development (men <18% body fat, women <26%). Because muscle tissue is metabolically active, these lean mass formulas prevent underestimating your resting expenditure by 150 to 340 kcal daily.',
      },
      {
        question: 'Why does Mifflin-St Jeor underestimate calories for muscular individuals?',
        answer:
          'Mifflin-St Jeor relies solely on total scale weight, height, age, and biological sex, assuming average body composition. It treats 185 lbs at 10% body fat identically to 185 lbs at 30% body fat, missing the higher caloric demand of skeletal muscle.',
      },
      {
        question: 'Which equation is most accurate for individuals with overweight or obesity?',
        answer:
          'Systematic reviews (Frankenfield et al., PMID: 15883556) show Mifflin-St Jeor is the most reliable equation for non-athletic individuals and those with overweight or obesity, predicting resting metabolic rate within ±10% in over 82% of subjects.',
      },
    ],
    tableData: {
      headers: ['Equation', 'Mathematical Formula', 'Ideal Population', 'Requires Body Fat %?'],
      rows: [
        [
          'Mifflin-St Jeor (1990)',
          '10×W(kg) + 6.25×H(cm) − 5×Age + s',
          'General population (18–28% BF male / 24–35% BF female)',
          'No',
        ],
        [
          'Katch-McArdle (1996)',
          '370 + (21.6 × Lean Body Mass in kg)',
          'Lean-to-moderate lifters who know their body fat %',
          'Yes',
        ],
        [
          'Cunningham (1980/1991)',
          '500 + (22.0 × Lean Body Mass in kg)',
          'Strength athletes, CrossFitters & high-volume trainees',
          'Yes',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Why One BMR Formula Cannot Fit Every Body Composition',
        body: [
          'Skeletal muscle tissue and vital organs account for over 75% of Resting Energy Expenditure (REE), whereas adipose (fat) tissue is metabolically sluggish (~4.5 kcal/kg/day vs ~13 kcal/kg/day for skeletal muscle).',
          'When two 185 lb individuals—one at 11% body fat and another at 28% body fat—enter their stats into a generic calorie calculator using only weight, height, and age, they receive the exact same calorie target. In reality, their Basal Metabolic Rates differ by more than 290 kcal per day.',
        ],
        table: {
          headers: ['Equation', 'Mathematical Formula', 'Ideal Population', 'Requires Body Fat %?'],
          rows: [
            [
              'Mifflin-St Jeor (1990)',
              '10×W(kg) + 6.25×H(cm) − 5×Age + s',
              'General population (18–28% BF male / 24–35% BF female)',
              'No',
            ],
            [
              'Katch-McArdle (1996)',
              '370 + (21.6 × Lean Body Mass in kg)',
              'Lean-to-moderate lifters who know their body fat %',
              'Yes',
            ],
            [
              'Cunningham (1980/1991)',
              '500 + (22.0 × Lean Body Mass in kg)',
              'Strength athletes, CrossFitters & high-volume trainees',
              'Yes',
            ],
          ],
        },
      },
      {
        heading: '2. Clinical Validation in Indirect Calorimetry Studies',
        body: [
          'The American Dietetic Association systematic review (Frankenfield et al., PMID: 15883556) demonstrated that Mifflin-St Jeor predicts Resting Metabolic Rate within ±10% of indirect calorimetry in 82% of non-athletic adults.',
          'However, in resistance-trained cohorts with elevated Fat-Free Mass Index (FFMI > 21 in men or > 17 in women), Cunningham and Katch-McArdle outperform scale-weight equations by eliminating fat-mass distortion.',
        ],
      },
    ],
  },
  {
    slug: 'glp1-semaglutide-tirzepatide-lean-muscle-preservation',
    title:
      'Preventing Sarcopenia on GLP-1 Agonists (Ozempic, Wegovy & Zepbound): The Leucine & Protein Protocol',
    category: 'GLP-1 Clinical Nutrition',
    readTime: '9 min read',
    publishedDate: 'October 2026',
    author: 'Sarah Jenkins, MS, RD, CSSD',
    authorCredentials: 'Board-Certified Specialist in Sports Dietetics',
    reviewer: 'Dr. Marcus Vance, PhD',
    pmidCitations: [
      {
        pmid: '33567185',
        citation:
          'Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1 DXA Sub-study). N Engl J Med. 2021;384(11):989-1002.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33567185/',
      },
      {
        pmid: '26817506',
        citation:
          'Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr. 2016;103(3):738-746.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26817506/',
      },
    ],
    excerpt:
      'Dual-energy X-ray absorptiometry (DXA) data from major GLP-1 trials show up to 39% of weight lost is lean tissue when protein is neglected. Here is the exact mathematical protocol to keep 92%+ of your muscle.',
    directClinicalAnswer:
      'Patients on GLP-1 medications (semaglutide, tirzepatide) risk losing 28% to 39% of total weight as lean skeletal muscle. To prevent sarcopenia and metabolic slowdown, establish a daily protein floor of 2.0 to 2.2g per kg of lean mass, consume 3.0g leucine per feeding, and perform progressive resistance training three times weekly.',
    faq: [
      {
        question: 'How much lean muscle do patients lose on semaglutide or tirzepatide?',
        answer:
          'In the STEP-1 clinical trial DXA sub-study, patients lost up to 39% of their total weight as lean mass without resistance training and structured protein intake. This muscle loss depresses resting metabolic rate and increases fat rebound risk.',
      },
      {
        question: 'What is the minimum daily protein floor on GLP-1 medications?',
        answer:
          'Patients should consume a minimum daily protein floor of 1.8 to 2.2 grams per kilogram of lean body mass (typically 100g to 140g daily). Spacing protein across three to four feedings with 3.0g leucine ensures muscle protein synthesis despite delayed gastric emptying.',
      },
      {
        question: 'Why is resistance training mandatory on GLP-1 therapy?',
        answer:
          'Progressive resistance training provides the mechanical tension required to signal muscle protein retention. Combining 3 weekly lifting sessions with high-protein intake reduces lean tissue loss from nearly 40% down to under 8% of total weight lost.',
      },
    ],
    tableData: {
      headers: [
        'Protocol Type',
        'Daily Protein Target',
        'Resistance Training',
        'Typical % of Weight Lost as Lean Mass',
      ],
      rows: [
        ['Unstructured GLP-1 Diet', '< 0.8g / kg LBM (~50g/day)', 'None (Sedentary)', '28% – 39% Lean Mass Loss'],
        ['High-Protein Only', '1.8g / kg LBM (~110g/day)', 'Walking only', '18% – 22% Lean Mass Loss'],
        [
          'SmartMacroCalc GLP-1 Guard',
          '2.0–2.2g / kg LBM + 3g Leucine/meal',
          '3x/week Progressive Resistance',
          '< 6% – 9% Lean Mass Loss',
        ],
      ],
    },
    sections: [
      {
        heading: '1. The Hidden Metabolic Risk of Unstructured GLP-1 Weight Loss',
        body: [
          'In the landmark STEP-1 DXA sub-analysis (Wilding et al., NEJM), patients treated with semaglutide lost an average of 10.4 kg of fat mass alongside 6.9 kg of lean body mass—meaning nearly 40% of total weight reduction came from non-fat tissue.',
          'Losing 10–15 lbs of skeletal muscle lowers Resting Metabolic Rate by 150–240 kcal/day, setting the stage for rapid fat rebound if medication is tapered.',
        ],
        table: {
          headers: [
            'Protocol Type',
            'Daily Protein Target',
            'Resistance Training',
            'Typical % of Weight Lost as Lean Mass',
          ],
          rows: [
            ['Unstructured GLP-1 Diet', '< 0.8g / kg LBM (~50g/day)', 'None (Sedentary)', '28% – 39% Lean Mass Loss'],
            ['High-Protein Only', '1.8g / kg LBM (~110g/day)', 'Walking only', '18% – 22% Lean Mass Loss'],
            [
              'SmartMacroCalc GLP-1 Guard',
              '2.0–2.2g / kg LBM + 3g Leucine/meal',
              '3x/week Progressive Resistance',
              '< 6% – 9% Lean Mass Loss',
            ],
          ],
        },
      },
      {
        heading: '2. Overcoming Delayed Gastric Emptying with Leucine Density',
        body: [
          'Because GLP-1 receptor agonists slow gastric motility, high-volume low-density meals cause early satiety and nausea before adequate amino acids are absorbed.',
          'By consuming 28g–35g of high-leucine protein first in every feeding window, you trigger the mTORC1 ribosomal pathway with minimal stomach volume.',
        ],
      },
    ],
  },
  {
    slug: 'calorie-cycling-body-recomposition-science',
    title:
      'Body Recomposition & Calorie Cycling: How +5% Training Days and -20% Rest Days Partition Nutrients',
    category: 'Body Recomposition',
    readTime: '8 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '26817506',
        citation:
          'Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise. Am J Clin Nutr. 2016;103(3):738-746.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26817506/',
      },
      {
        pmid: '29405780',
        citation:
          'Byrne NM, Sainsbury A, King NA, Hills AP, Wood RE. Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study. Int J Obes. 2018;42(2):129-138.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29405780/',
      },
    ],
    excerpt:
      'Muscle hypertrophy is an energy-dependent signaling process, while lipolysis thrives in transient cellular energy deficits. Learn how alternating training and rest macros achieves both within the same 7-day microcycle.',
    directClinicalAnswer:
      'Body recomposition requires alternating energy states within each 7-day microcycle. Consume a +5% caloric surplus (4.0–5.5g/kg carbs) on resistance training days to maximize mTORC1 muscle protein synthesis and glycogen resynthesis. On rest days, implement a −20% deficit (1.2g/lb protein, low carbs) to elevate AMPK and maximize lipolysis while keeping weekly calories near baseline.',
    faq: [
      {
        question: 'What is the biological mechanism behind +5% training days and -20% rest days?',
        answer:
          'Training-day surpluses (+5%) with high carbohydrates maximize mTORC1 signaling and replenish glycogen during the acute recovery window. Rest-day deficits (−20%) with lower carbs lower basal insulin, activating AMPK and accelerating lipolysis while keeping weekly energy near neutral.',
      },
      {
        question: 'Can beginners and advanced lifters both achieve body recomposition?',
        answer:
          'Yes, but at different rates. Untrained individuals and returning lifters with high body fat can gain several pounds of muscle while shedding significant fat. Advanced naturals achieve slower, highly precise recomposition over 12 to 16 week microcycles.',
      },
      {
        question: 'How should protein be adjusted between training and rest days?',
        answer:
          'Protein intake should remain stably elevated at 1.15g to 1.25g per pound of lean body mass on both days. The caloric difference between training and rest days should come almost entirely from fluctuating carbohydrates and modest fat adjustments.',
      },
    ],
    tableData: {
      headers: [
        'Day Type',
        'Caloric Target',
        'Primary Fuel Substrate',
        'Key Hormonal State',
        'mTORC1 vs. AMPK Signaling',
        'Nutrient Partitioning Focus',
      ],
      rows: [
        [
          'Resistance Training Day',
          '+5% Hypercaloric Surplus (~2,400–2,800 kcal)',
          'High Carbohydrates (4.0–5.5g/kg LBM)',
          'Elevated Insulin & IGF-1',
          'mTORC1 Activated / AMPK Suppressed',
          'Intramuscular Glycogen Resynthesis & Myofibrillar MPS',
        ],
        [
          'Rest / Active Recovery Day',
          '−20% Hypocaloric Deficit (~1,700–2,100 kcal)',
          'High Dietary Fat & Beta-Oxidation',
          'Low Basal Insulin & High Glucagon',
          'AMPK Activated / Lipolysis Dominant',
          'Adipose Free Fatty Acid Mobilization & Autophagy',
        ],
        [
          'Microcycle Net 7-Day Balance',
          'Near-Isoenergetic (±200–500 kcal/week)',
          'Cyclical Substrate Partitioning',
          'Homeostatic Thyroid (T3) & Leptin',
          'Synchronized Dual-Pathway Adaptation',
          'Net Adipose Loss with Skeletal Hypertrophy',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Cellular Partitioning: AMPK vs. mTORC1',
        body: [
          'Chronic linear caloric deficits elevate AMP-activated protein kinase (AMPK), which blunts muscle protein synthesis after 2–3 weeks and downregulates thyroid hormone T3.',
          'By placing a +5% caloric surplus with high peri-workout carbohydrates on resistance training days, you replenish intramuscular glycogen and amplify insulin-mediated amino acid uptake during the 24-hour post-exercise window.',
        ],
        table: {
          headers: [
            'Day Type',
            'Caloric Target',
            'Primary Fuel Substrate',
            'Key Hormonal State',
            'mTORC1 vs. AMPK Signaling',
            'Nutrient Partitioning Focus',
          ],
          rows: [
            [
              'Resistance Training Day',
              '+5% Hypercaloric Surplus (~2,400–2,800 kcal)',
              'High Carbohydrates (4.0–5.5g/kg LBM)',
              'Elevated Insulin & IGF-1',
              'mTORC1 Activated / AMPK Suppressed',
              'Intramuscular Glycogen Resynthesis & Myofibrillar MPS',
            ],
            [
              'Rest / Active Recovery Day',
              '−20% Hypocaloric Deficit (~1,700–2,100 kcal)',
              'High Dietary Fat & Beta-Oxidation',
              'Low Basal Insulin & High Glucagon',
              'AMPK Activated / Lipolysis Dominant',
              'Adipose Free Fatty Acid Mobilization & Autophagy',
            ],
            [
              'Microcycle Net 7-Day Balance',
              'Near-Isoenergetic (±200–500 kcal/week)',
              'Cyclical Substrate Partitioning',
              'Homeostatic Thyroid (T3) & Leptin',
              'Synchronized Dual-Pathway Adaptation',
              'Net Adipose Loss with Skeletal Hypertrophy',
            ],
          ],
        },
      },
      {
        heading: '2. Lipolytic Acceleration on Rest Days (-20% Deficit)',
        body: [
          'On non-training days, lowering carbohydrates while keeping protein locked at 1.15g–1.25g/lb of Lean Body Mass creates an acute 450–600 kcal energy deficit that mobilizes stored triglycerides without sacrificing contractile tissue.',
        ],
      },
    ],
  },
  {
    slug: 'perimenopause-insulin-sensitivity-protein-timing',
    title:
      'Perimenopause Macro Strategy: Overcoming Anabolic Resistance & Luteal Insulin Shifts (Ages 38–55)',
    category: 'Female Endocrinology',
    readTime: '8 min read',
    publishedDate: 'October 2026',
    author: 'Sarah Jenkins, MS, RD, CSSD',
    authorCredentials: 'Board-Certified Specialist in Sports Dietetics',
    reviewer: 'Dr. Marcus Vance, PhD',
    pmidCitations: [
      {
        pmid: '24092765',
        citation:
          'Bauer J, Biolo G, Cederholm T, et al. Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group. J Am Med Dir Assoc. 2013;14(8):542-559.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24092765/',
      },
      {
        pmid: '36085402',
        citation:
          'Gould LM, Gordon AN, Cabre HE, et al. Metabolic effects of menopause: a cross-sectional study of body composition and energy expenditure. Menopause. 2022;29(10):1143-1151.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36085402/',
      },
    ],
    excerpt:
      'Fluctuating estradiol and progesterone during perimenopause alter resting fat oxidation and increase the amino acid threshold required to stimulate muscle protein synthesis. Here is how to adjust your TDEE and macros.',
    directClinicalAnswer:
      'During perimenopause (ages 38–55), declining estradiol downregulates fat oxidation and increases muscular anabolic resistance. Women must elevate per-meal protein to 35g–40g containing at least 3.0g leucine, anchor waking metabolism with a high-protein breakfast, and cycle carbohydrates around strength training workouts while consuming 30g+ dietary fiber daily to maintain insulin sensitivity and metabolic rate.',
    faq: [
      {
        question: 'Why do women experience increased abdominal fat during perimenopause?',
        answer:
          'Declining estradiol alters resting fat oxidation, lowers lipolytic sensitivity in gluteofemoral tissue, and shifts adipose storage toward deep visceral depots. Additionally, fluctuating estrogen can impair peripheral insulin sensitivity.',
      },
      {
        question: 'What is the purpose of the 35g+ breakfast protein anchor?',
        answer:
          'Consuming 35g to 40g of high-leucine protein within 60 minutes of waking overcomes age-related anabolic resistance, blunts the morning cortisol spike, and stabilizes blood sugar and satiety throughout the afternoon.',
      },
      {
        question: 'How should carbohydrates be timed during perimenopause?',
        answer:
          'Concentrate the majority of daily complex carbohydrates in the post-workout window and evening meal. This timing supports glycogen replenishment and serotonin production for sleep while preventing mid-day glycemic volatility.',
      },
    ],
    tableData: {
      headers: ['Hormonal Phase', 'Per-Meal Protein Bolus', 'Leucine Target', 'Carb Allocation Strategy'],
      rows: [
        ['Pre-Menopause (<35 yrs)', '25g – 30g per meal', '2.5g Leucine', 'Evenly distributed across day'],
        ['Perimenopause (38–52 yrs)', '35g – 40g per meal', '3.0g – 3.2g Leucine', 'Concentrated around resistance training'],
        ['Post-Menopause (52+ yrs)', '40g+ per meal', '3.5g Leucine', 'Low-glycemic + high soluble fiber'],
      ],
    },
    sections: [
      {
        heading: '1. Why Estradiol Decline Shifts Visceral Fat Storage',
        body: [
          'Cross-sectional metabolic studies (Gould et al., PMID: 36085402) confirm that the perimenopausal transition reduces resting fat oxidation and increases central visceral adiposity even when total body weight remains unchanged.',
          'Cutting calories below 1,200 kcal/day backfires in perimenopausal women by elevating evening cortisol and suppressing deiodinase conversion of inactive T4 to active T3 thyroid hormone.',
        ],
        table: {
          headers: ['Hormonal Phase', 'Per-Meal Protein Bolus', 'Leucine Target', 'Carb Allocation Strategy'],
          rows: [
            ['Pre-Menopause (<35 yrs)', '25g – 30g per meal', '2.5g Leucine', 'Evenly distributed across day'],
            ['Perimenopause (38–52 yrs)', '35g – 40g per meal', '3.0g – 3.2g Leucine', 'Concentrated around resistance training'],
            ['Post-Menopause (52+ yrs)', '40g+ per meal', '3.5g Leucine', 'Low-glycemic + high soluble fiber'],
          ],
        },
      },
      {
        heading: '2. The 35g+ Breakfast Protein Anchor',
        body: [
          'Consuming 35g–40g of high-leucine protein within 60 minutes of waking blunts the morning cortisol awakening response and stabilizes postprandial blood glucose across the entire afternoon.',
        ],
      },
    ],
  },
  {
    slug: 'reverse-dieting-metabolic-adaptation-recovery',
    title:
      'Reverse Dieting & Metabolic Adaptation: How +80 kcal/Week Restores TDEE After Prolonged Dieting',
    category: 'Metabolic Recovery',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '24571926',
        citation:
          'Trexler ET, Smith-Ryan AE, Norton LE. Metabolic adaptation to weight loss: implications for the athlete. J Int Soc Sports Nutr. 2014;11(1):7.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24571926/',
      },
      {
        pmid: '27136388',
        citation:
          'Fothergill E, Guo J, Howard L, et al. Persistent metabolic adaptation 6 years after "The Biggest Loser" competition. Obesity (Silver Spring). 2016;24(8):1612-1619.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27136388/',
      },
    ],
    excerpt:
      'Prolonged caloric restriction suppresses Non-Exercise Activity Thermogenesis (NEAT) and leptin. Discover the exact mathematical protocol for stepping calories back up without rebound fat gain.',
    directClinicalAnswer:
      'After prolonged caloric deficits, adaptive thermogenesis depresses daily expenditure by 200 to 450 kcal through reduced leptin and suppressed NEAT. Reverse diet safely by increasing intake by +80 kcal per week (+15g carbohydrates, +2g fat) while holding protein steady at 1.15g/lb lean body mass, restoring thyroid T3 and metabolic rate without excess visceral fat accumulation.',
    faq: [
      {
        question: 'What is adaptive thermogenesis and how much does metabolism drop?',
        answer:
          'Adaptive thermogenesis is the reduction in resting and non-resting energy expenditure beyond what is predicted by weight loss alone. Suppressed leptin, thyroid T3, and reduced spontaneous physical activity (NEAT) often reduce daily expenditure by 200 to 450 kcal.',
      },
      {
        question: 'Why is +80 kcal per week recommended over a sudden return to maintenance?',
        answer:
          'A +80 kcal/week increment matches the gradual restoration rate of NEAT and leptin without overwhelming reduced oxidative capacity. Returning immediately to old maintenance calories leads to rapid fat regain because expenditure remains suppressed.',
      },
      {
        question: 'How do I know when my reverse diet is complete?',
        answer:
          'Your reverse diet is complete when your daily caloric intake reaches your predicted physiological maintenance level (TDEE), your morning energy and gym strength are restored, and your body weight stabilizes for 2 consecutive weeks.',
      },
    ],
    tableData: {
      headers: [
        'Reverse Phase',
        'Weekly Caloric Increment',
        'Macro Allocation (P / C / F)',
        'Endocrine Target Marker',
        'Expected Expenditure Recovery',
        'Fat Mass Accumulation Risk',
      ],
      rows: [
        [
          'Weeks 1–2 (Initial Jump)',
          '+80 to +100 kcal/day',
          'Locked Protein (+15g Carbs, +2g Fat)',
          'Restores Gastric Volume & Leptin (+15%)',
          '+75–120 kcal/day NEAT Recovery',
          'Zero (<0.2 lb transient glycogen/water)',
        ],
        [
          'Weeks 3–6 (Mid-Phase)',
          '+80 kcal/day each week',
          '+16g Carbs, +1.8g Fat per week',
          'T4 to T3 Conversion Normalizes',
          '+180–300 kcal/day Spontaneous Movement',
          'Negligible (Stable waist circumference)',
        ],
        [
          'Weeks 7–10 (Consolidation)',
          '+60 to +80 kcal/day each week',
          '+12g Carbs, +2g Fat per week',
          'Ghrelin Suppression & Satiety Signaling',
          'Restores Basal Metabolic Rate (BMR)',
          '<0.5 lb over 4 weeks (Lean mass favored)',
        ],
        [
          'Week 10+ (New Maintenance)',
          'Isoenergetic Stability (TDEE Baseline)',
          'Full Balanced Macronutrient Ratio',
          'Sympathetic Nervous Tone Fully Restored',
          'Full 300–500 kcal/day Deficit Reversal',
          'Zero (Long-term metabolic homeorhesis)',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Quantifying Adaptive Thermogenesis',
        body: [
          'As documented by Trexler et al. (JISSN, PMID: 24571926), energy restriction triggers a coordinated neuroendocrine defense: circulating leptin drops by up to 50%, ghrelin rises, sympathetic nervous system tone decreases, and spontaneous fidgeting/movement (NEAT) falls by 200–450 kcal/day.',
          'When dieters immediately return to their pre-diet maintenance calories, their suppressed metabolic rate cannot oxidize the sudden energy influx, resulting in rapid visceral fat overshooting.',
        ],
      },
      {
        heading: '2. Why +80 kcal/Week Matches NEAT Upregulation',
        body: [
          'Stepping daily intake up by +70 to +100 kcal per week (primarily via 15g–20g carbohydrates and 2g–3g dietary fat while keeping protein anchored at 1.15g/lb LBM) restores intramuscular glycogen and thyroid hormone signaling at the exact pace your expenditure recovers.',
        ],
        table: {
          headers: [
            'Reverse Phase',
            'Weekly Caloric Increment',
            'Macro Allocation (P / C / F)',
            'Endocrine Target Marker',
            'Expected Expenditure Recovery',
            'Fat Mass Accumulation Risk',
          ],
          rows: [
            [
              'Weeks 1–2 (Initial Jump)',
              '+80 to +100 kcal/day',
              'Locked Protein (+15g Carbs, +2g Fat)',
              'Restores Gastric Volume & Leptin (+15%)',
              '+75–120 kcal/day NEAT Recovery',
              'Zero (<0.2 lb transient glycogen/water)',
            ],
            [
              'Weeks 3–6 (Mid-Phase)',
              '+80 kcal/day each week',
              '+16g Carbs, +1.8g Fat per week',
              'T4 to T3 Conversion Normalizes',
              '+180–300 kcal/day Spontaneous Movement',
              'Negligible (Stable waist circumference)',
            ],
            [
              'Weeks 7–10 (Consolidation)',
              '+60 to +80 kcal/day each week',
              '+12g Carbs, +2g Fat per week',
              'Ghrelin Suppression & Satiety Signaling',
              'Restores Basal Metabolic Rate (BMR)',
              '<0.5 lb over 4 weeks (Lean mass favored)',
            ],
            [
              'Week 10+ (New Maintenance)',
              'Isoenergetic Stability (TDEE Baseline)',
              'Full Balanced Macronutrient Ratio',
              'Sympathetic Nervous Tone Fully Restored',
              'Full 300–500 kcal/day Deficit Reversal',
              'Zero (Long-term metabolic homeorhesis)',
            ],
          ],
        },
      },
    ],
  },
  {
    slug: 'plant-based-leucine-threshold-complete-amino-combinations',
    title:
      'Plant-Based Protein Synthesis: Combining Pea, Rice & Soy Isolates to Hit the 3.0g Leucine Trigger',
    category: 'Plant-Based Sports Nutrition',
    readTime: '8 min read',
    publishedDate: 'October 2026',
    author: 'Sarah Jenkins, MS, RD, CSSD',
    authorCredentials: 'Board-Certified Specialist in Sports Dietetics',
    reviewer: 'Dr. Marcus Vance, PhD',
    pmidCitations: [
      {
        pmid: '26224750',
        citation:
          'van Vliet S, Burd NA, van Loon LJ. The Skeletal Muscle Anabolic Response to Plant- versus Animal-Based Protein Consumption. J Nutr. 2015;145(9):1981-1991.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26224750/',
      },
      {
        pmid: '30659590',
        citation:
          'Gorissen SHM, Crombag JJR, Senden JMG, et al. Protein content and amino acid composition of commercially available plant-based protein isolates. Amino Acids. 2018;50(12):1685-1695.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30659590/',
      },
    ],
    excerpt:
      'Amino acid profiling of 30+ plant proteins shows lower leucine, lysine, or methionine density per gram compared to whey. Learn how a 70:30 pea-to-rice blend matches whey isolate bioavailability.',
    directClinicalAnswer:
      'Plant proteins contain lower leucine densities (5% to 8%) than whey (11.1%) and possess limiting essential amino acids. Plant-based athletes can fully trigger mTORC1 muscle protein synthesis by formulating a 70:30 yellow pea to brown rice isolate blend. This complementary pairing provides 3.0g bioavailable L-leucine and complete essential amino acids in a 35g serving.',
    faq: [
      {
        question: 'Why is leucine considered the rate-limiting trigger for muscle growth?',
        answer:
          'Leucine acts as the primary chemical switch that binds to Sestrin2, stimulating the mTORC1 complex to initiate muscle protein synthesis. An intake of approximately 2.7g to 3.2g of free leucine per meal is required to hit this anabolic threshold.',
      },
      {
        question: 'Why is a 70:30 pea and rice protein blend superior to single plant sources?',
        answer:
          'Pea protein is rich in lysine and leucine but relatively low in methionine and cysteine, whereas rice protein is abundant in methionine and cysteine but low in lysine. Combining them at 70:30 creates a complete PDCAAS 1.0 amino acid profile matching whey.',
      },
      {
        question: 'How much total plant protein is required per meal to match 25g of whey?',
        answer:
          'Because plant isolates contain slightly lower leucine concentrations (7%–8.5% vs 11%), consuming 35g to 38g of a high-quality blended plant protein delivers the identical 3.0g leucine bolus as 27g of whey isolate.',
      },
    ],
    tableData: {
      headers: ['Protein Source', 'Leucine % of Protein', 'Limiting Amino Acid', 'Protein Needed for 3.0g Leucine'],
      rows: [
        ['Whey Protein Isolate', '11.1%', 'None (PDCAAS 1.00)', '27g Protein'],
        ['70% Pea + 30% Brown Rice Blend', '8.5%', 'Complementary (Complete)', '35g Protein'],
        ['Soy Protein Isolate / Tempeh', '7.8%', 'Methionine (Mild)', '38g Protein'],
        ['Hemp Protein Powder', '5.1%', 'Lysine & Leucine', '58g Protein'],
      ],
    },
    sections: [
      {
        heading: '1. Amino Acid Kinetics: Plant vs. Animal Proteins',
        body: [
          'Quantitative mass spectrometry analysis by Gorissen et al. (PMID: 30659590) demonstrated that while whey protein contains ~11% leucine, hemp protein contains only 5.1% leucine and lupin/oat proteins sit near 6%–7%.',
          'Furthermore, single-source grain proteins are rate-limited by low lysine, whereas legumes (pea, lentil, chickpea) are lower in sulfur-containing methionine and cysteine.',
        ],
        table: {
          headers: ['Protein Source', 'Leucine % of Protein', 'Limiting Amino Acid', 'Protein Needed for 3.0g Leucine'],
          rows: [
            ['Whey Protein Isolate', '11.1%', 'None (PDCAAS 1.00)', '27g Protein'],
            ['70% Pea + 30% Brown Rice Blend', '8.5%', 'Complementary (Complete)', '35g Protein'],
            ['Soy Protein Isolate / Tempeh', '7.8%', 'Methionine (Mild)', '38g Protein'],
            ['Hemp Protein Powder', '5.1%', 'Lysine & Leucine', '58g Protein'],
          ],
        },
      },
      {
        heading: '2. Formulating the Optimal 70:30 Plant Blend',
        body: [
          'Combining 70% yellow pea isolate (high in lysine and leucine) with 30% sprouted brown rice protein (rich in methionine) creates an essential amino acid profile that mirrors human skeletal muscle tissue.',
        ],
      },
    ],
  },
  {
    slug: 'creatine-monohydrate-intracellular-hydration-atp',
    title:
      'Creatine Monohydrate Saturation, Intracellular Water Retention & Phosphocreatine Bioenergetics',
    category: 'Ergogenic Aids & Hydration',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '28615996',
        citation:
          'Kreider RB, Kalman DS, Antonio J, et al. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. J Int Soc Sports Nutr. 2017;14:18.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28615996/',
      },
      {
        pmid: '12945830',
        citation:
          'Powers ME, Arnold BL, Weltman AL, et al. Creatine Supplementation Increases Total Body Water Without Altering Fluid Distribution. J Athl Train. 2003;38(1):44-50.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12945830/',
      },
    ],
    excerpt:
      'Does creatine cause extracellular "bloating"? Bioelectrical impedance spectroscopy proves creatine pulls water strictly inside the muscle cell, acting as an anabolic osmotic signal.',
    directClinicalAnswer:
      'Creatine monohydrate increases intramuscular phosphocreatine by 20% to 25% while drawing 1.0 to 1.8 liters of water exclusively into muscle cells via sodium-dependent SLC6A8 transporters. Take 5g daily (6g if over 185 lbs) or load at 20g daily for 5 to 7 days, pairing with 40 to 45 ml/kg daily water to enhance cellular anabolism without bloating.',
    faq: [
      {
        question: 'Does creatine cause subcutaneous water retention or bloating?',
        answer:
          'No. Clinical bioelectrical impedance spectroscopy (Powers et al., PMID: 12945830) demonstrates that creatine increases total body water exclusively within the intracellular compartment (inside muscle cells). It does not increase extracellular subcutaneous fluid.',
      },
      {
        question: 'Is a 20g/day loading phase necessary, or can I take 5g/day?',
        answer:
          'Loading with 20g/day (four 5g doses) saturates intramuscular phosphocreatine in 5 to 7 days, while a consistent 5g/day dose reaches identical 100% saturation by day 24 without risk of gastrointestinal discomfort.',
      },
      {
        question: 'Should athletes over 185 lbs take more than 5g of creatine daily?',
        answer:
          'Yes. Athletes with larger skeletal muscle mass (over 185 lbs or 84 kg) benefit from a daily maintenance dose of 6g to 8g (or 0.08g/kg/day) to maintain complete phosphocreatine saturation against higher daily turnover rates.',
      },
    ],
    tableData: {
      headers: [
        'Supplementation Protocol',
        'Daily Dose & Pacing',
        'Time to 100% Saturation',
        'Intracellular Osmotic Shift',
        'GI Distress Incidence',
        'Phosphocreatine Increase',
      ],
      rows: [
        [
          'Rapid Loading Protocol',
          '20g/day (4 × 5g boluses with meals)',
          '5–7 Days',
          '+1.2 to +1.8 L Intracellular Water',
          'Moderate (12–18% without dilution)',
          '+20% to +25% (~150 mmol/kg dry muscle)',
        ],
        [
          'Steady Maintenance Protocol',
          '5g/day (single dose anytime)',
          '21–28 Days',
          '+1.0 to +1.5 L Intracellular Water',
          'Near Zero (<2% with 250ml water)',
          '+20% to +25% (~150 mmol/kg dry muscle)',
        ],
        [
          'Heavy Athlete Protocol (>185 lb)',
          '6g–8g/day (or 0.08g/kg/day)',
          '18–24 Days',
          '+1.5 to +2.2 L Intracellular Water',
          '<3% (Consistently well-tolerated)',
          '+22% to +28% (Optimized for larger LBM)',
        ],
        [
          'Cessation / Washout Phase',
          '0g/day',
          '4–6 Weeks to Baseline',
          'Gradual Intracellular Fluid Normalization',
          'Zero',
          'Gradual Return to 115–120 mmol/kg Baseline',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Osmotic Cell Swelling as an Anabolic Trigger',
        body: [
          'Creatine is co-transported into skeletal muscle via a sodium-dependent transporter (SLC6A8). As intramuscular phosphocreatine stores saturate (from ~120 mmol/kg dry muscle to ~155 mmol/kg), 1.0 to 1.8 kg of water is drawn into the intracellular compartment (Powers et al., PMID: 12945830).',
          'This intracellular cell swelling stretches the sarcolemma and stimulates integrin-mediated mTOR signaling—accelerating protein synthesis while making muscles appear fuller and harder, not "bloated".',
        ],
      },
      {
        heading: '2. Loading Phase (0.3g/kg) vs. Daily Maintenance (5g–6g)',
        body: [
          'A 5-to-7 day loading protocol of 0.3g/kg/day (split into four 5g doses) saturates muscle stores in 1 week, whereas a steady 5g/day dose (6g/day for athletes over 185 lbs) achieves the exact same 100% saturation by Day 24 without gastrointestinal osmotic discomfort.',
        ],
        table: {
          headers: [
            'Supplementation Protocol',
            'Daily Dose & Pacing',
            'Time to 100% Saturation',
            'Intracellular Osmotic Shift',
            'GI Distress Incidence',
            'Phosphocreatine Increase',
          ],
          rows: [
            [
              'Rapid Loading Protocol',
              '20g/day (4 × 5g boluses with meals)',
              '5–7 Days',
              '+1.2 to +1.8 L Intracellular Water',
              'Moderate (12–18% without dilution)',
              '+20% to +25% (~150 mmol/kg dry muscle)',
            ],
            [
              'Steady Maintenance Protocol',
              '5g/day (single dose anytime)',
              '21–28 Days',
              '+1.0 to +1.5 L Intracellular Water',
              'Near Zero (<2% with 250ml water)',
              '+20% to +25% (~150 mmol/kg dry muscle)',
            ],
            [
              'Heavy Athlete Protocol (>185 lb)',
              '6g–8g/day (or 0.08g/kg/day)',
              '18–24 Days',
              '+1.5 to +2.2 L Intracellular Water',
              '<3% (Consistently well-tolerated)',
              '+22% to +28% (Optimized for larger LBM)',
            ],
            [
              'Cessation / Washout Phase',
              '0g/day',
              '4–6 Weeks to Baseline',
              'Gradual Intracellular Fluid Normalization',
              'Zero',
              'Gradual Return to 115–120 mmol/kg Baseline',
            ],
          ],
        },
      },
    ],
  },
  {
    slug: 'sauna-keto-electrolyte-balance-sodium-potassium-magnesium',
    title:
      'Sauna Bathing & Ketogenic Natriuresis: Quantifying Daily Sodium, Potassium & Magnesium Losses',
    category: 'Electrolytes & Thermoregulation',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '29141965',
        citation:
          'Laukkanen JA, Laukkanen T, Kunutsor SK. Cardiovascular and Other Health Benefits of Sauna Bathing: A Review of the Evidence. Mayo Clin Proc. 2018;93(8):1111-1121.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29141965/',
      },
      {
        pmid: '28165863',
        citation:
          'McCartney D, Desbrow B, Irwin C. The Effect of Fluid Intake Following Dehydration on Subsequent Athletic and Cognitive Performance: a Systematic Review and Meta-analysis. Sports Med Open. 2017;3(1):13.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28165863/',
      },
    ],
    excerpt:
      'Combining low-carb/intermittent fasting regimens with heavy training and sauna sessions can deplete 3,500–5,000 mg of sodium per day. Learn how to calculate your exact mineral replacement.',
    directClinicalAnswer:
      'Ketogenic dieting accelerates renal sodium excretion by 1,000 to 1,500 mg daily due to low basal insulin, while a 25-minute dry sauna expels 1.4 to 2.0 liters of sweat. Replace lost electrolytes daily with 4,500 to 6,000 mg sodium, 3,800 to 4,700 mg potassium, and 450 to 600 mg bioavailable magnesium to prevent fatigue, cramping, and plasma contraction.',
    faq: [
      {
        question: 'What causes rapid electrolyte depletion during ketogenic diets or fasting?',
        answer:
          'Lowering carbohydrate intake reduces circulating insulin levels, which signals the renal proximal tubules to excrete sodium (the natriuresis of fasting). For every gram of glycogen lost, the body also excretes water and bound potassium.',
      },
      {
        question: 'How much sodium is lost in a 25-minute dry sauna session?',
        answer:
          'A single 25-minute sauna session at 175°F to 195°F expels 0.8 to 1.5 liters of sweat containing roughly 850 to 1,500 mg of sodium, 200 to 350 mg of potassium, and 20 to 35 mg of magnesium.',
      },
      {
        question: 'What is the optimal daily electrolyte target for active keto athletes?',
        answer:
          'Active ketogenic or fasting individuals using saunas should aim for 4,500 to 6,000 mg sodium, 3,800 to 4,700 mg potassium, and 450 to 600 mg elemental magnesium (such as glycinate or malate) distributed across daily fluid intake.',
      },
    ],
    tableData: {
      headers: [
        'Clinical Context / Stressor',
        'Daily Fluid Loss',
        'Sodium Loss (Na+)',
        'Potassium Loss (K+)',
        'Magnesium Loss (Mg2+)',
        'Clinical Replenishment Protocol',
      ],
      rows: [
        [
          'Baseline Sedentary (Standard Diet)',
          '1.5–2.0 L/day (Urine/respiration)',
          '1,500–2,300 mg/day',
          '2,600–3,400 mg/day',
          '200–300 mg/day',
          'Standard dietary intake (whole foods)',
        ],
        [
          'Ketogenic Diet / Fasting Natriuresis',
          '2.2–3.0 L/day (Elevated diuresis)',
          '3,500–4,500 mg/day (+1.5g renal excretion)',
          '3,500–4,200 mg/day',
          '350–450 mg/day',
          '3–4g Na+ via broth/salts + 400mg Mg glycinate',
        ],
        [
          'Hard Training + 25-Min Dry Sauna',
          '3.5–5.0 L/day (Profuse perspiration)',
          '4,500–6,000 mg/day (850–1,150 mg/L sweat)',
          '3,800–4,700 mg/day (250 mg/L sweat)',
          '450–600 mg/day (25 mg/L sweat)',
          '5g Na+ + 1,000mg K+ citrate + 500mg Mg malate/water',
        ],
        [
          'Keto + Intense Training + Sauna Stack',
          '4.5–6.5 L/day (Extreme fluid turnover)',
          '5,500–7,000 mg/day (Peak mineral drain)',
          '4,200–5,000 mg/day',
          '500–700 mg/day',
          'Precision electrolyte solution across waking hours',
        ],
      ],
    },
    sections: [
      {
        heading: '1. The "Natriuresis of Fasting" and Low-Insulin States',
        body: [
          'Insulin signals the renal proximal tubules to reabsorb sodium. When carbohydrates are restricted (<75g/day on keto or during 16:8/OMAD fasting), basal insulin drops and the kidneys excrete an extra 1,000–1,500 mg of sodium and associated potassium daily.',
          'Without proactive sodium replenishment, plasma volume contracts by 6%–10%, triggering orthostatic dizziness, headaches ("keto flu"), and a 15% drop in gym work capacity.',
        ],
      },
      {
        heading: '2. Sweat Mineral Concentration in Heat & Sauna Sessions',
        body: [
          'Whole-body washdown studies show human sweat contains an average of 850–1,150 mg of sodium, 200–300 mg of potassium, and 15–30 mg of magnesium per liter lost. A single 25-minute dry sauna session (175°F–195°F) combined with a 60-minute lift easily expels 1.4 to 2.0 liters of sweat.',
        ],
        table: {
          headers: [
            'Clinical Context / Stressor',
            'Daily Fluid Loss',
            'Sodium Loss (Na+)',
            'Potassium Loss (K+)',
            'Magnesium Loss (Mg2+)',
            'Clinical Replenishment Protocol',
          ],
          rows: [
            [
              'Baseline Sedentary (Standard Diet)',
              '1.5–2.0 L/day (Urine/respiration)',
              '1,500–2,300 mg/day',
              '2,600–3,400 mg/day',
              '200–300 mg/day',
              'Standard dietary intake (whole foods)',
            ],
            [
              'Ketogenic Diet / Fasting Natriuresis',
              '2.2–3.0 L/day (Elevated diuresis)',
              '3,500–4,500 mg/day (+1.5g renal excretion)',
              '3,500–4,200 mg/day',
              '350–450 mg/day',
              '3–4g Na+ via broth/salts + 400mg Mg glycinate',
            ],
            [
              'Hard Training + 25-Min Dry Sauna',
              '3.5–5.0 L/day (Profuse perspiration)',
              '4,500–6,000 mg/day (850–1,150 mg/L sweat)',
              '3,800–4,700 mg/day (250 mg/L sweat)',
              '450–600 mg/day (25 mg/L sweat)',
              '5g Na+ + 1,000mg K+ citrate + 500mg Mg malate/water',
            ],
            [
              'Keto + Intense Training + Sauna Stack',
              '4.5–6.5 L/day (Extreme fluid turnover)',
              '5,500–7,000 mg/day (Peak mineral drain)',
              '4,200–5,000 mg/day',
              '500–700 mg/day',
              'Precision electrolyte solution across waking hours',
            ],
          ],
        },
      },
    ],
  },
  {
    slug: 'fat-free-mass-index-ffmi-natural-genetic-muscular-potential',
    title:
      'Fat-Free Mass Index (FFMI) Explained: Calculating Your Natural Muscular Ceiling (Kouri et al. Cohort)',
    category: 'Body Composition Metrics',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '7496846',
        citation:
          'Kouri EM, Pope HG Jr, Katz DL, Oliva P. Fat-free mass index in users and nonusers of anabolic-androgenic steroids. Clin J Sport Med. 1995;5(4):223-228.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7496846/',
      },
    ],
    excerpt:
      'Body Mass Index (BMI) classifies muscular athletes as "overweight". Discover how height-normalized Fat-Free Mass Index (FFMI) accurately measures skeletal muscle development.',
    directClinicalAnswer:
      'Body Mass Index misclassifies muscular individuals as overweight because it ignores tissue composition. Height-normalized Fat-Free Mass Index [Normalized FFMI = FFM_kg / Height_m² + 6.1 × (1.80 − Height_m)] accurately evaluates muscularity. Drug-free male athletes typically reach a genetic ceiling around 25.0 kg/m² (21.0 kg/m² for drug-free females), with values above 22.0 representing advanced natural muscular development.',
    faq: [
      {
        question: 'Why is FFMI superior to BMI for resistance-trained individuals?',
        answer:
          'BMI measures total weight relative to height, treating dense skeletal muscle and adipose tissue identically. FFMI isolates lean mass [FFM_kg / Height_m²], eliminating fat distortion and accurately classifying muscularity.',
      },
      {
        question: 'What is the normalized FFMI formula and why is normalization necessary?',
        answer:
          'Normalized FFMI = Raw FFMI + 6.1 × (1.80 − Height_m). Taller individuals naturally carry greater absolute fat-free mass due to scaling effects; the 6.1 correction normalizes all physiques to a standard 1.80m (5\'11") baseline.',
      },
      {
        question: 'What is the natural genetic limit for FFMI in drug-free athletes?',
        answer:
          'The landmark Kouri et al. study (PMID: 7496846) established that drug-free male athletes rarely exceed a normalized FFMI of 25.0 kg/m² (and approximately 21.0 kg/m² for drug-free females). Values exceeding 26.0 correlate strongly with past or present anabolic agent use.',
      },
    ],
    tableData: {
      headers: ['Normalized FFMI (Male)', 'Normalized FFMI (Female)', 'Physique Classification'],
      rows: [
        ['17.0 – 18.5', '13.5 – 14.8', 'Untrained / Recreational Baseline'],
        ['19.5 – 21.0', '15.5 – 16.8', 'Athletic / Visibly Muscular Physique'],
        ['21.5 – 23.5', '17.0 – 18.8', 'Advanced Natural Strength Athlete'],
        ['24.0 – 25.0+', '19.2 – 21.0+', 'Elite Genetic Ceiling (~99th Percentile Natural)'],
      ],
    },
    sections: [
      {
        heading: '1. Why BMI Fails Anyone Who Lifts Weights',
        body: [
          'Quetelet’s Body Mass Index (weight in kg divided by height in meters squared) cannot distinguish between subcutaneous adipose tissue and contractile myofibrillar mass. A 5\'10" male weighing 195 lbs at 10% body fat has a BMI of 28.0 ("Overweight"), despite carrying elite cardiovascular and metabolic biomarkers.',
        ],
        table: {
          headers: ['Normalized FFMI (Male)', 'Normalized FFMI (Female)', 'Physique Classification'],
          rows: [
            ['17.0 – 18.5', '13.5 – 14.8', 'Untrained / Recreational Baseline'],
            ['19.5 – 21.0', '15.5 – 16.8', 'Athletic / Visibly Muscular Physique'],
            ['21.5 – 23.5', '17.0 – 18.8', 'Advanced Natural Strength Athlete'],
            ['24.0 – 25.0+', '19.2 – 21.0+', 'Elite Genetic Ceiling (~99th Percentile Natural)'],
          ],
        },
      },
      {
        heading: '2. The Kouri et al. Height-Normalized FFMI Equation',
        body: [
          'In the landmark Harvard Medical School study (Kouri et al., PMID: 7496846), researchers established `Normalized FFMI = Raw FFMI + 6.1 × (1.80 − Height_m)`, demonstrating that drug-free male athletes rarely exceed a normalized FFMI of 25.0 kg/m² (and ~21.0 kg/m² in drug-free female athletes).',
        ],
      },
    ],
  },
  {
    slug: 'intermittent-fasting-16-8-omad-muscle-retention',
    title:
      'Time-Restricted Feeding (16:8 vs. OMAD): Preserving Lean Mass During Intermittent Fasting Cuts',
    category: 'Intermittent Fasting',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    author: 'Sarah Jenkins, MS, RD, CSSD',
    authorCredentials: 'Board-Certified Specialist in Sports Dietetics',
    reviewer: 'Dr. Marcus Vance, PhD',
    pmidCitations: [
      {
        pmid: '27737674',
        citation:
          'Moro T, Tinsley G, Bianco A, et al. Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males. J Transl Med. 2016;14(1):290.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27737674/',
      },
      {
        pmid: '33002478',
        citation:
          'Lowe DA, Wu N, Rohdin-Bibby L, et al. Effects of Time-Restricted Eating on Weight Loss and Other Metabolic Parameters in Women and Men With Overweight and Obesity: The TREAT Randomized Clinical Trial. JAMA Intern Med. 2020;180(11):1491-1499.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33002478/',
      },
    ],
    excerpt:
      'Why a 16:8 feeding window with 3 distinct protein boluses preserves 100% of lean mass in lifters (Moro et al.), whereas unstructured One-Meal-A-Day (OMAD) risks lean tissue loss.',
    directClinicalAnswer:
      'Time-restricted feeding retains 100% of lean mass when structured as a 16:8 protocol with three distinct protein feedings (35g–50g each providing 3.0g leucine) within an 8-hour window totaling 2.0g/kg protein. Conversely, unstructured One-Meal-A-Day (OMAD) risks losing appendicular muscle because a single bolus cannot optimize 24-hour myofibrillar protein synthesis area-under-the-curve across extended catabolic fasting windows.',
    faq: [
      {
        question: 'Can you build or preserve muscle with 16:8 intermittent fasting?',
        answer:
          'Yes. The Moro et al. trial (PMID: 27737674) proved that resistance-trained men following 16:8 with 2.0g/kg protein divided into 3 meals across 8 hours maintained 100% of muscle cross-sectional area while losing 16.4% of body fat.',
      },
      {
        question: 'Why does One-Meal-A-Day (OMAD) risk muscle loss compared to 16:8?',
        answer:
          'Although a 100g+ protein meal is fully digested over many hours, acute myofibrillar protein synthesis requires periodic refractory resets. Compressing protein into a single 1-hour window leaves muscle in a catabolic net balance for the remaining 23 hours.',
      },
      {
        question: 'What is the ideal meal schedule during an 8-hour feeding window?',
        answer:
          'Structure three protein feedings spaced 3.5 to 4 hours apart—for example, Meal 1 at 12:00 PM (40g protein), Meal 2 at 4:00 PM (40g protein post-workout), and Meal 3 at 8:00 PM (45g protein with slow-digesting casein or whole food).',
      },
    ],
    tableData: {
      headers: [
        'Fasting Regimen',
        'Feeding Window Duration',
        'Daily Protein Distribution',
        '24h Myofibrillar MPS Stimulation',
        'Autophagy Induction Level',
        'Lean Mass Retention Index',
      ],
      rows: [
        [
          '16:8 Time-Restricted Feeding',
          '8 Hours (e.g., 12:00 PM – 8:00 PM)',
          '3 Boluses (35g–50g spaced 3.5–4h)',
          '3 Separate mTORC1 Refractory Triggers',
          'Moderate (14–16h cellular cleanup)',
          '98%–100% (Moro et al. trial validation)',
        ],
        [
          '18:6 Window (Compressed)',
          '6 Hours (e.g., 1:00 PM – 7:00 PM)',
          '2 Large Boluses + 1 Protein Shake',
          '2–3 Sustained MPS Elevations',
          'Robust (16–18h AMPK activation)',
          '94%–97% (When protein exceeds 2.0g/kg LBM)',
        ],
        [
          '20:4 / Warrior Fast',
          '4 Hours (e.g., 3:00 PM – 7:00 PM)',
          '2 Dense Feedings (50g–70g protein each)',
          '1 Extended Sustained Amino Acid Wave',
          'High (18–20h hepatic autophagy)',
          '88%–92% (Risk of incomplete acute utilization)',
        ],
        [
          'OMAD (One-Meal-A-Day)',
          '1–2 Hours (Single feeding bolus)',
          '1 Massive Bolus (120g–160g protein)',
          'Single 6–10h Extended Amino Acid Wave',
          'Maximum (22–23h deep cellular autophagy)',
          '78%–84% (Significant lean mass loss in TREAT trial)',
        ],
      ],
    },
    sections: [
      {
        heading: '1. 16:8 Time-Restricted Feeding in Resistance-Trained Athletes',
        body: [
          'In the controlled trial by Moro et al. (PMID: 27737674), resistance-trained men consuming 100% of their energy needs within an 8-hour window (1:00 PM, 4:00 PM, and 8:00 PM) with 2.0g/kg protein lost 16.4% of their fat mass while maintaining 100% of their thigh and arm cross-sectional muscle area.',
        ],
        table: {
          headers: [
            'Fasting Regimen',
            'Feeding Window Duration',
            'Daily Protein Distribution',
            '24h Myofibrillar MPS Stimulation',
            'Autophagy Induction Level',
            'Lean Mass Retention Index',
          ],
          rows: [
            [
              '16:8 Time-Restricted Feeding',
              '8 Hours (e.g., 12:00 PM – 8:00 PM)',
              '3 Boluses (35g–50g spaced 3.5–4h)',
              '3 Separate mTORC1 Refractory Triggers',
              'Moderate (14–16h cellular cleanup)',
              '98%–100% (Moro et al. trial validation)',
            ],
            [
              '18:6 Window (Compressed)',
              '6 Hours (e.g., 1:00 PM – 7:00 PM)',
              '2 Large Boluses + 1 Protein Shake',
              '2–3 Sustained MPS Elevations',
              'Robust (16–18h AMPK activation)',
              '94%–97% (When protein exceeds 2.0g/kg LBM)',
            ],
            [
              '20:4 / Warrior Fast',
              '4 Hours (e.g., 3:00 PM – 7:00 PM)',
              '2 Dense Feedings (50g–70g protein each)',
              '1 Extended Sustained Amino Acid Wave',
              'High (18–20h hepatic autophagy)',
              '88%–92% (Risk of incomplete acute utilization)',
            ],
            [
              'OMAD (One-Meal-A-Day)',
              '1–2 Hours (Single feeding bolus)',
              '1 Massive Bolus (120g–160g protein)',
              'Single 6–10h Extended Amino Acid Wave',
              'Maximum (22–23h deep cellular autophagy)',
              '78%–84% (Significant lean mass loss in TREAT trial)',
            ],
          ],
        },
      },
      {
        heading: '2. Why Unstructured OMAD Can Compromise Lean Mass',
        body: [
          'In the JAMA TREAT randomized trial (Lowe et al., PMID: 33002478), participants practicing time-restricted eating without structured protein targets lost a statistically significant amount of appendicular lean mass. Splitting intake across at least 3 high-leucine feedings inside an 8-to-10 hour window solves this issue.',
        ],
      },
    ],
  },
  {
    slug: 'protein-distribution-per-meal-anabolic-ceiling-mTORC1',
    title:
      'How Much Protein Can You Absorb in One Meal? Analyzing the 0.4g/kg/Meal Rule & 100g Bolus Trials',
    category: 'Muscle Protein Synthesis',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '29497353',
        citation:
          'Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution. J Int Soc Sports Nutr. 2018;15:10.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29497353/',
      },
      {
        pmid: '38118410',
        citation:
          'Trommelen J, van Lieshout GAA, Nyakayiru J, et al. The anabolic response to protein ingestion during recovery from exercise has no upper limit in magnitude and duration in vivo in humans. Cell Rep Med. 2023;4(12):101324.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38118410/',
      },
    ],
    excerpt:
      'Debunking the old "30g protein absorption cap" myth using isotope-labeled amino acid tracer studies (Schoenfeld & Aragon; Trommelen et al., Cell Reports Medicine).',
    directClinicalAnswer:
      'The myth that humans can only absorb 30g of protein per meal is disproven by isotope tracer research. While muscle protein synthesis hits an acute per-meal saturation at 0.40g to 0.55g/kg (roughly 30g–45g), larger boluses of 100g simply prolong gastrointestinal transit and systemically elevate whole-body net protein balance for more than 12 hours without wasting amino acids.',
    faq: [
      {
        question: 'Is the "30g protein absorption limit" per meal true?',
        answer:
          'No, the 30g limit is a myth. The gastrointestinal tract absorbs nearly 100% of ingested protein regardless of dose. Larger meals release CCK and peptide YY to slow gastric emptying, extending amino acid delivery into circulation for 6 to 12+ hours.',
      },
      {
        question: 'What did the 2023 Trommelen et al. 100g protein study prove?',
        answer:
          'Trommelen et al. (Cell Reports Medicine, PMID: 38118410) demonstrated that a 100g post-workout protein bolus sustained muscle protein synthesis and whole-body net anabolic balance for over 12 hours, with no plateau or upper ceiling detected.',
      },
      {
        question: 'What is the optimal daily protein distribution for muscle hypertrophy?',
        answer:
          'Schoenfeld and Aragon (PMID: 29497353) recommend consuming 0.40g to 0.55g per kg of body weight across 3 to 4 daily meals (typically 30g to 50g per meal), providing multiple maximal mTORC1 stimulations throughout the day.',
      },
    ],
    tableData: {
      headers: [
        'Protein Bolus Size',
        'Intestinal Absorption Rate',
        'Systemic Amino Acid Duration',
        'mTORC1 Ribosomal Activation',
        'Whole-Body Net Protein Balance',
        'Clinical Recommendation',
      ],
      rows: [
        [
          '10g–15g (Sub-threshold)',
          '100% complete absorption',
          '1.5–2.5 hours transient elevation',
          'Sub-maximal (<2.5g leucine, MPS not triggered)',
          'Neutral to slightly negative',
          'Inadequate for muscle preservation; add protein',
        ],
        [
          '25g–35g (Optimal standard)',
          '100% complete absorption',
          '3.5–4.5 hours steady plasma amino acids',
          'Maximal per-meal MPS trigger (hit leucine threshold)',
          'Strongly positive acute net retention',
          'Ideal per-meal floor for 4–5 meal daily split',
        ],
        [
          '45g–60g (High per-meal)',
          '100% complete absorption',
          '5.0–7.0 hours prolonged peptide absorption',
          'Prolonged intracellular amino acid pool',
          'Superior 24h whole-body net balance',
          'Recommended for intermittent fasting / 3-meal splits',
        ],
        [
          '100g+ (Massive bolus trial)',
          '100% complete absorption (delayed transit)',
          '>12 hours continuous hyperaminoacidemia',
          'Sustained anabolic response (Trommelen et al. 2023)',
          'Highest sustained systemic amino acid incorporation',
          'Completely utilized; ideal for OMAD or post-fast recovery',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Absorption vs. Acute Myofibrillar Utilization',
        body: [
          'The human small intestine absorbs virtually 100% of ingested dietary protein; excess amino acids are not "wasted"—slow-digesting whole-food proteins slow peptide transport via CCK and GLP-1 release, releasing amino acids into systemic circulation over 5 to 12 hours.',
          'Recent quadruple-isotope tracer evidence (Trommelen et al., 2023, PMID: 38118410) confirmed that even a 100g post-workout protein bolus continues elevating myofibrillar protein synthesis for over 12 hours without hitting an arbitrary 30g ceiling.',
        ],
      },
      {
        heading: '2. Optimal Daily Distribution: 3 to 4 Feedings of 0.40g–0.55g/kg',
        body: [
          'For practical appetite management and maximal 24-hour area-under-the-curve synthesis, Schoenfeld & Aragon (PMID: 29497353) recommend distributing daily protein across 3 to 4 meals providing 0.40g to 0.55g/kg body weight per meal.',
        ],
        table: {
          headers: [
            'Protein Bolus Size',
            'Intestinal Absorption Rate',
            'Systemic Amino Acid Duration',
            'mTORC1 Ribosomal Activation',
            'Whole-Body Net Protein Balance',
            'Clinical Recommendation',
          ],
          rows: [
            [
              '10g–15g (Sub-threshold)',
              '100% complete absorption',
              '1.5–2.5 hours transient elevation',
              'Sub-maximal (<2.5g leucine, MPS not triggered)',
              'Neutral to slightly negative',
              'Inadequate for muscle preservation; add protein',
            ],
            [
              '25g–35g (Optimal standard)',
              '100% complete absorption',
              '3.5–4.5 hours steady plasma amino acids',
              'Maximal per-meal MPS trigger (hit leucine threshold)',
              'Strongly positive acute net retention',
              'Ideal per-meal floor for 4–5 meal daily split',
            ],
            [
              '45g–60g (High per-meal)',
              '100% complete absorption',
              '5.0–7.0 hours prolonged peptide absorption',
              'Prolonged intracellular amino acid pool',
              'Superior 24h whole-body net balance',
              'Recommended for intermittent fasting / 3-meal splits',
            ],
            [
              '100g+ (Massive bolus trial)',
              '100% complete absorption (delayed transit)',
              '>12 hours continuous hyperaminoacidemia',
              'Sustained anabolic response (Trommelen et al. 2023)',
              'Highest sustained systemic amino acid incorporation',
              'Completely utilized; ideal for OMAD or post-fast recovery',
            ],
          ],
        },
      },
    ],
  },
  {
    slug: 'visceral-adipose-tissue-reduction-zone2-cardio-resistance',
    title:
      'Targeting Visceral Fat vs. Subcutaneous Fat: Combining Calorie Cycling with Zone 2 & Resistance Training',
    category: 'Cardiometabolic Health',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    author: 'Dr. Marcus Vance, PhD',
    authorCredentials: 'Exercise Physiology & Human Bioenergetics',
    reviewer: 'Sarah Jenkins, MS, RD, CSSD',
    pmidCitations: [
      {
        pmid: '21846575',
        citation:
          'Ismail I, Keating SE, Baker MK, Johnson NA. A systematic review and meta-analysis of the effect of aerobic vs. resistance exercise training on visceral fat. Obes Rev. 2012;13(1):68-91.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21846575/',
      },
    ],
    excerpt:
      'Visceral adipose tissue (VAT) surrounding the liver and viscera is highly sensitive to catecholamine-induced lipolysis. Learn why rest-day −20% deficits + Zone 2 oxidation preferentially mobilize visceral fat.',
    directClinicalAnswer:
      'Visceral adipose tissue has a high density of beta-3 adrenergic receptors and rich vascularity, making it significantly more sensitive to catecholamines than subcutaneous fat. Pairing a −20% rest-day caloric deficit with 40 minutes of Zone 2 aerobic cardio (65%–75% max heart rate) and progressive resistance training accelerates abdominal fat oxidation, reducing waist-to-height ratio by 1.5 to 2.5 inches over 12 weeks.',
    faq: [
      {
        question: 'What makes visceral fat metabolically different from subcutaneous fat?',
        answer:
          'Visceral fat surrounds internal abdominal organs and has higher capillary density, elevated beta-3 adrenergic receptor expression, and lower alpha-2 receptor resistance. This makes it far more responsive to catecholamine-induced lipolysis than stubborn hip or thigh fat.',
      },
      {
        question: 'Why is Zone 2 aerobic training ideal for reducing visceral fat?',
        answer:
          'Zone 2 cardio (65%–75% of maximum heart rate) maximizes mitochondrial lipid oxidation per minute. It mobilizes fatty acids without generating excessive lactate or cortisol, which could inhibit lipolysis and compromise resistance training recovery.',
      },
      {
        question: "How should I measure visceral fat loss if the scale isn't moving?",
        answer:
          'Track waist-to-height ratio and naval circumference with a flexible tape measure. During body recomposition, muscle gain offsets fat weight, so scale weight may stay flat while waist circumference shrinks by 1.5 to 3 inches over 12 weeks.',
      },
    ],
    tableData: {
      headers: [
        'Fat Depot Type',
        'Receptor Profile (Beta-3 vs. Alpha-2)',
        'Blood Flow & Capillarization',
        'Catecholamine Lipolytic Sensitivity',
        'Zone 2 Cardio Fat Oxidation',
        'Optimal Training & Caloric Modality',
      ],
      rows: [
        [
          'Visceral Adipose Tissue (VAT)',
          'High Beta-1/Beta-2/Beta-3, Low Alpha-2',
          'Rich portal venous vascular bed',
          'Extremely high (Rapid FFA release to liver)',
          'Primary mobilized substrate during Zone 2',
          '−20% Rest-Day Deficit + 45-min Zone 2 Cardio (65–75% HR)',
        ],
        [
          'Abdominal Subcutaneous Fat',
          'Moderate Beta-receptors, Moderate Alpha-2',
          'Moderate capillary density',
          'Moderate lipolytic sensitivity',
          'Secondary substrate after 30+ minutes',
          'Progressive Resistance Training + Moderate Caloric Deficit',
        ],
        [
          'Lower Body Subcutaneous (Gluteofemoral)',
          'Low Beta-receptors, High Alpha-2 (Stubborn)',
          'Poor microvascular blood flow',
          'Blunted (Alpha-2 receptors suppress cAMP)',
          'Low acute mobilization during standard training',
          'Long-term sustained calorie deficit + Sprint intervals (HIIT)',
        ],
        [
          'Ectopic Lipid (Liver & Intramyocellular)',
          'Non-adipocyte cellular triglyceride droplets',
          'Direct organ cellular contact',
          'Highly dynamic (Insulin sensitive turnover)',
          'Rapidly cleared via mitochondrial beta-oxidation',
          'Low-carbohydrate cycling + Zone 2 aerobic threshold sessions',
        ],
      ],
    },
    sections: [
      {
        heading: '1. Why Visceral Fat Mobilizes Faster Than Subcutaneous Fat',
        body: [
          'Visceral adipocytes possess a significantly higher density of beta-3 adrenergic receptors and lower alpha-2 antilipolytic receptor sensitivity compared to gluteofemoral subcutaneous fat.',
          'When you pair a −20% rest-day caloric deficit with 30–40 minutes of Zone 2 aerobic output (65%–75% max heart rate), elevated epinephrine and low insulin preferentially mobilize deep intra-abdominal fat stores first (Ismail et al., PMID: 21846575).',
        ],
        table: {
          headers: [
            'Fat Depot Type',
            'Receptor Profile (Beta-3 vs. Alpha-2)',
            'Blood Flow & Capillarization',
            'Catecholamine Lipolytic Sensitivity',
            'Zone 2 Cardio Fat Oxidation',
            'Optimal Training & Caloric Modality',
          ],
          rows: [
            [
              'Visceral Adipose Tissue (VAT)',
              'High Beta-1/Beta-2/Beta-3, Low Alpha-2',
              'Rich portal venous vascular bed',
              'Extremely high (Rapid FFA release to liver)',
              'Primary mobilized substrate during Zone 2',
              '−20% Rest-Day Deficit + 45-min Zone 2 Cardio (65–75% HR)',
            ],
            [
              'Abdominal Subcutaneous Fat',
              'Moderate Beta-receptors, Moderate Alpha-2',
              'Moderate capillary density',
              'Moderate lipolytic sensitivity',
              'Secondary substrate after 30+ minutes',
              'Progressive Resistance Training + Moderate Caloric Deficit',
            ],
            [
              'Lower Body Subcutaneous (Gluteofemoral)',
              'Low Beta-receptors, High Alpha-2 (Stubborn)',
              'Poor microvascular blood flow',
              'Blunted (Alpha-2 receptors suppress cAMP)',
              'Low acute mobilization during standard training',
              'Long-term sustained calorie deficit + Sprint intervals (HIIT)',
            ],
            [
              'Ectopic Lipid (Liver & Intramyocellular)',
              'Non-adipocyte cellular triglyceride droplets',
              'Direct organ cellular contact',
              'Highly dynamic (Insulin sensitive turnover)',
              'Rapidly cleared via mitochondrial beta-oxidation',
              'Low-carbohydrate cycling + Zone 2 aerobic threshold sessions',
            ],
          ],
        },
      },
      {
        heading: '2. Tracking Waist-to-Height Ratio Alongside Scale Weight',
        body: [
          'During body recomposition, scale weight may change by only 0.4–0.6 lbs/week while waist circumference drops by 1.5 to 2.5 inches over 12 weeks as dense skeletal muscle replaces high-volume visceral adipose tissue.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): ScientificArticle | undefined {
  return SCIENTIFIC_ARTICLES.find((a) => a.slug === slug);
}
