import React, { FC } from "react";
import CRadio from "../../../common/components/CRadio";
import btnUnSelectAll from "../../../common/assets/img/button/btnUnSelectAll.gif";
import btnSearch from "../../../common/assets/img/button/btnSearch.gif";
import { ListViewProduct } from "../../masterFormattedRateDescriptions/common/listViewProduct";
import Settings from "../static/Settings";
import styles from "./RateProductSearch.css";

interface IRateProductSearch {
  rateProductSearch: any;
  handleOnChange: (e) => void;
  searchBy_Click: (e, string) => void;
  KorSafeCharsOnly: (e) => void;
  ProductCodeCharsOnly: (e) => void;
  validateProductCode: (e) => void;
  setSearchQuery: (e, string) => void;
  unSelectAll_Click: () => void;
  search_Click: () => void;
  storage_productcode: any;
}
const RateProductSearch: FC<IRateProductSearch> = (props): JSX.Element => {
  return (
    <>
      <table>
        <tr>
          <td
            className={
              (styles.instructions, styles.width_350, styles.noWrapTop)
            }
          >
            {Settings.labels.searchByTitle}
            <CRadio
              type={Settings.inputType.radio}
              id={Settings.labels.radioSearchType}
              name={Settings.labels.radioSearchType}
              onChangeHandler={(e) => props.searchBy_Click(e, "ProductCode")}
              checked={props.rateProductSearch.searchType == 1 ? true : false}
            ></CRadio>
            {Settings.labels.productCodeName}
            <CRadio
              type={Settings.inputType.radio}
              id={Settings.labels.radioSearchType}
              name={Settings.labels.radioSearchType}
              onChangeHandler={(e) => props.searchBy_Click(e, "ProductAttr")}
              checked={props.rateProductSearch.searchType == 2 ? true : false}
            ></CRadio>
            {Settings.labels.productAttribute}
          </td>
        </tr>
        <tr>
          <td className={(styles.width_350, styles.noWrapTop)}>
            <div id="searchByCode">
              <table>
                <tr>
                  {props.rateProductSearch.searchType == "1" && (
                    <td className={styles.instructions}>
                      {Settings.labels.enterProductCode}
                    </td>
                  )}
                </tr>
                <tr>
                  {props.rateProductSearch.searchType == "1" && (
                    <td>
                      <table className={styles.mainTable}>
                        <tr>
                          <td className={styles.field_Name}>
                            {Settings.labels.productCodeTitle}
                          </td>
                          <td>
                            <input
                              id={Settings.modifyRateDescription.productCode.id}
                              type="text"
                              name={
                                Settings.modifyRateDescription.productCode.name
                              }
                              onKeyPress={(e) => props.ProductCodeCharsOnly(e)}
                              onChange={(e) => {
                                props.setSearchQuery(e, "productCode");
                              }}
                              onBlur={(e) => props.validateProductCode(e)}
                              value={
                                props.storage_productcode !== "" &&
                                props.storage_productcode !== undefined
                                  ? props.storage_productcode
                                  : props.rateProductSearch.productCode
                              }
                              maxLength={6}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}>
                            {Settings.labels.productName}
                          </td>
                          <td>
                            <input
                              id={Settings.modifyRateDescription.productName.id}
                              type="text"
                              name={
                                Settings.modifyRateDescription.productName.name
                              }
                              onKeyPress={(e) => props.KorSafeCharsOnly(e)}
                              onChange={(e) => {
                                props.setSearchQuery(e, "productName");
                              }}
                              value={props.rateProductSearch.productName}
                              maxLength={40}
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  )}
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div id="searchByAttr">
              <table className={styles.mainTable}>
                <tr>
                  {props.rateProductSearch.searchType == "2" && (
                    <td className={styles.instructions}>
                      {Settings.labels.productAttibutesSubHeader}
                    </td>
                  )}
                </tr>
                <tr>
                  {props.rateProductSearch.searchType == "2" && (
                    <td>
                      <div className={styles.productAttrTable}>
                        <table className={styles.menuWdth100_Height}>
                          {props.rateProductSearch?.rateProductDefinitionList?.map(
                            (data, index) => {
                              return (
                                <>
                                  <ListViewProduct
                                    key={index}
                                    data={data}
                                    handleChange={(e) =>
                                      props.handleOnChange(e)
                                    }
                                  />
                                </>
                              );
                            }
                          )}
                        </table>
                      </div>
                    </td>
                  )}
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          {props.rateProductSearch.searchType == "2" && (
            <td>
              <table className={styles.menuWdth100_Height}>
                <tr>
                  <td align="left">
                    <img
                      src={btnUnSelectAll}
                      alt={Settings.labels.unSelectAll}
                      onClick={() => props.unSelectAll_Click()}
                    />
                  </td>
                  <td align="right"></td>
                </tr>
              </table>
            </td>
          )}
        </tr>
        <tr>
          <td>
            <table className={styles.menuWdth100_Height}>
              <tr>
                <td align="left" className={styles.width_230}></td>
                <td align="left">
                  <img
                    tabIndex={0}
                    src={btnSearch}
                    alt={Settings.labels.searchAlt}
                    onClick={() => props.search_Click()}
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </>
  );
};

export default RateProductSearch;
