package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

import com.marriott.rfp.object.pricing.filterLists.Page;

public class MirrorExceptionSearch implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long period;
	private String filterString;
	private Page page;
	private int orderby;
	private String filterType;

	
	public MirrorExceptionSearch() {
		page=new Page();
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public String getFilterString() {
		return filterString;
	}

	public void setFilterString(String filterString) {
		this.filterString = filterString;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public int getOrderby() {
		return orderby;
	}

	public void setOrderby(int orderby) {
		this.orderby = orderby;
	}

	public void setFilterType(String filterType) {
		this.filterType = filterType;
	}

	public String getFilterType() {
		return filterType;
	}

}
