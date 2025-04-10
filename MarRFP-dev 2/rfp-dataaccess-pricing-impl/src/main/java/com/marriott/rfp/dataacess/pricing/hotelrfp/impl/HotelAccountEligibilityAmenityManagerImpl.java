package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountEligibilityAmenityManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRateIncludes;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountEligibilityAmenityManagerImpl implements HotelAccountEligibilityAmenityManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelEligibility> getEligibility(long hotel_accountinfoid) {

		String queryString = "SELECT A.ELIGIBILITYID , A.ELIGIBILITYDESCRIPTION ,  nvl(B.VALUE, 'N') value " + " FROM mfpdbo.ELIGIBILITY_REF A , (select eligibilityid, value  "
				+ " from mfpdbo.accounteligibility where hotel_accountinfoid =?1) b " + " WHERE (B.ELIGIBILITYID (+) = A.ELIGIBILITYID)  AND (A.DISPLAYTYPEID ='A')  order by sequence  ";
		Query q = em.createNativeQuery(queryString, HotelEligibility.class);
		q.setParameter(1, hotel_accountinfoid);
		List<HotelEligibility> hotelEligibilityList = q.getResultList();
		return hotelEligibilityList;
	}

	
	@SuppressWarnings("unchecked")
	public List<HotelAmenities> getAmenities(long hotel_accountinfoid, long hotelrfpid) {

		String queryString = " select f.* FROM (SELECT A.AMENITYID , A.AMENITYDESCRIPTION ,  nvl(b.VALUE, 'N') value, "
				+ "case when nvl(b.value,'N')='N' then 'N' else ( case when a.amenityid IN ('AMM_INTERNET_WIRE') and "
				+ " rewards.WIFIREWARDS_ELIGIBLITY='Y' and rewards.wireless_connect_gstrm_comp='Y' THEN 'Y' else NVL( c.VALUE, 'N' ) end ) end locked, "
				+ "  case when a.amenityid in ('AMM_BUFFBREAK','AMM_CONTBREAK','AMM_FULLBREAK','AMM_INTERNET_HIGH') and "
				+ "( d.breakcheck=1 or ( g.wiredInternetGSTRM = 'N' and a.amenityid = 'AMM_INTERNET_HIGH')) "
				+ " then 'Y' else 'N' end disabled FROM mfpdbo.AMENITIES_REF A "
				+ " , (select amenityid, value from mfpdbo.accountamenities where hotel_accountinfoid =?1) b  , (select amenityid, value from hotelamenities where hotelrfpid =?2) c, "
				+ " (select NVL(edi.wireless_connect_gstrm_comp,'N') wireless_connect_gstrm_comp, NVL(WIFIREWARDS_ELIGIBLITY,'N') WIFIREWARDS_ELIGIBLITY "
				+ " FROM mfpdbo.hotel_accountinfo ha, mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelaffiliation haf, mfpdbo.edie_report_info edi "
				+ " WHERE  hr.hotelrfpid =ha.hotelrfpid AND h.hotelid =hr.hotelid AND h.hotelid =edi.hotelid AND "
				+ " haf.affiliationid = h.affiliationid and ha.hotel_accountinfoid = ?11 and hr.hotelrfpid = ?10) rewards , " 
				+ "  (select count(case when value='Y' then 1 end) breakcheck from mfpdbo.accountrateincludes where hotel_accountinfoid=?3 and rateincludes_id in (1,2,3)) d, "
				+ " (select eri.ETHRNT_RJ45_JACK_GSTRM wiredInternetGSTRM from mfpdbo.edie_report_info eri "
				+ " where hotelid in (select hotelid from mfpdbo.hotelrfp where hotelrfpid=?13)) g "
				+ " WHERE (B.AMENITYID (+) = A.AMENITYID)  AND (A.DISPLAYTYPEID ='A') and c.amenityid(+)=a.amenityid order by sequence) f  " 
				+ " where f.amenityid NOT IN ('AMM_INTERNET_REWARDS')";
		Query q = em.createNativeQuery(queryString, HotelAmenities.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotelrfpid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, hotelrfpid);
		q.setParameter(5, hotelrfpid);
		q.setParameter(6, hotelrfpid);
		q.setParameter(7, hotelrfpid);
		q.setParameter(8, hotelrfpid);
		q.setParameter(9, hotelrfpid);
		q.setParameter(10, hotelrfpid);
		q.setParameter(11, hotel_accountinfoid);
		q.setParameter(12, hotel_accountinfoid);
		q.setParameter(13, hotelrfpid);
		List<HotelAmenities> hotelAmenitiesList = q.getResultList();
		return hotelAmenitiesList;
	}
	public void updateEligibilityAmenity(long haccid, List<HotelEligibility> eligibility, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_accounteli(?, ?,?); end;");
				try {
					for (int i = 0; i < eligibility.size(); i++) {
						if (eligibility.get(i) != null) {
							stmt.setLong(1, haccid);
							stmt.setString(2, eligibility.get(i).getEligibilityid());
							stmt.setString(3, eligibility.get(i).getValue());
							stmt.execute();
						}
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

	public void updateEligibility(long haccid, List<HotelEligibility> eligibility, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_accounteli(?, ?,?); end;");
				try {
					for (int i = 1; i < eligibility.size(); i++) {
						if (eligibility.get(i) != null) {
							stmt.setLong(1, haccid);
							stmt.setString(2, eligibility.get(i).getEligibilityid());
							stmt.setString(3, eligibility.get(i).getValue());
							stmt.execute();
						}
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

	public void updateAmenity(long haccid, List<HotelAmenities> amenities, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountamenity_hpp(?, ?,?); end;");
				try {
					for (int i = 0; i < amenities.size(); i++) {
						if (amenities.get(i) != null) {
							stmt.setLong(1, haccid);
							stmt.setString(2, amenities.get(i).getAmenityid());
							stmt.setString(3, amenities.get(i).getValue());
							stmt.execute();
						}
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

	@SuppressWarnings("unchecked")
	public List<HotelRateIncludes> getRateIncludes(long hotel_accountinfoid) {

		String queryString = "SELECT rr.rateincludes_id, rr.rateincludesdescription, NVL( ari.VALUE, 'N' ) value, "
				+ " CASE WHEN breakcheck > 0 or  (SELECT  CASE WHEN VALUE = 'Y' THEN 1 END  FROM mfpdbo.accountrateincludes "
				+ " WHERE hotel_accountinfoid = ?1 AND rateincludes_id IN (1,2,3) and value='Y'  and rateincludes_id<>ari.rateincludes_id and rownum=1)>0 THEN 'Y' ELSE 'N' END disabled "
				+ " FROM (SELECT * FROM mfpdbo.accountrateincludes WHERE hotel_accountinfoid = ?2) ari, "
				+ "  (select count(case when value='Y' then 1 end) breakcheck from mfpdbo.accountamenities where hotel_accountinfoid=?3 "
				+ "  and amenityid in ('AMM_BUFFBREAK','AMM_CONTBREAK','AMM_FULLBREAK')) am, mfpdbo.rateincludes_ref rr "
				+ " WHERE rr.rateincludes_id = ari.rateincludes_id(+) AND rr.displaytypeid = 'I'  ORDER BY sequence ";
		Query q = em.createNativeQuery(queryString, HotelRateIncludes.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotel_accountinfoid);
		q.setParameter(3, hotel_accountinfoid);
		List<HotelRateIncludes> hotelAmenitiesList = q.getResultList();
		return hotelAmenitiesList;
	}

	public boolean updateRateIncludes(long haccid, List<HotelRateIncludes> rateincludes, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			boolean updated = false;
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrateincludes_hpp(?,?,?,?); end;");
				try {
					for (int i = 0; i < rateincludes.size(); i++) {
						if (rateincludes.get(i) != null) {
							stmt.setLong(1, haccid);
							stmt.setLong(2, rateincludes.get(i).getRateincludes_id());
							stmt.setString(3, rateincludes.get(i).getValue());
							 stmt.registerOutParameter(4, Types.INTEGER);
							stmt.executeUpdate();
							if(stmt.getInt(4) == 1) {
								updated = true;
							}
						}
					}

				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
			return updated;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		}
		
	}
}
