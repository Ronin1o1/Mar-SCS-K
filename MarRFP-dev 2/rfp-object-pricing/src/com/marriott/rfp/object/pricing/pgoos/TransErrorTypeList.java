package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class TransErrorTypeList implements Serializable {
	
	private String errorType;
	private String marshacmd;
	private String systemtype;

	
	public TransErrorTypeList(){
		super();
	}
	private static final long serialVersionUID = 1L;

	public String getErrorType() {
		return errorType;
	}
	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}
	public String getMarshacmd() {
		return marshacmd;
	}
	public void setMarshacmd(String marshacmd) {
		this.marshacmd = marshacmd;
	}
	public String getSystemtype() {
		return systemtype;
	}
	public void setSystemtype(String systemtype) {
		this.systemtype = systemtype;
	}

	

}
