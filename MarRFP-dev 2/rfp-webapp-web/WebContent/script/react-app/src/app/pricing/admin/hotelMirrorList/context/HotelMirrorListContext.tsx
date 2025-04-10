import React, { useEffect, useState } from "react";
import API from "../service/API";
import Utils from "../../../../common/utils/Utils";
// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const HotelMirrorListContext = React.createContext({});

export const HotelMirrorListContextProvider = (props) => {
  const [state, setState] = useState({
    hotelMirrorList: [],
    showModal: false,
    renderLoading: null,

    mirrorSearchCriteria: {
      filterType: "ALL",
      filterString: "",
      orderby: 0,
      page: 1,
      totalPages: 0,
    },
    rateEntities: {
      roomPool: [],
      priorityTag: [],
      rateProgram: [],
    },
    rateEntitiesObject: [],
    rateTypeDropdown: [{ id: -1, name: "" }],
  });
  const [rateOfferNames, setRateOfferNames] = useState([]);
  const [updateExistingData, setUpdateExistingData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [radioCheck, setRadioCheck] = useState("");
  const [rateTypeDropdown, setRateTypeDropdown] = useState([]);
  const [pNumber, setPNumber] = useState(1);
  const [updateMirrorStale, setUpdateMirrorDataStale] = useState({
    rateType: -1,
    rateOfferId: 0,
    rateOfferName: "",
    rateEntity: -1,
    rateProgramCode: "",
    notes: "",
  });
  const [resetInput, setResetInput] = useState(false);

  const setHotelMirrorListData = (data: any, closeModal?: boolean) => {
    if (data) {
      setState({
        ...state,
        showModal: closeModal ? !state.showModal : state.showModal,
      });
    }
  };

  useEffect(() => {
    handleResetUpdateMirrorData();
  }, []);

  const handleGetHotelMirrorList = (pageNumber = 1) => {
    setState({
      ...state,

      mirrorSearchCriteria: {
        ...state.mirrorSearchCriteria,
        filterType: "dfdfdfdfsdfs",
      },
    });
    setIsUpdateLoader(true);
    API.getHotelMirrorListFilter(state.mirrorSearchCriteria, pageNumber).then(
      (data) => {
        setState({
          ...state,
          hotelMirrorList: data.mirrorList,
          mirrorSearchCriteria: {
            ...state.mirrorSearchCriteria,
            totalPages: data.totalPages,
          },
        });
        setIsUpdateLoader(false);
      }
    );
  };

  const validate = (event) => {
    const { value } = event.target;
    Utils.checkMaxChar(value, 255);
  };

  const handleSearch = (pageNumber = 1) => {
    setIsUpdateLoader(true);
    setState({
      ...state,

      mirrorSearchCriteria: {
        ...state.mirrorSearchCriteria,
        filterType: "dfdfdfdfsdfs",
      },
    });

    API.getHotelMirrorListFilter(state.mirrorSearchCriteria, pageNumber).then(
      (data) => {
        setIsUpdateLoader(false);
        setState({
          ...state,
          hotelMirrorList: data.mirrorList,

          mirrorSearchCriteria: {
            ...state.mirrorSearchCriteria,
            filterType:
              state.mirrorSearchCriteria.filterString === ""
                ? "ALL"
                : state.mirrorSearchCriteria.filterType,
            totalPages: data?.totalPages,
          },
        });
      }
    );
  };

  const handleDeleteHotelMirror = (id: number) => {
    setIsUpdateLoader(true);
    API.deleteHotelMirrorList(id).then((data) => {
      handleSearch();
    });
  };

  const handleGeltRateOfferNames = (postData) => {
    if (postData.rateTypeId === -1) {
      setRateOfferNames([]);
    } else {
      API.findRateOffers(postData).then((data) => {
        const firstOption = [
          { rateOfferId: -1, rateOfferName: "Select Rate Offer" },
        ];
        setRateOfferNames([...firstOption, ...data.items]);
      });
    }
  };

  const getRoomPoolData = (data) => {
    const roomPoolData: any[] = [
      {
        rateEntityId: -1,
        roomPoolCode: "-- RE# RoomPool --",
      },
    ];
    data.forEach((item: any, index) => {
      roomPoolData.push({
        rateEntityId: item.propertyRateEntityId,
        roomPoolCode: `#${item.propertyRateEntityId} ${item.roomPoolCode}`,
      });
    });

    return roomPoolData;
  };

  const getPriorityTagData = (data) => {
    const priorityTagData: any[] = [
      {
        rateEntityId: -1,
        priorityTag: "-- Room Pool Classification/Pricing Type/Tag/RE3 --",
      },
    ];
    data.forEach((item) => {
      priorityTagData.push({
        rateEntityId: item.propertyRateEntityId,
        priorityTag: `${item.roomPoolClassification}/${item.pricingType}/${item.priorityTag}/${item.propertyRateEntityId}`,
      });
    });
    return priorityTagData;
  };

  const getRateProgramData = (data) => {
    const rateProgramData: any[] = [
      {
        rateEntityId: -1,
        rateProgram: "-- RE# Rate Program --",
      },
    ];
    data.forEach((item) => {
      rateProgramData.push({
        rateEntityId: item.propertyRateEntityId,
        rateProgram: `#${item.propertyRateEntityId} ${item.rateProgram}`,
      });
    });
    return rateProgramData;
  };

  const getRateEntitiesById = (rateEntityId: string) => {
    return state.rateEntitiesObject.find((element) => {
      return element.propertyRateEntityId === parseInt(rateEntityId);
    });
  };

  const handleGeltRateEntities = (postData) => {
    if (postData.rateTypeId === -1) {
      setState({
        ...state,
        rateEntities: {
          roomPool: [],
          priorityTag: [],
          rateProgram: [],
        },
      });
    } else {
      API.findRateEntities(postData)
        .then((data) => {
          setState({
            ...state,
            rateEntities: {
              ...state.rateEntities,
              roomPool: getRoomPoolData(data.items),
              priorityTag: getPriorityTagData(data.items),
              rateProgram: getRateProgramData(data.items),
            },
            rateEntitiesObject: data.items,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setState({
            ...state,
            rateEntities: {
              roomPool: getRoomPoolData([]),
              priorityTag: getPriorityTagData([]),
              rateProgram: getRateProgramData([]),
            },
          });
        });
    }
  };

  const handleResetUpdateMirrorData = () => {
    setRateOfferNames([]);
    setUpdateExistingData({});
    setIsLoading(false);
    setRadioCheck("");
    setUpdateMirrorDataStale({
      rateType: -1,
      rateOfferId: 0,
      rateOfferName: "",
      rateEntity: -1,
      rateProgramCode: "",
      notes: "",
    });
    setState({
      ...state,
      rateEntities: {
        roomPool: [],
        priorityTag: [],
        rateProgram: [],
      },
    });
  };

  const updateMirrorData = (postData: any) => {
    setIsUpdateLoader(true);
    API.updateMirror(postData).then((data) => {
      handleSearch(pNumber);
    });
  };

  const getRateTypDrodownlist = (data) => {
    setRateTypeDropdown([...[{ id: -1, name: "" }], ...data.rateTypeList]);
  };

  const getUpdateMirrorData = async (itemData: any) => {
    setIsLoading(true);
    API.getExistingUpdateData(itemData)
      .then((data) => {
        let rateType = 0;
        let rateOfferId = 0;
        let rateEntity = 0;
        let rateProgramCode = "";
        let rateOfferName = "";
        const mirrorRoom =
          data.mirrorDetail.mirrorRoomClassList[0].mirrorRoomPoolList[0];
        if (itemData.mirrorType === "P") {
          rateType = mirrorRoom.priceratetypeid;
          rateOfferId = mirrorRoom.priceRateOfferId;
          rateEntity = mirrorRoom.priceRateEntityId;
          rateProgramCode = mirrorRoom.priceRateProgramCode;
          rateOfferName = mirrorRoom.priceRateOfferName;
        } else {
          rateType = mirrorRoom.restrictionratetypeid;
          rateOfferId = mirrorRoom.restrictionRateOfferId;
          rateEntity = mirrorRoom.restrictionRateEntityId;
          rateProgramCode = mirrorRoom.restrictionRateProgramCode;
          rateOfferName = mirrorRoom.restrictionRateOfferName;
        }
        if (rateOfferId > 0) {
          setUpdateMirrorDataStale({
            ...updateMirrorStale,

            rateType,
            rateOfferId,
            rateProgramCode,
            rateOfferName,
            rateEntity,
            notes: data.mirrorDetail.mirror_exception_notes,
          });
          /* setUpdateExistingData(
            Object.assign(data, {
              rateTypeId,
              rateOfferId,
              rateEntityId,
              rateProgramCode,
              offerName,
              offerID,
              notes: data.mirrorDetail.mirror_exception_notes,
            })
          ); */
          setRadioCheck("rateProgram");
          getRateTypDrodownlist(data);
          handleGeltRateOfferNames({
            hotelid: data.mirrorDetail.hotelid,
            rateTypeId: rateType,
          });
          handleGeltRateEntities({
            hotelid: data.mirrorDetail.hotelid,
            rateOfferId,
          });
        } else {
          setUpdateMirrorDataStale({
            ...updateMirrorStale,
            notes: data.mirrorDetail.mirror_exception_notes,
          });
          getRateTypDrodownlist(data);

          setIsLoading(false);
        }

        return data;
      })
      .catch((errr) => {
        console.debug("errr", errr);
      });
  };

  const handleResetEntityData = () => {
    setUpdateMirrorDataStale({
      ...updateMirrorStale,
      rateEntity: -1,
    });
  };

  const handleResetRateType = () => {
    setUpdateExistingData({
      ...updateExistingData,
      rateTypeId: -1,
      rateOfferId: null,
    });
  };

  const handleResetRateOffer = () => {
    setUpdateExistingData({
      ...updateExistingData,
      rateOfferId: -1,
    });
  };
  const hotelMirrorListContext = {
    state,
    rateOfferNames,
    updateExistingData,
    isLoading,
    radioCheck,
    rateTypeDropdown,
    updateMirrorStale,
    resetInput,
    setRateTypeDropdown,
    setRadioCheck,
    setIsLoading,
    setState,
    setHotelMirrorListData,
    handleSearch,
    handleGetHotelMirrorList,
    handleDeleteHotelMirror,
    handleGeltRateOfferNames,
    handleGeltRateEntities,
    handleResetUpdateMirrorData,
    getRateEntitiesById,
    updateMirrorData,
    getUpdateMirrorData,
    handleResetEntityData,
    handleResetRateType,
    handleResetRateOffer,
    setUpdateMirrorDataStale,
    validate,
    setResetInput,
    pNumber,
    setPNumber,
    isUpdateLoader,
    setIsUpdateLoader,
  };

  return (
    <HotelMirrorListContext.Provider value={hotelMirrorListContext}>
      {props.children}
    </HotelMirrorListContext.Provider>
  );
};

export const HotelMirrorListContextConsumer = HotelMirrorListContext.Consumer;
export default HotelMirrorListContext;
