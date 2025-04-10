import React from "react";
import { FilterContextProvider } from "./context/FilterContext";
import { FilterLeftPanel } from "./FilterLeftPanel";
import styles from "./Filter.css";

interface IFilterProps {
  getPanelData?: (requestPayload: any) => void;
  componentName: string;
  findFilters?: any;
  showOptions?: any;
  numItems?: number;
  numItemsSelected?: number;
  save?: () => void;
  directSelect?: () => void;
  clearDirectSelect?: () => void;
  getAccountStatus?: () => void;
  setRequestPayload?: (data: any) => void;
  directSelectList?: string;
  height?: any;
  EdieRunReport?: (data: any) => void;
  CBCRunReport?: () => void;
  isAccountRequired?: boolean;
  isDisplayTwoGridFilter?: boolean;
  filterViewLists: string;
  filterForTwoTables?: (data: any, type: any) => void;
  deleteAPIUpdate?: (data: any, mcbObj: any) => void;
  getbatchId?: (data: any) => void;
  isCheckBoxes?: boolean;
  isMakingRequest?: boolean;
  isUpdateMultiple?: boolean;
  isMakingRequestAvailList?: boolean;
  dueDateData?: any;
  searchUpdateTableData?: (data: any, type: any) => void;
  isHotelUser?: boolean;
}
export const Filter: React.FC<IFilterProps> = (props: IFilterProps) => {
  return (
    <FilterContextProvider {...props}>
      {/* <div style={{ width: "300px", height: "calc(100vh - 124px)", overflowY: "auto", overflowX: "hidden"}}> */}
      <div className={` ${styles.filterDesign} ${"filermaindesign"}`}>
        <FilterLeftPanel {...props} />
      </div>
      {/* </div> */}
    </FilterContextProvider>
  );
};
