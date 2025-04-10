package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class Orderby implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private int orderby = 1;
    private String orderbynewaccounts;
    private String orderbymyaccounts;

    public int getOrderby() {
	return orderby;
    }

    public void setOrderby(int orderby) {
	this.orderby = orderby;
    }

    public String getOrderbynewaccounts() {
	if (orderbynewaccounts == null)
	    return "N";
	return orderbynewaccounts;
    }

    public void setOrderbynewaccounts(String orderbynewaccounts) {
	this.orderbynewaccounts = orderbynewaccounts;
    }

    public String getOrderbymyaccounts() {
	if (orderbymyaccounts == null)
	    return "N";
	return orderbymyaccounts;
    }

    public void setOrderbymyaccounts(String orderbymyaccounts) {
	this.orderbymyaccounts = orderbymyaccounts;
    }

}
