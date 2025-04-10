package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class TransErrorList implements Serializable {
	
	private String errordesc;
	private String errorcode;
	
	public TransErrorList(){
		super();
	}
	
	private static final long serialVersionUID = 1L;

	public String getErrordesc() {
		return errordesc;
	}

	public void setErrordesc(String errordesc) {
		this.errordesc = errordesc;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}
	
	

}
