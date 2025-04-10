package com.marriott.rfp.dataaccess.rd.rateproduct.impl;

import java.rmi.RemoteException;
import java.util.Vector;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.rpc.ServiceException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.rd.rateproduct.api.RateProductManager;
import com.marriott.rfp.dataaccess.rd.rateproduct.datedictionary.GetRateProductDataDictionaryPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.definitionlist.GetRateProductDefinitionListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.definitions.GetRateProductDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.definitions.SetRateProductDefinitionsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.displayrateplandescription.GetDisplayRatePlanDescriptionPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.displaytext.GetRateProductDisplayTextPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.displaytext.SetRateProductDisplayTextNotifPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.hotelbrands.GetHotelBrandsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist.GetRatePlanAssignmentListPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist.SetRatePlanAssignmentsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.channellanguages.GetHotelRoomProductInfoChannelLanguagesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.channels.GetHotelRoomProductInfoChannelsPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.entries.GetHotelRoomProductInfoEntriesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.GetHotelRoomProductDisplayRulesPortTypeProxy;
import com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules.SetHotelRoomProductDisplayRulesNotifPortTypeProxy;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentDataView;
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

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

/**
 * Session Bean implementation class GetChannels
 */
@Service
public class RateProductManagerImpl implements RateProductManager {
	private static final Logger log = LoggerFactory.getLogger(RateProductManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private static final CacheManager cacheManager = CacheManager.create(RateProductManagerImpl.class.getResource("/ehcache_rd.xml"));
	/**
	 * Default constructor.
	 */
	private GetRateProductDataDictionaryPortTypeProxy rp_infoproxy = null;
	private GetHotelRoomProductInfoChannelsPortTypeProxy rp_cproxy = null;
	private GetRateProductDefinitionListPortTypeProxy rp_dlproxy = null;
	private GetRateProductDefinitionsPortTypeProxy rp_dproxy = null;
	private SetRateProductDefinitionsPortTypeProxy rc_dproxy = null;
	private GetDisplayRatePlanDescriptionPortTypeProxy rp_deproxy = null;
	private GetRateProductDisplayTextPortTypeProxy rp_dtproxy = null;
	private SetRateProductDisplayTextNotifPortTypeProxy rc_dtproxy = null;
	private GetHotelBrandsPortTypeProxy rp_hbproxy = null;
	private GetRatePlanAssignmentListPortTypeProxy rp_alproxy = null;
	private SetRatePlanAssignmentsPortTypeProxy rc_alproxy = null;
	private GetHotelRoomProductInfoChannelLanguagesPortTypeProxy rp_clproxy = null;
	private GetHotelRoomProductInfoEntriesPortTypeProxy rp_eproxy = null;
	private GetHotelRoomProductDisplayRulesPortTypeProxy rp_drproxy = null;
	private SetHotelRoomProductDisplayRulesNotifPortTypeProxy rc_drproxy = null;

	public RateProductManagerImpl() {

	}

	public MI_HotelRoomProductInfoChannelLanguagesRS getChannelLanguages(Channel channel) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = null;
		try {
			if (rp_clproxy == null)
				rp_clproxy = new GetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
			rp_def = rp_clproxy.getRateProductChannelLanguages(channel, SoapPort_address);
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

	public MI_RateProductDataDictionaryRS getDataDictionary() {
		MI_RateProductDataDictionaryRS rp_def = null;
		String cacheKey = "rateProductDict";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String SoapPort_address = getSoapPortAddress();
			try {
				if (rp_infoproxy == null)
					rp_infoproxy = new GetRateProductDataDictionaryPortTypeProxy(SoapPort_address);

				rp_def = rp_infoproxy.MI_RateProductDataDictionaryRQ(SoapPort_address);
				if (rp_def != null && thecache != null) {
					thecache.put(elem = new Element(cacheKey, rp_def));
				}
			} catch (RemoteException e) {

				log.error(e.getMessage(),e);
			} catch (ServiceException e) {

				log.error(e.getMessage(),e);
			}
		} else
			rp_def = (MI_RateProductDataDictionaryRS) elem.getValue();
		return rp_def;
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS getDefaultLanguages() {
		Channel channel = new Channel();
		channel.setCode("ZZ");
		channel.setName("DEFAULT");
		channel.setNumber("0");
		return getChannelLanguages(channel);
	}

	public MI_DisplayRatePlanDescriptionRS getDisplayRatePlanDescription(String marshacode, boolean bGetOldDescription, Channel channel, String langId, Entry entry, String rateProgram) {
		String SoapPort_address = getSoapPortAddress();
		MI_DisplayRatePlanDescriptionRS rp_def = null;
		try {
			if (rp_deproxy == null)
				rp_deproxy = new GetDisplayRatePlanDescriptionPortTypeProxy(SoapPort_address);
			String requestorID = "MARRFPRTD";
			if (bGetOldDescription)
				requestorID = "MARRFP";

			rp_def = rp_deproxy.MI_DisplayRatePlanDescriptionRQ(marshacode, requestorID, channel, langId, entry, rateProgram, SoapPort_address);
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
			rp_def = rp_eproxy.GetRateProductEntries(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;

	}

	public MI_HotelBrandsRS getHotelBrands() {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelBrandsRS rp_def = null;
		try {
			if (rp_hbproxy == null)
				rp_hbproxy = new GetHotelBrandsPortTypeProxy(SoapPort_address);

			rp_def = rp_hbproxy.MI_HotelBrandsRQ(SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_HotelBrandsRS getHotelBrands(String marshaCode) {
		String SoapPort_address = getSoapPortAddress();
		MI_HotelBrandsRS rp_def = null;
		try {
			if (rp_hbproxy == null)
				rp_hbproxy = new GetHotelBrandsPortTypeProxy(SoapPort_address);

			rp_def = rp_hbproxy.MI_HotelBrandsRQ(marshaCode, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RatePlanAssignmentListRS getRatePlanAssignmentList(String marshacode, String brandcode, String ratePlanCode, String ratePlanName, long count, String startRatePlanCode,
			String endRatePlanCode, String startKey, String endKey) {
		String SoapPort_address = getSoapPortAddress();
		MI_RatePlanAssignmentListRS rp_def = null;
		try {
			if (rp_alproxy == null)
				rp_alproxy = new GetRatePlanAssignmentListPortTypeProxy(SoapPort_address);

			rp_def = rp_alproxy.MI_RatePlanAssignmentListRQ(marshacode, brandcode, ratePlanCode, ratePlanName, count, startRatePlanCode, endRatePlanCode, startKey, endKey, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RateProductDefinitionsRS getRateProductDefinitions(String marshacode, String brandcode, String productcode, String level) {
		String SoapPort_address = getSoapPortAddress();
		MI_RateProductDefinitionsRS rp_def = null;
		try {
			if (rp_dproxy == null)
				rp_dproxy = new GetRateProductDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rp_dproxy.MI_RateProductDefinitionsRQ(marshacode, brandcode, productcode, level, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RateProductDefinitionsListRS getRateProductDefinitionsList(String marshacode, String brandcode, String productCode, String productName, long count, String startProduct,
			String endProduct, RateProductDefinition[] rtnd) {
		String SoapPort_address = getSoapPortAddress();
		MI_RateProductDefinitionsListRS rp_def = null;
		try {
			if (rp_dlproxy == null)
				rp_dlproxy = new GetRateProductDefinitionListPortTypeProxy(SoapPort_address);

			rp_def = rp_dlproxy.MI_RateProductDefinitionsListRQ(marshacode, brandcode, productCode, productName, count, startProduct, endProduct, rtnd, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RateProductDisplayTextRS getRateProductDisplayText(Channel channel, String langId) {
		String SoapPort_address = getSoapPortAddress();
		MI_RateProductDisplayTextRS rp_def = null;
		try {
			if (rp_dtproxy == null)
				rp_dtproxy = new GetRateProductDisplayTextPortTypeProxy(SoapPort_address);

			rp_def = rp_dtproxy.MI_RateProductDisplayTextRQ(channel, langId, SoapPort_address);
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

	public MI_RatePlanAssignmentListNotifRS setRatePlanAssignmentList(String marshacode, String brandcode, RatePlanAssignmentList ratePlanAssignmentList, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_RatePlanAssignmentListNotifRS rp_def = null;
		try {
			if (rc_alproxy == null)
				rc_alproxy = new SetRatePlanAssignmentsPortTypeProxy(SoapPort_address);

			rp_def = rc_alproxy.MI_RatePlanAssignmentListNotifRQ(marshacode, brandcode, ratePlanAssignmentList, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RateProductDefinitionsNotifRS setRateProductDefinitions(String marshacode, String brandcode, RateProductDefinitions rtnds, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_RateProductDefinitionsNotifRS rp_def = null;
		try {
			if (rc_dproxy == null)
				rc_dproxy = new SetRateProductDefinitionsPortTypeProxy(SoapPort_address);

			rp_def = rc_dproxy.MI_RateProductDefinitionsNotifRQ(marshacode, brandcode, rtnds, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
	}

	public MI_RateProductDisplayTextNotifRS updateDisplayText(MI_RateProductDisplayTextRS roomproductInfo, String loginName) {
		String SoapPort_address = getSoapPortAddress();
		MI_RateProductDisplayTextNotifRS rp_def = null;
		try {
			if (rc_dtproxy == null)
				rc_dtproxy = new SetRateProductDisplayTextNotifPortTypeProxy(SoapPort_address);

			rp_def = rc_dtproxy.UpdateDisplayText(roomproductInfo, loginName, SoapPort_address);
		} catch (RemoteException e) {

			log.error(e.getMessage(),e);
		} catch (ServiceException e) {

			log.error(e.getMessage(),e);
		}
		return rp_def;
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

	private Ehcache getCache() {
		return cacheManager.getCache("rfp_rd");
	}
	
	//Method to insert Rate plan Assignment Data to the oracle table for the cognos report.
	@SuppressWarnings("unchecked")
	public  Long insertRatePlanAssignmentList(RateProductAssignmentView rateProductAssignmentView, String marshaCode, String brandCode)
	{
		Long reportID = null;
			try{
			
			//Return the Seq id for the Cognos report.
			reportID = getReportId();
			log.info("Report id"+reportID+"for marshaCode"+marshaCode);			
			if(reportID != null){
			Query q = em.createNativeQuery("begin  insert into mfpdbo.rateplanassignment (seqid, marshacode, brandcode, rateplancode, rateplanname, rateplanmanaged, productcode, productname, productmanaged, lockedlevel, assign, lck, islocked, isallowassign, reportdate) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, sysdate); commit; end; ");
			Vector<RateProductAssignmentDataView> RatePlanAssignmentDataList = rateProductAssignmentView.getRatePlanAssignmentDataList();
			//Retrieve the data from the list and insert into the oracle table.
				for (int i = 0; i < RatePlanAssignmentDataList.size(); i++) {
					q.setParameter(1, reportID);
					q.setParameter(2, marshaCode);
					q.setParameter(3, brandCode);
					q.setParameter(4, RatePlanAssignmentDataList.get(i).getRatePlanCode());
					q.setParameter(5, RatePlanAssignmentDataList.get(i).getRatePlanName());
					q.setParameter(6, RatePlanAssignmentDataList.get(i).getRatePlanManaged());
					q.setParameter(7, RatePlanAssignmentDataList.get(i).getProductCode());
					q.setParameter(8, RatePlanAssignmentDataList.get(i).getProductName());
					q.setParameter(9, RatePlanAssignmentDataList.get(i).getProductManaged());
					q.setParameter(10, RatePlanAssignmentDataList.get(i).getLockedLevel());
					q.setParameter(11, RatePlanAssignmentDataList.get(i).getAssign());
					q.setParameter(12, RatePlanAssignmentDataList.get(i).getLock());
					q.setParameter(13, RatePlanAssignmentDataList.get(i).getIsLocked());
					q.setParameter(14, RatePlanAssignmentDataList.get(i).getIsAllowAssign());
					q.executeUpdate();
					}
				return reportID;
				}
			//If Exception is caught in any of the insert, then delete the seqid's rows from the table.
			} catch (Exception e)
			{
				log.error(e.getMessage(),e);
				if(reportID != null){
				deletefromrateplanassignmenttable(reportID, marshaCode);}
				return null;
			}	
		return null;
	}
	
	//Method to delete the Rate plan Assignment table data if any exception occurred.
	private void deletefromrateplanassignmenttable(Long reportId, String marshaCode) {
		try{
			Query query = em.createNativeQuery("delete from mfpdbo.rateplanassignment where seqid=?1 and marshacode=?2");	
			query.setParameter(1, reportId);
			query.setParameter(2, marshaCode);
			query.executeUpdate();
			}
			catch (Exception e)
			{
				log.error(e.getMessage(),e);
			}
	}

	//Method to Get the Seq id for the Rate program Assignment cognos report.
	public Long getReportId() {
		String queryString = " select mfpdbo.rateplanassignment_seq.nextval from dual ";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long num_reportid;
		try {
			num_reportid = (Long) q.getSingleResult();
		} 
		//If Exception is caught return the report id as null.
		  catch (NoResultException ex) {
			num_reportid = null;
		} catch(Exception e) {
			num_reportid = null;
		}
		return num_reportid;
	}
	
}
