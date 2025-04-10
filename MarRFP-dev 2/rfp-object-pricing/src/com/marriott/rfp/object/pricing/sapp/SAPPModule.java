package com.marriott.rfp.object.pricing.sapp;

import java.io.Serializable;

public class SAPPModule implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String moduleid;
    private String modulename;

    public String getModuleid() {
	return moduleid;
    }

    public void setModuleid(String moduleid) {
	this.moduleid = moduleid;
    }

    public String getModulename() {
	return modulename;
    }

    public void setModulename(String modulename) {
	this.modulename = modulename;
    }
}
