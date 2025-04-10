/* eslint-disable react/jsx-key */
import React, { Component, Suspense } from "react";
import UserEditContext, {
  UserEditContextProvider,
} from "../context/UserEditContext";
import styles from "../content/UserEditProperty.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnCopy from "../../../../common/assets/img/button/btnCopy.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnDelete from "../../../../common/assets/img/button/btnDelete.gif";
import btnReturnUserList from "../../../../common/assets/img/button/btnReturnUserList.gif";
import btnUnSelectAll from "../../../../common/assets/img/button/btnUnSelectAll.gif";
import Settings from "../static/Settings";
import APIEdit from "../service/APIEdit";
import { ListView } from "../../shared/listView";
import CCheckbox from "../../../../common/components/CCheckbox";
import CRadio from "../../../../common/components/CRadio";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import QuickSelect from "../../../../shared/components/quickSelect";
import { MarshaSearchFilters } from "./MarshaSearchFilters";
import { CPagination } from "../../../../common/components/CPagination";
import CopyGridContent from "./CopyGridContent";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;
let userDetailsParam = {
  userid: "",
  role: "",
};
const compAccenture = "Accenture LLP";
export default class UserEditProperty extends Component {
  constructor(props) {
    super(props);
    userDetailsParam = {
      userid: props.location.state.cn_userid,
      role: "MFPFSALE",
    };
  }

  componentDidMount() {
    sessionStorage.setItem("LSquickSelectMessage", "");
    contextType.setLoader(true);
    contextType.setUserDetail({
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
    });

    const params = {
      optSel: "",
      selectedRegionList: JSON.stringify([]),
      selectedAffiliationList: JSON.stringify([]),
      selectedFranchiseList: JSON.stringify([]),
      p_1: "ALL",
      alphaOrderProp: "",
      filterByMorF: 0,
      regFound: "N",
      braFound: "N",
      fraFound: "N",
      aHotels: "N",
      userRoleDescription: "",
      showProperties: true,
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
      filterString: "",
      searchBy: "",
      page: JSON.stringify({ page: 1 }),
      orderby: 1,
      strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
      strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
      strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
      totPropSelPageLen: 1,
      totPropPageLen: 45,
    };
    APIEdit.populatePropertyList(params).then((data) => {
      contextType.setHotelData(data);
      contextType.setLoader(false);
    });
    document.addEventListener("keydown", this.onEnterButton);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onEnterButton);
  }

  onEnterButton(event) {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id == "up-lsu-unselect-all") {
        contextType.hotelsUnSelectAll();
      } else if (focusedElem.id && focusedElem.id.includes("up-lsu-rtnbtn")) {
        contextType.returnToMain();
      } else if (focusedElem.id && focusedElem.id == "up-lsu-updatebtn-prop") {
        contextType.hotelsUpdateProp();
      } else if (focusedElem.id && focusedElem.id == "up-lsu-updatebtn-rgn") {
        contextType.updateRegion("input", "");
      } else if (focusedElem.id && focusedElem.id == "up-lsu-updatebtn-brand") {
        contextType.updateBrand("input", "");
      } else if (
        focusedElem.id &&
        focusedElem.id == "up-lsu-updatebtn-franch"
      ) {
        contextType.updateFranch("input", "");
      } else if (focusedElem.id && focusedElem.id == "up-lsu-updatebtn-upall") {
        contextType.updateallhotelbtn_onclick("input", "");
      }
    }
  }

  handlePaginationAPI(pageNumber: number) {
    contextType.setAvailablePNumber(pageNumber);
    sessionStorage.setItem("LSquickSelectMessage", "");
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.availPropText);
  }

  handlePaginationAPISelProp(pageNumber: number) {
    contextType.setSelectPNumber(pageNumber);
    sessionStorage.setItem("LSquickSelectMessage", "");
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.selectPropText);
    const hotellistScroll = document.getElementById(Settings.ids.hotelListId);
    if (hotellistScroll) {
      hotellistScroll.scrollTop = 0;
    }
  }

  handlePaginationAPIRegion(pageNumber: number) {
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.region);
  }

  handlePaginationAPIBrand(pageNumber: number) {
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.brand);
  }

  handlePaginationAPIFranchise(pageNumber: number) {
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.franchise);
  }

  render() {
    return (
      <UserEditContextProvider>
        <UserEditContext.Consumer>
          {(UserEditContextValue) => {
            contextType = UserEditContextValue;
            return (
              <React.Fragment>
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{ position: "absolute", top: "55%", left: "45%" }}
                    src={screenLoader}
                  />
                ) : (
                  <form>
                    <CModal
                      title={Settings.labels.quickSelect}
                      onClose={(e) => {
                        contextType.hotelsQuickSelect(true);
                      }}
                      show={contextType.showQuickSelectTop}
                      xPosition={-350}
                      yPosition={-350}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <QuickSelect
                          quickSelectObject={{
                            textField:
                              Settings.quickSelectObject.quick_select.value,
                            componentName: "userEdit",
                            textareaId:
                              Settings.quickSelectObject.quick_select.id,
                            rows: Settings.quickSelectObject.row,
                            cols: Settings.quickSelectObject.cols,
                            textareaName:
                              Settings.quickSelectObject.quick_select.name,
                            label: Settings.quickSelectObject.label,
                          }}
                          save={(e) => contextType.saveQuickSelect(e)}
                          cancel={(e) => {
                            contextType.hotelsQuickSelect(true);
                          }}
                        />
                      </Suspense>
                    </CModal>
                    <CModal
                      title={Settings.labels.userList}
                      onClose={(e) => {
                        contextType.copyUser_onclick(true);
                      }}
                      show={contextType.showCopyPage}
                      xPosition={-215}
                      yPosition={-500}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <CopyGridContent data={userDetailsParam} />
                      </Suspense>
                    </CModal>
                    <table className={`${styles.menuWdth100_Height}`}>
                      <tbody>
                        <tr>
                          <td className={styles.heightTwenty}>
                            <label className={styles.labelText}>
                              {contextType.state.user.cn_firstname}
                            </label>
                            <label className={styles.labelText}>
                              {" "}
                              {contextType.state.user.cn_lastname}{" "}
                            </label>
                            (
                            <label className={styles.labelText}>
                              {contextType.state.user.eid}
                            </label>
                            )
                            {contextType.state.user.companyname ===
                            compAccenture ? (
                              <label
                                className={`${styles.labelText} ${styles.newLine}`}
                              >
                                {" "}
                                {contextType.state.user.companyname}
                              </label>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </td>
                        </tr>
                        <tr
                          className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                        >
                          <td
                            height={2}
                            className={styles.heightTop}
                            colSpan="2"
                          ></td>
                        </tr>
                        {contextType?.state?.user?.allhotels == "N" ? (
                          <tr>
                            <td
                              className={`${styles.WidthCls} ${styles.paddingCls}`}
                            >
                              <a href="javascript:void(0);">
                                <img
                                  src={btnCopy}
                                  className={styles.borderZero}
                                  onClick={(e) =>
                                    contextType.copyUser_onclick(e)
                                  }
                                />
                              </a>
                            </td>
                          </tr>
                        ) : (
                          <>&nbsp;</>
                        )}
                        {contextType.state.isAllHotels ? (
                          <tr>
                            <td
                              height={2}
                              className={`${styles.labelText} ${styles.paddingCls} ${styles.heightTop}`}
                            >
                              {Settings.labels.properties}
                            </td>
                          </tr>
                        ) : (
                          <>&nbsp;</>
                        )}
                        <tr
                          className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                        >
                          <td
                            height={2}
                            className={styles.heightTop}
                            colSpan="2"
                          ></td>
                        </tr>
                        {contextType.state.isAllHotels ? (
                          <tr>
                            <td>
                              <table
                                className={`${styles.zero_Height} ${styles.innerTable}`}
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <table
                                        className={styles.menuWdth100_Height}
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                className={`${styles.zero_Height}`}
                                              >
                                                <tbody>
                                                  {contextType.state
                                                    .isMFPUser ? (
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.propertyrasio
                                                        }
                                                      >
                                                        <span
                                                          className={`${styles.nowrapStyle} ${styles.radioButtonCls} ${styles.paddingClsOne}`}
                                                        >
                                                          <CRadio
                                                            type={
                                                              Settings.inputType
                                                                .radio
                                                            }
                                                            id={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            name={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setPropertyType(
                                                                "Property"
                                                              )
                                                            }
                                                            checked={
                                                              contextType.state
                                                                .user.optSel ==
                                                              "P"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CRadio>
                                                          <label
                                                            className={
                                                              styles.fieldLabel
                                                            }
                                                          >
                                                            {
                                                              Settings.labels
                                                                .properties
                                                            }
                                                          </label>
                                                        </span>
                                                        <span
                                                          className={`${styles.nowrapStyle} ${styles.radioButtonCls} ${styles.radioSpacing}`}
                                                        >
                                                          <CRadio
                                                            type={
                                                              Settings.inputType
                                                                .radio
                                                            }
                                                            id={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            name={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setPropertyType(
                                                                "Region"
                                                              )
                                                            }
                                                            checked={
                                                              contextType.state
                                                                .user.optSel ==
                                                              "R"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CRadio>
                                                          <label
                                                            className={
                                                              styles.fieldLabel
                                                            }
                                                          >
                                                            {
                                                              Settings.labels
                                                                .region
                                                            }
                                                          </label>
                                                        </span>
                                                        <span
                                                          className={`${styles.nowrapStyle} ${styles.radioButtonCls} ${styles.radioSpacing}`}
                                                        >
                                                          <CRadio
                                                            type={
                                                              Settings.inputType
                                                                .radio
                                                            }
                                                            id={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            name={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setPropertyType(
                                                                "Brand"
                                                              )
                                                            }
                                                            checked={
                                                              contextType.state
                                                                .user.optSel ==
                                                              "B"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CRadio>
                                                          <label
                                                            className={
                                                              styles.fieldLabel
                                                            }
                                                          >
                                                            {
                                                              Settings.labels
                                                                .brand
                                                            }
                                                          </label>
                                                        </span>
                                                        <span
                                                          className={`${styles.nowrapStyle} ${styles.radioButtonCls} ${styles.radioSpacing}`}
                                                        >
                                                          <CRadio
                                                            type={
                                                              Settings.inputType
                                                                .radio
                                                            }
                                                            id={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            name={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setPropertyType(
                                                                "Franchise"
                                                              )
                                                            }
                                                            checked={
                                                              contextType.state
                                                                .user.optSel ==
                                                              "F"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CRadio>
                                                          <label
                                                            className={
                                                              styles.fieldLabel
                                                            }
                                                          >
                                                            {
                                                              Settings.labels
                                                                .franchise
                                                            }
                                                          </label>
                                                        </span>
                                                        <span
                                                          className={`${styles.nowrapStyle} ${styles.radioButtonCls}`}
                                                        >
                                                          <CRadio
                                                            type={
                                                              Settings.inputType
                                                                .radio
                                                            }
                                                            id={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            name={
                                                              Settings.labels
                                                                .radioSelect
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setPropertyType(
                                                                "All"
                                                              )
                                                            }
                                                            checked={
                                                              contextType.state
                                                                .user.optSel ==
                                                              "H"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CRadio>
                                                          <label
                                                            className={
                                                              styles.fieldLabel
                                                            }
                                                          >
                                                            {
                                                              Settings.labels
                                                                .allProperties
                                                            }
                                                          </label>
                                                        </span>
                                                      </td>
                                                    </tr>
                                                  ) : (
                                                    <>&nbsp;</>
                                                  )}

                                                  <tr>
                                                    <td
                                                      className={` ${styles.paddingClsOne} ${styles.nowrapStyle}`}
                                                    >
                                                      <b>
                                                        {
                                                          Settings.labels
                                                            .enhancedReporting
                                                        }{" "}
                                                      </b>
                                                      <span
                                                        className={
                                                          styles.paddingClsOne
                                                        }
                                                      >
                                                        <CCheckbox
                                                          type={
                                                            Settings.inputType
                                                              .checkbox
                                                          }
                                                          id={
                                                            contextType.state
                                                              .user
                                                              .enhancedReportingChk
                                                          }
                                                          name={
                                                            contextType.state
                                                              .user
                                                              .enhancedReportingChk
                                                          }
                                                          onChangeHandler={(
                                                            e
                                                          ) =>
                                                            contextType.setEnhancedReporting(
                                                              e
                                                            )
                                                          }
                                                          checked={
                                                            contextType.state
                                                              .user
                                                              .enhancedReportingChk ==
                                                            "Y"
                                                              ? true
                                                              : false
                                                          }
                                                        ></CCheckbox>
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <>&nbsp;</>
                                            </td>
                                          </tr>
                                          <tr>
                                            {contextType.state.isRegion ? (
                                              <td
                                                className={styles.nowrapStyle}
                                              >
                                                <table className={styles.top}>
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .selectRegion
                                                            }
                                                          </label>
                                                        </b>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td></td>
                                                    </tr>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <div
                                                          id={
                                                            Settings.ids
                                                              .regionDivId
                                                          }
                                                          className={
                                                            styles.regionDiv
                                                          }
                                                        >
                                                          <table
                                                            className={
                                                              styles.zero_Height
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.widthTen
                                                                  }
                                                                >
                                                                  <>&nbsp;</>
                                                                </td>
                                                                <td>
                                                                  {contextType.state.userArray.regions.map(
                                                                    (data) => {
                                                                      return (
                                                                        <ListView
                                                                          data={
                                                                            data
                                                                          }
                                                                          handleChange={
                                                                            contextType.handleChangeInput
                                                                          }
                                                                          type="regionProp"
                                                                        />
                                                                      );
                                                                    }
                                                                  )}
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <div>
                                                          <a>
                                                            <img
                                                              id="up-lsu-updatebtn-rgn"
                                                              tabIndex={0}
                                                              src={btnUpdate}
                                                              className={
                                                                styles.borderZero
                                                              }
                                                              alt={
                                                                Settings.labels
                                                                  .hotellistAlt
                                                              }
                                                              onClick={(e) =>
                                                                contextType.updateRegion(
                                                                  "input",
                                                                  ""
                                                                )
                                                              }
                                                            />
                                                          </a>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <CPagination
                                                          totalPages={
                                                            contextType.state
                                                              .totPropSelPageLen
                                                          }
                                                          context={contextType}
                                                          handlePaginationAPI={
                                                            this
                                                              .handlePaginationAPIRegion
                                                          }
                                                        />
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <table
                                                          className={`${styles.menuWdth100_Height} ${styles.selectProp} ${styles.borderThin}`}
                                                        >
                                                          <tbody>
                                                            <tr
                                                              className={
                                                                styles.selectPropTr
                                                              }
                                                            >
                                                              <td
                                                                className={
                                                                  styles.height100Top
                                                                }
                                                              >
                                                                <div
                                                                  className={
                                                                    styles.gridNode
                                                                  }
                                                                >
                                                                  <div
                                                                    className={
                                                                      styles.gridHeader
                                                                    }
                                                                  >
                                                                    <table
                                                                      className={`${styles.gridOne} ${styles.zero_Height}`}
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <th
                                                                            className={
                                                                              styles.HeaderCls
                                                                            }
                                                                          >
                                                                            <b>
                                                                              abcd
                                                                              {
                                                                                Settings
                                                                                  .labels
                                                                                  .selectProp
                                                                              }
                                                                            </b>
                                                                          </th>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </div>
                                                                  <div
                                                                    id={
                                                                      Settings
                                                                        .ids
                                                                        .regionId
                                                                    }
                                                                    className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                                  >
                                                                    {contextType
                                                                      ?.state
                                                                      ?.userArray
                                                                      ?.hotelBasedRegion
                                                                      ?.length <=
                                                                    0 ? (
                                                                      <div
                                                                        className={
                                                                          styles.gridRow
                                                                        }
                                                                      >
                                                                        <table
                                                                          className={
                                                                            styles.gridRowTable
                                                                          }
                                                                          id="gridTableView"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                className={
                                                                                  styles.middle
                                                                                }
                                                                              >
                                                                                {
                                                                                  Settings
                                                                                    .labels
                                                                                    .noDataFound
                                                                                }
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </div>
                                                                    ) : (
                                                                      <div>
                                                                        {contextType
                                                                          ?.state
                                                                          ?.userArray
                                                                          ?.hotelBasedRegion
                                                                          ?.length <=
                                                                        0 ? (
                                                                          <div
                                                                            className={
                                                                              styles.gridRow
                                                                            }
                                                                          >
                                                                            <table
                                                                              className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                                              id="gridTableView"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    className={
                                                                                      styles.middle
                                                                                    }
                                                                                  >
                                                                                    {
                                                                                      Settings
                                                                                        .labels
                                                                                        .allPropertiesSelected
                                                                                    }
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </div>
                                                                        ) : (
                                                                          <div>
                                                                            {contextType.state.userArray.hotelBasedRegion.map(
                                                                              (
                                                                                data
                                                                              ) => {
                                                                                return (
                                                                                  <ListView
                                                                                    data={
                                                                                      data
                                                                                    }
                                                                                    handleChange={
                                                                                      contextType.handleChangeInput
                                                                                    }
                                                                                    type="regionProp"
                                                                                  />
                                                                                );
                                                                              }
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .totalProperties
                                                            }
                                                          </label>
                                                          <label>
                                                            {
                                                              contextType.state
                                                                .user
                                                                .numRegionItems
                                                            }
                                                          </label>
                                                          <a
                                                            className={
                                                              styles.returnButton
                                                            }
                                                          >
                                                            <img
                                                              id="up-lsu-rtnbtn"
                                                              tabIndex={0}
                                                              src={
                                                                btnReturnUserList
                                                              }
                                                              className={
                                                                styles.borderZero
                                                              }
                                                              onClick={(e) =>
                                                                contextType.returnToMain(
                                                                  e
                                                                )
                                                              }
                                                              alt={
                                                                Settings.labels
                                                                  .returnAccessList
                                                              }
                                                            />
                                                          </a>
                                                        </b>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isBrand ? (
                                              <td
                                                className={styles.nowrapStyle}
                                              >
                                                <table className={styles.top}>
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .selectBrand
                                                            }
                                                          </label>
                                                        </b>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <div
                                                          id={
                                                            Settings.ids
                                                              .regionDivId
                                                          }
                                                          className={
                                                            styles.regionDiv
                                                          }
                                                        >
                                                          <table
                                                            className={
                                                              styles.zero_Height
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.widthTen
                                                                  }
                                                                >
                                                                  <>&nbsp;</>
                                                                </td>
                                                                <td>
                                                                  {contextType.state.userArray.hotelAffiliations.map(
                                                                    (data) => {
                                                                      return (
                                                                        <ListView
                                                                          data={
                                                                            data
                                                                          }
                                                                          handleChange={
                                                                            contextType.handleChangeInput
                                                                          }
                                                                          type="brandProp"
                                                                        />
                                                                      );
                                                                    }
                                                                  )}
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <div>
                                                          <a>
                                                            <img
                                                              id="up-lsu-updatebtn-brand"
                                                              tabIndex={0}
                                                              src={btnUpdate}
                                                              className={
                                                                styles.borderZero
                                                              }
                                                              alt={
                                                                Settings.labels
                                                                  .hotellistAlt
                                                              }
                                                              onClick={(e) =>
                                                                contextType.updateBrand(
                                                                  "input",
                                                                  ""
                                                                )
                                                              }
                                                            />
                                                          </a>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <CPagination
                                                          totalPages={
                                                            contextType.state
                                                              .totPropSelPageLen
                                                          }
                                                          context={contextType}
                                                          handlePaginationAPI={
                                                            this
                                                              .handlePaginationAPIBrand
                                                          }
                                                        />
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <table
                                                          className={`${styles.menuWdth100_Height} ${styles.selectProp} ${styles.borderThin}`}
                                                        >
                                                          <tbody>
                                                            <tr
                                                              className={
                                                                styles.selectPropTr
                                                              }
                                                            >
                                                              <td
                                                                className={
                                                                  styles.widthTen
                                                                }
                                                              ></td>
                                                              <td
                                                                className={
                                                                  styles.height100Top
                                                                }
                                                              >
                                                                <div
                                                                  className={
                                                                    styles.gridNode
                                                                  }
                                                                >
                                                                  <div
                                                                    className={
                                                                      styles.gridHeader
                                                                    }
                                                                  >
                                                                    <table
                                                                      className={`${styles.gridOne} ${styles.zero_Height}`}
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <th
                                                                            className={
                                                                              styles.HeaderCls
                                                                            }
                                                                          >
                                                                            <b>
                                                                              {
                                                                                Settings
                                                                                  .labels
                                                                                  .selectProp
                                                                              }
                                                                            </b>
                                                                          </th>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </div>
                                                                  <div
                                                                    id={
                                                                      Settings
                                                                        .ids
                                                                        .hotelBasedOnBrandId
                                                                    }
                                                                    className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                                  >
                                                                    {contextType
                                                                      ?.state
                                                                      ?.userArray
                                                                      ?.hotelBasedOnBrand
                                                                      ?.length <=
                                                                    0 ? (
                                                                      <div
                                                                        className={
                                                                          styles.gridRow
                                                                        }
                                                                      >
                                                                        <table
                                                                          className={
                                                                            styles.gridRowTable
                                                                          }
                                                                          id="gridTableView"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                className={
                                                                                  styles.middle
                                                                                }
                                                                              >
                                                                                {
                                                                                  Settings
                                                                                    .labels
                                                                                    .noDataFound
                                                                                }
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </div>
                                                                    ) : (
                                                                      <div>
                                                                        {contextType
                                                                          ?.state
                                                                          ?.userArray
                                                                          ?.hotelBasedOnBrand
                                                                          ?.length <=
                                                                        0 ? (
                                                                          <div
                                                                            className={
                                                                              styles.gridRow
                                                                            }
                                                                          >
                                                                            <table
                                                                              className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                                              id="gridTableView"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    className={
                                                                                      styles.middle
                                                                                    }
                                                                                  >
                                                                                    {
                                                                                      Settings
                                                                                        .labels
                                                                                        .allPropertiesSelected
                                                                                    }
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </div>
                                                                        ) : (
                                                                          <div>
                                                                            {contextType.state.userArray.hotelBasedOnBrand.map(
                                                                              (
                                                                                data
                                                                              ) => {
                                                                                return (
                                                                                  <ListView
                                                                                    data={
                                                                                      data
                                                                                    }
                                                                                    handleChange={
                                                                                      contextType.handleChangeInput
                                                                                    }
                                                                                    type="brandProp"
                                                                                  />
                                                                                );
                                                                              }
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .totalProperties
                                                            }
                                                          </label>
                                                          <label>
                                                            {
                                                              contextType.state
                                                                .user
                                                                .numBrandItems
                                                            }
                                                          </label>
                                                          <a
                                                            className={
                                                              styles.returnButton
                                                            }
                                                          >
                                                            <img
                                                              id="up-lsu-rtnbtn"
                                                              tabIndex={0}
                                                              src={
                                                                btnReturnUserList
                                                              }
                                                              className={
                                                                styles.borderZero
                                                              }
                                                              onClick={(e) =>
                                                                contextType.returnToMain(
                                                                  e
                                                                )
                                                              }
                                                              alt={
                                                                Settings.labels
                                                                  .returnAccessList
                                                              }
                                                            />
                                                          </a>
                                                        </b>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isFranchise ? (
                                              <td
                                                className={styles.nowrapStyle}
                                              >
                                                <table className={styles.top}>
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .selectFranchise
                                                            }
                                                          </label>
                                                        </b>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.tdShiftLeft
                                                        }
                                                      >
                                                        <div
                                                          id={
                                                            Settings.ids
                                                              .regionDivId
                                                          }
                                                          className={
                                                            styles.regionDiv
                                                          }
                                                        >
                                                          <table
                                                            className={
                                                              styles.zero_Height
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.widthTen
                                                                  }
                                                                >
                                                                  <>&nbsp;</>
                                                                </td>
                                                                <td>
                                                                  {contextType.state.userArray.franchiseList.map(
                                                                    (data) => {
                                                                      return (
                                                                        <ListView
                                                                          data={
                                                                            data
                                                                          }
                                                                          handleChange={
                                                                            contextType.handleChangeInput
                                                                          }
                                                                          type="franchiseProp"
                                                                        />
                                                                      );
                                                                    }
                                                                  )}
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        <a>
                                                          <img
                                                            id="up-lsu-updatebtn-franch"
                                                            tabIndex={0}
                                                            src={btnUpdate}
                                                            className={
                                                              styles.borderZero
                                                            }
                                                            alt={
                                                              Settings.labels
                                                                .hotellistAlt
                                                            }
                                                            onClick={(e) =>
                                                              contextType.updateFranch(
                                                                "input",
                                                                ""
                                                              )
                                                            }
                                                          />
                                                        </a>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <CPagination
                                                          totalPages={
                                                            contextType.state
                                                              .totPropSelPageLen
                                                          }
                                                          context={contextType}
                                                          handlePaginationAPI={
                                                            this
                                                              .handlePaginationAPIFranchise
                                                          }
                                                        />
                                                      </td>
                                                      <td>
                                                        <>&nbsp;</>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <table
                                                          className={`${styles.menuWdth100_Height} ${styles.selectProp} ${styles.borderThin}`}
                                                        >
                                                          <tbody>
                                                            <tr
                                                              className={
                                                                styles.selectPropTr
                                                              }
                                                            >
                                                              <td
                                                                className={
                                                                  styles.widthTen
                                                                }
                                                              ></td>
                                                              <td
                                                                className={
                                                                  styles.height100Top
                                                                }
                                                              >
                                                                <div
                                                                  className={
                                                                    styles.gridNode
                                                                  }
                                                                >
                                                                  <div
                                                                    className={
                                                                      styles.gridHeader
                                                                    }
                                                                  >
                                                                    <table
                                                                      className={`${styles.gridOne} ${styles.zero_Height}`}
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <th
                                                                            className={
                                                                              styles.HeaderCls
                                                                            }
                                                                          >
                                                                            <b>
                                                                              {
                                                                                Settings
                                                                                  .labels
                                                                                  .selectProp
                                                                              }
                                                                            </b>
                                                                          </th>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </div>
                                                                  <div
                                                                    id={
                                                                      Settings
                                                                        .ids
                                                                        .hotelsBasedOnFranchiseId
                                                                    }
                                                                    className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                                  >
                                                                    {contextType
                                                                      ?.state
                                                                      ?.userArray
                                                                      ?.hotelsBasedOnFranchise
                                                                      ?.length <=
                                                                    0 ? (
                                                                      <div
                                                                        className={
                                                                          styles.gridRow
                                                                        }
                                                                      >
                                                                        <table
                                                                          className={
                                                                            styles.gridRowTable
                                                                          }
                                                                          id="gridTableView"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                className={
                                                                                  styles.middle
                                                                                }
                                                                              >
                                                                                {
                                                                                  Settings
                                                                                    .labels
                                                                                    .noDataFound
                                                                                }
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </div>
                                                                    ) : (
                                                                      <div>
                                                                        {contextType
                                                                          ?.state
                                                                          ?.userArray
                                                                          ?.hotelsBasedOnFranchise
                                                                          ?.length <=
                                                                        0 ? (
                                                                          <div
                                                                            className={
                                                                              styles.gridRow
                                                                            }
                                                                          >
                                                                            <table
                                                                              className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                                              id="gridTableView"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    className={
                                                                                      styles.middle
                                                                                    }
                                                                                  >
                                                                                    {
                                                                                      Settings
                                                                                        .labels
                                                                                        .allPropertiesSelected
                                                                                    }
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </div>
                                                                        ) : (
                                                                          <div>
                                                                            {contextType.state.userArray.hotelsBasedOnFranchise.map(
                                                                              (
                                                                                data
                                                                              ) => {
                                                                                return (
                                                                                  <ListView
                                                                                    data={
                                                                                      data
                                                                                    }
                                                                                    handleChange={
                                                                                      contextType.handleChangeInput
                                                                                    }
                                                                                    type="franchiseProp"
                                                                                  />
                                                                                );
                                                                              }
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <b>
                                                          <label>
                                                            {
                                                              Settings.labels
                                                                .totalProperties
                                                            }
                                                          </label>
                                                          <label>
                                                            {
                                                              contextType.state
                                                                .user
                                                                .numFranchiseItem
                                                            }
                                                          </label>
                                                          <a
                                                            className={
                                                              styles.returnButton
                                                            }
                                                          >
                                                            <img
                                                              id="up-lsu-rtnbtn"
                                                              tabIndex={0}
                                                              src={
                                                                btnReturnUserList
                                                              }
                                                              className={
                                                                styles.borderZero
                                                              }
                                                              onClick={(e) =>
                                                                contextType.returnToMain(
                                                                  e
                                                                )
                                                              }
                                                              alt={
                                                                Settings.labels
                                                                  .returnAccessList
                                                              }
                                                            />
                                                          </a>
                                                        </b>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isAll ? (
                                              <td className={styles.WidthCls}>
                                                <a>
                                                  <img
                                                    id="up-lsu-updatebtn-upall"
                                                    tabIndex={0}
                                                    src={btnUpdate}
                                                    className={
                                                      styles.borderZero
                                                    }
                                                    alt={
                                                      Settings.labels
                                                        .hotellistAlt
                                                    }
                                                    onClick={(e) =>
                                                      contextType.updateallhotelbtn_onclick(
                                                        "input",
                                                        ""
                                                      )
                                                    }
                                                  />
                                                </a>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isAll ? (
                                              <td>
                                                <table
                                                  className={`${styles.menuWdth100_Height} ${styles.selectProp} ${styles.borderThin}`}
                                                >
                                                  <tbody>
                                                    <tr
                                                      className={
                                                        styles.selectPropTr
                                                      }
                                                    >
                                                      <td
                                                        className={
                                                          styles.widthTen
                                                        }
                                                      ></td>
                                                      <td
                                                        className={
                                                          styles.height100Top
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.gridNode
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              styles.gridHeader
                                                            }
                                                          >
                                                            <table
                                                              className={`${styles.gridOne} ${styles.zero_Height}`}
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <th
                                                                    className={
                                                                      styles.HeaderCls
                                                                    }
                                                                  >
                                                                    <b>
                                                                      {
                                                                        Settings
                                                                          .labels
                                                                          .selectProp
                                                                      }
                                                                    </b>
                                                                  </th>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                          <div
                                                            id={
                                                              Settings.ids
                                                                .PropertiesId
                                                            }
                                                            className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                          >
                                                            {contextType.state
                                                              ?.userArray
                                                              ?.hotelAllProperties
                                                              ?.length <= 0 ? (
                                                              <div
                                                                className={
                                                                  styles.gridRow
                                                                }
                                                              >
                                                                <table
                                                                  className={
                                                                    styles.gridRowTable
                                                                  }
                                                                  id="gridTableView"
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        className={
                                                                          styles.middle
                                                                        }
                                                                      >
                                                                        {
                                                                          Settings
                                                                            .labels
                                                                            .noDataFound
                                                                        }
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </div>
                                                            ) : (
                                                              <div>
                                                                {contextType
                                                                  ?.state
                                                                  ?.userArray
                                                                  ?.hotelAllProperties
                                                                  ?.length >
                                                                  0 && (
                                                                  <div
                                                                    className={
                                                                      styles.gridRow
                                                                    }
                                                                  >
                                                                    <table
                                                                      className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                                      id="gridTableView"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            className={
                                                                              styles.middle
                                                                            }
                                                                          >
                                                                            {
                                                                              Settings
                                                                                .labels
                                                                                .allPropertiesSelected
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </div>
                                                                )}
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isAll && (
                                              <td>
                                                <b>
                                                  <label>
                                                    {
                                                      Settings.labels
                                                        .totalProperties
                                                    }
                                                  </label>
                                                  <label>
                                                    {
                                                      contextType.state.user
                                                        .numAllPropItem
                                                    }
                                                  </label>
                                                  <a
                                                    className={
                                                      styles.returnButton
                                                    }
                                                  >
                                                    <img
                                                      id="up-lsu-rtnbtn"
                                                      tabIndex={0}
                                                      src={btnReturnUserList}
                                                      className={
                                                        styles.borderZero
                                                      }
                                                      onClick={(e) =>
                                                        contextType.returnToMain(
                                                          e
                                                        )
                                                      }
                                                      alt={
                                                        Settings.labels
                                                          .returnAccessList
                                                      }
                                                    />
                                                  </a>
                                                </b>
                                              </td>
                                            )}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  {contextType.state.isMFPSales ? (
                                    <tr>
                                      <td>
                                        <table className={styles.zero_Height}>
                                          <tbody>
                                            <tr>
                                              <td
                                                className={styles.nowrapStyle}
                                              >
                                                <b>
                                                  <label>
                                                    {
                                                      Settings.labels
                                                        .enhancedSalesContact
                                                    }
                                                  </label>
                                                </b>
                                              </td>
                                              <td>
                                                <CCheckbox
                                                  type={
                                                    Settings.inputType.checkbox
                                                  }
                                                  id={
                                                    contextType.state.user
                                                      .enhancedSalesContact
                                                  }
                                                  name={
                                                    contextType.state.user
                                                      .enhancedSalesContact
                                                  }
                                                  onChangeHandler={(e) =>
                                                    contextType.cbMAE_onclick(e)
                                                  }
                                                  checked={
                                                    contextType.state.user
                                                      .ismae == "Y"
                                                      ? true
                                                      : false
                                                  }
                                                ></CCheckbox>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className={styles.heightTen}>
                                                <>&nbsp;</>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  ) : (
                                    ""
                                  )}
                                </tbody>
                              </table>
                            </td>
                            {contextType.state.isProperties ? (
                              <td className={styles.spaceFour}>
                                <MarshaSearchFilters></MarshaSearchFilters>
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                        ) : (
                          ""
                        )}
                        <tr>
                          <td>
                            <>&nbsp;</>
                          </td>
                        </tr>
                        {contextType.state.isProperties ? (
                          <tr>
                            <td className={styles.spaceTwo}>
                              <CPagination
                                totalPages={contextType.totalSelPages}
                                context={contextType}
                                handlePaginationAPI={
                                  this.handlePaginationAPISelProp
                                }
                                pageNumber={contextType.selectPNumber}
                              />
                            </td>
                            <td className={styles.spaceThree}>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <CPagination
                                        totalPages={
                                          contextType.quickSelection
                                            ? 1
                                            : contextType.totalPages
                                        }
                                        context={contextType}
                                        handlePaginationAPI={
                                          this.handlePaginationAPI
                                        }
                                        pageNumber={
                                          contextType.availablePNumber
                                        }
                                      />
                                    </td>
                                    <td>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={(e) =>
                                          contextType.hotelsQuickSelect(true)
                                        }
                                      >
                                        {Settings.labels.quickSelect}
                                      </a>
                                    </td>
                                    <td>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={(e) =>
                                          contextType.hotelsSelectAll(e)
                                        }
                                      >
                                        {Settings.labels.selectAll}
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.header2}>
                                      <span>
                                        {" "}
                                        {sessionStorage.getItem(
                                          "LSquickSelectMessage"
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {contextType.state.isProperties ? (
                          <tr className={styles.top}>
                            <td>
                              <table
                                className={`${styles.menuWdth100_Height} ${styles.selectProp}`}
                              >
                                <tbody>
                                  <tr className={styles.selectPropTr}>
                                    <td className={styles.height100Top}>
                                      <div className={styles.gridNode}>
                                        <div className={styles.gridHeader}>
                                          <table
                                            className={`${styles.gridOne} ${styles.zero_Height}`}
                                          >
                                            <tbody>
                                              <tr>
                                                <th
                                                  className={styles.HeaderCls}
                                                >
                                                  <b>
                                                    {Settings.labels.selectProp}
                                                  </b>
                                                </th>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div
                                          id={Settings.ids.hotelListId}
                                          className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                        >
                                          {(contextType?.state?.userArray
                                            ?.hotelList &&
                                            contextType?.state?.userArray
                                              ?.hotelList?.length) <= 0 ? (
                                            <div className={styles.gridRow}>
                                              <table
                                                className={styles.gridRowTable}
                                                id="gridTableView"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={styles.middle}
                                                    >
                                                      {
                                                        Settings.labels
                                                          .noDataFound
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          ) : (
                                            <div>
                                              {contextType.state.isAllHotels &&
                                              contextType.state
                                                .totPropSelPageLen <= 0 ? (
                                                <div className={styles.gridRow}>
                                                  <table
                                                    className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                    id="gridTableView"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.middle
                                                          }
                                                        >
                                                          {
                                                            Settings.labels
                                                              .allPropertiesSelected
                                                          }
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              ) : (
                                                <div>
                                                  {contextType.state.userArray.hotelList.map(
                                                    (data) => {
                                                      return (
                                                        <ListView
                                                          data={data}
                                                          handleChange={
                                                            contextType.handleChangeInput
                                                          }
                                                          type="selectProp"
                                                        />
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td>
                              <table
                                className={`${styles.menuWdth100_Height} ${styles.selectProp}`}
                              >
                                <tbody>
                                  <tr className={styles.selectPropTr}>
                                    <td className={`${styles.spaceOne}`}></td>
                                    <td>
                                      <div className={styles.gridNode}>
                                        <div className={styles.gridHeader}>
                                          <table
                                            className={`${styles.gridOne} ${styles.zero_Height}`}
                                          >
                                            <tbody>
                                              <tr>
                                                <th
                                                  className={styles.HeaderCls}
                                                >
                                                  <b>
                                                    {Settings.labels.availProp}
                                                  </b>
                                                </th>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div
                                          id={Settings.ids.hotelListAllId}
                                          className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                        >
                                          {contextType?.state?.userArray
                                            ?.hotellistAll.length <= 0 ? (
                                            <div className={styles.gridRow}>
                                              <table
                                                className={styles.gridRowTable}
                                                id="gridTableView"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={styles.middle}
                                                    >
                                                      {
                                                        Settings.labels
                                                          .noDataFound
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          ) : (
                                            <div>
                                              {contextType.state.isAllHotels &&
                                              contextType.state
                                                .totPropPageLen == 0 ? (
                                                <div className={styles.gridRow}>
                                                  <table
                                                    className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                    id="gridTableView"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.middle
                                                          }
                                                        >
                                                          {
                                                            Settings.labels
                                                              .allPropertiesSelected
                                                          }
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              ) : (
                                                <div>
                                                  {contextType.state.userArray.hotellistAll.map(
                                                    (data) => {
                                                      return (
                                                        <ListView
                                                          data={data}
                                                          handleChange={
                                                            contextType.handleChangeInput
                                                          }
                                                          type="availProp"
                                                        />
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {contextType.state.isProperties ? (
                          <tr>
                            <td>
                              <table>
                                <tr>
                                  {contextType?.state?.isProperties &&
                                  contextType?.state?.userArray?.hotelList
                                    ?.length > 0 ? (
                                    <td className={styles.width87}>
                                      <a href="javascript:void(0);">
                                        <img
                                          src={btnDelete}
                                          className={styles.borderZero}
                                          onClick={(e) =>
                                            contextType.hotelsDeleteProp(e)
                                          }
                                        />
                                      </a>
                                    </td>
                                  ) : (
                                    <td className={styles.width87}>
                                      <>&nbsp;</>
                                    </td>
                                  )}
                                  <td className={styles.spaceFive}>
                                    <b>
                                      <label>
                                        {Settings.labels.totalProperties}
                                      </label>
                                    </b>
                                    <b>
                                      <label>
                                        {contextType.state.user.numHotelItems}
                                      </label>
                                    </b>
                                  </td>
                                  <td className={styles.widthTwenty}>
                                    <a>
                                      <img
                                        id="up-lsu-rtnbtn"
                                        tabIndex={0}
                                        src={btnReturnUserList}
                                        className={styles.borderZero}
                                        onClick={(e) =>
                                          contextType.returnToMain(e)
                                        }
                                        alt={Settings.labels.returnAccessList}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td className={styles.spaceSix}>
                              <table>
                                <tr>
                                  <td>
                                    <a>
                                      <img
                                        id="up-lsu-unselect-all"
                                        tabIndex={0}
                                        src={btnUnSelectAll}
                                        className={styles.borderZero}
                                        onClick={(e) =>
                                          contextType.hotelsUnSelectAll(e)
                                        }
                                        alt={Settings.labels.unselectAllProp}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <a>
                                      <img
                                        id="up-lsu-updatebtn-prop"
                                        tabIndex={0}
                                        src={btnUpdate}
                                        className={styles.borderZero}
                                        onClick={(e) => {
                                          contextType.hotelsUpdateProp(e),
                                            sessionStorage.setItem(
                                              "LSquickSelectMessage",
                                              ""
                                            );
                                        }}
                                        alt={Settings.labels.hotellistAlt}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <a>
                                      <img
                                        id="up-lsu-rtnbtn"
                                        tabIndex={0}
                                        src={btnReturnUserList}
                                        className={styles.borderZero}
                                        onClick={(e) =>
                                          contextType.returnToMain(e)
                                        }
                                        alt={Settings.labels.returnAccessList}
                                      />
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        <tr>
                          <td>
                            <input
                              id={contextType.state.user.regionFound}
                              name={contextType.state.user.regionFound}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.regionFound}
                            />
                            <input
                              id={contextType.state.user.brandFound}
                              name={contextType.state.user.brandFound}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.brandFound}
                            />
                            <input
                              id={contextType.state.user.franchFound}
                              name={contextType.state.user.franchFound}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.franchFound}
                            />
                            <input
                              id={contextType.state.user.numHotelItems}
                              name={contextType.state.user.numHotelItems}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numHotelItems}
                            />
                            <input
                              id={contextType.state.user.numRegionItems}
                              name={contextType.state.user.numRegionItems}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numRegionItems}
                            />
                            <input
                              id={contextType.state.user.numRegionItems}
                              name={contextType.state.user.numRegionItems}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numRegionItems}
                            />
                            <input
                              id={contextType.state.user.numBrandItems}
                              name={contextType.state.user.numBrandItems}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numBrandItems}
                            />
                            <input
                              id={contextType.state.user.numFranchiseItem}
                              name={contextType.state.user.numFranchiseItem}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numFranchiseItem}
                            />
                            <input
                              id={contextType.state.user.numAllPropItem}
                              name={contextType.state.user.numAllPropItem}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.numAllPropItem}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {!contextType.isLoaded && <CLoader></CLoader>}
                  </form>
                )}
              </React.Fragment>
            );
          }}
        </UserEditContext.Consumer>
      </UserEditContextProvider>
    );
  }
}
