package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class Page implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long page=1;
	private long maxpagelen;

	public long getPage() {
		return page;
	}

	public void setPage(long page) {
		this.page = page;
	}

	public long getMaxpagelen() {
		return maxpagelen;
	}

	public void setMaxpagelen(long maxpagelen) {
		this.maxpagelen = maxpagelen;
	}

}
