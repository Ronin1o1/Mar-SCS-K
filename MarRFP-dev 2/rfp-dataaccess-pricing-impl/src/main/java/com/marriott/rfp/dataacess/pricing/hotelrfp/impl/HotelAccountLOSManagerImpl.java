package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountLOSManager;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountLOSManagerImpl implements HotelAccountLOSManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<LengthOfStay> getLOS(long hotel_accountinfoid) {

	String queryString = "SELECT lengthofstayid , roomnightsFrom , roomnightsto FROM mfpdbo.accountlengthofstay "
		+ "  where hotel_accountinfoid = ?1 order by lengthofstayid  ";
	Query q = em.createNativeQuery(queryString, LengthOfStay.class);
	q.setParameter(1, hotel_accountinfoid);
	List<LengthOfStay> lengthOfStayList = q.getResultList();
	return lengthOfStayList;
    }

    public void updateLOS(long haccid, Map<String, LengthOfStay> accountLOS, User user) {

	Long fromLOS, toLOS;
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		int numLOS = 0;
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		String losstartswith="1_";
		if (accountLOS.size()>0) {
			for (String key : accountLOS.keySet()) {
				int index=key.indexOf("_");
				losstartswith=key.substring(0, index+1);
				break;
			}
		}
		stmt = con.prepareCall("begin mfpproc.sp_accountlos_hpp(?,?,?, ?); end; ");
		try {
		    for (String key : accountLOS.keySet()) {
			if (key.startsWith(losstartswith)) {
			    numLOS++;
			    LengthOfStay los = accountLOS.get(key);
			    if (los.getRoomnightsfrom() == null || los.getRoomnightsfrom() == 0)
				fromLOS = null;
			    else
				fromLOS = new Long(los.getRoomnightsfrom());
			    if (los.getRoomnightsto() == null || los.getRoomnightsto() == 0)
				toLOS = null;
			    else
				toLOS = new Long(los.getRoomnightsto());

			    stmt.setLong(1, haccid);
			    stmt.setLong(2, los.getLengthofstayid());
			    stmt.setObject(3, fromLOS, Types.NUMERIC);
			    stmt.setObject(4, toLOS);
			    stmt.execute();
			}
		    }
		} finally {
		    stmt.close();
		}

		stmt = con.prepareCall("begin mfpproc.sp_accountlosdel_hpp(?,?); end;");
		try {
		    stmt.setLong(1, haccid);
		    stmt.setLong(2, numLOS);
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
