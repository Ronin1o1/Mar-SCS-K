package com.marriott.rfp.object.mirror;

public class RateType {

	private Long id;
	private String name;
	private String type;
	private Long displaySeq;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getDisplaySeq() {
		return displaySeq;
	}

	public void setDisplaySeq(Long displaySeq) {
		this.displaySeq = displaySeq;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

}
