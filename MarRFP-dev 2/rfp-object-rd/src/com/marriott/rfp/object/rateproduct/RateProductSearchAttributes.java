package com.marriott.rfp.object.rateproduct;

public class RateProductSearchAttributes {
	private String searchAttribute;

	public RateProductSearchAttributes() {

	}

	public void setSearchAttribute(String searchAttribute) {
		this.searchAttribute = searchAttribute;
	}

	public String getSearchAttribute() {
		return searchAttribute;
	}

	public String getRP_ListCode() {
		String[] sa = searchAttribute.split("_");
		return sa[0];
	}

	public String getRP_GroupCode() {
		String[] sa = searchAttribute.split("_");
		return sa[1];
	}

	public String getRP_Name() {
		String[] sa = searchAttribute.split("_");
		return sa[2];
	}

	public String getRP_Code() {
		String[] sa = searchAttribute.split("_");
		return sa[3];
	}

}
