package com.marriott.rfp.object.pricing.sapp;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marriott.rfp.utility.DateUtility;


public class AcctTasks implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long 	accintdetailid;
	private Long 	initiativeid;
	private Long 	seqid;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	private Date 	begindate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	private Date 	enddate;
	private String 	taskDesc;
	private String 	responsible;
	
	public Long getAccintdetailid() {
		return accintdetailid;
	}
	public void setAccintdetailid(Long accintdetailid) {
		this.accintdetailid = accintdetailid;
	}
	public Long getInitiativeid() {
		return initiativeid;
	}
	public void setInitiativeid(Long initiativeid) {
		this.initiativeid = initiativeid;
	}
	public Long getSeqid() {
		return seqid;
	}
	public void setSeqid(Long seqid) {
		this.seqid = seqid;
	}
	public Date getBegindate() {
		return begindate;
	}
	public void setBegindate(Date begindate) {
		this.begindate = begindate;
	}
	public Date getEnddate() {
		return enddate;
	}
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}
	public String getResponsible() {
		return responsible;
	}
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
	public String getShortBegindate() {
		return DateUtility.formatShortDate(begindate);
	}

	public String getShortEnddate() {
		return DateUtility.formatShortDate(enddate);
	}
	
}