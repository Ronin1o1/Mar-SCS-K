package com.marriott.rfp.dataaccess.rd.roomtypename.api;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;

public interface RoomTypeNameManager {
	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel);

	public MI_HotelRoomProductInfoChannelsRS getChannels();

	public MI_MasterRoomTypeNameDataDictionaryRS getDataDictionary();

	public MI_HotelRoomProductInfoChannelLanguagesRS getDefaultLanguages();

	public MI_HotelRoomProductDisplayRulesRS getDisplayRules(Channel channel, Entry entry);

	public MI_HotelRoomProductInfoEntriesRS getEntries();

	public MI_HotelRoomPoolListRS getRoomTypeList(String marshacode);

	public MI_HotelRoomTypeNameDefinitionsRS getHotelRoomTypeNameDefinition(String marshacode, String roompool);

	public MI_HotelRoomTypeNameDefinitionListRS getHotelRoomTypeNameDefinitionList(String marshacode);

	public MI_MasterRoomTypeListRS getMasterRoomTypeList();

	public MI_MasterRoomTypeNameDefinitionsRS getMasterRoomTypeNameDefinition(String roompool);

	public MI_MasterRoomTypeNameDefinitionListRS getMasterRoomTypeNameDefinitionList();

	public MI_MasterRoomTypeNameDisplayTextRS getMasterRoomTypeNameDisplayText(Channel channel, String langId);

	public MI_HotelRoomTypeNameDefinitionsNotifRS setHotelRoomTypeNameDefinition(String marshaCode, RoomTypeNameDefinitions rtnds, String loginName);

	public MI_MasterRoomTypeNameDefinitionsNotifRS setMasterRoomTypeNameDefinition(RoomTypeNameDefinitions rtnds, String loginName);

	public MI_HotelRoomProductDisplayRulesNotifRS updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName);

	public MI_MasterRoomTypeNameDisplayTextNotifRS updateDisplayText(MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName);
}
