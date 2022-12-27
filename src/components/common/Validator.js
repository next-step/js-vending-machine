export class Validator {
  validator(validateList, focusElement) {
    const invalidateMessageObject = validateList.find(({ isValidate }) => !isValidate);

    if (invalidateMessageObject) {
      alert(invalidateMessageObject.message);
      focusElement?.focus();
    }

    return !invalidateMessageObject;
  }
}
