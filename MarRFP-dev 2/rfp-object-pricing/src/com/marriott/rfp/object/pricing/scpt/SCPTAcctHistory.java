package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.filterLists.Page;

public class SCPTAcctHistory implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Page detailpage;
	private Long totalpages;
	private Long page;
	private List<SCPTDetail> scptdetail;
	
	
	public List<SCPTDetail> getScptdetail() {
		return scptdetail;
	}
	public void setScptdetail(List<SCPTDetail> scptdetail) {
		this.scptdetail = scptdetail;
	}
	public Page getDetailpage() {
		return detailpage;
	}
	public void setDetailpage(Page detailpage) {
		this.detailpage = detailpage;
	}
	public Long getTotalpages() {
		return totalpages;
	}
	public void setTotalpages(Long totalpages) {
		this.totalpages = totalpages;
	}
	public Long getPage() {
		return page;
	}
	public void setPage(Long page) {
		this.page = page;
	}
	
	

	
	
	

}
