import React from "react";
import SearchSmall from "../../../../common/assets/img/btnSearchSmall.gif";
import { CPagination } from "../../../../common/components/CPagination";
import CSelect from "../../../../common/components/CSelect";
import styles from "./HotelMirrorList.css";

interface IHotelMirrorSearchProps {
  searchContextType: any;
}

export const HotelMirrorSearch: React.FC<IHotelMirrorSearchProps> = (
  props: IHotelMirrorSearchProps
) => {
  const { searchContextType } = props;

  const handlePaginationAPI = (pageNumber: number) => {
    searchContextType.setPNumber(pageNumber);
    searchContextType.setState({
      ...searchContextType.state,
      mirrorSearchCriteria: {
        ...searchContextType.state.mirrorSearchCriteria,
        page: pageNumber,
      },
    });
    searchContextType.handleSearch(pageNumber);
  };

  return (
    <div className={styles.dataTableDiv}>
      <table style={{ border: "1px solid #CCC", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td className={styles.instructionHeader}>Information:</td>
            <td style={{ width: "20" }}>
              <>&nbsp;</>
            </td>
            <td style={{ color: "blue" }} id="searchDetails">
              <>&nbsp;</> Default rate programs will be used for any blank rate
              programs<>&nbsp;</>
            </td>
          </tr>
        </tbody>
      </table>
      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <td>
              <table className={styles.infoInnerTable}>
                <tbody>
                  <tr>
                    <td>
                      <table style={{ margin: "5px"  }}>
                        <tbody>
                          <tr>
                            <td
                              id="ShowAll"
                              className={styles.infoTbleFieldName}
                            >
                              <input
                                name="mirrorSearchCriteria.filterType"
                                id="r_1"
                                type="radio"
                                value="ALL"
                                onChange={(e) => {
                                  searchContextType.setState({
                                    ...searchContextType.state,
                                    mirrorSearchCriteria: {
                                      ...searchContextType.state
                                        .mirrorSearchCriteria,
                                      filterType: e.target?.value,
                                      filterString: "",
                                    },
                                  });
                                }}
                                checked={
                                  searchContextType.state.mirrorSearchCriteria
                                    .filterType === "ALL"
                                }
                              />
                              <label>&nbsp;Show ALL Hotels</label>
                            </td>
                          </tr>
                          <tr>
                            <td
                              id="filterWithCode"
                              className={styles.infoTbleFieldName}
                            >
                              <input
                                name="mirrorSearchCriteria.filterType"
                                id="r_1"
                                type="radio"
                                value="FILTER"
                                onChange={(e) => {
                                  searchContextType.setState({
                                    ...searchContextType.state,
                                    mirrorSearchCriteria: {
                                      ...searchContextType.state
                                        .mirrorSearchCriteria,
                                      filterType: e.target?.value,
                                    },
                                  });
                                }}
                                checked={
                                  searchContextType.state.mirrorSearchCriteria
                                    .filterType === "FILTER"
                                }
                              />
                              <label>&nbsp;Show MARSHA Code starting with:&nbsp;</label>
                              <input
                                name="mirrorSearchCriteria.filterString"
                                id="mirrorSearchCriteria.filterString"
                                style={{width:"121px"}}
                                className={styles.marshacodeinput}
                                onChange={(e) => {
                                  searchContextType.setState({
                                    ...searchContextType.state,
                                    mirrorSearchCriteria: {
                                      ...searchContextType.state
                                        .mirrorSearchCriteria,
                                      filterString: e.target?.value,
                                      filterType: "FILTER",
                                    },
                                  });
                                }}
                                value={
                                  searchContextType.state.mirrorSearchCriteria
                                    .filterString
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="zero-Height">
                        <tbody>
                          <tr>
                            <td className={styles.infoTbleFieldName}>
                              Sort by:{" "}
                              <CSelect
                                name="mirrorSearchCriteria.orderby"
                                className={styles.marshaselect}
                                id="mirrorSearchCriteria.orderby"
                                ddnOptions={[
                                  {
                                    id: "0",
                                    value: "Marsha Code",
                                  },
                                  {
                                    id: "1",
                                    value: "Name",
                                  },
                                ]}
                                keyField={"id"}
                                valField={"value"}
                                onChange={(event) => {
                                  searchContextType.setState({
                                    ...searchContextType.state,
                                    mirrorSearchCriteria: {
                                      ...searchContextType.state
                                        .mirrorSearchCriteria,
                                      orderby: parseInt(event.target.value),
                                    },
                                  });
                                }}
                              />
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td
                              style={{
                                width: "85px",
                                textAlign: "right",
                              }}
                            >
                              <img
                                style={{
                                  marginRight: "10px",
                                  cursor: "default",
                                }}
                                src={SearchSmall}
                                onClick={() => {
                                  searchContextType.setResetInput(true);
                                  searchContextType.handleSearch();
                                }}
                              />
                              <>&nbsp;</>
                              <>&nbsp;</>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.pagenationpos}>
        
              <CPagination
                totalPages={
                  searchContextType.state.mirrorSearchCriteria.totalPages
                }
                handlePaginationAPI={handlePaginationAPI}
                context={searchContextType}
              />
            
      </div>
    </div>
  );
};
