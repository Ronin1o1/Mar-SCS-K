package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class PriceButtonProductData implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private String accountAllowFloatVP;
	private String allow_floatnociel;
	private String allowHotelcanPriceFloatVP;
	
	
	public String getAccountAllowFloatVP() {
		return accountAllowFloatVP;
	}
	public void setAccountAllowFloatVP(String accountAllowFloatVP) {
		this.accountAllowFloatVP = accountAllowFloatVP;
	}
	public String getAllow_floatnociel() {
		return allow_floatnociel;
	}
	public void setAllow_floatnociel(String allow_floatnociel) {
		this.allow_floatnociel = allow_floatnociel;
	}
	public String getAllowHotelcanPriceFloatVP() {
		return allowHotelcanPriceFloatVP;
	}
	public void setAllowHotelcanPriceFloatVP(String allowHotelcanPriceFloatVP) {
		this.allowHotelcanPriceFloatVP = allowHotelcanPriceFloatVP;
	}
	
	

}
