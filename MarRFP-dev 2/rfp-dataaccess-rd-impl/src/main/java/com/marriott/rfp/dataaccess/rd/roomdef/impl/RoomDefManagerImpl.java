package com.marriott.rfp.dataaccess.rd.roomdef.impl;

import java.rmi.RemoteException;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.rpc.ServiceException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.rd.roomdef.api.RoomDefManager;
import com.marriott.rfp.dataaccess.rd.roomdef.channellanguages.GetHotelRoomProductInfoChannelLanguagesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.channels.GetHotelRoomProductInfoChannelsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.datadictionary.GetHotelRoomProductDataDictionaryPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.entries.GetHotelRoomProductInfoEntriesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.hotelamenitylistsinfo.GetHotelAmenityListsInfoPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.hotelratecodelist.GetHotelRateCodeListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert.GetHotelRoomProductSynchAlertsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert.SetHotelRoomProductSynchAlertsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.GetHotelRoomProductDisplayRulesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.SetHotelRoomProductDisplayRulesNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext.GetHotelRoomProductDisplayTextPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext.SetHotelRoomProductDisplayTextNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo.GetHotelRoomProductInfoPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo.SetHotelRoomProductInfoNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.roomproductoptions.GetHotelRoomProductOptionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomtypename.hotelroomtypelist.GetHotelRoomPoolListPortTypeProxy;
import com.marriott.rfp.object.roomdef.ProductDescriptionView;
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
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RoomProduct;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;
import com.marriott.rfp.object.roomdef.beans.Text;

/**
 * Session Bean implementation class GetChannels
 */
@Service
public class RoomDefManagerImpl implements RoomDefManager {
	private static final Logger log = LoggerFactory.getLogger(RoomDefManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	private GetHotelRoomProductInfoChannelLanguagesPortTypeProxy rp_infoproxy = null;
	private GetHotelRoomProductInfoChannelsPortTypeProxy rp_cproxy = null;
	private GetHotelRoomProductDataDictionaryPortTypeProxy rp_ddproxy = null;
	private GetHotelRoomProductInfoEntriesPortTypeProxy rp_eproxy = null;
	private GetHotelRoomProductDisplayRulesPortTypeProxy rp_drproxy = null;
	private SetHotelRoomProductDisplayRulesNotifPortTypeProxy rc_drproxy = null;
	private GetHotelRoomProductDisplayTextPortTypeProxy rp_dtproxy = null;
	private SetHotelRoomProductDisplayTextNotifPortTypeProxy rc_dtproxy = null;
	private GetHotelRoomProductInfoPortTypeProxy rp_pinfoproxy = null;
	private SetHotelRoomProductInfoNotifPortTypeProxy rc_pinfoproxy = null;
	private GetHotelRoomProductOptionsPortTypeProxy rp_poproxy = null;
	private GetHotelAmenityListsInfoPortTypeProxy rp_amenityproxy = null;
	private GetHotelRoomPoolListPortTypeProxy rp_rpproxy = null;
	private GetHotelRoomProductSynchAlertsPortTypeProxy rp_syncproxy = null;
	private GetHotelRateCodeListPortTypeProxy rc_listproxy = null;
	private SetHotelRoomProductSynchAlertsPortTypeProxy rc_nlistproxy = null;

	public RoomDefManagerImpl() {

	}

	public MI_HotelAmenityListsInfoRS getAmenityLists() {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelAmenityListsInfoRS rp_def = null;
		try {
			if (rp_amenityproxy == null)
				rp_amenityproxy = new GetHotelAmenityListsInfoPortTypeProxy(SoapPort_address);
			rp_def = rp_amenityproxy.MI_HotelAmenityListsRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = null;
		try {
			if (rp_infoproxy == null)
				rp_infoproxy = new GetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
			rp_def = rp_infoproxy.MI_HotelRoomProductInfoChannelLanguagesRQ(channel, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
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

	public MI_HotelRoomProductDataDictionaryRS getDataDictionary() {
		String SoapPort_address = getSoapPortAddress();
		// get a list of all the room pools with a room product definition for the property
		MI_HotelRoomProductDataDictionaryRS rp_def = null;
		try {
			if (rp_ddproxy == null)
				rp_ddproxy = new GetHotelRoomProductDataDictionaryPortTypeProxy(SoapPort_address);
			rp_def = rp_ddproxy.MI_HotelRoomProductDataDictionaryRQ(SoapPort_address);
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

	public MI_HotelRoomProductDisplayRulesRS getDisplayRules(Channel channel, Entry entry) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductDisplayRulesRS rp_def = null;
		try {
			if (rp_drproxy == null)
				rp_drproxy = new GetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);

			rp_def = rp_drproxy.MI_HotelRoomProductDisplayRulesRQ(channel, entry, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductDisplayTextRS getDisplayText(Channel channel, String langId) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductDisplayTextRS rp_def = null;
		try {
			if (rp_dtproxy == null)
				rp_dtproxy = new GetHotelRoomProductDisplayTextPortTypeProxy(SoapPort_address);

			rp_def = rp_dtproxy.MI_HotelRoomProductDisplayTextRQ(channel, langId, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoEntriesRS getEntries() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoEntriesRS rp_def = null;
		try {
			String SoapPort_address = getSoapPortAddress();
			if (rp_eproxy == null)
				rp_eproxy = new GetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
			rp_def = rp_eproxy.GetKOREntries(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductOptionsRS getRoomProductDef(String marshacode) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductOptionsRS rp_def = null;
		try {
			if (rp_poproxy == null)
				rp_poproxy = new GetHotelRoomProductOptionsPortTypeProxy(SoapPort_address);

			rp_def = rp_poproxy.GetProductOptions(marshacode, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoRS getRoomProductInfo(String marshacode, String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoRS rp_def = null;
		try {
			if (rp_pinfoproxy == null)
				rp_pinfoproxy = new GetHotelRoomProductInfoPortTypeProxy(SoapPort_address);

			rp_def = rp_pinfoproxy.GetRoomProduct(marshacode, roompool, SoapPort_address);
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

	public MI_HotelRoomProductInfoNotifRS removeRateProgramRoomDef(String marshacode, String roompool, String rateprogram, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoNotifRS rp_def = null;
		try {
			if (rc_pinfoproxy == null)
				rc_pinfoproxy = new SetHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_pinfoproxy.RemoveRateLevel(marshacode, roompool, rateprogram, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductDisplayRulesNotifRS updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductDisplayRulesNotifRS rp_def = null;
		try {
			if (rc_drproxy == null)
				rc_drproxy = new SetHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_drproxy.UpdateDisplayRules(roomproductInfo, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductDisplayTextNotifRS updateDisplayText(MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductDisplayTextNotifRS rp_def = null;
		try {
			if (rc_dtproxy == null)
				rc_dtproxy = new SetHotelRoomProductDisplayTextNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_dtproxy.UpdateDisplayText(roomproductInfo, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoNotifRS updateRoomProduct(String marshacode, String roompool, String rateprogram,
			MI_HotelRoomProductInfoRS roomproductInfo, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoNotifRS rp_def = null;
		try {
			if (rc_pinfoproxy == null)
				rc_pinfoproxy = new SetHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_pinfoproxy.UpdateRoomProduct(marshacode, roompool, rateprogram, roomproductInfo, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomPoolListRS getRoomPoolList(String marshacode) {
		String SoapPort_address = getSoapPortAddress();
		log.info("SoapPort_address SoapPort_address  "+SoapPort_address);
		MI_HotelRoomPoolListRS rp_def = null;
		try {
			if (rp_rpproxy == null)
				rp_rpproxy = new GetHotelRoomPoolListPortTypeProxy(SoapPort_address);
			
			log.info("SoapPort_address rp_rpproxy  "+rp_rpproxy);
			rp_def = rp_rpproxy.MI_HotelRoomPoolListRQ(marshacode, SoapPort_address);

		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductSynchAlertsRS getRoomProductSyncAlerts(String marshacode, String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductSynchAlertsRS rp_def = null;
		try {
			if (rp_syncproxy == null)
				rp_syncproxy = new GetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
			rp_def = rp_syncproxy.MI_HotelRoomProductSynchAlertsRQ(marshacode, roompool, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRoomProductInfoRS getRoomProductList(String marshacode, String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoRS rp_def = null;
		try {
			if (rp_pinfoproxy == null)
				rp_pinfoproxy = new GetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
			rp_def = rp_pinfoproxy.GetRoomProductList(marshacode, roompool, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelRateCodeListRS getRateProgramList(String marshacode, String roompool) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRateCodeListRS rp_def = null;
		try {
			if (rc_listproxy == null)
				rc_listproxy = new GetHotelRateCodeListPortTypeProxy(SoapPort_address);
			rp_def = rc_listproxy.MI_HotelRateCodeListRQ(marshacode, roompool, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public void deleteSynchAlerts(String marshacode, String loginName, String roompool, SynchAlerts[] sa) {
		String SoapPort_address = getSoapPortAddress();
		try {
			if (rc_nlistproxy == null)
				rc_nlistproxy = new SetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
			rc_nlistproxy.DeleteSynchAlerts(marshacode, loginName, sa,SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
	}
	
	//Method to insert the product options record to korroompool or korrateprogram table based on roompoolonly flag.
	 public Long insertProductOptionsRecords(MI_HotelRoomProductOptionsRS dd, String marshaCode, String roompoolonly) {
		 Long reportID = null;
		 Query q = null;
		 int sort_order = 0;
		 try{
			 //If it roompoolonly, get the seqid from room pool sequence if not get it from rate program sequence.
			reportID = getReportId(roompoolonly);
			log.info("Marsha Code, roompoolonly flag, Report id"+marshaCode+"--"+roompoolonly+"--"+reportID);
			//if reportID is null, don't do anything. it is an issue.
			if(reportID != null){
				//Create query object for two different tables based on the value of roompoolonly.
				if(roompoolonly != null && roompoolonly.equals("Y"))
							q = em.createNativeQuery("begin  insert into mfpdbo.korroompool (seqid, marshacode, korcategory, rateplancode, elementgroupcode, elementgroupname, elementtypecode, elementtypename, elementcode, elementcodelist, elementcodename, availabilityind, addonamenityind, calloutind, quantity, roomnumber, uom_type, uom_name, brand_type, brand_name, format_type, format_name, text, path, reportdate, sort_order) values (?1, ?2, 'KORPROPERTYINFO', null, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, sysdate, ?23); commit; end; ");
				else
							q = em.createNativeQuery("begin  insert into mfpdbo.korrateprogram (seqid, marshacode, korcategory, rateplancode, elementgroupcode, elementgroupname, elementtypecode, elementtypename, elementcode, elementcodelist, elementcodename, availabilityind, addonamenityind, calloutind, quantity, roomnumber, uom_type, uom_name, brand_type, brand_name, format_type, format_name, text, path, reportdate, sort_order) values (?1, ?2, 'KORPROPERTYINFO', null, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, sysdate, ?23); commit; end; ");
		     	//Retrieve the data from the dd list and insert into the table. both tables has the same columns/type.
		     	ProductDescriptions[] pdsa = dd.getProductDescriptions();
		     	for (int i = 0; i < pdsa.length; i++) {
		     		ProductDescription[] pda = pdsa[i].getProductDescription();
		     		for (int j = 0; j < pda.length; j++) {
		     		    if (pda[j].getSupplementaryData() != null || pda[j].getUnitOfMeasure() != null || pda[j].getFormat() != null
		     			    || pda[j].getBrand() != null) {
		     			ProductDescriptionView pdv = new ProductDescriptionView(pda[j]);
		     			q.setParameter(1, reportID);
		     			q.setParameter(2, marshaCode);
		     			q.setParameter(3, pdsa[i].getElementGroupCode());
		     			q.setParameter(4, pdsa[i].getElementGroupName());
		     			q.setParameter(5, pdsa[i].getElementTypeCode());
		     			q.setParameter(6, pdsa[i].getElementTypeName());
		     			q.setParameter(7, pdv.getElementCode());
		     			q.setParameter(8, pdv.getElementCodeList());
		     			q.setParameter(9, pdv.getElementCodeName());
		     			q.setParameter(10, pdv.getAvailabilityInd());
		     			q.setParameter(11, pdv.getAddOnAmenityInd());
		     			q.setParameter(12, pdv.getCalloutInd());
		     			q.setParameter(13, pdv.getQuantity());
		     			q.setParameter(14, pdv.getRoomNumber());
		     			if(pdv.getUnitOfMeasure() != null){
		         			q.setParameter(15, pdv.getUnitOfMeasure().getUOM_Type());
		         			q.setParameter(16, pdv.getUnitOfMeasure().getUOM_Name());
		         		}
		         			else
		         		{
		         			q.setParameter(15, pdv.getUnitOfMeasure());
		             		q.setParameter(16, pdv.getUnitOfMeasure());
		         		}
		     			if(pdv.getBrand() != null){
		         			q.setParameter(17, pdv.getBrand().getBrandType());
		         			q.setParameter(18, pdv.getBrand().getBrandName());
		     			}
		     			else
		     			{
		     				q.setParameter(17, pdv.getBrand());
		         			q.setParameter(18, pdv.getBrand());
		     			}
		     			if( pdv.getFormat() != null){
		         			q.setParameter(19, pdv.getFormat().getFormatType());
		         			q.setParameter(20, pdv.getFormat().getFormatName());
		     			}
		     			else
		     			{
		     				q.setParameter(19, pdv.getFormat());
		         			q.setParameter(20, pdv.getFormat());
		     			}
		     			if(pdv.getDescription() != null){
		     				if(pdv.getDescription().getText() != null)
		     				{
		     				Text[] txt = pdv.getDescription().getText();
		         			for(int y=0; y<txt.length; y++){
		         				if(txt[y].getLanguage().equals("en")) {
			         				q.setParameter(21, txt[y].getValue());
			         				break;}
			         				else
			         					{
			         					q.setParameter(21, txt[y].getValue());
			         				}
			                 		}
		     				}
		     				else
		     				{
		     					q.setParameter(21, pdv.getDescription().getText());
		     				}
		     			}
		     			else
		     			{
		     				q.setParameter(21, pdv.getDescription());
		     			}
		     			//supplementary Data list will contain more path, append all the path and update it in the column.
		     			if(pdv.getSupplementaryData() != null)
		     			{
		     				String path = "";
		         			SupplementaryData[] spd = pdv.getSupplementaryData();
		         			for(int z=0; z<spd.length; z++){
		         				path += spd[z].getPath();
		         				q.setParameter(22, path);
		                 		}
		     			}
		     			else
		     			{
		     				q.setParameter(22, pdv.getSupplementaryData());
		     			}
		     				sort_order += 1;
		     				q.setParameter(23, sort_order);
		         			q.executeUpdate();
		     		    } 
		     		}
		     	}
			}
		}
		catch (Exception e)
		{
			//if any exception is caught, then delete the inserts for the same report id and return null report id.
			log.error(e.getMessage(),e);
			 deletefromKORtable(reportID, roompoolonly, marshaCode);
			 log.info("The reportID is deleted because exception is caught "+reportID+"--for Hotel Code--"+marshaCode);
			 return null;
		}
     	return reportID;
 }
 
	 //method to remove the data from KOR Table if there is any exception with the inserts
		public void deletefromKORtable(Long reportID, String roompoolonly, String marshaCode) {
			try{
			Query query = null;
			if(roompoolonly != null && roompoolonly.equals("Y")){
				query = em.createNativeQuery("delete from mfpdbo.korroompool where seqid=?1 and marshacode=?2");
			}
			else
			{
				query = em.createNativeQuery("delete from mfpdbo.korrateprogram where seqid=?1 and marshacode=?2");	
			}
			query.setParameter(1, reportID);
			query.setParameter(2, marshaCode);
			query.executeUpdate();
			}
			catch (Exception e)
			{
				log.error(e.getMessage(),e);
			}
		}
	 
	//Method to insert the product info record to korroompool or korrateprogram table based on roompoolonly flag.
	 public Long insertProductInfoRecords(MI_HotelRoomProductInfoRS mrtnd, String marshaCode, String roomPool, String roompoolonly,  Long reportId) {
		 Query q = null;
		 int sort_order = 0;
		 //Create query object for two different tables based on the value of roompoolonly.
	 	 if(roompoolonly != null && roompoolonly.equals("Y"))
			q = em.createNativeQuery("begin  insert into mfpdbo.korroompool (seqid, marshacode, korcategory, rateplancode, elementgroupcode, elementgroupname, elementtypecode, elementtypename, elementcode, elementcodelist, elementcodename, availabilityind, addonamenityind, calloutind, quantity, roomnumber, uom_type, uom_name, brand_type, brand_name, format_type, format_name, text, path, reportdate, sort_order) values (?1, ?2, 'KORROOMPRODUCT', null, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, sysdate, ?23); commit; end; ");
	 	 else
			q = em.createNativeQuery("begin  insert into mfpdbo.korrateprogram (seqid, marshacode, korcategory, rateplancode, elementgroupcode, elementgroupname, elementtypecode, elementtypename, elementcode, elementcodelist, elementcodename, availabilityind, addonamenityind, calloutind, quantity, roomnumber, uom_type, uom_name, brand_type, brand_name, format_type, format_name, text, path, reportdate, sort_order) values (?1, ?2, 'KORROOMPRODUCT', null, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, sysdate, ?23); commit; end; ");
	 	//Retrieve the data from the mrtnd list and insert into the table. both tables has the same columns/type.
	 	RoomProduct[] roomProductArray = null;
	 	if (mrtnd != null && mrtnd.getErrors()==null && mrtnd.getRoomProducts()!=null)
	 	    roomProductArray = mrtnd.getRoomProducts().getRoomProduct();
	 	RoomProduct roomProduct = null;
	 	if (roomProductArray != null) {
	 	    for (int l = 0; l < roomProductArray.length; l++) {
	 		if (roomProductArray[l].getRoomTypeCode().equals(roomPool)) {
	 		    roomProduct = roomProductArray[l];
	 		    break;
	 		}
	 	    }
	 	}
	 	try{
	 	if (roomProduct != null) {
	 	    ProductDescriptions[] pdsa = roomProduct.getProductDescriptions();
	 	    for (int i = 0; i < pdsa.length; i++) {
	 		    ProductDescription[] pda = pdsa[i].getProductDescription();
	 		    for (int j = 0; j < pda.length; j++) {
	 				ProductDescriptionView pdv = new ProductDescriptionView(pda[j]);
	 				q.setParameter(1, reportId);
	     			q.setParameter(2, marshaCode);
	     			q.setParameter(3, pdsa[i].getElementGroupCode());
	     			q.setParameter(4, pdsa[i].getElementGroupName());
	     			q.setParameter(5, pdsa[i].getElementTypeCode());
	     			q.setParameter(6, pdsa[i].getElementTypeName());
	     			q.setParameter(7, pdv.getElementCode());
	     			q.setParameter(8, pdv.getElementCodeList());
	     			q.setParameter(9, pdv.getElementCodeName());
	     			q.setParameter(10, pdv.getAvailabilityInd());
	     			q.setParameter(11, pdv.getAddOnAmenityInd());
	     			q.setParameter(12, pdv.getCalloutInd());
	     			q.setParameter(13, pdv.getQuantity());
	     			q.setParameter(14, pdv.getRoomNumber());
	     			if(pdv.getUnitOfMeasure() != null){
	     			q.setParameter(15, pdv.getUnitOfMeasure().getUOM_Type());
	     			q.setParameter(16, pdv.getUnitOfMeasure().getUOM_Name());
	     			}
	     			else
	     			{
	     				q.setParameter(15, pdv.getUnitOfMeasure());
	         			q.setParameter(16, pdv.getUnitOfMeasure());
	     			}
	     			if(pdv.getBrand() != null){
	         			q.setParameter(17, pdv.getBrand().getBrandType());
	         			q.setParameter(18, pdv.getBrand().getBrandName());
	     			}
	     			else
	     			{
	     				q.setParameter(17, pdv.getBrand());
	         			q.setParameter(18, pdv.getBrand());
	     			}
	     			if( pdv.getFormat() != null){
	         			q.setParameter(19, pdv.getFormat().getFormatType());
	         			q.setParameter(20, pdv.getFormat().getFormatName());
	     			}
	     			else
	     			{
	     				q.setParameter(19, pdv.getFormat());
	         			q.setParameter(20, pdv.getFormat());
	     			}
	     			if(pdv.getDescription() != null){
	     				if(pdv.getDescription().getText() != null)
	     				{
	     				Text[] txt = pdv.getDescription().getText();
	         			for(int y=0; y<txt.length; y++){
	         				if(txt[y].getLanguage().equals("en")) {
	         				q.setParameter(21, txt[y].getValue());
	         				break;}
	         				else
	         				{
	         					q.setParameter(21, txt[y].getValue());
	         				}
	                 		}
	     				}
	     				else
	     				{
	     					q.setParameter(21, pdv.getDescription().getText());
	     				}
	     			}
	     			else
	     			{
	     				q.setParameter(21, pdv.getDescription());
	     			}
	     			//supplementary Data list will contain more path, append all the path and update it in the column.
	     			if(pdv.getSupplementaryData() != null)
	     			{
	     				String path = "";
	         			SupplementaryData[] spd = pdv.getSupplementaryData();
	         			for(int z=0; z<spd.length; z++){
	         				path += spd[z].getPath();
	         				q.setParameter(22, path);
	                 		}
	     			}
	     			else
	     			{
	     				q.setParameter(22, pdv.getSupplementaryData());
	     			}
	     				sort_order += 1;
	     				q.setParameter(23, sort_order);
	     			q.executeUpdate();
	 		    }
	 		
	 	    }
	 	}
	 	}
	 	catch (Exception e)
	 	{
	 		//if any exception is caught, then delete the inserts for the same report id and return null report id.
			log.error(e.getMessage(),e);
			 deletefromKORtable(reportId, roompoolonly, marshaCode);
			 log.info("The reportID is deleted because exception is caught"+reportId+"--for Hotel Code--"+marshaCode);
			 return null;
	 	}
	 	return reportId;
	 }
 
 //Method to get the seq id or report id to load the kor webservice reports tables.
	public Long getReportId(String roompoolonly) {
		Query q;
		String queryString1 = " select mfpdbo.korroompool_seq.nextval from dual ";
		String queryString2 = " select mfpdbo.korrateprogram_seq.nextval from dual";
		if(roompoolonly != null && roompoolonly.equals("Y"))
		{ q = em.createNativeQuery(queryString1, Long.class);}
		else
		{ q = em.createNativeQuery(queryString2, Long.class);}
		Long num_reportid = null;
		try {
			num_reportid = (Long) q.getSingleResult();
		} 
		//if Exception is caught, return reportID as null
		catch (NoResultException ex) {
			num_reportid = null;
		} catch(Exception ex){
			log.error(ex.getMessage(),ex);
			num_reportid = null;
		}
		return num_reportid;
	}
	

}
