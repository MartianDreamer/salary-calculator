import { grossSalaryToNetSalary, netSalaryToGrossSalary } from "./calculation";
import { switchToResult } from "./navigation";
import { SalaryCalculationResult, SalaryData } from "./types";

const salaryElement = document.getElementById("salary") as HTMLInputElement;
const isGrossElement = document.getElementById("isGross") as HTMLInputElement;
const insuranceSalaryElement = document.getElementById(
  "insuranceSalary",
) as HTMLInputElement;
const isFullElement = document.getElementById(
  "insuranceFull",
) as HTMLInputElement;
const isManualElement = document.getElementById(
  "insuranceManual",
) as HTMLInputElement;
const dependentsElement = document.getElementById(
  "dependents",
) as HTMLInputElement;
const regionElement = document.getElementById("region") as HTMLSelectElement;
const insuranceGroupElement = document.getElementById("insuranceGroup")!;
const submitButton = document.getElementById("submitButton")!;

const collectSalaryData = (): SalaryData => {
  const salary = parseInt(salaryElement.value.replace(/\./g, ""));
  const insuranceSalary = parseInt(
    insuranceSalaryElement.value.replace(/\./g, ""),
  );
  const dependents = parseInt(dependentsElement.value);
  const region = parseInt(regionElement.value);
  return {
    salary: isNaN(salary) ? 0 : salary,
    dependents,
    region,
    insuranceSalary: isNaN(insuranceSalary) ? 0 : insuranceSalary,
    fullInsurance: isFullElement.checked,
  };
};

export const handleFormSubmit = (
  consumeCalculationResult: (result: SalaryCalculationResult) => void,
) => {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const salaryData = collectSalaryData();
    if (salaryData.salary === 0) {
      return;
    }
    const isGrossToNet = isGrossElement.checked;
    let result: SalaryCalculationResult;
    if (isGrossToNet) {
      result = grossSalaryToNetSalary(salaryData);
    } else {
      result = netSalaryToGrossSalary(salaryData);
    }
    consumeCalculationResult(result);
    switchToResult();
  });
};

export const handleUiChange = () => {
  // Disable BHXH
  isFullElement.addEventListener("change", (e) => {
    e.preventDefault();
    if (isFullElement.checked) {
      insuranceGroupElement.style.display = "none";
    }
  });

  // Enable BHXH
  isManualElement.addEventListener("change", (e) => {
    e.preventDefault();
    if (isManualElement.checked) {
      insuranceGroupElement.style.display = "block";
    }
  });
};
