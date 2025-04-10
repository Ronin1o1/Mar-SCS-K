import Settings from "../content/accBTProfile/static/Settings";

const Utils = {
  checkInputValidation: (e, field, updatePrimaryList) => {
    if (field !== "CompaniesRFP" && field !== "PricingMethods") {
      if (field === "agencyname" || field === "agencygds") {
        if (e.target.value !== "") {
          updatePrimaryList.agenciesMapList[e.target.id][field] =
            e.target.value;
        } else {
          e.target.value = null;
          updatePrimaryList.agenciesMapList[e.target.id][field] = null;
        }
      } else {
        if (
          e.target.value === "" ||
          Settings.validation_details.regex.test(e.target.value)
        ) {
          if (field === "PerofBooking") {
            if (e.target.value !== "") {
              updatePrimaryList.agenciesMapList[e.target.id].agencybooking =
                e.target.value;
            } else {
              e.target.value = null;
              updatePrimaryList.agenciesMapList[e.target.id].agencybooking =
                null;
            }
          } else {
            updatePrimaryList[field] = e.target.value;
          }
        } else {
          e.target.value = null;
        }
      }
    } else {
      updatePrimaryList[field] = e.target.value;
    }

    return updatePrimaryList;
  },

  checkOverviewValidation: (e, field, updatePrimaryList) => {
    updatePrimaryList[field] = e.target.value;
    return updatePrimaryList;
  },

  checkInputOverviewValidation: (e, fieldName, UpdatedFieldVal) => {
    if (e.target.value !== "") {
      if (e.target.value >= 0 && e.target.value <= 100) {
        UpdatedFieldVal[fieldName] = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
        return true;
      } else {
        UpdatedFieldVal.alertMessageCheck = true;
        return false;
      }
    } else {
      UpdatedFieldVal[fieldName] = e.target.value;
    }

    return UpdatedFieldVal;
  },

  checkInputTabValidation: (e, fieldName, UpdatedFieldVal) => {
    if (e.target.value !== "") {
      if (e.target.value >= 0 && e.target.value <= 100) {
        UpdatedFieldVal[fieldName] = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
        return true;
      } else {
        UpdatedFieldVal.alertMessageCheck = true;
        return false;
      }
    } else {
      UpdatedFieldVal[fieldName] = e.target.value;
    }

    return UpdatedFieldVal;
  },
};

export default Utils;
