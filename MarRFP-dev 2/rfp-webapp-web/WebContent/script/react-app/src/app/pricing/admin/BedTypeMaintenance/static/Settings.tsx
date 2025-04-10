const Settings = {
  api: {
    getBedTypeList: "/bedtypemaintenance/getBedTypes.action",
    updateBedType: "/bedtypemaintenance/updateBedtype.action",
    deleteBedType: "/bedtypemaintenance/deleteBedtype.action",
  },
  labelN: "N",
  labelFor80: 80,
  labelFor40: 40,
  pageTitle: "Pricing Administration : Bed Type Maintenance",
  bedTypeMaintenanceList: {
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
        field: "bedTypeMaintenance",
      },
      bedTypeName: {
        field: "bedTypeName",
        header: "Bedtype Name",
      },
      viewableByHotels: {
        field: "viewableByHotels",
        header: "Viewable</br>by Hotels",
      },
    },
  },
  editBedTypeMaintenanceList: {
    title: "Edit Bed Type",
    formFields: {
      editBedTypeName: {
        id: "bedtype.bedtype",
        label: "Bedtype Name",
      },
      editViewableByHotels: {
        id: "bedtype.bedtype_view",
        label: "Viewable by Hotels",
      },
    },
    updateBtnAltText: "Update",
  },
  alertMessage: "Please enter a bed type name to continue.",
};
export default Settings;
