import { DEFAULT_LOCALE } from "./const";

export const handleFormatInput = () => {
  document.querySelectorAll('input[type="text"][data-number-formated]').forEach((input) => {
    const htmlInput = input as HTMLInputElement;

    const parsedValue = parseInt(htmlInput.value.replace(/\./g, ""));
    if (!isNaN(parsedValue)) {
      htmlInput.value = parsedValue.toLocaleString(DEFAULT_LOCALE);
    }

    htmlInput.addEventListener("input", () => {
      if (isNaN(parseInt(htmlInput.value.replace(/\./g, "")))) {
        htmlInput.value = "";
      } else {
        const preFormatString = htmlInput.value;
        const prevPos = htmlInput.selectionStart ?? 0;
        const [formatedValue, newPos] = findNewPos(preFormatString, prevPos);
        htmlInput.value = formatedValue;
        htmlInput.setSelectionRange(newPos, newPos);
      }
    });
  });
};

const findNewPos = (str: string, pos: number): [string, number] => {
  const numberBefore = str.substring(0, pos).replace(/\./g, "").length;
  const parsedNumber = parseInt(str.replace(/\./g, ""));
  const formatedValue = parsedNumber.toLocaleString(DEFAULT_LOCALE);
  let rs = 0;
  let numberMet = 0;
  while (rs < formatedValue.length && numberMet < numberBefore) {
    if (formatedValue[rs] !== ".") {
      numberMet++;
    }
    rs++;
  }
  return [formatedValue, rs];
};
