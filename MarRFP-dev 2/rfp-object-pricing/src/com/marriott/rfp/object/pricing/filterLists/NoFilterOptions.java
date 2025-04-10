package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

import com.marriott.rfp.object.report.ReportModel;

public class NoFilterOptions implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private NoFilterLists noFilterLists;
    private ReportModel reportDetails;
    
    public NoFilterOptions() {
	super();
	noFilterLists=new NoFilterLists();
	reportDetails=new ReportModel();
    }
    


    public void setNoFilterLists(NoFilterLists noFilterLists) {
	this.noFilterLists = noFilterLists;
    }

    public NoFilterLists getNoFilterLists() {
	return noFilterLists;
    }

    public void setReportDetails(ReportModel reportDetails) {
	this.reportDetails = reportDetails;
    }

    public ReportModel getReportDetails() {
	return reportDetails;
    }
    
    
}
