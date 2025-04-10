package com.marriott.rfp.dataaccess.rd.rateproduct.api;

import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;

public interface RateProductManager {
	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel);

	public MI_HotelRoomProductInfoChannelsRS getChannels();

	public MI_RateProductDataDictionaryRS getDataDictionary();

	public MI_HotelRoomProductInfoChannelLanguagesRS getDefaultLanguages();

	public MI_DisplayRatePlanDescriptionRS getDisplayRatePlanDescription(String marshacode,boolean bGetOldDescription, Channel channel, String langId,
			Entry entry, String rateProgram);

	public MI_HotelRoomProductDisplayRulesRS getDisplayRules(Channel channel, Entry entry);

	public MI_HotelRoomProductInfoEntriesRS getEntries();

	public MI_HotelBrandsRS getHotelBrands();
	
	public MI_HotelBrandsRS getHotelBrands(String marshaCode);

	public MI_RatePlanAssignmentListRS getRatePlanAssignmentList(String marshacode, String brandcode, String ratePlanCode, String ratePlanName,
			long count, String startRatePlanCode, String endRatePlanCode, String startKey, String endKey);

	public MI_RateProductDefinitionsRS getRateProductDefinitions(String marshacode, String brandcode, String productcode, String level);

	public MI_RateProductDefinitionsListRS getRateProductDefinitionsList(String marshacode, String brandcode, String productCode, String productName,
			long count, String startProduct, String endProduct, RateProductDefinition[] rtnd);

	public MI_RateProductDisplayTextRS getRateProductDisplayText(Channel channel, String langId);

	public MI_RatePlanAssignmentListNotifRS setRatePlanAssignmentList(String marshacode, String brandcode,
			RatePlanAssignmentList ratePlanAssignmentList, String loginName);

	public MI_RateProductDefinitionsNotifRS setRateProductDefinitions(String marshacode, String brandcode, RateProductDefinitions rtnds,
			String loginName);

	public MI_HotelRoomProductDisplayRulesNotifRS updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName);

	public MI_RateProductDisplayTextNotifRS updateDisplayText(MI_RateProductDisplayTextRS roomproductInfo, String loginName);
	// Method to insert the Rate plan Assignment data to the oracle table for the cognos report.
	public Long insertRatePlanAssignmentList(RateProductAssignmentView rateProductAssignmentView, String marshaCode, String brandCode);
}
