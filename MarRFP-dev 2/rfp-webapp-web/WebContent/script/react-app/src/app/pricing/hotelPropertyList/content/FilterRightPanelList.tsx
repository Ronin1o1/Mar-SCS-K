import React, { useContext, useEffect, useState } from "react";
import styles from "./PropertyList.css";
import PropertyListContext from "../context/PropertyListContext";
import { CNoDataFound } from "../../../common/components/CNoDataFound";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";

export function FilterRightPanelList(props: any) {
  const [panelList, setPanelList] = useState([]);
  const [checkInitialLoad, setCheckInitialLoad] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const contexts = useContext(PropertyListContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();

  useEffect(() => {
    const gridScrollBody = document.getElementById("gridView");
    gridScrollBody.scrollTop = 0;
    setPanelList(props.panelData);
  }, [props.panelData, panelList]);

  // const handleRowSelection = (index: number) => {
  //   setActiveRow(index);
  // };

  const handleRowSelection = (index: number, hotelName, mashaCode) => {
    //const period = contexts.storeRequestPayload?.strFilterValues?.year;
    //window.location.replace(`/app/pricing/hotelPricing#/PriceContact?&MarshaCode=${mashaCode}&Period=${period}&HotelName=${hotelName}`);
    const elements = document.querySelectorAll("#gridTableView tr");
    const highlight = "_3iyxNCHPnMdk34KcXaNLaw==";

    elements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
    });

    setActiveRow(index);
    appContext.setactiveRowPortfolio(index);
    appContext.setPrevRowPortfolio(index);
    appContext.setPrevGridRowIndexTableOne(index);
    appContext.setpgoosGridRowHighlight(true);
    appContext.setpgoosFilterRowHighlight(false);
  };

  const handleDisplayPanelData = () => {
    if (!Array.isArray(panelList)) {
      return [];
    }
    return (
      Array.isArray(panelList) &&
      panelList?.map((item, index) => {
        const period = contexts.storeRequestPayload?.strFilterValues?.year;
        const baseUrl = window.location.origin;
        const activeIndex = appContext?.activeRowPortfolio;
        return (
          <a
            key={index}
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() => {
              window.opener.location.href = `${baseUrl}${process.env.APPLICATION_CONTEXT}/pricinghotelselect/PriceContact?&MarshaCode=${item.marshaCode}&Period=${period}&HotelName=${item.hotelName}`;
            }}
          >
            <tr
              key={index}
              className={`${index % 2 ? styles.gridRow : styles.gridRowOdd} ${
                styles.gridRowTable
              } ${
                !appContext.pgoosFilterRowHighlight &&
                appContext.pgoosGridRowHighlight &&
                index === parseInt(activeIndex)
                  ? styles.gridRowbarSelected
                  : styles.rightPanelRow
              } `}
              id="panelCurrentRow"
              style={{ width: 620, height: 21 }}
              onClick={() =>
                handleRowSelection(index, item.hotelName, item.marshaCode)
              }
            >
              <td
                key={index}
                style={{ width: "60px", minWidth: "60px" }}
                className={styles.gridCell}
              >
                {item.marshaCode}
              </td>
              <td
                style={{ width: "240px", minWidth: "240px" }}
                className={styles.gridCell}
              >
                {item.hotelName}
              </td>
              <td
                style={{
                  width: "110px",
                  minWidth: "110px",
                  wordWrap: "break-word",
                }}
                className={styles.gridCell}
              >
                {item.city}
              </td>
              <td
                style={{ width: "50px", minWidth: "50px" }}
                className={styles.gridCell}
              >
                {item.state}
              </td>
              <td
                style={{ width: "50px", minWidth: "50px" }}
                className={styles.gridCell}
              >
                {item.country}
              </td>
              <td
                style={{ width: "80px", minWidth: "80px" }}
                className={styles.gridCell}
              >
                {item.futureopening}
              </td>
            </tr>
          </a>
          // </div>
        );
      })
    );
  };

  return (
    <div
      style={{
        height: "calc(100vh - 131px)",
        overflowY: "auto",
      }}
      id="gridView"
      className={styles.gridView}
    >
      {panelList?.length > 0 ? (
        <table
          style={{ height: "21px" }}
          className={`${styles.gridRowTable} ${styles.zeroHeight}`}
          id="gridTableView"
        >
          <tbody>{handleDisplayPanelData()}</tbody>
        </table>
      ) : (
        contexts.checkInitialLoad && <CNoDataFound />
      )}
    </div>
  );
}
