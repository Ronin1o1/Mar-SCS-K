package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificViewInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long rebidRound;
	private boolean showRebid = false;
	private Long rebidstatusidedit;
	private String rebidNotesedit;
	private Date rebidDueDateedit;
	private boolean rebidpastdue;
	private boolean ratesReadOnly;
	private boolean seasonsEditable;
	private boolean losEditable;
	private boolean fixedEditable;
	private String comparerates;
	private long rategridcolspan;
	private long rategridLOSwidth;
	private long rategridtablewidth;
	private long rategridheadercolspan;
	private long countRules;
	private long totalRulesRows;
	private long countAmenities;
	private long totalAmenitiesRows;
	private boolean hasAccountRates;
	private boolean canPickFacility;
	private long maxLOS;
	private long maxSeasons;
	private List<RebidStatus> rebidStatusList;
	private boolean isSalesEditable;
	private long numblackouts;
	private boolean blackoutsEditable;
	private boolean checkNumBlackouts;
	private long minroomtype;
	private boolean breakfastRuleEditable;
	//INC000006143774 - MarRFP Issue: Nearest Facility - distance unit//
	private String propertyDistanceUnit;
	//MRFP-8081 Alert issue for limited Sales user
	private String limitedSalesRate;

	//INC000006143774 - MarRFP Issue: Nearest Facility - distance unit//

	public void setRebidRound(long rebidRound) {
		this.rebidRound = rebidRound;
	}

	public long getRebidRound() {
		return rebidRound;
	}

	public void setShowRebid(boolean showRebid) {
		this.showRebid = showRebid;
	}

	public boolean getShowRebid() {
		return showRebid;
	}

	public void setRebidstatusidedit(Long rebidstatusidedit) {
		this.rebidstatusidedit = rebidstatusidedit;
	}

	public Long getRebidstatusidedit() {
		return rebidstatusidedit;
	}

	public void setRebidNotesedit(String rebidNotesedit) {
		this.rebidNotesedit = rebidNotesedit;
	}

	public String getRebidNotesedit() {
		return rebidNotesedit;
	}

	public void setRebidDueDateedit(Date rebidDueDateedit) {
		this.rebidDueDateedit = rebidDueDateedit;
	}

	public Date getRebidDueDateedit() {
		return rebidDueDateedit;
	}

	public String getLongRebidDueDateedit() {
		return DateUtility.formatLongDate(rebidDueDateedit);
	}

	public boolean getRatesReadOnly() {
		return ratesReadOnly;
	}

	public void setRatesReadOnly(boolean ratesReadOnly) {
		this.ratesReadOnly = ratesReadOnly;
	}

	public boolean getSeasonsEditable() {
		return seasonsEditable;
	}

	public void setSeasonsEditable(boolean seasonsEditable) {
		this.seasonsEditable = seasonsEditable;
	}

	public boolean getLosEditable() {
		return losEditable;
	}

	public void setLosEditable(boolean losEditable) {
		this.losEditable = losEditable;
	}

	public long getRategridcolspan() {
		return rategridcolspan;
	}

	public void setRategridcolspan(long rategridcolspan) {
		this.rategridcolspan = rategridcolspan;
	}

	public long getRategridLOSwidth() {
		return rategridLOSwidth;
	}

	public void setRategridLOSwidth(long rategridLOSwidth) {
		this.rategridLOSwidth = rategridLOSwidth;
	}

	public long getRategridtablewidth() {
		return rategridtablewidth;
	}

	public void setRategridtablewidth(long rategridtablewidth) {
		this.rategridtablewidth = rategridtablewidth;
	}

	public void setFixedEditable(boolean fixedEditable) {
		this.fixedEditable = fixedEditable;
	}

	public boolean getFixedEditable() {
		return fixedEditable;
	}

	public void setCountRules(long countRules) {
		this.countRules = countRules;
	}

	public long getCountRules() {
		return countRules;
	}

	public void setTotalRulesRows(long totalRulesRows) {
		this.totalRulesRows = totalRulesRows;
	}

	public long getTotalRulesRows() {
		return totalRulesRows;
	}

	public void setHasAccountRates(boolean hasAccountRates) {
		this.hasAccountRates = hasAccountRates;
	}

	public boolean getHasAccountRates() {
		return hasAccountRates;
	}

	public void setRategridheadercolspan(long rategridheadercolspan) {
		this.rategridheadercolspan = rategridheadercolspan;
	}

	public long getRategridheadercolspan() {
		return rategridheadercolspan;
	}

	public void setCanPickFacility(boolean canPickFacility) {
		this.canPickFacility = canPickFacility;
	}

	public boolean getCanPickFacility() {
		return canPickFacility;
	}

	public void setMaxLOS(long maxLOS) {
		this.maxLOS = maxLOS;
	}

	public long getMaxLOS() {
		return maxLOS;
	}

	public void setMaxSeasons(long maxSeasons) {
		this.maxSeasons = maxSeasons;
	}

	public long getMaxSeasons() {
		return maxSeasons;
	}

	public void setRebidpastdue(boolean rebidpastdue) {
		this.rebidpastdue = rebidpastdue;
	}

	public boolean getRebidpastdue() {
		return rebidpastdue;
	}

	public void setRebidStatusList(List<RebidStatus> rebidStatusList) {
		this.rebidStatusList = rebidStatusList;
	}

	public List<RebidStatus> getRebidStatusList() {
		return rebidStatusList;
	}

	public void setCountAmenities(long countAmenities) {
		this.countAmenities = countAmenities;
	}

	public long getCountAmenities() {
		return countAmenities;
	}

	public void setTotalAmenitiesRows(long totalAmenitiesRows) {
		this.totalAmenitiesRows = totalAmenitiesRows;
	}

	public long getTotalAmenitiesRows() {
		return totalAmenitiesRows;
	}

	public void setSalesEditable(boolean isSalesEditable) {
		this.isSalesEditable = isSalesEditable;
	}

	public boolean getIsSalesEditable() {
		return isSalesEditable;
	}

	public void setNumblackouts(long numblackouts) {
		this.numblackouts = numblackouts;
	}

	public long getNumblackouts() {
		return numblackouts;
	}

	public void setBlackoutsEditable(boolean blackoutsEditable) {
		this.blackoutsEditable = blackoutsEditable;
	}

	public boolean getBlackoutsEditable() {
		return blackoutsEditable;
	}

	public void setCheckNumBlackouts(boolean checkNumBlackouts) {
		this.checkNumBlackouts = checkNumBlackouts;
	}

	public boolean getCheckNumBlackouts() {
		return checkNumBlackouts;
	}

	public String getLosInputType() {
		String losInputType = "text";
		if (rategridLOSwidth == 0)
			losInputType = "hidden";
		return losInputType;
	}

	public void setComparerates(String comparerates) {
		this.comparerates = comparerates;
	}

	public String getComparerates() {
		return comparerates;
	}

	public void setMinroomtype(long minroomtype) {
		this.minroomtype = minroomtype;
	}

	public long getMinroomtype() {
		return minroomtype;
	}

	public void setBreakfastRuleEditable(boolean breakfastRuleEditable) {
	    this.breakfastRuleEditable = breakfastRuleEditable;
	}

	public boolean isBreakfastRuleEditable() {
	    return breakfastRuleEditable;
	}
	//INC000006143774 - MarRFP Issue: Nearest Facility - distance unit//
	public String getPropertyDistanceUnit() {
		return propertyDistanceUnit;
	}

	public void setPropertyDistanceUnit(String propertyDistanceUnit) {
		this.propertyDistanceUnit = propertyDistanceUnit;
	}
	//INC000006143774 - MarRFP Issue: Nearest Facility - distance unit//


	public String getLimitedSalesRate() {
		return limitedSalesRate;
	}

	public void setLimitedSalesRate(String limitedSalesRate) {
		this.limitedSalesRate = limitedSalesRate;
	}
}
