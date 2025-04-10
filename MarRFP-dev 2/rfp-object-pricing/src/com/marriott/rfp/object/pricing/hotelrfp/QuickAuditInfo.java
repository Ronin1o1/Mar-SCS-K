package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class QuickAuditInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long quickaudithotelaccountid;
	private Long quickauditversion;
	private Long ratetype_selected;
	private Double percentdiscount;
	private Date last_updatedrates;
	private String last_updaterateseid;
	private String productdesc;
	private String offcycle;
	private String accountname;
	private List<QuickAuditRates> qarates;

	public Long getQuickauditversion() {
		return quickauditversion;
	}

	public void setQuickauditversion(Long quickauditversion) {
		this.quickauditversion = quickauditversion;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}


	public Date getLast_updatedrates() {
		return last_updatedrates;
	}

	public String getFormattedLast_updatedrates() {
		return DateUtility.formatLongDate(last_updatedrates);
	}

	public void setLast_updatedrates(Date last_updatedrates) {
		this.last_updatedrates = last_updatedrates;
	}

	public String getLast_updaterateseid() {
		return last_updaterateseid;
	}

	public void setLast_updaterateseid(String last_updaterateseid) {
		this.last_updaterateseid = last_updaterateseid;
	}

	public void setQarates(List<QuickAuditRates> qarates) {
		this.qarates = qarates;
	}

	public List<QuickAuditRates> getQarates() {
		return qarates;
	}

	public void setQuickaudithotelaccountid(Long quickaudithotelaccountid) {
		this.quickaudithotelaccountid = quickaudithotelaccountid;
	}

	public Long getQuickaudithotelaccountid() {
		return quickaudithotelaccountid;
	}

	public void setPercentdiscount(Double percentdiscount) {
		this.percentdiscount = percentdiscount;
	}

	public Double getPercentdiscount() {
		return percentdiscount;
	}

	public void setProductdesc(String productdesc) {
		this.productdesc = productdesc;
	}

	public String getProductdesc() {
		return productdesc;
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
	}

	public String getOffcycle() {
		return offcycle;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountname() {
		return accountname;
	}

}
