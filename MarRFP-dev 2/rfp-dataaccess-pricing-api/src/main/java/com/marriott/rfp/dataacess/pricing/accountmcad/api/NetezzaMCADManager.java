package com.marriott.rfp.dataacess.pricing.accountmcad.api;

import java.sql.SQLException;
import java.util.List;



import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;


public interface NetezzaMCADManager {
	public List<MCADData> getNetezzaMcadSummaryByName(String businessName, String businessLevel, String countryCode, long maxResults, String url,
			String netezzaUserId, String netezzaPassword) throws SQLException;

	public List<MCADData> getNetezzaMcadSummaryById(Long businessId, String businessLevel, long maxResults, String url, String netezzaUserId,
			String netezzaPassword) throws SQLException;
	
	public List<MCADData> getNetezzaMcadSummaryByChild(Long businessId, String parentbusinessLevel, String childBusinessLevel, long maxResults,
			String url, String netezzaUserId, String netezzaPassword) throws SQLException;
	
	public MCADDetail findNetezzaMCADDetail(Long businessId, String url, String netezzaUserId, String netezzaPassword) throws SQLException;
}
