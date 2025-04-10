package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class RfpLaunchRecapEmail implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Long accountrecid;
    private String additional_text = "";
    
    public void setAdditional_text(String additional_text) {
	if (additional_text == null)
	    additional_text = "";
	else
	    this.additional_text = additional_text;
    }

    public String getAdditional_text() {
	return additional_text;
    }

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

}

