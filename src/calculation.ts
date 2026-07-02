import {
    BASE_SALARY_WEIGHT,
    EMPLOYER_ACCIDENT_INSURANCE_RATE,
    EMPLOYER_HEALTH_INSURANCE_RATE,
    EMPLOYER_SOCIAL_INSURANCE_RATE,
    EMPLOYER_UNEMPLOYMENT_INSURANCE_RATE,
    HEALTH_INSURANCE_RATE,
    MINIMUM_SALARY_WEIGHT,
    SOCIAL_INSURANCE_RATE,
    UNEMPLOYMENT_INSURANCE_RATE,
} from './const';
import { options } from './options';
import { SalaryCalculationResult, SalaryData } from './types';

export const grossSalaryToNetSalary = (salaryData: SalaryData): SalaryCalculationResult => {
    const { baseSalary, minimumSalary, taxRanges, personalDeduction, dependentDeduction } = options;
    const { salary: grossSalary, insuranceSalary, dependents, fullInsurance } = salaryData;
    const insuranceSalaryCapped = Math.min(fullInsurance ? grossSalary : insuranceSalary, baseSalary * BASE_SALARY_WEIGHT);
    const unemploymentInsuranceSalaryCapped = Math.min(fullInsurance ? grossSalary : insuranceSalary, minimumSalary[salaryData.region] * MINIMUM_SALARY_WEIGHT);
    const socialInsurance = insuranceSalaryCapped * SOCIAL_INSURANCE_RATE;
    const healthInsurance = insuranceSalaryCapped * HEALTH_INSURANCE_RATE;
    const unemploymentInsurance = unemploymentInsuranceSalaryCapped * UNEMPLOYMENT_INSURANCE_RATE;
    const employerSocialInsurance = insuranceSalaryCapped * EMPLOYER_SOCIAL_INSURANCE_RATE;
    const employerAccidentInsurance = insuranceSalaryCapped * EMPLOYER_ACCIDENT_INSURANCE_RATE;
    const employerHealthInsurance = insuranceSalaryCapped * EMPLOYER_HEALTH_INSURANCE_RATE;
    const employerUnemploymentInsurance = unemploymentInsuranceSalaryCapped * EMPLOYER_UNEMPLOYMENT_INSURANCE_RATE;
    const taxableSalary = Math.max(
        grossSalary - socialInsurance - healthInsurance - unemploymentInsurance - personalDeduction - dependents * dependentDeduction,
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

    const netSalary = grossSalary - socialInsurance - healthInsurance - unemploymentInsurance - personalIncomeTax;

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

export const netSalaryToGrossSalary = (salaryData: SalaryData): SalaryCalculationResult => {
    const targetNet = salaryData.salary;

    let low = targetNet;
    let high = targetNet * 2;
    const TOLERANCE = 0.1;
    const MAX_ITERATIONS = 200;

    let bestResult: SalaryCalculationResult | null = null;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const midGross = (low + high) / 2;

        const testData: SalaryData = {
            ...salaryData,
            salary: midGross,
        };

        const currentResult = grossSalaryToNetSalary(testData);

        bestResult = currentResult;

        const diff = currentResult.netSalary - targetNet;

        if (Math.abs(diff) < TOLERANCE) {
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
        employerAccidentInsurance: Math.round(bestResult!.employerAccidentInsurance),
        employerUnemploymentInsurance: Math.round(bestResult!.employerUnemploymentInsurance),
    };
};
