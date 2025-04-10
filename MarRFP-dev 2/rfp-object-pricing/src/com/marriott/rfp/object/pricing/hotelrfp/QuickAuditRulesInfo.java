package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;


public class QuickAuditRulesInfo implements Serializable {

	private static final long serialVersionUID = 1L;	
	private Long quickaudithtlacctruleid;
	private Long quickauditversion;
	private Date last_updatedrules;
	private String last_updaterateseid;
	private List<QuickAuditRules> qarules;
	
	public Long getQuickaudithtlacctruleid() {
		return quickaudithtlacctruleid;
	}

	public void setQuickaudithtlacctruleid(Long quickaudithtlacctruleid) {
		this.quickaudithtlacctruleid = quickaudithtlacctruleid;
	}

	public Date getLast_updatedrules() {
		return last_updatedrules;
	}

	public void setLast_updatedrules(Date last_updatedrules) {
		this.last_updatedrules = last_updatedrules;
	}
	
	public String getFormattedLast_updatedrates() {
		return DateUtility.formatLongDate(last_updatedrules);
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setLast_updaterateseid(String last_updaterateseid) {
		this.last_updaterateseid = last_updaterateseid;
	}

	public Long getQuickauditversion() {
		return quickauditversion;
	}

	public void setQuickauditversion(Long quickauditversion) {
		this.quickauditversion = quickauditversion;
	}

	public String getLast_updaterateseid() {
		return last_updaterateseid;
	}

	public void setQarules(List<QuickAuditRules> qarules) {
		this.qarules = qarules;
	}

	public List<QuickAuditRules> getQarules() {
		return qarules;
	}

}
