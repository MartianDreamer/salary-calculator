var App = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/const.ts
  var GIAM_TRU_GIA_CANH = 155e5;
  var GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC = 62e5;
  var TAX_RANGES = [
    { start: 0, end: 1e7, rate: 0.05 },
    { start: 1e7, end: 3e7, rate: 0.1 },
    { start: 3e7, end: 6e7, rate: 0.2 },
    { start: 6e7, end: 1e8, rate: 0.3 },
    { start: 1e8, end: Number.POSITIVE_INFINITY, rate: 0.35 }
  ];
  var MINIMUM_SALARY_I = 531e4;
  var MINIMUM_SALARY_II = 473e4;
  var MINIMUM_SALARY_III = 414e4;
  var MINIMUM_SALARY_IV = 37e5;
  var BASE_SALARY = 253e4;
  var MINIMUM_SALARY = [
    MINIMUM_SALARY_I,
    MINIMUM_SALARY_II,
    MINIMUM_SALARY_III,
    MINIMUM_SALARY_IV
  ];

  // src/options.ts
  var LOCAL_STORAGE_KEY = "salaryCalculatorOptions";
  var options = {
    baseSalary: BASE_SALARY,
    minimumSalary: MINIMUM_SALARY,
    taxRanges: TAX_RANGES,
    personalDeduction: GIAM_TRU_GIA_CANH,
    dependentDeduction: GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC
  };
  var optBaseSalaryElement = document.getElementById(
    "opt-base-salary"
  );
  var optPersonalDeductionElement = document.getElementById(
    "opt-personal-deduction"
  );
  var optDependentDeductionElement = document.getElementById(
    "opt-dependent-deduction"
  );
  var optRegion1Element = document.getElementById(
    "opt-region-1"
  );
  var optRegion2Element = document.getElementById(
    "opt-region-2"
  );
  var optRegion3Element = document.getElementById(
    "opt-region-3"
  );
  var optRegion4Element = document.getElementById(
    "opt-region-4"
  );
  var taxSettingsTableBody = document.getElementById(
    "taxSettingsTableBody"
  );
  var deleteAllButton = document.getElementById(
    "deleteAllButton"
  );
  var addNewButton = document.getElementById(
    "addNewButton"
  );
  var resetOptionButton = document.getElementById(
    "resetOptionButton"
  );
  var loadOptionsToUI = () => {
    optBaseSalaryElement.value = options.baseSalary.toLocaleString("vi-VN");
    optPersonalDeductionElement.value = options.personalDeduction.toLocaleString("vi-VN");
    optDependentDeductionElement.value = options.dependentDeduction.toLocaleString("vi-VN");
    optRegion1Element.value = options.minimumSalary[0].toLocaleString("vi-VN");
    optRegion2Element.value = options.minimumSalary[1].toLocaleString("vi-VN");
    optRegion3Element.value = options.minimumSalary[2].toLocaleString("vi-VN");
    optRegion4Element.value = options.minimumSalary[3].toLocaleString("vi-VN");
    loadTaxRangesToUI();
  };
  var handleOptions = () => {
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
        optBaseSalaryElement.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optPersonalDeductionElement.addEventListener("input", () => {
      options.personalDeduction = parseInt(
        optPersonalDeductionElement.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optDependentDeductionElement.addEventListener("input", () => {
      options.dependentDeduction = parseInt(
        optDependentDeductionElement.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optRegion1Element.addEventListener("input", () => {
      options.minimumSalary[0] = parseInt(
        optRegion1Element.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optRegion2Element.addEventListener("input", () => {
      options.minimumSalary[1] = parseInt(
        optRegion2Element.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optRegion3Element.addEventListener("input", () => {
      options.minimumSalary[2] = parseInt(
        optRegion3Element.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    optRegion4Element.addEventListener("input", () => {
      options.minimumSalary[3] = parseInt(
        optRegion4Element.value.replace(/\./g, "")
      );
      saveToLocalStorage();
    });
    deleteAllButton.addEventListener("click", (e) => {
      e.preventDefault();
      options.taxRanges = [];
      loadTaxRangesToUI();
      beingInserted = false;
      saveToLocalStorage();
    });
    addNewButton.addEventListener("click", (e) => {
      var _a;
      if (beingInserted) {
        return;
      }
      const taxRanges = options.taxRanges;
      const lastRange = taxRanges.length > 0 ? taxRanges[taxRanges.length - 1] : null;
      if (lastRange && lastRange.end === Number.POSITIVE_INFINITY) {
        return;
      }
      const start = (_a = lastRange == null ? void 0 : lastRange.end) != null ? _a : 0;
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
                <button id="insertConfirm" class="btn-confirm">X\xE1c nh\u1EADn</button>
            </td>
        </tr>
      `
      );
      beingInserted = true;
      const insertRow = document.getElementById("insertRow");
      const confirmRow = document.getElementById("confirmRow");
      const insertedEndElement = document.getElementById(
        "insertedEnd"
      );
      const insertedValueElement = document.getElementById(
        "insertedValue"
      );
      const insertConfirmElement = document.getElementById(
        "insertConfirm"
      );
      insertedEndElement.addEventListener("input", () => {
        if (isNaN(parseInt(insertedEndElement.value.replace(/\./g, "")))) {
          insertedEndElement.value = "";
        } else {
          insertedEndElement.value = parseInt(
            insertedEndElement.value.replace(/\./g, "")
          ).toLocaleString("vi-VN");
          end = parseInt(insertedEndElement.value.replace(/\./g, ""));
        }
      });
      insertedValueElement.addEventListener("input", () => {
        value = parseFloat(insertedValueElement.value);
      });
      insertConfirmElement.addEventListener("click", (e2) => {
        e2.preventDefault();
        if (value === 0 || end < start) {
          return;
        }
        const insertedTaxRange = { start, end, rate: value };
        taxRanges.push(insertedTaxRange);
        insertRow.remove();
        confirmRow.remove();
        insertTaxRange(insertedTaxRange);
        beingInserted = false;
        saveToLocalStorage();
      });
    });
  };
  var loadTaxRangesToUI = () => {
    taxSettingsTableBody.innerHTML = "";
    for (const taxRange of options.taxRanges) {
      insertTaxRange(taxRange);
    }
  };
  var insertTaxRange = (taxRange) => {
    taxSettingsTableBody.insertAdjacentHTML(
      "beforeend",
      `
      <tr id="row-${taxRange.toString()}" class="tax-row">
        <td><input disabled type="text" value="${taxRange.end.toLocaleString("vi-VN")}"></td>
        <td><input disabled type="number" value="${taxRange.rate}"></td>
      </tr>`
    );
  };
  var tryLoadFromLocalStorage = () => {
    const optionsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!optionsString) {
      loadDefaultValue();
      return;
    }
    options = __spreadValues({}, JSON.parse(optionsString));
    if (!options.taxRanges) {
      options.taxRanges = [];
    } else if (options.taxRanges.length > 0 && !options.taxRanges[options.taxRanges.length - 1].end) {
      options.taxRanges[options.taxRanges.length - 1].end = Number.POSITIVE_INFINITY;
    }
  };
  var saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(options));
  };
  var loadDefaultValue = () => {
    options = {
      baseSalary: BASE_SALARY,
      minimumSalary: MINIMUM_SALARY,
      taxRanges: TAX_RANGES,
      personalDeduction: GIAM_TRU_GIA_CANH,
      dependentDeduction: GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC
    };
  };

  // src/calculation.ts
  var grossSalaryToNetSalary = (salaryData) => {
    const {
      baseSalary,
      minimumSalary,
      taxRanges,
      personalDeduction,
      dependentDeduction
    } = options;
    const {
      salary: grossSalary,
      insuranceSalary,
      dependents,
      fullInsurance
    } = salaryData;
    const insuranceSalaryCapped = Math.min(
      fullInsurance ? grossSalary : insuranceSalary,
      baseSalary * 20
    );
    const unemploymentInsuranceSalaryCapped = Math.min(
      fullInsurance ? grossSalary : insuranceSalary,
      minimumSalary[salaryData.region] * 20
    );
    const socialInsurance = insuranceSalaryCapped * 0.08;
    const healthInsurance = insuranceSalaryCapped * 0.015;
    const unemploymentInsurance = unemploymentInsuranceSalaryCapped * 0.01;
    const employerSocialInsurance = insuranceSalaryCapped * 0.17;
    const employerAccidentInsurance = insuranceSalaryCapped * 5e-3;
    const employerHealthInsurance = insuranceSalaryCapped * 0.03;
    const employerUnemploymentInsurance = unemploymentInsuranceSalaryCapped * 0.01;
    const taxableSalary = Math.max(
      grossSalary - socialInsurance - healthInsurance - unemploymentInsurance - personalDeduction - dependents * dependentDeduction,
      0
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
      employerUnemploymentInsurance: Math.round(employerUnemploymentInsurance)
    };
  };
  var netSalaryToGrossSalary = (salaryData) => {
    const targetNet = salaryData.salary;
    let low = targetNet;
    let high = Math.max(targetNet * 2, 2e9);
    let tolerance = 0.01;
    let maxIterations = 400;
    let bestResult = null;
    for (let i = 0; i < maxIterations; i++) {
      const midGross = (low + high) / 2;
      const testData = __spreadProps(__spreadValues({}, salaryData), {
        salary: midGross
      });
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
      grossSalary: Math.round(bestResult.grossSalary),
      socialInsurance: Math.round(bestResult.socialInsurance),
      healthInsurance: Math.round(bestResult.healthInsurance),
      unemploymentInsurance: Math.round(bestResult.unemploymentInsurance),
      taxableSalary: Math.round(bestResult.taxableSalary),
      personalIncomeTax: Math.round(bestResult.personalIncomeTax),
      netSalary: Math.round(bestResult.netSalary),
      employerSocialInsurance: Math.round(bestResult.employerSocialInsurance),
      employerHealthInsurance: Math.round(bestResult.employerHealthInsurance),
      employerAccidentInsurance: Math.round(
        bestResult.employerAccidentInsurance
      ),
      employerUnemploymentInsurance: Math.round(
        bestResult.employerUnemploymentInsurance
      )
    };
  };

  // src/navigation.ts
  var MAIN_TAB = "main";
  var OPTION_TAB = "option";
  var FORM = "form";
  var RESULT = "result";
  var tabMainElement = document.getElementById("tab-main");
  var mainTabElement = document.getElementById("main-tab");
  var tabOptionElement = document.getElementById("tab-options");
  var optionTabElement = document.getElementById("option-tab");
  var formContainer = document.getElementById("formContainer");
  var resultContainer = document.getElementById("resultContainer");
  var currentMainScreen = FORM;
  var handleTabClick = () => {
    tabMainElement.addEventListener("click", () => {
      window.location.href = `#${MAIN_TAB}#${currentMainScreen}`;
    });
    tabOptionElement.addEventListener("click", () => {
      window.location.href = `#${OPTION_TAB}`;
    });
    window.addEventListener("hashchange", () => {
      switch (window.location.hash) {
        case `#${OPTION_TAB}`:
          openOptionTab();
          break;
        case `#${MAIN_TAB}#${FORM}`:
          handleSwitchBackToForm();
          break;
        case `#${MAIN_TAB}#${RESULT}`:
          handleSwitchToResult();
          break;
        default:
          window.location.href = `#${MAIN_TAB}#${FORM}`;
      }
    });
  };
  var switchToResult = () => {
    window.location.href = `#${MAIN_TAB}#${RESULT}`;
  };
  var handleSwitchToResult = () => {
    currentMainScreen = RESULT;
    openMainTab();
    formContainer.style.display = "none";
    resultContainer.style.display = "block";
  };
  var switchBackToForm = () => {
    window.location.href = `#${MAIN_TAB}#${FORM}`;
  };
  var handleSwitchBackToForm = () => {
    currentMainScreen = FORM;
    openMainTab();
    resultContainer.style.display = "none";
    formContainer.style.display = "block";
  };
  var openOptionTab = () => {
    tabOptionElement.classList.add("active");
    tabMainElement.classList.remove("active");
    mainTabElement.style.display = "none";
    optionTabElement.style.display = "block";
  };
  var openMainTab = () => {
    tabMainElement.classList.add("active");
    tabOptionElement.classList.remove("active");
    mainTabElement.style.display = "block";
    optionTabElement.style.display = "none";
  };

  // src/form.ts
  var salaryElement = document.getElementById("salary");
  var isGrossElement = document.getElementById("isGross");
  var insuranceSalaryElement = document.getElementById(
    "insuranceSalary"
  );
  var isFullElement = document.getElementById(
    "insuranceFull"
  );
  var isManualElement = document.getElementById(
    "insuranceManual"
  );
  var dependentsElement = document.getElementById(
    "dependents"
  );
  var regionElement = document.getElementById("region");
  var insuranceGroupElement = document.getElementById("insuranceGroup");
  var submitButton = document.getElementById("submitButton");
  var collectSalaryData = () => {
    const salary = parseInt(salaryElement.value.replace(/\./g, ""));
    const insuranceSalary = parseInt(
      insuranceSalaryElement.value.replace(/\./g, "")
    );
    const dependents = parseInt(dependentsElement.value);
    const region = parseInt(regionElement.value);
    return {
      salary: isNaN(salary) ? 0 : salary,
      dependents,
      region,
      insuranceSalary: isNaN(insuranceSalary) ? 0 : insuranceSalary,
      fullInsurance: isFullElement.checked
    };
  };
  var handleFormSubmit = (consumeCalculationResult) => {
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const salaryData = collectSalaryData();
      if (salaryData.salary === 0) {
        return;
      }
      const isGrossToNet = isGrossElement.checked;
      let result;
      if (isGrossToNet) {
        result = grossSalaryToNetSalary(salaryData);
      } else {
        result = netSalaryToGrossSalary(salaryData);
      }
      consumeCalculationResult(result);
      switchToResult();
    });
  };
  var handleUiChange = () => {
    isFullElement.addEventListener("change", (e) => {
      e.preventDefault();
      if (isFullElement.checked) {
        insuranceGroupElement.style.display = "none";
      }
    });
    isManualElement.addEventListener("change", (e) => {
      e.preventDefault();
      if (isManualElement.checked) {
        insuranceGroupElement.style.display = "block";
      }
    });
  };

  // src/result.ts
  var backButton = document.getElementById("backButton");
  var resGrossElement = document.getElementById(
    "res-gross"
  );
  var resInsuranceElement = document.getElementById(
    "res-insurance"
  );
  var resTaxElement = document.getElementById(
    "res-tax"
  );
  var resNetElement = document.getElementById(
    "res-net"
  );
  var detailGrossElement = document.getElementById(
    "detail-gross"
  );
  var detailBhxhElement = document.getElementById(
    "detail-bhxh"
  );
  var detailBhytElement = document.getElementById(
    "detail-bhyt"
  );
  var detailBhtnElement = document.getElementById(
    "detail-bhtn"
  );
  var detailTnttElement = document.getElementById(
    "detail-tntt"
  );
  var detailGtBanthan = document.getElementById(
    "detail-gt-banthan"
  );
  var detailGtNptElement = document.getElementById(
    "detail-gt-npt"
  );
  var detailTnctElement = document.getElementById(
    "detail-tnct"
  );
  var detailTaxElement = document.getElementById(
    "detail-tax"
  );
  var detailNetElement = document.getElementById(
    "detail-net"
  );
  var employerGrossElement = document.getElementById(
    "employer-gross"
  );
  var employerBhxhElement = document.getElementById(
    "employer-bhxh"
  );
  var employerBhtnldElement = document.getElementById(
    "employer-bhtnld"
  );
  var employerBhytElement = document.getElementById(
    "employer-bhyt"
  );
  var employerBhtnElement = document.getElementById(
    "employer-bhtn"
  );
  var employerTotalElement = document.getElementById(
    "employer-total"
  );
  var handleBackButtonClick = () => {
    backButton.addEventListener("click", switchBackToForm);
  };
  var renderSalaryCalculationResult = (result) => {
    resGrossElement.textContent = result.grossSalary.toLocaleString();
    resInsuranceElement.textContent = `- ${(result.socialInsurance + result.healthInsurance + result.unemploymentInsurance).toLocaleString()}`;
    resTaxElement.textContent = `- ${result.personalIncomeTax.toLocaleString()}`;
    resNetElement.textContent = result.netSalary.toLocaleString();
    detailGrossElement.textContent = result.grossSalary.toLocaleString();
    detailBhxhElement.textContent = result.socialInsurance.toLocaleString();
    detailBhytElement.textContent = result.healthInsurance.toLocaleString();
    detailBhtnElement.textContent = result.unemploymentInsurance.toLocaleString();
    detailTnttElement.textContent = (result.grossSalary - result.socialInsurance - result.healthInsurance - result.unemploymentInsurance).toLocaleString();
    detailGtBanthan.textContent = GIAM_TRU_GIA_CANH.toLocaleString();
    detailGtNptElement.textContent = GIAM_TRU_GIA_CANH_NGUOI_PHU_THUOC.toLocaleString();
    detailTnctElement.textContent = result.taxableSalary.toLocaleString();
    detailTaxElement.textContent = result.personalIncomeTax.toLocaleString();
    detailNetElement.textContent = result.netSalary.toLocaleString();
    employerGrossElement.textContent = result.grossSalary.toLocaleString();
    employerBhxhElement.textContent = result.employerSocialInsurance.toLocaleString();
    employerBhtnldElement.textContent = result.employerAccidentInsurance.toLocaleString();
    employerBhytElement.textContent = result.employerHealthInsurance.toLocaleString();
    employerBhtnElement.textContent = result.employerUnemploymentInsurance.toLocaleString();
    employerTotalElement.textContent = (result.grossSalary + result.employerSocialInsurance + result.employerAccidentInsurance + result.employerHealthInsurance + result.employerUnemploymentInsurance).toLocaleString();
  };

  // src/index.ts
  var handleFormatInput = () => {
    document.querySelectorAll('input[type="text"]').forEach((input) => {
      const htmlInput = input;
      const parsedValue = parseInt(htmlInput.value.replace(/\./g, ""));
      if (!isNaN(parsedValue)) {
        htmlInput.value = parsedValue.toLocaleString("vi-VN");
      }
      htmlInput.addEventListener("input", () => {
        if (isNaN(parseInt(htmlInput.value.replace(/\./g, "")))) {
          htmlInput.value = "";
        } else {
          htmlInput.value = parseInt(
            htmlInput.value.replace(/\./g, "")
          ).toLocaleString("vi-VN");
        }
      });
    });
  };
  var main = () => {
    handleTabClick();
    handleOptions();
    handleFormatInput();
    handleUiChange();
    handleBackButtonClick();
    handleFormSubmit(renderSalaryCalculationResult);
  };
  main();
})();
