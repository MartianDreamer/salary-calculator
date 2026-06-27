export interface SalaryData {
  salary: number;
  insuranceSalary: number;
  dependents: number;
  region: number;
  fullInsurance: boolean;
}

export interface SalaryCalculationResult {
  grossSalary: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;
  taxableSalary: number;
  personalIncomeTax: number;
  netSalary: number;
  employerSocialInsurance: number;
  employerAccidentInsurance: number;
  employerHealthInsurance: number;
  employerUnemploymentInsurance: number;
}

export interface TaxRange {
  start: number;
  end: number;
  rate: number;
}

export interface Option {
  baseSalary: number;
  minimumSalary: number[];
  taxRanges: TaxRange[];
  personalDeduction: number;
  dependentDeduction: number;
}
