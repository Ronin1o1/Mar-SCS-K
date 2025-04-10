import Settings from "../static/Settings";

const Utils = {
  checkValidation: (e, field, updatedList) => {
    if (field === "title") {
      updatedList.personTitle = e.target.value;
    }
    if (field === "email") {
      updatedList.email = e.target.value;
    }
    if (field === "countryCode") {
      if (
        e.target.value === "" ||
        Settings.validation_details.re_country_code.test(e.target.value)
      ) {
        updatedList.countrycode = e.target.value;
      }
    }
    if (field === "areaCode") {
      if (
        e.target.value === "" ||
        Settings.validation_details.re_area_city_code.test(e.target.value)
      ) {
        updatedList.areacitycode = e.target.value;
      }
    }
    if (field === "phone") {
      if (
        e.target.value === "" ||
        Settings.validation_details.re_phone_fax_number.test(e.target.value)
      ) {
        updatedList.phonenumber = e.target.value;
      }
    }
    if (field === "fax") {
      if (
        e.target.value === "" ||
        Settings.validation_details.re_phone_fax_number.test(e.target.value)
      ) {
        updatedList.faxnumber = e.target.value;
      }
    }

    return updatedList;
  },
};

export default Utils;
