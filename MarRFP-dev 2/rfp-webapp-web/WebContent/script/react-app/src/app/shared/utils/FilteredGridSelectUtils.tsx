import Settings from "../static/Settings";

// common functions for all functionality of reuseable component doble grid with/widthout  move
const FilteredGridSelectUtils = {
  replaceYNwithYesNo: (data) => {
    return data == Settings.valueYN.Y
      ? Settings.valueYN.Yes
      : Settings.valueYN.No;
  },

  blankReplaceWithX: (data) => {
    return data == Settings.valueYN.Y ? "X" : "";
  },
  blankReplaceWithXCBC: (data) => {
    return data == "D" ? "X" : "";
  },

  getSelectedCheckboxValue: (field, checked, data, id) => {
    if (field == Settings.inputType.checkbox) {
      if (checked == false && data.length > 0) {
        const index = data.indexOf(id);
        if (index > -1) {
          data?.splice(index, 1);
        }
      } else {
        data?.push(id);
      }
    }

    return data;
  },

  getSelectedIdsData(data, selectedIdArray, key) {
    const arr = [];

    data.forEach((element) => {
      const index = selectedIdArray.indexOf(element[key]);
      if (index != -1) arr.push(element);
    });
    return arr;
  },

  deSelectAllData(data, selectedIdArray, key, value) {
    data.forEach((element) => {
      const index = selectedIdArray.indexOf(element[key]);
      if (index != -1) element[key] = value;
    });
    return data;
  },

  addpropertyinObject(data, key, value) {
    const arr = [];
    data.forEach((e) => {
      e[key] = value;
      arr.push(e);
    });
    return arr;
  },

  getCheckboxStatus(data, rowData, key) {
    if (data?.length > 0) {
      const index = data.indexOf(rowData[key]);
      return index == -1 ? false : true;
    }
    {
      return false;
    }
  },

  setCheckox(data, selectedArray, param) {
    const arrayLength = selectedArray.length;
    let arr;
    arr = data ? data : [];

    if (arrayLength != 0) {
      let count = 0;

      if (arr != undefined) {
        for (let element = 0; element < arr.length; element++) {
          const index = selectedArray.indexOf(arr[element].hotelid);

          if (index != -1) {
            arr[element].hotelid_checkbox = param;
            count++;
          }

          if (arrayLength == count) break;
        }
      }
      return arr;
    } else {
      return arr;
    }
  },

  checkedValue(data, rowData, field) {
    let checked = false;
    for (let element = 0; element < data.length; element++) {
      if (
        data[element].hotelid == rowData.hotelid &&
        data[element][field] == "Y"
      ) {
        checked = true;
        break;
      }
    }

    return checked;
  },

  validateFile(fileName) {
    if (fileName.length > 0) {
      const fileExt = /[^.]+$/.exec(fileName);
      if (
        fileExt[0] == "xls" ||
        fileExt[0] == "xlsx" ||
        fileExt[0] == "doc" ||
        fileExt[0] == "docx" ||
        fileExt[0] == "pdf" ||
        fileExt[0] == "XLS" ||
        fileExt[0] == "XLSX" ||
        fileExt[0] == "DOC" ||
        fileExt[0] == "DOCX" ||
        fileExt[0] == "PDF"
      ) {
        return true;
      } else {
        alert(Settings.fileFormatAlert);
        return false;
      }
    }
    return false;
  },

  classNameValue(param) {
    let value = "";
    if (
      param.hasgenpricing === undefined &&
      param.nopricing == Settings.valueYN.Y
    )
      value = Settings.colorCode.color_d90000;
    else if (param.hasgenpricing == Settings.valueYN.Y) {
      value = Settings.colorCode.color_d90000;
    } else if (
      param.volunteered == Settings.valueYN.Y &&
      (param.ratetype_selected || param.ratetypeselected) != 0
    ) {
      value =
        (param.ratetype_selected || param.ratetypeselected) == 20
          ? Settings.colorCode.color_b95c00
          : Settings.colorCode.color_0057c1;
    } else {
      if ((param.ratetype_selected || param.ratetypeselected) == 0)
        value = Settings.colorCode.color_640000;
      else if ((param.ratetype_selected || param.ratetypeselected) == 1)
        value = "";
      else if ((param.ratetype_selected || param.ratetypeselected) == 17)
        value = Settings.colorCode.color_008040;
      else if ((param.ratetype_selected || param.ratetypeselected) == 18)
        value = Settings.colorCode.color_008040;
      else value = Settings.colorCode.color_d90000;
    }

    console.log(value);
    return value;
  },

  classNameValueAvail(param) {
    let value = "";

    if (param.hasgenpricing == Settings.valueYN.Y)
      value = Settings.colorCode.color_d90000;
    else if (
      param.volunteered == Settings.valueYN.Y &&
      (param.ratetype_selected || param.ratetypeselected) != 0
    ) {
      value =
        (param.ratetype_selected || param.ratetypeselected) == 20
          ? Settings.colorCode.color_b95c00
          : Settings.colorCode.color_0057c1;
    } else {
      if ((param.ratetype_selected || param.ratetypeselected) == 0)
        value = Settings.colorCode.color_640000;
      else if ((param.ratetype_selected || param.ratetypeselected) == 1)
        value = "";
      else if ((param.ratetype_selected || param.ratetypeselected) == 17)
        value = Settings.colorCode.color_008040;
      else if ((param.ratetype_selected || param.ratetypeselected) == 18)
        value = Settings.colorCode.color_008040;
      else value = Settings.colorCode.color_d90000;
    }

    return value;
  },

  classNameValueForHotelSolicitation(param) {
    let value = "";
    if (param.nopricing == Settings.valueYN.Y) {
      value = Settings.colorCode.color_d90000;
    } else if (
      param.volunteered == Settings.valueYN.Y &&
      (param.ratetype_selected || param.ratetypeselected) != 0
    ) {
      value =
        (param.ratetype_selected || param.ratetypeselected) == 20
          ? Settings.colorCode.color_b95c00
          : Settings.colorCode.color_0057c1;
    } else {
      if ((param.ratetype_selected || param.ratetypeselected) == 0) {
        value = Settings.colorCode.color_640000;
      } else if ((param.ratetype_selected || param.ratetypeselected) == 1) {
        value = "";
      } else if ((param.ratetype_selected || param.ratetypeselected) == 17) {
        value = Settings.colorCode.color_008040;
      } else if ((param.ratetype_selected || param.ratetypeselected) == 18) {
        value = Settings.colorCode.color_008040;
      } else {
        value = Settings.colorCode.color_d90000;
      }
    }

    return value;
  },

  selectHotels(list, completeList, key) {
    let numRows;
    let notfound = "";
    numRows = completeList;
    const hotelArray = list.split(",").map((item) => item.trim());
    const data = [];

    for (let i = 0; i < hotelArray.length; i++) {
      let isFound = false;
      if (hotelArray[i].trim() != "") {
        for (let j = 0; j < numRows.length; j++) {
          const index = numRows[j][key]
            .toLowerCase()
            .includes(hotelArray[i].toLowerCase());

          if (index == true) {
            data.push(numRows[j]);
            isFound = true;
            break;
          }
        }
        if (!isFound) notfound += hotelArray[i] + " ";
      }
    }

    if (notfound != "") {
      alert(Settings.alertMarshacodeNotfound + notfound);
    }

    return data;
  },
};
export default FilteredGridSelectUtils;
