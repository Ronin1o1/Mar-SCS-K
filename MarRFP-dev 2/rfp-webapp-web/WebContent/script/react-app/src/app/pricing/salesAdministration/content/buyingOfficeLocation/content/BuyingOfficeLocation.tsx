import React, { useEffect } from "react";
import { Layout } from "../../../routing/Layout";
import BuyingOfficeLocationContext, {
  BuyingOfficeLocationContextProvider,
} from "../context/BuyingOfficeLocationContext";
import styles from "./BuyingOfficeLocation.css";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
let contextType = null;

const headerSection = [
  { location: "Locations", rmnts: "Rm Nts" },
  { location: "Locations", rmnts: "Rm Nts" },
  { location: "Locations", rmnts: "Rm Nts" },
  { location: "Locations", rmnts: "Rm Nts" },
];

function BuyingOfficeLocation(params) {
  useEffect(() => {
    return () => {
      if (contextType.editCall === false) {
        contextType.updateAcctLocations();
        // window.location.reload();
      }
    };
  }, []);
  return (
    <>
      <BuyingOfficeLocationContextProvider>
        <BuyingOfficeLocationContext.Consumer>
          {(buyingOfficeLocationContext) => {
            contextType = buyingOfficeLocationContext;
            return (
              <React.Fragment>
                <Layout
                  getlastUpdateDate={contextType.state.lastUpdatedate}
                  IsAcctLocationsUpdate={() =>
                    contextType.updateAcctLocations()
                  }
                >
                  {contextType.state.showScreenLoader ? (
                    <img
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "45%",
                      }}
                      src={screenLoader}
                    />
                  ) : (
                    <table
                      className={styles.menuWdth100 + " " + styles.mainTable}
                      cellSpacing="0"
                    >
                      <tr>
                        <td>
                          <table className={styles.subTable} cellSpacing="0">
                            <tr>
                              <td>
                                {contextType.state.acctLocationsList.length >
                                  0 &&
                                  contextType.state.acctLocationsList.map(
                                    (eachLocation, index) => {
                                      return (
                                        <table
                                          key={index}
                                          className={styles.menuWdth100}
                                          cellSpacing="0"
                                        >
                                          <tr>
                                            <td>&nbsp;</td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.InstructionHeaderAcc
                                              }
                                              colSpan={16}
                                            >
                                              {eachLocation.mainheading}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.InstructionHeaderAcc
                                              }
                                              colSpan={16}
                                            >
                                              {eachLocation.heading}
                                            </td>
                                          </tr>
                                          {eachLocation.type !== "usa" && (
                                            <td className="field_Name">
                                              &nbsp;
                                            </td>
                                          )}
                                          <tr>
                                            <td>
                                              <table
                                                className={styles.headerTable}
                                                cellSpacing="0"
                                              >
                                                <tr>
                                                  {headerSection.map(
                                                    (eachHeader) => {
                                                      return (
                                                        <>
                                                          <td
                                                            style={{
                                                              width: "25px",
                                                            }}
                                                            className={
                                                              styles.field_Name
                                                            }
                                                          >
                                                            &nbsp;
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "80px",
                                                            }}
                                                            className={
                                                              styles.field_Name
                                                            }
                                                          >
                                                            {
                                                              eachHeader.location
                                                            }
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: "57px",
                                                            }}
                                                            className={
                                                              styles.field_Name
                                                            }
                                                          >
                                                            {eachHeader.rmnts}
                                                          </td>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </tr>
                                                {eachLocation.locations.length >
                                                  0 &&
                                                  eachLocation.locations.map(
                                                    (
                                                      eachLocation,
                                                      locationIndex
                                                    ) => {
                                                      return (
                                                        <>
                                                          {locationIndex !==
                                                            0 &&
                                                          locationIndex % 4 ===
                                                            0 ? (
                                                            <tr>
                                                              <td></td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}

                                                          <>
                                                            <td
                                                              className={
                                                                styles.field_Name +
                                                                " " +
                                                                styles.serialNumber
                                                              }
                                                            >
                                                              {locationIndex +
                                                                1 +
                                                                ")"}
                                                            </td>
                                                            <td
                                                              className={
                                                                styles.Cell_Spacing
                                                              }
                                                            >
                                                              {eachLocation.isReadOnly ? (
                                                                <input
                                                                  type="text"
                                                                  className={
                                                                    styles.readOnlyLink
                                                                  }
                                                                  value={
                                                                    eachLocation.bl_name
                                                                  }
                                                                  maxLength={40}
                                                                  size={10}
                                                                  readOnly={
                                                                    true
                                                                  }
                                                                  onClick={() =>
                                                                    contextType.locationLinkClick(
                                                                      eachLocation
                                                                    )
                                                                  }
                                                                  title={
                                                                    eachLocation.bl_name
                                                                  }
                                                                />
                                                              ) : (
                                                                <input
                                                                  type="text"
                                                                  value={
                                                                    eachLocation.bl_name ===
                                                                    null
                                                                      ? ""
                                                                      : eachLocation.bl_name
                                                                  }
                                                                  maxLength={40}
                                                                  size={10}
                                                                  className={
                                                                    styles.BuyingLocationInputField
                                                                  }
                                                                  onChange={(
                                                                    event
                                                                  ) =>
                                                                    contextType.handleCommonChange(
                                                                      eachLocation.master_location_index,
                                                                      locationIndex,
                                                                      "bl_name",
                                                                      event
                                                                    )
                                                                  }
                                                                  onBlur={() => {
                                                                    contextType.makeInitiativeLink(
                                                                      eachLocation.master_location_index,
                                                                      locationIndex
                                                                    );
                                                                  }}
                                                                />
                                                              )}
                                                            </td>
                                                            <td
                                                              className={
                                                                styles.rmnts
                                                              }
                                                            >
                                                              <input
                                                                maxLength={16}
                                                                type="text"
                                                                className={
                                                                  styles.BuyingLocationInputField
                                                                }
                                                                value={
                                                                  eachLocation.bl_potentialrn ===
                                                                  null
                                                                    ? ""
                                                                    : eachLocation.bl_potentialrn
                                                                }
                                                                size={5}
                                                                onChange={(
                                                                  event
                                                                ) =>
                                                                  contextType.handleCommonChange(
                                                                    eachLocation.master_location_index,
                                                                    locationIndex,
                                                                    "bl_potentialrn",
                                                                    event
                                                                  )
                                                                }
                                                              />
                                                            </td>
                                                          </>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                              </table>
                                            </td>
                                          </tr>
                                          {eachLocation.type !== "usa" && (
                                            <>
                                              <tr>
                                                <td className="field_Name">
                                                  &nbsp;
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="field_Name">
                                                  &nbsp;
                                                </td>
                                              </tr>
                                            </>
                                          )}
                                        </table>
                                      );
                                    }
                                  )}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  )}
                </Layout>
              </React.Fragment>
            );
          }}
        </BuyingOfficeLocationContext.Consumer>
        <style>{`
          .container{
            min-width:800px;
          }
        `}</style>
      </BuyingOfficeLocationContextProvider>
    </>
  );
}

export default BuyingOfficeLocation;
