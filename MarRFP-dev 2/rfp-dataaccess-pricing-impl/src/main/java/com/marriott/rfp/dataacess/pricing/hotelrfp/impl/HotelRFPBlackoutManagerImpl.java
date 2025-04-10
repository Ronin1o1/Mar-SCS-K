package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPBlackoutManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelRFPBlackoutManager
 */

@Service
public class HotelRFPBlackoutManagerImpl implements HotelRFPBlackoutManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<HotelBlackoutDate> getGeneralBlackouts(long hotelrfpid) {
	String queryString = "SELECT blackoutid , startdate , enddate, blackname  FROM mfpdbo.hotelblackoutdates  where hotelrfpid = ?1 order by blackoutid  ";

	Query q = em.createNativeQuery(queryString, HotelBlackoutDate.class);
	q.setParameter(1, hotelrfpid);
	List<HotelBlackoutDate> hotelBlackoutDate = q.getResultList();
	return hotelBlackoutDate;
    }

    public void updateBlackoutDates(long hotelrfpid, List<HotelBlackoutDate> hotelBlackoutDate, User user) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin delete from mfpdbo.hotelblackoutdates where hotelrfpid=?; end;");
		try {
		    stmt.setLong(1, hotelrfpid);
		    stmt.execute();
		} finally {
		    stmt.close();
		}

		
		 stmt = con.prepareCall("begin mfpproc.sp_insertupdate_blackouts_all(?,?,?,?,?); end; ");

		try {
		    for (int i = 0; i < hotelBlackoutDate.size(); i++) {
			HotelBlackoutDate srt = (HotelBlackoutDate) hotelBlackoutDate.get(i);

			stmt.setLong(1, hotelrfpid);
			stmt.setLong(2, srt.getBlackoutid());
			stmt.setDate(3,(Date) srt.getStartdate());
			stmt.setDate(4,(Date) srt.getEnddate());
			stmt.setString(5, srt.getBlackname());

			stmt.execute();
		    }
		} finally {
		    stmt.close();
		}

		CallableStatement stmt2 = con.prepareCall("begin mfpproc.sp_updateblackouts_all(?); end; ");
		try {
		    stmt2.setLong(1, hotelrfpid);

		    stmt2.execute();

		} finally {
		    stmt2.close();
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
