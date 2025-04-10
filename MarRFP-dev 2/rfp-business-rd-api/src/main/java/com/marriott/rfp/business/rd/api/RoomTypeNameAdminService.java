package com.marriott.rfp.business.rd.api;

import java.util.Map;
import java.util.Vector;



import com.marriott.rfp.object.roomdef.beans.AlternateText;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextAmenityModel;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextModel;


public interface RoomTypeNameAdminService {

	public MI_HotelRoomProductInfoChannelsRS getChannels();

	public MI_HotelRoomProductInfoEntriesRS getEntries();

	public Languages getChannelLanguages(Channel channel);

	public DisplayRulesViewModel getDisplayRulesData(Channel channel, Entry entry, boolean bCreateNew) throws RDRulesNotFoundException;

	public void updateDisplayRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions,
			String loginName);

	public void copyDisplayRules(Channel channel, Entry entry, Channel copyChannel, Entry copyEntry, String loginName)
			throws RDRulesNotFoundException;

	public void copyDisplayText(Channel channel, Language language, Channel copyChannel, Language copyLanguage, String loginName)
			throws RDTextNotFoundException;

	public void deleteDisplayRules(Channel channel, Entry entry, String loginName);

	public void deleteDisplayText(Channel channel, Language language, String loginName);

	public Vector<RoomTypeNameDisplayTextModel> getDisplayTextData(Channel channel, String langId, boolean bCreateNew) throws RDTextNotFoundException;

	public RoomTypeNameDisplayTextAmenityModel getDisplayTextAmenity(Channel channel, String langId) throws RDTextNotFoundException;

	public void updateDisplayTextAmenity(Channel channel, String langId, Map<String, AlternateText> theAlternateText, Map<String, Type> theType,
			Map<String, UnitOfMeasure> theUOM, String loginName);
	
	public void updateDisplayTextData(Channel channel, String langId, Map<String, RoomTypeNameDisplayTextElementModel> theText, String loginName);
}