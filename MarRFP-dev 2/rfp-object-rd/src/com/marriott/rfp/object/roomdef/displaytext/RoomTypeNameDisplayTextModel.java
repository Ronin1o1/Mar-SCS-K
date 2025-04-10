package com.marriott.rfp.object.roomdef.displaytext;

import java.util.Vector;


public class RoomTypeNameDisplayTextModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String RTND_ListName;
	private String RTND_ListCode;
	private Vector displayElement;

    
    public RoomTypeNameDisplayTextModel() {
    }




	public String getRTND_ListName() {
		return RTND_ListName;
	}




	public void setRTND_ListName(String listName) {
		RTND_ListName = listName;
	}




	public String getRTND_ListCode() {
		return RTND_ListCode;
	}




	public void setRTND_ListCode(String listCode) {
		RTND_ListCode = listCode;
	}




	public Vector getDisplayElement() {
		return displayElement;
	}


	public void setDisplayElement(Vector displayElement) {
		this.displayElement = displayElement;
	}

 
}


