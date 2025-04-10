package com.marriott.rfp.object.travelspending;

import java.io.Serializable;

public class TravelSpending implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String quartername;
    private String description;

    public void setQuartername(String quartername) {
	this.quartername = quartername;
    }

    public String getQuartername() {
	return quartername;
    }

    public void setDescription(String description) {
	this.description = description;
    }

    public String getDescription() {
	return description;
    }
}
