package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificRebidViewInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long rebidRound;
	private boolean showRebid = false;
	private Long rebidstatusidedit;
	private String rebidNotesedit;
	private Date rebidDueDateedit;
	private boolean rebidpastdue;

	private List<RebidStatus> rebidStatusList;

	public void setRebidRound(long rebidRound) {
		this.rebidRound = rebidRound;
	}

	public long getRebidRound() {
		return rebidRound;
	}

	public void setShowRebid(boolean showRebid) {
		this.showRebid = showRebid;
	}

	public boolean getShowRebid() {
		return showRebid;
	}

	public void setRebidstatusidedit(Long rebidstatusidedit) {
		this.rebidstatusidedit = rebidstatusidedit;
	}

	public Long getRebidstatusidedit() {
		return rebidstatusidedit;
	}

	public void setRebidNotesedit(String rebidNotesedit) {
		this.rebidNotesedit = rebidNotesedit;
	}

	public String getRebidNotesedit() {
		return rebidNotesedit;
	}

	public void setRebidDueDateedit(Date rebidDueDateedit) {
		this.rebidDueDateedit = rebidDueDateedit;
	}

	public Date getRebidDueDateedit() {
		return rebidDueDateedit;
	}

	public String getLongRebidDueDateedit() {
		return DateUtility.formatLongDate(rebidDueDateedit);
	}

	public void setRebidpastdue(boolean rebidpastdue) {
		this.rebidpastdue = rebidpastdue;
	}

	public boolean getRebidpastdue() {
		return rebidpastdue;
	}

	public void setRebidStatusList(List<RebidStatus> rebidStatusList) {
		this.rebidStatusList = rebidStatusList;
	}

	public List<RebidStatus> getRebidStatusList() {
		return rebidStatusList;
	}

}
