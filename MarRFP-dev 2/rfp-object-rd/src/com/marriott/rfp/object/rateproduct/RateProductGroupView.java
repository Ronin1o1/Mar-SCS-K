package com.marriott.rfp.object.rateproduct;

import java.util.Vector;

public class RateProductGroupView {
	private String  RP_GroupCode;
	private String RP_GroupName;
	@SuppressWarnings("rawtypes")
	private Vector rateProductView;
	
	public RateProductGroupView() {
		
	}

	public String getRP_GroupCode() {
		return RP_GroupCode;
	}

	public void setRP_GroupCode(String groupCode) {
		RP_GroupCode = groupCode;
	}

	public String getRP_GroupName() {
		return RP_GroupName;
	}

	public void setRP_GroupName(String groupName) {
		RP_GroupName = groupName;
	}

	@SuppressWarnings("rawtypes")
	public Vector getRateProductView() {
		return rateProductView;
	}

	@SuppressWarnings("rawtypes")
	public void setRateProductView(Vector rateProductView) {
		this.rateProductView = rateProductView;
	}

	
}
