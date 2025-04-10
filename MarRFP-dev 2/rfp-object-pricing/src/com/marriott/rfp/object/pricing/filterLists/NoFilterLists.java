package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotel.HotelList;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.report.ExcelDateFormats;
import com.marriott.rfp.object.report.ProximitySubCategory;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.travelspending.TravelSpending;
import com.marriott.rfp.object.user.Role;
import com.marriott.rfp.object.user.User;

public class NoFilterLists implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private List<Period> periodList;
    private List<Account> accountList;
    private List<AccountSegment> accountSegmentList;
    private List<TravelSpending> quarterList;
    private List<ReportModel> reportlist;
    private List<SAPPModule>sappmoduleList;
    private List<ProximitySubCategory> proximityList;
    private List<User>globalSalesContacts;
    private List<ReportingRegion>regionList;
    private List<Role> roleList;
    private List<HotelList>hotelList;
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


    public void setReportlist(List<ReportModel> reportlist) {
	this.reportlist = reportlist;
    }

    public List<ReportModel> getReportlist() {
	return reportlist;
    }

    public void setAccountSegmentList(List<AccountSegment> accountSegmentList) {
	this.accountSegmentList = accountSegmentList;
    }

    public List<AccountSegment> getAccountSegmentList() {
	return accountSegmentList;
    }

    public void setQuarterList(List<TravelSpending> quarterList) {
	this.quarterList = quarterList;
    }

    public List<TravelSpending> getQuarterList() {
	return quarterList;
    }

    public void setSappmoduleList(List<SAPPModule> sappmoduleList) {
	this.sappmoduleList = sappmoduleList;
    }

    public List<SAPPModule> getSappmoduleList() {
	return sappmoduleList;
    }

    public void setProximityList(List<ProximitySubCategory> proximityList) {
	this.proximityList = proximityList;
    }

    public List<ProximitySubCategory> getProximityList() {
	return proximityList;
    }

    public void setGlobalSalesContacts(List<User> globalSalesContacts) {
	this.globalSalesContacts = globalSalesContacts;
    }

    public List<User> getGlobalSalesContacts() {
	return globalSalesContacts;
    }

    public void setRegionList(List<ReportingRegion> regionList) {
	this.regionList = regionList;
    }

    public List<ReportingRegion> getRegionList() {
	return regionList;
    }

    public void setRoleList(List<Role> roleList) {
	this.roleList = roleList;
    }

    public List<Role> getRoleList() {
	return roleList;
    }

    public void setHotelList(List<HotelList> hotelList) {
	this.hotelList = hotelList;
    }

    public List<HotelList> getHotelList() {
	return hotelList;
    }

	public void setExceldateformat(List<ExcelDateFormats> exceldateformat) {
		this.exceldateformat = exceldateformat;
	}

	public List<ExcelDateFormats> getExceldateformat() {
		return exceldateformat;
	}

 
}
