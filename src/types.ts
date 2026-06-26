export interface SalaryData {
  salary: number;
  insuranceSalary: number;
  dependents: number;
  basicSalary: number;
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
