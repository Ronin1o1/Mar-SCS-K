package com.marriott.rfp.object.roomdef;

import com.marriott.rfp.utility.StringUtility;

public class RoomDefMenuModel {
	private java.lang.String msg = "";
	private String screenid; // screen number
	private java.lang.String title; // menu title
	private String status;

	public RoomDefMenuModel() {
		super();
	}

	public RoomDefMenuModel(String newTitle, String newScreenid, boolean revisit) {
		super();
		setTitle(newTitle);
		setScreenid(newScreenid);
		if (revisit)
			setStatus("R");
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
		if (msg == null)
			msg = "";
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

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}
}