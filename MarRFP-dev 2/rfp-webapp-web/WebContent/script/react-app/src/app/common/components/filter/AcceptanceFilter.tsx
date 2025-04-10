import React, { Suspense, useState } from "react";
import QuickSelect from "./../../../shared/components/quickSelect";
import CSuspense from "./../../../common/components/CSuspense";
import CModal from "./../../../common/components/CModal";
import Settings from "./static/Settings";
import "./Filter.css";

export function AcceptanceFilter(props) {
  const [directSelectPopupFlag, setdirectSelectPopupFlag] = useState(false);
  const [alertModalFor200Limit, setalertModalFor200Limit] = useState(false);
  const [alertModalForCommaValidate, setalertModalForCommaValidate] =
    useState(false);
  const directSelect = () => {
    setdirectSelectPopupFlag(true);
  };

  const directSelectPopup = (param) => {
    setdirectSelectPopupFlag(param);
  };

  const directSelectSaved = (param) => {
    const valid = validateMarshaCode(param);
    if (valid == true) {
      setdirectSelectPopupFlag(false);
      props.filterContext.setIsDataChange(true);
      param = param.replace(/[^a-zA-Z,]/g, "");
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          list: param,
        },
      });
    }
  };

  const validateMarshaCode = (param) => {
    let bOK = true;

    let thelist = param;

    thelist = thelist.replace(/[^a-zA-Z,]/g, "");

    if (bOK) {
      const re = /^[a-zA-Z\,]/;
      if (!re.test(thelist)) {
        bOK = false;
        setalertModalForCommaValidate(true);
      }
    }
    if (thelist.length > 1200) {
      setalertModalFor200Limit(true);
      bOK = false;
    }

    return bOK;
  };

  const directSelectCancel = (param) => {
    setdirectSelectPopupFlag(false);
    props.filterContext.setIsDataChange(true);
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        list: "",
      },
    });
  };

  const quickSelectObject = {
    label: Settings.quickSelectObject.label,
    textareaId: Settings.quickSelectObject.textareaId,
    rows: Settings.quickSelectObject.row,
    cols: Settings.quickSelectObject.cols,
    textareaName: Settings.quickSelectObject.textareaName,
  };

  return (
    <>
      <CModal
        title={Settings.quickSelect}
        onClose={(e) => {
          directSelectPopup(false);
        }}
        show={directSelectPopupFlag}
        xPosition={-300}
        yPosition={-200}
      >
        <Suspense fallback={<CSuspense />}>
          <QuickSelect
            quickSelectObject={quickSelectObject}
            save={directSelectSaved}
            cancel={(e) => {
              directSelectCancel(true);
            }}
          />
        </Suspense>
      </CModal>
      <CModal
        title={Settings.alertMessage}
        onClose={(e) => {
          setalertModalFor200Limit(false);
        }}
        show={alertModalFor200Limit}
        xPosition={-120}
        yPosition={-100}
        closeImgTitle={Settings.okClose}
      >
        <div style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}>
          {Settings.enter200Hotels}
        </div>
      </CModal>
      <CModal
        title={Settings.alertMessage}
        onClose={(e) => {
          setalertModalForCommaValidate(false);
        }}
        show={alertModalForCommaValidate}
        xPosition={-100}
        yPosition={-100}
        closeImgTitle={Settings.okClose}
      >
        <div style={{ maxWidth: 270, minWidth: 200, padding: "9px 12px" }}>
          {Settings.marshacodeSeparatedByComma}
        </div>
      </CModal>
      <table
        id="tblNumHotels"
        style={{
          width: "100%",
          borderWidth: "0px",
          padding: "2px",
        }}
        width="100%"
      >
        <tbody>
          <tr>
            <td
              className="field_Name nowrapCell"
              style={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 1 }}
            >
              <a
                href="javascript:void(0);"
                onClick={(e) => {
                  directSelect();
                }}
              >
                <b>Direct Select</b>
              </a>
              &ensp;
              <a
                href="javascript:void(0);"
                onClick={(e) => {
                  directSelectCancel(true);
                }}
              >
                <b>Clear Selection</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
