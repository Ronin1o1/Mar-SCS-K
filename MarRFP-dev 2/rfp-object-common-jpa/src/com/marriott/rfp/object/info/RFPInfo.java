package com.marriott.rfp.object.info;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

/**
 * Entity implementation class for Entity: Info
 * 
 */

public class RFPInfo implements Serializable {

	private Long infoid;
	private Date infodate;
	private String infotitle;
	private String infomsg;
	private Date infoexpiredate;
	private Long infotypeid;
	private String infotype;
	private List<String> roles;
	private String groups;

	private static final long serialVersionUID = 1L;

	public RFPInfo() {
		super();
	}

	public Long getInfoid() {
		return this.infoid;
	}

	public void setInfoid(Long infoid) {
		this.infoid = infoid;
	}

	public Date getInfodate() {
		return this.infodate;
	}

	public String getShortInfodate() {
		return DateUtility.formatShortDate(infodate);
	}

	public void setInfodate(Date infodate) {
		this.infodate = infodate;
	}

	public String getInfotitle() {
		return this.infotitle;
	}

	public void setInfotitle(String infotitle) {
		this.infotitle = infotitle;
	}

	public String getInfomsg() {
		return this.infomsg;
	}

	public void setInfomsg(String infomsg) {
		this.infomsg = infomsg;
	}

	public Date getInfoexpiredate() {
		return infoexpiredate;
	}

	public String getShortInfoexpiredate() {
		return DateUtility.formatShortDate(infoexpiredate);
	}

	public void setInfoexpiredate(Date infoexpiredate) {
		this.infoexpiredate = infoexpiredate;
	}

	public Long getInfotypeid() {
		return infotypeid;
	}

	public void setInfotypeid(Long infotypeid) {
		this.infotypeid = infotypeid;
	}

	public String getInfotype() {
		return infotype;
	}

	public void setInfotype(String infotype) {
		this.infotype = infotype;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public String getStringRoles() {
		String thelist = "";
		for (String role : roles) {
			if (thelist != null && !thelist.equals(""))
				thelist += ", ";
			thelist += "'" + role + "'";
		}
		return thelist;
	}

	public String getGroups() {
		return groups;
	}

	public void setGroups(String groups) {
		this.groups = groups;
	}

}
