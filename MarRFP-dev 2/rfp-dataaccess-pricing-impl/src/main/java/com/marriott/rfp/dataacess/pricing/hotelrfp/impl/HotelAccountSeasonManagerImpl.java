package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSeasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountSeasonManagerImpl implements HotelAccountSeasonManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<Season> getOffCycleFloatSeason(long hotel_accountinfoid) {

	String queryString = "select 1 seasonid, contractstart startdate, contractend enddate from mfpdbo.account where accountrecid in (select accountrecid from mfpdbo.hotel_accountinfo where hotel_accountinfoid=?1)";

	Query q = em.createNativeQuery(queryString, Season.class);
	q.setParameter(1, hotel_accountinfoid);
	List<Season> seasonList = q.getResultList();
	return seasonList;
    }

    @SuppressWarnings("unchecked")
    public List<Season> getSeason(long hotel_accountinfoid) {

	String queryString = "SELECT seasonid , startdate , enddate  FROM mfpdbo.accountseason   where hotel_accountinfoid = ?1 order by seasonid  ";

	Query q = em.createNativeQuery(queryString, Season.class);
	q.setParameter(1, hotel_accountinfoid);
	List<Season> seasonList = q.getResultList();
	return seasonList;
    }

    public void updateSeasons(long haccid, Map<String, Season> accountSeason, User user) {
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin mfpproc.sp_accountseasons_hpp(?,?,?, ?); end;");
		try {
		    for (String key : accountSeason.keySet()) {
			Season season = accountSeason.get(key);
			stmt.setLong(1, haccid);
			stmt.setLong(2, season.getSeasonid());
			stmt.setString(3, season.getShortStartdate());
			stmt.setString(4, season.getShortEnddate());
			stmt.execute();
		    }
		} finally {
		    stmt.close();
		}

		stmt = con.prepareCall("begin mfpproc.sp_accountseasonsdel_hpp(?,?); end;");
		try {
		    stmt.setLong(1, haccid);
		    stmt.setLong(2, accountSeason.size());
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
