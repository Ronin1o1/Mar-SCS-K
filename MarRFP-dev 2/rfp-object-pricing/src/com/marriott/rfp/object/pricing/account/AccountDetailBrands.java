package com.marriott.rfp.object.pricing.account;

import com.marriott.rfp.utility.DateUtility;

import java.util.Date;
import java.util.List;

public class AccountDetailBrands extends Account {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private String account_hotel_view;
    private String allowHotelcanPriceFloatVP = "N";
    private String allow_modifications = "N";
    private Long altcancelpolicyid;
    private String altcancelpolicynotes;
    private Long altcancelpolicytimeid;
    private String allow_floatnociel = "N";
    private String allow_qmodifications = "N";
    private String analysisreportout = "Y";
    private String bt_booking_cost;
    private String clustercode;
    private Long default_percent;
    private Date endmoddate;
    private Date endqmoddate;
    private String internalpasnotes;
    private boolean isaccountactive = true;
    private Long max_roompools;
    private Date startmoddate;
    private Date startqmoddate;

    private List<RateProgram> aerrateprograms;
    private List<AccountBrand> brands;
    private List<RateProgram> rateprograms;
    private String aer_account;
    private List<AccountBrandList> accountbrandlist;
    private String gpp_check;
    private String set_id; 
    private String rate_plan_id; 
    private String accountAllowFloatVP = "N";
    private String rateLoadInstructionsGDS = "N";
    private String rateLoadingNotes;

    public List<RateProgram> getAerrateprograms() {
        return aerrateprograms;
    }

    public String getClustercode() {
        return clustercode;
    }

    public Date getEndmoddate() {
        return endmoddate;
    }

    public Date getEndqmoddate() {
        return endqmoddate;
    }

    public List<RateProgram> getRateprograms() {
        return rateprograms;
    }

    public Date getStartmoddate() {
        return startmoddate;
    }

    public String getShortStartmoddate() {
        String strDate = "";
        if (startmoddate != null)
            strDate = DateUtility.formatShortDate(startmoddate);
        return strDate;
    }

    public Date getStartqmoddate() {
        return startqmoddate;
    }

    public String getShortStartqmoddate() {
        String strDate = "";
        if (startqmoddate != null)
            strDate = DateUtility.formatShortDate(startqmoddate);
        return strDate;
    }

    public void setAerrateprograms(List<RateProgram> aerrateprograms) {
        this.aerrateprograms = aerrateprograms;
    }

    public void setClustercode(String clustercode) {
        this.clustercode = clustercode;
    }

    public void setEndmoddate(Date endmoddate) {
        this.endmoddate = endmoddate;
    }

    public String getShortEndmoddate() {
        String strDate = "";
        if (endmoddate != null)
            strDate = DateUtility.formatShortDate(endmoddate);
        return strDate;
    }

    public void setEndqmoddate(Date endqmoddate) {
        this.endqmoddate = endqmoddate;
    }

    public String getShortEndqmoddate() {
        String strDate = "";
        if (endqmoddate != null)
            strDate = DateUtility.formatShortDate(endqmoddate);
        return strDate;
    }

    public void setRateprograms(List<RateProgram> rateprograms) {
        this.rateprograms = rateprograms;
    }

    public void setStartmoddate(Date startmoddate) {
        this.startmoddate = startmoddate;
    }

    public void setStartqmoddate(Date startqmoddate) {
        this.startqmoddate = startqmoddate;
    }

    public void setAllow_floatnociel(String allow_floatnociel) {
        if (allow_floatnociel != null)
            this.allow_floatnociel = allow_floatnociel;
    }

    public void setAnalysisreportout(String analysisreportout) {
        if (analysisreportout == null || analysisreportout.equals(""))
            this.analysisreportout = "Y";
        else
            this.analysisreportout = analysisreportout;
    }

    public String getAnalysisreportout() {
        return analysisreportout;
    }

    public String getAllow_floatnociel() {
        return allow_floatnociel;
    }

    public void setInternalpasnotes(String internalpasnotes) {
        this.internalpasnotes = internalpasnotes;
    }

    public String getInternalpasnotes() {
        return internalpasnotes;
    }

    public void setMax_roompools(Long max_roompools) {
        this.max_roompools = max_roompools;
    }

    public Long getMax_roompools() {
        return max_roompools;
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
        if (altcancelpolicyid == null || altcancelpolicyid == 1)
            this.altcancelpolicytimeid = Long.parseLong("0");
        else
            this.altcancelpolicytimeid = altcancelpolicytimeid;
    }

    public Long getAltcancelpolicyid() {
        return altcancelpolicyid;
    }

    public void setAltcancelpolicyid(Long altcancelpolicyid) {
        if (altcancelpolicyid == null)
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

    public void setBt_booking_cost(String bt_booking_cost) {
        this.bt_booking_cost = bt_booking_cost;
    }

    public List<AccountBrand> getBrands() {
        return brands;
    }

    public void setBrands(List<AccountBrand> brands) {
        this.brands = brands;
    }

    public void setAllowHotelcanPriceFloatVP(String allowHotelcanPriceFloatVP) {
        if (allowHotelcanPriceFloatVP == null)
    		this.allowHotelcanPriceFloatVP = "N";
    	else
	    	this.allowHotelcanPriceFloatVP = allowHotelcanPriceFloatVP;
    }

    public String getAllowHotelcanPriceFloatVP() {
        return allowHotelcanPriceFloatVP;
    }

    public Long getDefault_percent() {
        return default_percent;
    }

    public void setDefault_percent(Long default_percent) {
        this.default_percent = default_percent;
    }

    public String getAllow_modifications() {
        return allow_modifications;
    }

    public void setAllow_modifications(String allow_modifications) {
        if (allow_modifications == null)
            this.allow_modifications = "N";
        else
            this.allow_modifications = allow_modifications;
    }

    public String getAllow_qmodifications() {
        return allow_qmodifications;
    }

    public void setAllow_qmodifications(String allow_qmodifications) {
        if (allow_qmodifications == null)
            this.allow_qmodifications = "N";
        else
            this.allow_qmodifications = allow_qmodifications;
    }

    public String getAer_account() {
        return aer_account;
    }

    public void setAer_account(String aer_account) {
        if (aer_account != null)
            this.aer_account = aer_account;
    }
    
    public List<AccountBrandList> getAccountbrandlist() {
		return accountbrandlist;
	}

	public void setAccountbrandlist(List<AccountBrandList> accountbrandlist) {
		this.accountbrandlist = accountbrandlist;
	}

	public String getGpp_check() {
		return gpp_check;
	}

	public void setGpp_check(String gpp_check) {
		this.gpp_check = gpp_check;
	}
	
	public String getSet_id() {
		return set_id;
	}

	public void setSet_id(String set_id) {
		this.set_id = set_id;
	}
	
	public String getRate_plan_id() {
		return rate_plan_id;
	}

	public void setRate_plan_id(String rate_plan_id) {
		this.rate_plan_id = rate_plan_id;
	}
	
	public String getAccountAllowFloatVP() {
		return accountAllowFloatVP;
	}

	public void setAccountAllowFloatVP(String accountAllowFloatVP) {
		if (accountAllowFloatVP == null)
            		this.accountAllowFloatVP = "N";
        	else
			this.accountAllowFloatVP = accountAllowFloatVP;
	}
	
	public String getRateLoadInstructionsGDS() {
		return rateLoadInstructionsGDS;
	}

	public void setRateLoadInstructionsGDS(String rateLoadInstructionsGDS) {
		if (rateLoadInstructionsGDS == null)
            		this.rateLoadInstructionsGDS = "N";
        	else
			this.rateLoadInstructionsGDS = rateLoadInstructionsGDS;
	}
	
	public String getRateLoadingNotes() {
		return rateLoadingNotes;
	}

	public void setRateLoadingNotes(String rateLoadingNotes) {
		this.rateLoadingNotes = rateLoadingNotes;
	}
}
