package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class PricingFilterShow implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private boolean hideHotelProfile = false;
    private boolean showAccountEligible = false;
    private boolean showAccountFilter = false;
    private boolean showAccountFlags = false;
    private boolean showAccountStatusLegend = false;
    private boolean showAccountSubset = false;
    private boolean showAccountSubset2 = false;
    private boolean showAreaFilter = false;
    private boolean showBrandFilter = false;
    private boolean showByAccountorByHotel = false;
    private boolean showByAccountorByRPGM=false;
    private boolean showDateRange = false;
    private boolean showEdieProfileFilter = false;
    private boolean showEID=false;
    private boolean showExcludeGPP = false;
    private boolean showFutureOpenings = false;
    private boolean showGPPAccountsOnly = false;
    private boolean showHighlightedOnly = false;
    private boolean showHotelList = false;
    private boolean showHotelProfile = false;
    private boolean showHotelsSaidDelete = false;
    private boolean showManagedFranchised = false;
    private boolean showNotAccepted = false;
    private boolean showNumberSelected = false;
    private boolean showPgoosFilter = false;
    private boolean showProductLegend = false;
    private boolean showQuarter=false;
    private boolean showRegion=false;
    private boolean showReportList = false;
    private boolean showRPGMinput = false;
    private boolean showRunReport = false;
    private boolean showSAPPModules=false;
    private boolean showSave = false;
    private boolean showScheduleReport = false;
    private boolean showSolicitSelectionFilter = false;
    private boolean showDateFormat=false;
    private boolean showDateOrYear = false;
    
    private boolean showAcceptanceFilter = false;
    public boolean getShowAcceptanceFilter() {
		return showAcceptanceFilter;
	}
	public void setShowAcceptanceFilter(boolean showAcceptanceFilter) {
		this.showAcceptanceFilter = showAcceptanceFilter;
	}

	/* Cognos : Email Me Functionality */
    private boolean showEmailMe = false;

    public boolean getShowEmailMe() {
		return showEmailMe;
	}

	public void setShowEmailMe(boolean showEmailMe) {
		this.showEmailMe = showEmailMe;
	}
	/* Cognos : Email Me Functionality */

	public boolean getHideHotelProfile() {
	return hideHotelProfile;
    }

    public boolean getShowAccountEligible() {
	return showAccountEligible;
    }

    public boolean getShowAccountFilter() {
	return showAccountFilter;
    }

    public boolean getShowAccountFlags() {
	return showAccountFlags;
    }

    public boolean getShowAccountStatusLegend() {
	return showAccountStatusLegend;
    }

    public boolean getShowAccountSubset() {
	return showAccountSubset;
    }

    public boolean getShowAccountSubset2() {
	return showAccountSubset2;
    }

    public boolean getShowAreaFilter() {
	return showAreaFilter;
    }

    public boolean getShowBrandFilter() {
	return showBrandFilter;
    }

    public boolean getShowByAccountorByHotel() {
	return showByAccountorByHotel;
    }

    public boolean getShowDateRange() {
	return showDateRange;
    }

    public boolean getShowEdieProfileFilter() {
	return showEdieProfileFilter;
    }

    public boolean getShowEID() {
	return showEID;
    }

    public boolean getShowExcludeGPP() {
	return showExcludeGPP;
    }

    public boolean getShowFutureOpenings() {
	return showFutureOpenings;
    }

    public boolean getShowGPPAccountsOnly() {
	return showGPPAccountsOnly;
    }

    public boolean getShowHighlightedOnly() {
	return showHighlightedOnly;
    }

    public boolean getShowHotelProfile() {
	return showHotelProfile;
    }

    public boolean getShowHotelsSaidDelete() {
	return showHotelsSaidDelete;
    }

    public boolean getShowManagedFranchised() {
	return showManagedFranchised;
    }

    public boolean getShowNotAccepted() {
	return showNotAccepted;
    }

    public boolean getShowNumberSelected() {
	return showNumberSelected;
    }

    public boolean getShowProductLegend() {
	return showProductLegend;
    }

    public boolean getShowQuarter() {
	return showQuarter;
    }

    public boolean getShowRegion() {
	return showRegion;
    }

    public boolean getShowReportList() {
	return showReportList;
    }

    public boolean getShowRunReport() {
	return showRunReport;
    }

    public boolean getShowSAPPModules() {
	return showSAPPModules;
    }

    public boolean getShowSave() {
	return showSave;
    }

    public boolean getShowScheduleReport() {
	return showScheduleReport;
    }

    public boolean getShowSolicitSelectionFilter() {
	return showSolicitSelectionFilter;
    }

    public boolean isShowHotelList() {
	return showHotelList;
    }

    public boolean isShowPgoosFilter() {
	return showPgoosFilter;
    }

    public boolean isShowRPGMinput() {
	return showRPGMinput;
    }

    public void setHideHotelProfile(boolean hideHotelProfile) {
	this.hideHotelProfile = hideHotelProfile;
    }

    public void setShowAccountEligible(boolean showAccountEligible) {
	this.showAccountEligible = showAccountEligible;
    }

    public void setShowAccountFilter(boolean showAccountFilter) {
	this.showAccountFilter = showAccountFilter;
    }

    public void setShowAccountFlags(boolean showAccountFlags) {
	this.showAccountFlags = showAccountFlags;
    }

    public void setShowAccountStatusLegend(boolean showAccountStatusLegend) {
	this.showAccountStatusLegend = showAccountStatusLegend;
    }

    public void setShowAccountSubset(boolean showAccountSubset) {
	this.showAccountSubset = showAccountSubset;
    }

    public void setShowAccountSubset2(boolean showAccountSubset2) {
	this.showAccountSubset2 = showAccountSubset2;
    }

    public void setShowAreaFilter(boolean showAreaFilter) {
	this.showAreaFilter = showAreaFilter;
    }

    public void setShowBrandFilter(boolean showBrandFilter) {
	this.showBrandFilter = showBrandFilter;
    }

    public void setShowByAccountorByHotel(boolean showByAccountorByHotel) {
	this.showByAccountorByHotel = showByAccountorByHotel;
    }

    public void setShowDateRange(boolean showDateRange) {
	this.showDateRange = showDateRange;
    }

    public void setShowEdieProfileFilter(boolean showEdieProfileFilter) {
	this.showEdieProfileFilter = showEdieProfileFilter;
    }

    public void setShowEID(boolean showEID) {
	this.showEID = showEID;
    }

    public void setShowExcludeGPP(boolean showExcludeGPP) {
	this.showExcludeGPP = showExcludeGPP;
    }

    public void setShowFutureOpenings(boolean showFutureOpenings) {
	this.showFutureOpenings = showFutureOpenings;
    }

    public void setShowGPPAccountsOnly(boolean showGPPAccountsOnly) {
	this.showGPPAccountsOnly = showGPPAccountsOnly;
    }

    public void setShowHighlightedOnly(boolean showHighlightedOnly) {
	this.showHighlightedOnly = showHighlightedOnly;
    }

    public void setShowHotelList(boolean showHotelList) {
	this.showHotelList = showHotelList;
    }

    public void setShowHotelProfile(boolean showHotelProfile) {
	this.showHotelProfile = showHotelProfile;
    }

    public void setShowHotelsSaidDelete(boolean showHotelsSaidDelete) {
	this.showHotelsSaidDelete = showHotelsSaidDelete;
    }

    public void setShowManagedFranchised(boolean showManagedFranchised) {
	this.showManagedFranchised = showManagedFranchised;
    }

    public void setShowNotAccepted(boolean showNotAccepted) {
	this.showNotAccepted = showNotAccepted;
    }

    public void setShowNumberSelected(boolean showNumberSelected) {
	this.showNumberSelected = showNumberSelected;
    }

    public void setShowPgoosFilter(boolean showPgoosFilter) {
	this.showPgoosFilter = showPgoosFilter;
    }

    public void setShowProductLegend(boolean showProductLegend) {
	this.showProductLegend = showProductLegend;
    }

    public void setShowQuarter(boolean showQuarter) {
	this.showQuarter = showQuarter;
    }

    public void setShowRegion(boolean showRegion) {
	this.showRegion = showRegion;
    }

    public void setShowReportList(boolean showReportList) {
	this.showReportList = showReportList;
    }

    public void setShowRPGMinput(boolean showRPGMinput) {
	this.showRPGMinput = showRPGMinput;
    }

    public void setShowRunReport(boolean showRunReport) {
	this.showRunReport = showRunReport;
    }

    public void setShowSAPPModules(boolean showSAPPModules) {
	this.showSAPPModules = showSAPPModules;
    }

    public void setShowSave(boolean showSave) {
	this.showSave = showSave;
    }

    public void setShowScheduleReport(boolean showScheduleReport) {
	this.showScheduleReport = showScheduleReport;
    }

    public void setShowSolicitSelectionFilter(boolean showSolicitSelectionFilter) {
	this.showSolicitSelectionFilter = showSolicitSelectionFilter;
    }

	public void setShowDateFormat(boolean showDateFormat) {
		this.showDateFormat = showDateFormat;
	}

	public boolean getShowDateFormat() {
		return showDateFormat;
	}

	public void setShowByAccountorByRPGM(boolean showByAccountorByRPGM) {
		this.showByAccountorByRPGM = showByAccountorByRPGM;
	}

	public boolean getShowByAccountorByRPGM() {
		return showByAccountorByRPGM;
	}

	public void setShowDateOrYear(boolean showDateOrYear) {
		this.showDateOrYear = showDateOrYear;
	}

	public boolean isShowDateOrYear() {
		return showDateOrYear;
	}

}
