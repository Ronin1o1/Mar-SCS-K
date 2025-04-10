import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
//import HotelFormattedTabs from "../../HotelFormattedTabs";
//import btnSearchSmall from "../../../../common/assets/img/button/btnSearch.gif";
import btnSearch from "../../../../../common/assets/img/button/btnSearch.gif";
import styles from "./RateProductHotelView.css";
import API from "../service/API";
import Settings from "../static/Settings";
//import HotelRateProductSelectContext from "../context/HotelRateProductSelectContext";
import ViewRateDescriptionContext, {
  ViewRateDescriptionContextProvider,
} from "../context/ViewRateDescriptionContext";
import Utils from "../../../../../common/utils/Utils";
import CDataTable from "../../../../../common/components/CDataTable";
import btnPrevious from "../../../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../../common/assets/img/button/btnNext.gif";
import { Layout } from "../../../routing/Layout";
import HotelRateProductSelectContext, {
  HotelRateProductSelectContextProvider,
} from "../../../context/HotelRateProductSelectContext";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
let parentcontextType = null;
let marshaCode;
let hotelName;

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function RateProductHotelView() {
  const urlParms = useLocation().search;
  const [rateProgramCode, setRateProgramCode] = useState("");
  const [rateProgramName, setRateProgramName] = useState("");
  const [prevFlag, setPrevFlag] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [viewRateProgramName, setViewRateProgramName] = useState("");
  const [loadingSearchMessage, setLoadingSearchMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [tableIsMakingRequest, setTableIsMakingRequest] = useState(false);
  const tableParentRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();

  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });

  useEffect(() => {
    let query = null;
    query =
      marshaCode &&
      hotelName &&
      Settings.queryParam.marshaCode +
        marshaCode +
        Settings.queryParam.hotelName +
        hotelName;
    setIsMakingRequest(true);
    API.getRateProductView(query).then((data) => {
      setIsMakingRequest(false);
      contextType.setViewProductData(data);
      parentcontextType.setBrandName(data.brandCode);
      parentcontextType.setViewProductData(data);
      setLoadingSearchMessage(Settings.searchRateProgram);
      setShowTable(false);
    });
  }, []);

  const invokeSearchAction = () => {
    setLoadingSearchMessage(Settings.searchLoading);
    const paramObj = {
      rateProgramCode: rateProgramCode,
      rateProgramName: rateProgramName,
      startRatePlanCode: "",
      endRatePlanCode: "",
      firstProduct: `${Settings.firstProduct}`,
      entryLevel: `${Settings.entryLevel}`,
      navPage: `${Settings.navPageSearch}`,
      marshaCode: marshaCode,
      hotelName: hotelName,
    };
    contextType.setApiParams(paramObj);
    if (contextType.state?.apiParams) {
      const postData = Utils.createPostData(contextType.state.apiParams);
      setIsMakingRequest(true);
      API.getSearchResult(postData).then((data) => {
        setIsMakingRequest(false);
        contextType.setProductSearchList(data);
        contextType.setProduct(data);
        if (data !== "") {
          setLoadingSearchMessage("");
          setShowTable(true);
          if (rateProgramCode === "" && rateProgramName === "") {
            setNextFlag(true);
          } else {
            setNextFlag(false);
          }
        }
      });
    }
  };

  const handlePrevsNextClick = (navigation) => {
    const paramObj = {
      rateProgramCode: "",
      rateProgramName: "",
      startRatePlanCode:
        contextType.state.productSearchList?.ratePlanAssignmentsSearch
          .startRatePlanCode,
      endRatePlanCode:
        contextType.state.productSearchList?.ratePlanAssignmentsSearch
          .endRatePlanCode,
      firstProduct: `${Settings.firstProduct}`,
      entryLevel: `${Settings.entryLevel}`,
      navPage: navigation,
      marshaCode: marshaCode,
      hotelName: hotelName,
    };
    contextType.setApiParams(paramObj);
    if (contextType.state?.apiParams) {
      const postData = Utils.createPostData(contextType.state.apiParams);
      setTableIsMakingRequest(true);
      API.getSearchResult(postData).then((data) => {
        setTableIsMakingRequest(false);
        contextType.setProductSearchList(data);
        if (data !== "") {
          setShowTable(true);

          if (
            contextType.state.productSearchList?.ratePlanAssignmentsSearch
              .startRatePlanCode !== contextType.state.setProductName
          ) {
            setPrevFlag(true);
          } else {
            setPrevFlag(false);
          }
        }
      });
    }
  };

  const viewDescriptionContent = (data) => {
    setViewRateProgramName(data.ratePlanCode + "/" + data.ratePlanName);
    const params = {
      marshaCode: marshaCode,
      viewrpgmCode: data.ratePlanCode,
      languageId: contextType.state.languageListObj.code,
      strChannel: JSON.stringify({
        code: contextType.state.channelListObj.code,
        number: contextType.state.channelListObj.number,
        name: contextType.state.channelListObj.name,
      }),
      strEntry: JSON.stringify({
        name: contextType.state.entryListObj.name,
        code: contextType.state.entryListObj.code,
      }),
    };
    const postData = Utils.createPostData(params);
    setIsMakingRequest(true);
    API.getRateDescription(postData).then((data) => {
      setIsMakingRequest(false);
      contextType.setRateDescription(data);
    });
  };

  const handleDropdown = (e, fieldName) => {
    if (fieldName === `${Settings.label.ChannelList}`) {
      contextType.state.viewDescriptionList.channelList?.map((element) => {
        if (element.name === e.target.value) {
          contextType.setChannelListVal(element);
        }
      });
    } else if (fieldName === `${Settings.label.LanguageList}`) {
      contextType.state.viewDescriptionList.languageList?.map((element) => {
        if (element.englishName === e.target.value) {
          contextType.setLanguageListVal(element);
        }
      });
    } else {
      contextType.state.viewDescriptionList.entryList?.map((element) => {
        if (element.name === e.target.value) {
          contextType.setEntryListVal(element);
        }
      });
    }
  };
  const viewBtnTemplate = (rowData) => {
    return (
      <div>
        <a
          href="javascript:void(0);"
          className={styles.deleteContainer}
          onClick={() => {
            viewDescriptionContent(rowData);
          }}
        >
          {Settings.tableViewBtn}
        </a>
      </div>
    );
  };
  const columns = [
    {
      field: Settings.rateDescription.tableColumns.rateProgramCode.field,
      header: Settings.rateDescription.tableColumns.rateProgramCode.header,
      style: { width: "40px" },
    },
    {
      field: Settings.rateDescription.tableColumns.rateProgramName.field,
      header: Settings.rateDescription.tableColumns.rateProgramName.header,
      style: { width: "180px" },
    },
    {
      field: Settings.rateDescription.tableColumns.ProductCode.field,
      header: Settings.rateDescription.tableColumns.ProductCode.header,
      style: { width: "80px" },
    },
    {
      field: Settings.rateDescription.tableColumns.ProductName.field,
      header: Settings.rateDescription.tableColumns.ProductName.header,
      style: {
        width: "200px",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
    },
    {
      field: Settings.rateDescription.tableColumns.viewBtn.field,
      header: Settings.rateDescription.tableColumns.viewBtn.header,
      body: viewBtnTemplate,
      style: { width: "60px" },
    },
  ];
  return (
    <HotelRateProductSelectContextProvider>
      <HotelRateProductSelectContext.Consumer>
        {(selectview) => {
          parentcontextType = selectview;
          return (
            <Layout>
              <ViewRateDescriptionContextProvider>
                <ViewRateDescriptionContext.Consumer>
                  {(rateproductview) => {
                    contextType = rateproductview;
                    return (
                      <div>
                        {isMakingRequest && <CLoader />}
                        <div>
                          <div className={styles.horizontalLine}></div>
                          <div>
                            <span className={styles.tableBodyContent}>
                              {Settings.label.Hotel}{" "}
                            </span>{" "}
                            {marshaCode} - {hotelName}
                          </div>
                          <div className={styles.staticContent}>
                            {Settings.viewStaticContent}
                          </div>
                          <div>{Settings.viewStaticContentList}</div>
                          <div>{Settings.viewStaticContentChannel}</div>
                          <div>{Settings.viewStaticContentInfo}</div>
                          <div className={styles.rateProgramSearch}>
                            {Settings.rateProgramSearch}
                          </div>
                          <div className={styles.rateProgramSearch}>
                            {Settings.rateProgramSearchRules}
                          </div>
                          <div className="mainContainer">
                            <div className={styles.leftPanel}>
                              <div className={styles.flexContainer}>
                                <div className={styles.rateProductLabels}>
                                  {Settings.label.rateProgramCodeLabel}
                                </div>
                                <input
                                  className={styles.rateProductInput}
                                  type="text"
                                  maxLength={4}
                                  onKeyPress={(e) =>
                                    contextType.KorSafeCharsOnly(e)
                                  }
                                  onChange={(e) =>
                                    setRateProgramCode(e.target.value)
                                  }
                                />
                              </div>
                              <div className={styles.flexContainer}>
                                <div className={styles.rateProductLabels}>
                                  {Settings.label.rateProgramNameLabel}
                                </div>
                                <input
                                  className={styles.rateProductNameInput}
                                  type="text"
                                  maxLength={40}
                                  onKeyPress={(e) =>
                                    contextType.KorSafeCharsOnly(e)
                                  }
                                  onBlur={(e) =>
                                    contextType.handleValidProgramName(
                                      e.target.value
                                    )
                                  }
                                  onChange={(e) =>
                                    setRateProgramName(e.target.value)
                                  }
                                />
                                <img
                                  src={btnSearch}
                                  className={styles.btnSearch}
                                  onClick={() => {
                                    invokeSearchAction();
                                  }}
                                />
                              </div>
                              <div>
                                <div className={styles.loadingMessage}>
                                  {loadingSearchMessage}
                                </div>

                                <div
                                  className={
                                    showTable && !loadingSearchMessage
                                      ? styles.dataTableContainer
                                      : styles.hiddenTable
                                  }
                                  ref={tableParentRef}
                                >
                                  {tableIsMakingRequest && (
                                    <div
                                      style={{
                                        height: `${tableParentRef.current.offsetHeight}px`,
                                        width: `${`${tableParentRef.current.offsetWidth}px`}`,
                                        position: "absolute",
                                      }}
                                    >
                                      <CLoader />
                                    </div>
                                  )}
                                  <CDataTable
                                    id="gridTableView"
                                    columns={columns}
                                    value={
                                      contextType.state.productSearchList
                                        ?.ratePlanAssignmentDataList
                                    }
                                    scrollHeight="270px"
                                  />
                                </div>
                                <style>{` 
                                    .p-datatable-scrollable-body{
                                      overflow-x: hidden !important;
                                      overflow-y: auto !important;
                                    }
                                    .p-datatable-emptymessage > td {
                                      text-align: center !important;
                                    }                              
                                `}</style>
                              </div>
                            </div>
                            <div className={styles.rightPanel}>
                              <div className={styles.selectEntryContainer}>
                                <span className={styles.dropdownLabels}>
                                  {Settings.label.ChannelList}
                                </span>

                                <select
                                  className={styles.selectChannelList}
                                  id="SelectedHotel"
                                  defaultValue={
                                    contextType.state?.channelListObj.name
                                  }
                                  value={contextType.state?.channelListObj.name}
                                  onChange={(e) => {
                                    handleDropdown(
                                      e,
                                      Settings.label.ChannelList
                                    );
                                  }}
                                >
                                  {contextType.state.viewDescriptionList?.channelList?.map(
                                    (data) => (
                                      <option key={data.code} value={data.name}>
                                        {data.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className={styles.selectLangContainer}>
                                <span className={styles.dropdownLabels}>
                                  {Settings.label.LanguageList}{" "}
                                </span>
                                <select
                                  className={styles.selectLangList}
                                  id="SelectedHotel"
                                  defaultValue={
                                    contextType.state?.languageListObj
                                      .englishName
                                  }
                                  value={
                                    contextType.state?.languageListObj
                                      .englishName
                                  }
                                  onChange={(e) => {
                                    handleDropdown(
                                      e,
                                      Settings.label.LanguageList
                                    );
                                  }}
                                >
                                  {contextType.state.viewDescriptionList?.languageList?.map(
                                    (data) => (
                                      <option
                                        key={data.code}
                                        value={data.englishName}
                                      >
                                        {data.englishName}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className={styles.selectEntryContainer}>
                                <span className={styles.dropdownLabels}>
                                  {" "}
                                  {Settings.label.EntryList}{" "}
                                </span>
                                <select
                                  className={styles.selectEntryList}
                                  id="SelectedHotel"
                                  defaultValue={
                                    contextType.state?.entryListObj.name
                                  }
                                  value={contextType.state?.entryListObj.name}
                                  onChange={(e) => {
                                    handleDropdown(e, Settings.label.EntryList);
                                  }}
                                >
                                  {contextType.state.viewDescriptionList?.entryList?.map(
                                    (data) => (
                                      <option key={data.code} value={data.name}>
                                        {data.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              {Settings.label.rateDescription} :{" "}
                              {viewRateProgramName}
                              <div className={styles.rateDescriptionContent}>
                                <p
                                  className={
                                    contextType.state?.viewDescriptionText &&
                                    contextType.state?.viewDescriptionText[0]
                                      ?.value
                                      ? ""
                                      : styles.hiddenTable
                                  }
                                >
                                  <span className={styles.newText}>
                                    {Settings.label.NewText}
                                  </span>
                                  <span>
                                    {contextType.state?.viewDescriptionText &&
                                      contextType.state?.viewDescriptionText[0]
                                        ?.value}
                                  </span>
                                  <span>
                                    {contextType.state?.viewDescriptionText &&
                                      contextType.state?.viewDescriptionText[1]
                                        ?.value}
                                  </span>
                                  <span>
                                    {contextType.state?.viewDescriptionText &&
                                      contextType.state?.viewDescriptionText[2]
                                        ?.value}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {!loadingSearchMessage && (
                          <div
                            className={
                              nextFlag ? styles.buttonPanel : styles.hiddenTable
                            }
                          >
                            <span className={prevFlag ? "" : styles.preImg}>
                              <img
                                className={
                                  prevFlag ? styles.prevBtn : styles.hiddenTable
                                }
                                onClick={() => {
                                  handlePrevsNextClick(
                                    Settings.navPagePrevious
                                  );
                                }}
                                src={btnPrevious}
                              ></img>
                            </span>
                            <span
                              className={
                                nextFlag ? styles.nextBtn : styles.hiddenTable
                              }
                            >
                              <img
                                onClick={() => {
                                  handlePrevsNextClick(Settings.navPageNext);
                                }}
                                src={btnNext}
                              ></img>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </ViewRateDescriptionContext.Consumer>
              </ViewRateDescriptionContextProvider>
            </Layout>
          );
        }}
      </HotelRateProductSelectContext.Consumer>
    </HotelRateProductSelectContextProvider>
  );
}

export default RateProductHotelView;
