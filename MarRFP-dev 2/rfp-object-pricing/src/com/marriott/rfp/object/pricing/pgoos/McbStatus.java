package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class McbStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    private Date loadstart;
    private Date loadend;
    private Long onqueue;
    private List<McbStatusDetails> mcbDetails;

    public Date getLoadstart() {
	return loadstart;
    }

    public String getStringLoadstart() {
	String thetext = "";
	if (loadstart != null)
	    thetext = DateUtility.formatShortStringDateTime(loadstart);
	return thetext;
    }

    public void setLoadstart(Date loadstart) {
	this.loadstart = loadstart;
    }

    public Date getLoadend() {
	return loadend;
    }

    public String getStringLoadend() {
	String thetext = "";
	if (loadend != null)
	    thetext = DateUtility.formatShortStringDateTime(loadend);
	return thetext;
    }

    public void setLoadend(Date loadend) {
	this.loadend = loadend;
    }

    public List<McbStatusDetails> getMcbDetails() {
	return mcbDetails;
    }

    public void setMcbDetails(List<McbStatusDetails> mcbDetails) {
	this.mcbDetails = mcbDetails;
    }

    public Long getTotalCmpl() {
	Long totalnum = 0L;
	if (mcbDetails != null) {
	    for (int i = 0; i < mcbDetails.size(); i++) {
		if (mcbDetails.get(i).getCmpl() != null)
		    totalnum += mcbDetails.get(i).getCmpl();
	    }
	}
	return totalnum;
    }

    public Long getTotalPubl() {
	Long totalnump = 0L;
	if (mcbDetails != null) {
	    for (int i = 0; i < mcbDetails.size(); i++) {
		if (mcbDetails.get(i).getPubl() != null)
		    totalnump += mcbDetails.get(i).getPubl();
	    }
	}
	return totalnump;
    }


    public Long getTotalUnpb() {
	Long totalnumu = 0L;
	if (mcbDetails != null) {
	    for (int i = 0; i < mcbDetails.size(); i++) {
		if (mcbDetails.get(i).getUnpb() != null)
		    totalnumu += mcbDetails.get(i).getUnpb();
	    }
	}
	return totalnumu;
    }

    public Long getTotalFail() {
	Long totalnumf = 0L;
	if (mcbDetails != null) {
	    for (int i = 0; i < mcbDetails.size(); i++) {
		if (mcbDetails.get(i).getFail() != null)
		    totalnumf += mcbDetails.get(i).getFail();
	    }
	}
	return totalnumf;
    }

	public void setOnqueue(Long onqueue) {
		this.onqueue = onqueue;
	}

	public Long getOnqueue() {
		return onqueue;
	}

}
