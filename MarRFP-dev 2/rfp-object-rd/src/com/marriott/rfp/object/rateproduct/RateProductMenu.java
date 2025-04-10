package com.marriott.rfp.object.rateproduct;

import java.util.Vector;

public class RateProductMenu {
	private String productCode;
	private String productName;
	private Vector <RateProductMenuModel> productMenu;
	
	public RateProductMenu() {
		
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

	public Vector<RateProductMenuModel> getProductMenu() {
		return productMenu;
	}

	public void setProductMenu(Vector<RateProductMenuModel> productMenu) {
		this.productMenu = productMenu;
	}
	
	

}
