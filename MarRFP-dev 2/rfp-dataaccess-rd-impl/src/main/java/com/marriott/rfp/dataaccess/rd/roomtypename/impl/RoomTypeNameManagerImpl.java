package com.marriott.rfp.dataaccess.rd.roomtypename.impl;

import java.rmi.RemoteException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.rpc.ServiceException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.rd.roomdef.channellanguages.GetHotelRoomProductInfoChannelLanguagesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.channels.GetHotelRoomProductInfoChannelsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.entries.GetHotelRoomProductInfoEntriesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.GetHotelRoomProductDisplayRulesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.SetHotelRoomProductDisplayRulesNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.api.RoomTypeNameManager;
import com.marriott.rfp.dataaccess.rd.roomtypename.datadictionary.GetMasterRoomTypeNameDataDictionaryPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitionlist.GetHotelRoomTypeNameDefinitionListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions.GetHotelRoomTypeNameDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions.SetHotelRoomTypeNameDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.hotelroomtypelist.GetHotelRoomPoolListPortType;
import com.marriott.rfp.dataaccess.rd.roomtypename.hotelroomtypelist.GetHotelRoomPoolListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitionlist.GetMasterRoomTypeNameDefinitionListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions.GetMasterRoomTypeNameDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions.SetMasterRoomTypeNameDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext.GetMasterRoomTypeNameDisplayTextPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext.SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.masterroomtypelist.GetMasterRoomTypeListPortTypeProxy;
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

/**
 * Session Bean implementation class GetChannels
 */
@Service
public class RoomTypeNameManagerImpl implements RoomTypeNameManager {
	private static final Logger log = LoggerFactory.getLogger(RoomTypeNameManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private GetMasterRoomTypeNameDataDictionaryPortTypeProxy rp_infoproxy = null;
	private GetHotelRoomProductInfoChannelsPortTypeProxy rp_cproxy = null;
	private GetHotelRoomTypeNameDefinitionListPortTypeProxy rp_dlproxy = null;
	private GetHotelRoomTypeNameDefinitionsPortTypeProxy rp_dproxy = null;
	private SetHotelRoomTypeNameDefinitionsPortTypeProxy rc_dproxy = null;
	private GetMasterRoomTypeNameDefinitionListPortTypeProxy rp_mdlproxy = null;
	private GetMasterRoomTypeNameDefinitionsPortTypeProxy rp_mdproxy = null;
	private SetMasterRoomTypeNameDefinitionsPortTypeProxy rc_mdproxy = null;
	private GetMasterRoomTypeNameDisplayTextPortTypeProxy rp_dtproxy = null;
	private GetHotelRoomPoolListPortType rr_dtproxy = null;
	private SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy rc_dtproxy = null;
	private GetMasterRoomTypeListPortTypeProxy rp_rtlproxy = null;
	private GetHotelRoomProductInfoChannelLanguagesPortTypeProxy rp_clproxy = null;
	private GetHotelRoomProductInfoEntriesPortTypeProxy rp_eproxy = null;
	private GetHotelRoomProductDisplayRulesPortTypeProxy rp_drproxy = null;
	private SetHotelRoomProductDisplayRulesNotifPortTypeProxy rc_drproxy = null;

	/**
	 * Default constructor.
	 */

	public RoomTypeNameManagerImpl() {

	}

	public MI_HotelRoomProductInfoChannelsRS getChannels() {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoChannelsRS rp_def = null;
		try {
			if (rp_cproxy == null)
				rp_cproxy = new GetHotelRoomProductInfoChannelsPortTypeProxy(SoapPort_address);
			rp_def = rp_cproxy.MI_HotelRoomProductInfoChannelsRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}


	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = null;
		try {
			if (rp_clproxy == null)
				rp_clproxy = new GetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
			rp_def = rp_clproxy.getFormattedRatesChannelLanguages(channel,SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;

	}

	public MI_MasterRoomTypeNameDataDictionaryRS getDataDictionary() {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDataDictionaryRS rp_def = null;
		try {
			if (rp_infoproxy == null)
				rp_infoproxy = new GetMasterRoomTypeNameDataDictionaryPortTypeProxy(SoapPort_address);

			rp_def = rp_infoproxy.MI_MasterRoomTypeNameDataDictionaryRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS getDefaultLanguages() {
		Channel channel = new Channel();
		channel.setCode("ZZ");
		channel.setName("DEFAULT");
		channel.setNumber("0");
		return getChannelLanguages(channel);
	}

	public MI_HotelRoomProductInfoEntriesRS getEntries() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoEntriesRS rp_def = null;
		try {
			String SoapPort_address=getSoapPortAddress();
			if (rp_eproxy == null)
				rp_eproxy = new GetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
			rp_def = rp_eproxy.GetFormattedRatesEntries(SoapPort_address);
		} catch (RemoteException e) {
			
			log.error(e.getMessage(),e);
		} catch (ServiceException e) {
			
			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomTypeNameDefinitionsRS getHotelRoomTypeNameDefinition(String marshacode, String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomTypeNameDefinitionsRS rp_def = null;
		try {
			if (rp_dproxy == null)
				rp_dproxy = new GetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rp_dproxy.MI_HotelRoomTypeNameDefinitionsRQ(marshacode, roompool, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomPoolListRS getRoomTypeList(String marshacode) {
		String SoapPort_address= getSoapPortAddress();
		MI_HotelRoomPoolListRS rp_def = null;
		try {
			if (rr_dtproxy == null)
				rr_dtproxy = new GetHotelRoomPoolListPortTypeProxy(SoapPort_address);

			rp_def = rr_dtproxy.MI_HotelRoomPoolListRQ(marshacode,SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomTypeNameDefinitionListRS getHotelRoomTypeNameDefinitionList(String marshacode) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomTypeNameDefinitionListRS rp_def = null;
		try {
			if (rp_dlproxy == null)
				rp_dlproxy = new GetHotelRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);

			rp_def = rp_dlproxy.MI_HotelRoomTypeNameDefinitionListRQ(marshacode, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeListRS getMasterRoomTypeList() {
		String SoapPort_address= getSoapPortAddress();
		MI_MasterRoomTypeListRS rp_def = null;
		try {
			if (rp_rtlproxy == null)
				rp_rtlproxy = new GetMasterRoomTypeListPortTypeProxy(SoapPort_address);

			rp_def = rp_rtlproxy.MI_MasterRoomTypeListRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeNameDefinitionsRS getMasterRoomTypeNameDefinition(String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDefinitionsRS rp_def = null;
		try {
			if (rp_mdproxy == null)
				rp_mdproxy = new GetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rp_mdproxy.MI_MasterRoomTypeNameDefinitionsRQ(roompool, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeNameDefinitionListRS getMasterRoomTypeNameDefinitionList() {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDefinitionListRS rp_def = null;
		try {
			if (rp_mdlproxy == null)
				rp_mdlproxy = new GetMasterRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);

			rp_def = rp_mdlproxy.MI_MasterRoomTypeNameDefinitionListRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeNameDisplayTextRS getMasterRoomTypeNameDisplayText(Channel channel, String langId) {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDisplayTextRS rp_def = null;
		try {
			if (rp_dtproxy == null)
				rp_dtproxy = new GetMasterRoomTypeNameDisplayTextPortTypeProxy(SoapPort_address);

			rp_def = rp_dtproxy.MI_MasterRoomTypeNameDisplayTextRQ(channel, langId, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	private String getSoapPortAddress() {
		Query query = em.createNativeQuery("select c.constant_value from mfpdbo.RFP_Constants c where c.constant_name= 'MARSHA_ROOMDEF_URL' ");
		return (String) query.getSingleResult();
	}
	public MI_HotelRoomTypeNameDefinitionsNotifRS setHotelRoomTypeNameDefinition(String marshaCode, RoomTypeNameDefinitions rtnds, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomTypeNameDefinitionsNotifRS rp_def = null;
		try {
			if (rc_dproxy == null)
				rc_dproxy = new SetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rc_dproxy.MI_HotelRoomTypeNameDefinitionsNotifRQ(marshaCode, rtnds, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeNameDefinitionsNotifRS setMasterRoomTypeNameDefinition(RoomTypeNameDefinitions rtnds, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDefinitionsNotifRS rp_def = null;
		try {
			if (rc_mdproxy == null)
				rc_mdproxy = new SetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rc_mdproxy.MI_MasterRoomTypeNameDefinitionsNotifRQ(rtnds, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_MasterRoomTypeNameDisplayTextNotifRS updateDisplayText(MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_MasterRoomTypeNameDisplayTextNotifRS rp_def = null;
		try {
			if (rc_dtproxy == null)
				rc_dtproxy = new SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_dtproxy.UpdateDisplayText(roomproductInfo, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductDisplayRulesRS getDisplayRules(Channel channel, Entry entry){
		String SoapPort_address=getSoapPortAddress();
	  	MI_HotelRoomProductDisplayRulesRS rp_def = null;
		try {
			if (rp_drproxy == null)
				rp_drproxy = new GetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);

			 rp_def = rp_drproxy.MI_HotelRoomProductDisplayRulesRQ(channel, entry,SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductDisplayRulesNotifRS updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName){
		String SoapPort_address=getSoapPortAddress();
	  	MI_HotelRoomProductDisplayRulesNotifRS rp_def = null;
		try {
			if (rc_drproxy == null)
				rc_drproxy = new SetHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);

			 rp_def = rc_drproxy.UpdateDisplayRules(roomproductInfo, loginName,SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

}
