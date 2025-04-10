package com.marriott.rfp.object.roomdef.displaytext;

import java.util.Vector;


public class RateProductDisplayTextModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String RP_ListName;
	private String RP_ListCode;
	private Vector displayElement;

    
    public RateProductDisplayTextModel() {
    }


	public String getRP_ListName() {
		return RP_ListName;
	}


	public void setRP_ListName(String listName) {
		RP_ListName = listName;
	}


	public String getRP_ListCode() {
		return RP_ListCode;
	}


	public void setRP_ListCode(String listCode) {
		RP_ListCode = listCode;
	}


	public Vector getDisplayElement() {
		return displayElement;
	}


	public void setDisplayElement(Vector displayElement) {
		this.displayElement = displayElement;
	}

 
}


