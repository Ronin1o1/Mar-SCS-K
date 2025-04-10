/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
import React, { useContext, useEffect, useState } from "react";
import styles from "./PortfolioGrid.css";
import portfolioAcceptanceStyle from "./PortfolioAcceptance.css";
import Settings from "../static/Settings";
//import { CNoDataFound } from "../../../../common/components/CNoDataFound";
import CCheckbox from "../../../../common/components/CCheckbox";
import CModal from "../../../../common/components/CModal";
import CSelect from "../../../../common/components/CSelect";
import PortfolioAcceptancesContext from "../context/PortfolioAcceptancesContext";
import "!style-loader!css-loader!./default.css";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../common/components/CLoader";

function PortfolioGrid(props) {
  const {
    hotelList,
    setHotelList,
    portfolioSelectionQuickSelectIndices,
    setPortfolioSelectionQuickSelectIndices,
  } = useContext(PortfolioAcceptancesContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [validateModal, setValidateModal] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    body: "",
    cancel: "",
    item: {},
    field: "",
    inputType: {},
  });
  const [hoverRow, setHoverRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentRow, setcurrentRow] = useState(null);
  const [prevRow, setprevRow] = useState(null);
  const [prevCheckRow, setPrevCheckRow] = useState();

  useEffect(() => {
    document.addEventListener("keydown", sortHeader);
    return () => document.removeEventListener("keydown", sortHeader);
  }, []);

  useEffect(() => {
    const elemView = document.getElementById("table_2");

    if (elemView && appContext.tableRefresh) {
      elemView.scrollTop = 0;
      elemView.scrollLeft = 0;
      appContext.setTableRefersh(false);
    }
  }, [appContext.tableRefresh]);

  const sortHeader = (event) => {
    if (event.keyCode === 13) {
      let focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("pacceptance")) {
        let sortByAtt0 = focusedElem.id.split("-")[1];
        let sortByAtt1 = focusedElem.id.split("-")[2];
        props.handleOrderChange(sortByAtt0, sortByAtt1);
      }
    }
  };
  const handleRowSelection = (item, index: number) => {
    const elements = document.querySelectorAll("#frozenCol tr");
    const rowlements = document.querySelectorAll("#gridView tr");
    const highlight = "_3iyxNCHPnMdk34KcXaNLaw==";
    const selectedClass = portfolioAcceptanceStyle.selectClassNew;

    elements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
      if (element.classList.contains(selectedClass)) {
        element.classList.remove(selectedClass);
      }
    });
    rowlements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
      if (element.classList.contains(selectedClass)) {
        element.classList.remove(selectedClass);
      }
    });

    if (currentRow == null && prevRow == null) {
      setprevRow(currentRow);

      setcurrentRow(index);
    } else {
      if (currentRow != index) {
        setprevRow(currentRow);
        setcurrentRow(index);
      }
    }

    setSelectedRow(index);

    appContext.setactiveRowPortfolio(index);
    appContext.setPrevRowPortfolio(index);
    appContext.setpgoosGridRowHighlight(true);
    appContext.setpgoosFilterRowHighlight(false);
    appContext.setportfolioAcceptanceQuickSelect(false);
    setPortfolioSelectionQuickSelectIndices([]);
  };

  const scolling = (e, tableName) => {
    var rightScrollPos = document.getElementById(
      tableName == "table_2" ? "table_2" : "table_1"
    ).scrollTop;
    document.getElementById(
      tableName == "table_2" ? "table_1" : "table_2"
    ).scrollTop = rightScrollPos;
  };

  const showValidateMirror = (e) => {
    console.info(e);
    setValidateModal(!validateModal);
  };

  const setOption = (inputType, e) => {
    let inty = inputType;
    inty[inputType.field] = e.target.value;
    inty[inputType.label] = e.target.options[e.target.selectedIndex].innerText;
    setMessage({ ...message, inputType: inty });
  };

  const save = (
    item,
    i,
    validate: boolean = false,
    isRemoval: boolean = false,
    field: string = "",
    inputType: Object = {},
    selectProperty: boolean = false
  ) => {
    console.log(`---field = `, field);
    let v = hotelList.map((x) => {
      if (JSON.stringify(item) == JSON.stringify(x)) {
        x = i;
        if (field != "selected" && !isRemoval) {
          x["selected"] = true;
        }
      }
      return x;
    });
    setHotelList(v);
    if (isRemoval) {
      getRemovelModal(0, 0, field, inputType, item);
    }
    !validate && props.ajaxSave(i);
  };

 
  const checkboxUpdate = (item, rowValue, inputType, field, checked, shiftKey, clickedData) => {
    let prevRowVal = rowValue;
    if(field == "selected"){
    if(clickedData.hotelid == rowValue.hotelid){
     rowValue[field] = checked;
     } else{
      rowValue[field] =shiftKey ? true : checked;
     }
    }
    else{
      rowValue[field] = checked == true ? "Y" : "N";
    }
 
    save(prevRowVal, rowValue, inputType.validate, false, field);
  };

  const onChangeFeildValue = (item, field, value, inputType, e) => {
    //Validate previous nulls
    const hasPreviousNulls = validatePreviousReasons();
    const selectedItemIndex = hotelList.findIndex(
      (data) => data.hotelid === item.hotelid
    );
    setPrevCheckRow(selectedItemIndex);

    if (
      hasPreviousNulls.propertiesWithErrors.length > 0 &&
      inputType.type !== Settings.inputType.rejectionModal &&
      inputType.type !== Settings.inputType.removeModal
    ) {
      alert(hasPreviousNulls.message);
    }

    let i = item;
    if (
      inputType.type == Settings.inputType.rejectionModal ||
      inputType.type == Settings.inputType.removeModal
    ) {
      if (!inputType[inputType.field]) {
        alert("Please select a valid removal reason");
        return false;
      }

      if (inputType.initial_value_field || inputType.initial_label_field) {
        i[inputType.initial_value_field] =
          inputType[inputType.initial_value_field];
        i[inputType.initial_label_field] =
          inputType[inputType.initial_label_field];
      } else {
        i[inputType.field] = inputType[inputType.field];
        i[inputType.label] = inputType[inputType.label];
      }

      save(item, i);
      setValidateModal(!validateModal);
    } else if (inputType.type == Settings.inputType.radio) {
      i[inputType.initial_value_field] = inputType.initial_value;
      i[inputType.initial_label_field] = inputType.initial_label;
      i[field] = inputType.trueValue;

      save(item, i, inputType.validate);
    } else if (inputType.type == Settings.inputType.checkbox) {
      if (inputType.initial_value_field || inputType.initial_label_field) {
        if (item[field] == inputType.trueValue) {
          i[inputType.initial_value_field] = inputType.initial_value;
          i[inputType.initial_label_field] = inputType.initial_label;
          i[field] = inputType.falseValue;

          save(
            item,
            i,
            true,
            inputType.isRemoval,
            field,
            inputType.removeInputType
          );
        } else {
          i[inputType.initial_value_field] = null;
          i[inputType.initial_label_field] = null;
          i[field] = inputType.trueValue;
          save(item, i);
        }
      } 
      else{
        if (e.target.checked){
        if (
          (prevCheckRow != undefined ||
            prevCheckRow != null ||
            prevCheckRow != "undefined") &&
          field == "selected" &&
          e.nativeEvent.shiftKey
        ) {
          if (prevCheckRow < selectedItemIndex) {
            for (let k = prevCheckRow + 1; k <= selectedItemIndex; k++) {
              checkboxUpdate(item, hotelList[k], inputType, field, e.target.checked, true, hotelList[selectedItemIndex]);
            }
          } else if (selectedItemIndex < prevCheckRow) {
            for (let k = selectedItemIndex; k < prevCheckRow; k++) {
              checkboxUpdate(item, hotelList[k], inputType, field,  e.target.checked, true, hotelList[selectedItemIndex]);
            }
          } else {
            checkboxUpdate(item, i, inputType, field,  e.target.checked, false, hotelList[selectedItemIndex]);
          }
        } else {
          checkboxUpdate(item, i, inputType, field,  e.target.checked, false,  hotelList[selectedItemIndex]);
        }
      }
      else {
        checkboxUpdate(item, i, inputType, field,  e.target.checked, false,  hotelList[selectedItemIndex]);
      }
    }
 
    }
  };

  const validatePreviousReasons = () => {
    var propertiesWithErrors = hotelList.filter(function (item) {
      return ["1", "2", "3"].some(function (index) {
        const rpPGOOS1 = `roompool_${index}_roomPoolSequence_1_pgoos`;
        const rpPGOOS2 = `roompool_${index}_roomPoolSequence_2_pgoos`;
        const rpReason1 = `roompool_${index}_roomPoolSequence_1_removalreason`;
        const rpReason2 = `roompool_${index}_roomPoolSequence_2_removalreason`;

        return (
          (item[rpPGOOS1] === "N" && item[rpReason1] === Settings.noReason) ||
          (item[rpPGOOS1] === "N" && item[rpReason2] === Settings.noReason) ||
          (item[rpPGOOS2] === "N" && item[rpReason1] === Settings.noReason) ||
          (item[rpPGOOS2] === "N" && item[rpReason2] === Settings.noReason)
        );
      });
    });

    var message = propertiesWithErrors
      .map(function (item) {
        var roompools = [1, 2, 3].filter(function (index) {
          const rpPGOOS1 = `roompool_${index}_roomPoolSequence_1_pgoos`;
          const rpPGOOS2 = `roompool_${index}_roomPoolSequence_2_pgoos`;
          const rpReason1 = `roompool_${index}_roomPoolSequence_1_removalreason`;
          const rpReason2 = `roompool_${index}_roomPoolSequence_2_removalreason`;
          return (
            (item[rpPGOOS1] === "N" && item[rpReason1] === Settings.noReason) ||
            (item[rpPGOOS1] === "N" && item[rpReason2] === Settings.noReason) ||
            (item[rpPGOOS2] === "N" && item[rpReason1] === Settings.noReason) ||
            (item[rpPGOOS2] === "N" && item[rpReason2] === Settings.noReason)
          );
        });
        return { property: item.marshacode, roompools: roompools };
      }, this)
      .map(function (error) {
        return (
          "Please select a PGOOS removal reason for Room Pool Group: " +
          error.roompools.join(", ") +
          " for " +
          error.property
        );
      })
      .join("\n");

    return {
      propertiesWithErrors: propertiesWithErrors,
      message: message,
    };
  };

  const getCheckbox = (index, value, field, headerType, inputType, item) => {
    return (appContext?.user?.isSalesUser ||
      appContext?.user?.isLimitedSalesUser) &&
      (headerType === "RP-1" || headerType === "RP-2") ? (
      <p>{value === inputType.trueValue ? "Yes" : "No"}</p>
    ) : (
      <CCheckbox
        key={`${index}_${field}_${value}`}
        type={Settings.inputType.checkbox}
        onChangeHandler={(e) =>
          onChangeFeildValue(item, field, value, inputType, e)
        }
        checked={value == inputType.trueValue ? true : false}
      ></CCheckbox>
    );

    // return (
    //   <CCheckbox
    //     key={`${index}_${field}_${value}`}
    //     type={Settings.inputType.checkbox}
    //     onChangeHandler={(e) =>
    //       onChangeFeildValue(item, field, value, inputType, e)
    //     }
    //     checked={value == inputType.trueValue ? true : false}
    //   ></CCheckbox>
    // );
  };

  const getRadioButton = (index, value, field, inputType, item) => {
    if (!item.hardcoded) {
      return (
        <CCheckbox
          key={`${index}_${field}_${value}`}
          type={Settings.inputType.radio}
          onChangeHandler={(e) =>
            onChangeFeildValue(item, field, value, inputType, e)
          }
          checked={value == inputType.trueValue ? true : false}
        ></CCheckbox>
      );
    } else {
      return " ";
    }
  };

  const getRemovelModal = (index, value, field, inputType, item) => {
    setMessage({ ...Settings.removalReasonList.modal, item, field, inputType });
    setValidateModal(!validateModal);
  };

  const getRejectionModal = (index, value, field, inputType, item) => {
    setMessage({
      ...Settings.rejectionReasonList.modal,
      item,
      field,
      inputType,
    });
    setValidateModal(!validateModal);
  };

  const buildTD = (x, item, index, left: boolean = false, tdi: number = 0) => {
    const activeIndex = appContext?.activeRowPortfolio;
    return (
      <td
        className={
          !appContext.pgoosFilterRowHighlight &&
          appContext.pgoosGridRowHighlight &&
          index === activeIndex
            ? styles.selectClass
            : hoverRow == index && hoverRow != activeIndex
            ? styles.hoverClass
            : appContext.portfolioAcceptanceQuickSelect &&
              portfolioSelectionQuickSelectIndices.length > 0 &&
              portfolioSelectionQuickSelectIndices.includes(index)
            ? portfolioAcceptanceStyle.selectClassNew
            : ""
        }
        onMouseOver={() => setHoverRow(index)}
        onMouseLeave={() => setHoverRow(null)}
        style={{
          height: 30,
          border: "1px solid #ddd",
          textAlign:
            x.field != Settings.tableColumns.hotelname.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_2.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_2.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_1.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_2.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_1.removalreason.field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_3.rejectionreason
                .field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_2.rejectionreason
                .field &&
            x.field !=
              Settings.tableColumns.roomPoolData.roompool_1.rejectionreason
                .field &&
            x.field != Settings.tableColumns.city.field &&
            x.field != Settings.tableColumns.subsetname.field &&
            x.field != Settings.tableColumns.product_offered.field &&
            x.field != Settings.tableColumns.selected.field &&
            x.field != Settings.tableColumns.marshacode.field
              ? "center"
              : "left",
        }}
      >
        {" "}
        {tdi == 1 && left && props.ajaxIsMakingRequest && item.selected && (
          <div className={styles.newLoaderClass}></div>
        )}
        {x.inputType
          ? getInputType(
              index,
              item[x.field],
              x.field,
              x.header,
              x.inputType,
              item
            )
          : item[x.field]}
      </td>
    );
  };

  const getInputType = (index, value, field, headerType, inputType, item) => {
    if (inputType.type == Settings.inputType.checkbox && value != null) {
      return getCheckbox(index, value, field, headerType, inputType, item);
    }
    if (inputType.type == Settings.inputType.radio && value != null) {
      return getRadioButton(index, value, field, inputType, item);
    }
    if (inputType.type == Settings.inputType.rejectionModal) {
      return value ? (
        <a
          onClick={(e) =>
            getRejectionModal(index, value, field, inputType, item)
          }
        >
          {value}
        </a>
      ) : (
        ""
      );
    }
    if (inputType.type == Settings.inputType.removeModal) {
      return value ? (
        appContext.user.isSalesUser === true ||
        appContext.user.isLimitedSalesUser === true ? (
          <p>{value}</p>
        ) : (
          <a
            onClick={(e) =>
              getRemovelModal(index, value, field, inputType, item)
            }
          >
            {value}
          </a>
        )
      ) : (
        ""
      );
    }
    return "";
  };

  const getrowData = (left: boolean = false) => {
    if (hotelList?.length > 0) {
      let columnsList = props.gridColumns
        .filter(
          (x) =>
            ![
              Settings.tableColumns.selected.field,
              Settings.tableColumns.hotelid.field,
              Settings.tableColumns.marshacode.field,
            ].includes(x.field)
        )
        .reduce((acc, val) => {
          val.field != ""
            ? (acc = [...acc, val])
            : (acc = [
                ...acc,
                ...val.subHeader.map((y) => {
                  y["child"] = true;
                  return y;
                }),
              ]);
          return acc;
        }, []);
      if (left) {
        columnsList = props.gridColumns
          .filter((x) =>
            [
              Settings.tableColumns.selected.field,
              Settings.tableColumns.marshacode.field,
            ].includes(x.field)
          )
          .reduce((acc, val) => {
            val.field != ""
              ? (acc = [...acc, val])
              : (acc = [
                  ...acc,
                  ...val.subHeader.map((y) => {
                    y["child"] = true;
                    return y;
                  }),
                ]);
            return acc;
          }, []);
      } else {
        columnsList = props.gridColumns
          .filter(
            (x) =>
              ![
                Settings.tableColumns.selected.field,
                Settings.tableColumns.hotelid.field,
                Settings.tableColumns.marshacode.field,
              ].includes(x.field)
          )
          .reduce((acc, val) => {
            val.field != ""
              ? (acc = [...acc, val])
              : (acc = [
                  ...acc,
                  ...val.subHeader.map((y) => {
                    y["child"] = true;
                    return y;
                  }),
                ]);
            return acc;
          }, []);
      }
      return hotelList.map((item, index) => {
        const ids = left ? "row" : "ppeRow";
        const activeIndex = appContext?.activeRowPortfolio;

        return (
          <tr
            id={`${ids}_${index}`}
            key={index}
            className={
              !appContext.pgoosFilterRowHighlight &&
              appContext.pgoosGridRowHighlight &&
              index === activeIndex
                ? styles.selectClass
                : hoverRow == index && hoverRow != activeIndex
                ? styles.hoverClass
                : appContext.portfolioAcceptanceQuickSelect &&
                  portfolioSelectionQuickSelectIndices.length > 0 &&
                  portfolioSelectionQuickSelectIndices.includes(index)
                ? portfolioAcceptanceStyle.selectClassNew
                : ""
            }
            onClick={() => handleRowSelection(item, index)}
          >
            <td style={{ display: "none" }}></td>
            {columnsList.map((x, tdi) => buildTD(x, item, index, left, tdi))}
          </tr>
        );
      });
    }
  };

  const midcol = (field) =>
    [
      Settings.tableColumns.country.field,
      Settings.tableColumns.state.field,
      Settings.tableColumns.city.field,
      Settings.tableColumns.commissionable.field,
      Settings.tableColumns.subsetname.field,
      Settings.tableColumns.product_offered.field,
      Settings.tableColumns.roomPoolData.roompool_1.lra.field,
      Settings.tableColumns.roomPoolData.roompool_2.lra.field,
      Settings.tableColumns.roomPoolData.roompool_3.lra.field,
    ].includes(field);

  const buildTH = (x) => {
    if (!x.subHeader) {
      return (
        <th
          className={`${styles.gridHeader} ${styles.gridCell} ${
            midcol(x.field) ? styles.midColumn : ""
          }`}
          style={x.style}
          rowSpan={2}
        >
          {x.optionnumber ? (
            <a
              id={`pacceptance-${x.optionnumber}-${x.sortfield}`}
              href="javascript:void(0);"
              style={{ marginRight: "0px" }}
              onClick={(e) =>
                props.handleOrderChange(x.optionnumber, x.sortfield)
              }
            >
              {x.header}
            </a>
          ) : (
            x.header
          )}
        </th>
      );
    } else {
      return (
        <th
          className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebidHeading}`}
          colSpan={x.subHeader.length}
        >
          {x.optionnumber ? (
            <a
              id={`pacceptance-${x.optionnumber}-${x.sortfield}`}
              href="javascript:void(0);"
              onClick={(e) =>
                props.handleOrderChange(x.optionnumber, x.sortfield)
              }
            >
              {x.header}
            </a>
          ) : (
            x.header
          )}
        </th>
      );
    }
  };
  return (
    <>
      <CModal
        title={message.title}
        onClose={showValidateMirror}
        show={validateModal}
        closeImgTitle={message.cancel}
        class={"rejectederror"}
      >
        <table cellSpacing={0} cellPadding={0} style={{ padding: 10 }}>
          <tbody>
            <tr>
              <td className="Field_Name" width="140px" align="left">
                {message.body}
              </td>
              <td className="Field_Value" align="left">
                <CSelect
                  className={styles.selectedClass}
                  selectedValue={message?.item[message?.inputType["field"]]}
                  id={
                    message.title == Settings.removalReasonList.modal.title
                      ? Settings.removalReasonList.filter.formFields.id
                      : Settings.rejectionReasonList.filter.formFields.id
                  }
                  ddnOptions={
                    message.title == Settings.removalReasonList.modal.title
                      ? props.removalReasonList
                      : props.rejectionReasonList
                  }
                  keyField={
                    message.title == Settings.removalReasonList.modal.title
                      ? Settings.removalReasonList.filter.formFields.keyField
                      : Settings.rejectionReasonList.filter.formFields.keyField
                  }
                  valField={
                    message.title == Settings.removalReasonList.modal.title
                      ? Settings.removalReasonList.filter.formFields.valField
                      : Settings.rejectionReasonList.filter.formFields.valField
                  }
                  onChange={(e) => setOption(message.inputType, e)}
                  onFocus={true}
                />
              </td>
            </tr>
            <tr>
              <td style={{ height: 10 }}></td>
            </tr>
            <tr>
              <td colSpan={2} valign="bottom" align="center">
                <input
                  type="button"
                  defaultValue=" "
                  className={styles.saveButton}
                  onClick={(e) => {
                    onChangeFeildValue(
                      message.item,
                      message.inputType["field"],
                      e,
                      message.inputType,
                      ""
                    );
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CModal>

      <div
        className="dataGrid"
        style={{
          height: "calc(100vh - 137px)",
          width: "auto",
          border: "2px solid #9b9b9b",
        }}
      >
        <div
          className="table_1"
          id="table_1"
          style={{
            float: "left",
            overflowX: "scroll",
            overflowY: "auto",
            height: "calc(100vh - 135px)",
          }}
          onScroll={(e) => {
            const el = document.getElementById("table_2");
            el.scrollTop = e.target.scrollTop;
          }}
        >
          <table style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", width: 15, zIndex: 750 }}
                  className={`${styles.gridHeader} ${styles.gridCell}`}
                  rowSpan={2}
                ></th>
                <th
                  style={{ textAlign: "center", width: "70px" }}
                  className={`${styles.gridHeader} ${styles.gridCell}`}
                  rowSpan={2}
                >
                  <a
                    id="pacceptance-0-marshacode"
                    href="javascript:void(0);"
                    onClick={(e) => props.handleOrderChange("0", "marshacode")}
                  >
                    {Settings.tableColumns.marshacode.header}
                  </a>
                </th>
              </tr>
            </thead>
            <tbody id="frozenCol">
              {hotelList.length
                ? getrowData(true)
                : Array.isArray(hotelList) && (
                    <div className={"no_data"}>No Data Found!</div>
                  )}
            </tbody>
          </table>
        </div>
        <div
          className={styles.table_2}
          id="table_2"
          style={{ overflow: "scroll", height: "calc(100vh - 137px)" }}
          onScroll={(e) => scolling(e, "table_2")}
        >
          <table style={{ borderSpacing: 0 }}>
            <thead style={{ position: "sticky", top: 0, height: 42 }}>
              <tr>
                {props.gridColumns
                  .filter(
                    (x) =>
                      ![
                        Settings.tableColumns.selected.field,
                        Settings.tableColumns.hotelid.field,
                        Settings.tableColumns.marshacode.field,
                      ].includes(x.field)
                  )
                  .map((x) => buildTH(x))}
              </tr>
              <tr>
                {props.gridColumns
                  .filter(
                    (x) =>
                      ![
                        Settings.tableColumns.selected.field,
                        Settings.tableColumns.hotelid.field,
                        Settings.tableColumns.marshacode.field,
                      ].includes(x.field) &&
                      x.subHeader &&
                      x.subHeader.length
                  )
                  .reduce((acc, val) => (acc = [...acc, ...val.subHeader]), [])
                  .map((x) => (
                    <th
                      style={x.style}
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.subHeader}`}
                      rowSpan={1}
                    >
                      {x.header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody id="gridView">
              {props.isMakingRequest && (
                <div className={styles.loaderImg}>
                  <CLoader />
                </div>
              )}
              {getrowData()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PortfolioGrid;
