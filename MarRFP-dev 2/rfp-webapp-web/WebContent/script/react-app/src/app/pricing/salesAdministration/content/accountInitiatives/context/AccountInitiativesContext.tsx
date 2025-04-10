import React, { useState, useEffect, createContext } from "react";
import Settings from "../static/Settings";
import AccountInitiativesApi from "../service/AccountInitiativesAPI";

export interface InputFieldType {
  field_id: number;
  field_name: string;
  initiative_name: string;
  isReadOnly?: boolean;
  revStreamId?: number;
  seqId?: number;
  action?: string;
  acctInitiativeId?: string | number;
  plan_tm_lead?: string;
}

export interface InitiativeGroups {
  field_group: string;
  group_heading: string;
  fields_array: Array<InputFieldType>;
  field_key: string;
  rev_stream_id: number;
  field_key_map: string;
}

export interface AccInitiativesStates {
  initiative_groups: Array<InitiativeGroups>;
  accInitiativeData;
  lastUpdatedDate;
}

interface AccInitiativeContextProps {
  children: JSX.Element;
  accountRecId: string;
  period: string;
  accountName: string;
}

export interface IAccInitiativeContext {
  state: AccInitiativesStates;
  setState;
  makeInitiativeLink: (
    e: React.FocusEvent<HTMLInputElement>,
    group: InitiativeGroups,
    fieldItem: InputFieldType
  ) => void;
  updateAccInitiatives: (action: string) => Promise<string>;
  getAccInitiativeDetails: () => void;
  closeModal: (formChg?: string) => void;
  showModal: boolean;
  setShowModal;
  showPageLoader: boolean;
  setShowPageLoader;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    item: InputFieldType,
    group: InitiativeGroups
  ) => void;
  selectedGroup;
  setSelectedGroup;
  selectedItem;
  setSelectedItem;
}

const AccountInitiativesContext = createContext({} as IAccInitiativeContext);

export const AccountInitiativesContextProvider = (
  props: AccInitiativeContextProps
): JSX.Element => {
  const [state, setState] = useState<AccInitiativesStates>({
    initiative_groups: [
      {
        field_group: Settings.fieldGroups.leisure,
        group_heading: Settings.leisureInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists1,
        rev_stream_id: 4,
        field_key_map: Settings.fieldKeyMap.strInitLists1Map,
      },
      {
        field_group: Settings.fieldGroups.catering,
        group_heading: Settings.cateringInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists2,
        rev_stream_id: 6,
        field_key_map: Settings.fieldKeyMap.strInitLists2Map,
      },
      {
        field_group: Settings.fieldGroups.businessTransient,
        group_heading: Settings.businessTransientInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists3,
        rev_stream_id: 2,
        field_key_map: Settings.fieldKeyMap.strInitLists3Map,
      },
      {
        field_group: Settings.fieldGroups.groupsProfile,
        group_heading: Settings.groupsProfileInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists4,
        rev_stream_id: 3,
        field_key_map: Settings.fieldKeyMap.strInitLists4Map,
      },
      {
        field_group: Settings.fieldGroups.extendedStay,
        group_heading: Settings.extendedStayInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists5,
        rev_stream_id: 5,
        field_key_map: Settings.fieldKeyMap.strInitLists5Map,
      },
      {
        field_group: Settings.fieldGroups.generalAccOverview,
        group_heading: Settings.generalAccInitiativeHeading,
        fields_array: [],
        field_key: Settings.fieldGroupKey.initLists6,
        rev_stream_id: 1,
        field_key_map: Settings.fieldKeyMap.strInitLists6Map,
      },
    ],
    accInitiativeData: {},
    lastUpdatedDate: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});

  const getAccInitiativeDetails = () => {
    const payload = {
      accountRecId: props.accountRecId,
      accountName: props.accountName,
      period: props.period,
    };
    AccountInitiativesApi.getAccInitiatives(payload).then((res) => {
      const groupArr = [...state.initiative_groups];
      setShowScreenLoader(false);
      setShowPageLoader(false);
      const data = res;
      groupArr.forEach((group) => {
        group.fields_array = [];
        for (let i = 0; i < res.maxInitiatives; i++) {
          group.fields_array.push({
            field_id: i + 1,
            field_name: group.field_group + "_" + "field_" + (i + 1),
            initiative_name: "",
          });
        }
        if (data[group.field_key].length > 0) {
          for (let j = 0; j < data[group.field_key].length; j++) {
            group.fields_array[j].initiative_name =
              data[group.field_key][j].initiative_name;
            group.fields_array[j].isReadOnly =
              group.fields_array[j].initiative_name !== null &&
              group.fields_array[j].initiative_name !== "" &&
              group.fields_array[j].initiative_name !== undefined
                ? true
                : false;
            group.fields_array[j].revStreamId =
              data[group.field_key][j].revstreamid;
            group.fields_array[j].seqId = data[group.field_key][j].seqid;
            group.fields_array[j].action = data[group.field_key][j].action;
            group.fields_array[j].acctInitiativeId =
              data[group.field_key][j].acctinitiativeid;
            group.fields_array[j].plan_tm_lead =
              data[group.field_key][j].plan_tm_lead;
          }
        }
      });
      setState({
        ...state,
        initiative_groups: [...groupArr],
        accInitiativeData: res,
        lastUpdatedDate: res.lastupdatedate,
      });
    });
  };

  useEffect(() => {
    setShowScreenLoader(true);
    setShowPageLoader(true);
    getAccInitiativeDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: InputFieldType,
    group: InitiativeGroups
  ) => {
    e.preventDefault();
    const groupArr = [...state.initiative_groups];
    const index = groupArr.findIndex(
      (i) => i.field_group === group.field_group
    );
    const fieldIndex = groupArr[index].fields_array.findIndex(
      (j) => j.field_name === item.field_name
    );
    groupArr[index].fields_array[fieldIndex].initiative_name =
      e.currentTarget.value;
    setState({
      ...state,
      initiative_groups: [...groupArr],
    });
  };

  const makeInitiativeLink = (
    e: React.FocusEvent<HTMLInputElement>,
    group: InitiativeGroups,
    fieldItem: InputFieldType
  ) => {
    e.preventDefault();
    const groupArr = [...state.initiative_groups];
    const index = groupArr.findIndex(
      (i) => i.field_group === group.field_group
    );
    const fieldIndex = groupArr[index].fields_array.findIndex(
      (j) => j.field_name === fieldItem.field_name
    );
    if (
      e.currentTarget.value !== null &&
      e.currentTarget.value !== undefined &&
      e.currentTarget.value !== ""
    ) {
      groupArr[index].fields_array[fieldIndex].initiative_name =
        e.currentTarget.value;
      groupArr[index].fields_array[fieldIndex].isReadOnly = true;
      groupArr[index].fields_array[fieldIndex].seqId = fieldIndex + 1;
      groupArr[index].fields_array[fieldIndex].revStreamId =
        group.rev_stream_id;
      groupArr[index].fields_array[fieldIndex].acctInitiativeId = null;
    }
    setState({
      ...state,
      initiative_groups: [...groupArr],
    });
  };

  const updateAccInitiatives = (action: string): Promise<string> => {
    return new Promise((resolve) => {
      const payload = {
        formChg: "Y",
        period: props.period,
        accountrecid: props.accountRecId,
        accountname: props.accountName,
      };
      const groupArr = [...state.initiative_groups];
      groupArr.forEach((g) => {
        const fieldArr = g.fields_array
          .map((i) => {
            if (
              i.initiative_name !== null &&
              i.initiative_name !== "" &&
              i.initiative_name !== undefined
            ) {
              return {
                initiative_name: i.initiative_name,
                seqid: i.seqId,
                acctinitiativeid: i.acctInitiativeId,
                revstreamid: i.revStreamId,
              };
            } else {
              return undefined;
            }
          })
          .filter((field) => !!field)
          .reduce((acc, val, index) => {
            acc[index + 1] = val;
            return acc;
          }, {});
        payload[g.field_key_map] = JSON.stringify(fieldArr);
      });
      setShowScreenLoader(true);
      AccountInitiativesApi.updateAccInitiatives(payload).then((res) => {
        setShowScreenLoader(false);
        if (res === "success") {
          if (action === "update") {
            setShowPageLoader(true);
            getAccInitiativeDetails();
            resolve("success");
          } else if (action === "previous" || action === "navigate") {
            resolve("success");
          }
        }
      });
    });
  };

  const closeModal = (formchg?: string) => {
    if (formchg && formchg === "Y") {
      setShowModal(false);
      if (selectedItem && selectedItem.field_name) {
        (
          document.getElementById(selectedItem.field_name) as HTMLInputElement
        ).focus();
      }
      setShowPageLoader(true);
      getAccInitiativeDetails();
    } else {
      setShowModal(false);
      if (selectedItem && selectedItem.field_name) {
        (
          document.getElementById(selectedItem.field_name) as HTMLInputElement
        ).focus();
      }
    }
  };

  const accountInitiativesContext = {
    state: state,
    setState: setState,
    makeInitiativeLink: makeInitiativeLink,
    updateAccInitiatives: updateAccInitiatives,
    getAccInitiativeDetails: getAccInitiativeDetails,
    closeModal: closeModal,
    showModal: showModal,
    setShowModal: setShowModal,
    showPageLoader: showPageLoader,
    setShowPageLoader: setShowPageLoader,
    handleInputChange: handleInputChange,
    showScreenLoader,
    setShowScreenLoader,
    selectedItem,
    setSelectedItem,
    selectedGroup,
    setSelectedGroup,
  };

  return (
    <AccountInitiativesContext.Provider value={accountInitiativesContext}>
      {props.children}
    </AccountInitiativesContext.Provider>
  );
};

export const AccountInitiativesConsumer = AccountInitiativesContext.Consumer;
export default AccountInitiativesContext;
