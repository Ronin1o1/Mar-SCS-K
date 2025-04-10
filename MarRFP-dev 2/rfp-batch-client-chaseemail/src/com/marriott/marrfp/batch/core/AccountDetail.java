package com.marriott.marrfp.batch.core;

import java.io.Serializable;

public class AccountDetail implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String accountname;
	private String marshacode;
	
	public String getAccountname() {
	    return accountname;
	}
	public void setAccountname(String accountname) {
	    this.accountname = accountname;
	}
	public String getMarshacode() {
	    return marshacode;
	}
	public void setMarshacode(String marshacode) {
	    this.marshacode = marshacode;
	}
}
