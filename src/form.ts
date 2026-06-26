import { grossSalaryToNetSalary, netSalaryToGrossSalary } from "./calculation";
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
const basicSalaryElement = document.getElementById(
  "basicSalary",
) as HTMLInputElement;
const regionElement = document.getElementById("region") as HTMLSelectElement;
const insuranceSuperGroupElement = document.getElementById(
  "insuranceSuperGroup",
)!;
const insuranceGroupElement = document.getElementById("insuranceGroup")!;
const submitButton = document.getElementById("submitButton")!;
const formContainer = document.getElementById("formContainer") as HTMLDivElement;
const resultContainer = document.getElementById("resultContainer") as HTMLDivElement;

const collectSalaryData = (): SalaryData => {
  const salary = parseInt(salaryElement.value.replace(/\./g, ""));
  const insuranceSalary = parseInt(insuranceSalaryElement.value.replace(/\./g, ""));
  const dependents = parseInt(dependentsElement.value);
  const basicSalary = parseInt(basicSalaryElement.value.replace(/\./g, ""));
  const region = parseInt(regionElement.value);
  return {
    salary,
    dependents,
    basicSalary,
    region,
    insuranceSalary: insuranceSalary,
    fullInsurance: isFullElement.checked,
  };
};

export const handleFormSubmit = (
  setCalculationResult: (result: SalaryCalculationResult) => void,
) => {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const salaryData = collectSalaryData();
    const isGrossToNet = isGrossElement.checked;
    let result: SalaryCalculationResult;
    if (isGrossToNet) {
      result = grossSalaryToNetSalary(salaryData);
    } else {
      result = netSalaryToGrossSalary(salaryData);
    }
    formContainer.style.display = "none";
    setCalculationResult(result);
    resultContainer.style.display = "block";
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
