package com.marriott.rfp.dataacess.pricing.accountsegment.api;

import java.util.List;

import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;


public interface AccountSegmentManager {
    public List<AccountSegment> getAllAccountSegments();

    public List<AccountSegment> getSegmentAndDefaultRules();

    public List<AccountSegment> getPricingAccountSegments();
    
    public List<AccountSegment> getPricingAccountSegmentsOrderByAccDesc();
    
    public List<AccountSegment> getSalesAccountSegments();
    
    public String getAccountSegmentName(String accountsegment);
    
	public List<AccountSegment> getPricingSCPTAccountSegments();

}
