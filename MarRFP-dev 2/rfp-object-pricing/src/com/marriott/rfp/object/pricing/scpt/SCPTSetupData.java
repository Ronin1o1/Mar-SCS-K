package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;


import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpBudgetAndForecastData;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpGenInfo;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpRetailRate;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpAmenities;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpThresholds;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpWtdRetailRate;


public class SCPTSetupData  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String brandName;
	private String updateSCPTPricing;
	private String scptSetUpFormChg;
	private String scptSetUpGenInfoFormChg;
	private String scptSetUpRetailRateFormChg;
	private String scptSetUpAmenitiesFormChg;
	private String scptSetUpThresholdsFormChg;
	private String scptSetUpBudgetAndForecastFormChg;
	private String isLocked;
	private String lastUpdatedUser;
	private String setuptab_last_updated ;	
	private String checkUpdateSCPT ;
	private String userRole;
	private String isBrandExtendedStay;
	private Long scpt_accountid=1L;

	private SCPTSetUpGenInfo scptSetUpGenInfo;
	private List<Season> seasonList;
	private List<SCPTSetUpRetailRate> scptSetUpRetailRate;
	private SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate;
	private SCPTSetUpAmenities scptSetUpAmenities;
	private SCPTSetUpThresholds scptSetUpThresholds;
	private SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData;
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getUpdateSCPTPricing() {
		return updateSCPTPricing;
	}
	public void setUpdateSCPTPricing(String updateSCPTPricing) {
		this.updateSCPTPricing = updateSCPTPricing;
	}
	public String getScptSetUpFormChg() {
		return scptSetUpFormChg;
	}
	public void setScptSetUpFormChg(String scptSetUpFormChg) {
		this.scptSetUpFormChg = scptSetUpFormChg;
	}
	public String getScptSetUpGenInfoFormChg() {
		return scptSetUpGenInfoFormChg;
	}
	public void setScptSetUpGenInfoFormChg(String scptSetUpGenInfoFormChg) {
		this.scptSetUpGenInfoFormChg = scptSetUpGenInfoFormChg;
	}
	public String getScptSetUpRetailRateFormChg() {
		return scptSetUpRetailRateFormChg;
	}
	public void setScptSetUpRetailRateFormChg(String scptSetUpRetailRateFormChg) {
		this.scptSetUpRetailRateFormChg = scptSetUpRetailRateFormChg;
	}
	public String getScptSetUpAmenitiesFormChg() {
		return scptSetUpAmenitiesFormChg;
	}
	public void setScptSetUpAmenitiesFormChg(String scptSetUpAmenitiesFormChg) {
		this.scptSetUpAmenitiesFormChg = scptSetUpAmenitiesFormChg;
	}
	public String getScptSetUpThresholdsFormChg() {
		return scptSetUpThresholdsFormChg;
	}
	public void setScptSetUpThresholdsFormChg(String scptSetUpThresholdsFormChg) {
		this.scptSetUpThresholdsFormChg = scptSetUpThresholdsFormChg;
	}
	public String getScptSetUpBudgetAndForecastFormChg() {
		return scptSetUpBudgetAndForecastFormChg;
	}
	public void setScptSetUpBudgetAndForecastFormChg(String scptSetUpBudgetAndForecastFormChg) {
		this.scptSetUpBudgetAndForecastFormChg = scptSetUpBudgetAndForecastFormChg;
	}
	public String getIsLocked() {
		return isLocked;
	}
	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}
	public String getLastUpdatedUser() {
		return lastUpdatedUser;
	}
	public void setLastUpdatedUser(String lastUpdatedUser) {
		this.lastUpdatedUser = lastUpdatedUser;
	}
	public String getSetuptab_last_updated() {
		return setuptab_last_updated;
	}
	public void setSetuptab_last_updated(String setuptab_last_updated) {
		this.setuptab_last_updated = setuptab_last_updated;
	}
	public String getCheckUpdateSCPT() {
		return checkUpdateSCPT;
	}
	public void setCheckUpdateSCPT(String checkUpdateSCPT) {
		this.checkUpdateSCPT = checkUpdateSCPT;
	}
	public SCPTSetUpGenInfo getScptSetUpGenInfo() {
		return scptSetUpGenInfo;
	}
	public void setScptSetUpGenInfo(SCPTSetUpGenInfo scptSetUpGenInfo) {
		this.scptSetUpGenInfo = scptSetUpGenInfo;
	}
	public List<Season> getSeasonList() {
		return seasonList;
	}
	public void setSeasonList(List<Season> seasonList) {
		this.seasonList = seasonList;
	}
	public List<SCPTSetUpRetailRate> getScptSetUpRetailRate() {
		return scptSetUpRetailRate;
	}
	public void setScptSetUpRetailRate(List<SCPTSetUpRetailRate> scptSetUpRetailRate) {
		this.scptSetUpRetailRate = scptSetUpRetailRate;
	}
	public SCPTSetUpWtdRetailRate getScptSetUpWtdRetailRate() {
		return scptSetUpWtdRetailRate;
	}
	public void setScptSetUpWtdRetailRate(SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate) {
		this.scptSetUpWtdRetailRate = scptSetUpWtdRetailRate;
	}
	public SCPTSetUpAmenities getScptSetUpAmenities() {
		return scptSetUpAmenities;
	}
	public void setScptSetUpAmenities(SCPTSetUpAmenities scptSetUpAmenities) {
		this.scptSetUpAmenities = scptSetUpAmenities;
	}
	public SCPTSetUpThresholds getScptSetUpThresholds() {
		return scptSetUpThresholds;
	}
	public void setScptSetUpThresholds(SCPTSetUpThresholds scptSetUpThresholds) {
		this.scptSetUpThresholds = scptSetUpThresholds;
	}
	public SCPTSetUpBudgetAndForecastData getScptSetUpBudgetAndForecastData() {
		return scptSetUpBudgetAndForecastData;
	}
	public void setScptSetUpBudgetAndForecastData(SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData) {
		this.scptSetUpBudgetAndForecastData = scptSetUpBudgetAndForecastData;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	public String getIsBrandExtendedStay() {
		return isBrandExtendedStay;
	}
	public void setIsBrandExtendedStay(String isBrandExtendedStay) {
		this.isBrandExtendedStay = isBrandExtendedStay;
	}
	@JsonIgnore
	public Long getScpt_accountid() {
		return scpt_accountid;
	}
	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}
	
	
}
