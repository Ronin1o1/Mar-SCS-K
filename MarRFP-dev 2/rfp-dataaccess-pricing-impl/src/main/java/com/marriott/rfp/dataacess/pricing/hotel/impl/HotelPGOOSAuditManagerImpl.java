package com.marriott.rfp.dataacess.pricing.hotel.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPGOOSAuditManager;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSAuditListData;

/**
 * Session Bean implementation class HotelPGOOSAuditManagerImpl
 */
@Service
public class HotelPGOOSAuditManagerImpl implements HotelPGOOSAuditManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public  List<HotelPGOOSAuditListData> findPGOOSAuditTrailDetail(String marshaCode, Long period) {

	String    queryString = " SELECT  marshacode, osuser eid,  to_char(tdate,'mm/dd/yyyy hh:mi am')  changeDate, cn_firstname, cn_lastname, pgoos_new, pgoos_old, "
            + "  aerpgoos_new, aerpgoos_old, exempt_gpp_new, exempt_gpp_old "
            + " FROM (SELECT    marshacode, osuser, tdate, pgoos_new, pgoos_old, "
            + " aerpgoos_new, aerpgoos_old, du.cn_firstname, du.cn_lastname, exempt_gpp_new, exempt_gpp_old "
            + " FROM (SELECT  osuser, tdate, pgoos_new, pgoos_old,  aerpgoos_new, aerpgoos_old, marshacode, exempt_gpp_new, exempt_gpp_old "
            + " FROM mfpdbo.audit_hotelrfp  WHERE (   aerpgoos_new <> aerpgoos_old  OR pgoos_new <> pgoos_old OR exempt_gpp_new <> exempt_gpp_old ) "
            + " AND marshacode = '" + marshaCode + "'  AND period = " + period + " UNION "
            + " SELECT osuser, tdate, pgoos_new, pgoos_old, aerpgoos_new, aerpgoos_old, marshacode , exempt_gpp_new, exempt_gpp_old"
            + " FROM mfpdbo.archive_hotelrfp WHERE (   aerpgoos_new <> aerpgoos_old  OR pgoos_new <> pgoos_old OR exempt_gpp_new <> exempt_gpp_old ) "
            + " AND marshacode = '" + marshaCode + "' AND period = " + period + ") a,  mfpdbo.ds_user du "
            + "    WHERE a.osuser = du.eid  ORDER BY tdate DESC)  WHERE ROWNUM < 15 ";

	Query q = em.createNativeQuery(queryString, HotelPGOOSAuditListData.class);
	@SuppressWarnings("unchecked")
	List<HotelPGOOSAuditListData> hotelPGOOSListData = q.getResultList();
	return hotelPGOOSListData;
    }



  

}
