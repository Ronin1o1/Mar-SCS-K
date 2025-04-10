interface ICentralAccountPricingRegistration {
  accountID: number;
  accountLeadName: string;
  accountLeadPhoneNumber: string;
  accountLeadEmail: string;
  accountName: string;
  accountWebsite: string;
  accountSegment: string;
  btRoomNightSpan: string;
  clientPreferredName: string;
  clientDueDate: string;
  commrates: string;
  desiredPricingDueDate: string;
  eid: string;
  expectedRoomNightProduction: string;
  flatrates: string;
  haspriorprice: string;
  gdsRateLoadingInstructions: string;
  loginIdReceived: string;
  marRFPpriorSeason: string;
  otherthirdpartyname: string;
  salesRegionID: number;
  thirdPartyRFPTool: string;
  threeOrMoreProperties: string;
  utilThirdParty: string;
}

// eid: "absil272",
// accountLeadPhone: "610-521-8165",
// accountLeadEmail: "allyson.silver@marriott.com",
// accountID: "1881",
// accountName: "",
// clientPreferredName: "Name",
// accountUrl: "Website",
// accountType: "A",
// salesRegionID: 9,
// haspriorprice: "Y",
// utilThirdParty: "N",
// thirdPartyId: 0,
// otherthirdpartyname: "",
// loginIdReceived: "",
// solicitPricing: "No",
// reasonToPrice: "G",
// btRoomNightSpan: "Y",
// roomNight: 3,
// rateLoadInstr: "Y",
// pricingperiodid: 3944,
// clientDueDate: "11/22/2022",
// regPeriod: 2022

interface IPricingCircumstance {
  twoYearPricing: boolean;
  offCyclePricing: boolean;
  commisionableRates: boolean;
  flatRates: boolean;
}

interface ICentralAccountRegistry {
  aaes: IAAES[];
  accountSegmentList: IAccountSegmentList[];
  contactemail: string;
  contactname: string;
  dueDateList: [];
  salesRegionList: ISalesRegionList[];
  thirdPartes: IThirdParties[];
}

interface IAccountSegmentList {
  accounttype: string;
  accounttypedescription: string;
  defaultcom?;
}

interface IAAES {
  areacitycode: null;
  countrycode: null;
  eid: string;
  email: string;
  faxnumber: string;
  mae?;
  linkedAccounts?;
  linkedHotels?;
  personname: string;
  persontitle: string;
  phonenumber: string;
  primaryContact: string;
  primaryContact2: string;
  salesHotelSel: string;
  salesHotelNotSel: string;
  salesHotelSel2: string;
  saleslocationid: string;
  salesregionid: string;
  salesrespondentid: string;
  salestypeid?;
}

interface ISalesRegionList {
  salesregionid: number;
  salesregion: string;
}

interface IThirdParties {
  account_thirdparty: string;
  account_thirdparty_refid: number;
}

export type {
  ICentralAccountPricingRegistration,
  IAAES,
  ISalesRegionList,
  IAccountSegmentList,
  ICentralAccountRegistry,
};
