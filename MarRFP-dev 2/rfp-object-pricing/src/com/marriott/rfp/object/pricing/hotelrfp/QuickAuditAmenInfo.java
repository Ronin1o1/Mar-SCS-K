package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class QuickAuditAmenInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long quickaudithtlacctamenid;
	private Long quickauditversion;
	private Date last_updatedrates;
	private String last_updaterateseid;
	private String accountname;
	private List<QuickAuditAmenities> qaamenities;
	private List<QuickAuditRateIncludes> qarateincludes;

	

	public Long getQuickauditversion() {
		return quickauditversion;
	}

	public void setQuickauditversion(Long quickauditversion) {
		this.quickauditversion = quickauditversion;
	}



	public Date getLast_updatedrates() {
		return last_updatedrates;
	}

	public String getFormattedLast_updatedrates() {
		return DateUtility.formatLongDate(last_updatedrates);
	}

	public void setLast_updatedrates(Date last_updatedrates) {
		this.last_updatedrates = last_updatedrates;
	}

	public String getLast_updaterateseid() {
		return last_updaterateseid;
	}

	public void setLast_updaterateseid(String last_updaterateseid) {
		this.last_updaterateseid = last_updaterateseid;
	}


	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setQuickaudithtlacctamenid(Long quickaudithtlacctamenid) {
		this.quickaudithtlacctamenid = quickaudithtlacctamenid;
	}

	public Long getQuickaudithtlacctamenid() {
		return quickaudithtlacctamenid;
	}

	public void setQaamenities(List<QuickAuditAmenities> qaamenities) {
		this.qaamenities = qaamenities;
	}

	public List<QuickAuditAmenities> getQaamenities() {
		return qaamenities;
	}

	public void setQarateincludes(List<QuickAuditRateIncludes> qarateincludes) {
		this.qarateincludes = qarateincludes;
	}

	public List<QuickAuditRateIncludes> getQarateincludes() {
		return qarateincludes;
	}

}
