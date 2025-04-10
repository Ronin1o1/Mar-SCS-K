const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getSelectHotelList: "/roomtypenamehotelselect/getRDHotelSelect.action",
    getRateProgramList: "/roomdefhotelrateprogram/getDefRatePrograms.action",
    getRoomPoolView: "/roomdefhoteldefinition/getHotelRoomDefDefinition.action",
    updateDefinition: "/roomtypenamehoteldefinition/updateDefinition",
  },
  routingUrl: {
    defineRoomName: "/getRoomNameDefine",
    getRoomPools: "/getRoomPools",
    defineRoomNamePath: "/roomtypenamehotelselect/getRoomNameDefine",
    finishProduct: "/finishProduct",
    finishProductPath: "/roomtypenamehotelselect/finishProduct",
    SelectFormattedRoomNames: "MasterFormattedRoomNames",
  },
  queryParam: {
    marshaCode: "?marshaCode=",
    roomPool: "&roomPool=",
    hotelName: "&hotelName=",
    screenId: "&screenid=",
  },
  rateProgramHeader: "Room Pool Description: Hotel - Rate Program List",
  rateProgramInstruction: "This is an optional feature.",
  hotelrateProgramInstruction:
    "Rate Programs default to the Room Pool Description. The Rate Program Description allows properties to create a rate program specific room pool description using a sub-set of the room pool description room element. This feature is limited to rate programs qualified as packages. Up to package rate programs per room pool may be defined using a sub-set of the room pool description elements. Only package rate programs in sell strategy and Escape romance and family packages should use this functionality.",
  hotelrateProgramInstructionbelow:
    "Use the View button to select a rate program. Navigate by clicking Next or Previous at the top of each section, or use the left hand navigation to skip to another section. Yellow triangles indicate an update is required. Follow the yellow triangles to verify the room pool has the correct information. Changes are automatically saved and are available immediately in MARSHA",
  parentRoute: "/roomdefhotelselect",
};
export default Settings;
