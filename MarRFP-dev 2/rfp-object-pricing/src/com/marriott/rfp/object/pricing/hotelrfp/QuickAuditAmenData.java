package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class QuickAuditAmenData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<QuickAuditAmenInfo> quickAuditAmenInfo;

	public long getNumAudits() {
		if (quickAuditAmenInfo != null)
			return quickAuditAmenInfo.size();
		else
			return 0;
	}

	public void setQuickAuditAmenInfo(List<QuickAuditAmenInfo> quickAuditAmenInfo) {
		this.quickAuditAmenInfo = quickAuditAmenInfo;
	}

	public List<QuickAuditAmenInfo> getQuickAuditAmenInfo() {
		return quickAuditAmenInfo;
	}
}
