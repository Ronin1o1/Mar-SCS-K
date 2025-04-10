import React, { useEffect } from "react";
import CenterallyPricedAccount, {
  CenterallyPricedContextProvider,
} from "../../context/CPACTabsContext";
import API from "../../service/API";
import styles from "./CPACTabs.css";
import Settings from "../../static/Settings";
let contextType = null;

function AnticipatedAcountTab(params) {
  const hotelDetails = params.data;
  useEffect(() => {
    contextType.state.showTableLoader = true;
    const params = {
      marshaCode: hotelDetails.marshaCode,
      period: hotelDetails.period,
      "dojo.preventCache": "1628588179409",
    };
    API.getAnticipatedAccount(params)
      .then((data) => {
        contextType.setAntipatedAcountList(data["accountNotViewable"]);
      })
      .catch((error) => {
        contextType.state.showTableLoader = false;
      });
  }, []);

  return (
    <CenterallyPricedContextProvider>
      <CenterallyPricedAccount.Consumer>
        {(CenterallyPricedAccount) => {
          contextType = CenterallyPricedAccount;
          return (
            <div>
              {!contextType.state.showTableLoader ? (
                Settings.pleaseWait
              ) : (
                <div className={styles.accountBlock}>
                  <table className={styles.accountTableHeader}>
                    <thead style={{ borderBottom: "1px solid black" }}>
                      <tr>
                        <b>
                          <td style={{ width: "150px" }} className="Field_Name">
                            {Settings.anticipatedAccountTab.accountName}
                          </td>
                          <td style={{ width: "120px" }}>
                            {Settings.anticipatedAccountTab.accountSegment}
                          </td>
                          <td style={{ width: "50px" }}>
                            {Settings.anticipatedAccountTab.GPP}
                          </td>
                          <td style={{ width: "125px" }}>
                            {Settings.anticipatedAccountTab.globalTeamLeader}
                          </td>
                          <td style={{ width: "225px" }}>
                            {Settings.anticipatedAccountTab.emailAddress}
                          </td>
                        </b>
                      </tr>
                    </thead>
                  </table>
                  <div className={styles.accountTableBlock}>
                    {contextType.state.anticipatedListData.anticipatedList.map(
                      (data, i) => {
                        return (
                          <div key={i}>
                            <table style={{ width: "720px" }}>
                              <tbody>
                                <tr>
                                  <td className="Filter_Value" width="150px">
                                    {data.accountname}
                                  </td>
                                  <td className="Filter_Value" width="120px">
                                    {data.accounttypedescription}
                                  </td>
                                  <td className="Filter_Value" width="50px">
                                    {data.gppHeader}
                                  </td>
                                  <td className="Filter_Value" width="125px">
                                    {data.globalSalesLeader}
                                  </td>
                                  <td className="Filter_Value" width="225px">
                                    {data.contactemail}
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

export default AnticipatedAcountTab;
