const MAIN_TAB = "main";
const OPTION_TAB = "option";
const FORM = "form";
const RESULT = "result";

const tabMainElement = document.getElementById("tab-main")!;
const mainTabElement = document.getElementById("main-tab")!;
const tabOptionElement = document.getElementById("tab-options")!;
const optionTabElement = document.getElementById("option-tab")!;
const formContainer = document.getElementById("formContainer")!;
const resultContainer = document.getElementById("resultContainer")!;
let currentMainScreen = FORM;

export const handleTabClick = () => {
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

export const switchToResult = () => {
  window.location.href = `#${MAIN_TAB}#${RESULT}`;
};

export const switchBackToForm = () => {
  window.location.href = `#${MAIN_TAB}#${FORM}`;
};

const handleSwitchToResult = () => {
  currentMainScreen = RESULT;
  openMainTab();
  formContainer.style.display = "none";
  resultContainer.style.display = "block";
};

const handleSwitchBackToForm = () => {
  currentMainScreen = FORM;
  openMainTab();
  resultContainer.style.display = "none";
  formContainer.style.display = "block";
};

const openOptionTab = () => {
  tabOptionElement.classList.add("active");
  tabMainElement.classList.remove("active");
  mainTabElement.style.display = "none";
  optionTabElement.style.display = "block";
};

const openMainTab = () => {
  tabMainElement.classList.add("active");
  tabOptionElement.classList.remove("active");
  mainTabElement.style.display = "block";
  optionTabElement.style.display = "none";
};
