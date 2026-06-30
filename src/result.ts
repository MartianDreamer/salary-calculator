import { GIAM_TRU_GIA_CANH, GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC, DEFAULT_LOCALE } from "./const";
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
  resGrossElement.textContent = result.grossSalary.toLocaleString(DEFAULT_LOCALE);
  resInsuranceElement.textContent = `- ${(
    result.socialInsurance +
    result.healthInsurance +
    result.unemploymentInsurance
  ).toLocaleString(DEFAULT_LOCALE)}`;
  resTaxElement.textContent = `- ${result.personalIncomeTax.toLocaleString(DEFAULT_LOCALE)}`;
  resNetElement.textContent = result.netSalary.toLocaleString(DEFAULT_LOCALE);
  detailGrossElement.textContent = result.grossSalary.toLocaleString(DEFAULT_LOCALE);
  detailBhxhElement.textContent = result.socialInsurance.toLocaleString(DEFAULT_LOCALE);
  detailBhytElement.textContent = result.healthInsurance.toLocaleString(DEFAULT_LOCALE);
  detailBhtnElement.textContent = result.unemploymentInsurance.toLocaleString(DEFAULT_LOCALE);
  detailTnttElement.textContent = (
    result.grossSalary -
    result.socialInsurance -
    result.healthInsurance -
    result.unemploymentInsurance
  ).toLocaleString(DEFAULT_LOCALE);
  detailGtBanthan.textContent = GIAM_TRU_GIA_CANH.toLocaleString(DEFAULT_LOCALE);
  detailGtNptElement.textContent =
    GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC.toLocaleString(DEFAULT_LOCALE);
  detailTnctElement.textContent = result.taxableSalary.toLocaleString(DEFAULT_LOCALE);
  detailTaxElement.textContent = result.personalIncomeTax.toLocaleString(DEFAULT_LOCALE);
  detailNetElement.textContent = result.netSalary.toLocaleString(DEFAULT_LOCALE);
  employerGrossElement.textContent = result.grossSalary.toLocaleString(DEFAULT_LOCALE);
  employerBhxhElement.textContent =
    result.employerSocialInsurance.toLocaleString(DEFAULT_LOCALE);
  employerBhtnldElement.textContent =
    result.employerAccidentInsurance.toLocaleString(DEFAULT_LOCALE);
  employerBhytElement.textContent =
    result.employerHealthInsurance.toLocaleString(DEFAULT_LOCALE);
  employerBhtnElement.textContent =
    result.employerUnemploymentInsurance.toLocaleString(DEFAULT_LOCALE);
  employerTotalElement.textContent = (
    result.grossSalary +
    result.employerSocialInsurance +
    result.employerAccidentInsurance +
    result.employerHealthInsurance +
    result.employerUnemploymentInsurance
  ).toLocaleString(DEFAULT_LOCALE);
};
