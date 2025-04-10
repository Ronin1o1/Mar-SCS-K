import React, { useEffect } from "react";
import CenterallyPricedAccount, {
  CenterallyPricedContextProvider,
} from "../../context/CPACTabsContext";
import API from "../../service/API";
import Settings from "../../static/Settings";
import styles from "./CPACTabs.css";

let contextType = null;

function AnticipatedoffAcountTab(params) {
  const hotelDetails = params.data;
  useEffect(() => {
    contextType.state.showAccountLoader = true;

    const parms = {
      marshaCode: hotelDetails.marshaCode,
      period: hotelDetails.period - 1,
      accountpricingtype: "C",
      "dojo.preventCache": "1628588206644",
    };
    API.getAccountOffCycle(parms).then(
      (response) => {
        if (response) {
          const data = response["accountNotViewable"];
          data.map((res) => {
            res.contractenddate = new Date(
              res.contractenddate
            ).toLocaleDateString("en-US");
          });
          contextType.setAccountOffList(response["accountNotViewable"]);
        }
      },
      (error) => {
        contextType.state.showTableLoader = false;
      }
    );
  }, []);

  return (
    <CenterallyPricedContextProvider>
      <CenterallyPricedAccount.Consumer>
        {(CenterallyPricedAccount) => {
          contextType = CenterallyPricedAccount;
          return (
            <div className={styles.offAccountblock}>
              {!contextType.state.showAccountLoader ? (
                Settings.pleaseWait
              ) : (
                <div>
                  <span>
                    <b>{Settings.offAccountHeader}</b>
                  </span>

                  <table className={styles.offTableHeader}>
                    <thead>
                      <tr>
                        <td style={{ width: "200px" }} className="Field_Name">
                          <b>{Settings.anticipatedAccountTab.accountName}</b>
                        </td>
                        <td style={{ width: "100px" }} className="Field_Name">
                          <b>
                            {Settings.anticipatedAccountTab.contractEndDate}
                          </b>
                        </td>
                      </tr>
                    </thead>
                  </table>
                  <div className={styles.offTableContentBlock}>
                    {contextType.state.accountOffData.accountList.map(
                      (data, i) => {
                        return (
                          <div key={i}>
                            <table style={{ width: "350px" }}>
                              <tbody>
                                {" "}
                                <tr>
                                  <td className="Filter_Value" width="200px">
                                    {data.accountname}
                                  </td>
                                  <td className="Filter_Value" width="100px">
                                    {data.contractenddate}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </CenterallyPricedAccount.Consumer>
    </CenterallyPricedContextProvider>
  );
}

export default AnticipatedoffAcountTab;
