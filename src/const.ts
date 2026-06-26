import { OpenStartRange } from "./range";

export const SOCIAL_INSURANCE_RATE = 0.08;
export const HEALTH_INSURANCE_RATE = 0.015;
export const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
export const GIAM_TRU_GIA_CANH = 15_500_000;
export const GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC = 6_200_000;
export const TAX_RANGES = [
  new OpenStartRange(0, 10_000_000, 0.05),
  new OpenStartRange(10_000_000, 30_000_000, 0.1),
  new OpenStartRange(30_000_000, 60_000_000, 0.2),
  new OpenStartRange(60_000_000, 100_000_000, 0.3),
  new OpenStartRange(100_000_000, Number.POSITIVE_INFINITY, 0.35),
];
export const MINIMUM_SALARY_I = 5_310_000;
export const MINIMUM_SALARY_II = 4_730_000;
export const MINIMUM_SALARY_III = 4_140_000;
export const MINIMUM_SALARY_IV = 3_700_000;
export const MINIMUM_SALARY = [
  MINIMUM_SALARY_I,
  MINIMUM_SALARY_II,
  MINIMUM_SALARY_III,
  MINIMUM_SALARY_IV,
];
