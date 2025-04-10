package com.marriott.rfp.object.roomdef;

import java.util.Map;
import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.Formats;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;

public class RoomDefDataView {
	private ProductView productView;
	private Vector<RoomDefMenuModel> roomDefMenu;
	private Vector<RoomDefMenuModel> roomDefRateProgMenu;
	private String nextMenuOption;
	private String previousMenuOption;
	private Map <String,UnitsOfMeasure> uomLists;
	private Map <String,Brands> brandLists;
	private Map <String,Formats> formatLists;
	private Language[] language;
	
	public RoomDefDataView() {
		
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

	public Vector<RoomDefMenuModel> getRoomDefMenu() {
		return roomDefMenu;
	}

	public void setRoomDefMenu(Vector<RoomDefMenuModel> roomDefMenu) {
		this.roomDefMenu = roomDefMenu;
	}

	public Map<String, Brands> getBrandLists() {
		return brandLists;
	}

	public void setBrandLists(Map<String, Brands> brandLists) {
		this.brandLists = brandLists;
	}

	public Map<String, Formats> getFormatLists() {
		return formatLists;
	}

	public void setFormatLists(Map<String, Formats> formatLists) {
		this.formatLists = formatLists;
	}


	public void setProductView(ProductView productView) {
		this.productView = productView;
	}


	public ProductView getProductView() {
		return productView;
	}


	public void setLanguage(Language[] language) {
		this.language = language;
	}


	public Language[] getLanguage() {
		return language;
	}


	public void setRoomDefRateProgMenu(Vector<RoomDefMenuModel> roomDefRateProgMenu) {
	    this.roomDefRateProgMenu = roomDefRateProgMenu;
	}


	public Vector<RoomDefMenuModel> getRoomDefRateProgMenu() {
	    return roomDefRateProgMenu;
	}

	
	
}
