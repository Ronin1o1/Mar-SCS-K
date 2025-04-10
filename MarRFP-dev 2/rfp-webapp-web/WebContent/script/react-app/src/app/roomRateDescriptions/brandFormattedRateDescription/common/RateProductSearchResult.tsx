import React, { FC } from "react";
import CDataTable from "../../../common/components/CDataTable";
import btnPrevious from "../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../common/assets/img/button/btnNext.gif";
import Settings from "../static/Settings";
import styles from "./RateProductSearchResult.css";

interface IRateProductSearchResult {
  rateProductSearch: any;
  columns: any;
  previous_onClick: () => void;
  next_onClick: () => void;
  showTable: boolean;
  prevFlag: boolean;
  nextFlag: boolean;
  noProductsMessage: string;
}
const RateProductSearchResult: FC<IRateProductSearchResult> = (
  props
): JSX.Element => {
  return (
    <>
      <table className={styles.mainTableFullHeight}>
        <tr>
          <td
            className={`${styles.field_Name} ${styles.alignTop} ${styles.boldText}`}
          >
            {Settings.labels.productsTitle}
          </td>
          <td style={{ width: "10px" }}></td>
        </tr>
        <tr>
          <td
            className={`${styles.alignTop} ${styles.height_100} ${styles.gridRowInlBlock}`}
          >
            <>
              <div className={props.showTable ? "" : styles.hiddenLabel}>
                <CDataTable
                  id="products"
                  columns={props.columns}
                  value={props.rateProductSearch.productList}
                  scrollHeight={
                    props.rateProductSearch.searchType == "2"
                      ? "317px"
                      : "calc(100vh - 315px)"
                  }
                  width="316px"
                  height={
                    props.rateProductSearch.searchType == "2"
                      ? "349px"
                      : "calc(100vh - 279px)"
                  }
                  emptyMessage={props.noProductsMessage}
                />
              </div>
              <style>{`
                .p-datatable-scrollable-body{
                  overflow-x: hidden !important;
                }
                .p-datatable-tbody tr td {
                  height: 14px !important;
                  padding: 0 !important;
                  white-space: pre-line;
                }
                .p-datatable-thead th{
                  line-height:31px;
                }
              `}</style>
            </>
          </td>
        </tr>
        <tr>
          <td align="center">
            <table className={`${styles.mainTable} ${styles.alignBottom}`}>
              <tr>
                <td>
                  {props.prevFlag && (
                    <div
                      id="previousBtn"
                      className={
                        props.rateProductSearch.searchType == "2"
                          ? styles.marginTop20
                          : "styles.marginTop15"
                      }
                    >
                      <img
                        src={btnPrevious}
                        alt={Settings.labels.previousDef}
                        onClick={() => props.previous_onClick()}
                      />
                    </div>
                  )}
                </td>
                <td>
                  <>&nbsp;&nbsp;</>
                </td>
                <td>
                  {props.nextFlag && (
                    <div
                      id="nextBtn"
                      className={
                        props.rateProductSearch.searchType == "2"
                          ? styles.marginTop20
                          : styles.marginTop2
                      }
                    >
                      <img
                        src={btnNext}
                        alt={Settings.labels.nextDef}
                        onClick={() => props.next_onClick()}
                      />
                    </div>
                  )}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </>
  );
};

export default RateProductSearchResult;
