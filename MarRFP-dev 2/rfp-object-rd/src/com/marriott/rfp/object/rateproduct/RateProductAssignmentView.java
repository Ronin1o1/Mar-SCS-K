package com.marriott.rfp.object.rateproduct;

import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentsSearch;

public class RateProductAssignmentView {
	private Vector <RateProductAssignmentDataView>ratePlanAssignmentDataList;
	private RatePlanAssignmentsSearch ratePlanAssignmentsSearch;
	private Vector<RateProductMenuModel> rateProductMenu;
	
	public RateProductAssignmentView() {
		
	}


	public Vector<RateProductMenuModel> getRateProductMenu() {
		return rateProductMenu;
	}

	public void setRateProductMenu(Vector<RateProductMenuModel> rateProductMenu) {
		this.rateProductMenu = rateProductMenu;
	}




	@SuppressWarnings("rawtypes")
	public Vector getRatePlanAssignmentDataList() {
		return ratePlanAssignmentDataList;
	}


	public void setRatePlanAssignmentDataList(Vector<RateProductAssignmentDataView> ratePlanAssignmentDataList) {
		this.ratePlanAssignmentDataList = ratePlanAssignmentDataList;
	}


	public void setRatePlanAssignmentsSearch(RatePlanAssignmentsSearch ratePlanAssignmentsSearch) {
		this.ratePlanAssignmentsSearch = ratePlanAssignmentsSearch;
	}


	public RatePlanAssignmentsSearch getRatePlanAssignmentsSearch() {
		return ratePlanAssignmentsSearch;
	}

	
}
