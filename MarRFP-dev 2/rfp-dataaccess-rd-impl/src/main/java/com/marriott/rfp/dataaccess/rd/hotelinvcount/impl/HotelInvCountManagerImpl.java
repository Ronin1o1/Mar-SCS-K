package com.marriott.rfp.dataaccess.rd.hotelinvcount.impl;

import java.rmi.RemoteException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.rpc.ServiceException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.rd.hotelinvcount.api.HotelInvCountManager;
import com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount.GetHotelInvCountPortType;
import com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount.GetHotelInvCountPortTypeProxy;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;

/**
 * Session Bean implementation class GetChannels
 */
@Service
public class HotelInvCountManagerImpl implements HotelInvCountManager {
	private static final Logger log = LoggerFactory.getLogger(HotelInvCountManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	private GetHotelInvCountPortType rp_poproxy = null;

	public HotelInvCountManagerImpl() {

	}


	public OTA_HotelInvCountRS getHotelInvCount(String marshacode) {
		String SoapPort_address = getSoapPortAddress();
		OTA_HotelInvCountRS rp_def = null;
		try {
			if (rp_poproxy == null)
				rp_poproxy = new GetHotelInvCountPortTypeProxy(SoapPort_address);

			rp_def = rp_poproxy.OTA_HotelInvCountRQ(marshacode, SoapPort_address);
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


}
