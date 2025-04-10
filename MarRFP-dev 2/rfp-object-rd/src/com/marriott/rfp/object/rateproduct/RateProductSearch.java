package com.marriott.rfp.object.rateproduct;

import java.util.Map;

public class RateProductSearch {
	private  int searchType=1;
	private String searchStartProduct;
	private String searchFirstProduct;
	private String nendProduct;
	private String searchProductCode;
	private String searchProductName;
	private String productCode;
	private String productName;
	private Map<String, RateProductSearchAttributes> searchAttr;

	public RateProductSearch() {
		
	}

	public int getSearchType() {
		return searchType;
	}

	public void setSearchType(int searchType) {
		this.searchType = searchType;
		if (this.searchType != 1 || this.searchType!=2) this.searchType=1;
	}

	public String getSearchStartProduct() {
		return searchStartProduct;
	}

	public void setSearchStartProduct(String searchStartProduct) {
		this.searchStartProduct = searchStartProduct;
	}


	public String getSearchFirstProduct() {
		return searchFirstProduct;
	}

	public void setSearchFirstProduct(String searchFirstProduct) {
		this.searchFirstProduct = searchFirstProduct;
	}

	public String getSearchProductCode() {
		return searchProductCode;
	}

	public void setSearchProductCode(String searchProductCode) {
		this.searchProductCode = searchProductCode;
	}

	public String getSearchProductName() {
		return searchProductName;
	}

	public void setSearchProductName(String searchProductName) {
		this.searchProductName = searchProductName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setNendProduct(String nendProduct) {
		this.nendProduct = nendProduct;
	}

	public String getNendProduct() {
		return nendProduct;
	}

	public void setSearchAttr(Map<String, RateProductSearchAttributes> searchAttr) {
		this.searchAttr = searchAttr;
	}

	public Map<String, RateProductSearchAttributes> getSearchAttr() {
		return searchAttr;
	}
	
	
}
