package com.marriott.rfp.object.rateproduct;

import java.util.Vector;

public class RateProductView {
	private String productCode;
	private String productName;
	@SuppressWarnings("rawtypes")
	private Vector rateProductListView;

	public RateProductView() {
		
	}
	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	@SuppressWarnings("rawtypes")
	public void setRateProductListView(Vector rateProductListView) {
		this.rateProductListView = rateProductListView;
	}

	@SuppressWarnings("rawtypes")
	public Vector getRateProductListView() {
		return rateProductListView;
	}

}
