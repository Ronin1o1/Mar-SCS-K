import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Filter } from "../../../../common/components/filter/Filter";
import styles from "./EdieHotelProfileView.css";
import EdieHotelProfileListContext, {
  EdieHotelProfileListContextProvider,
} from "../context/EdieHotelProfileListContext";
import Settings from "../static/Settings";
import EdieHotelProfileSelectionList from "./EdieHotelProfileSelectionList";
//import Interceptors from "../../../../common/components/Interceptors";
//import CSuspense from "../../../../common/components/CSuspense";
//import { camelCase } from "lodash";

let contextType = null;

export const EdieHotelProfileView = () => {
  const { profile_id, profile_name } = useParams();

  contextType = EdieHotelProfileListContext;

  useEffect(() => {
    contextType.updateSelectedHotelProfile(profile_id, profile_name);
    contextType.getShowFilterOptions();
    contextType.getFindFilterData();
  }, []);

  const handleFilterData = (data, type) => {
    type === 1
      ? contextType.getAvailList(data)
      : type === 2
      ? contextType.getSelectList(data)
      : (contextType.getAvailList(data), contextType.getSelectList(data));
  };

  return (
    <EdieHotelProfileListContextProvider>
      <EdieHotelProfileListContext.Consumer>
        {(edieHotelProfileListContext) => {
          contextType = edieHotelProfileListContext;
          return (
            <div>
              <div className={styles.mainContainer}>
                <div className={styles.bodyContainer}>
                  <table className={styles.section}>
                    <tbody>
                      <tr>
                        <td className={styles.header}>
                          {Settings.viewHotelProfile.pageTitle}
                        </td>
                      </tr>
                      <tr className={styles.BGDarkBlueStyle}>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table className={styles.section}>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            height: "100%",
                            verticalAlign: "top",
                          }}
                          // valign="top"
                          // className={styles.filterSection}
                        >
                          <Filter
                            componentName="EdieHotelProfileView"
                            getPanelData={
                              contextType.getEdieHotelProfileSelectionList
                            }
                            findFilters={contextType.findFilterData}
                            showOptions={contextType.showFilterOptions}
                            filterViewLists={Settings.api.getFilterViewLists}
                            numItems={contextType.numItems}
                            numItemsSelected={contextType.numItemsSelected}
                            isDisplayTwoGridFilter={true}
                            filterForTwoTables={handleFilterData}
                            isCheckBoxes={true}
                            height={"calc(100vh - 150px)"}
                            isMakingRequest={contextType.isMakingRequest}
                            // isAccountRequired={
                            //   true
                            // }
                          />
                        </td>

                        <td
                          // valign="top"
                          // className={styles.gridSection}
                          style={{
                            height: "100%",
                          }}
                        >
                          <EdieHotelProfileSelectionList
                            panelData={contextType.panelData}
                            availData={contextType.availData}
                            selectData={contextType.selectData}
                            availGridRows={contextType.availGridRows}
                            selectedGridRows={contextType.selectedGridRows}
                            //deselectBtnClicked={contextType.deselectBtnClicked}
                            onChangeFieldValue={contextType.onChangeFieldValue}
                            quickSelectTopSaved={
                              contextType.quickSelectTopSaved
                            }
                            quickSelectBottomSaved={
                              contextType.quickSelectBottomSaved
                            }
                            showQuickSelectTop={contextType.showQuickSelectTop}
                            showQuickSelectBottom={
                              contextType.showQuickSelectBottom
                            }
                            quickSelectGrid1BtnClicked={
                              contextType.quickSelectGrid1BtnClicked
                            }
                            quickSelectGrid2BtnClicked={
                              contextType.quickSelectGrid2BtnClicked
                            }
                            selectBtnClicked={contextType.selectBtnClicked}
                            selectAllBtnClicked={
                              contextType.selectAllBtnClicked
                            }
                            unSelectBtnClicked={contextType.unSelectBtnClicked}
                            unSelectAllBtnClicked={
                              contextType.unSelectAllBtnClicked
                            }
                            handleOrderChange={contextType.handleOrderChange}
                            handleOrderChangeSelect={
                              contextType.handleOrderChangeSelect
                            }
                            selectedAccount={contextType.selectedAccount}
                            selectedHotelName={profile_name}
                            isMakingRequest={contextType.isMakingRequest}
                            initialLoadAvail={contextType.initialLoadAvail}
                            initialLoadSelect={contextType.initialLoadSelect}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </EdieHotelProfileListContext.Consumer>
    </EdieHotelProfileListContextProvider>
  );
};
