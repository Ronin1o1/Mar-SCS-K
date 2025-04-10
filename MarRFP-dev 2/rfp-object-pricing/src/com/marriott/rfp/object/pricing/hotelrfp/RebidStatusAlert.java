package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RebidStatusAlert implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long numrebidpending;
	private long numrebidpending_past;

	public long getNumrebidpending() {
		return numrebidpending;
	}

	public void setNumrebidpending(long numrebidpending) {
		this.numrebidpending = numrebidpending;
	}

	public long getNumrebidpending_past() {
		return numrebidpending_past;
	}

	public void setNumrebidpending_past(long numrebidpending_past) {
		this.numrebidpending_past = numrebidpending_past;
	}

}
