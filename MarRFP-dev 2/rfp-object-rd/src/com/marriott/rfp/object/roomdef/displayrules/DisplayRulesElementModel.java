package com.marriott.rfp.object.roomdef.displayrules;




public class DisplayRulesElementModel  {
	private String elementCodeList;
	private String elementCode;
	private String elementCodeName;
	
	
	public DisplayRulesElementModel()
	{
		super();
	}

	public String getElementCode() {
		return elementCode;
	}

	public String getElementCodeList() {
		return elementCodeList;
	}

	public String getElementCodeName() {
		return elementCodeName;
	}

	public void setElementCode(String string) {
		elementCode = string;
	}

	public void setElementCodeList(String string) {
		elementCodeList = string;
	}

	public void setElementCodeName(String string) {
		elementCodeName = string;
	}

}


