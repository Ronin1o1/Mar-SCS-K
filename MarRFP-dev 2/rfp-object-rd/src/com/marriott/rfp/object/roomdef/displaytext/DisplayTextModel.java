package com.marriott.rfp.object.roomdef.displaytext;

import java.util.Vector;


public class DisplayTextModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String elementTypeName;
	private String elementTypeCode;
	private Vector displayElement;

    
    public DisplayTextModel() {
    }


	public String getElementTypeName() {
		return elementTypeName;
	}


	public void setElementTypeName(String elementTypeName) {
		this.elementTypeName = elementTypeName;
	}


	public String getElementTypeCode() {
		return elementTypeCode;
	}


	public void setElementTypeCode(String elementTypeCode) {
		this.elementTypeCode = elementTypeCode;
	}


	public Vector getDisplayElement() {
		return displayElement;
	}


	public void setDisplayElement(Vector displayElement) {
		this.displayElement = displayElement;
	}

 
}


