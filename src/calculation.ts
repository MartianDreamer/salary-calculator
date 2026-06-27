import { options } from "./options";
import { SalaryCalculationResult, SalaryData } from "./types";

export const grossSalaryToNetSalary = (
  salaryData: SalaryData,
): SalaryCalculationResult => {
  const {
    baseSalary,
    minimumSalary,
    taxRanges,
    personalDeduction,
    dependentDeduction,
  } = options;
  const {
    salary: grossSalary,
    insuranceSalary,
    dependents,
    fullInsurance,
  } = salaryData;
  const insuranceSalaryCapped = Math.min(
    fullInsurance ? grossSalary : insuranceSalary,
    baseSalary * 20,
  );
  const unemploymentInsuranceSalaryCapped = Math.min(
    fullInsurance ? grossSalary : insuranceSalary,
    minimumSalary[salaryData.region] * 20,
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
      personalDeduction -
      dependents * dependentDeduction,
    0,
  );
  let personalIncomeTax = 0;

  for (const taxRange of taxRanges) {
    if (taxableSalary > taxRange.end) {
      personalIncomeTax += (taxRange.end - taxRange.start) * taxRange.rate;
    } else {
      personalIncomeTax += (taxableSalary - taxRange.start) * taxRange.rate;
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
