package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.report.ExcelDateFormats;
import com.marriott.rfp.object.report.ReportModel;

public class FilterLists implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private List<Period> periodList;
    private List<Account> accountList;
    private List<HotelAffiliation> brandlist;
    private List<ReportModel> reportlist;
    private List<EdieProfile>edieprofilelist;
    private List<EdieHotelProfile>ediehotelprofilelist;
    private List<ExcelDateFormats> exceldateformat;

    public void setPeriodList(List<Period> periodList) {
	this.periodList = periodList;
    }

    public List<Period> getPeriodList() {
	return periodList;
    }

    public void setAccountList(List<Account> accountList) {
	this.accountList = accountList;
    }

    public List<Account> getAccountList() {
	return accountList;
    }

    public void setBrandlist(List<HotelAffiliation> brandlist) {
	this.brandlist = brandlist;
    }

    public List<HotelAffiliation> getBrandlist() {
	return brandlist;
    }

    public int getNumBrandRows() {
	int numRows = 0;
	if (brandlist.size() > 0) {
	    numRows = brandlist.size() / 2;
	    if (numRows * 2 < brandlist.size())
		numRows++;
	}
	return numRows;
    }

    public int getNumBrands() {
	return brandlist.size();
    }

    public void setReportlist(List<ReportModel> reportlist) {
	this.reportlist = reportlist;
    }

    public List<ReportModel> getReportlist() {
	return reportlist;
    }

    public void setEdieprofilelist(List<EdieProfile> edieprofilelist) {
	this.edieprofilelist = edieprofilelist;
    }

    public List<EdieProfile> getEdieprofilelist() {
	return edieprofilelist;
    }

    public void setEdiehotelprofilelist(List<EdieHotelProfile> ediehotelprofilelist) {
	this.ediehotelprofilelist = ediehotelprofilelist;
    }

    public List<EdieHotelProfile> getEdiehotelprofilelist() {
	return ediehotelprofilelist;
    }

	public void setExceldateformat(List<ExcelDateFormats> exceldateformat) {
		this.exceldateformat = exceldateformat;
	}

	public List<ExcelDateFormats> getExceldateformat() {
		return exceldateformat;
	}
 
}
