package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPEligibilityAmenityManager;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureCharge;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureChargeOptions;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.pricing.account.AccountDetailCompMatrix;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelRFPEligibilityAmenityManagerImpl implements HotelRFPEligibilityAmenityManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<HotelEligibility> getGeneralEligibility(long hotelrfpid) {

	String queryString = "  SELECT   a.eligibilityid, a.eligibilitydescription, NVL (b.VALUE, 'N') value, rfpeligibilityid "
		+ " FROM   mfpdbo.eligibility_ref a, (SELECT   eligibilityid, VALUE, hotelrfpid, rfpeligibilityid "
		+ " FROM   mfpdbo.hoteleligibility  WHERE   hotelrfpid = ?1) b "
		+ " WHERE   (b.eligibilityid(+) = a.eligibilityid) AND (a.displaytypeid = 'A')  ORDER BY   sequence";
	Query q = em.createNativeQuery(queryString, HotelEligibility.class);
	q.setParameter(1, hotelrfpid);
	List<HotelEligibility> hotelEligibilityList = q.getResultList();
	return hotelEligibilityList;
    }

    public void updateGeneralEligibility(long hotelrfpid, List<HotelEligibility> hotelEligibilityList, User user) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_insertupdate_eligibility(?, ?, ?); end; ");
		try {
		    for (int i = 0; i < hotelEligibilityList.size(); i++) {
			HotelEligibility srt = (HotelEligibility) hotelEligibilityList.get(i);
			stmt.setLong(1, hotelrfpid);
			stmt.setString(2, srt.getEligibilityid());
			stmt.setString(3, srt.getValue());
			stmt.execute();
		    }
		} finally {
		    stmt.close();
		}
		audit.deleteAuditUser(con);
	    } finally {
		con.close();

	    }
	} catch (SQLException ex) {
	    ex.printStackTrace();
	}
    }

    /*
     * general amenities are updated based on what is in EPIC. The user cannot
     * update general amenities
     */
    
    @SuppressWarnings("unchecked")
    public List<HotelAmenities> getGeneralAmenities(long hotelrfpid) {

	String queryString = "  select f.* FROM ( SELECT   a.amenityid, mfpproc.fn_amenitydescchng(a.amenitydescription, mfpproc.wifirewards_eligiblity(?7)) amenitydescription, NVL (b.VALUE, 'N') value, rfpamenityid "
    		+ " FROM   mfpdbo.amenities_ref a, (SELECT   amenityid, VALUE, hotelrfpid, rfpamenityid "
    		+ " FROM   mfpdbo.hotelamenities WHERE   hotelrfpid = ?1) b "
    		+ " WHERE   (b.amenityid(+) = a.amenityid) AND (a.displaytypeid = 'A') ORDER BY   sequence ) f "
    		+ " where (f.amenityid = 'AMM_INTERNET_REWARDS' AND mfpproc.wifirewards_eligiblity(?2) = 'Y' AND mfpproc.fn_getwificountfromhotelamen(?4) = 2 ) "
    		+ " OR  (f.amenityid = 'AMM_INTERNET_WIRE' AND mfpproc.wifirewards_eligiblity(?3) = 'Y' AND mfpproc.fn_getwificountfromhotelamen(?5) != 2) "
    		+ " OR (f.amenityid = 'AMM_INTERNET_WIRE' AND  mfpproc.wifirewards_eligiblity(?4) = 'N') " 
    		+ " OR f.amenityid NOT IN ( 'AMM_INTERNET_WIRE','AMM_INTERNET_REWARDS') ";
	Query q = em.createNativeQuery(queryString, HotelAmenities.class);
	q.setParameter(1, hotelrfpid);
	q.setParameter(2, hotelrfpid);
	q.setParameter(3, hotelrfpid);
	q.setParameter(4, hotelrfpid);
	q.setParameter(5, hotelrfpid);
	q.setParameter(6, hotelrfpid);
	q.setParameter(7, hotelrfpid);
	List<HotelAmenities> hotelAmenitiesList = q.getResultList();
	return hotelAmenitiesList;
    }
    
    public String getCxlPolicy(long hotelrfpid) {
    	String queryString = "SELECT mfpproc.fn_get_htlstdcxlpolicy(?1) AS htlstdcxlpolicy FROM DUAL";
    	Query q = em.createNativeQuery(queryString, String.class);
    	q.setParameter(1, hotelrfpid);
    	String cxlpolicy;
    	try {
    		cxlpolicy = (String) q.getSingleResult(); 
    	} catch (NoResultException e) {
    		cxlpolicy = "";
    	}
    	return cxlpolicy;
    }
    
    public String getEarlyCharge() {
    	String queryString = "select constant_value from mfpdbo.rfp_constants where constant_name='EARLY_DEP_CHARGE'";
    	Query q = em.createNativeQuery(queryString, String.class);
    	String earlycharge;
    	try {
    		earlycharge = (String) q.getSingleResult(); 
    	} catch (NoResultException e) {
    		earlycharge = "";
    	}
    	return earlycharge;
    }
    
    public List<EarlyDepartureChargeOptions> getChargeOptions() {
    	String queryString = "select id, options from mfpdbo.early_departure_charge_options order by options asc";
    	Query q = em.createNativeQuery(queryString, EarlyDepartureChargeOptions.class);
    	@SuppressWarnings("unchecked")
		List<EarlyDepartureChargeOptions> chargeOptions = q.getResultList();
    	return chargeOptions;
    }
    
    public EarlyDepartureCharge getEarlyDepartureCharge(long hotelrfpid) {
    	String queryString = "select early_charge as departurecharge, early_charge_option as departurechargeoption, early_charge_value as departurechargevalue from mfpdbo.hotelrfp where hotelrfpid = ?1";
    	Query q = em.createNativeQuery(queryString, EarlyDepartureCharge.class);
    	q.setParameter(1, hotelrfpid);
    	EarlyDepartureCharge earlyDepartureCharge;
    	try {
    		earlyDepartureCharge = (EarlyDepartureCharge) q.getSingleResult(); 
    	} catch (NoResultException e) {
    		earlyDepartureCharge = new EarlyDepartureCharge();
    	}
    	return earlyDepartureCharge;
    }
    
    public void updateEarlyDepartureCharge(long hotelrfpid, EarlyDepartureCharge earlyDepartureCharge, User user) {
    	try {
    	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
    	    Connection con = (Connection) kem.getConnection();
    	    try {
    	    	AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
    	    	audit.setAuditUser(con);
    	    	CallableStatement stmt = con.prepareCall("begin mfpproc.sp_update_earlydeparturecharge(?, ?, ?, ?); end; ");
    	    	try {
    	    		stmt.setLong(1, hotelrfpid);
    	    		stmt.setString(2, earlyDepartureCharge.getDeparturecharge());
    	    		if(earlyDepartureCharge.getDeparturecharge().equalsIgnoreCase("Y")){
    	    			if(earlyDepartureCharge.getDeparturechargeoption() != null && earlyDepartureCharge.getDeparturechargeoption() != 0){
    	    				stmt.setLong(3, earlyDepartureCharge.getDeparturechargeoption());
    	    				if(earlyDepartureCharge.getDeparturechargeoption() == 2){
    	    					stmt.setObject(4, null, Types.DOUBLE);
    	    				} else {
    	    					stmt.setObject(4, earlyDepartureCharge.getDeparturechargevalue(), Types.DOUBLE);
    	    				}
    	    			} else {
    	    				stmt.setNull(3, Types.INTEGER);
    	    				stmt.setObject(4, null, Types.DOUBLE);
    	    			}
    	    		} else {
    	    			stmt.setNull(3, Types.INTEGER);
    	    			stmt.setObject(4, null, Types.DOUBLE);
    	    		}
    	    		stmt.execute();
    	    	} finally {
    	    		stmt.close();
    	    	}
    	    	audit.deleteAuditUser(con);
    	    } finally {
    	    	con.close();
    	    }
    	} catch (SQLException ex) {
    	    ex.printStackTrace();
    	}
    }
    
}
