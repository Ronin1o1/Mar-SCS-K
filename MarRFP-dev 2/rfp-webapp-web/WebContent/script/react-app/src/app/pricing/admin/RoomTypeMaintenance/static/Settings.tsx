const Settings = {
  api: {
    getRoomTypeList: "/roomtypemaintenance/getRoomTypes.action",
    getRoomType: "/roomtypemaintenance/getRoomTypes.action",
    getEditRoomtype: "/roomtypemaintenance/getEditRoomtype.action",
    updateRoomtype: "/roomtypemaintenance/updateRoomtype.action",
    deleteRoomtype: "/roomtypemaintenance/deleteRoomtype.action",
    roomTypeMaintance: "/roomtypemaintenance/view.action",
  },
  labelForNo: "N",
  labelForYes: "Y",
  labelFor80: 80,
  labelFor40: 40,
  roomTypeMaintenanceList: {
    NewImgAltText: "New Button",

    yesNoList: [
      {
        shortValue: "Y",
        description: "Yes",
      },
      {
        shortValue: "N",
        description: "No",
      },
    ],

    accountViewable: {
      key: "shortValue",
      value: "description",
    },
    tableColumns: {
      id: {
        field: "roomTypeMaintenance",
      },
      roomTypeName: {
        field: "roomTypeName",
        header: "Roomtype Name",
      },
      viewableByHotels: {
        field: "viewableByHotels",
        header: "Viewable</br>by Hotels",
      },
    },
  },
  editRoomTypeMaintenanceList: {
    title: "Edit Room Type",
    formFields: {
      editRoomTypeName: {
        id: "roomtype.roomtype",
        label: "Roomtype Name",
      },
      editViewableByHotels: {
        id: "roomtype.roomtype_view",
        label: "Viewable by Hotels",
      },
    },
    updateBtnAltText: "Update",
  },
  labels: {
    pageHeading: "Pricing Administration : Room Type Maintenance",
  },
  alertMessage: "Please enter a room type name to continue.",
};
export default Settings;
