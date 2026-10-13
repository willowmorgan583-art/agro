export type Language = 'en' | 'sw';

export interface Translations {
  // Brand
  brandName: string;
  tagline: string;
  subTagline: string;

  // Nav
  navOverview: string;
  navDemand: string;
  navEarlyWarning: string;
  navDispatch: string;
  navFinance: string;
  navFeedback: string;
  btnRuralUSSD: string;
  btnFarmerTour: string;
  lblOnline: string;
  lblOffline: string;
  lblQueued: string;

  // Roles
  roleFarmer: string;
  roleFarmerDesc: string;
  roleBuyer: string;
  roleBuyerDesc: string;
  roleLogistics: string;
  roleLogisticsDesc: string;
  roleAnalyst: string;
  roleAnalystDesc: string;
  activeZone: string;

  // Weather Bar
  weatherGpsLive: string;
  weatherAgroProfile: string;
  weatherBlightIndex: string;
  weatherSoilMoisture: string;
  btnDetectGps: string;
  btnLocating: string;

  // Overview
  heroSub: string;
  heroTitle: string;
  heroDesc: string;
  btnExploreDemand: string;
  btnViewHarvestBoard: string;
  btnLaunchUssd: string;

  // Metrics
  kpiLossAverted: string;
  kpiLossTarget: string;
  kpiIncomeLift: string;
  kpiIncomeDesc: string;
  kpiSmallholders: string;
  kpiSmallholdersTarget: string;
  kpiTrained: string;
  kpiTrainedTarget: string;

  // Chart
  chartTitle: string;
  chartSubtitle: string;
  chartProjectedGrowth: string;
  chartActualYield: string;
  chartSoilMoisture: string;
  chartRainfall: string;
  chartGrowthStage: string;
  chartTonsPerAcre: string;
  chartMoisturePercent: string;
  chartInsight: string;

  // Modules
  mod1Title: string;
  mod1Desc: string;
  mod1Action: string;
  mod2Title: string;
  mod2Desc: string;
  mod2Action: string;
  mod3Title: string;
  mod3Desc: string;
  mod3Action: string;
  mod4Title: string;
  mod4Desc: string;
  mod4Action: string;

  // Roadmap & Revenue
  roadmapTitle: string;
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  phase3Title: string;
  phase3Desc: string;
  revenueTitle: string;
  rev1Title: string;
  rev1Desc: string;
  rev2Title: string;
  rev2Desc: string;
  rev3Title: string;
  rev3Desc: string;
  rev4Title: string;
  rev4Desc: string;

  // Chatbot
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSend: string;
  chatGreeting: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'Agrolink Africa',
    tagline: 'Pan-African Agritech Infrastructure',
    subTagline: 'Kenya Pilot Cohort · Kiambu · Nakuru · Meru',

    navOverview: 'Overview',
    navDemand: 'Demand AI',
    navEarlyWarning: 'Early Warning',
    navDispatch: 'Smart Dispatch',
    navFinance: 'AgriFinance',
    navFeedback: 'Feedback Loop',
    btnRuralUSSD: 'Rural USSD (*384*55#)',
    btnFarmerTour: 'Farmer Tour',
    lblOnline: 'Online',
    lblOffline: 'Offline',
    lblQueued: 'queued',

    roleFarmer: 'Smallholder Farmer',
    roleFarmerDesc: 'Planting schedules, crop health & guaranteed off-take matching',
    roleBuyer: 'Commercial Buyer',
    roleBuyerDesc: 'Contracted crop forward procurement & verified quality lots',
    roleLogistics: 'Logistics Fleet',
    roleLogisticsDesc: 'Refrigerated transit dispatch & field spoilage prevention',
    roleAnalyst: 'Value-Chain Executive',
    roleAnalystDesc: 'Food security metrics, 300K farmer progress & loss impact',
    activeZone: 'Active Zone:',

    weatherGpsLive: 'GPS Live Synced',
    weatherAgroProfile: 'Agro-Zone Profile',
    weatherBlightIndex: 'Blight Index:',
    weatherSoilMoisture: 'Soil:',
    btnDetectGps: 'Use My GPS',
    btnLocating: 'Locating...',

    heroSub: 'Pan-African Agritech Infrastructure · Kenya Pilot Cohort',
    heroTitle: 'Eliminating agricultural fragmentation & post-harvest loss through predictive intelligence.',
    heroDesc: 'Across Africa, 30% to 50% of harvested food spoils before reaching consumers due to market blindness and fractured transit. Agrolink transitions agricultural supply chains from a reactive posture to a predictive ecosystem—synchronizing smallholders directly with verified commercial buyers, cold transport, and fintech liquidity.',
    btnExploreDemand: 'Analyze Demand Prediction AI',
    btnViewHarvestBoard: 'View Active Harvest Board',
    btnLaunchUssd: 'Launch Offline USSD Demo →',

    kpiLossAverted: 'Post-Harvest Loss Averted',
    kpiLossTarget: 'Target: 40% by Year 3',
    kpiIncomeLift: 'Farmer Net Income Lift',
    kpiIncomeDesc: 'Via direct forward contracting',
    kpiSmallholders: 'Onboarded Smallholders',
    kpiSmallholdersTarget: 'Scaling toward 300,000 target',
    kpiTrained: 'Climate-Smart Workers Trained',
    kpiTrainedTarget: '50,000 target with NGO partners',

    chartTitle: 'Projected Crop Growth vs. Actual Yield & Soil Moisture',
    chartSubtitle: 'Dual-Axis Agronomic Model · 16-Week Crop Phenology & Weather Overlay',
    chartProjectedGrowth: 'AI Projected Biomass (MT/Acre)',
    chartActualYield: 'Actual Harvested Yield (MT/Acre)',
    chartSoilMoisture: 'Soil Moisture (%)',
    chartRainfall: 'Precipitation (mm)',
    chartGrowthStage: 'Crop Stage',
    chartTonsPerAcre: 'Metric Tonnes / Acre',
    chartMoisturePercent: 'Moisture (%) / Rain (mm)',
    chartInsight: 'Empirical Correlation: When soil moisture remained within the 60-75% optimal band during pod-setting (Weeks 8–11), actual farm yield matched or exceeded AI projected forward curves with only 3.2% deviation.',

    mod1Title: 'Demand Prediction AI & Planting Advisory',
    mod1Desc: 'Analyzes real-time consumption trends across Nairobi, Mombasa, and export hubs before sowing begins. Recommends crop selection and optimal planting calendars.',
    mod1Action: 'Explore Crop Cycles & Price Projections',

    mod2Title: 'Early Warning System & Botanical Pathology',
    mod2Desc: 'Tracks localized rainfall volatility, frost, and biological threats in real time. Features multimodal AI image diagnosis for crop diseases (MLNV, Tuta, Blight).',
    mod2Action: 'Scan Foliage & Inspect Threat Radar',

    mod3Title: 'Smart Distribution Matching & Fleet Dispatch',
    mod3Desc: 'Instantly matches ready harvests to verified food distributors, agro-processors, and solar-refrigerated transport. Prevents field spoilage with real-time transit clocks.',
    mod3Action: 'Manage Hauler Dispatch & Waybills',

    mod4Title: 'Post-Harvest Optimization & AgriFinance',
    mod4Desc: 'Coordinates certified silo storage with the Warehouse Receipt System (WRS). Unlocks instant input microcredit against stored commodities and automates digital escrow.',
    mod4Action: 'Review Warehouse Collateral & Escrow',

    roadmapTitle: 'Phased Implementation & Sustainable Commercial Model',
    phase1Title: 'Phase 1 · Months 1–6 (MVP & Pilot)',
    phase1Desc: 'Deploy core architecture across Kiambu, Nakuru, and Meru. Onboard first 50,000 smallholders with cooperative cold hubs.',
    phase2Title: 'Phase 2 · Months 7–18 (National Expansion)',
    phase2Desc: 'Scale across 22 agricultural counties in Kenya. Fully onboard institutional food processors, supermarket chains, and commercial 3PL haulers.',
    phase3Title: 'Phase 3 · Years 2–3 (Regional Pan-African Scaling)',
    phase3Desc: 'Expand cross-border trade corridors across East and Southern Africa (Uganda, Tanzania, Rwanda). Localize dialect voice interfaces.',

    revenueTitle: 'Four Diversified Revenue Streams',
    rev1Title: '1. SaaS Subscriptions',
    rev1Desc: 'Tiered predictive analytics tools for commercial farms, aggregators, and exporters.',
    rev2Title: '2. Transaction Matching',
    rev2Desc: '2.0% – 2.5% fee on verified marketplace trades and hauler dispatches.',
    rev3Title: '3. Institutional Data',
    rev3Desc: 'Anonymized supply-chain & climate risk intelligence sold to insurers & banks.',
    rev4Title: '4. Development Grants',
    rev4Desc: 'Structured impact programs with AGRA, FAO, and bilateral food security funds.',

    chatTitle: 'Agrolink AI Concierge',
    chatSubtitle: 'Hyper-Local Agronomy & Trade Advisory',
    chatPlaceholder: 'Ask anything about crops, weather, or markets...',
    chatSend: 'Send',
    chatGreeting: 'Hello! I am your Agrolink AI Concierge. How can I support your operations today?',
  },
  sw: {
    brandName: 'Agrolink Africa',
    tagline: 'Miundombinu ya Kilimo Dijitali Afrika',
    subTagline: 'Mradi wa Majaribio Kenya · Kiambu · Nakuru · Meru',

    navOverview: 'Muhtasari',
    navDemand: 'Utabiri wa Mahitaji',
    navEarlyWarning: 'Tahadhari za Mapema',
    navDispatch: 'Usambazaji Mahiri',
    navFinance: 'Fedha za Kilimo',
    navFeedback: 'Tathmini ya Wakulima',
    btnRuralUSSD: 'Simu ya Kawaida USSD (*384*55#)',
    btnFarmerTour: 'Mwongozo wa Mkulima',
    lblOnline: 'Mtandao Uko',
    lblOffline: 'Bila Mtandao',
    lblQueued: 'zinasubiri',

    roleFarmer: 'Mkulima Mdogo',
    roleFarmerDesc: 'Ratiba ya upandaji, afya ya mimea na kuunganishwa na soko la uhakika',
    roleBuyer: 'Mnunuzi wa Kibiashara',
    roleBuyerDesc: 'Mikataba ya ununuzi wa mapema na ukaguzi wa ubora wa mazao',
    roleLogistics: 'Msafirishaji wa Mazao',
    roleLogisticsDesc: 'Usafiri wa majokofu na kuzuia mazao yasiharibike shambani',
    roleAnalyst: 'Mchambuzi wa Mnyororo',
    roleAnalystDesc: 'Takwimu za usalama wa chakula na maendeleo ya wakulima 300K',
    activeZone: 'Eneo Linalotumika:',

    weatherGpsLive: 'GPS Imeunganishwa Moja kwa Moja',
    weatherAgroProfile: 'Wasifu wa Eneo la Kilimo',
    weatherBlightIndex: 'Kiwango cha Ukungu:',
    weatherSoilMoisture: 'Unyevu wa Udongo:',
    btnDetectGps: 'Tumia GPS Yangu',
    btnLocating: 'Inatafuta...',

    heroSub: 'Miundombinu ya Kilimo Dijitali Afrika · Mradi wa Majaribio Kenya',
    heroTitle: 'Kutokomeza uharibifu wa mazao na mnyororo uliotengana kupitia akili mnemba ya utabiri.',
    heroDesc: 'Barani Afrika, kati ya 30% hadi 50% ya chakula kilichovunwa huharibika kabla ya kufika kwa mlaji kutokana na ukosefu wa soko na usafiri duni. Agrolink inabadilisha mnyororo wa kilimo kuwa wa utabiri—kuunganisha wakulima wadogo moja kwa moja na wanunuzi wakubwa, usafiri wa baridi, na mikopo ya pembejeo.',
    btnExploreDemand: 'Chambua Utabiri wa Mahitaji ya Soko',
    btnViewHarvestBoard: 'Tazama Bodi ya Mazao Yaliyovunwa',
    btnLaunchUssd: 'Fungua USSD Bila Mtandao →',

    kpiLossAverted: 'Mazao Yaliyookolewa Kuharibika',
    kpiLossTarget: 'Lengo: 40% ifikapo Mwaka wa 3',
    kpiIncomeLift: 'Ongezeko la Mapato ya Mkulima',
    kpiIncomeDesc: 'Kupitia mikataba ya moja kwa moja ya soko',
    kpiSmallholders: 'Wakulima Wadogo Waliosajiliwa',
    kpiSmallholdersTarget: 'Tukilenga wakulima 300,000',
    kpiTrained: 'Wafanyakazi Waliofunzwa Kilimo Himilivu',
    kpiTrainedTarget: 'Lengo la wafanyakazi 50,000 na mashirika',

    chartTitle: 'Utabiri wa Ukuaji wa Mazao dhidi ya Mavuno Halisi & Unyevu wa Udongo',
    chartSubtitle: 'Mfano wa Kisekta wa Agronomia · Majuma 16 ya Ukuaji na Hali ya Hewa',
    chartProjectedGrowth: 'Utabiri wa AI wa Mazao (Tani/Ekari)',
    chartActualYield: 'Mavuno Halisi Yaliyovunwa (Tani/Ekari)',
    chartSoilMoisture: 'Unyevu wa Udongo (%)',
    chartRainfall: 'Kiwango cha Mvua (mm)',
    chartGrowthStage: 'Kipindi cha Ukuaji',
    chartTonsPerAcre: 'Tani kwa Ekari',
    chartMoisturePercent: 'Unyevu (%) / Mvua (mm)',
    chartInsight: 'Uhusiano wa Kisayansi: Wakati unyevu wa udongo ulipobaki kati ya 60-75% wakati wa kutoa maua na kuunda mbegu (Majuma ya 8–11), mavuno halisi ya shambani yalilingana na makadirio ya AI kwa tofauti ya 3.2% pekee.',

    mod1Title: 'Utabiri wa Mahitaji & Mwongozo wa Upandaji',
    mod1Desc: 'Inachambua mwenendo wa soko la Nairobi, Mombasa na masoko ya ng\'ambo kabla ya kupanda. Inapendekeza mazao bora na ratiba za upandaji.',
    mod1Action: 'Tazama Misimu ya Mazao na Makadirio ya Bei',

    mod2Title: 'Mfumo wa Tahadhari za Mapema & Magonjwa ya Mimea',
    mod2Desc: 'Inafuatilia mvua, baridi kali na magonjwa ya mimea kwa wakati halisi. Inajumuisha utambuzi wa picha wa magonjwa (MLNV, Tuta, Ukungu).',
    mod2Action: 'Kagua Majani na Rada ya Hatari',

    mod3Title: 'Usambazaji Mahiri & Usafiri wa Majokofu',
    mod3Desc: 'Inaunganisha mazao yaliyovunwa mara moja na wasindikaji wa chakula na magari yenye mfumo wa sola wa baridi. Huzuia uharibifu wa mazao.',
    mod3Action: 'Simamia Usafirishaji na Vyeti vya Njia',

    mod4Title: 'Uhifadhi Bora & Fedha za Kilimo (AgriFinance)',
    mod4Desc: 'Inaratibu maghala yaliyothibitishwa ya Stakabadhi Ghalani (WRS). Inawezesha mikopo ya pembejeo dhidi ya mazao yaliyohifadhiwa na malipo salama ya M-Pesa.',
    mod4Action: 'Kagua Hifadhi ya Maghala na Malipo',

    roadmapTitle: 'Hatua za Utekelezaji & Mfumo Endelevu wa Mapato',
    phase1Title: 'Awamu ya 1 · Miezi 1–6 (Uzinduzi na Majaribio)',
    phase1Desc: 'Kuanzisha mfumo Kiambu, Nakuru, na Meru. Kusajili wakulima 50,000 wa kwanza na maghala ya baridi ya ushirika.',
    phase2Title: 'Awamu ya 2 · Miezi 7–18 (Upanuzi Kitaifa)',
    phase2Desc: 'Kupanua katika kaunti 22 za kilimo nchini Kenya. Kuingiza wasindikaji wakuu wa chakula, maduka makubwa, na wasafirishaji wa kibiashara.',
    phase3Title: 'Awamu ya 3 · Miaka 2–3 (Kanda ya Afrika Mashariki)',
    phase3Desc: 'Kupanua katika mipaka ya kanda (Uganda, Tanzania, Rwanda). Kujanibisha lugha za kiasili na sauti.',

    revenueTitle: 'Njia Nne za Mapato Endelevu',
    rev1Title: '1. Usajili wa Programu (SaaS)',
    rev1Desc: 'Zana za utabiri wa kilimo kwa mashamba makubwa, wauzaji nje, na viwanda.',
    rev2Title: '2. Ada ya Muamala wa Soko',
    rev2Desc: 'Ada ya 2.0% – 2.5% kwa kila biashara iliyothibitishwa sokoni na usafiri.',
    rev3Title: '3. Data za Kitaasisi',
    rev3Desc: 'Taarifa za mnyororo wa usambazaji na hatari za hali ya hewa kwa benki na bima.',
    rev4Title: '4. Ruzuku za Maendeleo',
    rev4Desc: 'Miradi ya usalama wa chakula na mashirika ya AGRA, FAO, na washirika.',

    chatTitle: 'Mshauri wa AI wa Agrolink',
    chatSubtitle: 'Miongozo ya Kilimo na Soko ya Eneo Lako',
    chatPlaceholder: 'Uliza swali lolote kuhusu mazao, hali ya hewa, au masoko...',
    chatSend: 'Tuma',
    chatGreeting: 'Habari! Mimi ni Mshauri wako wa AI wa Agrolink Africa. Nikusaidie vipi kuhusu kilimo au soko leo?',
  },
};
