package com.marriott.rfp.object.pricing.edie;

public class EdieColumnsUpdate extends EdieColumns {

    private static final long serialVersionUID = 1L;
    private String changed;

    public void setChanged(String changed) {
	this.changed = changed;
    }

    public String getChanged() {
	return changed;
    }

}
