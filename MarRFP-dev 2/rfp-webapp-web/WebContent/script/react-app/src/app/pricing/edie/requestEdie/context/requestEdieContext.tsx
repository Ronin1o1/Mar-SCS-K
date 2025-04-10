import React, { useContext, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
//import Utils from "../../../../common/utils/Utils";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "./../static/Settings";

// Set state variables and function
interface IRequestEdieContext {
  FindFilterData: any;
  showFilterOptions: any;
  numItems?: any;
  getRequestEdiePanelData: (requestPayload: any, orderBy?: number) => void;
  getFindFilter: () => void;
  getshowFilterOptions: () => void;
  filteredHotelList: any;
  selectedHotelId: any;
  onChangeFeildValue: (data: any, data2: any, data4: any) => void;
  deselectBtnClicked: () => void;
  showQuickSelectTop: any;
  quickSelectGrid1BtnClicked: (data: any) => void;
  quickSelectTopSaved: (data: any, data1: any) => void;
  EdieRunReport: (data: any, requestPayload: any) => void;
  rightPanelViewGrid: any;
  reportURL: any;
  panelData: any;
  handleOrderChange: (data: any, data1: any) => void;
  callCognosAPI: () => void;
  hiddenUrl: any;
  initialLoad: any;
  setRightPanelViewGrid: (data: boolean) => void;
  isLoading: any;
  setIsLoading: () => void;
}

const RequestEdieContext = React.createContext({} as IRequestEdieContext);

export const RequestEdieContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [panelData, setpanelData] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [numItems, setnumItems] = useState(0);
  const [filteredHotelList, setFilteredHotelList] = useState([]);
  const [selectedHotelId, setselectedHotelId] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [rightPanelViewGrid, setRightPanelViewGrid] = useState(true);
  const [reportParam, setReportParam] = useState("");
  const [reportURL, setReportURL] = useState("");
  const [hiddenUrl, setHiddenUrl] = useState("");
  const [initialLoad, setinitialLoad] = useState(true);
  const [prevSelHotel, setPrevSelHotel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const getshowFilterOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const getFindFilter = () => {
    API.getPricingFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getRequestEdiePanelData = (param, orderBy) => {
    setIsLoading(true);
    setpanelData(param);
    API.getFilteredHotelList(param).then((data) => {
      setAPIData(data);
      setIsLoading(false);
    });
  };

  const setAPIData = (data) => {
    setinitialLoad(false);
    const records = data.length;
    setselectedHotelId([]);
    setFilteredHotelList(data);
    setnumItems(records);
    setRightPanelViewGrid(true);
  };

  const onChangeFeildValue = (rowData, selectedRows, event) => {
    const { checked } = event.target;
    if (checked) {
      setPrevSelHotel(rowData.hotelid);
      if (prevSelHotel && event.nativeEvent.shiftKey) {
        const prevSelIndex = filteredHotelList.findIndex(
          (item) => item.hotelid == prevSelHotel
        );
        const currSelIndex = filteredHotelList.findIndex(
          (item) => item.hotelid == rowData.hotelid
        );
        if (prevSelIndex < currSelIndex) {
          for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
            const htlId = filteredHotelList[i].hotelid;
            const selectedArr =
              FilteredGridSelectUtils.getSelectedCheckboxValue(
                Settings.inputType.checkbox,
                checked,
                selectedRows,
                htlId
              );
            setselectedHotelId([...selectedArr]);
          }
        } else {
          for (let i = currSelIndex; i < prevSelIndex; i++) {
            const htlId = filteredHotelList[i].hotelid;
            const selectedArr =
              FilteredGridSelectUtils.getSelectedCheckboxValue(
                Settings.inputType.checkbox,
                checked,
                selectedRows,
                htlId
              );
            setselectedHotelId([...selectedArr]);
          }
        }
        //Shift double click functionality
        if (prevSelIndex == currSelIndex) {
          for (let i = currSelIndex; i < filteredHotelList.length; i++) {
            filteredHotelList[i].hotelid_checkbox = checked;
            const selectedArr =
              FilteredGridSelectUtils.getSelectedCheckboxValue(
                Settings.inputType.checkbox,
                checked,
                selectedRows,
                filteredHotelList[i].hotelid
              );
            setselectedHotelId([...selectedArr]);
          }
        }
        //end
      } else {
        const selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
          Settings.inputType.checkbox,
          checked,
          selectedRows,
          rowData.hotelid
        );
        setselectedHotelId([...selectedArr]);
      }
    } else {
      const selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
        Settings.inputType.checkbox,
        checked,
        selectedRows,
        rowData.hotelid
      );

      setselectedHotelId([...selectedArr]);
    }
  };

  const deselectBtnClicked = () => {
    setselectedHotelId([]);
  };

  const quickSelectGrid1BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setshowQuickSelectTop(value);
  };

  const quickSelectTopSaved = (param, selectedId) => {
    param.forEach((element) => {
      selectedId.push(element.hotelid);
    });
    setselectedHotelId(selectedId);
    quickSelectGrid1BtnClicked(true);
  };

  const EdieRunReport = (paneldata, requestPayload) => {
    if (filteredHotelList.length == 0) {
      alert("Please retrieve the list of hotels");
    } else {
      const strHotelList = [];
      filteredHotelList.map((element) => {
        if (selectedHotelId.indexOf(element.hotelid) != -1) {
          strHotelList.push({ changed: "Y", hotelid: element.hotelid });
        } else {
          strHotelList.push({ hotelid: element.hotelid });
        }
      });
      setIsLoading(true);
      API.getRunReport(strHotelList, requestPayload).then((data) => {
        const url = `${reportParam}=${data.reportQueryString}`;
        setReportURL(url);
        setRightPanelViewGrid(false);
        setIsLoading(false);
      });
    }
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param;
    setpanelData({ ...paneldata });
    getRequestEdiePanelData(paneldata, param);
  };

  const callCognosAPI = () => {
    if (!appContext?.cognosURL) {
      API.getCognosServerUrl().then((data) => {
        setHiddenUrl(data.COGNOS_LOGIN_URL);
        setReportParam(data.COGNOS_EDIE_URL);
      });
    } else {
      setHiddenUrl(appContext?.cognosURL.COGNOS_LOGIN_URL);
      setReportParam(appContext?.cognosURL.COGNOS_EDIE_URL);
    }
  };

  const requestEdieContext = {
    getRequestEdiePanelData,
    FindFilterData,
    showFilterOptions,
    numItems,
    getshowFilterOptions,
    getFindFilter,
    filteredHotelList,
    panelData,
    onChangeFeildValue,
    selectedHotelId,
    setAPIData,
    deselectBtnClicked,
    showQuickSelectTop,
    quickSelectGrid1BtnClicked,
    quickSelectTopSaved,
    EdieRunReport,
    rightPanelViewGrid,
    reportURL,
    reportParam,
    handleOrderChange,
    callCognosAPI,
    hiddenUrl,
    initialLoad,
    setRightPanelViewGrid,
    isLoading,
    setIsLoading,
  };

  return (
    <RequestEdieContext.Provider value={requestEdieContext}>
      {props.children}
    </RequestEdieContext.Provider>
  );
};

export const RequestEdieConsume = RequestEdieContext.Consumer;
export default RequestEdieContext;
