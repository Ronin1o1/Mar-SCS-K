package com.marriott.rfp.dataacess.pricing.hotelrfpdos.impl;

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
import com.marriott.rfp.dataacess.pricing.hotelrfpdos.api.HotelRFPDOSManager;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_LOS;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Ranges;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Rates;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Season;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_Ranges;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelRFPRespondentManager
 */

@Service
public class HotelRFPDOSManagerImpl implements HotelRFPDOSManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public String isDOSEnhanced(long hotelrfpid) {
	String enhanced = "N";
	String queryString = "select nvl(isenhanced,'N') isenhanced from mfpdbo.salesdepth sd, mfpdbo.hotelrfp hr where hr.hotelrfpid=sd.hotelrfpid(+) and hr.hotelrfpid=?1";
	Query q = em.createNativeQuery(queryString, String.class);
	q.setParameter(1, hotelrfpid);
	enhanced = (String) q.getSingleResult();
	return enhanced;
    }

    public SalesDepth getSalesDepth(long hotelrfpid) {
	String queryString = "SELECT  sd.salesdepthid, sd.last_updatedate, nvl(sd.isenhanced, 'N') isenhanced, "
		+ " hr.currencycode, cr.currencyname, hr.hotelrfpid, sd.bt_price_strategy,  sd.prevyear_retailadr, sd.anticipate_inc_retail_pct "
		+ " FROM   mfpdbo.hotelrfp hr, mfpdbo.currency_ref cr, mfpdbo.salesdepth sd "
		+ " WHERE   hr.currencycode = cr.currencycode AND hr.hotelrfpid = sd.hotelrfpid(+) AND hr.hotelrfpid = ?1 ";

	Query q = em.createNativeQuery(queryString, SalesDepth.class);
	q.setParameter(1, hotelrfpid);
	SalesDepth salesDepth = (SalesDepth) q.getSingleResult();

	return salesDepth;
    }

    @SuppressWarnings("unchecked")
    public List<SalesDepth_Ranges> getSalesDepthRanges(long salesdepthid) {
	String queryString = "select volrmin,volrmax,ratermin,ratermax,comments "
		+ "from mfpdbo.salesdepth_ranges where salesdepthid=?1 order by seqid";
	Query q = em.createNativeQuery(queryString, SalesDepth_Ranges.class);
	q.setParameter(1, salesdepthid);
	List<SalesDepth_Ranges> salesDepth_Ranges = q.getResultList();

	return salesDepth_Ranges;
    }
    public String getEnhancedSalesDepthCompletionStatus(Long salesdepthid, long seasonid)
    {
    			String enhancedSalesDepthCompletionstatus = "N";
    			String queryString = "select mfpproc.FN_ISENHANCEDDOS_COMPLETED(?1, ?2) from dual";
    			Query q = em.createNativeQuery(queryString, String.class);
    			q.setParameter(1, salesdepthid);
    			q.setParameter(2, seasonid);
    			enhancedSalesDepthCompletionstatus = (String) q.getSingleResult();
    			return enhancedSalesDepthCompletionstatus;
    			
    			   	
    }

    public SalesDepth_En_Season getSalesDepthEnhancedSeason(long salesdepthid, long seasonid) {
	String queryString = "SELECT   seasonid, startdate, enddate, (SELECT   COUNT ( * ) FROM   mfpdbo.salesdepth_en_season "
		+ " WHERE   salesdepthid = ?1) totalnumseasons  FROM   mfpdbo.salesdepth_en_season " + " WHERE   salesdepthid = ?2 AND seasonid = ?3";
	Query q = em.createNativeQuery(queryString, SalesDepth_En_Season.class);
	q.setParameter(1, salesdepthid);
	q.setParameter(2, salesdepthid);
	q.setParameter(3, seasonid);
	SalesDepth_En_Season salesDepth_En_Season;
	try {
	    salesDepth_En_Season = (SalesDepth_En_Season) q.getSingleResult();
	} catch (NoResultException e) {
	    salesDepth_En_Season = null;
	}
	return salesDepth_En_Season;
    }

    @SuppressWarnings("unchecked")
    public List<SalesDepth_En_LOS> getSalesDepthEnhancedLOS(long salesdepthid) {
	String queryString = "select losid,roomnightsfrom,roomnightsto from mfpdbo.salesdepth_en_los where salesdepthid=?1 order by losid";
	Query q = em.createNativeQuery(queryString, SalesDepth_En_LOS.class);
	q.setParameter(1, salesdepthid);
	List<SalesDepth_En_LOS> salesDepth_En_LOS = q.getResultList();

	return salesDepth_En_LOS;
    }

    @SuppressWarnings("unchecked")
    public List<SalesDepth_En_Ranges> getSalesDepthEnhancedRanges(long salesdepthid, long seasonid) {
	String queryString = "select volrmin,volrmax,comments, salesdepth_en_ranges_id from mfpdbo.salesdepth_en_ranges where salesdepthid="
		+ " ?1 and seasonid=?2 order by seqid";

	Query q = em.createNativeQuery(queryString, SalesDepth_En_Ranges.class);
	q.setParameter(1, salesdepthid);
	q.setParameter(2, seasonid);
	List<SalesDepth_En_Ranges> salesDepth_En_Ranges = q.getResultList();

	return salesDepth_En_Ranges;
    }

    @SuppressWarnings("unchecked")
    public List<SalesDepth_En_Rates> getSalesDepthEnhancedRates(long salesdepth_en_ranges_id) {
	String queryString = "select ratemin,ratemax,losid from mfpdbo.salesdepth_en_rates  where salesdepth_en_ranges_id=?1 order by losid ";

	Query q = em.createNativeQuery(queryString, SalesDepth_En_Rates.class);
	q.setParameter(1, salesdepth_en_ranges_id);
	List<SalesDepth_En_Rates> salesDepth_En_Rates = q.getResultList();

	return salesDepth_En_Rates;
    }

    public void updateSalesDepth(SalesDepth salesDepth, String switched, User user) {

	String isEnhancedNew = salesDepth.getIsenhanced();
	if (switched.equalsIgnoreCase("Y")) {
	    if (salesDepth.getIsenhanced().equals("Y"))
		isEnhancedNew = "N";
	    else if (salesDepth.getIsenhanced().equals("N"))
		isEnhancedNew = "Y";
	}

	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_dos(?,?,?,?,?,?); end; ");
		try {
		    stmt.setLong(1, salesDepth.getHotelrfpid());
		    stmt.setString(2, salesDepth.getBt_price_strategy());
		    stmt.setString(3, isEnhancedNew);
		    stmt.setString(4, salesDepth.getIsenhanced());
		    stmt.setObject(5, salesDepth.getPrevyear_retailadr(),  Types.NUMERIC);
		    stmt.setObject(6, salesDepth.getAnticipate_inc_retail_pct(), Types.NUMERIC);
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

    public void updateSalesRanges(long hotelrfpid, List<SalesDepth_Ranges> salesdepth_ranges, User user) {
	// update salesdepth_ranges table
	int numValid = 0;
	CallableStatement stmt;

	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin mfpproc.sp_insertupdate_dos_ranges(?,?,?,?,?,?,?); end;");
		try {
		    for (int i = 0; i < salesdepth_ranges.size(); i++) {
			if (!(salesdepth_ranges.get(i).getVolrmin() == null && salesdepth_ranges.get(i).getVolrmax() == null)) {
			    Double rmin = salesdepth_ranges.get(i).getRatermin();
			    if (rmin == null)
				rmin = 0.0;
			    Double rmax = salesdepth_ranges.get(i).getRatermax();
			    if (rmax == null)
				rmax = 0.0;
			    stmt.setLong(1, hotelrfpid);
			    stmt.setLong(2, i + 1);
			    if (salesdepth_ranges.get(i).getVolrmin() == null)
				stmt.setNull(3, Types.NUMERIC);
			    else
				stmt.setLong(3, salesdepth_ranges.get(i).getVolrmin());
			    if (salesdepth_ranges.get(i).getVolrmax() == null)
				stmt.setNull(4, Types.NUMERIC);
			    else
				stmt.setLong(4, salesdepth_ranges.get(i).getVolrmax());
			    stmt.setDouble(5, rmin);
			    stmt.setDouble(6, rmax);
			    stmt.setString(7, salesdepth_ranges.get(i).getComments());
			    stmt.execute();
			    numValid++;
			}
		    }
		} finally {
		    stmt.close();
		}
		stmt = con.prepareCall("DELETE FROM MFPDBO.SALESDEPTH_RANGES"
			+ " WHERE SALESDEPTHID = (select salesdepthid from mfpdbo.salesdepth where hotelrfpid=?) and seqid >? ");
		try {

		    stmt.setLong(1, hotelrfpid);
		    stmt.setLong(2, numValid);
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

    public void updateEnSalesRanges(long hotelrfpid, List<SalesDepth_En_Ranges> salesdepth_en_ranges, User user) {

	int numValid = 0;
	long seasonid = 0;

	CallableStatement stmt, stmt2;

	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin mfpproc.sp_insertupdate_dose_ranges(?,?,?,?,?,?); end;");
		stmt2 = con.prepareCall("begin mfpproc.sp_insertupdate_dose_rates(?,?,?,?,?,?); end;");
		try {
		    for (int i = 0; i < salesdepth_en_ranges.size(); i++) {
			seasonid = salesdepth_en_ranges.get(i).getSeasonid();
			if (!(salesdepth_en_ranges.get(i).getVolrmin() == null || salesdepth_en_ranges.get(i).getVolrmax() == null)) {
			    stmt.setLong(1, hotelrfpid);
			    stmt.setLong(2, i + 1);
			    stmt.setLong(3, salesdepth_en_ranges.get(i).getVolrmin());
			    stmt.setLong(4, salesdepth_en_ranges.get(i).getVolrmax());
			    stmt.setLong(5, seasonid);
			    stmt.setString(6, salesdepth_en_ranges.get(i).getComments());
			    stmt.execute();
			    numValid++;

			    for (int j = 0; j < salesdepth_en_ranges.get(i).getSalesdepth_en_rates().size(); j++) {
				Double rmin = salesdepth_en_ranges.get(i).getSalesdepth_en_rates().get(j).getRatemin();
				if (rmin == null)
				    rmin = 0.0;
				Double rmax = salesdepth_en_ranges.get(i).getSalesdepth_en_rates().get(j).getRatemax();
				if (rmax == null)
				    rmax = 0.0;
				stmt2.setLong(1, hotelrfpid);
				stmt2.setLong(2, i + 1);
				stmt2.setLong(3, salesdepth_en_ranges.get(i).getSalesdepth_en_rates().get(j).getLosid());
				stmt2.setDouble(4, rmin);
				stmt2.setDouble(5, rmax);
				stmt2.setLong(6, seasonid);
				stmt2.execute();
			    }
			}
		    }
		} finally {
		    stmt.close();
		    stmt2.close();
		}
		stmt = con.prepareCall("DELETE FROM MFPDBO.SALESDEPTH_EN_RATES " + "WHERE SALESDEPTH_EN_RANGES_ID IN ("
			+ "SELECT SALESDEPTH_EN_RANGES_ID FROM MFPDBO.SALESDEPTH_EN_RANGES "
			+ "WHERE SALESDEPTHID = (select salesdepthid from mfpdbo.salesdepth where hotelrfpid="
			+ "?) and seasonid=? and seqid > ?) ");
		try {

		    stmt.setLong(1, hotelrfpid);
		    stmt.setLong(2, seasonid);
		    stmt.setLong(3, numValid);
		    stmt.execute();

		} finally {
		    stmt.close();
		}
		stmt = con.prepareCall("DELETE FROM MFPDBO.SALESDEPTH_EN_RANGES"
			+ " WHERE SALESDEPTHID = (select salesdepthid from mfpdbo.salesdepth where hotelrfpid="
			+ "?) and seasonid=? and seqid > ?");
		try {

		    stmt.setLong(1, hotelrfpid);
		    stmt.setLong(2, seasonid);
		    stmt.setLong(3, numValid);
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
