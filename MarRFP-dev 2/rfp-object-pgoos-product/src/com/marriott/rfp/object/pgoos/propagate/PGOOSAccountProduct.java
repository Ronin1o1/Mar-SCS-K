package com.marriott.rfp.object.pgoos.propagate;

import java.io.Serializable;

public class PGOOSAccountProduct implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long period;
    private Long accountrecid;
    private String productid;

    public Long getAccountrecid() {
	return accountrecid;
    }

    public void setAccountrecid(Long accountrecid) {
	this.accountrecid = accountrecid;
    }

    public Long getPeriod() {
	return period;
    }

    public void setPeriod(Long period) {
	this.period = period;
    }

    public String getProductid() {
	return productid;
    }

    public void setProductid(String productid) {
	this.productid = productid;
    }

}
