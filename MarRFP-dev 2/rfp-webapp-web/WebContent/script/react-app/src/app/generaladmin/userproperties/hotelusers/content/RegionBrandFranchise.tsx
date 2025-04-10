/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styles from "../content/UserEdit.css";
import Settings from "../static/Settings";
import { ListView } from "../../shared/listView";
import AvailableProperties from "./AvailableProperties";
import { CPagination } from "../../../../common/components/CPagination";

export const RegionBrandFranchise = (props) => {
  useEffect(() => {
    const regionDivScroll = document.getElementById(props.id);
    if (regionDivScroll) {
      regionDivScroll.scrollTop = 0;
    }
  }, [props.context.isLoaded]);

  return (
    <>
      {" "}
      <td className={styles.nowrapStyle}>
        <table className={styles.top}>
          <tbody>
            <tr>
              <td className={styles.tdShiftLeft}>
                <b>
                  <label>{props.title}</label>
                </b>
              </td>
              <td>
                <>&nbsp;</>
              </td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.tdShiftLeft}>
                <div className={styles.regionDiv} id={props.id}>
                  <table className={styles.zero_Height}>
                    <tbody>
                      <tr>
                        <td className={styles.widthTen}>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {props.allData.map((data) => {
                            return (
                              <ListView
                                data={data}
                                handleChange={props.handleChange}
                                type={props.type}
                              />
                            );
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a>
                  <img
                    id={props.imageId}
                    tabIndex={0}
                    src={props.src}
                    className={styles.borderZero}
                    alt={Settings.labels.hotellistAlt}
                    onClick={(e) => props.handleImageClick("input", "")}
                  />
                </a>
              </td>
              <td></td>
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
                  totalPages={props.totalPages}
                  context={props.contextType}
                  handlePaginationAPI={props.handlePaginationAPI}
                />
              </td>
              <td>
                <>&nbsp;</>
              </td>
            </tr>
            <tr>
              <td>
                {props.context.isLoaded && (
                  <AvailableProperties
                    hotellistAll={props.hotellistAll}
                    handleChange={props.handleChangeInput}
                    heading={Settings.labels.selectProp}
                    type={props.type}
                    context={props.contextType}
                    resetScroll={false}
                    id={props.id}
                  ></AvailableProperties>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  <label className={styles.rewgionset}>{Settings.labels.totalProperties}
                  {props.TotalRecords}</label>
                  <a className={styles.returnButton}>
                    <img
                      id={props.ReturnToUserListButtonid}
                      tabIndex={0}
                      src={props.ReturnToUserListButtonsrc}
                      className={styles.borderZero}
                      onClick={(e) => props.ReturnToUserListButtononClick(e)}
                      alt={Settings.labels.returnAccessList}
                    />
                  </a>
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </>
  );
};
export default RegionBrandFranchise;
