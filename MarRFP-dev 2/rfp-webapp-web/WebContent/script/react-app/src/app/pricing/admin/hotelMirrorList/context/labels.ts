export const labels = {
  pageHeading: "Pricing Administration : Hotel Mirror List",
  isNewType: "Retail Rate, Priority 1, 7 Day",
  updateMirror: {
    legends: {
      OfferLegend: "Rate Offer Name",
      entityLegend: "Rate Entity",
    },
    formFields: {
      label: {
        rateType: "Rate Type:",
        offerName: "Rate Offer Name:",
        roomPool: "Room Pool",
        priorityTag: "Priority Tag",
        rateProgram: "Rate Program",
        notes: "Notes:",
      },
    },
    rateType: [
      { id: -1, name: "" },
      { id: 0, name: "Regular" },
      { id: 1, name: "Business" },
      { id: 2, name: "Discount" },
      { id: 3, name: "Package" },
      { id: 4, name: "Group" },
      { id: 5, name: "Wholesaler" },
    ],
    roomPool: ["-- RE# RoomPool --"],
    priorityTag: ["-- Room Pool Classification/Pricing Type/Tag/RE3 --"],
    rateProgram: ["-- RE# Rate Program --"],
  },
};
