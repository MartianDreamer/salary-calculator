import { GIAM_TRU_GIA_CANH, GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC } from "./const";
import { switchBackToForm } from "./navigation";
import { SalaryCalculationResult } from "./types";

const backButton = document.getElementById("backButton") as HTMLButtonElement;
const resGrossElement = document.getElementById(
  "res-gross",
) as HTMLTableCellElement;
const resInsuranceElement = document.getElementById(
  "res-insurance",
) as HTMLTableCellElement;
const resTaxElement = document.getElementById(
  "res-tax",
) as HTMLTableCellElement;
const resNetElement = document.getElementById(
  "res-net",
) as HTMLTableCellElement;
const detailGrossElement = document.getElementById(
  "detail-gross",
) as HTMLTableCellElement;
const detailBhxhElement = document.getElementById(
  "detail-bhxh",
) as HTMLTableCellElement;
const detailBhytElement = document.getElementById(
  "detail-bhyt",
) as HTMLTableCellElement;
const detailBhtnElement = document.getElementById(
  "detail-bhtn",
) as HTMLTableCellElement;
const detailTnttElement = document.getElementById(
  "detail-tntt",
) as HTMLTableCellElement;
const detailGtBanthan = document.getElementById(
  "detail-gt-banthan",
) as HTMLTableCellElement;
const detailGtNptElement = document.getElementById(
  "detail-gt-npt",
) as HTMLTableCellElement;
const detailTnctElement = document.getElementById(
  "detail-tnct",
) as HTMLTableCellElement;
const detailTaxElement = document.getElementById(
  "detail-tax",
) as HTMLTableCellElement;
const detailNetElement = document.getElementById(
  "detail-net",
) as HTMLTableCellElement;
const employerGrossElement = document.getElementById(
  "employer-gross",
) as HTMLTableCellElement;
const employerBhxhElement = document.getElementById(
  "employer-bhxh",
) as HTMLTableCellElement;
const employerBhtnldElement = document.getElementById(
  "employer-bhtnld",
) as HTMLTableCellElement;
const employerBhytElement = document.getElementById(
  "employer-bhyt",
) as HTMLTableCellElement;
const employerBhtnElement = document.getElementById(
  "employer-bhtn",
) as HTMLTableCellElement;
const employerTotalElement = document.getElementById(
  "employer-total",
) as HTMLTableCellElement;

export const handleBackButtonClick = () => {
  backButton.addEventListener("click", switchBackToForm);
};

export const renderSalaryCalculationResult = (
  result: SalaryCalculationResult,
) => {
  resGrossElement.textContent = result.grossSalary.toLocaleString();
  resInsuranceElement.textContent = `- ${(
    result.socialInsurance +
    result.healthInsurance +
    result.unemploymentInsurance
  ).toLocaleString()}`;
  resTaxElement.textContent = `- ${result.personalIncomeTax.toLocaleString()}`;
  resNetElement.textContent = result.netSalary.toLocaleString();
  detailGrossElement.textContent = result.grossSalary.toLocaleString();
  detailBhxhElement.textContent = result.socialInsurance.toLocaleString();
  detailBhytElement.textContent = result.healthInsurance.toLocaleString();
  detailBhtnElement.textContent = result.unemploymentInsurance.toLocaleString();
  detailTnttElement.textContent = (
    result.grossSalary -
    result.socialInsurance -
    result.healthInsurance -
    result.unemploymentInsurance
  ).toLocaleString();
  detailGtBanthan.textContent = GIAM_TRU_GIA_CANH.toLocaleString();
  detailGtNptElement.textContent =
    GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC.toLocaleString();
  detailTnctElement.textContent = result.taxableSalary.toLocaleString();
  detailTaxElement.textContent = result.personalIncomeTax.toLocaleString();
  detailNetElement.textContent = result.netSalary.toLocaleString();
  employerGrossElement.textContent = result.grossSalary.toLocaleString();
  employerBhxhElement.textContent =
    result.employerSocialInsurance.toLocaleString();
  employerBhtnldElement.textContent =
    result.employerAccidentInsurance.toLocaleString();
  employerBhytElement.textContent =
    result.employerHealthInsurance.toLocaleString();
  employerBhtnElement.textContent =
    result.employerUnemploymentInsurance.toLocaleString();
  employerTotalElement.textContent = (
    result.grossSalary +
    result.employerSocialInsurance +
    result.employerAccidentInsurance +
    result.employerHealthInsurance +
    result.employerUnemploymentInsurance
  ).toLocaleString();
};
