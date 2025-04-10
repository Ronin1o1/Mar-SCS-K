package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountCenter implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountname;
	private Long accountpricingcycleid;
	private Long accountrecid;
	private String accounttype;
	private String accounttypedescription;
	private String aer_account;
	private Long affiliationid;
	private String allow_floatnociel;
	private String allow_modifications;
	private String allow_no_bid;
	private String allow_qmods;
	private String business_case;
	private String cbcstatus;
	private String canparticipateaer;
	private Date duedate;
	private String excludeaer;
	private String gov_account;
	private String govvpproductenabled;
	private String hasansweredquestions;
	private String hasgovperdiempricing;
	private String hasquestions;
	private Long hotel_accountinfoid;
	private String hotel_display;
	private Date hotel_display_date;
	private HotelAccountCenterView hotelAccountCenterView;
	private Long hotelid;
	private String hotelname;
	private Long hotelrfpid;
	private String importance;
	private String isAccepted;
	private String isInternational;
	private String isLocked;
	private String ismaxaer;
	private String isNew;
	private String isSelected;
	private String isSolicited;
	private String marshacode;
	private String nobidreason;
	private Long nobidreasonid;
	private String nopricing;
	private String noSquatter;
	private String offcycle;
	private Long period;
	private Long ratetype_selected;
	private Date rebid_due;
	private Long rebid_level;
	private Long rebidstatus;
	private String revistgenpricing;
	private String screenstatus;
	private String show_questions_always;
	private String city;
	private String state;
	private String country;
	private String futureopening;
	private String hasdefaultfloat;

	private Long volunteeredratetype;
	private String allowHotelcanPriceFloatVP;
	private String top_account;
	private String bt_booking_cost;
	
	private String accountpricingtype; 
	
	private String is_ritz_gpp;
	
	private String roll_over;
	
	public String getAccountpricingtype() {
		return accountpricingtype;
	}

	public void setAccountpricingtype(String accountpricingtype) {
		this.accountpricingtype = accountpricingtype;
	}
	
	
	public String getAccountname() {
		return accountname;
	}

	public Long getAccountpricingcycleid() {
		return accountpricingcycleid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public String getAccountStatus() {
		String status = "";
		if (isAccepted != null && isAccepted.equals("Y"))
			status = "A";
		else if (isAccepted != null && isAccepted.equals("N"))
			status = "R";
		else if (isLocked != null && isLocked.equals("Y"))
			status = "L";
		else if (isSolicited != null && isSolicited.equals("Y"))
			status = "S";

		return status;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public String getAccounttypedescription() {
		return accounttypedescription;
	}

	public String getAer_account() {
		return aer_account;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public String getAllow_floatnociel() {
		return allow_floatnociel;
	}

	public String getAllow_modifications() {
		return allow_modifications;
	}

	public String getAllow_no_bid() {
		return allow_no_bid;
	}

	public String getAllow_qmods() {
		return allow_qmods;
	}

	public boolean getBoolIsLocked() {
		if (isLocked == null || isLocked.equals("N"))
			return false;
		else
			return true;
	}

	public String getBusiness_case() {
		return business_case;
	}

	public String getCanparticipateaer() {
		return canparticipateaer;
	}

	public String getDisplayNobidreason() {
		if (nobidreason == null)
			return "Select a no bid reason";
		else
			return nobidreason;
	}

	public Date getDuedate() {
		return duedate;
	}

	public String getExcludeaer() {
		return excludeaer;
	}

	public String getGov_account() {
		return gov_account;
	}

	public String getHasansweredquestions() {
		return hasansweredquestions;
	}

	public String getHasgovperdiempricing() {
		return hasgovperdiempricing;
	}

	public String getHasquestions() {
		return hasquestions;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public String getHotel_display() {
		return hotel_display;
	}

	public Date getHotel_display_date() {
		return hotel_display_date;
	}

	public HotelAccountCenterView getHotelAccountCenterView() {
		return hotelAccountCenterView;
	}

	public Long getHotelid() {
		return hotelid;
	}
	
	public String getHotelname() {
		return hotelname;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public String getImportance() {
		return importance;
	}

	public String getIsAccepted() {
		return isAccepted;
	}

	public String getIsLocked() {
		return isLocked;
	}

	public String getIsmaxaer() {
		return ismaxaer;
	}

	public String getIsNew() {
		return isNew;
	}

	public String getIsSelected() {
		return isSelected;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public String getMarshacode() {
		return marshacode;
	}

	public String getNobidreason() {
		return nobidreason;
	}

	public Long getNobidreasonid() {
		return nobidreasonid;
	}

	public String getNopricing() {
		return nopricing;
	}

	public String getNoSquatter() {
		return noSquatter;
	}

	public String getOffcycle() {
		return offcycle;
	}

	public Long getPeriod() {
		return period;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public Date getRebid_due() {
		return rebid_due;
	}

	public Long getRebid_level() {
		return rebid_level;
	}

	public Long getRebidstatus() {
		return rebidstatus;
	}

	public String getRevistgenpricing() {
		return revistgenpricing;
	}

	public String getScreenstatus() {
		return screenstatus;
	}

	public String getShow_questions_always() {
		return show_questions_always;
	}

	public boolean getShowQuestions() {
		if (hasquestions != null && hasquestions.equals("Y") && show_questions_always != null && show_questions_always.equals("Y"))
			return true;
		else
			return false;
	}

	public String getStrDuedate() {
		String strduedate = "";
		if (duedate != null) {
			strduedate = DateUtility.formatShortStringDate(duedate);
			if (strduedate.equals("Dec 31, 9999"))
				strduedate = "TBD";
			if (strduedate.equals("Jan 01, 9999"))
				strduedate = "CBC Collection";
		}
		return strduedate;
	}

	public Long getVolunteeredratetype() {
		return volunteeredratetype;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setAccountpricingcycleid(Long accountpricingcycleid) {
		this.accountpricingcycleid = accountpricingcycleid;
	}
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public void setAccounttypedescription(String accounttypedescription) {
		this.accounttypedescription = accounttypedescription;
	}

	public void setAer_account(String aer_account) {
		this.aer_account = aer_account;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setAllow_floatnociel(String allow_floatnociel) {
		this.allow_floatnociel = allow_floatnociel;
	}

	public void setAllow_modifications(String allow_modifications) {
		this.allow_modifications = allow_modifications;
	}

	public void setAllow_no_bid(String allow_no_bid) {
		this.allow_no_bid = allow_no_bid;
	}

	public void setAllow_qmods(String allow_qmods) {
		this.allow_qmods = allow_qmods;
	}

	public void setBusiness_case(String business_case) {
		this.business_case = business_case;
	}

	public void setCanparticipateaer(String canparticipateaer) {
		this.canparticipateaer = canparticipateaer;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public void setExcludeaer(String excludeaer) {
		this.excludeaer = excludeaer;
	}

	public void setGov_account(String gov_account) {
		this.gov_account = gov_account;
	}

	public String getGovvpproductenabled() {
		return govvpproductenabled;
	}

	public void setGovvpproductenabled(String govvpproductenabled) {
		this.govvpproductenabled = govvpproductenabled;
	}

	public void setHasansweredquestions(String hasansweredquestions) {
		this.hasansweredquestions = hasansweredquestions;
	}

	public void setHasgovperdiempricing(String hasgovperdiempricing) {
		this.hasgovperdiempricing = hasgovperdiempricing;
	}

	public void setHasquestions(String hasquestions) {
		this.hasquestions = hasquestions;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public void setHotel_display(String hotel_display) {
		this.hotel_display = hotel_display;
	}

	public void setHotel_display_date(Date hotel_display_date) {
		this.hotel_display_date = hotel_display_date;
	}

	public void setHotelAccountCenterView(HotelAccountCenterView hotelAccountCenterView) {
		this.hotelAccountCenterView = hotelAccountCenterView;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelname(String hotelname) {
		this.hotelname = hotelname;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public void setImportance(String importance) {
		this.importance = importance;
	}

	public void setIsAccepted(String isAccepted) {
		this.isAccepted = isAccepted;
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	public void setIsmaxaer(String ismaxaer) {
		this.ismaxaer = ismaxaer;
	}

	public void setIsNew(String isNew) {
		this.isNew = isNew;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public void setNobidreason(String nobidreason) {
		if (nobidreasonid==null)
			this.nobidreasonid=(long) 0;
		else
			this.nobidreason = nobidreason;
	}

	public void setNobidreasonid(Long nobidreasonid) {
		this.nobidreasonid = nobidreasonid;
	}

	public void setNopricing(String nopricing) {
		this.nopricing = nopricing;
	}

	public void setNoSquatter(String noSquatter) {
		this.noSquatter = noSquatter;
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public void setRebid_due(Date rebid_due) {
		this.rebid_due = rebid_due;
	}

	public void setRebid_level(Long rebid_level) {
		this.rebid_level = rebid_level;
	}

	public void setRebidstatus(Long rebidstatus) {
		this.rebidstatus = rebidstatus;
	}

	public void setRevistgenpricing(String revistgenpricing) {
		this.revistgenpricing = revistgenpricing;
	}

	public void setScreenstatus(String screenstatus) {
		this.screenstatus = screenstatus;
	}

	public void setShow_questions_always(String show_questions_always) {
		this.show_questions_always = show_questions_always;
	}

	public void setVolunteeredratetype(Long volunteeredratetype) {
		this.volunteeredratetype = volunteeredratetype;
	}

	public void setIsInternational(String isInternational) {
	    this.isInternational = isInternational;
	}

	public String getIsInternational() {
	    return isInternational;
	}

	public void setCity(String city) {
	    this.city = city;
	}

	public String getCity() {
	    return city;
	}

	public String getState() {
	    return state;
	}

	public void setState(String state) {
	    this.state = state;
	}

	public String getCountry() {
	    return country;
	}

	public void setCountry(String country) {
	    this.country = country;
	}

	public String getFutureopening() {
	    return futureopening;
	}

	public void setFutureopening(String futureopening) {
	    this.futureopening = futureopening;
	}

	public String getHasdefaultfloat() {
	    return hasdefaultfloat;
	}

	public void setHasdefaultfloat(String hasdefaultfloat) {
	    this.hasdefaultfloat = hasdefaultfloat;
	}

	public void setCbcstatus(String cbcstatus) {
		this.cbcstatus = cbcstatus;
	}

	public String getCbcstatus() {
		return cbcstatus;
	}

	public void setAllowHotelcanPriceFloatVP(String allowHotelcanPriceFloatVP) {
		this.allowHotelcanPriceFloatVP = allowHotelcanPriceFloatVP;
	}

	public String getAllowHotelcanPriceFloatVP() {
		return allowHotelcanPriceFloatVP;
	}
	
	public String getTop_account() {
		return top_account;
	}

	public void setTop_account(String top_account) {
		this.top_account = top_account;
	}
	
	public String getBt_booking_cost() {
		return bt_booking_cost;
	}

	public void setBt_booking_cost(String bt_booking_cost) {
		this.bt_booking_cost = bt_booking_cost;
	}

	public String getIs_ritz_gpp() {
		return is_ritz_gpp;
	}

	public void setIs_ritz_gpp(String is_ritz_gpp) {
		this.is_ritz_gpp = is_ritz_gpp;
	}

	public String getRoll_over() {
		return roll_over;
	}

	public void setRoll_over(String roll_over) {
		this.roll_over = roll_over;
	}
	
}
