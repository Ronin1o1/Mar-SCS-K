package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class QuickAuditCancelInfo implements Serializable {
	
	private static final long serialVersionUID = 1L;	
	private Date updated_on;
	private String eid;
	private String old_cxlpolicy;
	private String new_cxlpolicy;
	
	
	public Date getUpdated_on() {
		return updated_on;
	}
	public void setUpdated_on(Date updated_on) {
		this.updated_on = updated_on;
	}
	public String getFormattedUpdated_on() {
		return DateUtility.formatLongDate(updated_on);
	}
	public String getEid() {
		return eid;
	}
	public void setEid(String eid) {
		this.eid = eid;
	}
	public String getOld_cxlpolicy() {
		return old_cxlpolicy;
	}
	public void setOld_cxlpolicy(String old_cxlpolicy) {
		this.old_cxlpolicy = old_cxlpolicy;
	}
	public String getNew_cxlpolicy() {
		return new_cxlpolicy;
	}
	public void setNew_cxlpolicy(String new_cxlpolicy) {
		this.new_cxlpolicy = new_cxlpolicy;
	}

}
