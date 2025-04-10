const Utils = {
  productCodeValidation: (e) => {
    const charCode = e.charCode ? e.charCode : null;

    if (charCode == undefined) return true;

    if (
      !((charCode > 47 && charCode < 58) || charCode == 80 || charCode == 112)
    ) {
      return false;
    }
    return true;
  },

  isValidProductCode: (strValue) => {
    const re = /^[Pp]\d{5}/;
    return re.test(strValue);
  },

  korSafeCharsOnly: (e) => {
    const charCode = e.charCode ? e.charCode : null;

    if (charCode == undefined) return true;
    if (
      charCode == 37 ||
      charCode == 95 ||
      charCode == 43 ||
      charCode == 96 ||
      charCode == 126 ||
      charCode == 42 ||
      charCode == 124 ||
      charCode == 13
    ) {
      return false;
    }
    return true;
  },

  isRepeatedLetter: (strValue) => {
    return /([A-Za-z])[A-Za-z]*\1/.test(strValue);
  },
};

export default Utils;
