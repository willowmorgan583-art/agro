export type UserRole = 'farmer' | 'buyer' | 'logistics' | 'analyst';

export type ActiveTab =
  | 'overview'
  | 'demand'
  | 'early_warning'
  | 'smart_dispatch'
  | 'agrifinance'
  | 'feedback'
  | 'ussd_simulator';

export interface CropDemandRecord {
  crop: string;
  category: string;
  county: string;
  currentPriceKES: number;
  projectedPriceKES: number;
  demandTrend: 'surging' | 'stable' | 'oversupply_risk';
  optimalPlantingWindow: string;
  projectedHarvestWindow: string;
  institutionalOfftakers: string[];
  historicalYieldTonsPerAcre: number;
  spoilageVulnerabilityHours: number;
}

export interface DiseaseOutbreakAlert {
  id: string;
  pathogenName: string;
  latinName: string;
  cropAffected: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  countiesAffected: string[];
  spreadRisk: string;
  organicRemedy: string;
  chemicalRemedy: string;
  reportedDate: string;
}

export interface ReadyHarvestLot {
  id: string;
  farmerName: string;
  farmLocation: string;
  county: string;
  crop: string;
  grade: 'A' | 'B' | 'Export Premium';
  quantityTons: number;
  harvestTimestamp: string;
  spoilageDeadlineHours: number;
  status: 'AWAITING_MATCH' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  matchedHauler?: string;
  targetBuyer?: string;
  pricePerKgKES: number;
}

export interface TransportVehicle {
  id: string;
  driverName: string;
  carrierCompany: string;
  vehicleType: string;
  coolingCapacity: 'Refrigerated (2°C - 6°C)' | 'Insulated Dry' | 'Solar Chilled';
  capacityTons: number;
  currentLocation: string;
  availableFrom: string;
  rating: number;
  contactNumber: string;
}

export interface WarehouseDeposit {
  receiptNumber: string;
  facilityName: string;
  location: string;
  commodity: string;
  tonnage: number;
  qualityGrade: string;
  storageDate: string;
  creditEligibleKES: number;
  status: 'SECURED_IN_SILO' | 'PLEDGED_AS_COLLATERAL' | 'RELEASED';
}

export interface EscrowTransaction {
  id: string;
  referenceNumber: string;
  buyerName: string;
  farmerOrCoopName: string;
  commodity: string;
  amountKES: number;
  escrowStatus: 'HELD_IN_ESCROW' | 'RELEASED_UPON_INSPECTION' | 'COMPLETED';
  date: string;
}

export interface WeatherData {
  locationName: string;
  latitude: number;
  longitude: number;
  temperatureC: number;
  humidityPercent: number;
  precipitationForecastMm: number;
  weatherCondition: string;
  frostRisk: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH';
  blightRiskScore: number;
  windSpeedKmH: number;
  soilMoistureIndex: 'OPTIMAL' | 'DEFICIT' | 'SATURATED';
  agronomicAdvisory: string;
  isGpsDetected: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export type FeedbackModuleType = 'demand_prediction' | 'early_warning' | 'smart_dispatch';

export interface FarmerFeedbackRecord {
  id: string;
  moduleType: FeedbackModuleType;
  targetItemTitle: string;
  farmerName: string;
  cooperative: string;
  county: string;
  rating: number; // 1 to 5
  predictedValue: string;
  actualOutcomeValue: string;
  accuracyPercentage: number;
  comments: string;
  timestamp: string;
  modelAdjustmentStatus: 'QUEUED_FOR_RETRAINING' | 'APPLIED_TO_WEIGHTS' | 'VERIFIED_BY_KALRO';
}

export interface OfflineQueueItem {
  id: string;
  type: 'NEW_HARVEST' | 'PEST_REPORT' | 'FARMER_FEEDBACK' | 'PLANTING_LOG';
  payload: any;
  queuedAt: string;
  status: 'PENDING' | 'SYNCED';
  title: string;
}

export interface OnboardingData {
  language: 'en' | 'sw';
  fullName: string;
  phone: string;
  county: string;
  ward: string;
  acreage: number;
  primaryCrop: string;
  waterAccess: string;
  hasSmartphone: boolean;
  completed: boolean;
}

