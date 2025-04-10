package com.marriott.rfp.object.roomdef.displaytext;

public class RoomTypeNameDisplayTextElementModel {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String RTND_ListName;
	private String RTND_ListCode;
	protected String RTND_GroupName; // attribute
	protected String RTND_GroupCode = "0000"; // attribute
	protected String RTND_Name="    "; // attribute
	protected String RTND_Code="    "; // attribute
	protected String RTND_CodeName; // attribute
	private String displayText;

	public RoomTypeNameDisplayTextElementModel() {
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

	public String getRTND_GroupName() {
		return RTND_GroupName;
	}

	public void setRTND_GroupName(String groupName) {
		RTND_GroupName = groupName;
	}

	public String getRTND_GroupCode() {
		return RTND_GroupCode;
	}

	public void setRTND_GroupCode(String groupCode) {
		RTND_GroupCode = groupCode;
	}

	public String getRTND_Name() {
		return RTND_Name;
	}

	public void setRTND_Name(String name) {
		RTND_Name = name;
	}

	public String getRTND_Code() {
		return RTND_Code;
	}

	public void setRTND_Code(String code) {
		RTND_Code = code;
	}

	public String getRTND_CodeName() {
		return RTND_CodeName;
	}

	public void setRTND_CodeName(String codeName) {
		RTND_CodeName = codeName;
	}

	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}

	public String getDisplayText() {
		return displayText;
	}

	public boolean isEqual(String RTND_ListCode, String RTND_GroupCode, String RTND_Code, String RTND_Name) {
		if (this.RTND_ListCode.equals(RTND_ListCode) && this.RTND_GroupCode.equals(RTND_GroupCode) && this.RTND_Code.equals(RTND_Code)
				&& this.RTND_Name.equals(RTND_Name)) {
			return true;
		}
		return false;
	}

}
