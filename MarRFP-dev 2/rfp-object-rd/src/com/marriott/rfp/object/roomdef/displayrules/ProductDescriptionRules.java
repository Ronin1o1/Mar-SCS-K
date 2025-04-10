package com.marriott.rfp.object.roomdef.displayrules;

import com.marriott.rfp.object.roomdef.beans.ProductDescription;

public class ProductDescriptionRules extends ProductDescription {

	private static final long serialVersionUID = 1L;
	private long sortOrder;

	public void setSortOrder(long sortOrder) {
		this.sortOrder = sortOrder;
	}

	public long getSortOrder() {
		return sortOrder;
	}

}
