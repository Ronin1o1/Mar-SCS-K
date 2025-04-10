package com.marriott.rfp.object.rateproduct;

import com.marriott.rfp.utility.StringUtility;



public class RateProductMenuModel{
	private java.lang.String msg="";
	private String screenid; //screen number
	private java.lang.String title; //menu title
	public RateProductMenuModel() {
		super();  
	} 
	public RateProductMenuModel(
		String newTitle,
		String newScreenid) {


		super();
		setTitle(newTitle);
		setScreenid(newScreenid);
	}


	public java.lang.String getMsg() {
		return msg;
	}
	public String getStatusTitle() {
		if (title != null)
			return StringUtility.replace(title, "'", "\'");
		return "";
	}

	public java.lang.String getTitle() {
		return title;
	}
	
	public void setMsg(java.lang.String msg) {
	    if (msg==null)
	        msg="";
		this.msg = msg;
	}
	
	public void setScreenid(String newScreenid) {
		screenid = newScreenid;
	}
	
	public void setTitle(java.lang.String newTitle) {
		title = newTitle;
	}

    public String getScreenid() {
        return screenid;
    }
}