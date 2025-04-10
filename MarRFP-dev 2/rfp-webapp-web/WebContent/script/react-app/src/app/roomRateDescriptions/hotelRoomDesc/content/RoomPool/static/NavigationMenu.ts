export const getTabPanel = [
  {
    moduleName: "RoomDescription",
    pages: [
      {
        label: "Select Hotel",
        componentName: "selectHotelComponent",
        link: `/roomdefhotelselect/select`,
        isSelected: false,
        isDisplay: "always",
      },
      {
        label: "Select Room Pool",
        componentName: "selectRoomPool",
        link: `/roomdefhotelselect/selectRoomPool`,
        isSelected: false,
        isDisplay: "always",
      },
      {
        label: "ExactPoolName",
        componentName: "ExactPoolName",
        isSelected: false,
        isDisplay: "conditional",
      },
      {
        label: "Select Rate Program",
        componentName: "selectRateProgram",
        link: `/roomdefhotelselect/selectRateProgram`,
        isSelected: false,
        isDisplay: "conditional",
      },
      {
        label: "ExactRateProgramName",
        componentName: "ExactRateProgramName",
        link: `/roomdefhotelselect/ExactRateProgramName`,
        isSelected: false,
        isDisplay: "conditional",
      },
      {
        label: "Finish and Save",
        isSelected: false,
        isDisplay: "conditional",
      },
    ],
  },
  {
    moduleName: "DescriptionInformation",
    pages: [
      {
        label: "Overview",
        link: "",
        isSelected: false,
      },
      {
        label: "Worksheet",
        link: "",
        isSelected: false,
      },
      {
        label: "Instructions",
        link: "",
        isSelected: false,
      },
      {
        label: "FAQ",
        link: "",
        isSelected: false,
      },
    ],
  },
];
