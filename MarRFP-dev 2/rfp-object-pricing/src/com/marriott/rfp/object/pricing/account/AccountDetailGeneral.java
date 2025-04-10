package com.marriott.rfp.object.pricing.account;

import com.marriott.rfp.utility.DateUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public class AccountDetailGeneral extends Account {
	private static final Logger log = LoggerFactory.getLogger(AccountDetailGeneral.class);

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Long accountpricingcycleid;
	private String accounttype;
	private String account_hotel_view;
	private String account_tracking_only = "N";
	private String aer_account = "N";
	private String aer_accountname;
	private String aerportfolio;
	private Long altcancelpolicyid;
	private String altcancelpolicynotes;
	private Long altcancelpolicytimeid;
	private Long altcancelpolicyoptionid;
	private String bt_booking_cost;
	private String commdef_acct;
	private String commdef_tier;
	private Date contractend;
	private Date contractstart;
	private Long default_percent;
	private String discfirsttieronly = "N";
	private String gpploiagreementonfile = "N";
	private String gov_account = "N";
	private String govaccountcanchange = "Y";
	private String govvpproductenabled = "N";
	private String perdiemadjustmentsallowed = "N";
	private String hasRecs;
	private String hasportfolio;
	private String hotel_display_date;
	private boolean isaccountactive = true;
	private Date nextcontractstart;
	private String nosquatter = "N";
	private String offcycle = "N";
	private String offcycleaccountcanchange;
	private String offcycleaccountcanchangeend;
	private Long offcycle_numseasons;
	private Date prevcontractend;
	private Long pricingperiodid;
	private String rpgm_accountname;
	private Date rfppulldate;
	private Date remindersdate;
	private Date passubmissiondate;
	private Date clientduedate;
	private String weblocked = "N";
	private String acctwifipolicyid="N";
	private Date cbcduedate;
	private String allowEnhanced = "N";
	private Long enhancedDiscount;
	private Long enhancedDiscountGpp;


	private List<AccountThirdPartyRegion> accountThirdPartyRegion;

	public String getAccount_tracking_only() {
		return account_tracking_only;
	}

	public Long getAccountpricingcycleid() {
		return accountpricingcycleid;
	}

	public List<AccountThirdPartyRegion> getAccountThirdPartyRegion() {
		return accountThirdPartyRegion;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public String getAer_account() {
		return aer_account;
	}

	public String getAer_accountname() {
		return aer_accountname;
	}

	public String getAerportfolio() {
		return aerportfolio;
	}

	public String getCommdef_acct() {
		return commdef_acct;
	}

	public String getCommdef_tier() {
		return commdef_tier;
	}

	public Date getContractend() {
		return contractend;
	}

	public String getShortContractend() {
		return DateUtility.formatShortDate(contractend);
	}

	public Date getContractstart() {
		return contractstart;
	}

	public String getShortContractstart() {
		return DateUtility.formatShortDate(contractstart);
	}

	public Long getDefault_percent() {
		return default_percent;
	}

	public String getGov_account() {
		return gov_account;
	}

	public String getGovaccountcanchange() {
		return govaccountcanchange;
	}

	public String getHasRecs() {
		return hasRecs;
	}

	public String getHotel_display_date() {
		return hotel_display_date;
	}

	public String getNosquatter() {
		return nosquatter;
	}

	public String getOffcycle() {
		return offcycle;
	}

	public String getOffcycleaccountcanchange() {
		return offcycleaccountcanchange;
	}

	public String getOffcycleaccountcanchangeend() {
		return offcycleaccountcanchangeend;
	}

	public Long getPricingperiodid() {
		return pricingperiodid;
	}

	public String getRpgm_accountname() {
		return rpgm_accountname;
	}

	public String getWeblocked() {
		return weblocked;
	}

	public void setAccount_tracking_only(String account_tracking_only) {
		this.account_tracking_only = account_tracking_only;
	}

	public void setAccountpricingcycleid(Long accountpricingcycleid) {
		this.accountpricingcycleid = accountpricingcycleid;
	}

	public void setAccountThirdPartyRegion(List<AccountThirdPartyRegion> accountThirdPartyRegion) {
		this.accountThirdPartyRegion = accountThirdPartyRegion;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public void setAer_account(String aer_account) {
		if (aer_account != null)
			this.aer_account = aer_account;
	}

	public void setAer_accountname(String aer_accountname) {
		this.aer_accountname = aer_accountname;
	}

	public void setAerportfolio(String aerportfolio) {
		this.aerportfolio = aerportfolio;
	}

	public void setCommdef_acct(String commdef_acct) {
		if (commdef_acct == null)
			this.commdef_acct = "N";
		else
			this.commdef_acct = commdef_acct;
	}

	public void setCommdef_tier(String commdef_tier) {
		this.commdef_tier = commdef_tier;
	}

	public void setContractend(Date contractend) {
		this.contractend = contractend;
	}

	public void setContractstart(Date contractstart) {
		this.contractstart = contractstart;
	}

	public void setDefault_percent(Long default_percent) {
		this.default_percent = default_percent;
	}

	public void setGov_account(String gov_account) {
		this.gov_account = gov_account;
	}

	public void setGovaccountcanchange(String govaccountcanchange) {
		this.govaccountcanchange = govaccountcanchange;
	}

	public void setHasRecs(String hasRecs) {
		this.hasRecs = hasRecs;
	}

	public void setHotel_display_date(String hotel_display_date) {
		this.hotel_display_date = hotel_display_date;
	}

	public void setNosquatter(String nosquatter) {
		this.nosquatter = nosquatter;
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
	}

	public void setOffcycleaccountcanchange(String offcycleaccountcanchange) {
		this.offcycleaccountcanchange = offcycleaccountcanchange;
	}

	public void setOffcycleaccountcanchangeend(String offcycleaccountcanchangeend) {
		this.offcycleaccountcanchangeend = offcycleaccountcanchangeend;
	}

	public void setPricingperiodid(Long pricingperiodid) {
		this.pricingperiodid = pricingperiodid;
	}

	public void setRpgm_accountname(String rpgm_accountname) {
		this.rpgm_accountname = rpgm_accountname;
	}

	public void setWeblocked(String weblocked) {
		this.weblocked = weblocked;
	}

	public void setHasportfolio(String hasportfolio) {
		this.hasportfolio = hasportfolio;
	}

	public String getHasportfolio() {
		return hasportfolio;
	}

	public void setRfppulldate(Date rfppulldate) {
		this.rfppulldate = rfppulldate;
	}

	public Date getRfppulldate() {
		return rfppulldate;
	}

	public String getShortRfppulldate() {
		String strDate = "";
		if (rfppulldate != null)
			strDate = DateUtility.formatShortDate(rfppulldate);
		return strDate;
	}

	public void setOffcycle_numseasons(Long offcycle_numseasons) {
		this.offcycle_numseasons = offcycle_numseasons;
	}

	public Long getOffcycle_numseasons() {
		return offcycle_numseasons;
	}

	public void setDiscfirsttieronly(String discfirsttieronly) {
		this.discfirsttieronly = discfirsttieronly;
	}

	public String getDiscfirsttieronly() {
		if (discfirsttieronly == null)
			return "Y";
		return discfirsttieronly;
	}

	public boolean isIsaccountactive() {
		if (DateUtility.isAfterToDay(contractend)) {
			isaccountactive = true;
		} else {
			isaccountactive = false;
		}
		return isaccountactive;
	}

	public void setIsaccountactive(boolean isaccountactive) {
		this.isaccountactive = isaccountactive;
	}

	public String getAltcancelpolicynotes() {
		return altcancelpolicynotes;
	}

	public void setAltcancelpolicynotes(String altcancelpolicynotes) {
		this.altcancelpolicynotes = altcancelpolicynotes;
	}

	public Long getAltcancelpolicytimeid() {
		return altcancelpolicytimeid;
	}

	public void setAltcancelpolicytimeid(Long altcancelpolicytimeid) {
		if (altcancelpolicyid==null || altcancelpolicyid ==1)
			this.altcancelpolicytimeid = Long.parseLong("0");
		else if (altcancelpolicyoptionid != null && altcancelpolicyoptionid ==2)
			this.altcancelpolicytimeid = Long.parseLong("0");
		else
			this.altcancelpolicytimeid = altcancelpolicytimeid;
	}

	public Long getAltcancelpolicyoptionid() {
		return altcancelpolicyoptionid;
	}

	public void setAltcancelpolicyoptionid(Long altcancelpolicyoptionid) {
		if (altcancelpolicyid==null || altcancelpolicyid ==1)
			this.altcancelpolicyoptionid = Long.parseLong("0");
		else
			this.altcancelpolicyoptionid = altcancelpolicyoptionid;
	}

	public Long getAltcancelpolicyid() {
		return altcancelpolicyid;
	}

	public void setAltcancelpolicyid(Long altcancelpolicyid) {
		if(altcancelpolicyid==null)
			this.altcancelpolicyid = Long.parseLong("1");
		else
			this.altcancelpolicyid = altcancelpolicyid;
		}


	public String getAccount_hotel_view() {
		return account_hotel_view;
	}

	public void setAccount_hotel_view(String account_hotel_view) {
		this.account_hotel_view = account_hotel_view;
	}

	public String getBt_booking_cost() {
		return bt_booking_cost;
	}

	public void setBt_booking_cost(String bt_booking_cost){
		this.bt_booking_cost = bt_booking_cost;
	}

	public void setNextcontractstart(Date nextcontractstart) {
		this.nextcontractstart = nextcontractstart;
	}

	public Date getNextcontractstart() {
		return nextcontractstart;
	}

	public String getShortNextcontractstart() {
		String strDate = "";
		if (nextcontractstart != null)
			strDate = DateUtility.formatShortDate(nextcontractstart);
		return strDate;
	}

	public void setPrevcontractend(Date prevcontractend) {
		this.prevcontractend = prevcontractend;
	}

	public Date getPrevcontractend() {
		return prevcontractend;
	}

	public String getShortPrevcontractend() {
		String strDate = "";
		if (prevcontractend != null)
			strDate = DateUtility.formatShortDate(prevcontractend);
		return strDate;
	}

	public void setGpploiagreementonfile(String gpploiagreementonfile) {
		if (gpploiagreementonfile == null)
			this.gpploiagreementonfile = "N";
		else
			this.gpploiagreementonfile = gpploiagreementonfile;
	}

	public String getGpploiagreementonfile() {
		return gpploiagreementonfile;
	}

	public void setGovvpproductenabled(String govvpproductenabled) {
		this.govvpproductenabled = govvpproductenabled;
	}

	public String getGovvpproductenabled() {
		return govvpproductenabled;
	}

	public void setPerdiemadjustmentsallowed(String perdiemadjustmentsallowed) {
		this.perdiemadjustmentsallowed = perdiemadjustmentsallowed;
	}

	public String getPerdiemadjustmentsallowed() {
		return perdiemadjustmentsallowed;
	}

	public void setAcctwifipolicyid(String acctwifipolicyid) {
		this.acctwifipolicyid = acctwifipolicyid;
	}

	public String getAcctwifipolicyid() {
		return acctwifipolicyid;
	}

	public void setRemindersdate(Date remindersdate) {
		this.remindersdate = remindersdate;
	}

	public Date getRemindersdate() {
		return remindersdate;
	}

	public String getShortRemindersdate() {
		String strDate = "";
		if (remindersdate != null)
			strDate = DateUtility.formatShortDate(remindersdate);
		return strDate;
	}

	public void setPassubmissiondate(Date passubmissiondate) {
		this.passubmissiondate = passubmissiondate;
	}

	public Date getPassubmissiondate() {
		return passubmissiondate;
	}

	public String getShortPassubmissiondate() {
		String strDate = "";
		if (passubmissiondate != null)
			strDate = DateUtility.formatShortDate(passubmissiondate);
		return strDate;
	}

	public void setClientduedate(Date clientduedate) {
		this.clientduedate = clientduedate;
	}

	public Date getClientduedate() {
		return clientduedate;
	}

	public String getShortClientduedate() {
		String strDate = "";
		if (clientduedate != null)
			strDate = DateUtility.formatShortDate(clientduedate);
		return strDate;
	}

	public String getCbcduedate() {

		String longDate = DateUtility.formatLongDate(cbcduedate);

		if (longDate.equals("January 31, 9999"))
			longDate = "No CBC’s Accepted";
		return longDate;
	}

	public void setCbcduedate(Date cbcduedate) {
		if ( cbcduedate != null )
			this.cbcduedate = cbcduedate;
		else
			try {
				this.cbcduedate = DateUtility.parseDate("01/31/9999 00:00:00.0");
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				log.error(e.getMessage(),e);
			}
		}
	public String getAllowEnhanced() {
		return allowEnhanced;
	}

	public void setAllowEnhanced(String allowEnhanced) {
		this.allowEnhanced = allowEnhanced;
	}

	public Long getEnhancedDiscount() {
		return enhancedDiscount;
	}

	public void setEnhancedDiscount(Long enhancedDiscount) {
		this.enhancedDiscount = enhancedDiscount;
	}

	public Long getEnhancedDiscountGpp() {
		return enhancedDiscountGpp;
	}

	public void setEnhancedDiscountGpp(Long enhancedDiscountGpp) {
		this.enhancedDiscountGpp = enhancedDiscountGpp;
	}

}
