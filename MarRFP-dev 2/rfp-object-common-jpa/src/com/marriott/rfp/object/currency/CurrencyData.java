package com.marriott.rfp.object.currency;

import java.io.Serializable;

public class CurrencyData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String currencycode;
	private String currencyname;

	public void setCurrencycode(String currencycode) {
		this.currencycode = currencycode;
	}

	public String getCurrencycode() {
		return currencycode;
	}

	public void setCurrencyname(String currencyname) {
		this.currencyname = currencyname;
	}

	public String getCurrencyname() {
		return currencyname;
	}

}
