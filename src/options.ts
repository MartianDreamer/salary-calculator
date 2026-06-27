import {
  BASE_SALARY,
  GIAM_TRU_GIA_CANH,
  GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC,
  MINIMUM_SALARY,
  TAX_RANGES,
} from "./const";
import { OpenStartRange } from "./range";

export const options = {
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

const loadDefaultOptionsToUI = () => {
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
  loadDefaultOptionsToUI();

  optBaseSalaryElement.addEventListener("input", () => {
    options.baseSalary = parseInt(
      optBaseSalaryElement.value.replace(/\./g, ""),
    );
  });

  optPersonalDeductionElement.addEventListener("input", () => {
    options.personalDeduction = parseInt(
      optPersonalDeductionElement.value.replace(/\./g, ""),
    );
  });

  optDependentDeductionElement.addEventListener("input", () => {
    options.dependentDeduction = parseInt(
      optDependentDeductionElement.value.replace(/\./g, ""),
    );
  });

  optRegion1Element.addEventListener("input", () => {
    options.minimumSalary[0] = parseInt(
      optRegion1Element.value.replace(/\./g, ""),
    );
  });

  optRegion2Element.addEventListener("input", () => {
    options.minimumSalary[1] = parseInt(
      optRegion2Element.value.replace(/\./g, ""),
    );
  });

  optRegion3Element.addEventListener("input", () => {
    options.minimumSalary[2] = parseInt(
      optRegion3Element.value.replace(/\./g, ""),
    );
  });

  optRegion4Element.addEventListener("input", () => {
    options.minimumSalary[3] = parseInt(
      optRegion4Element.value.replace(/\./g, ""),
    );
  });

  deleteAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    options.taxRanges = [];
    loadTaxRangesToUI();
  });

  addNewButton.addEventListener("click", (e) => {
    if (beingInserted) {
      return;
    }
    const taxRanges = options.taxRanges;
    const lastRange =
      taxRanges.length > 0 ? taxRanges[taxRanges.length - 1] : null;
    if (lastRange && lastRange.end === Number.POSITIVE_INFINITY) {
      return;
    }
    const start = lastRange?.end ?? 0;
    let end = 0;
    let value = 0;

    taxSettingsTableBody.insertAdjacentHTML(
      "beforeend",
      `
        <tr class="tax-row" id="insertRow">
          <td><input id="insertedEnd" type="text"></td>
          <td><input  id="insertedValue" type="number"></td>
        </tr>
        <tr id="confirmRow">
            <td colspan="2">
                <button id="insertConfirm" class="btn-confirm">Xác nhận</button>
            </td>
        </tr>
      `,
    );

    beingInserted = true;

    const insertRow = document.getElementById("insertRow")!;
    const confirmRow = document.getElementById("confirmRow")!;
    const insertedEndElement = document.getElementById(
      "insertedEnd",
    ) as HTMLInputElement;
    const insertedValueElement = document.getElementById(
      "insertedValue",
    ) as HTMLInputElement;
    const insertConfirmElement = document.getElementById(
      "insertConfirm",
    ) as HTMLButtonElement;

    insertedEndElement.addEventListener("input", () => {
      if (isNaN(parseInt(insertedEndElement.value.replace(/\./g, "")))) {
        insertedEndElement.value = "";
      } else {
        insertedEndElement.value = parseInt(
          insertedEndElement.value.replace(/\./g, ""),
        ).toLocaleString("vi-VN");
        end = parseInt(insertedEndElement.value.replace(/\./g, ""));
      }
    });

    insertedValueElement.addEventListener("input", () => {
      value = parseFloat(insertedValueElement.value);
    });

    insertConfirmElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (value === 0 || end < start) {
        return;
      }
      const insertedTaxRange = new OpenStartRange(start, end, value);
      options.taxRanges.push(insertedTaxRange);
      insertRow.remove();
      confirmRow.remove();
      insertTaxRange(insertedTaxRange);
      beingInserted = false;
    });
  });
};

const loadTaxRangesToUI = () => {
  taxSettingsTableBody.innerHTML = "";
  for (const taxRange of options.taxRanges) {
    insertTaxRange(taxRange);
  }
};

const insertTaxRange = (taxRange: OpenStartRange<number>) => {
  taxSettingsTableBody.insertAdjacentHTML(
    "beforeend",
    `
      <tr id="row-${taxRange.toString()}" class="tax-row">
        <td><input disabled type="text" value="${taxRange.end.toLocaleString("vi-VN")}"></td>
        <td><input disabled type="number" value="${taxRange.value}"></td>
      </tr>`,
  );
};
