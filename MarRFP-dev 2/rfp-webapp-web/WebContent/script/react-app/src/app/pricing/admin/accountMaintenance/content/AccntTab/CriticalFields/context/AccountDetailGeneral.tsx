import { IAccountDetailGeneral } from "./IAccountDetailGeneral";
import { IAccountThirdPartyRegion } from "./IAccountDetailGeneral";
export default class AccountDetailGeneral implements IAccountDetailGeneral {
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
  constructor(accountDetailGeneral?: AccountDetailGeneral) {
    if (accountDetailGeneral) {
      this.accountid = accountDetailGeneral.accountid;
      this.accountname = accountDetailGeneral.accountname;
      this.accountpricingtype = accountDetailGeneral.accountpricingtype;
      (this.accountrecid = accountDetailGeneral.accountrecid),
        (this.accounttypedescription =
          accountDetailGeneral.accounttypedescription),
        (this.duedate = accountDetailGeneral.duedate),
        (this.groupmeetings = accountDetailGeneral.groupmeetings),
        (this.hotel_display = accountDetailGeneral.hotel_display),
        (this.period = accountDetailGeneral.period),
        (this.top_account = accountDetailGeneral.top_account),
        (this.accountpricingcycleid =
          accountDetailGeneral.accountpricingcycleid),
        (this.accounttype = accountDetailGeneral.accounttype),
        (this.account_hotel_view = accountDetailGeneral.account_hotel_view),
        (this.account_tracking_only =
          accountDetailGeneral.account_tracking_only),
        (this.aer_account = accountDetailGeneral.aer_account),
        (this.aer_accountname = accountDetailGeneral.aer_accountname),
        (this.aerportfolio = accountDetailGeneral.aerportfolio),
        (this.altcancelpolicyid = accountDetailGeneral.altcancelpolicyid),
        (this.altcancelpolicynotes = accountDetailGeneral.altcancelpolicynotes),
        (this.altcancelpolicytimeid =
          accountDetailGeneral.altcancelpolicytimeid),
        (this.altcancelpolicyoptionid =
          accountDetailGeneral.altcancelpolicyoptionid),
        (this.bt_booking_cost = accountDetailGeneral.bt_booking_cost),
        (this.commdef_acct = accountDetailGeneral.commdef_acct),
        (this.commdef_tier = accountDetailGeneral.commdef_tier),
        (this.contractend = accountDetailGeneral.contractend),
        (this.contractstart = accountDetailGeneral.contractstart),
        (this.default_percent = accountDetailGeneral.default_percent),
        (this.discfirsttieronly = accountDetailGeneral.discfirsttieronly),
        (this.gpploiagreementonfile =
          accountDetailGeneral.gpploiagreementonfile),
        (this.gov_account = accountDetailGeneral.gov_account),
        (this.govaccountcanchange = accountDetailGeneral.govaccountcanchange),
        (this.govvpproductenabled = accountDetailGeneral.govvpproductenabled),
        (this.perdiemadjustmentsallowed =
          accountDetailGeneral.perdiemadjustmentsallowed),
        (this.hasRecs = accountDetailGeneral.hasRecs),
        (this.hasportfolio = accountDetailGeneral.hasportfolio),
        (this.hotel_display_date = accountDetailGeneral.hotel_display_date),
        (this.isaccountactive = accountDetailGeneral.isaccountactive),
        (this.nextcontractstart = accountDetailGeneral.nextcontractstart),
        (this.nosquatter = accountDetailGeneral.nosquatter),
        (this.offcycle = accountDetailGeneral.offcycle),
        (this.offcycleaccountcanchange =
          accountDetailGeneral.offcycleaccountcanchange),
        (this.offcycleaccountcanchangeend =
          accountDetailGeneral.offcycleaccountcanchangeend),
        (this.offcycle_numseasons = accountDetailGeneral.offcycle_numseasons),
        (this.prevcontractend = accountDetailGeneral.prevcontractend),
        (this.pricingperiodid = accountDetailGeneral.pricingperiodid),
        (this.rpgm_accountname = accountDetailGeneral.rpgm_accountname),
        (this.rfppulldate = accountDetailGeneral.rfppulldate),
        (this.remindersdate = accountDetailGeneral.remindersdate),
        (this.passubmissiondate = accountDetailGeneral.passubmissiondate),
        (this.clientduedate = accountDetailGeneral.clientduedate),
        (this.weblocked = accountDetailGeneral.weblocked),
        (this.acctwifipolicyid = accountDetailGeneral.acctwifipolicyid),
        (this.cbcduedate = accountDetailGeneral.cbcduedate),
        (this.allowEnhanced = accountDetailGeneral.allowEnhanced),
        (this.enhancedDiscount = accountDetailGeneral.enhancedDiscount),
        (this.enhancedDiscountGpp = accountDetailGeneral.enhancedDiscountGpp),
        (this.accountThirdPartyRegion =
          accountDetailGeneral.accountThirdPartyRegion),
        (this.strAccountrecid = accountDetailGeneral.strAccountrecid);
    }
  }
}
