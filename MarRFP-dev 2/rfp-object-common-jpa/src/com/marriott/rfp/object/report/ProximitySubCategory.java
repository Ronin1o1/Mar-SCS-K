package com.marriott.rfp.object.report;

import java.io.Serializable;

public class ProximitySubCategory implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long siccode1;
    private String siccode1desc;

    public void setSiccode1(Long siccode1) {
	this.siccode1 = siccode1;
    }

    public Long getSiccode1() {
	return siccode1;
    }

    public void setSiccode1desc(String siccode1desc) {
	this.siccode1desc = siccode1desc;
    }

    public String getSiccode1desc() {
	return siccode1desc;
    }

}