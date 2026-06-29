export const handleFormatInput = () => {
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
        const preFormatString = htmlInput.value;
        const prevPos = htmlInput.selectionStart ?? 0;
        const newPos = findNewPos(preFormatString, prevPos);
        htmlInput.value = parseInt(
          htmlInput.value.replace(/\./g, ""),
        ).toLocaleString("vi-VN");

        htmlInput.setSelectionRange(newPos, newPos);
      }
    });
  });
};

const findNewPos = (str: string, pos: number): number => {
  let rs = 0;
  const parts = str.split(".");
  const currentPartIndex = findCurrentPartIndex(parts, pos);
  if (parts[currentPartIndex].length === 3) {
    rs = pos;
  } else if (parts[currentPartIndex].length > 3) {
    if (currentPartIndex === 0 || parts[0].length === 3) {
      rs = pos + 1;
    } else {
      rs = pos;
    }
  } else {
    if (currentPartIndex === 0) {
      rs = pos;
    } else if (parts[0].length === 1) {
      rs = pos - 1;
    } else {
      rs = pos;
    }
  }
  return rs;
};

const findCurrentPartIndex = (parts: string[], pos: number): number => {
  let current = 0;
  for (let i = 0; i < parts.length; i++) {
    current += parts[i].length + 1;
    if (current > pos) {
      return i;
    }
  }
  return parts.length - 1;
};
