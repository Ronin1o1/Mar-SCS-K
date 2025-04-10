package com.marriott.rfp.dataacess.pricing.salesregion.api;

import java.util.List;



import com.marriott.rfp.object.pricing.salesregion.SalesRegion;


public interface SalesRegionManager {

    public List<SalesRegion> getAllSalesRegions();

    public String getSalesRegion(String salesRegionID);
    
}
