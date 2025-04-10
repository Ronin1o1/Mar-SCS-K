export interface IAccountDetailGeneral {
  accountid: number;
  accountname: string;
  accountpricingtype: string;
  accountrecid: number;
  accounttypedescription: string;
  duedate: string;
  groupmeetings: string;
  hotel_display: string;
  period: number;
  top_account: string;
  accountpricingcycleid: number;
  accounttype: string;
  account_hotel_view: string;
  account_tracking_only: string;
  aer_account: string;
  aer_accountname: string;
  aerportfolio: string;
  altcancelpolicyid: number;
  altcancelpolicynotes: string;
  altcancelpolicytimeid: number;
  altcancelpolicyoptionid: number;
  bt_booking_cost: string;
  commdef_acct: string;
  commdef_tier: string;
  contractend: Date;
  contractstart: Date;
  default_percent: number;
  discfirsttieronly: string;
  gpploiagreementonfile: string;
  gov_account: string;
  govaccountcanchange: string;
  govvpproductenabled: string;
  perdiemadjustmentsallowed: string;
  hasRecs: string;
  hasportfolio: string;
  hotel_display_date: string;
  isaccountactive: boolean;
  nextcontractstart: string;
  nosquatter: string;
  offcycle: string;
  offcycleaccountcanchange: string;
  offcycleaccountcanchangeend: string;
  offcycle_numseasons: number;
  prevcontractend: string;
  pricingperiodid: number;
  rpgm_accountname: string;
  rfppulldate: string;
  remindersdate: string;
  passubmissiondate: string;
  clientduedate: string;
  weblocked: string;
  acctwifipolicyid: string;
  cbcduedate: string;
  allowEnhanced: string;
  enhancedDiscount: number;
  enhancedDiscountGpp: number;
  accountThirdPartyRegion: Array<IAccountThirdPartyRegion>;
  strAccountrecid: string;
}

export interface IAccountThirdPartyRegion {
  account_thirdpartyregion: any;
  account_thirdparty_ref_id: any;
  account_thirdpartyregionid: any;
}
