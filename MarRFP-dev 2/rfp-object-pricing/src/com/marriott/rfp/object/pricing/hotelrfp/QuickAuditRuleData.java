package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;
public class QuickAuditRuleData implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private List<QuickAuditRulesInfo> quickAuditRulesInfo;
	private List<HotelRFPRmPools> roompoollist;
	
	public long getNumAudits() {
		if (quickAuditRulesInfo != null)
			return quickAuditRulesInfo.size();
		else
			return 0;
	}

	public void setQuickAuditRulesInfo(List<QuickAuditRulesInfo> quickAuditRulesInfo) {
		this.quickAuditRulesInfo = quickAuditRulesInfo;
	}

	public List<QuickAuditRulesInfo> getQuickAuditRulesInfo() {
		return quickAuditRulesInfo;
	}

	public void setRoompoollist(List<HotelRFPRmPools> roompoollist) {
		this.roompoollist = roompoollist;
	}

	public List<HotelRFPRmPools> getRoompoollist() {
		return roompoollist;
	}

	
}
