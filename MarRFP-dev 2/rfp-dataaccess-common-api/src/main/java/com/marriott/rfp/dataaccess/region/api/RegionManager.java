package com.marriott.rfp.dataaccess.region.api;

import java.util.List;



import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.region.ReportingRegion;


public interface RegionManager {
	public List<ReportingRegion> getReportingRegions();
	public List<ReportingRegion> getAllReportingRegions();
	public ReportingRegion getReportingRegion(Long regionid);
	public List<RegionRef> getOperatingRegions();
}
