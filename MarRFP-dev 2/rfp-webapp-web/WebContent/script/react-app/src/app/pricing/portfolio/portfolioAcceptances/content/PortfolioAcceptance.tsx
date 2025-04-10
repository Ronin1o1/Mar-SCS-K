import React, {
  Suspense,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import PortfolioAcceptanceContext from "../context/PortfolioAcceptancesContext";
import styles from "./PortfolioAcceptance.css";
import Settings from "../static/Settings";
import { Filter } from "../../../../common/components/filter/Filter";
import CModal from "../../../../common/components/CModal";
import QuickSelect from "../../../../shared/components/quickSelect";
import CSuspense from "../../../../common/components/CSuspense";
import btnSave from "../../../../common/assets/img/button/btnSave.gif";
import API from "../service/API";
import PortfolioGrid from "./PortfolioGrid";
import { useLocation, useHistory } from "react-router-dom";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import _ from "lodash";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import classNames from "classnames";
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const PortfolioAcceptance: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const [state, setState] = useState({
    propertyList: [],
    showQuickSelect: false,
    all: false,
  });
  const [refresh, setRefresh] = useState(0);
  const [showloader, setLoader] = useState(false);
  const [alertModalFor200Limit, setalertModalFor200Limit] = useState(false);
  const [alertModalForCommaValidate, setalertModalForCommaValidate] =
    useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const {
    getShowOptions,
    showFilterOptions,
    getPortfolioStatusList,
    panelData,
    setStoreRequestPayload,
    isMakingRequest,
    getRejectionReason,
    rejectionReasonList,
    getRemovalReason,
    removalReasonList,
    FindFilterData,
    getPortfolioStatusFindFilter,
    storeRequestPayload,
    ajaxSave,
    ajaxIsMakingRequest,
    ajaxSaveResponse,
    hotelList,
    setHotelList,
    AcceptAll,
    RejectAll,
    getPortfolioStatusListDup,
    showMaxAlert,
    setShowMaxAlert,
    totalRecord,
    setPortfolioSelectionQuickSelectIndices,
  } = useContext(PortfolioAcceptanceContext);

  useEffect(() => {
    getRemovalReason();
    getRejectionReason();
    getShowOptions();
    getPortfolioStatusFindFilter();
    // getPortfolioStatusList({"strFilterValues":{"year":2019,"stringBrandList":"792,797,791,789,37,796,798,790,799,62,803,793,801,800,794,148,147,136,146,795,182,183,802,304,807,184,456,227,804,808,805,806","areaFilter":{"areaOrRegion":"C","country":"","state":"","city":""},"futureOpeningFilter":{"allFutureOpenings":"","strFromDate":"","strToDate":""},"dateRangeFilter":{"strFromDate":"08/29/2021","strToDate":"08/29/2021"},"scheduleReport":"N","orderBy":0,"filterString":"","filterMatchType":0,"filterMatchField":0,"accountFilter":{"accountType":"5","accountrecid":"270677","accountstatus":"SOL"}}})

    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioStatusListDup(localStorage.getItem("port_Acc"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_Acc");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_Acc");
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });

  useEffect(() => {
    if (
      panelData &&
      panelData.portfolioStatusList &&
      panelData.portfolioStatusList.length
    ) {
      selectedRows(panelData.portfolioStatusList);
    } else {
      setHotelList([]);
    }
  }, [panelData]);
  useEffect(() => {
    if (
      ajaxSaveResponse &&
      ((ajaxSaveResponse.items && ajaxSaveResponse.items.length) ||
        ajaxSaveResponse == "success")
    ) {
      setHotelList(
        hotelList.map((x) => {
          x["selected"] = false;
          return x;
        })
      );
    }
  }, [ajaxSaveResponse]);

  useEffect(() => {
    if (state.propertyList.length && !state.all) {
      AjaxSave(handleAjaxSave(state.propertyList));
    }
  }, [state]);

  useEffect(() => {
    if (hotelList.length) {
      setState({ propertyList: [], showQuickSelect: false, all: false });
    }
  }, [hotelList]);

  const gridColumns = [
    {
      field: Settings.tableColumns.selected.field,
      header: "",
      style: { minWidth: "20px" },
      fixed: true,
      left: 0,
      headerColour: "#d7d9cf",
      inputType: {
        type: Settings.inputType.checkbox,
        trueValue: true,
        falseValue: false,
        validate: true,
      },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { minWidth: "76px" },
      optionnumber: 0,
      fixed: true,
      left: 25,
      headerColour: "#d7d9cf",
      sortfield: Settings.tableColumns.marshacode.field,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: { minWidth: "217px" },
      optionnumber: 1,
      sortfield: Settings.tableColumns.hotelname.field,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_1.field,
      header: Settings.tableColumns.roomPoolData.roompool_1.header,
      style: { minWidth: "55px" },
      optionnumber: 2,
      sortfield: Settings.tableColumns.roomPoolData.roompool_1.accepted.field,
      subHeader: [
        {
          field: Settings.tableColumns.roomPoolData.roompool_1.accepted.field,
          header: Settings.tableColumns.roomPoolData.roompool_1.accepted.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "Y",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_1.rejected.field,
          header: Settings.tableColumns.roomPoolData.roompool_1.rejected.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "N",
            validate: false,
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectionreason
                .field,
            initial_value: "",
            initial_label: "No reason given",
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_1.pending.field,
          header: Settings.tableColumns.roomPoolData.roompool_1.pending.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "P",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
      ],
    },
    {
      field:
        Settings.tableColumns.roomPoolData.roompool_1.rejectionreason.field,
      header:
        Settings.tableColumns.roomPoolData.roompool_1.rejectionreason.header,
      style: { minWidth: "218px" },
      optionnumber: 3,
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_1.rejectionreason.field,
      inputType: {
        type: Settings.inputType.rejectionModal,
        field:
          Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid.field,
        label:
          Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid.label,
      },
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_2.field,
      header: Settings.tableColumns.roomPoolData.roompool_2.header,
      style: { minWidth: "55px" },
      optionnumber: 6,
      sortfield: Settings.tableColumns.roomPoolData.roompool_2.accepted.field,
      subHeader: [
        {
          field: Settings.tableColumns.roomPoolData.roompool_2.accepted.field,
          header: Settings.tableColumns.roomPoolData.roompool_2.accepted.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "Y",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_2.rejected.field,
          header: Settings.tableColumns.roomPoolData.roompool_2.rejected.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "N",
            validate: false,
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectionreason
                .field,
            initial_value: "",
            initial_label: "No Reason Provided.",
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_2.pending.field,
          header: Settings.tableColumns.roomPoolData.roompool_2.pending.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "P",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_2.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
      ],
    },
    {
      field:
        Settings.tableColumns.roomPoolData.roompool_2.rejectionreason.field,
      header:
        Settings.tableColumns.roomPoolData.roompool_2.rejectionreason.header,
      inputType: {
        type: Settings.inputType.rejectionModal,
        field:
          Settings.tableColumns.roomPoolData.roompool_2.rejectreasonid.field,
        label:
          Settings.tableColumns.roomPoolData.roompool_2.rejectreasonid.label,
      },
      style: { minWidth: "218px" },
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_2.rejectionreason.field,
      optionnumber: 7,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_3.field,
      header: Settings.tableColumns.roomPoolData.roompool_3.header,
      style: { minWidth: "55px" },
      optionnumber: 8,
      sortfield: Settings.tableColumns.roomPoolData.roompool_3.accepted.field,
      subHeader: [
        {
          field: Settings.tableColumns.roomPoolData.roompool_3.accepted.field,
          header: Settings.tableColumns.roomPoolData.roompool_3.accepted.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "Y",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_3.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_3.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_3.rejected.field,
          header: Settings.tableColumns.roomPoolData.roompool_3.rejected.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "N",
            validate: false,
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_3.rejectionreason
                .field,
            initial_value: "",
            initial_label: "No Reason Provided.",
          },
        },
        {
          field: Settings.tableColumns.roomPoolData.roompool_3.pending.field,
          header: Settings.tableColumns.roomPoolData.roompool_3.pending.header,
          style: { minWidth: "55px" },
          inputType: {
            type: Settings.inputType.radio,
            trueValue: "P",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_3.rejectreasonid
                .field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_3.rejectionreason
                .field,
            initial_value: null,
            initial_label: null,
          },
        },
      ],
    },
    {
      field:
        Settings.tableColumns.roomPoolData.roompool_3.rejectionreason.field,
      header:
        Settings.tableColumns.roomPoolData.roompool_3.rejectionreason.header,
      inputType: {
        type: Settings.inputType.rejectionModal,
        field:
          Settings.tableColumns.roomPoolData.roompool_3.rejectreasonid.field,
        label:
          Settings.tableColumns.roomPoolData.roompool_3.rejectreasonid.label,
      },
      style: { minWidth: "218px" },
      optionnumber: 9,
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_3.rejectionreason.field,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_1.lra.field,
      header: Settings.tableColumns.roomPoolData.roompool_1.lra.header,
      style: { minWidth: "45px" },
      optionnumber: 10,
      sortfield: Settings.tableColumns.roomPoolData.roompool_1.lra.field,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_2.lra.field,
      header: Settings.tableColumns.roomPoolData.roompool_2.lra.header,
      style: { minWidth: "45px" },
      optionnumber: 11,
      sortfield: Settings.tableColumns.roomPoolData.roompool_2.lra.field,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_3.lra.field,
      header: Settings.tableColumns.roomPoolData.roompool_3.lra.header,
      style: { minWidth: "45px" },
      optionnumber: 12,
      sortfield: Settings.tableColumns.roomPoolData.roompool_3.lra.field,
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_1.pgoosData.field,
      header: Settings.tableColumns.roomPoolData.roompool_1.pgoosData.header,
      style: { minWidth: "100px" },
      optionnumber: 13,
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_1.pgoosData
          .roomPoolSequence_1.pgoos.field,
      subHeader: [
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_1.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_1.pgoos.header,
          style: { minWidth: "100px" },
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                  .roomPoolSequence_1.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                  .roomPoolSequence_1.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_1.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_1.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_1.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_1.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_2.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_2.pgoos.header,
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                  .roomPoolSequence_2.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                  .roomPoolSequence_2.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_2.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_2.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
          style: { minWidth: "100px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_2.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_1.pgoosData
              .roomPoolSequence_2.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_2.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_1.pgoosData
                .roomPoolSequence_2.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
      ],
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_2.pgoosData.field,
      header: Settings.tableColumns.roomPoolData.roompool_2.pgoosData.header,
      style: { minWidth: "100px" },
      optionnumber: 14,
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_2.pgoosData
          .roomPoolSequence_1.pgoos.field,
      subHeader: [
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_1.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_1.pgoos.header,
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                  .roomPoolSequence_1.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                  .roomPoolSequence_1.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_1.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
          style: { minWidth: "100px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_1.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_1.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_1.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_2.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_2.pgoos.header,
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                  .roomPoolSequence_2.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                  .roomPoolSequence_2.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_2.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_2.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
          style: { minWidth: "100px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_2.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_2.pgoosData
              .roomPoolSequence_2.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_2.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_2.pgoosData
                .roomPoolSequence_2.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
      ],
    },
    {
      field: Settings.tableColumns.roomPoolData.roompool_3.pgoosData.field,
      header: Settings.tableColumns.roomPoolData.roompool_3.pgoosData.header,
      style: { minWidth: "55px" },
      optionnumber: 15,
      sortfield:
        Settings.tableColumns.roomPoolData.roompool_3.pgoosData
          .roomPoolSequence_1.pgoos.field,
      subHeader: [
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_1.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_1.pgoos.header,
          style: { minWidth: "100px" },
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                  .roomPoolSequence_1.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                  .roomPoolSequence_1.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_1.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_1.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_2.pgoos.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_2.pgoos.header,
          style: { minWidth: "100px" },
          inputType: {
            removeInputType: {
              type: Settings.inputType.removeModal,
              field:
                Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                  .roomPoolSequence_2.removalreasonid.field,
              label:
                Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                  .roomPoolSequence_2.removalreasonid.label,
            },
            isRemoval: true,
            type: Settings.inputType.checkbox,
            trueValue: "Y",
            falseValue: "N",
            initial_value_field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_1.removalreasonid.field,
            initial_label_field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_2.removalreason.field,
            initial_value: "",
            initial_label: "No Reason Provided",
          },
        },
        {
          field:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_2.removalreason.field,
          header:
            Settings.tableColumns.roomPoolData.roompool_3.pgoosData
              .roomPoolSequence_2.removalreason.header,
          inputType: {
            type: Settings.inputType.removeModal,
            field:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_2.removalreasonid.field,
            label:
              Settings.tableColumns.roomPoolData.roompool_3.pgoosData
                .roomPoolSequence_2.removalreasonid.label,
          },
          style: { minWidth: "195px" },
        },
      ],
    },
    {
      field: Settings.tableColumns.product_offered.field,
      header: Settings.tableColumns.product_offered.header,
      style: { minWidth: "125px" },
      optionnumber: 19,
      sortfield: Settings.tableColumns.product_offered.field,
    },
    {
      field: Settings.tableColumns.subsetname.field,
      header: Settings.tableColumns.subsetname.header,
      style: { minWidth: "125px" },
      optionnumber: 20,
      sortfield: Settings.tableColumns.subsetname.field,
    },
    {
      field: Settings.tableColumns.commissionable.field,
      header: Settings.tableColumns.commissionable.header,
      inputType: {
        type: Settings.inputType.checkbox,
        trueValue: "Y",
        falseValue: "N",
      },
      style: { minWidth: "35px" },
      optionnumber: 21,
      sortfield: Settings.tableColumns.commissionable.field,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { minWidth: "105px" },
      optionnumber: 16,
      sortfield: Settings.tableColumns.city.field,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { minWidth: "90px" },
      optionnumber: 17,
      sortfield: Settings.tableColumns.state.field,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { minWidth: "100px" },
      optionnumber: 18,
      sortfield: Settings.tableColumns.country.field,
    },
  ];

  const selectedRows = (dt) => {
    const t = dt.map((x) => {
      return {
        selected: false,
        marshacode: x.marshacode,
        hotelname: x.hotelname,
        hardcoded: x.hardcoded,
        roompool_1_accepted: x.roomPoolData.find((y) => y.roompool == 1)
          .accepted,
        roompool_1_rejectionreason: x.roomPoolData.find((y) => y.roompool == 1)
          .rejectionreason,
        roompool_1_rejectreasonid: x.roomPoolData.find((y) => y.roompool == 1)
          .rejectreasonid,

        roompool_2_accepted: x.roomPoolData.find((y) => y.roompool == 2)
          .accepted,
        roompool_2_rejectionreason: x.roomPoolData.find((y) => y.roompool == 2)
          .rejectionreason,
        roompool_2_rejectreasonid: x.roomPoolData.find((y) => y.roompool == 2)
          .rejectreasonid,

        roompool_3_accepted: x.roomPoolData.find((y) => y.roompool == 3)
          .accepted,
        roompool_3_rejectionreason: x.roomPoolData.find((y) => y.roompool == 3)
          .rejectionreason,
        roompool_3_rejectreasonid: x.roomPoolData.find((y) => y.roompool == 3)
          .rejectreasonid,

        roompool_1_lra: x.roomPoolData.find((y) => y.roompool == 1).lra,
        roompool_2_lra: x.roomPoolData.find((y) => y.roompool == 2).lra,
        roompool_3_lra: x.roomPoolData.find((y) => y.roompool == 3).lra,

        roompool_1_roomPoolSequence_1_pgoos: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .pgoos,
        roompool_1_roomPoolSequence_1_removalreason: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreason,
        roompool_1_roomPoolSequence_1_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreasonid,
        roompool_1_roomPoolSequence_2_pgoos: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .pgoos,
        roompool_1_roomPoolSequence_2_removalreason: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreason,
        roompool_1_roomPoolSequence_2_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 1)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreasonid,

        roompool_2_roomPoolSequence_1_pgoos: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .pgoos,
        roompool_2_roomPoolSequence_1_removalreason: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreason,
        roompool_2_roomPoolSequence_1_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreasonid,
        roompool_2_roomPoolSequence_2_pgoos: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .pgoos,
        roompool_2_roomPoolSequence_2_removalreason: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreason,
        roompool_2_roomPoolSequence_2_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 2)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreasonid,

        roompool_3_roomPoolSequence_1_pgoos: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .pgoos,
        roompool_3_roomPoolSequence_1_removalreason: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreason,
        roompool_3_roomPoolSequence_1_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 1)
          .removalreasonid,
        roompool_3_roomPoolSequence_2_pgoos: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .pgoos,
        roompool_3_roomPoolSequence_2_removalreason: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreason,
        roompool_3_roomPoolSequence_2_removalreasonid: x.roomPoolData
          .find((y) => y.roompool == 3)
          .hotelAccountSpecificPGOOSData.find((z) => z.roomPoolSequence == 2)
          .removalreasonid,

        product_offered: x.product_offered,
        subsetname: x.subsetname,
        commissionable: x.commissionable,
        city: x.city,
        state: x.state,
        country: x.country,
        hotelid: x.hotelid,
        hotelrfpid: x.hotelrfpid,
      };
    });
    setHotelList(t);
    return t;
  };

  const pgoosData = (item, pgoos, pool) => {
    if (pgoos.roomPoolSequence == 1) {
      if (
        item[`roompool_${pool}_roomPoolSequence_1_pgoos`] == "N" &&
        item[`roompool_${pool}_roomPoolSequence_1_removalreasonid`] != ""
      ) {
        pgoos["removalreason"] =
          item[`roompool_${pool}_roomPoolSequence_1_removalreason`];
        pgoos["removalreasonid"] =
          item[`roompool_${pool}_roomPoolSequence_1_removalreasonid`];
        pgoos["pgoos"] = item[`roompool_${pool}_roomPoolSequence_1_pgoos`];
      } else {
        pgoos["removalreasonid"] = null;
        pgoos["removalreason"] = null;
        pgoos["pgoos"] = "Y";
      }
    }
    if (pgoos.roomPoolSequence == 2) {
      if (
        item[`roompool_${pool}_roomPoolSequence_2_pgoos`] == "N" &&
        item[`roompool_${pool}_roomPoolSequence_2_removalreasonid`] != ""
      ) {
        pgoos["removalreason"] =
          item[`roompool_${pool}_roomPoolSequence_2_removalreason`];
        pgoos["removalreasonid"] =
          item[`roompool_${pool}_roomPoolSequence_2_removalreasonid`];
        pgoos["pgoos"] = item[`roompool_${pool}_roomPoolSequence_2_pgoos`];
      } else {
        pgoos["removalreasonid"] = null;
        pgoos["removalreason"] = null;
        pgoos["pgoos"] = "Y";
      }
    }
    return pgoos;
  };

  const roomPool = (item, roompool) => {
    if (roompool.roompool == 1) {
      if (
        item["roompool_1_rejectreasonid"] > 1 &&
        item["roompool_1_accepted"] == "N"
      ) {
        roompool["accepted"] = item["roompool_1_accepted"];
        roompool["rejectionreason"] = item["roompool_1_rejectionreason"];
        roompool["rejectreasonid"] = item["roompool_1_rejectreasonid"];
      } else {
        roompool["accepted"] = item["roompool_1_accepted"];
        roompool["rejectionreason"] = null;
        roompool["rejectreasonid"] = null;
      }
      roompool["hotelAccountSpecificPGOOSData"] = roompool[
        "hotelAccountSpecificPGOOSData"
      ].map((ha) => pgoosData(item, ha, 1));
      roompool["lra"] = item["roompool_1_lra"];
    }
    if (roompool.roompool == 2) {
      if (
        item["roompool_2_rejectreasonid"] > 1 &&
        item["roompool_2_accepted"] == "N"
      ) {
        roompool["accepted"] = item["roompool_2_accepted"];
        roompool["rejectionreason"] = item["roompool_2_rejectionreason"];
        roompool["rejectreasonid"] = item["roompool_2_rejectreasonid"];
      } else {
        roompool["accepted"] = item["roompool_2_accepted"];
        roompool["rejectionreason"] = null;
        roompool["rejectreasonid"] = null;
      }
      roompool["hotelAccountSpecificPGOOSData"] = roompool[
        "hotelAccountSpecificPGOOSData"
      ].map((ha) => pgoosData(item, ha, 2));
      roompool["lra"] = item["roompool_2_lra"];
    }
    if (roompool.roompool == 3) {
      if (
        item["roompool_3_rejectreasonid"] > 1 &&
        item["roompool_3_accepted"] == "N"
      ) {
        roompool["accepted"] = item["roompool_3_accepted"];
        roompool["rejectionreason"] = item["roompool_3_rejectionreason"];
        roompool["rejectreasonid"] = item["roompool_3_rejectreasonid"];
      } else {
        roompool["accepted"] = item["roompool_3_accepted"];
        roompool["rejectionreason"] = null;
        roompool["rejectreasonid"] = null;
      }
      roompool["hotelAccountSpecificPGOOSData"] = roompool[
        "hotelAccountSpecificPGOOSData"
      ].map((ha) => pgoosData(item, ha, 3));
      roompool["lra"] = item["roompool_3_lra"];
    }
    return roompool;
  };

  const replaceFields = (item, payload) => {
    payload["changed"] = "Y";
    payload["commissionable"] = item["commissionable"];
    payload["roomPoolData"] = payload["roomPoolData"].map((rpd) =>
      roomPool(item, rpd)
    );
    payload["acceptedRmPool1"] = null;
    payload["pgoosRmPool1"] = null;
    payload["removalReasonIdRmPool1"] = null;
    payload["rejectionReasonRmPool1"] = null;
    payload["acceptedRmPool2"] = null;
    payload["pgoosRmPool2"] = null;
    payload["removalReasonIdRmPool2"] = null;
    payload["rejectionReasonRmPool2"] = null;
    payload["acceptedRmPool3"] = null;
    payload["pgoosRmPool3"] = null;
    payload["removalReasonIdRmPool3"] = null;
    payload["rejectionReasonRmPool3"] = null;
    return payload;
  };

  const submit = async (params) => {
    //exclude MARSHA validations for accept and reject all
    const valid = ["rej_all_pro", "acc_all_pro"].includes(params.action)
      ? true
      : validateMarshaCode(params.textField);
    params.textField = params.textField.replace(/,\s*$/, "");
    params.textField = params.textField.replace(/[0-9]/g, "");
    if (valid) {
      let reasone = {};
      let h = [];
      let all = false;
      const n = params.textField
        .split(",")
        .filter(
          (x) => !hotelList.some((y) => y.marshacode == x.trim().toUpperCase())
        );
      if (!["rej_all_pro", "acc_all_pro"].includes(params.action) && n.length) {
        alert(`The following MARSHA codes were not found ${n.join(",")}`);
        params.textField = params.textField
          .split(",")
          .filter((x) =>
            hotelList.some((y) => y.marshacode == x.trim().toUpperCase())
          )
          .join(",");
      }
      if (
        ["rej_by_pro", "rej_all_pro", "up_rej_reas"].includes(params.action)
      ) {
        reasone = rejectionReasonList.find(
          (x) => x.rejectreasonid == params.rjReason
        );
      }
      if (["rej_by_pro", "acc_by_pro", "up_rej_reas"].includes(params.action)) {
        h = JSON.parse(
          JSON.stringify(
            params.textField
              .split(",")
              .map((x) =>
                hotelList.find((i) => i.marshacode == x.trim().toUpperCase())
              )
          )
        );
      }
      if (params.action == "acc_by_pro") {
        h = h.map((property) => {
          params.groups.reduce((acc, val) => {
            if (property[`roompool_${val}_accepted`]) {
              property[`roompool_${val}_accepted`] = "Y";
              property[`roompool_${val}_rejectionreason`] = null;
              property[`roompool_${val}_rejectreasonid`] = null;
              property[`selected`] = false;
            }
          }, {});
          return property;
        });
      }
      if (params.action == "rej_by_pro") {
        h = h.map((property) => {
          params.groups.reduce((acc, val) => {
            if (property[`roompool_${val}_accepted`]) {
              property[`roompool_${val}_accepted`] = "N";
              property[`roompool_${val}_rejectionreason`] =
                reasone["rejectionreason"];
              property[`roompool_${val}_rejectreasonid`] =
                "" + reasone["rejectreasonid"];
              property[`selected`] = false;
            }
          }, {});
          return property;
        });
      }
      if (params.action == "up_rej_reas") {
        h = h.map((property) => {
          params.groups.reduce((acc, val) => {
            if (property[`roompool_${val}_accepted`] == "N") {
              property[`roompool_${val}_rejectionreason`] =
                reasone["rejectionreason"];
              property[`roompool_${val}_rejectreasonid`] =
                "" + reasone["rejectreasonid"];
              property[`selected`] = false;
            }
          }, {});
          return property;
        });
      }
      if (params.action == "rej_all_pro") {
        h = JSON.parse(
          JSON.stringify(
            hotelList.map((property) => {
              [1, 2, 3].reduce((acc, val) => {
                if (
                  property[`roompool_${val}_accepted`] != null &&
                  !property.hardcoded
                ) {
                  property[`roompool_${val}_accepted`] = "N";
                  property[`roompool_${val}_rejectionreason`] =
                    reasone["rejectionreason"];
                  property[`roompool_${val}_rejectreasonid`] =
                    "" + reasone["rejectreasonid"];
                }
                property[`selected`] = false;
              }, {});
              return property;
            })
          )
        );
        all = true;
        RejectAll({
          accountrecid:
            storeRequestPayload.strFilterValues.accountFilter.accountrecid,
          period: storeRequestPayload.strFilterValues.year,
          strFilterValues: storeRequestPayload.strFilterValues,
          strPortfolioStatusList: handleAjaxSave(h),
          rejectionReasonID: h[0].roompool_1_rejectreasonid,
        });
      }
      if (params.action == "acc_all_pro") {
        h = JSON.parse(
          JSON.stringify(
            hotelList.map((property) => {
              [1, 2, 3].reduce((acc, val) => {
                if (
                  property[`roompool_${val}_accepted`] != null &&
                  !property.hardcoded
                ) {
                  property[`roompool_${val}_accepted`] = "Y";
                }
                property[`roompool_${val}_rejectionreason`] = null;
                property[`roompool_${val}_rejectreasonid`] = null;
                property[`selected`] = false;
              }, {});
              return property;
            })
          )
        );
        all = true;
        AcceptAll({
          accountrecid:
            storeRequestPayload.strFilterValues.accountFilter.accountrecid,
          period: storeRequestPayload.strFilterValues.year,
          strFilterValues: storeRequestPayload.strFilterValues,
          strPortfolioStatusList: handleAjaxSave(h),
        });
      }
      setHotelList(
        hotelList.map((x) => {
          if (h.find((y) => y.marshacode == x.marshacode)) {
            x = h.find((y) => y.marshacode == x.marshacode);
            // x["selected"] = true;
          }
          return x;
        })
      );
      setState({ propertyList: h, showQuickSelect: false, all });
      setSelectedProperties(_.cloneDeep(h));
    }
  };

  useEffect(() => {
    if (selectedProperties.length > 0) {
      const indices = [];
      if (hotelList.length > 0) {
        hotelList.map((f, ind) => {
          selectedProperties.map((s) => {
            if (s.marshacode == f.marshacode) {
              indices.push(ind);
            }
          });
        });

        if (indices.length > 0) {
          indices.map((i) => {
            const el1 = document.getElementById("row_" + i);
            el1.classList.add(styles.selectClassNew);
            const el2 = document.getElementById("ppeRow_" + i);
            el2.classList.add(styles.selectClassNew);
          });
          appContext.setactiveRowPortfolio(null);
          appContext.setportfolioAcceptanceQuickSelect(true);
          setPortfolioSelectionQuickSelectIndices(_.cloneDeep(indices));
        }
      }
    } else {
      appContext.setportfolioAcceptanceQuickSelect(false);
      setPortfolioSelectionQuickSelectIndices([]);
    }
  }, [selectedProperties]);

  const validateMarshaCode = (param) => {
    let bOK = true;

    let thelist = param;

    thelist = thelist.replace(/[^a-zA-Z,]/g, "");

    if (bOK) {
      const re = /^[a-zA-Z\,]/;
      if (!re.test(thelist)) {
        bOK = false;
        setalertModalForCommaValidate(true);
      }
    }

    if (thelist.length > 1200) {
      setalertModalFor200Limit(true);
      bOK = false;
    }

    return bOK;
  };

  const handleAjaxSave = (item) => {
    let payload = [];
    if (Array.isArray(item)) {
      payload = item.map((it) =>
        replaceFields(
          it,
          panelData.portfolioStatusList.find(
            (x) => it.marshacode == x.marshacode
          )
        )
      );
    } else {
      payload = [
        replaceFields(
          item,
          panelData.portfolioStatusList.find(
            (x) => item.marshacode == x.marshacode
          )
        ),
      ];
    }
    return payload;
  };
  const onSave = () => {
    setLoader(true);
    const data = panelData.portfolioStatusList[0];

    const recid =
      storeRequestPayload.strFilterValues.accountFilter.accountrecid;
    const strportfoliolst = [
      {
        changed: data.changed === null ? "N" : "Y",
        roomPoolData: [
          {
            accepted: data.roomPoolData[0].accepted,
            roompool: data.roomPoolData[0].roompool,
            hotelAccountSpecificPGOOSData: [
              {
                pgoos:
                  data.roomPoolData[0].hotelAccountSpecificPGOOSData[0]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[0].hotelAccountSpecificPGOOSData[0]
                        .pgoos,
              },
              {
                pgoos:
                  data.roomPoolData[0].hotelAccountSpecificPGOOSData[1]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[0].hotelAccountSpecificPGOOSData[1]
                        .pgoos,
              },
            ],
          },
          {
            accepted: data.roomPoolData[1].accepted,
            roompool: data.roomPoolData[1].roompool,
            hotelAccountSpecificPGOOSData: [
              {
                pgoos:
                  data.roomPoolData[1].hotelAccountSpecificPGOOSData[0]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[1].hotelAccountSpecificPGOOSData[0]
                        .pgoos,
              },
              {
                pgoos:
                  data.roomPoolData[1].hotelAccountSpecificPGOOSData[1]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[1].hotelAccountSpecificPGOOSData[1]
                        .pgoos,
              },
            ],
          },
          {
            accepted: data.roomPoolData[2].accepted,
            roompool: data.roomPoolData[2].roompool,
            hotelAccountSpecificPGOOSData: [
              {
                pgoos:
                  data.roomPoolData[2].hotelAccountSpecificPGOOSData[0]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[2].hotelAccountSpecificPGOOSData[0]
                        .pgoos,
              },
              {
                pgoos:
                  data.roomPoolData[2].hotelAccountSpecificPGOOSData[1]
                    .pgoos === null
                    ? "N"
                    : data.roomPoolData[2].hotelAccountSpecificPGOOSData[1]
                        .pgoos,
              },
            ],
          },
        ],
        city: data.city,
        commissionable: data.commissionable,
        country: data.country,
        hotelid: data.hotelid,
        hotelname: data.hotelname,
        hotelrfpid: data.hotelrfpid,
        marshacode: data.marshacode,
        maxAcctRoomPool: data.maxAcctRoomPool,
        nopricing: data.nopricing,
        product_offered: data.product_offered,
        ratetype_selected: data.ratetype_selected,
        readonly: data.readonly,
        regionid: data.regionid,
        selected: data.selected,
        state: data.state,
        subsetname: data.subsetname,
        volunteered: data.volunteered,
      },
    ];
    API.updatePortFolio(recid, strportfoliolst)
      .then((res) => {
        setLoader(false);
        getPortfolioStatusList(storeRequestPayload);
      })
      .catch((error) => {
        setLoader(false);
      });
  };
  const AjaxSave = (payload) => {
    ajaxSave({
      accountrecid:
        storeRequestPayload.strFilterValues.accountFilter.accountrecid,
      rawSaveData: payload,
    });
  };

  const quickSelectObject = {
    textField:
      Array.isArray(hotelList) &&
      hotelList
        .filter((x) => x.selected)
        .map((x) => x.marshacode)
        .join(","),
    componentName: "portfolioAcceptance",
    label: "Hotel List:",
    textareaId: "adas",
    rows: 12,
    cols: 111,
    textareaName: "asda",
    rejectionReasonList: rejectionReasonList,
  };

  function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    if (
      property === "roompool_1_accepted" ||
      property === "roompool_2_accepted" ||
      property === "roompool_3_accepted"
    ) {
      return function (a, b) {
        if (a[property] === b[property]) return 0;
        else if (a[property] === null) return 1;
        else if (b[property] === null) return -1;
        else if (a[property] === "Y" && b[property] === "N") return 1;
        else if (a[property] === "Y" && b[property] === "P") return -1;
        else if (a[property] === "N" && b[property] === "Y") return -1;
        else if (a[property] === "N" && b[property] === "P") return -1;
      };
    } else {
      return function (a, b) {
        if (a[property] === b[property]) return 0;
        else if (a[property] === null) return 1;
        else if (b[property] === null) return -1;
        else return a[property].localeCompare(b[property]) * sortOrder;
      };
    }
  }

  const sortList = (orderBy, field) => {
    if (field) {
      const t = hotelList.sort(dynamicSort(field));
      setHotelList(t);
      setRefresh(Math.random());
    }
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.SubContainer}>
          <CModal
            title={Settings.quickSelect}
            onClose={(e) => {
              setState({ ...state, showQuickSelect: false });
            }}
            show={state.showQuickSelect}
            xPosition={-200}
            yPosition={-200}
          >
            <Suspense fallback={<CSuspense />}>
              <QuickSelect
                quickSelectObject={quickSelectObject}
                save={(e) => submit(e)}
                cancel={(e) => {
                  setState({ ...state, showQuickSelect: false });
                }}
              />
            </Suspense>
          </CModal>
          <CModal
            title={Settings.alertMessage}
            onClose={(e) => {
              setalertModalFor200Limit(false);
            }}
            show={alertModalFor200Limit}
            xPosition={-120}
            yPosition={-100}
            closeImgTitle={Settings.okClose}
          >
            <div style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}>
              {Settings.enter200Hotels}
            </div>
          </CModal>
          <CModal
            title={Settings.alertMessage}
            onClose={(e) => {
              setalertModalForCommaValidate(false);
            }}
            show={alertModalForCommaValidate}
            xPosition={-100}
            yPosition={-100}
            closeImgTitle={Settings.okClose}
          >
            <div style={{ maxWidth: 270, minWidth: 200, padding: "9px 12px" }}>
              {Settings.marshacodeSeparatedByComma}
            </div>
          </CModal>
          <CModal
            class={"qspopup"}
            title={"Alert Message"}
            onClose={(e) => setShowMaxAlert(false)}
            show={showMaxAlert}
            xPosition={-250}
            yPosition={-0}
          >
            <div style={{ margin: "10px" }}>
              Cannot show more than 500 entries and there are currently{" "}
              {totalRecord} entries in this result. Please adjust filters and
              try again
            </div>
          </CModal>
          <div>
            <span className={styles.PAheader}>
              Pricing : Portfolio Acceptances
            </span>
            <hr></hr>
          </div>
          <div className={styles.pacceptence}>
            <div className={classNames(styles.fullHeight, styles.filterpanel)}>
              <Filter
                componentName="PortfolioAcceptance"
                getPanelData={getPortfolioStatusList}
                numItems={
                  isMakingRequest
                    ? "Loading..."
                    : panelData?.portfolioStatusList?.length
                }
                findFilters={FindFilterData}
                showOptions={showFilterOptions}
                numItemsSelected={null}
                isAccountRequired={true}
                setRequestPayload={setStoreRequestPayload}
                filterViewLists={Settings.api.getPortfolioFilterViewList}
                height={445}
              />
            </div>
            <div className={styles.rightgridtable}>
              <div className={styles.quickButton}>
                <a
                  href="javascript:void(0);"
                  style={{ fontWeight: "bold", margin: "0 0 0 24px" }}
                  onClick={() =>
                    storeRequestPayload &&
                    storeRequestPayload.strFilterValues &&
                    storeRequestPayload.strFilterValues.accountFilter &&
                    storeRequestPayload.strFilterValues.accountFilter
                      .accountrecid
                      ? setState({ ...state, showQuickSelect: true })
                      : ""
                  }
                >
                  {Settings.qickSelectLabel}
                </a>
              </div>
              <div>
                <div className={styles.saveImg}>
                  {panelData?.portfolioStatusList?.length === 1 && (
                    <img
                      src={btnSave}
                      onClick={() => {
                        onSave();
                      }}
                    />
                  )}
                </div>

                {showloader ? (
                  <img className={styles.loaderImg} src={screenLoader}></img>
                ) : (
                  ""
                )}
                <PortfolioGrid
                  key={refresh}
                  handleOrderChange={(orderBy, field) =>
                    sortList(orderBy, field)
                  }
                  gridColumns={gridColumns}
                  rejectionReasonList={[
                    { rejectionreason: "", rejectreasonid: "" },
                    ...rejectionReasonList,
                  ]}
                  removalReasonList={[
                    { removalreason: "", removalreasonid: "" },
                    ...removalReasonList,
                  ]}
                  ajaxSave={(i) => AjaxSave(handleAjaxSave(i))}
                  ajaxIsMakingRequest={ajaxIsMakingRequest}
                  isMakingRequest={isMakingRequest}
                />
              </div>
            </div>
          </div>
        </div>
        <style>{`
       #filterdiv{
          height:calc(100vh - 135px) !important;
      }
      #loading{
        text-align: center;
        display: inline;
        position: fixed;
        width: calc(100vw - 300px) !important;
        height: calc(100vh - 180px) !important;
        top: 163px !important;
      }
      
      `}</style>
      </div>
    </>
  );
};
