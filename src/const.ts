export const SOCIAL_INSURANCE_RATE = 0.08;
export const HEALTH_INSURANCE_RATE = 0.015;
export const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
export const EMPLOYER_SOCIAL_INSURANCE_RATE = 0.17;
export const EMPLOYER_ACCIDENT_INSURANCE_RATE = 0.005;
export const EMPLOYER_HEALTH_INSURANCE_RATE = 0.03;
export const EMPLOYER_UNEMPLOYMENT_INSURANCE_RATE = 0.01;
export const GIAM_TRU_GIA_CANH = 15_500_000;
export const GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC = 6_200_000;
export const BASE_SALARY_WEIGHT = 20;
export const MINIMUM_SALARY_WEIGHT = 20;
export const TAX_RANGES = [
  { start: 0, end: 10_000_000, rate: 0.05 },
  { start: 10_000_000, end: 30_000_000, rate: 0.1 },
  { start: 30_000_000, end: 60_000_000, rate: 0.2 },
  { start: 60_000_000, end: 100_000_000, rate: 0.3 },
  { start: 100_000_000, end: Number.POSITIVE_INFINITY, rate: 0.35 },
];
export const MINIMUM_SALARY_I = 5_310_000;
export const MINIMUM_SALARY_II = 4_730_000;
export const MINIMUM_SALARY_III = 4_140_000;
export const MINIMUM_SALARY_IV = 3_700_000;
export const BASE_SALARY = 2_530_000;
export const MINIMUM_SALARY = [
  MINIMUM_SALARY_I,
  MINIMUM_SALARY_II,
  MINIMUM_SALARY_III,
  MINIMUM_SALARY_IV,
];
export const DEFAULT_LOCALE = "vi-VN";
