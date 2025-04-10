package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountSubset implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String regionid;
    private String regionname;

    public String getRegionid() {
	return regionid;
    }

    public void setRegionid(String regionid) {
	this.regionid = regionid;
    }

    public String getRegionname() {
	return regionname;
    }

    public void setRegionname(String regionname) {
	this.regionname = regionname;
    }

}
