package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class FindFilterOption implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String optionname;
    private Long optionnumber;

    public FindFilterOption(String optionname, Long optionnumber) {
	this.optionname=optionname;
	this.optionnumber=optionnumber;
    }
    public void setOptionname(String optionname) {
	this.optionname = optionname;
    }

    public String getOptionname() {
	return optionname;
    }

    public void setOptionnumber(Long optionnumber) {
	this.optionnumber = optionnumber;
    }

    public Long getOptionnumber() {
	return optionnumber;
    }
}
