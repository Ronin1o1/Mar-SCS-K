/* eslint-disable react/jsx-key */
import React, { Component, Suspense } from "react";
import UserEditContext, {
  UserEditContextProvider,
} from "../context/UserEditContext";
import Settings from "../static/Settings";
import APIEdit from "../service/APIEdit";
import styles from "../content/UserEdit.css";
import { MarshaSearchFilters } from "./MarshaSearchFilters";
import { CPagination } from "../../../../common/components/CPagination";
import { CLoader } from "../../../../common/components/CLoader";

import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnCopy from "../../../../common/assets/img/button/btnCopy.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnDelete from "../../../../common/assets/img/button/btnDelete.gif";
import btnReturnUserList from "../../../../common/assets/img/button/btnReturnUserList.gif";
import btnUnSelectAll from "../../../../common/assets/img/button/btnUnSelectAll.gif";
import CCheckbox from "../../../../common/components/CCheckbox";
import CRadio from "../../../../common/components/CRadio";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import QuickSelect from "../../../../shared/components/quickSelect";
import CopyGridContent from "./CopyGridContent";
import AvailableProperties from "./AvailableProperties";
import RegionBrandFranchise from "./RegionBrandFranchise";

let contextType = null;
let userDetailsParam = {
  userid: "",
  role: "",
};
export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    userDetailsParam = {
      userid: props.location.state.cn_userid,
      role: "MFPUSER",
    };
  }

  componentDidMount() {
    contextType.setLoader(true);
    sessionStorage.setItem("quickSelectMessage", "");
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
      if (focusedElem.id && focusedElem.id == "up-hu-unselect-all") {
        contextType.hotelsUnSelectAll();
      } else if (focusedElem.id && focusedElem.id.includes("up-hu-rtnbtn")) {
        contextType.returnToMain();
      } else if (focusedElem.id && focusedElem.id == "up-hu-updatebtn-prop") {
        contextType.hotelsUpdateProp();
      } else if (focusedElem.id && focusedElem.id == "up-hu-updatebtn-rgn") {
        contextType.updateRegion("input", "");
      } else if (focusedElem.id && focusedElem.id == "up-hu-updatebtn-brand") {
        contextType.updateBrand("input", "");
      } else if (focusedElem.id && focusedElem.id == "up-hu-updatebtn-franch") {
        contextType.updateFranch("input", "");
      } else if (focusedElem.id && focusedElem.id == "up-hu-updatebtn-upall") {
        contextType.updateallhotelbtn_onclick("input", "");
      }
    }
  }

  handlePaginationAPI(pageNumber: number) {
    contextType.setAvailablePNumber(pageNumber);
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.availPropText);
    sessionStorage.setItem("quickSelectMessage", "");
  }

  handlePaginationAPISelProp(pageNumber: number) {
    contextType.setSelectPNumber(pageNumber);
    contextType.setPNumber(pageNumber);
    contextType.setSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber, Settings.labels.selectPropText);
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
                      yPosition={-100}
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
                      xPosition={-200}
                      yPosition={-258}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <CopyGridContent data={userDetailsParam} />
                      </Suspense>
                    </CModal>
                    <table
                      className={`${styles.menuWdth100_Height} ${styles.usereditinhotel}`}
                    >
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
                            {contextType.state.isSales ? (
                              <label className={styles.labelText}>
                                {" "}
                                {contextType.state.user.companyname}
                              </label>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table className={`${styles.fullWidth}`}>
                              <tr
                                className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                              >
                                <td
                                  height={2}
                                  className={styles.heightTop}
                                ></td>
                              </tr>
                            </table>
                          </td>
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
                        <tr>
                          <td>
                            <table className={`${styles.fullWidth}`}>
                              <tr
                                className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                              >
                                <td
                                  height={1}
                                  className={styles.heightTopHalf}
                                ></td>
                              </tr>
                            </table>
                          </td>
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
                                                className={`${styles.zero_Height} ${styles.checkboxissue}`}
                                              >
                                                <tbody>
                                                  {contextType.state
                                                    .isMFPUser ? (
                                                    <>
                                                      <>&nbsp;</>
                                                      <tr>
                                                        <td
                                                          className={` ${styles.paddingClsOne} ${styles.checkboxproperty}`}
                                                        >
                                                          <span>
                                                            <b>
                                                              {
                                                                Settings.labels
                                                                  .enhancedReporting
                                                              }{" "}
                                                            </b>
                                                          </span>
                                                          <CCheckbox
                                                            type={
                                                              Settings.inputType
                                                                .checkbox
                                                            }
                                                            id={
                                                              contextType?.state
                                                                ?.user
                                                                ?.enhancedReportingChk
                                                            }
                                                            name={
                                                              contextType?.state
                                                                ?.user
                                                                ?.enhancedReportingChk
                                                            }
                                                            onChangeHandler={(
                                                              e
                                                            ) =>
                                                              contextType.setEnhancedReporting(
                                                                e
                                                              )
                                                            }
                                                            checked={
                                                              contextType?.state
                                                                ?.user
                                                                ?.enhancedReportingChk ==
                                                              "Y"
                                                                ? true
                                                                : false
                                                            }
                                                          ></CCheckbox>
                                                        </td>
                                                      </tr>
                                                    </>
                                                  ) : (
                                                    <>&nbsp;</>
                                                  )}
                                                  <tr>
                                                    <td
                                                      className={` ${styles.paddingClsOne}`}
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
                                              <RegionBrandFranchise
                                                title={
                                                  Settings.labels.selectRegion
                                                }
                                                allData={
                                                  contextType.state.userArray
                                                    .regions
                                                }
                                                hotellistAll={
                                                  contextType.state.userArray
                                                    .hotelBasedRegion
                                                }
                                                handleChange={
                                                  contextType.handleChangeInput
                                                }
                                                imageId="up-hu-updatebtn-rgn"
                                                src={btnUpdate}
                                                handleImageClick={(e) =>
                                                  contextType.updateRegion(
                                                    "input",
                                                    ""
                                                  )
                                                }
                                                totalPages={
                                                  contextType.state
                                                    .totPropSelPageLen
                                                }
                                                context={contextType}
                                                handlePaginationAPI={
                                                  this.handlePaginationAPIRegion
                                                }
                                                handleChangeInput={
                                                  contextType.handleChangeInput
                                                }
                                                type="regionProp"
                                                id="gridTableViewRegionProp"
                                                TotalRecords={
                                                  contextType.state.user
                                                    .numRegionItems
                                                }
                                                ReturnToUserListButtonid="up-hu-rtnbtn1"
                                                ReturnToUserListButtonsrc={
                                                  btnReturnUserList
                                                }
                                                ReturnToUserListButtononClick={(
                                                  e
                                                ) =>
                                                  contextType.returnToMain(e)
                                                }
                                              ></RegionBrandFranchise>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isBrand ? (
                                              <RegionBrandFranchise
                                                title={
                                                  Settings.labels.selectBrand
                                                }
                                                allData={
                                                  contextType.state.userArray
                                                    .hotelAffiliations
                                                }
                                                handleChange={
                                                  contextType.handleChangeInput
                                                }
                                                imageId="up-hu-updatebtn-brand"
                                                src={btnUpdate}
                                                handleImageClick={(e) =>
                                                  contextType.updateBrand(
                                                    "input",
                                                    ""
                                                  )
                                                }
                                                totalPages={
                                                  contextType.state
                                                    .totPropSelPageLen
                                                }
                                                context={contextType}
                                                handlePaginationAPI={
                                                  this.handlePaginationAPIBrand
                                                }
                                                handleChangeInput={
                                                  contextType.handleChangeInput
                                                }
                                                type="brandProp"
                                                id="gridTableViewbrandProp"
                                                TotalRecords={
                                                  contextType.state.user
                                                    .numBrandItems
                                                }
                                                ReturnToUserListButtonid="up-hu-rtnbtn2"
                                                ReturnToUserListButtonsrc={
                                                  btnReturnUserList
                                                }
                                                ReturnToUserListButtononClick={(
                                                  e
                                                ) =>
                                                  contextType.returnToMain(e)
                                                }
                                                hotellistAll={
                                                  contextType.state.userArray
                                                    .hotelBasedOnBrand
                                                }
                                              ></RegionBrandFranchise>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isFranchise ? (
                                              <RegionBrandFranchise
                                                title={
                                                  Settings.labels
                                                    .selectFranchise
                                                }
                                                allData={
                                                  contextType.state.userArray
                                                    .franchiseList
                                                }
                                                handleChange={
                                                  contextType.handleChangeInput
                                                }
                                                imageId="up-hu-updatebtn-franch"
                                                src={btnUpdate}
                                                handleImageClick={(e) =>
                                                  contextType.updateFranch(
                                                    "input",
                                                    ""
                                                  )
                                                }
                                                totalPages={
                                                  contextType.state
                                                    .totPropSelPageLen
                                                }
                                                context={contextType}
                                                handlePaginationAPI={
                                                  this
                                                    .handlePaginationAPIFranchise
                                                }
                                                handleChangeInput={
                                                  contextType.handleChangeInput
                                                }
                                                type="franchiseProp"
                                                id="gridTableViewfranchiseProp"
                                                TotalRecords={
                                                  contextType.state.user
                                                    .numFranchiseItem
                                                }
                                                ReturnToUserListButtonid="up-hu-rtnbtn3"
                                                ReturnToUserListButtonsrc={
                                                  btnReturnUserList
                                                }
                                                ReturnToUserListButtononClick={(
                                                  e
                                                ) =>
                                                  contextType.returnToMain(e)
                                                }
                                                hotellistAll={
                                                  contextType.state.userArray
                                                    .hotelsBasedOnFranchise
                                                }
                                              ></RegionBrandFranchise>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            {contextType.state.isAll ? (
                                              <td className={styles.WidthCls}>
                                                <a>
                                                  <img
                                                    id="up-hu-updatebtn-upall"
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
                                                            className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                          >
                                                            {contextType.state
                                                              .userArray
                                                              .hotelAllProperties
                                                              .length <= 0 ? (
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
                                                                  .state
                                                                  .userArray
                                                                  .hotelAllProperties
                                                                  .length >
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
                                                <table>
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.totalProperties
                                                        }
                                                      >
                                                        <p
                                                          className={
                                                            styles.totalPropertiesLabel
                                                          }
                                                        >
                                                          <b>
                                                            {Settings.labels
                                                              .totalProperties +
                                                              " " +
                                                              contextType?.state
                                                                ?.user
                                                                ?.numAllPropItem}
                                                          </b>
                                                        </p>
                                                      </td>
                                                      <td>
                                                        <a id="backtouserlist">
                                                          <img
                                                            id="up-hu-rtnbtn4"
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
                                                          />{" "}
                                                        </a>{" "}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
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
                              <td>
                                <MarshaSearchFilters></MarshaSearchFilters>
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                        ) : (
                          ""
                        )}
                        <tr className={styles.width10}></tr>
                        {contextType.state.isProperties ? (
                          <tr>
                            <td className={styles.paddingLeft}>
                              <CPagination
                                totalPages={contextType.totalSelPages}
                                context={contextType}
                                handlePaginationAPI={
                                  this.handlePaginationAPISelProp
                                }
                                fontBold={"bold"}
                                pageNumber={contextType.selectPNumber}
                              />
                            </td>
                            <td>
                              <table>
                                <tbody>
                                  <tr>
                                    <td className={styles.paddingLeft}>
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
                                        fontBold={"bold"}
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
                                        className={styles.fontBold}
                                      >
                                        {Settings.labels.quickSelect}
                                      </a>
                                    </td>
                                    <td>
                                      <>&nbsp;</>
                                    </td>
                                    <td>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={(e) =>
                                          contextType.hotelsSelectAll(e)
                                        }
                                        className={styles.fontBold}
                                      >
                                        {Settings.labels.selectAll}
                                      </a>
                                    </td>
                                  </tr>{" "}
                                  <tr>
                                    <td className={styles.header2}>
                                      {sessionStorage.getItem(
                                        "quickSelectMessage"
                                      )}
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
                              <AvailableProperties
                                hotellistAll={
                                  contextType.state.userArray.hotelList
                                }
                                isAllHotels={contextType.state.isAllHotels}
                                totPropPageLen={
                                  contextType.state.totPropSelPageLen
                                }
                                handleChange={contextType.handleChangeInput}
                                heading={Settings.labels.selectProp}
                                type="selectProp"
                                resetScroll={false}
                                context={contextType}
                                id="gridTableViewSelect"
                              ></AvailableProperties>
                            </td>
                            <td>
                              <AvailableProperties
                                hotellistAll={
                                  contextType.state.userArray.hotellistAll
                                }
                                isAllHotels={contextType.state.isAllHotels}
                                totPropPageLen={
                                  contextType.state.totPropPageLen
                                }
                                handleChange={contextType.handleChangeInput}
                                heading={Settings.labels.availProp}
                                type="availProp"
                                resetScroll={true}
                                context={contextType}
                                id="gridTableViewAvail"
                              ></AvailableProperties>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {contextType.state.isProperties ? (
                          <tr>
                            <td className={styles.paddingLeft2}>
                              <table>
                                <tr>
                                  {contextType.state.isProperties &&
                                  contextType.state.userArray.hotelList.length >
                                    0 ? (
                                    <td className={styles.deleteBtn}>
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
                                    <td className={styles.emptybtn}>
                                      <>&nbsp;</>
                                    </td>
                                  )}
                                  <td className={styles.totalPropCls}>
                                    <b>
                                      <label>
                                        {Settings.labels.totalProperties}
                                        {contextType.state.user.numHotelItems}
                                      </label>
                                    </b>
                                  </td>
                                  <td className={styles.widthTwenty}>
                                    <a>
                                      <img
                                        id="up-hu-rtnbtn5"
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
                            <td>
                              <table>
                                <tr>
                                  <td>
                                    <a>
                                      <img
                                        id="up-hu-unselect-all"
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
                                        id="up-hu-updatebtn-prop"
                                        tabIndex={0}
                                        src={btnUpdate}
                                        className={styles.borderZero}
                                        onClick={(e) => {
                                          contextType.hotelsUpdateProp(e),
                                            sessionStorage.setItem(
                                              "quickSelectMessage",
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
                                        id="up-hu-rtnbtn6"
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
