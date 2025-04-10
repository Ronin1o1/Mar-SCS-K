package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.filterLists.Page;

public class SCPTAcctPricing  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long commorderby = 3L;
	private Page commpage;
	private Long commtotalPages;
	private String commfilterString;
	private String commgroup;
	private String commformChg;
	private List<SCPTAcctPricingDetail> comrates;
	private List<SCPTAcctPricingDetail> comrates_total;
	private List<SCPTAcctPricingChange> comacctpricingchg;
	
	public Long getCommorderby() {
		return commorderby;
	}
	public void setCommorderby(Long commorderby) {
		this.commorderby = commorderby;
	}
	public Page getCommpage() {
		return commpage;
	}
	public void setCommpage(Page commpage) {
		this.commpage = commpage;
	}
	public Long getCommtotalPages() {
		return commtotalPages;
	}
	public void setCommtotalPages(Long commtotalPages) {
		this.commtotalPages = commtotalPages;
	}
	public String getCommfilterString() {
		return commfilterString;
	}
	public void setCommfilterString(String commfilterString) {
		this.commfilterString = commfilterString;
	}
	public String getCommgroup() {
		return commgroup;
	}
	public void setCommgroup(String commgroup) {
		this.commgroup = commgroup;
	}
	public String getCommformChg() {
		return commformChg;
	}
	public void setCommformChg(String commformChg) {
		this.commformChg = commformChg;
	}
	public List<SCPTAcctPricingDetail> getComrates() {
		return comrates;
	}
	public void setComrates(List<SCPTAcctPricingDetail> comrates) {
		this.comrates = comrates;
	}
	public List<SCPTAcctPricingDetail> getComrates_total() {
		return comrates_total;
	}
	public void setComrates_total(List<SCPTAcctPricingDetail> comrates_total) {
		this.comrates_total = comrates_total;
	}
	public List<SCPTAcctPricingChange> getComacctpricingchg() {
		return comacctpricingchg;
	}
	public void setComacctpricingchg(List<SCPTAcctPricingChange> comacctpricingchg) {
		this.comacctpricingchg = comacctpricingchg;
	}
	
	
	
}
