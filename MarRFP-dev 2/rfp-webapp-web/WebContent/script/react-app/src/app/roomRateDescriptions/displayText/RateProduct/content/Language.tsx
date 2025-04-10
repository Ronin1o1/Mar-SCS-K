import React, { useEffect } from "react";
import styles from "./RateProduct.css";
import DeleteImg from "../../../../common/assets/img/button/delete.gif";
import BtnView from "../../../../common/assets/img/button/btnViewSmall.gif";
import CDataTable from "../../../../common/components/CDataTable";
import classnames from "classnames";
import { useHistory } from "react-router-dom";

export default function Language(props) {
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("keydown", onViewBtnClick);
    return () => removeEventListener("keydown", onViewBtnClick);
  }, [props.data.state]);

  const onViewBtnClick = (event) => {
    sessionStorage.removeItem("copyTextChannel");
    sessionStorage.removeItem("copyTextLanguage");
    if (event.keyCode === 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("dispTextRtPrd")) {
        const viewRowId = focusedElem.id.split("-")[1];
        const viewRowData = props.data.state.langListData.filter(
          (item) => item.code == viewRowId
        )[0];
        if (viewRowData) {
          props.data.getCopyText(
            viewRowData.code,
            viewRowData.englishName,
            false,
            history,
            viewRowData.populated
          );
        }
      }
    }
  };

  function imageBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.populated === "Y" && (
          <img
            src={DeleteImg}
            className={classnames(styles.deleteContainer, styles.cursorPointer)}
            onClick={() => {
              props.data.deleteLang(rowData.code + "_" + rowData.englishName);
            }}
            alt={"deleteIcon"}
          />
        )}
      </React.Fragment>
    );
  }
  function viewButtonTemplate(rowData) {
    return (
      <div tabIndex={0} id={`dispTextRtPrd-${rowData.code}`}>
        <img
          src={BtnView}
          className={classnames(styles.deleteContainer, styles.cursorPointer)}
          onClick={() => {
            sessionStorage.removeItem("radioBtnchecked-RP");
            props.data.getCopyText(
              rowData.code,
              rowData.englishName,
              false,
              history,
              rowData.populated
            );
          }}
          alt={"viewIcon"}
        />
      </div>
    );
  }

  const columns = [
    {
      field: "populated",
      body: imageBodyTemplate,
      style: { width: "20px" },
    },
    {
      field: "englishName",
      header: "Languages",
      style: { width: "200px" },
    },
    {
      field: "code",
      body: viewButtonTemplate,
      style: { width: "60px" },
    },
  ];
  return (
    <div className={styles.dataTableContainer} style={{ width: "280px" }}>
      <CDataTable
        id="gridTableView"
        columns={columns}
        value={props.data.state.langListData}
        scrollHeight="280px"
        componentGridName="gridTableViewRD"
      />
    </div>
  );
}
