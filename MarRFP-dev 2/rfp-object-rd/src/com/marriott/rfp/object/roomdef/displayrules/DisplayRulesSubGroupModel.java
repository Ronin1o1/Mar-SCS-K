package com.marriott.rfp.object.roomdef.displayrules;


import java.util.Vector;


public class DisplayRulesSubGroupModel  {
	private String elementGroupName;
	private String elementGroupCode;
	private Vector elements=new Vector();
	
	
	public DisplayRulesSubGroupModel()
	{
		super();
	}

	public String getElementGroupCode() {
		return elementGroupCode;
	}

	public String getElementGroupName() {
		return elementGroupName;
	}

	public void setElementGroupCode(String string) {
		elementGroupCode = string;
	}

	public void setElementGroupName(String string) {
		elementGroupName = string;
	}

	public Vector getElements() {
		return elements;
	}

	public void setElements(Vector vector) {
		elements = vector;
	}

}


