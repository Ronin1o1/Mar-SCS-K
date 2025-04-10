package com.marriott.rfp.business.rd.api;

import java.util.Map;



import com.marriott.rfp.object.rateproduct.RateProductAssignmentDataView;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.object.rateproduct.RateProductDataView;
import com.marriott.rfp.object.rateproduct.RateProductDefinitionUpdateView;
import com.marriott.rfp.object.rateproduct.RateProductSearch;
import com.marriott.rfp.object.rateproduct.RateProductView;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.HotelBrand;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;


public interface RateProductService {
	public RateProductDefinitionLists getDataDictionaryForSearch();

	public String  updateRateProductDefinition(String marshaCode, String brandCode, String productCode, String productName, String managed,
			String level, Map<String, RateProductDefinitionUpdateView> rateProductDefinition, String loginName);

	public RateProductDataView getDataForDefinition(String marshaCode, String brandCode, String productCode, String level, String rtnd_ListCode);

	public RateProductDefinitions[] getRateProductDefinitionsList(String marshacode, String brandcode, RateProductSearch rateProductSearch);

	public RateProductView getDataForView(String marshacode, String brandcode, String productCode, String level);

	public RateProductAssignmentView getRatePlanAssignmentList(String marshaCode, String brandCode, String entryLevel, String ratePlanCode,
			String ratePlanName, String startRatePlanCode, String endRatePlanCode, String startKey, String endKey);

	public HotelBrand[] getHotelBrands();

	public String getHotelBrands(String marshaCode);

	public Channel[] getChannels();

	public com.marriott.rfp.object.roomdef.beans.Entry[] getEntries();

	public Language[] getDefaultLanguages();

	public Text[] getRateDescription(String marshacode, Channel channel, String langId, com.marriott.rfp.object.roomdef.beans.Entry entry,
			String rateProgram);

	public Text[] getOldRateDescription(String marshacode, Channel channel, String langId, com.marriott.rfp.object.roomdef.beans.Entry entry,
			String rateProgram);

	public void updateRatePlanAssignment(String marshaCode, String brandCode, String productCode, String level,
			Map<String, RateProductAssignmentDataView> rpaData, String loginName);
	
	public RateProductDefinitions getFullDataForBlank(MI_RateProductDataDictionaryRS dd, RateProductDefinitions rtnds);
	
	//Method to call the Rate Plan Assignment Webservice for Cognos Report
	public RateProductAssignmentView getRatePlanAssignmentListforReport(String marshaCode, String brandCode, String entryLevel, String ratePlanCode,
			String ratePlanName, String startRatePlanCode, String endRatePlanCode, String startKey, String endKey);
	//Method to insert the Rate Plan Assignment data to the oracle table
	public long insertPlanAssignmentList(RateProductAssignmentView rateProductAssignmentView, String marshaCode, String brandCode);
}
