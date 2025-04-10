package com.marriott.rfp.object.roomdef.displaytext;


public class DisplayTextElementModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private String elementTypeName; // attribute
    private String elementTypeCode; // attribute
    private String elementGroupName; // attribute
    private String elementGroupCode; // attribute
    private String elementCodeList = "    "; // attribute
    private String elementCode = "    "; // attribute
    private String elementCodeName; // attribute
    private String calloutInd;
    private String displayText;
    
    public DisplayTextElementModel() {
    }


    /**
     * @return
     */
    public java.lang.String getCalloutInd() {
        return calloutInd;
    }

    /**
     * @return
     */
    public java.lang.String getElementCode() {
        return elementCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementCodeList() {
        return elementCodeList;
    }

    /**
     * @return
     */
    public java.lang.String getElementGroupCode() {
        return elementGroupCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementGroupName() {
        return elementGroupName;
    }

    /**
     * @return
     */
    public java.lang.String getElementTypeCode() {
        return elementTypeCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementTypeName() {
        return elementTypeName;
    }


    /**
     * @param string
     */
    public void setCalloutInd(java.lang.String string) {
        calloutInd = string;
    }

    /**
     * @param string
     */
    public void setElementCode(java.lang.String string) {
        elementCode = string;
    }

    /**
     * @param string
     */
    public void setElementCodeList(java.lang.String string) {
        if (string == null || string.equals(""))
            string = "    ";
       elementCodeList = string;
    }

    /**
     * @param string
     */
    public void setElementGroupCode(java.lang.String string) {
        elementGroupCode = string;
    }

    /**
     * @param string
     */
    public void setElementGroupName(java.lang.String string) {
        elementGroupName = string;
    }

    /**
     * @param string
     */
    public void setElementTypeCode(java.lang.String string) {
        elementTypeCode = string;
    }

    /**
     * @param string
     */
    public void setElementTypeName(java.lang.String string) {
        elementTypeName = string;
    }

 
    /**
     * @return
     */
    public java.lang.String getElementCodeName() {
        return elementCodeName;
    }

    /**
     * @param string
     */
    public void setElementCodeName(java.lang.String string) {
        if (string == null || string.equals(""))
            string = "    ";
        elementCodeName = string;
    }


	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}


	public String getDisplayText() {
		return displayText;
	}

   
	public boolean isEqual(String elementTypeCode, String elementGroupCode, String elementCodeList, String elementCode, String calloutInd  ) {
		if (this.elementTypeCode.equals(elementTypeCode) && this.elementGroupCode.equals(elementGroupCode) && this.elementCodeList.equals(elementCodeList) && this.elementCode.equals(elementCode)) {
			if ((this.calloutInd == null && calloutInd==null) || (this.calloutInd!=null  && calloutInd !=null && this.calloutInd.equals(calloutInd)))
				return true;
		}
		return false;
	}
}


