// Values copied from the real AquaResQ app screenshots (Critical multi-pond emergency scenario,
// 12 h outage, 4 kW generator, 48 kWh, 4.0 mg/L threshold). Full precision comes from the app's
// "Metric-by-metric comparison" text. NOTHING here is live farm data.

export const SCENARIO = {
  ponds: 3,
  outageHours: 12,
  generatorKw: 4,
  fuelKwh: 48,
  thresholdMgL: 4.0,
  aeratorKwEach: 2,
  allAeratorsKw: 6,
  feasibleAllocations: 7,
  totalAllocations: 8,
  rejectedForCapacity: 1,
  rejectedForFuel: 0,
};

export const DEFICIT = {
  noGenerator: 89.27845247,
  highestRiskFirst: 36.24021866,
  aquaresqOptimized: 23.59509966,
};

export const PERCENT_LOWER =
  ((DEFICIT.noGenerator - DEFICIT.aquaresqOptimized) / DEFICIT.noGenerator) * 100; // 73.57

// Pond-hours at/below threshold (a metric where "Highest initial risk first" is better) - shown honestly in scene 8.
export const POND_HOURS = {highestRiskFirst: 12.98818211, aquaresqOptimized: 19.29407652};

export const PLAN = [
  {pond: 'P1', kw: 2},
  {pond: 'P2', kw: 0},
  {pond: 'P3', kw: 2},
];

export const POND_PROFILE = {sizeM2: 2000, depthM: 0.8, shrimpKg: 2500, aeratorKw: 2, aeratorOutput: 0.8};

export const DISCLAIMER = 'SIMULATED MODEL ESTIMATE — NOT LIVE FARM DATA';
