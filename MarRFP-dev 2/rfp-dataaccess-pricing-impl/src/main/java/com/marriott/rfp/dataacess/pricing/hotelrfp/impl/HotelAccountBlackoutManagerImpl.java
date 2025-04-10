package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountBlackoutManager;
import com.marriott.rfp.object.pricing.hotelrfp.AccountBlackoutGroup;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountname;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.user.User;

import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import oracle.jdbc.OracleConnection;
/**
 * Session Bean implementation class HotelRFPBlackoutManager
 */

@Service
public class HotelAccountBlackoutManagerImpl implements HotelAccountBlackoutManager {
	private static final Logger log = LoggerFactory.getLogger(HotelAccountBlackoutManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelBlackoutDate> getBlackouts(long hotel_accountinfoid) {
		String queryString = "SELECT blackoutid , startdate , enddate, blackname  FROM mfpdbo.accountblackoutdates  where hotel_accountinfoid = ?1 order by blackoutid  ";

		Query q = em.createNativeQuery(queryString, HotelBlackoutDate.class);
		q.setParameter(1, hotel_accountinfoid);
		List<HotelBlackoutDate> hotelBlackoutDate = q.getResultList();
		return hotelBlackoutDate;
	}

	public String getWaiveBlackouts(long hotel_accountinfoid) {
		String queryString = "SELECT nvl(waiveblackouts,'N') waiveblackouts  FROM mfpdbo.hotel_accountinfo  where hotel_accountinfoid = ?1";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotel_accountinfoid);
		String waiveblackouts;
		try {
			waiveblackouts = (String) q.getSingleResult();
		} catch (NoResultException ex) {
			waiveblackouts = "N";
		}
		return waiveblackouts;
	}

	public void updateAccountBlackouts(long haccid, String waiveblackouts, Map<Long, HotelBlackoutDate> hotelBlackoutDate, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			CallableStatement cstmt;
			try {
				cstmt = con.prepareCall("begin mfpproc.sp_insertupdateacctblackout_a(?,?); end; ");

				try {

					cstmt.setLong(1, haccid);
					cstmt.setString(2, waiveblackouts);
					cstmt.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
				if ((waiveblackouts == null || waiveblackouts.equals("N")) && hotelBlackoutDate != null && hotelBlackoutDate.size() > 0) {
					try {
						cstmt = con.prepareCall("begin mfpproc.sp_acctblkouts_a_hpp(?,?,?,?,?,?); end; ");
						try {
							for (Long key : hotelBlackoutDate.keySet()) {
								HotelBlackoutDate rfpBlackouts = (HotelBlackoutDate) hotelBlackoutDate.get(key);
								cstmt.setLong(1, haccid);
								cstmt.setLong(2, rfpBlackouts.getBlackoutid());
								cstmt.setString(3, rfpBlackouts.getShortStartdate());
								cstmt.setString(4, rfpBlackouts.getShortEnddate());
								cstmt.setString(5, rfpBlackouts.getBlackname());
								cstmt.setString(6, user.getShortRole());
								cstmt.execute();
							}
						} finally {
							cstmt.close();
						}

						/* update the blackout id's to be in order */
						cstmt = con.prepareCall("begin mfpproc.sp_updateaccountblackoutid(?); end; ");

						cstmt.setLong(1, haccid);
						cstmt.execute();
					} catch (Exception e) {
						log.error(e.getMessage(),e);
					} finally {
						cstmt.close();
					}
					audit.deleteAuditUser(con);
				}
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public List<AccountBlackoutGroup> getRolledupBlackouts(Long hotelid, Long period, String type, User user) {
		List<AccountBlackoutGroup> bd = new Vector<AccountBlackoutGroup>();
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				String sql = "SELECT first_bd_startdate, first_bd_enddate, first_bd_blackname, second_bd_startdate, second_bd_enddate, second_bd_blackname, third_bd_startdate, "
						+ " third_bd_enddate, third_bd_blackname, fourth_bd_startdate, fourth_bd_enddate, fourth_bd_blackname, fifth_bd_startdate, fifth_bd_enddate, "
						+ " fifth_bd_blackname, sixth_bd_startdate, sixth_bd_enddate, sixth_bd_blackname, seventh_bd_startdate, seventh_bd_enddate, seventh_bd_blackname, "
						+ " eighth_bd_startdate, eighth_bd_enddate, eighth_bd_blackname, nineth_bd_startdate, nineth_bd_enddate, nineth_bd_blackname, tenth_bd_startdate, "
						+ " tenth_bd_enddate, tenth_bd_blackname,  contractstart,  contractend, offcycle, CAST(COLLECT(hotel_accountinfoid) AS mfpproc.obj_hotelaccountinfoids) hids "
						+ " FROM (WITH pivot_data AS (SELECT ha.hotel_accountinfoid, ab.startdate, ab.enddate, ab.blackoutid, ab.blackname,mfpproc.fn_getcontractstart( ha.accountrecid ) contractstart, "
						+ " mfpproc.fn_getcontractend( ha.accountrecid ) contractend, a.offcycle "
						+ " FROM mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.accountblackoutdates ab,  mfpdbo.account a  "
						+ " WHERE hr.hotelrfpid = ha.hotelrfpid AND ha.hotel_accountinfoid = ab.hotel_accountinfoid (+)  and ha.accountrecid=a.accountrecid AND hr.hotelid = " + hotelid
						+ " AND hr.period = " + period + "  and nvl(ha.waiveblackouts,'N')='N' ";

				if (!user.getIsPASAdmin() && !user.getIsAnySalesUser())
					sql += " AND (A.HOTEL_DISPLAY ='Y')";
				if (user.getIsAnySalesUser())
					sql += "  and mfpproc.fn_issalesaccount('" + user.getEid() + "', a.accountrecid)='Y' ";

				sql += "and (";

				if (type.equals("V") || type.equals("A"))
					sql += " ha.ratetype_selected not in  (0,1,2,3,4,5,6,7,8,18,17) ";
				if (type.equals("V"))
					sql += " AND nvl(mfpproc.FN_GETHOTELACCOUNTSELECTED( hr.hotelrfpid, ha.accountrecid ),'N') <> 'Y' ";
				if (type.equals("A"))
					sql += " or ";
				if (type.equals("A") || type.equals("P"))
					sql += " mfpproc.FN_GETHOTELACCOUNTSELECTED( hr.hotelrfpid, ha.accountrecid ) = 'Y' ";

				sql += "))  SELECT *  FROM pivot_data PIVOT (MAX(startdate) startdate,  MAX(enddate) enddate,  MAX(blackname) blackname  FOR blackoutid  IN  (1 first_bd, "
						+ " 2 second_bd,  3 third_bd,  4 fourth_bd,  5 fifth_bd,  6 sixth_bd,  7 seventh_bd,  8 eighth_bd,  9 nineth_bd,  10 tenth_bd))) "
						+ " GROUP BY first_bd_startdate, first_bd_enddate, first_bd_blackname, second_bd_startdate, second_bd_enddate, second_bd_blackname, third_bd_startdate, "
						+ " third_bd_enddate, third_bd_blackname, fourth_bd_startdate, fourth_bd_enddate, fourth_bd_blackname, fifth_bd_startdate, fifth_bd_enddate, "
						+ " fifth_bd_blackname, sixth_bd_startdate, sixth_bd_enddate, sixth_bd_blackname, seventh_bd_startdate, seventh_bd_enddate, seventh_bd_blackname, "
						+ " eighth_bd_startdate, eighth_bd_enddate, eighth_bd_blackname, nineth_bd_startdate, nineth_bd_enddate, nineth_bd_blackname, tenth_bd_startdate, "
						+ " tenth_bd_enddate, tenth_bd_blackname, contractstart,contractend,offcycle  ORDER BY offcycle, to_char(contractstart,'yy/mm/dd'), to_char(contractend,'yy/mm/dd'), first_bd_startdate, first_bd_enddate";
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					AccountBlackoutGroup model = new AccountBlackoutGroup();
					model.setFirst_bd_startdate(rs.getDate(1));
					model.setFirst_bd_enddate(rs.getDate(2));
					if (!(rs.getString(3) == null))
						model.setFirst_bd_blackname(rs.getString(3));
					model.setSecond_bd_startdate(rs.getDate(4));
					model.setSecond_bd_enddate(rs.getDate(5));
					if (!(rs.getString(6) == null))
						model.setSecond_bd_blackname(rs.getString(6));
					model.setThird_bd_startdate(rs.getDate(7));
					model.setThird_bd_enddate(rs.getDate(8));
					if (!(rs.getString(9) == null))
						model.setThird_bd_blackname(rs.getString(9));
					model.setFourth_bd_startdate(rs.getDate(10));
					model.setFourth_bd_enddate(rs.getDate(11));
					if (!(rs.getString(12) == null))
						model.setFourth_bd_blackname(rs.getString(12));
					model.setFifth_bd_startdate(rs.getDate(13));
					model.setFifth_bd_enddate(rs.getDate(14));
					if (!(rs.getString(15) == null))
						model.setFifth_bd_blackname(rs.getString(15));
					model.setSixth_bd_startdate(rs.getDate(16));
					model.setSixth_bd_enddate(rs.getDate(17));
					if (!(rs.getString(18) == null))
						model.setSixth_bd_blackname(rs.getString(18));
					model.setSeventh_bd_startdate(rs.getDate(19));
					model.setSeventh_bd_enddate(rs.getDate(20));
					if (!(rs.getString(21) == null))
						model.setSeventh_bd_blackname(rs.getString(21));
					model.setEighth_bd_startdate(rs.getDate(22));
					model.setEighth_bd_enddate(rs.getDate(23));
					if (!(rs.getString(24) == null))
						model.setEighth_bd_blackname(rs.getString(24));
					model.setNineth_bd_startdate(rs.getDate(25));
					model.setNineth_bd_enddate(rs.getDate(26));
					if (!(rs.getString(27) == null))
						model.setNineth_bd_blackname(rs.getString(27));
					model.setTenth_bd_startdate(rs.getDate(28));
					model.setTenth_bd_enddate(rs.getDate(29));
					if (!(rs.getString(30) == null))
						model.setTenth_bd_blackname(rs.getString(30));
					model.setContractstart(rs.getDate(31));
					model.setContractend(rs.getDate(32));
					model.setOffcycle(rs.getString(33));
					model.setHotel_accountinfoarray((BigDecimal[]) rs.getArray(34).getArray());
					model.convertToBlackoutList();
					bd.add(model);
				}

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
		return bd;
	}

	public List<HotelAccountname> getBlackoutAccounts(String hotel_accountinfoidlist) {
		String queryString = "SELECT hotel_accountinfoid, accountname, mfpproc.fn_ishotelaccountlocked (ha.hotel_accountinfoid) islocked  FROM mfpdbo.hotel_accountinfo ha, mfpdbo.account a  where ha.accountrecid=a.accountrecid and ha.hotel_accountinfoid in ("
				+ hotel_accountinfoidlist + " ) order by accountname  ";

		Query q = em.createNativeQuery(queryString, HotelAccountname.class);
		@SuppressWarnings("unchecked")
		List<HotelAccountname> hotelAccountname = q.getResultList();
		return hotelAccountname;
	}

	public void updateRolledupBlackouts(List<HotelBlackoutDate> blackoutdatelist, BigDecimal[] hotel_accountinfoarray, User user) {
		ArrayDescriptor hotelaccountArray;
		try {
			/*InitialContext initialContext = new InitialContext();

			DataSource dataSource = (DataSource) initialContext.lookup("jdbc/MarRFP");
			Connection connection = dataSource.getConnection();
			Connection con = WSCallHelper.getNativeConnection(((WSJdbcConnection) connection));
			*/
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			Connection conn = con.unwrap(OracleConnection.class); /*Line added tomcat */			
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {

				hotelaccountArray = ArrayDescriptor.createDescriptor("MFPPROC.OBJ_HOTELACCOUNTINFOIDS", conn);/*replaced con with conn - Tomcat*/
				ARRAY thehotelaccountinfoArray = new ARRAY(hotelaccountArray, conn, hotel_accountinfoarray); /*replaced con with conn - Tomcat*/

				CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_updatemultipleaccountblk(?,?,?,?,?); end; ");
				try {
					for (HotelBlackoutDate hbd : blackoutdatelist) {
						cstmt.setLong(1, hbd.getBlackoutid());
						cstmt.setString(2, hbd.getShortStartdate());
						cstmt.setString(3, hbd.getShortEnddate());
						cstmt.setString(4, hbd.getBlackname());
						cstmt.setObject(5, thehotelaccountinfoArray);
						cstmt.execute();
					}
				} finally {

					cstmt.close();
				}

				cstmt = con.prepareCall("begin  mfpproc.sp_deletemultipleaccountblk(?,?); end;");
				try {
					cstmt.setLong(1, blackoutdatelist.size());
					cstmt.setObject(2, thehotelaccountinfoArray);
					cstmt.execute();
				} finally {
					cstmt.close();
				}
				audit.deleteAuditUser(con);
			} catch (SQLException e) {
				log.error(e.getMessage(),e);
			} finally {
//				connection.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}

}
