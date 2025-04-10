package com.marriott.rfp.object.pricing.sapp;

import com.marriott.rfp.utility.NumberUtility;

public class ActualSpend {

	private Long regionid;
	private String regionname;
	private Double room_nts;
	private Double rev;
	private Long accountinfoid;
	private Long acctactlspendid;

	public Long getRegionid() {
		return regionid;
	}
	public void setRegionid(Long regionid) {
		this.regionid = regionid;
	}
	public String getRegionname() {
		return regionname;
	}
	public void setRegionname(String regionname) {
		this.regionname = regionname;
	}
	public Double getRoom_nts() {
		return room_nts;
	}
	public void setRoom_nts(Double room_nts) {
		this.room_nts = room_nts;
	}
	public Double getRev() {
		return rev;
	}
	public void setRev(Double rev) {
		this.rev = rev;
	}
	public Long getAccountinfoid() {
		return accountinfoid;
	}
	public void setAccountinfoid(Long accountinfoid) {
		this.accountinfoid = accountinfoid;
	}
	public Long getAcctactlspendid() {
		return acctactlspendid;
	}
	public void setAcctactlspendid(Long acctactlspendid) {
		this.acctactlspendid = acctactlspendid;
	}
	
    public void setStrRev(String strrev) {
    	if (strrev == null  || strrev.equals(""))
    	    this.rev = null;
    	else
    	    this.rev = Double.valueOf(strrev);
    }

    public String getFormattedRev() {
    	if (rev != null) {
    		return NumberUtility.formatRateNumber(rev);
    	} else {
    		return "";
    	}
    }


}