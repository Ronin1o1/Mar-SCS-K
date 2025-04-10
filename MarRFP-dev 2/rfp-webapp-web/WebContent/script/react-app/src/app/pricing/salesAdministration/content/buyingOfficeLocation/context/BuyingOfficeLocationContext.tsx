import React, { useState, useEffect } from "react";
import BuyingOfficeLocationApi from "../service/BuyingOfficeLocationApi";
import { useHistory, useLocation } from "react-router-dom";
import Settings from "../../../../salesAdministration/static/Settings";
import PageSettings from "../static/Settings";

const BuyingOfficeLocationContext = React.createContext({});
let period;
let accountrecid;
let accountName;

export const BuyingOfficeLocationContextProvider = (props) => {
  const history = useHistory();
  const urlParms = useLocation().search;
  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  accountName = new URLSearchParams(urlParms).get("accountName");
  const [state, setState] = useState({
    acctLocationsList: [],
    lastUpdatedate: null,
    showScreenLoader: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const [editCall, setEditCall] = useState(false);
  useEffect(() => {
    getAcctLocations();
  }, []);
  const commonMethod = (
    locations,
    maxTravelLocations,
    master_location_index
  ) => {
    if (locations.length > 0) {
      locations.map((eachLocation, index) => {
        if (eachLocation.bl_name !== null && eachLocation.bl_name !== "") {
          eachLocation.isReadOnly = true;
        }
        eachLocation.master_location_index = master_location_index;
        eachLocation.usLocation = master_location_index === 0 ? "Y" : "N";
        eachLocation.seqid = index + 1;
      });
    }
    for (let i = locations.length; i < maxTravelLocations; i++) {
      locations.push({
        bl_name: null,
        bl_potentialrn: null,
        master_location_index: master_location_index,
        isReadOnly: false,
        seqid: i + 1,
        accountinfoid: null,
        buyinglocid: null,
        usLocation: master_location_index === 0 ? "Y" : "N",
      });
    }
    return locations;
  };
  const commonLocGrouping = (locationArr) => {
    let groupsList;
    state.acctLocationsList.length > 0 &&
      locationArr.reduce((groups, contact) => {
        const seqid = contact.seqid;
        if (
          (contact.bl_name !== "" && contact.bl_name !== null) ||
          (contact.bl_potentialrn !== "" && contact.bl_potentialrn !== null)
        ) {
          if (!groups[seqid]) {
            groups[seqid] = {};
          }
          groups[seqid] = contact;
        }
        groupsList = groups;
        return groups;
      }, {});
    return groupsList;
  };
  //API calls start
  const getAcctLocations = () => {
    setLoader(true);
    BuyingOfficeLocationApi.getAcctLocations(
      accountrecid,
      accountName,
      period
    ).then((data) => {
      setLoader(false);
      const usLocations = commonMethod(
        data.usLocations,
        data.maxTravelLocations,
        0
      );
      const intlLocations = commonMethod(
        data.intlLocations,
        data.maxTravelLocations,
        1
      );
      const array = [
        {
          mainheading: "Top Buying/Office Locations",
          heading: "United States Buying/Office Locations and Rm Nts",
          locations: usLocations,
          type: "usa",
        },
        {
          mainheading: "Top Buying/Office Locations",
          heading: "International Buying/Office Locations and Rm Nts",
          locations: intlLocations,
          type: "international",
        },
      ];
      state.acctLocationsList = array;
      setState({
        ...state,
        acctLocationsList: state.acctLocationsList,
        lastUpdatedate: data.lastupdatedate,
      });
    });
  };
  const updateAcctLocations = () => {
    setLoader(true);
    const strUSlocations = commonLocGrouping(
      state.acctLocationsList[0].locations
    );
    const strInitocations = commonLocGrouping(
      state.acctLocationsList[1].locations
    );
    const body = {
      strUsLocationsMap:
        strUSlocations !== undefined ? JSON.stringify(strUSlocations) : null,
      strIntlLocationsMap:
        strInitocations !== undefined ? JSON.stringify(strInitocations) : null,
      formChg: "Y",
      period: period,
      accountrecid: accountrecid,
      accountname: accountName,
    };
    BuyingOfficeLocationApi.updateAcctLocations(body).then((data) => {
      setLoader(false);
      if (data === "success") {
        getAcctLocations();
      }
    });
  };
  //API calls end
  const handleCommonChange = (
    master_location_index,
    location_index,
    inputType,
    event
  ) => {
    const obj =
      state.acctLocationsList[master_location_index].locations[location_index];
    if (inputType === "bl_potentialrn") {
      const re = PageSettings.common.numberRegex;
      if (event.target.value === "" || re.test(event.target.value)) {
        obj[inputType] = event.target.value === "" ? null : event.target.value;
      } else {
        obj[inputType] =
          state.acctLocationsList[master_location_index].locations[
            location_index
          ].bl_potentialrn === null
            ? ""
            : state.acctLocationsList[master_location_index].locations[
                location_index
              ].bl_potentialrn;
      }
    } else {
      obj[inputType] = event.target.value;
    }
    setState({ ...state, acctLocationsList: state.acctLocationsList });
  };
  const makeInitiativeLink = (master_location_index, location_index) => {
    if (
      state.acctLocationsList[master_location_index].locations[location_index]
        .bl_name !== "" &&
      state.acctLocationsList[master_location_index].locations[location_index]
        .bl_name !== null
    ) {
      state.acctLocationsList[master_location_index].locations[
        location_index
      ].isReadOnly = true;
    }
    setState({ ...state, acctLocationsList: state.acctLocationsList });
  };
  const locationLinkClick = (locationDetails) => {
    setEditCall(true);
    setTimeout(() => {
      history.push({
        pathname: `${Settings.parentRoute}/editBuyingOfficeLocation`,
        search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        state: locationDetails,
      });
    }, 1000);
  };
  const buyingOfficeLocationContext = {
    state,
    setState,
    handleCommonChange,
    makeInitiativeLink,
    locationLinkClick,
    updateAcctLocations,
    editCall,
    setLoader,
  };
  return (
    <BuyingOfficeLocationContext.Provider value={buyingOfficeLocationContext}>
      {props.children}
    </BuyingOfficeLocationContext.Provider>
  );
};

export const BuyingOfficeLocationContextConsumer =
  BuyingOfficeLocationContext.Consumer;
export default BuyingOfficeLocationContext;
