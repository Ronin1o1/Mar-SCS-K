package com.marriott.rfp.object.wholesaler.menu;

import java.io.Serializable;

public class WholesalerMenu implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String statusid;
	private int screenid;
	private String screenname;
	private long screensequence;
	private String actionstruts;
	private String message="";
	private int entrystatusid;
	private int level;
	private long roompoolid;
	
	public WholesalerMenu() {
		super();
	}
	
	public WholesalerMenu(String statusid, int screenid, String screenname, long screensequence, String actionstruts, String message, int entrystatusid, int level) {
		super();
		this.statusid = statusid;
		this.screenid = screenid;
		this.screenname = screenname;
		this.screensequence = screensequence;
		this.actionstruts = actionstruts;
		this.message = message;
		this.entrystatusid = entrystatusid;
		this.level = level;
	}
	
	public long getRoompoolid() {
		return roompoolid;
	}

	public void setRoompoolid(long roompoolid) {
		this.roompoolid = roompoolid;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getStatusid() {
		return statusid;
	}
	
	public void setStatusid(String statusid) {
		this.statusid = statusid;
	}
	
	public int getScreenid() {
		return screenid;
	}
	
	public void setScreenid(int screenid) {
		this.screenid = screenid;
	}
	
	public String getScreenname() {
		return screenname;
	}
	
	public void setScreenname(String screenname) {
		this.screenname = screenname;
	}
	
	public long getScreensequence() {
		return screensequence;
	}
	
	public void setScreensequence(long screensequence) {
		this.screensequence = screensequence;
	}
	
	public String getActionstruts() {
		return actionstruts;
	}
	
	public void setActionstruts(String actionstruts) {
		this.actionstruts = actionstruts;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public int getEntrystatusid() {
		return entrystatusid;
	}
	
	public void setEntrystatusid(int entrystatusid) {
		this.entrystatusid = entrystatusid;
	}
	
}