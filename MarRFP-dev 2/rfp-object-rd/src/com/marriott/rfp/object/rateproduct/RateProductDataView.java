package com.marriott.rfp.object.rateproduct;

import java.util.Map;
import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionList;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;

public class RateProductDataView {
	private RateProductDefinitionList rateProductDefinitionList;
	private Vector<RateProductMenuModel> rateProductMenu;
	private String nextMenuOption;
	private String previousMenuOption;
	private Map <String,UnitsOfMeasure> uomLists;
	private Map <String,Brands> brandLists;
	private Map <String,TypeList> typeLists;
	
	public RateProductDataView() {
		
	}

	public RateProductDefinitionList getRateProductDefinitionList() {
		return rateProductDefinitionList;
	}

	public void setRateProductDefinitionList(RateProductDefinitionList rateProductDefinitionList) {
		this.rateProductDefinitionList = rateProductDefinitionList;
	}

	public Vector<RateProductMenuModel> getRateProductMenu() {
		return rateProductMenu;
	}

	public void setRateProductMenu(Vector<RateProductMenuModel> rateProductMenu) {
		this.rateProductMenu = rateProductMenu;
	}

	public String getNextMenuOption() {
		return nextMenuOption;
	}

	public void setNextMenuOption(String nextMenuOption) {
		this.nextMenuOption = nextMenuOption;
	}

	public String getPreviousMenuOption() {
		return previousMenuOption;
	}

	public void setPreviousMenuOption(String previousMenuOption) {
		this.previousMenuOption = previousMenuOption;
	}

	public Map<String, UnitsOfMeasure> getUomLists() {
		return uomLists;
	}

	public void setUomLists(Map<String, UnitsOfMeasure> uomLists) {
		this.uomLists = uomLists;
	}

	public Map<String, Brands> getBrandLists() {
		return brandLists;
	}

	public void setBrandLists(Map<String, Brands> brandLists) {
		this.brandLists = brandLists;
	}

	public Map<String, TypeList> getTypeLists() {
		return typeLists;
	}

	public void setTypeLists(Map<String, TypeList> typeLists) {
		this.typeLists = typeLists;
	}


	
}
