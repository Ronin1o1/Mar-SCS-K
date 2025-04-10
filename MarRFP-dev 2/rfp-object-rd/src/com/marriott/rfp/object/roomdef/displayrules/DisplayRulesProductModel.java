package com.marriott.rfp.object.roomdef.displayrules;


import java.util.Vector;


public class DisplayRulesProductModel {
	private String elementTypeName;
	private String elementTypeCode;
	private Vector elementGroups=new Vector();
	
	
	public DisplayRulesProductModel()
	{
		super();
	}

	protected Comparable key() {
		return null;
	}

	public Vector getElementGroups() {
		return elementGroups;
	}

	public String getElementTypeCode() {
		return elementTypeCode;
	}

	public String getElementTypeName() {
		return elementTypeName;
	}

	public void setElementGroups(Vector vector) {
		elementGroups = vector;
	}

	public void setElementTypeCode(String string) {
		elementTypeCode = string;
	}

	public void setElementTypeName(String string) {
		elementTypeName = string;
	}

}


