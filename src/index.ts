import { handleFormSubmit, handleUiChange } from './form';
import { handleOptions } from './options';
import { handleBackButtonClick, renderSalaryCalculationResult } from './result';
import { handleTabClick, resetHashAtStart } from './navigation';
import { handleFormatInput } from './number_format';

const main = () => {
    resetHashAtStart();
    handleTabClick();
    handleOptions();
    handleFormatInput();
    handleUiChange();
    handleBackButtonClick();
    handleFormSubmit(renderSalaryCalculationResult);
};

main();
