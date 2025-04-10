package com.marriott.rfp.object.pricing.hotel;

import java.io.Serializable;

public class Ignore2ndRoomPool implements Serializable {

	private String rm_pool_exempt_id;
	private String description;
	private Long sequence;
	private static final long serialVersionUID = 1L;

	public Ignore2ndRoomPool() {
		super();
	}

	public String getRm_pool_exempt_id() {
		return rm_pool_exempt_id;
	}

	public void setRm_pool_exempt_id(String rm_pool_exempt_id) {
		this.rm_pool_exempt_id = rm_pool_exempt_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

}
