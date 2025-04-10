package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore; 

public class SCPTStatus implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_accountid;
	private String accountname;
	private Long hotelid;
	private Long period;
	private String isscaccount="N";
	private String chg="N";
	private String status;
	private String scpt_accountreason;
	private Long reasonnotscaccount;

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}

	public Long getScpt_accountid() {
		return scpt_accountid;
	}

	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}


	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public String getIsscaccount() {
		return isscaccount;
	}

	public void setIsscaccount(String isscaccount) {
		if (isscaccount==null) {
			isscaccount="N";
		}
		this.isscaccount = isscaccount;
	}

	public String getChg() {
		return chg;
	}

	public void setChg(String chg) {
		if (chg==null)
			chg="N";
		this.chg = chg;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonIgnore
	public String getScpt_accountreason() {
		return scpt_accountreason;
	}
	@JsonIgnore
	public void setScpt_accountreason(String scpt_accountreason) {
		this.scpt_accountreason = scpt_accountreason;
	}
	@JsonIgnore
	public Long getReasonnotscaccount() {
		return reasonnotscaccount;
	}
	@JsonIgnore
	public void setReasonnotscaccount(Long reasonnotscaccount) {
		this.reasonnotscaccount = reasonnotscaccount;
	}
	
	

}
