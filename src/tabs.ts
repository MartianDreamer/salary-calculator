const tabMainElement = document.getElementById("tab-main")!;
const mainTabElement = document.getElementById("main-tab")!;
const tabOptionElement = document.getElementById("tab-options")!;
const optionTabElement = document.getElementById("option-tab")!;

export const handleTabClick = () => {
  tabMainElement.addEventListener("click", () => {
    tabMainElement.classList.add("active");
    tabOptionElement.classList.remove("active");
    mainTabElement.style.display = "block";
    optionTabElement.style.display = "none";
  });

  tabOptionElement.addEventListener("click", () => {
    tabOptionElement.classList.add("active");
    tabMainElement.classList.remove("active");
    mainTabElement.style.display = "none";
    optionTabElement.style.display = "block";
  });
}