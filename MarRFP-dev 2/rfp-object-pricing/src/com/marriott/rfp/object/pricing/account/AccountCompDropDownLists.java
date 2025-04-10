package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.util.List;

public class AccountCompDropDownLists implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<ComplexityAndRatings> addQuestCompList; 
	private List<ComplexityAndRatings> satRatingList;
	private List<ComplexityAndRatings> tacBonusList;
	
	public List<ComplexityAndRatings> getAddQuestCompList() {
		return addQuestCompList;
	}
	public void setAddQuestCompList(List<ComplexityAndRatings> addQuestCompList) {
		this.addQuestCompList = addQuestCompList;
	}
	public List<ComplexityAndRatings> getSatRatingList() {
		return satRatingList;
	}
	public void setSatRatingList(List<ComplexityAndRatings> satRatingList) {
		this.satRatingList = satRatingList;
	}
	public List<ComplexityAndRatings> getTacBonusList() {
		return tacBonusList;
	}
	public void setTacBonusList(List<ComplexityAndRatings> tacBonusList) {
		this.tacBonusList = tacBonusList;
	}
	
}
