package com.marriott.rfp.object.rateproduct;

import com.marriott.rfp.utility.StringUtility;


public class RateProductAssignmentDataView {
	private String ratePlanCode;
	private String ratePlanName;
	private String ratePlanManaged="false";
	private String productCode;
	private String productName;
	private String productManaged="false";
	private String lockedLevel;
	private String assign;
	private String lock;
	private boolean isLocked;
	private boolean isAllowAssign=false;

	public RateProductAssignmentDataView() {

	}

	public String getRatePlanCode() {
		return ratePlanCode;
	}

	public void setRatePlanCode(String ratePlanCode) {
		this.ratePlanCode = ratePlanCode;
	}

	public String getRatePlanName() {
		return ratePlanName;
	}
	
	public String getUnquotedRatePlanName() {
		return StringUtility.replace(ratePlanName, "'", "\\'");
	}

	public void setRatePlanName(String ratePlanName) {
		this.ratePlanName = ratePlanName;
	}

	public String getRatePlanManaged() {
		return ratePlanManaged;
	}

	public void setRatePlanManaged(String ratePlanManaged) {
		this.ratePlanManaged = ratePlanManaged;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductManaged() {
		return productManaged;
	}

	public void setProductManaged(String productManaged) {
		this.productManaged = productManaged;
	}

	public String getLockedLevel() {
		return lockedLevel;
	}

	public void setLockedLevel(String lockedLevel) {
		this.lockedLevel = lockedLevel;
	}

	public void setIsAllowAssign(boolean isAllowAssign) {
		this.isAllowAssign = isAllowAssign;
	}

	public boolean getIsAllowAssign() {
		return isAllowAssign;
	}

	public void setAssign(String assign) {
		this.assign = assign;
	}

	public String getAssign() {
		return assign;
	}


	public void setIsLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}

	public boolean getIsLocked() {
		return isLocked;
	}

	public void setLock(String lock) {
		this.lock = lock;
	}

	public String getLock() {
		return lock;
	}

	
}
