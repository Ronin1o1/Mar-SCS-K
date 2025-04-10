package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelAccountSpecificStatus implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Long transactionid;
    private String status;
    private String statusdesc;
    private Long transactionstatusid;
    private List<String> errorDesc;
    private String marshacmd;
	private String loadDate;
    
    public String getMarshacmd() {
    	return marshacmd;
    }
    public void setMarshacmd(String marshacmd) {
    	this.marshacmd = marshacmd;
    }

    public Long getTransactionid() {
	return transactionid;
    }

    public void setTransactionid(Long transactionid) {
	this.transactionid = transactionid;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getStatusdesc() {
	return statusdesc;
    }

    public void setStatusdesc(String statusdesc) {
	this.statusdesc = statusdesc;
    }

    public Long getTransactionstatusid() {
	return transactionstatusid;
    }

    public void setTransactionstatusid(Long transactionstatusid) {
	this.transactionstatusid = transactionstatusid;
    }

    public void setErrorDesc(List<String> errorDesc) {
	this.errorDesc = errorDesc;
    }

    public List<String> getErrorDesc() {
	return errorDesc;
    }

    public String getErrorDescList() {
	String errorDescString = "";
	if (errorDesc != null && errorDesc.size() > 0) {
	    for (int i = 0; i < errorDesc.size(); i++) {
		if (!errorDescString.equals(""))
		    errorDescString += "\\r\\n";
		errorDescString += errorDesc.get(i);
	    }
	} else
	    	errorDescString="PAS will look into this error.";
	return errorDescString;
    }
    
	public String getLoadDate() {
		return loadDate;
	}
	
	public void setLoadDate(String loadDate) {
		this.loadDate = loadDate;
	}
}
