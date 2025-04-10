package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RebidStatus implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rebidstatus_id;
	private String rebidstatus_desc;

	public void setRebidstatus_id(Long rebidstatus_id) {
		this.rebidstatus_id = rebidstatus_id;
	}

	public Long getRebidstatus_id() {
		return rebidstatus_id;
	}

	public void setRebidstatus_desc(String rebidstatus_desc) {
		this.rebidstatus_desc = rebidstatus_desc;
	}

	public String getRebidstatus_desc() {
		return rebidstatus_desc;
	}

}
