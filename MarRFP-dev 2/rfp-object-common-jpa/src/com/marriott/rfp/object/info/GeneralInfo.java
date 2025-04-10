package com.marriott.rfp.object.info;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

/**
 * Entity implementation class for Entity: GeneralInfo
 * 
 */
public class GeneralInfo implements Serializable {

	private Long infoid;
	private Date infodate;
	private String infotitle;
	private String infomsg;
	private Date infoexpiredate;

	private static final long serialVersionUID = 1L;

	public GeneralInfo() {
		super();
	}

	public Long getInfoid() {
		return infoid;
	}

	public void setInfoid(Long infoid) {
		this.infoid = infoid;
	}

	public Date getInfodate() {
		return infodate;
	}

	public void setInfodate(Date infodate) {
		this.infodate = infodate;
	}

	public String getShortInfodate() {
		return DateUtility.formatShortDate(infodate);
	}

	public String getInfotitle() {
		return infotitle;
	}

	public void setInfotitle(String infotitle) {
		this.infotitle = infotitle;
	}

	public String getInfomsg() {
		return infomsg;
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

}
