package com.marriott.rfp.object.roomdef.displaytext;

public class RateProductDisplayTextElementModel {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String RP_ListName;
	private String RP_ListCode;
	protected String RP_GroupName; // attribute
	protected String RP_GroupCode = "0000"; // attribute
	protected String RP_Name="    "; // attribute
	protected String RP_Code="    "; // attribute
	protected String RP_CodeName; // attribute
	private String displayText;

	public RateProductDisplayTextElementModel() {
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


	public String getRP_GroupName() {
		return RP_GroupName;
	}


	public void setRP_GroupName(String groupName) {
		RP_GroupName = groupName;
	}


	public String getRP_GroupCode() {
		return RP_GroupCode;
	}


	public void setRP_GroupCode(String groupCode) {
		RP_GroupCode = groupCode;
	}


	public String getRP_Name() {
		return RP_Name;
	}


	public void setRP_Name(String name) {
		RP_Name = name;
	}


	public String getRP_Code() {
		return RP_Code;
	}


	public void setRP_Code(String code) {
		RP_Code = code;
	}


	public String getRP_CodeName() {
		return RP_CodeName;
	}


	public void setRP_CodeName(String codeName) {
		RP_CodeName = codeName;
	}


	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}

	public String getDisplayText() {
		return displayText;
	}

	public boolean isEqual(String RP_ListCode, String RP_GroupCode, String RP_Code, String RP_Name) {
		if (this.RP_ListCode.equals(RP_ListCode) && this.RP_GroupCode.equals(RP_GroupCode) && this.RP_Code.equals(RP_Code)
				&& this.RP_Name.equals(RP_Name)) {
			return true;
		}
		return false;
	}

}
