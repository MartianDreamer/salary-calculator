export const handleFormatInput = () => {
  const prevMap = new Map<HTMLInputElement, string>();

  document.querySelectorAll('input[type="text"]').forEach((input) => {
    const htmlInput = input as HTMLInputElement;

    const parsedValue = parseInt(htmlInput.value.replace(/\./g, ""));
    if (!isNaN(parsedValue)) {
      htmlInput.value = parsedValue.toLocaleString("vi-VN");
      prevMap.set(htmlInput, htmlInput.value);
    } else {
      prevMap.set(htmlInput, "");
    }

    htmlInput.addEventListener("input", () => {
      if (isNaN(parseInt(htmlInput.value.replace(/\./g, "")))) {
        htmlInput.value = "";
      } else {
        const prevPos = htmlInput.selectionStart ?? 0;
        htmlInput.value = parseInt(
          htmlInput.value.replace(/\./g, ""),
        ).toLocaleString("vi-VN");
        const prevString = prevMap.get(htmlInput) ?? "";
        const newCursor = findNewPos(prevString, htmlInput.value, prevPos);

        htmlInput.setSelectionRange(newCursor, newCursor);
        prevMap.set(htmlInput, htmlInput.value);
      }
    });
  });
};

const findNewPos = (
  prevString: string,
  currentString: string,
  prevPos: number,
): number => {
  const prevDotBefore = countDot(prevString.substring(0, prevPos));
  const currentDotBefore = countDot(currentString.substring(0, prevPos));
  const rs = prevPos + (currentDotBefore - prevDotBefore);
  return rs;
};

const countDot = (s: string): number => {
  let count = 0;
  for (const c of s) {
    count += c === "." ? 1 : 0;
  }
  return count;
};
