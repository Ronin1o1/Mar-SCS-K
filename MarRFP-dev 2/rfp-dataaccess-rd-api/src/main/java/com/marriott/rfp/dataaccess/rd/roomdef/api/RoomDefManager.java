package com.marriott.rfp.dataaccess.rd.roomdef.api;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRS;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;

public interface RoomDefManager {
	public MI_HotelAmenityListsInfoRS getAmenityLists();

	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel);

	public MI_HotelRoomProductInfoChannelsRS getChannels();

	public MI_HotelRoomProductDataDictionaryRS getDataDictionary();

	public MI_HotelRoomProductInfoChannelLanguagesRS getDefaultLanguages();

	public MI_HotelRoomProductDisplayRulesRS getDisplayRules(Channel channel, Entry entry);

	public MI_HotelRoomProductDisplayTextRS getDisplayText(Channel channel, String langId);

	public MI_HotelRoomProductInfoEntriesRS getEntries();

	public MI_HotelRoomProductOptionsRS getRoomProductDef(String marshacode);

	public MI_HotelRoomProductInfoRS getRoomProductInfo(String marshacode, String roompool);

	public MI_HotelRoomProductInfoNotifRS removeRateProgramRoomDef(String marshacode, String roompool, String rateprogram, String loginName);

	public MI_HotelRoomProductDisplayRulesNotifRS updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName);

	public MI_HotelRoomProductDisplayTextNotifRS updateDisplayText(MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName);

	public MI_HotelRoomProductInfoNotifRS updateRoomProduct(String marshacode, String roompool, String rateprogram,
			MI_HotelRoomProductInfoRS roomproductInfo, String loginName);

	public MI_HotelRoomPoolListRS getRoomPoolList(String marshacode);

	public MI_HotelRoomProductSynchAlertsRS getRoomProductSyncAlerts(String marshacode, String roompool);

	public MI_HotelRoomProductInfoRS getRoomProductList(String marshacode, String roompool);

	public MI_HotelRateCodeListRS getRateProgramList(String marshacode, String roompool);

	public void deleteSynchAlerts(String marshacode, String loginName, String roompool, SynchAlerts[] sa);
	
	 //Methods created to insert the Propertyinfo and Roomproducts information from Webservice response to the Table for report run
	 public Long insertProductInfoRecords(MI_HotelRoomProductInfoRS mrtnd, String marshaCode, String roomPool,String roompoolonly, Long reportId);
	//Methods created to insert the Propertyinfo and Roomproducts information from Webservice response to the Table for report run
	 public Long insertProductOptionsRecords(MI_HotelRoomProductOptionsRS dd, String marshaCode, String roompoolonly);
}
