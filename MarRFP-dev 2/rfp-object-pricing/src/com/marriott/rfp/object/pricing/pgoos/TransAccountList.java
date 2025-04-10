package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class TransAccountList implements Serializable {

	private String accountname;
	private long accountrecid;
	
	public TransAccountList(){
		super();
	}

	private static final long serialVersionUID = 1L;

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(long accountrecid) {
		this.accountrecid = accountrecid;
	}
	
	
	

}
