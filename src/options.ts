import {
  BASE_SALARY,
  GIAM_TRU_GIA_CANH,
  GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
  MINIMUM_SALARY,
  TAX_RANGES,
} from "./const";
import { Option, TaxRange } from "./types";

const LOCAL_STORAGE_KEY = "salaryCalculatorOptions";

export let options: Option = {
  baseSalary: BASE_SALARY,
  minimumSalary: MINIMUM_SALARY,
  taxRanges: TAX_RANGES,
  personalDeduction: GIAM_TRU_GIA_CANH,
  dependentDeduction: GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
};

const optBaseSalaryElement = document.getElementById(
  "opt-base-salary",
) as HTMLInputElement;
const optPersonalDeductionElement = document.getElementById(
  "opt-personal-deduction",
) as HTMLInputElement;
const optDependentDeductionElement = document.getElementById(
  "opt-dependent-deduction",
) as HTMLInputElement;
const optRegion1Element = document.getElementById(
  "opt-region-1",
) as HTMLInputElement;
const optRegion2Element = document.getElementById(
  "opt-region-2",
) as HTMLInputElement;
const optRegion3Element = document.getElementById(
  "opt-region-3",
) as HTMLInputElement;
const optRegion4Element = document.getElementById(
  "opt-region-4",
) as HTMLInputElement;
const taxSettingsTableBody = document.getElementById(
  "taxSettingsTableBody",
) as HTMLTableSectionElement;
const deleteAllButton = document.getElementById(
  "deleteAllButton",
) as HTMLButtonElement;
const addNewButton = document.getElementById(
  "addNewButton",
) as HTMLButtonElement;
const resetOptionButton = document.getElementById(
  "resetOptionButton",
) as HTMLButtonElement;
const insertedEndElement = document.getElementById(
  "insertedEnd",
) as HTMLInputElement;
const insertedValueElement = document.getElementById(
  "insertedValue",
) as HTMLInputElement;
const insertConfirmElement = document.getElementById(
  "insertConfirm",
) as HTMLButtonElement;
const insertRow = document.getElementById("insertRow")!;
const confirmRow = document.getElementById("confirmRow")!;

const loadOptionsToUI = () => {
  optBaseSalaryElement.value = options.baseSalary.toLocaleString("vi-VN");
  optPersonalDeductionElement.value =
    options.personalDeduction.toLocaleString("vi-VN");
  optDependentDeductionElement.value =
    options.dependentDeduction.toLocaleString("vi-VN");
  optRegion1Element.value = options.minimumSalary[0].toLocaleString("vi-VN");
  optRegion2Element.value = options.minimumSalary[1].toLocaleString("vi-VN");
  optRegion3Element.value = options.minimumSalary[2].toLocaleString("vi-VN");
  optRegion4Element.value = options.minimumSalary[3].toLocaleString("vi-VN");
  loadTaxRangesToUI();
};

export const handleOptions = () => {
  let beingInserted = false;

  tryLoadFromLocalStorage();
  loadOptionsToUI();

  resetOptionButton.addEventListener("click", (e) => {
    e.preventDefault();
    loadDefaultValue();
    saveToLocalStorage();
    loadOptionsToUI();
  });

  optBaseSalaryElement.addEventListener("input", () => {
    options.baseSalary = parseInt(
      optBaseSalaryElement.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optPersonalDeductionElement.addEventListener("input", () => {
    options.personalDeduction = parseInt(
      optPersonalDeductionElement.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optDependentDeductionElement.addEventListener("input", () => {
    options.dependentDeduction = parseInt(
      optDependentDeductionElement.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optRegion1Element.addEventListener("input", () => {
    options.minimumSalary[0] = parseInt(
      optRegion1Element.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optRegion2Element.addEventListener("input", () => {
    options.minimumSalary[1] = parseInt(
      optRegion2Element.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optRegion3Element.addEventListener("input", () => {
    options.minimumSalary[2] = parseInt(
      optRegion3Element.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  optRegion4Element.addEventListener("input", () => {
    options.minimumSalary[3] = parseInt(
      optRegion4Element.value.replace(/\./g, ""),
    );
    saveToLocalStorage();
  });

  deleteAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    options.taxRanges = [];
    loadTaxRangesToUI();
    saveToLocalStorage();
  });

  insertedEndElement.addEventListener("input", () => {
    if (isNaN(parseInt(insertedEndElement.value.replace(/\./g, "")))) {
      insertedEndElement.value = "";
    } else {
      insertedEndElement.value = parseInt(
        insertedEndElement.value.replace(/\./g, ""),
      ).toLocaleString("vi-VN");
    }
  });

  insertConfirmElement.addEventListener("click", (e) => {
    e.preventDefault();
    const lastRange =
      options.taxRanges.length > 0
        ? options.taxRanges[options.taxRanges.length - 1]
        : null;

    const start = lastRange?.end ?? 0;
    const end = parseInt(insertedEndElement.value.replace(/\./g, ""));
    const rate = parseFloat(insertedValueElement.value);
    if (rate === 0 || end < start) {
      return;
    }
    const insertedTaxRange = { start, end, rate };
    options.taxRanges.push(insertedTaxRange);
    insertRow.classList.add("hidden");
    confirmRow.classList.add("hidden");
    insertTaxRange(insertedTaxRange);
    saveToLocalStorage();
    insertedEndElement.value = "";
    insertedValueElement.value = "";
    beingInserted = false;
  });

  addNewButton.addEventListener("click", (e) => {
    if (beingInserted) {
      return;
    }

    const lastRange =
      options.taxRanges.length > 0
        ? options.taxRanges[options.taxRanges.length - 1]
        : null;
    if (lastRange && lastRange.end === Number.POSITIVE_INFINITY) {
      return;
    }

    insertRow.classList.remove("hidden");
    confirmRow.classList.remove("hidden");

    beingInserted = true;
  });
};

const loadTaxRangesToUI = () => {
  for (const child of Array.from(taxSettingsTableBody.children)) {
    if (child.id !== "insertRow" && child.id !== "confirmRow") {
      child.remove();
    }
  }
  for (const taxRange of options.taxRanges) {
    insertTaxRange(taxRange);
  }
};

const insertTaxRange = (taxRange: TaxRange) => {
  insertRow.insertAdjacentHTML(
    "beforebegin",
    `
      <tr id="row-${taxRange.toString()}" class="tax-row">
        <td><input disabled type="text" value="${taxRange.end.toLocaleString("vi-VN")}"></td>
        <td><input disabled type="number" value="${taxRange.rate}"></td>
      </tr>`,
  );
};

const tryLoadFromLocalStorage = () => {
  const optionsString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!optionsString) {
    loadDefaultValue();
    return;
  }
  options = {
    ...JSON.parse(optionsString),
  };
  if (!options.taxRanges) {
    options.taxRanges = [];
  } else if (
    options.taxRanges.length > 0 &&
    !options.taxRanges[options.taxRanges.length - 1].end
  ) {
    options.taxRanges[options.taxRanges.length - 1].end =
      Number.POSITIVE_INFINITY;
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(options));
};

const loadDefaultValue = () => {
  options = {
    baseSalary: BASE_SALARY,
    minimumSalary: MINIMUM_SALARY,
    taxRanges: TAX_RANGES,
    personalDeduction: GIAM_TRU_GIA_CANH,
    dependentDeduction: GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
  };
};
