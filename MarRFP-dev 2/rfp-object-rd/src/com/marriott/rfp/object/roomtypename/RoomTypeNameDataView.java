package com.marriott.rfp.object.roomtypename;

import java.util.Map;
import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.AlternateTextList;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionList;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;

public class RoomTypeNameDataView {
	private RoomTypeNameDefinitionList roomTypeNameDefinitionList;
	private Vector<RoomTypeNameMenuModel> roomTypeNameMenu;
	private String nextMenuOption;
	private String previousMenuOption;
	private Map <String,UnitsOfMeasure> uomLists;
	private Map <String,AlternateTextList> alternateTextLists;
	private Map <String,TypeList> typeLists;
	private String brandCode;
	
	public RoomTypeNameDataView() {
		
	}

	public RoomTypeNameDefinitionList getRoomTypeNameDefinitionList() {
		return roomTypeNameDefinitionList;
	}

	public void setRoomTypeNameDefinitionList(RoomTypeNameDefinitionList roomTypeNameDefinitionList) {
		this.roomTypeNameDefinitionList = roomTypeNameDefinitionList;
	}

	public Vector<RoomTypeNameMenuModel> getRoomTypeNameMenu() {
		return roomTypeNameMenu;
	}

	public void setRoomTypeNameMenu(Vector<RoomTypeNameMenuModel> roomTypeNameMenu) {
		this.roomTypeNameMenu = roomTypeNameMenu;
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

	
	public Map<String, AlternateTextList> getAlternateTextLists() {
		return alternateTextLists;
	}

	public void setAlternateTextLists(Map<String, AlternateTextList> alternateTextLists) {
		this.alternateTextLists = alternateTextLists;
	}

	public Map<String, TypeList> getTypeLists() {
		return typeLists;
	}

	public void setTypeLists(Map<String, TypeList> typeLists) {
		this.typeLists = typeLists;
	}

	public void setBrandCode(String brandCode) {
		this.brandCode = brandCode;
	}

	public String getBrandCode() {
		return brandCode;
	}


	
}
