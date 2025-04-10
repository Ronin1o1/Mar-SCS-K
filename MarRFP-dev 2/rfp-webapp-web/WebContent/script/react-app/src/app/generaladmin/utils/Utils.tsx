const Utils = {
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
        if (key === "period") {
          const jsonPair = {};
          jsonPair[key] = d[key];
          periodList.push(jsonPair);
        }
      });
    });
    return periodList;
  },
};

export default Utils;
