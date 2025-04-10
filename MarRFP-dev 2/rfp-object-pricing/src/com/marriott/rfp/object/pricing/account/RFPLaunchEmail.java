package com.marriott.rfp.object.pricing.account;

import com.marriott.rfp.utility.DateUtility;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public class RFPLaunchEmail extends Account {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long accountpricingcycleid;
	private String accounttype;
	private String account_hotel_view;
	private String aer_account = "N";
	private String aer_accountname;
	private String aerportfolio;
	private Long altcancelpolicyid;
	private String altcancelpolicynotes;
	private Long altcancelpolicytimeid;
	private Long altcancelpolicyoptionid;
	private Date contractend;
	private Date contractstart;
	private Long default_percent;
	private String discfirsttieronly = "Y";
	private String gpploiagreementonfile = "N";
	private String gov_account = "N";
	private String govvpproductenabled = "N";
	private String perdiemadjustmentsallowed = "N";
	private String hotel_display_date;
	private String nosquatter = "N";
	private String offcycle = "N";
	private Long offcycle_numseasons;
	private Long pricingperiodid;
	private String rpgm_accountname;
	private Date marrfpduedate;
	private Date rfppulldate;
	private Date remindersdate;
	private Date passubmissiondate;
	private Date clientduedate;
	private String weblocked = "N";
	private String clustercode;
	private List<RateProgram> aerrateprograms;
	private List<RateProgram> rateprograms;
	private String pb;
	private String cs;
	private String ss;
	private String bd;
	private String gm;
	private String csr;
	private String es;
	private String contain_userdefques;
	private Long maxseason;
	private Long maxrt;
	private Long rtallowed;
	private Long ratevisible;
	private String rtalloweddesc;
	private String ratevisibledesc;
	private String presentfcr;
	private String blackoutdateshidden;
    private String maxnum_blackoutdates;
    private String maxnum_blackoutperiod;
    private List<String> sendTo;
    private String fullName;
    private String phone;
    private String personTitle;
    private String areaCityCode;
    private String countryCode;
	private String accountThirdPartyRegion;
	private String rollover;
    private String enhancedPgoos;
    private Long enhancedDiscount;
    private String accountallowfloatvp;
    private String allow_floatnociel;
    private String allowhotelcanpricefloatvp;

	public String getAccountallowfloatvp() {
		return accountallowfloatvp;
	}

	public void setAccountallowfloatvp(String accountallowfloatvp) {
		this.accountallowfloatvp = accountallowfloatvp;
	}

	public String getAllow_floatnociel() {
		return allow_floatnociel;
	}

	public void setAllow_floatnociel(String allow_floatnociel) {
		this.allow_floatnociel = allow_floatnociel;
	}

	public String getAllowhotelcanpricefloatvp() {
		return allowhotelcanpricefloatvp;
	}

	public void setAllowhotelcanpricefloatvp(String allowhotelcanpricefloatvp) {
		this.allowhotelcanpricefloatvp = allowhotelcanpricefloatvp;
	}

	public String getRollover() {
		return rollover;
	}

	public void setRollover(String rollover) {
		this.rollover = rollover;
	}

	public String getEnhancedPgoos() {
		return enhancedPgoos;
	}

	public void setEnhancedPgoos(String enhancedPgoos) {
		this.enhancedPgoos = enhancedPgoos;
	}

	public Long getEnhancedDiscount() {
		return enhancedDiscount;
	}

	public void setEnhancedDiscount(Long enhancedDiscount) {
		this.enhancedDiscount = enhancedDiscount;
	}

	public Long getAccountpricingcycleid() {
		return accountpricingcycleid;
	}

	public String getAccountThirdPartyRegion() {
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

	public String getHotel_display_date() {
		return hotel_display_date;
	}

	public String getNosquatter() {
		return nosquatter;
	}

	public String getOffcycle() {
		return offcycle;
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

	public void setAccountpricingcycleid(Long accountpricingcycleid) {
		this.accountpricingcycleid = accountpricingcycleid;
	}

	public void setAccountThirdPartyRegion(String accountThirdPartyRegion) {
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

	public void setHotel_display_date(String hotel_display_date) {
		this.hotel_display_date = hotel_display_date;
	}

	public void setNosquatter(String nosquatter) {
		this.nosquatter = nosquatter;
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
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

	public String getClustercode() {
		return clustercode;
	}

	public void setClustercode(String clustercode) {
		this.clustercode = clustercode;
	}

	public List<RateProgram> getAerrateprograms() {
		return aerrateprograms;
	}

	public void setAerrateprograms(List<RateProgram> aerrateprograms) {
		this.aerrateprograms = aerrateprograms;
	}

	public List<RateProgram> getRateprograms() {
		return rateprograms;
	}

	public void setRateprograms(List<RateProgram> rateprograms) {
		this.rateprograms = rateprograms;
	}

	public String getSs() {
		return ss;
	}

	public void setSs(String ss) {
		this.ss = ss;
	}

	public String getPb() {
		return pb;
	}

	public void setPb(String pb) {
		this.pb = pb;
	}

	public String getCs() {
		return cs;
	}

	public void setCs(String cs) {
		this.cs = cs;
	}

	public String getBd() {
		return bd;
	}

	public void setBd(String bd) {
		this.bd = bd;
	}

	public String getGm() {
		return gm;
	}

	public void setGm(String gm) {
		this.gm = gm;
	}

	public String getCsr() {
		return csr;
	}

	public void setCsr(String csr) {
		this.csr = csr;
	}

	public String getEs() {
		return es;
	}

	public void setEs(String es) {
		this.es = es;
	}

	public String getContain_userdefques() {
		return contain_userdefques;
	}

	public void setContain_userdefques(String contain_userdefques) {
		this.contain_userdefques = contain_userdefques;
	}
	
	public Long getMaxseason() {
		return maxseason;
	}

	public void setMaxseason(Long maxseason) {
		this.maxseason = maxseason;
	}

	public Long getMaxrt() {
		return maxrt;
	}

	public void setMaxrt(Long maxrt) {
		this.maxrt = maxrt;
	}

	public Long getRtallowed() {
		return rtallowed;
	}

	public void setRtallowed(Long rtallowed) {
		this.rtallowed = rtallowed;
	}

	public Long getRatevisible() {
		return ratevisible;
	}

	public void setRatevisible(Long ratevisible) {
		this.ratevisible = ratevisible;
	}

	public String getPresentfcr() {
		return presentfcr;
	}

	public void setPresentfcr(String presentfcr) {
		this.presentfcr = presentfcr;
	}

	public String getBlackoutdateshidden() {
		return blackoutdateshidden;
	}

	public void setBlackoutdateshidden(String blackoutdateshidden) {
		this.blackoutdateshidden = blackoutdateshidden;
	}

	public String getMaxnum_blackoutdates() {
		return maxnum_blackoutdates;
	}

	public void setMaxnum_blackoutdates(String maxnum_blackoutdates) {
		this.maxnum_blackoutdates = maxnum_blackoutdates;
	}

	public String getMaxnum_blackoutperiod() {
		return maxnum_blackoutperiod;
	}

	public void setMaxnum_blackoutperiod(String maxnum_blackoutperiod) {
		this.maxnum_blackoutperiod = maxnum_blackoutperiod;
	}

	public List<String> getSendTo() {
		return sendTo;
	}

	public void setSendTo(List<String> sendTo) {
		this.sendTo = sendTo;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getMarrfpduedate() {
		return marrfpduedate;
	}

	public void setMarrfpduedate(Date marrfpduedate) {
		this.marrfpduedate = marrfpduedate;
	}
	
	public String getShortMarrfpduedate() {
		String strDate = "";
		if (marrfpduedate != null)
			strDate = DateUtility.formatShortDate(marrfpduedate);
		return strDate;
	}

	public String getRtalloweddesc() {
		return rtalloweddesc;
	}

	public void setRtalloweddesc(String rtalloweddesc) {
		this.rtalloweddesc = rtalloweddesc;
	}

	public String getRatevisibledesc() {
		return ratevisibledesc;
	}

	public void setRatevisibledesc(String ratevisibledesc) {
		this.ratevisibledesc = ratevisibledesc;
	}

	public String getPersonTitle() {
		return personTitle;
	}

	public void setPersonTitle(String personTitle) {
		this.personTitle = personTitle;
	}

	public String getAreaCityCode() {
		return areaCityCode;
	}

	public void setAreaCityCode(String areaCityCode) {
		this.areaCityCode = areaCityCode;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public void setTrimCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public String getTrimCountryCode() {
		int i = 0;
		// Count leading zeros 
	    while (i < countryCode.length() && countryCode.charAt(i) == '0') 
	    	i++;
	  
	    // Convert str into StringBuffer as Strings 
	    // are immutable. 
	    StringBuffer sb = new StringBuffer(countryCode); 
	  
	    // The  StringBuffer replace function removes 
	    // i characters from given index (0 here) 
	    sb.replace(0, i, ""); 
	    
	    return sb.toString();  // return in String 
	}
	

}
