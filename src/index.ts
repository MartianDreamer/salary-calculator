import { handleFormSubmit, handleUiChange } from "./form";
import { handleOptions } from "./options";
import { handleBackButtonClick, renderSalaryCalculationResult } from "./result";
import { handleTabClick } from "./navigation";

const handleFormatInput = () => {
  document.querySelectorAll('input[type="text"]').forEach((input) => {
    const htmlInput = input as HTMLInputElement;
    const parsedValue = parseInt(htmlInput.value.replace(/\./g, ""));
    if (!isNaN(parsedValue)) {
      htmlInput.value = parsedValue.toLocaleString("vi-VN");
    }
    htmlInput.addEventListener("input", () => {
      if (isNaN(parseInt(htmlInput.value.replace(/\./g, "")))) {
        htmlInput.value = "";
      } else {
        htmlInput.value = parseInt(
          htmlInput.value.replace(/\./g, ""),
        ).toLocaleString("vi-VN");
      }
    });
  });
};

const main = () => {
  handleTabClick();
  handleOptions();
  handleFormatInput();
  handleUiChange();
  handleBackButtonClick();
  handleFormSubmit(renderSalaryCalculationResult);
};

main();
