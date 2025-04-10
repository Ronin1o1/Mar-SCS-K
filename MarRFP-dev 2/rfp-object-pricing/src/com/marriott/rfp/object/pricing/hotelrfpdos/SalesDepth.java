package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class SalesDepth implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long salesdepthid;
    private Long hotelrfpid;
    private String peaknsun = "N";
    private String peaknmon = "N";
    private String peakntue = "N";
    private String peaknwed = "N";
    private String peaknthu = "N";
    private String peaknfri = "N";
    private String peaknsat = "N";
    private String isenhanced = "N";
    private Date last_updatedate;
    private String currencycode;
    private String currencyname;
    private SalesDepth_En_Season salesdepth_en_season;
    private List<SalesDepth_En_LOS> salesdepth_en_loslist;
    private List<SalesDepth_En_Ranges> salesdepth_en_ranges;
    private List<SalesDepth_Ranges> salesdepth_ranges;
    private String bt_price_strategy;
    private Double  prevyear_retailadr;
    private Double anticipate_inc_retail_pct;

    public Long getSalesdepthid() {
	return salesdepthid;
    }

    public void setSalesdepthid(Long salesdepthid) {
	this.salesdepthid = salesdepthid;
    }

    public Long getHotelrfpid() {
	return hotelrfpid;
    }

    public void setHotelrfpid(Long hotelrfpid) {
	this.hotelrfpid = hotelrfpid;
    }

    public String getPeaknsun() {
	return peaknsun;
    }

    public void setPeaknsun(String peaknsun) {
	if (peaknsun != null)
	    this.peaknsun = peaknsun;
    }

    public String getPeaknmon() {
	return peaknmon;
    }

    public void setPeaknmon(String peaknmon) {
	if (peaknmon != null)
	    this.peaknmon = peaknmon;
    }

    public String getPeakntue() {
	return peakntue;
    }

    public void setPeakntue(String peakntue) {
	if (peakntue != null)
	    this.peakntue = peakntue;
    }

    public String getPeaknwed() {
	return peaknwed;
    }

    public void setPeaknwed(String peaknwed) {
	if (peaknwed != null)
	    this.peaknwed = peaknwed;
    }

    public String getPeaknthu() {
	return peaknthu;
    }

    public void setPeaknthu(String peaknthu) {
	if (peaknthu != null)
	    this.peaknthu = peaknthu;
    }

    public String getPeaknfri() {
	return peaknfri;
    }

    public void setPeaknfri(String peaknfri) {
	if (peaknfri != null)
	    this.peaknfri = peaknfri;
    }

    public String getPeaknsat() {
	return peaknsat;
    }

    public void setPeaknsat(String peaknsat) {
	if (peaknsat != null)
	    this.peaknsat = peaknsat;
    }

    public String getIsenhanced() {
	if (isenhanced == null)
	    return "N";
	else
	    return isenhanced;
    }

    public void setIsenhanced(String isenhanced) {
	this.isenhanced = isenhanced;
    }

    public SalesDepth_En_Season getSalesdepth_en_season() {
	return salesdepth_en_season;
    }

    public void setSalesdepth_en_season(SalesDepth_En_Season salesdepth_en_season) {
	this.salesdepth_en_season = salesdepth_en_season;
    }

    public List<SalesDepth_En_LOS> getSalesdepth_en_loslist() {
	return salesdepth_en_loslist;
    }

    public void setSalesdepth_en_loslist(List<SalesDepth_En_LOS> salesdepth_en_loslist) {
	this.salesdepth_en_loslist = salesdepth_en_loslist;
    }

    public List<SalesDepth_En_Ranges> getSalesdepth_en_ranges() {
	return salesdepth_en_ranges;
    }

    public void setSalesdepth_en_ranges(List<SalesDepth_En_Ranges> salesdepth_en_ranges) {
	this.salesdepth_en_ranges = salesdepth_en_ranges;
    }

    public List<SalesDepth_Ranges> getSalesdepth_ranges() {
	return salesdepth_ranges;
    }

    public void setSalesdepth_ranges(List<SalesDepth_Ranges> salesdepth_ranges) {
	this.salesdepth_ranges = salesdepth_ranges;
    }

    public String getPeakDays() {
	String peakdays = "";
	if (peaknsun.equals("Y"))
	    peakdays += "Sun";
	if (peaknmon.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Mon";
	}
	if (peakntue.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Tue";
	}
	if (peaknwed.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Wed";
	}
	if (peaknthu.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Thu";
	}
	if (peaknfri.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Fri";
	}
	if (peaknsat.equals("Y")) {
	    if (peakdays.length() > 0)
		peakdays += ", ";
	    peakdays += "Sat";
	}

	if (peakdays.equals(""))
	    peakdays = "None selected";
	return peakdays;
    }

    public boolean getHasLOSTiers() {
	if (salesdepth_en_loslist != null && salesdepth_en_loslist.size() > 0)
	    return true;
	else
	    return false;
    }

    public long getNumberLOSTiers() {
	if (salesdepth_en_loslist != null && salesdepth_en_loslist.size() > 0)
	    return salesdepth_en_loslist.size();
	else
	    return 1;
    }

    public void setCurrencycode(String currencycode) {
	this.currencycode = currencycode;
    }

    public String getCurrencycode() {
	return currencycode;
    }

    public void setCurrencyname(String currencyname) {
	this.currencyname = currencyname;
    }

    public String getCurrencyname() {
	return currencyname;
    }

    public long getTotalSeasons() {
	if (isenhanced.equals("Y") && salesdepth_en_season != null)
	    return salesdepth_en_season.getTotalnumseasons();
	else
	    return 0;
    }

    public void setLast_updatedate(Date last_updatedate) {
	this.last_updatedate = last_updatedate;
    }

    public Date getLast_updatedate() {
	return last_updatedate;
    }

    public String getFormattedLast_updatedate() {
	String strdate = "";
	if (last_updatedate != null) {
	    strdate = DateUtility.formatLongDate(last_updatedate);
	}
	return strdate;
    }

	public String getBt_price_strategy() {
		return bt_price_strategy;
	}

	public void setBt_price_strategy(String bt_price_strategy) {
		this.bt_price_strategy = bt_price_strategy;
	}

	public Double getPrevyear_retailadr() {
		return prevyear_retailadr;
	}

	public void setPrevyear_retailadr(Double prevyear_retailadr) {
		this.prevyear_retailadr = prevyear_retailadr;
	}

	public Double getAnticipate_inc_retail_pct() {
		return anticipate_inc_retail_pct;
	}

	public void setAnticipate_inc_retail_pct(Double anticipate_inc_retail_pct) {
		this.anticipate_inc_retail_pct = anticipate_inc_retail_pct;
	}

}
