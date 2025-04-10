import Settings from "../PeriodMaintenance/static/Settings";

import AccountSettings from "../accountMaintenance/static/Settings";

const Utils = {
  addingFlagToJson: (result) => {
    let period = null;
    result.map((data) => {
      if (period != data.period) {
        if (data?.hasAccounts) {
          period = data.period;
          data[Settings.periodMaintenanceList.newAddFlag] = true;
          data[Settings.periodMaintenanceList.selectedHotelView] =
            data.hotelsview;
        } else {
          data[Settings.periodMaintenanceList.newAddFlag] = false;
          data[Settings.periodMaintenanceList.selectedHotelView] =
            data.hotelsview;
        }
      } else {
        data[Settings.periodMaintenanceList.newAddFlag] = false;
        data[Settings.periodMaintenanceList.selectedHotelView] =
          data.hotelsview;
      }
    });
  },
  reqObjHotelView: (result) => {
    let period = null;
    // @ts-ignore
    let newVal = 0;
    let periodList: Array<IPeriod>;
    periodList = new Array<IPeriod>();
    result.map((data, i) => {
      if (period != data.period) {
        period = data.period;

        newVal++;

        periodList.push({ hotelsview: data.hotelsview, period: data.period });
      }
    });
    return periodList;
  },
  sortList: (prop) => {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  },

  toggleInputRadio: (event) => {
    let isUserTyped = false;
    const alphad = event.target.value;
    const charCode = event.charCode ? event.charCode : null;
    if (alphad.value != "" || (charCode > 32 && charCode != 127)) {
      isUserTyped = true;
    }
    return isUserTyped;
  },
  appendJsonObj: (value, array) => {
    let newArray = [];
    if (array !== null) {
      newArray = array.slice();
      newArray.unshift(value);
    } else {
      newArray.push(value);
    }

    return newArray;
  },
  getPeriodLst: (data) => {
    const periodList = [];

    data.map((d) => {
      const keys = Object.keys(d);
      keys.map((key) => {
        if (
          key === AccountSettings.accountList.filter.formFields.period.valField
        ) {
          const jsonPair = {};
          jsonPair[key] = d[key];
          periodList.push(jsonPair);
        }
      });
    });
    return periodList;
  },
};

interface IPeriod {
  hotelsview: string;
  period: number;
}

export default Utils;
