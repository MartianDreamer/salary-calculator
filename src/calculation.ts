import {
  GIAM_TRU_GIA_CANH,
  GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
  MINIMUM_SALARY,
  TAX_RANGES,
} from "./const";
import { SalaryCalculationResult, SalaryData } from "./types";

export const grossSalaryToNetSalary = (
  salaryData: SalaryData,
): SalaryCalculationResult => {
  const {
    salary: grossSalary,
    insuranceSalary,
    dependents,
    basicSalary,
    fullInsurance,
  } = salaryData;
  const insuranceSalaryCapped = Math.min(
    fullInsurance ? grossSalary : insuranceSalary,
    basicSalary * 20,
  );
  const unemploymentInsuranceSalaryCapped = Math.min(
    fullInsurance ? grossSalary : insuranceSalary,
    MINIMUM_SALARY[salaryData.region] * 20,
  );
  const socialInsurance = insuranceSalaryCapped * 0.08;
  const healthInsurance = insuranceSalaryCapped * 0.015;
  const unemploymentInsurance = unemploymentInsuranceSalaryCapped * 0.01;
  const employerSocialInsurance = insuranceSalaryCapped * 0.17;
  const employerAccidentInsurance = insuranceSalaryCapped * 0.005;
  const employerHealthInsurance = insuranceSalaryCapped * 0.03;
  const employerUnemploymentInsurance =
    unemploymentInsuranceSalaryCapped * 0.01;
  const taxableSalary = Math.max(
    grossSalary -
      socialInsurance -
      healthInsurance -
      unemploymentInsurance -
      GIAM_TRU_GIA_CANH -
      dependents * GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
    0,
  );
  let personalIncomeTax = 0;
  console.log(
    `insuranceSalaryCapped: ${insuranceSalaryCapped}, unemploymentInsuranceSalaryCapped: ${unemploymentInsuranceSalaryCapped}, socialInsurance: ${socialInsurance}, healthInsurance: ${healthInsurance}, unemploymentInsurance: ${unemploymentInsurance}, taxableSalary: ${taxableSalary}`,
  );

  for (const taxRange of TAX_RANGES) {
    if (taxableSalary > taxRange.end) {
      personalIncomeTax += (taxRange.end - taxRange.start) * taxRange.value;
      console.log(
        `Taxable Salary ${taxableSalary} exceeds range ${taxRange.start} - ${taxRange.end}, adding tax: ${(taxRange.end - taxRange.start) * taxRange.value}`,
      );
    } else {
      personalIncomeTax += (taxableSalary - taxRange.start) * taxRange.value;
      console.log(
        `Taxable Salary ${taxableSalary} falls within range ${taxRange.start} - ${taxRange.end}, adding tax: ${(taxableSalary - taxRange.start) * taxRange.value}`,
      );
      break;
    }
  }

  const netSalary =
    grossSalary -
    socialInsurance -
    healthInsurance -
    unemploymentInsurance -
    personalIncomeTax;

  return {
    grossSalary: Math.round(grossSalary),
    socialInsurance: Math.round(socialInsurance),
    healthInsurance: Math.round(healthInsurance),
    unemploymentInsurance: Math.round(unemploymentInsurance),
    taxableSalary: Math.round(taxableSalary),
    personalIncomeTax: Math.round(personalIncomeTax),
    netSalary: Math.round(netSalary),
    employerSocialInsurance: Math.round(employerSocialInsurance),
    employerHealthInsurance: Math.round(employerHealthInsurance),
    employerAccidentInsurance: Math.round(employerAccidentInsurance),
    employerUnemploymentInsurance: Math.round(employerUnemploymentInsurance),
  };
};

export const netSalaryToGrossSalary = (
  salaryData: SalaryData,
): SalaryCalculationResult => {
  const targetNet = salaryData.salary;

  let low = targetNet;
  let high = Math.max(targetNet * 2, 2_000_000_000);
  let tolerance = 0.01;
  let maxIterations = 400;

  let bestResult: SalaryCalculationResult | null = null;

  for (let i = 0; i < maxIterations; i++) {
    const midGross = (low + high) / 2;

    const testData: SalaryData = {
      ...salaryData,
      salary: midGross,
    };

    const currentResult = grossSalaryToNetSalary(testData);

    bestResult = currentResult;
    console.log(
      `Iteration ${i + 1}, Mid Gross: ${midGross}, Net Salary: ${currentResult.netSalary}`,
    );

    const diff = currentResult.netSalary - targetNet;

    if (Math.abs(diff) < tolerance) {
      break;
    }

    if (diff > 0) {
      high = midGross;
    } else {
      low = midGross;
    }
  }

  return {
    grossSalary: Math.round(bestResult!.grossSalary),
    socialInsurance: Math.round(bestResult!.socialInsurance),
    healthInsurance: Math.round(bestResult!.healthInsurance),
    unemploymentInsurance: Math.round(bestResult!.unemploymentInsurance),
    taxableSalary: Math.round(bestResult!.taxableSalary),
    personalIncomeTax: Math.round(bestResult!.personalIncomeTax),
    netSalary: Math.round(bestResult!.netSalary),
    employerSocialInsurance: Math.round(bestResult!.employerSocialInsurance),
    employerHealthInsurance: Math.round(bestResult!.employerHealthInsurance),
    employerAccidentInsurance: Math.round(
      bestResult!.employerAccidentInsurance,
    ),
    employerUnemploymentInsurance: Math.round(
      bestResult!.employerUnemploymentInsurance,
    ),
  };
};
