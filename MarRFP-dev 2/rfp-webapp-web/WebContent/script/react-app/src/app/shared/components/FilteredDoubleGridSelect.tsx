import React, { Suspense, useState, useEffect, useContext } from "react";
import styles from "./FilteredDoubleGridSelect.css";
import Settings from "../static/Settings";
import CSuspense from "../../common/components/CSuspense";
import CModal from "../../common/components/CModal";
import QuickSelect from "./quickSelect";
import SendAdditionalInfo from "./sendAdditionalInfo";
import btnSendEmail from "./../assets/img/button/btnSendEmail.gif";
import btnAddEmailInfo from "./../assets/img/button/btnAddEmailInfo.gif";
import btnUnSelectAll from "./../assets/img/button/btnUnSelectAll.gif";
import btnAdd from "./../assets/img/button/btnAdd.gif";
import btnRemove from "./../assets/img/button/btnRemove.gif";
import btnAddAll from "./../assets/img/button/btnAddAll.gif";
import btnRemoveAll from "./../assets/img/button/btnRemoveAll.gif";
import FileUpload from "./fileupload";
import FilteredGridSelectUtils from "../utils/FilteredGridSelectUtils";
import Grid from "./grid";
import ApplicationContext, {
  IApplicationContext,
} from "../../../app/common/components/ApplicationContext";

interface IFilterProps {
  selectBtnClicked?: () => void;
  unSelectBtnClicked?: () => void;
  selectAllBtnClicked?: () => void;
  unSelectAllBtnClicked?: () => void;
  quickSelectGrid1BtnClicked?: (data: any) => void;
  quickSelectGrid2BtnClicked?: (data: any) => void;
  directSelectGrid2BtnClicked?: (data: any) => void;
  clearDirectSelect?: () => void;
  sendMailBtnClicked?: (data: any) => void;
  additionalInfoBtnClicked?: (data: any) => void;
  deselectBtnClicked?: () => void;
  quickSelectTopSaved?: (data: any) => void;
  quickSelectBottomSaved?: (data: any) => void;
  directSelectBottomSaved?: (data: any) => void;
  setsenMailMessagePopup?: (data: any) => void;
  cancelHandler?: (data: any) => void;
  saveHandler?: (data: any) => void;
  availGrid?: any;
  selectedGrid?: any;
  initialSelectedgridRows?: any;
  showQuickSelectTop?: any;
  showQuickSelectBottom?: any;
  showDirectSelectBottom?: any;
  senMailMessagePopup?: any;
  sendMailErrorMessage?: any;
  showadditionalInfo?: any;
  viewObject?: any;
  sendFromList?: any;
  componentName?: any;
  handleOrderChangeSelect?: any;
  handleOrderChange?: any;
  closeAdditionalInfoButton?: any;
  filterRequestData?: any;
  isMakingRequestList?: any;
  isMakingRequest?: boolean;
  height?: any;
  refreshValGridList?: any;
  refreshValGridSelected?: any;
  hotelSolicitation?: boolean;
  isMakingRequestAvailList?: boolean;
}

export const FilteredDoubleGridSelect: React.FC<IFilterProps> = (
  props: IFilterProps
) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [alertModalForCommaValidate, setalertModalForCommaValidate] =
    useState(false);
  const [alertModalFor200Limit, setalertModalFor200Limit] = useState(false);
  const [noHotelAvailable, setNoHotelAvailable] = useState(false);
  const [noDirectSelectFound, setNoDirectSelectFound] = useState(false);
  const [noDirectSelectFoundMsg, setNoDirectSelectFoundMsg] = useState(false);
  const [fileObj, setfileObject] = useState("");
  useEffect(() => {
    window.addEventListener("resize", setGridSize);
    setGridSize();
    return () => {
      window.removeEventListener("resize", setGridSize);
    };
  });

  const setGridSize = () => {
    if(props.componentName == "PGOOSPropagation" && props.availGrid.directSelect &&
    props.availGrid.directSelect != "" ){
      const element = document.querySelector(".hotelsolicitation") as HTMLElement;
      if(element != undefined){
        element.style.minWidth = "975px"
      }
      const headerElement = document.querySelector(".header") as HTMLElement;
      if(headerElement != undefined){
        headerElement.style.minWidth = "1277px"
      }
    }
  };
  //blackLines One
  let tableHeight;
  if (props.componentName === "EdieHotelProfileList") {
    tableHeight =
      props.viewObject.gridType == "double"
        ? "calc(50vh - 94px)"
        : "calc(50vh - 94px)";
  } else {
    tableHeight =
      props.viewObject.gridType == "double"
        ? "calc(100% - 51%)"
        : props.height
        ? props.height
        : "calc(100vh - 138px)";
  }

  useEffect(() => {
    document.addEventListener("keydown", sortHeader);
    return () => document.removeEventListener("keydown", sortHeader);
  }, []);

  const sortHeader = (event) => {
    if (event.keyCode === 13) {
      const focusedElem = document.activeElement;
      if (
        focusedElem.id &&
        focusedElem.id.includes(props.availGrid.id) &&
        focusedElem.id.split("-")[1] == "1"
      ) {
        const sortBy = focusedElem.id.split("-")[2];
        props.handleOrderChange(sortBy);
      }
      if (
        focusedElem.id &&
        focusedElem.id.includes(props.selectedGrid.id) &&
        focusedElem.id.split("-")[1] == "2"
      ) {
        const sortBy = focusedElem.id.split("-")[2];
        props.handleOrderChangeSelect(sortBy);
      }
    }
  };

  // props.viewObject.gridType == "double"
  // ? "calc(100% - 51%)"
  // : "calc(100vh - 34%)";

  const marshacodeKey =
    props.componentName == Settings.requestEdie ||
    props.componentName == "requestReport"
      ? Settings.marshaCode
      : Settings.marshacode;

  const selectButtonClicked = () => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;

    if (isDataChanges.value == "true") {
      alert("Please retrieve the lists");
    } else {
      props.selectBtnClicked();
      appContext.setTableRefersh(true);
    }
  };

  const unSelectBtnClicked = () => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (isDataChanges.value == "true") {
      alert("Please retrieve the lists");
    } else {
      props.unSelectBtnClicked();
      appContext.setTableRefersh(true);
    }
  };
  const selectAllBtnClicked = () => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (isDataChanges.value == "true") {
      alert("Please retrieve the lists");
    } else {
      props.selectAllBtnClicked();
      appContext.setTableRefersh(true);
    }
  };
  const unSelectAllBtnClicked = () => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (isDataChanges.value == "true") {
      alert("Please retrieve the lists");
    } else {
      appContext.setTableRefersh(true);
      props.unSelectAllBtnClicked();
    }
  };
  const quickSelectGrid1BtnClicked = (value) => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (props.availGrid.initialLoad || isDataChanges?.value == "true") {
      alert(Settings.retrieveList);
      return;
    }
    if (props.availGrid.availgridRows) {
      const dataLength = props.availGrid.availgridRows.length;

      if (dataLength == 0) {
        setNoHotelAvailable(true);
      } else {
        props.quickSelectGrid1BtnClicked(value);
      }
    } else {
      setNoHotelAvailable(true);
    }
  };
  const quickSelectGrid2BtnClicked = (value) => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (props.selectedGrid.initialLoad || isDataChanges?.value == "true") {
      alert(Settings.retrieveList);

      return;
    }
    if (props.selectedGrid.selectedgridRows) {
      const dataLength = props.selectedGrid.selectedgridRows.length;

      if (dataLength == 0) {
        setNoHotelAvailable(true);
      } else {
        props.quickSelectGrid2BtnClicked(value);
      }
    } else {
      setNoHotelAvailable(true);
    }
  };

  const clearDirectSelect = () => {
    props.clearDirectSelect();
    setNoDirectSelectFound(false);
  };
  //direct select bottom grid
  const directSelectGrid2BtnClicked = (value) => {
    const isDataChanges = document.getElementById(
      "dataChanged"
    ) as HTMLInputElement;
    if (props.selectedGrid.initialLoad || isDataChanges?.value == "true") {
      alert(Settings.retrieveList);

      return;
    }
    if (props.selectedGrid.selectedgridRows) {
      const dataLength = props.selectedGrid.selectedgridRows.length;

      if (dataLength == 0) {
        setNoHotelAvailable(true);
      } else {
        props.directSelectGrid2BtnClicked(value);
      }
    } else {
      setNoHotelAvailable(true);
    }
  };
  const sendMailBtnClicked = () => {
    if (fileObj != undefined) {
      props.sendMailBtnClicked(fileObj);
    } else {
      const arr = [];
      props.sendMailBtnClicked(arr);
    }
  };
  const additionalInfoBtnClicked = (value) => {
    props.additionalInfoBtnClicked(value);
  };
  const deselectBtnClicked = () => {
    props.deselectBtnClicked();
  };

  const quickSelectTopSaved = (param) => {
    if (param.length > 0) {
      const data = validateMarshaCode(param, props.availGrid.availgridRows);
      props.quickSelectTopSaved(data);
    } else {
      props.quickSelectGrid1BtnClicked(true);
    }
  };

  const quickSelectBottomSaved = (param) => {
    if (param.length > 0) {
      const data = validateMarshaCode(
        param,
        props.selectedGrid.selectedgridRows
      );
      props.quickSelectBottomSaved(data);
    } else {
      props.quickSelectGrid2BtnClicked(true);
    }
  };

  const directSelectBottomSaved = (param) => {
    if (param.length > 0) {
      let bOK = true;
      let notFoundHotelList;
      let notFoundAlertMessage;
      const thelistobj = props.initialSelectedgridRows;
      if (thelistobj.length == 0) bOK = false;
      let thelist = param;

      if (bOK) {
        thelist = thelist.replace(/[^a-zA-Z,]/g, "");
      }

      if (bOK) {
        const re = /^[a-zA-Z\,]/;
        if (!re.test(thelist)) {
          bOK = false;
          setalertModalForCommaValidate(true);
        }
      }
      thelist = thelist.split(",").map((x) => x.toUpperCase());
      if (bOK) {
        notFoundHotelList = thelist.filter(
          (x) => !thelistobj.some((y) => y.marshacode == x.toUpperCase())
        );
        if (notFoundHotelList.length && notFoundHotelList[0] !== "") {
          bOK = false;
          thelist = thelist.filter((x) =>
            thelistobj.some((y) => y.marshacode == x.toUpperCase())
          );
          setNoDirectSelectFound(true);
          notFoundAlertMessage =
            (notFoundHotelList.length == 1
              ? Settings.onlyMarshaCodeNotFoundAlert
              : Settings.marshaCodeNotFoundAlert) +
            `${notFoundHotelList.join(" ")}`;
          setNoDirectSelectFoundMsg(notFoundAlertMessage);
        }
      }

      if (bOK) {
        if (thelist && thelist.length > 1200) {
          setalertModalFor200Limit(true);
          bOK = false;
        }
      }

      let data = [];
      if (thelist && thelist.length > 0) {
        data = thelist.map((x) =>
          thelistobj.find((y) => y.marshacode == x.toUpperCase())
        );
      }
      if (data && data.length > 0) {
        props.directSelectBottomSaved(data);
      } else {
        props.directSelectGrid2BtnClicked(true);
      }
    } else {
      props.directSelectGrid2BtnClicked(true);
    }
  };

  const validateMarshaCode = (param, completeList) => {
    let bOK = true;
    const thelistobj = completeList;
    if (thelistobj.length == 0) bOK = false;
    let thelist = param;

    if (bOK) {
      thelist = thelist.replace(/[^a-zA-Z,]/g, "");
    }

    if (bOK) {
      const re = /^[a-zA-Z\,]/;
      if (!re.test(thelist)) {
        bOK = false;
        setalertModalForCommaValidate(true);
      }
    }

    if (bOK) {
      if (thelist.length > 1200) {
        setalertModalFor200Limit(true);
        bOK = false;
      }
    }
    let data = [];
    if (bOK) {
      data = FilteredGridSelectUtils.selectHotels(
        thelist,
        completeList,
        marshacodeKey
      );
    }
    return data;
  };

  const cancelTop = () => {
    quickSelectGrid1BtnClicked(true);
  };
  const cancelBottom = () => {
    quickSelectGrid2BtnClicked(true);
  };
  const cancelDirectSelectBottom = () => {
    directSelectGrid2BtnClicked(true);
  };

  const setsenMailMessagePopup = (param) => {
    props.setsenMailMessagePopup(param);
  };

  const cancelHandler = (param) => {
    props.cancelHandler(param);
  };

  const saveHandler = (param) => {
    props.saveHandler(param);
  };

  const setFileObj = (param) => {
    setfileObject(param);
  };

  const handleOrderChange = (param) => {
    props.handleOrderChange(param);
    //appContext.setTableRefersh(true);
  };

  const handleOrderChangeSelect = (param) => {
    props.handleOrderChangeSelect(param);
  };

  const accountName = document.getElementById(
    "filterValues.accountFilter.accountrecid"
  ) as HTMLSelectElement;

  const subsetA = document.getElementById(
    "filterValues.accountFilter.subsetA"
  ) as HTMLSelectElement;

  const subsetB = document.getElementById(
    "filterValues.accountFilter.subsetB"
  ) as HTMLSelectElement;

  const isOverflown = () => {
    const element = document.getElementById("marshaCodeNotFoundBlock");
    return (
      element?.scrollHeight > element?.clientHeight ||
      element?.scrollWidth > element?.clientWidth
    );
  };

  const isOverflownBottom = () => {
    const element = document.getElementById("marshaCodeNotFoundBlockBottom");
    return (
      element?.scrollHeight > element?.clientHeight ||
      element?.scrollWidth > element?.clientWidth
    );
  };

  return (
    <div
      className={`
        ${
          props.componentName === "PortfolioSelection"
            ? styles.selcorgRightPanel
            : props.componentName === "CBCrequest"
            ? styles.CBCreqRightPanel
            : props.componentName === "HotelSolicitation"
            ? styles.slicitationhotel
            : props.componentName === "PGOOSPropagation"
            ? styles.PogosrightPanel
            : props.componentName === "EdieHotelProfileList"
            ? styles.EdierightPanel
            : styles.rightPanel
        } ${
        props.componentName == "portfolioOrganization"
          ? styles.profileorgdesign
          : ""
      }
      ${"pricingreports"}
          `}
    >
      <div
        className={` ${
          props.componentName === "EdieHotelProfileList"
            ? styles.containerEdieHotelProfileView
            : styles.container
        } ${"profileorgdesignnew"}`}
      >
        {Object.keys(props.availGrid).length > 0 ? (
          <CModal
            title={Settings.quickSelect}
            onClose={(e) => {
              quickSelectGrid1BtnClicked(true);
            }}
            show={props.showQuickSelectTop}
            xPosition={-400}
            yPosition={-100}
          >
            <Suspense fallback={<CSuspense />}>
              <QuickSelect
                quickSelectObject={props.availGrid.quickSelectObject}
                save={quickSelectTopSaved}
                cancel={(e) => {
                  cancelTop();
                }}
              />
            </Suspense>
          </CModal>
        ) : (
          ""
        )}

        {Object.keys(props.selectedGrid).length > 0 ? (
          <div>
            <CModal
              title={Settings.directSelect}
              onClose={(e) => {
                directSelectGrid2BtnClicked(true);
              }}
              show={props.showDirectSelectBottom}
              xPosition={-300}
              yPosition={-200}
            >
              <Suspense fallback={<CSuspense />}>
                <QuickSelect
                  quickSelectObject={props.selectedGrid.quickSelectObject}
                  save={directSelectBottomSaved}
                  cancel={(e) => {
                    cancelDirectSelectBottom();
                  }}
                />
              </Suspense>
            </CModal>
            <CModal
              title={Settings.quickSelect}
              onClose={(e) => {
                quickSelectGrid2BtnClicked(true);
              }}
              show={props.showQuickSelectBottom}
              xPosition={-400}
              yPosition={-100}
            >
              <Suspense fallback={<CSuspense />}>
                <QuickSelect
                  quickSelectObject={props.selectedGrid.quickSelectObject}
                  save={quickSelectBottomSaved}
                  cancel={(e) => {
                    cancelBottom();
                  }}
                />
              </Suspense>
            </CModal>
          </div>
        ) : (
          ""
        )}
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
          <div style={{ maxWidth: 275, minWidth: 180, padding: "9px 12px" }}>
            {Settings.marshacodeSeparatedByComma}
          </div>
        </CModal>

        <CModal
          title={Settings.NotSentEmail}
          onClose={(e) => {
            setsenMailMessagePopup(true);
          }}
          show={props.senMailMessagePopup}
          xPosition={-100}
          yPosition={-100}
          closeImgTitle={Settings.okClose}
        >
          <div style={{ width: 350, height: 120, padding: "9px 12px" }}>
            <div>{Settings.emailNotSenMessage}</div>

            <div style={{ paddingTop: "10px" }}>
              {props.sendMailErrorMessage &&
              props.sendMailErrorMessage.length > 0
                ? props.sendMailErrorMessage.map((errorMsg) => {
                    {
                      return <div>{errorMsg}</div>;
                    }
                  })
                : props.sendMailErrorMessage}
            </div>
          </div>
        </CModal>
        <CModal
          title={Settings.alertMessage}
          onClose={(e) => {
            setNoHotelAvailable(false);
          }}
          show={noHotelAvailable}
          xPosition={-100}
          yPosition={-100}
          closeImgTitle={Settings.okClose}
        >
          <div
            style={{
              maxWidth: 250,
              minWidth: 180,
              padding: "9px 12px",
            }}
          >
            {Settings.noHotelsAlert}
          </div>
        </CModal>

        <CModal
          title={Settings.alertMessage}
          onClose={(e) => {
            setalertModalFor200Limit(false);
          }}
          show={alertModalFor200Limit}
          xPosition={-100}
          yPosition={-100}
          closeImgTitle={Settings.okClose}
        >
          <div style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}>
            {Settings.enter200Hotels}
          </div>
        </CModal>
        {Object.keys(props.selectedGrid).length > 0 &&
        !props.hotelSolicitation ? (
          <CModal
            title={Settings.additionalEmailInfo}
            onClose={(e) => {
              props.closeAdditionalInfoButton(true);
            }}
            show={props.showadditionalInfo}
            xPosition={-250}
            yPosition={-150}
          >
            <Suspense fallback={<CSuspense />}>
              <SendAdditionalInfo
                additionalData={props.selectedGrid.additionalSendMail}
                sendFromList={props.sendFromList}
                cancelAddSentInfo={cancelHandler}
                saveAddSentInfo={saveHandler}
              />
            </Suspense>
          </CModal>
        ) : (
          ""
        )}

        {Object.keys(props.availGrid).length > 0 ? (
          <div
            className={
              props.viewObject.view == Settings.viewObject.viewHorizontal
                ? styles.selecttionLinkTopY
                : styles.selecttionLinkTopX
            }
          >
            <table className="menuWdth100-Height">
              <tr>
                <td className={styles.firstHeading}>
                  <div>
                    {" "}
                    {props.viewObject.headingGrid1 ? (
                      <span>{props.viewObject.headingGrid1}</span>
                    ) : (
                      ""
                    )}
                    <span className={styles.subHeading}>
                      {" "}
                      {props.viewObject.headingGrid1 === "Subset A:"
                        ? (subsetA &&
                            subsetA.selectedIndex != 0 &&
                            subsetA.options[subsetA.selectedIndex].text) ||
                          ""
                        : ""}
                    </span>
                  </div>
                </td>

                {props.viewObject.deselectAll ? (
                  <td className={styles.deselect}>
                    {" "}
                    <span onClick={deselectBtnClicked}>
                      <img tabIndex={0} src={btnUnSelectAll} />
                    </span>{" "}
                  </td>
                ) : (
                  ""
                )}
                <td className={styles.quickSelect}>
                  {props.viewObject.enableQuickSelectGrid1 ? (
                    <a
                      href="javascript:void(0);"
                      onClick={(e) => {
                        quickSelectGrid1BtnClicked(true);
                      }}
                      style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                    >
                      {Settings.quickSelect}
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </table>
          </div>
        ) : (
          ""
        )}

        <div
          className={`${styles.gridView} ${
            styles.gridViewpg
          } ${"portfolioorg"} ${"requestreport"} ${"doublegridcontainer"}`}
          style={{ marginTop: "4px" }}
        >
          {Object.keys(props.availGrid).length > 0 ? (
            <div
              className={`${
                props.viewObject.view == Settings.viewObject.viewHorizontal
                  ? styles.AvailgridY
                  : styles.AvailgridX
              } ${"hotelsolicitation"} ${"doublegriddata"} ${
                styles.gridborder
              }`}
              style={{
                border: props.availGrid.borderTable
                  ? props.availGrid.borderTable
                  : "none",
                borderBottom: props.availGrid.borderBottom
                  ? props.availGrid.borderBottom
                  : "2px solid rgb(238, 238, 238)",
                content: "",
                display: "block",
                minWidth: props?.availGrid?.width,
                overflow: "hidden",
                height: tableHeight,
              }}
            >
              <div
                className={styles.gridMessageStyle}
                style={{ width: props.availGrid.width + "30px" }}
              >
                <Grid
                  refreshVal={props?.refreshValGridList || ""}
                  id={props.availGrid.id}
                  columns={props.availGrid.availgridColumns}
                  value={props.availGrid.availgridRows}
                  width={props.availGrid.width}
                  height={
                    props.componentName === "requestReport" ? "auto" : null
                  }
                  gridScroll={styles.gridScroll}
                  handleOrderChange={handleOrderChange}
                  componentName={props.componentName}
                  gridNo="1"
                  initialLoad={props.availGrid.initialLoad}
                  isMakingRequestList={props.isMakingRequestList}
                  isMakingRequest={props.isMakingRequest}
                  isMakingRequestAvailList={props.isMakingRequestAvailList}
                ></Grid>
              </div>
              {props.availGrid.directSelect &&
              props.availGrid.directSelect != "" ? (
                <div
                  id="marshaCodeNotFoundBlock"
                  className={styles.gridMessageStyle}
                  style={{
                    // marginTop: "4vw",
                    width: "262px",
                    overflowX: "auto",
                    height: "calc(50vh - 110px)",
                    paddingTop: "5px",
                    paddingLeft: "5px",
                    overflowY: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    className={styles.marshacodeNotFound}
                    style={isOverflown() ? { height: "100%" } : null}
                  >
                    {props.availGrid.directSelect}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {Object.keys(props.selectedGrid).length > 0 ? (
            <div
              className={
                props.viewObject.view == Settings.viewObject.viewHorizontal
                  ? styles.selecttionLinkMiddleY
                  : styles.selecttionLinkMiddleX
              }
            >
              <table className={styles.SecondHeading}>
                <tr>
                  <td className={styles.btnAllignMiddle}>
                    {" "}
                    {props.viewObject.viewSelectCheckboxButton ? (
                      <span onClick={selectButtonClicked}>
                        <img tabIndex={0} src={btnAdd} />
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={styles.btnAllignMiddle}>
                    {" "}
                    {props.viewObject.viewUnselectCheckboxButton ? (
                      <span onClick={unSelectBtnClicked}>
                        <img tabIndex={0} src={btnRemove} />
                      </span>
                    ) : (
                      ""
                    )}
                  </td>

                  {props.componentName != "EdieHotelProfileList" && (
                    <td
                      className={
                        props.componentName === "portfolioOrganization"
                          ? styles.secondHeadingPO
                          : styles.secondHeading
                      }
                    >
                      {" "}
                      {props.viewObject.additionTextSecontTitle ? (
                        <p>
                          {props.viewObject.additionTextSecontTitle}{" "}
                          <span className={styles.subHeading2}>
                            {" "}
                            {props.viewObject.additionTextSecontTitle ===
                            "Subset B:"
                              ? (subsetB &&
                                  subsetB.selectedIndex != 0 &&
                                  subsetB.options[subsetB.selectedIndex]
                                    .text) ||
                                ""
                              : (accountName &&
                                  accountName.options[accountName.selectedIndex]
                                    .text != "*" &&
                                  accountName.options[accountName.selectedIndex]
                                    .text) ||
                                ""}
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </td>
                  )}
                  {props.componentName == "EdieHotelProfileList" && (
                    <td className={styles.secondHeading}>
                      {" "}
                      {props.viewObject.additionTextSecontTitle ? (
                        <span>{props.viewObject.additionTextSecontTitle}</span>
                      ) : (
                        ""
                      )}
                    </td>
                  )}
                  <td className={styles.directSelect2}>
                    {" "}
                    {props.viewObject.enableDirectSelectGrid2 ? (
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => {
                          directSelectGrid2BtnClicked(true);
                        }}
                        style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {Settings.directSelect}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={styles.directSelect2}>
                    {" "}
                    {props.viewObject.enableDirectSelectGrid2 ? (
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => {
                          clearDirectSelect();
                        }}
                        style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {Settings.clearSelect}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>

                  <td
                    className={
                      props.componentName === "portfolioOrganization"
                        ? styles.quickSelectBottom
                        : styles.quickSelect2
                    }
                  >
                    {" "}
                    {props.viewObject.enableQuickSelectGrid2 ? (
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => {
                          quickSelectGrid2BtnClicked(true);
                        }}
                        style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {Settings.quickSelect}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td
                    className={`${styles.btnAllignMiddle} ${styles.buttonTd}`}
                  >
                    {props.viewObject.sendEmailButton ? (
                      <span onClick={sendMailBtnClicked}>
                        <img src={btnSendEmail} />
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={styles.btnAllignMiddle}>
                    {props.viewObject.additionalEmailInfoButton ? (
                      <span onClick={(e) => additionalInfoBtnClicked(true)}>
                        <img src={btnAddEmailInfo} />
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={"doublearrows"}>
                    {" "}
                    {props.viewObject.viewSelectAllCheckboxButton ? (
                      <span onClick={selectAllBtnClicked}>
                        <img tabIndex={0} src={btnAddAll} />
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={"doublearrows"}>
                    {" "}
                    {props.viewObject.viewUnselectAllCheckboxButton ? (
                      <span onClick={unSelectAllBtnClicked}>
                        <img tabIndex={0} src={btnRemoveAll} />
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            ""
          )}

          {Object.keys(props.selectedGrid).length > 0 ? (
            <div
              style={{
                border: props.selectedGrid.borderTable
                  ? props.selectedGrid.borderTable
                  : "none",
                height: tableHeight,
                content: "",
                display: "inline-flex",
              }}
              className={`${
                props.viewObject.view == Settings.viewObject.viewHorizontal
                  ? styles.SelectedgridY
                  : styles.SelectedgridX
              } ${"solitationseegrid"} ${styles.gridborder}`}
            >
              <div className="fileUploadBG">
                <Grid
                  refreshVal={props?.refreshValGridSelected || ""}
                  id={props.selectedGrid.id}
                  columns={props.selectedGrid.selectedgridColumns}
                  value={props.selectedGrid.selectedgridRows}
                  gridScroll={styles.gridScroll}
                  width={props.selectedGrid.width}
                  isWidthAuto={props.selectedGrid.isWidthAuto}
                  header={
                    props.selectedGrid.header ? (
                      <FileUpload setFileObj={setFileObj}></FileUpload>
                    ) : (
                      ""
                    )
                  }
                  handleOrderChange={handleOrderChangeSelect}
                  componentName={props.componentName}
                  initialLoad={props.selectedGrid.initialLoad}
                  gridNo="2"
                  isSelectedGrid={true}
                  isMakingRequestList={props.isMakingRequestList}
                  isMakingRequest={props.isMakingRequest}
                  isMakingRequestAvailList={props.isMakingRequestAvailList}
                ></Grid>
              </div>
              {noDirectSelectFound ? (
                <div
                  id="marshaCodeNotFoundBlockBottom"
                  className={styles.gridMessageStyle}
                  style={{
                    width: "262px",
                    overflowX: "auto",
                    height: "calc(50vh - 110px)",
                    paddingTop: "5px",
                    paddingLeft: "5px",
                    overflowY: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    className={styles.marshacodeNotFound}
                    style={isOverflownBottom() ? { height: "100%" } : null}
                  >
                    {noDirectSelectFoundMsg}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredDoubleGridSelect;
