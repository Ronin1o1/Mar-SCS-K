import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../routing/Layout";
import Styles from "../../../../../common/assets/css/index.css";
import btnErrorReview from "../../../../../common/assets/img/button/btnErrorReview.gif";
import Settings from "../static/Settings";
import API from "../service/API";

export function FinishAndSave() {
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get(Settings.MarshaCode);
  const hotelName = new URLSearchParams(urlParms).get(Settings.HotelName);
  const period = new URLSearchParams(urlParms).get(Settings.Period);
  const hotelrfpid = new URLSearchParams(urlParms).get(Settings.Hotelrfpid);

  const [hotelRFPFinishView, setHotelRFPFinishView] = useState({
    duedateList: [],
    selectedpricingperiodid: "",
    hotelRFPFinishList: [],
  });

  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const [screenNames, setScreenNames] = useState([]);

  const params = {
    marshaCode: marshaCode,
    hotelName: hotelName,
    hotelrfpid: hotelrfpid,
    period: period,
  };

  useEffect(() => {
    API.getHotelRFPFinish(params).then((hotelFinishData) => {
      buildHotelFinishDetails(hotelFinishData);
      const periodid = hotelRFPFinishView.selectedpricingperiodid;
      getScreensToBeCompletedFor(periodid);
    });
  }, []);

  function buildHotelFinishDetails(hotelFinishData) {
    const finishView = hotelFinishData.hotelRFPFinishView;
    setHotelRFPFinishView(finishView);
    setSelectedPeriodId(finishView.selectedpricingperiodid);
  }

  function setSelectedPricingPeriodId(e) {
    setSelectedPeriodId(e.target.value);
  }

  function getScreensToBeCompletedFor(periodid) {
    let screens = [];
    const apiParams = {
      pricingperiodid: periodid,
      hotelrfpid: hotelrfpid,
      marshaCode: marshaCode,
      period: period,
    };
    API.getHotelRFPFinishScreens(apiParams).then((hotelFinishData) => {
      screens = hotelFinishData.hotelRFPFinishView.hotelRFPFinishList;
      setScreenNames(screens);
    });
  }

  function btnErrorReviewClicked() {
    getScreensToBeCompletedFor(selectedPeriodId);
  }

  return (
    <>
      <Layout>
        <table width="100%" cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr>
              <td className={Styles.instructions}>
                Select the Pricing Due Date to review your Account Pricing then
                press the Error Review button.
              </td>
            </tr>
            <tr>
              <td className={Styles.field_Name}>
                <select
                  id="pricingperiodid"
                  name="pricingperiodid"
                  onChange={(e) => setSelectedPricingPeriodId(e)}
                >
                  <option value=" "> </option>
                  {hotelRFPFinishView.duedateList.map((duedateRecord) => {
                    return (
                      <option
                        value={duedateRecord.pricingperiodid}
                        selected={
                          hotelRFPFinishView.selectedpricingperiodid ===
                          duedateRecord.pricingperiodid
                            ? true
                            : false
                        }
                      >
                        {duedateRecord.longDueDate}
                      </option>
                    );
                  })}
                  <option value={"0"}>All Due Dates</option>
                </select>
                <img
                  src={btnErrorReview}
                  onClick={btnErrorReviewClicked}
                  style={{ marginLeft: "3.5px" }}
                />
              </td>
            </tr>
            {screenNames.length > 0 ? (
              <>
                <tr>
                  <td style={{ height: 15 }} />
                </tr>
                <tr>
                  <td className={Styles.InstructionHeader}>
                    Error Review for{" "}
                  </td>
                </tr>
                <tr>
                  <td className={Styles.instructions}>
                    You have not successfully completed your data. Listed below
                    are the screens/accounts that need to be reviewed or
                    completed.
                  </td>
                </tr>
                {screenNames.map((screen) => {
                  return (
                    <tr>
                      <td className={Styles.field_Name}>{screen.screenname}</td>
                    </tr>
                  );
                })}
                <tr style={{ height: 5 }}>
                  <td />
                </tr>
                <tr>
                  <td style={{ height: 5 }} />
                </tr>
              </>
            ) : (
              <tr>
                <td className="instructions">
                  <h3>
                    Congratulations! Your Accounts Due for have been
                    successfully priced and submitted.
                  </h3>
                </td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="hidden"
                  id="hotelrfpid"
                  name="hotelrfpid"
                  defaultValue={326382}
                />
                <input
                  type="hidden"
                  id="marshaCode"
                  name="marshaCode"
                  defaultValue="AAESI"
                />
                <input
                  type="hidden"
                  id="period"
                  name="period"
                  defaultValue={2022}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Layout>
    </>
  );
}
