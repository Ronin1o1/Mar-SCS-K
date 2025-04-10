import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Go from "../../../common/assets/img/go.gif";
import API from "../service/API";
import Settings from "../static/Settings";
import BrandFormattedRateContext from "../context/BrandFormattedRateContext";
import { Layout } from "../routing/Layout";
import styles from "./BrandSelection.css";

let contextType = null;

const BrandSelection = (): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    contextType.clearData();
    API.getBrands().then((res) => {
      contextType.setBrandList(res);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    contextType?.state?.selectedYear,
    contextType?.state?.selectedmarshacode,
    contextType?.state?.inputmarshacode,
  ]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      goHandler();
    }
  };

  const goHandler = () => {
    if (contextType.brandCode || contextType.brandCode != "") {
      history.push({
        pathname: `${Settings.routingUrl.parentRoute}${Settings.routingUrl.modifyRateDesc}`,
        search: `brandCode= ${contextType.brandCode} &brandName= ${contextType.brandName}`,
      });
    } else {
      alert(Settings.alerts.selectBrand);
    }
  };

  return (
    <Layout>
      <BrandFormattedRateContext.Consumer>
        {(brandFormattedRateContext) => {
          contextType = brandFormattedRateContext;
          return (
            <div>
              {contextType.brandList?.length > 0 && (
                <table className={styles.table}>
                  <tbody className={styles.tableBody}>
                    <tr className={styles.blankRow}>
                      <td></td>
                    </tr>
                    <tr>
                      <td className={styles.fieldName}>
                        {Settings.labels.selectBrand}
                      </td>
                      <td className={styles.blankColumn}></td>
                      <td align="left">
                        <select
                          id="brandCode"
                          size={1}
                          onChange={(e) => contextType.updateBrand(e)}
                          value={contextType.brandCode?.toUpperCase()}
                        >
                          <option>{Settings.labels.selectBrandOption}</option>
                          {contextType.brandList?.map((data) => (
                            <option key={data.brandCode} value={data.brandCode}>
                              {data.brandName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={styles.blankSelectColumn}></td>
                      <td>
                        <img
                          className={styles.go}
                          src={Go}
                          onClick={goHandler}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          );
        }}
      </BrandFormattedRateContext.Consumer>
    </Layout>
  );
};

export default BrandSelection;
