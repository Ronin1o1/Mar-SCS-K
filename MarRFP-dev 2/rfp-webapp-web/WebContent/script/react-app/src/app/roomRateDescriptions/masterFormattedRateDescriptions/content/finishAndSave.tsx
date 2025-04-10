import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";

import NextBtnImg from "../../../../app/common/assets/img/button/btnNext.gif";

import styles from "./finishAndSave.css";
import MasterFormattedTabs from "./masterFormattedTabs";
import API from "../service/api";
import Settings from "../settings/settings";

let contextType = null;
let menuData;

const finishAndSave = (props) => {
  const history = useHistory();
  const screenId = props.location?.state?.headerName;
  useEffect(() => {
    const queryParam = {
      productCode: props.location.state.productCode
        ? props.location.state.productCode
        : contextType.createProductState.productCode,
      level: props.location.state.entryLevel
        ? props.location.state.entryLevel
        : contextType.createProductState.entryLevel,
      screenid: screenId,
    };
    // API.getProductDetails(queryParam).then((data) => {
    //   menuData = data.rateProductDataView.rateProductMenu;
    //   contextType.setCreateProductData(props, menuData, data);
    // });
  }, []);

  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyRateDescriptionContext) => {
          contextType = masterModifyRateDescriptionContext;
          return (
            <div>
              <React.Fragment>
                <div>
                  <MasterFormattedTabs
                    productCode={
                      contextType.createProductState.productCode
                        ? contextType.createProductState.productCode
                        : props.location.state.productCode
                    }
                    productName={
                      contextType.createProductState.productName
                        ? contextType.createProductState.productName
                        : props.location.state.productName
                    }
                    menuData={contextType.createProductState.menuData}
                  />
                  <form id="thisForm" name="thisForm">
                    <div>
                      <table>
                        <tbody>
                          <tr className={styles.lineHeight}>
                            <td>
                              <b className={styles.boldHeader}>
                                {Settings.labels.pageTitleFinish}
                                {": "}
                                {contextType.createProductState.productCode
                                  ? contextType.createProductState.productCode
                                  : props.location.state.productCode}
                                {"-"}
                                {contextType.createProductState.productName
                                  ? contextType.createProductState.productName
                                  : props.location.state.productName}
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={styles.leftDiv}>
                        <img src={NextBtnImg} alt={"nextbtn"} />
                      </div>
                    </div>
                    <div className={styles.horizontalLine}></div>
                    <div>
                      <table className={styles.tableCls}>
                        <tbody>
                          <tr>
                            <td valign="top">
                              <form id="thisForm" name="thisForm" method="post">
                                <table
                                  width="600"
                                  align="left"
                                  className={styles.zeroHeight}
                                >
                                  <tbody>
                                    <tr>
                                      <td className={styles.width}>&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.header}
                                        align="center"
                                      >
                                        {Settings.labels.successMessage}
                                        {contextType.createProductState
                                          .productCode
                                          ? contextType.createProductState
                                              .productCode
                                          : props.location.state.productCode}
                                        -
                                        {contextType.createProductState
                                          .productName
                                          ? contextType.createProductState
                                              .productName
                                          : props.location.state.productName}
                                        .
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </React.Fragment>
            </div>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};

export default finishAndSave;
