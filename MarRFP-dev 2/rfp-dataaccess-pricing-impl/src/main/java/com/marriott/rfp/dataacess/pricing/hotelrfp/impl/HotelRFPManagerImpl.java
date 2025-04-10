package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPFinish;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRoomPool;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPoolDetails;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPoolsDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandards;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelRFPManagerImpl implements HotelRFPManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public Long getHotelidFromHotelrfpid(Long hotelrfpid) {
		Long hotelid;
		String querystring = "select hotelid from mfpdbo.hotelrfp where hotelrfpid=?1";
		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelrfpid);
		try {
			hotelid = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			hotelid = null;
		}

		return hotelid;
	}

	public Long getHotelRFPID(String marshacode, long period, String loginName) {
		Long rfpid = new Long(0);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_initialize_rfp_rpe(?, ?, ?); end; ");
				try {
					stmt.setString(1, marshacode);
					stmt.setLong(2, period);
					stmt.setString(3, loginName);
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

		String queryString = "select hotelrfpid from mfpdbo.hotel h, mfpdbo.hotelrfp hr where h.hotelid=hr.hotelid and h.marshacode=?1 and hr.period=?2";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, marshacode);
		q.setParameter(2, period);
		rfpid = (Long) q.getSingleResult();
		return rfpid;
	}

	public HotelRFPStandards getHotelRFPStandards(long hotelrfpid, String loginName) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatepricingcurr_and_dist(?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
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

		String queryString = "SELECT   decode(NVL (distanceunit, ''), 'MI', 'Miles', 'KM', 'Kilometers', nvl(distanceunit, '')) distanceunit, NVL (commissionrate, 10) commissionrate,  NVL (c.aggregate_tax_inc, 'N') aggregate_tax_inc, "
				+ "          NVL (c.service_fee_type_included, 'N') service_fee_type_included, NVL (netoutrates, 'N') netoutrates, NVL (a.currencycode, '') currencycode, "
				+ "          NVL (delete_old_rateprogs, '') delete_old_rateprogs,   b.currencyname, "
				+ "          DECODE (a.currencycode, '', 'N', DECODE (commissionrate, '', 'N', DECODE (svcfeeincluded, '', 'N', DECODE (taxincluded, '', 'N', 'Y')))) isComplete, "
				+ "         mfpproc.fn_requirestdroompool_rpe (a.hotelid, 1) canhavefirstroompool, mfpproc.fn_requirestdroompool_rpe (a.hotelid, 2) canhavesecondroompool, mfpproc.fn_requirestdroompool_rpe (a.hotelid, 3) canhavethirdroompool, a.exempt_gpp "
				+ "  FROM   mfpdbo.hotelrfp a, mfpdbo.currency_ref b, mfpdbo.edie_report_info c  WHERE   (a.currencycode = b.currencycode(+)) AND (a.hotelid = c.hotelid(+)) AND hotelrfpid = ?1";
		Query q = em.createNativeQuery(queryString, HotelRFPStandards.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPStandards hotelRFPStandards = (HotelRFPStandards) q.getSingleResult();
		return hotelRFPStandards;
	}

	@SuppressWarnings("unchecked")
	public List<HotelRFPStandardRmPoolsDO> getHotelRFPStandardsRmPools(long hotelrfpid) {

	
		String queryString = "SELECT rcseq.roomclassseq, hrt.bedtypeid, hrp.roomtypeid, pb.bedtype, pr.roomtype, hp.actualnumrooms," + 
				"    rpseq.roompoolseq, hrp.roompool, mfpproc.fn_getparentrpgm_rpe(hr.hotelrfpid, rcseq.roomclassseq, rpseq.roompoolseq) rpgm," + 
				"    mfpproc.fn_getrestrictionrpgm_rpe(hr.hotelrfpid, rcseq.roomclassseq, rpseq.roompoolseq) restrictionrpgm " + 
				"    FROM" + 
				"    mfpdbo.hotelrfp             hr" + 
				"    JOIN (" + 
				"        SELECT" + 
				"            level roomclassseq" + 
				"        FROM" + 
				"            dual" + 
				"        CONNECT BY" + 
				"            level <= (" + 
				"                SELECT" + 
				"                    constant_value" + 
				"                FROM" + 
				"                    mfpdbo.rfp_constants" + 
				"                WHERE" + 
				"                    constant_name = 'NUM_ROOMPOOLS'" + 
				"            )" + 
				"    ) rcseq ON 1 = 1" + 
				"    JOIN (" + 
				"        SELECT" + 
				"            level roompoolseq" + 
				"        FROM" + 
				"            dual" + 
				"        CONNECT BY" + 
				"            level <= (" + 
				"                SELECT" + 
				"                    constant_value" + 
				"                FROM" + 
				"                    mfpdbo.rfp_constants" + 
				"                WHERE" + 
				"                    constant_name = 'NUM_RMPOOLS'" + 
				"            )" + 
				"    ) rpseq ON 1 = 1" + 
				"    LEFT JOIN mfpdbo.hotelrfp_roomtypes   hrt ON hr.hotelrfpid = hrt.hotelrfpid" + 
				"                                               AND hrt.seq = rcseq.roomclassseq" + 
				"    LEFT JOIN mfpdbo.hotelrfp_roompools   hrp ON hr.hotelrfpid = hrp.hotelrfpid" + 
				"                                               AND hrt.seq = hrp.roomclassseq" + 
				"                                               AND hrp.roompoolseq = rpseq.roompoolseq" + 
				"    LEFT JOIN mfpdbo.hotel_roompool       hp ON hr.hotelid = hp.hotelid" + 
				"                                          AND hp.roompool = hrp.roompool" + 
				"    LEFT JOIN mfpdbo.promo_bedtype        pb ON hrt.bedtypeid = pb.bedtypeid" + 
				"    LEFT JOIN mfpdbo.promo_roomtype       pr ON hrp.roomtypeid = pr.promo_roomtypeid" + 
				"    WHERE" + 
			    "    hr.hotelrfpid = ?1" +
	            "    order by rcseq.roomclassseq, rpseq.roompoolseq";
		Query q = em.createNativeQuery(queryString, HotelRFPStandardRmPoolsDO.class);
		q.setParameter(1, hotelrfpid);
	
		List<HotelRFPStandardRmPoolsDO> hotelRFPStandardRmPoolsBO = q.getResultList();
		return hotelRFPStandardRmPoolsBO;
	}

	@SuppressWarnings("unchecked")
	public List<HotelRFPRmPools> getHotelRFPRmPools(long hotelrfpid) {

		String queryString = "SELECT c.ROOMCLASSSEQ roomClassSeq,c.ROOMPOOLSEQ roomPoolSeq,c.roompool ,b.required required  FROM " + 
				"(SELECT brr.roompoolid,brr.required  FROM mfpdbo.hotelrfp hr, mfpdbo.hotel h, mfpdbo.brand_roompools_ref brr     WHERE " + 
				" hr.hotelid = h.hotelid AND h.affiliationid = brr.affiliationid(+) and  hr.hotelrfpid=?1) b,(SELECT LEVEL seq  FROM DUAL " + 
				" CONNECT BY LEVEL <= (select constant_value from mfpdbo.rfp_constants where constant_name='NUM_ROOMPOOLS')) a  , " + 
				"  (SELECT a.ROOMCLASSSEQ,a.ROOMPOOLSEQ,a.roompool FROM mfpdbo.hotelrfp_roompools a WHERE a.hotelrfpid = ?2) c " + 
				"WHERE a.seq = c.ROOMCLASSSEQ(+)  AND a.seq = b.roompoolid(+)  ORDER BY roomClassSeq, roomPoolSeq";

		Query q = em.createNativeQuery(queryString, HotelRFPRoomPool.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotelrfpid);
		List<HotelRFPRmPools> hotelRFPStandardRmPools = getRFPRoomPools(q.getResultList());
		return hotelRFPStandardRmPools;
	}

	public void updateHotelRFPStandards(long hotelrfpid, HotelRFPStandards hotelRFPStandards, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_updatestandards_rpe(?,?,?,?,?,?,?,?); end;");
				try {
					String currencycode = hotelRFPStandards.getCurrencycode();
					if (!user.getIsPASAdmin())
						currencycode = null;
					stmt.setLong(1, hotelrfpid);
					stmt.setString(2, currencycode);
					stmt.setObject(3, hotelRFPStandards.getCommissionrate(), Types.NUMERIC);
					stmt.setString(4, hotelRFPStandards.getNetoutrates());
					stmt.setString(5, hotelRFPStandards.getDelete_old_rateprogs());
					stmt.setString(6, hotelRFPStandards.getStandardrmdesc());
					stmt.setString(7, user.getShortRole());
					stmt.setString(8, hotelRFPStandards.getExempt_gpp());
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

	public void updateRFPStandardRmPools(long hotelrfpid, List<HotelRFPStandardRmPools> hotelRFPStandardRmPools,
			User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con
						.prepareCall("begin  mfpproc.sp_updatestdroomtype_rpe(?,?,?,?,?,?,?); end;");
				try {
					for (int roomClassSeq = 0; roomClassSeq < hotelRFPStandardRmPools.size(); roomClassSeq++) {
						HotelRFPStandardRmPools srt = (HotelRFPStandardRmPools) hotelRFPStandardRmPools.get(roomClassSeq);
						List<HotelRFPStandardRmPoolDetails> rmpdList = srt.getRoomPools();
						if (rmpdList != null && rmpdList.size() > 0) {
							int roomPoolSequence = 1;
							for (HotelRFPStandardRmPoolDetails rmpd : rmpdList) {
								
									stmt.setLong(1, hotelrfpid);
									stmt.setLong(2, (roomClassSeq + 1));
									stmt.setLong(3, 0);
									stmt.setLong(4, rmpd.getRoomtypeid());
									stmt.setLong(5, roomPoolSequence);
									stmt.setString(6, rmpd.getRoomPool());
									stmt.setString(7, user.getShortRole());
									stmt.execute();
									roomPoolSequence++;
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
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	public List<HotelRFPFinish> getFinishStatus(long hotelrfpid, long pricingperiodid, User user) {

		String queryString = "select  DECODE (accountname, '',  screenname, accountname)  screenname, statusid "
				+ " from (SELECT distinct a.screenname,  b.statusid , a.parentid, a.screensequence, f.accountname "
				+ " FROM  mfpdbo.RFPENTRYSTATUS B   ,(select * from mfpdbo.ACCOUNT a where hotel_display = 'Y'  ";
		if (user.getIsAnySalesUser()) {
			queryString += " and mfpproc.fn_issalesaccount('" + user.getEid() + "', a.accountrecid)='Y' ";
		}

		queryString += "	) F  ,mfpdbo.PRICINGSCREENS A   , mfpdbo.PRICINGPERIOD_accounts C  WHERE (A.SCREENID = B.SCREENID)  "
				+ "  AND (f.accountrecid = c.accountrecid(+))  AND (F.ACCOUNTRECID (+) = B.ACCOUNTRECID)  ";
		if (pricingperiodid != 0)
			queryString += "  and (c.pricingperiodid=" + Long.toString(pricingperiodid) + " or c.pricingperiodid is null)  ";

		queryString += "  and b.hotelrfpid = ?1  and action is not null   and a.screenid not in (13, 18, 16, 25, 26, 21,22, 27,28, 10,5,14,17,19)   and b.statusid <> 'C'  "
				+ "  and (a.screenid <> 15 or (a.screenid=15 and f.accountrecid is not null  AND (b.statusid = 'R' OR mfpproc.fn_gethotelaccountselected (?2, b.accountrecid) = 'Y'))) ) "
				+ "  ORDER BY  statusid,    decode(PARENTID,24,2,23,3, parentid) ASC   , SCREENSEQUENCE ASC   , accountname ASC  ";
		Query q = em.createNativeQuery(queryString, HotelRFPFinish.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotelrfpid);
		List<HotelRFPFinish> hotelRFPFinish = q.getResultList();
		return hotelRFPFinish;

	}

	public HotelRFPGroupsAndMeetings getHotelRFPGroupMeeting(long hotelrfpid) {
		String queryString = "SELECT A.GRPSMTGRESPOND, A.DISCFB, A.DISCAV, A.COMPROOMS, A.COMPPARKING, A.DIRECTBILL,   A.PAYTERMS, A.MINSPEND, A.MINAMOUNT, A.MAXSPEND, A.MAXAMOUNT, A.UPFRONTDEP,"
				+ "A.CORPORATE_MTNGCARD, A.MTNGCARDFUNDS, A.CARDMAX, A.CARDMAXAMOUNT, B.CURRENCYCODE, B.CURRENCYNAME, A.meetingrmhsiafee from  mfpdbo.hotelrfp A, "
				+ "(select CURRENCYCODE, CURRENCYNAME from mfpdbo.currency_ref) B where (A.currencycode = B.CURRENCYCODE(+)) and A.hotelrfpid =?1";

		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotelrfpid);
		HotelRFPGroupsAndMeetings hotelRFPGroupsAndMeetings = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return hotelRFPGroupsAndMeetings;
	}
	
	public HotelRFPGroupsAndMeetings getHotelRFPGMRespond(long hotelrfpid){

		String queryString = "SELECT GRPSMTGRESPOND,tabgrpgmsflg, tabprcgmsflg, tabpaygmsflg, meetingdaymeetingpckg FROM MFPDBO.HOTELRFP a, mfpdbo.edie_report_info b " 
				           + " WHERE a.hotelid = b.hotelid AND a.hotelrfpid = ?1 ";

		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPGroupsAndMeetings mtggroupresponse = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return mtggroupresponse;
	}
	
	public void updateHotelRFPGMRespond(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_update_hotelgmrespond(?,?,?,?,?); end; ");
				try {

					stmt.setLong(1, hotelrfpid);
					stmt.setString(2, rfpHotel.getGrpsmtgrespond());
					stmt.setString(3, rfpHotel.getTabgrpgmsflg());
					stmt.setString(4, rfpHotel.getTabprcgmsflg());
					stmt.setString(5, rfpHotel.getTabpaygmsflg());
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
	
	
	public HotelRFPGroupsAndMeetings getHotelRFPSIHMtgPricing(long hotelrfpid) {
		String queryString = " SELECT DECODE(b.meetingdaymeetingpckg,'Y', 'Yes','N','No') meetingdaymeetingpckg, b.fulldaymtgincl, b.halfdaymtgincl, b.taxdaymtgpkgs, "
			+ " DECODE(b.taxdaymtgqouteas,'P','Percent','F','Currency') taxdaymtgqouteas, DECODE(b.taxdaymtginclexcl,'Y','Included','N','Excluded') taxdaymtginclexcl, " 
			+ " b.banqsvcamt, decode(b.banqsvcqtdas,'P','Percent','F','Currency') banqsvcqtdas,  DECODE(b.banqsvcchgtax,'Y', 'Yes','N','No') banqsvcchgtax, "
			+ " DECODE(b.banqsvcinclexcl,'Y','Included','N','Excluded') banqsvcinclexcl, " 
			+ " (SELECT typedesc FROM mfpdbo.daymeetingpkg_ref  WHERE typeid = b.typedaymtgpkgs) typedaymtgpkgs "
			+ " FROM mfpdbo.edie_report_info b " 
			+ " WHERE hotelid IN (select hotelid from mfpdbo.hotelrfp where hotelrfpid = ?1 ) ";

		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPGroupsAndMeetings HotelRFPSIHMtgPricing = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return HotelRFPSIHMtgPricing;

	}
	
	public HotelRFPGroupsAndMeetings getHotelRFPMtgPricing(long hotelrfpid) {
		String queryString = " SELECT fulldayratefifty, halfdayratefifty, fulldayratehund, halfdayratehund, costbrkten, "
			+ " costbrktwnfive, compparking, meetingrmhsiafee, intfeeincldaymtg, lcdcostincldaymtg, scncostincldaymtg, discav, tabprcgmsflg "
			+ " FROM mfpdbo.hotelrfp a WHERE hotelrfpid = ?1 ";
		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPGroupsAndMeetings HotelRFPMtgPricing = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return HotelRFPMtgPricing;

	}
	
	public void updateHotelRFPMtgPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_update_mtgpricing(?,?,?,?,?,?,?,?,?,?,?,?,?,?); end; ");
				try {
					Double fulldayratefifty1 = null;
					if ((rfpHotel.getFulldayratefifty() != null) && (!rfpHotel.getFulldayratefifty().equals(""))) {
						fulldayratefifty1 = new Double(rfpHotel.getFulldayratefifty());
					}
					Double halfdayratefifty1 = null;
					if ((rfpHotel.getHalfdayratefifty() != null) && (!rfpHotel.getHalfdayratefifty().equals(""))) {
						halfdayratefifty1 = new Double(rfpHotel.getHalfdayratefifty());
					}
					Double fulldayratehund1 = null;
					if ((rfpHotel.getFulldayratehund() != null) && (!rfpHotel.getFulldayratehund().equals(""))) {
						fulldayratehund1 = new Double(rfpHotel.getFulldayratehund());
					}
					Double halfdayratehund1 = null;
					if ((rfpHotel.getHalfdayratehund() != null) && (!rfpHotel.getHalfdayratehund().equals(""))) {
						halfdayratehund1 = new Double(rfpHotel.getHalfdayratehund());
					}
					Double costbrkten1 = null;
					if ((rfpHotel.getCostbrkten() != null) && (!rfpHotel.getCostbrkten().equals(""))) {
						costbrkten1 = new Double(rfpHotel.getCostbrkten());
					}
					Double costbrktwnfive1 = null;
					if ((rfpHotel.getCostbrktwnfive() != null) && (!rfpHotel.getCostbrktwnfive().equals(""))) {
						costbrktwnfive1  = new Double(rfpHotel.getCostbrktwnfive());
					}
					Double meetingrmhsiafee1 = null;
					if ((rfpHotel.getMeetingrmhsiafee() != null && !(rfpHotel.getMeetingrmhsiafee() ).equals(""))) {
						meetingrmhsiafee1 = new Double(rfpHotel.getMeetingrmhsiafee() );
					}

					stmt.setLong(1, hotelrfpid);
					stmt.setObject(2, fulldayratefifty1, Types.NUMERIC);
					stmt.setObject(3, halfdayratefifty1, Types.NUMERIC);
					stmt.setObject(4, fulldayratehund1, Types.NUMERIC);
					stmt.setObject(5, halfdayratehund1, Types.NUMERIC);
					stmt.setObject(6, costbrkten1, Types.NUMERIC);
					stmt.setObject(7, costbrktwnfive1, Types.NUMERIC);
					stmt.setString(8, rfpHotel.getCompparking());
					stmt.setObject(9, meetingrmhsiafee1,Types.NUMERIC);
					stmt.setString(10, rfpHotel.getIntfeeincldaymtg());
					stmt.setString(11, rfpHotel.getLcdcostincldaymtg());
					stmt.setString(12, rfpHotel.getScncostincldaymtg());
					stmt.setString(13, rfpHotel.getDiscav());
					stmt.setString(14, rfpHotel.getTabprcgmsflg());
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
	
	public void updateHotelRFPGroupPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_update_grppricing(?,?,?,?,?,?,?); end; ");
				try {
					Long compRoom1 = null;
					if ((rfpHotel.getComprooms() != null) && (!rfpHotel.getComprooms().equals(""))) {
						compRoom1 = new Long(rfpHotel.getComprooms());
					}
					Double negratefifty1 = null;
					if (rfpHotel.getNegratefifty() != null && !(rfpHotel.getNegratefifty().equals(""))) {
						negratefifty1 = new Double(rfpHotel.getNegratefifty());
					}
					Double negratehund1 = null;
					if (rfpHotel.getNegratehund() != null && !(rfpHotel.getNegratehund().equals(""))) {
						negratehund1 = new Double(rfpHotel.getNegratehund());
					}

					stmt.setLong(1, hotelrfpid);
					stmt.setObject(2, negratefifty1, Types.NUMERIC);
					stmt.setObject(3, negratehund1, Types.NUMERIC);
					stmt.setString(4, rfpHotel.getNegtranshighrate());
					stmt.setObject(5, compRoom1, Types.NUMERIC);
					stmt.setString(6, rfpHotel.getDiscfb());
					stmt.setString(7, rfpHotel.getTabgrpgmsflg());
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
	
	public HotelRFPGroupsAndMeetings getHotelRFPGroupPricing(long hotelrfpid) {
		String queryString = "SELECT GRPSMTGRESPOND, NEGRATEFIFTY, NEGRATEHUND, NEGTRANSHIGHRATE, COMPROOMS, DISCFB, tabgrpgmsflg FROM MFPDBO.HOTELRFP "
				  + " WHERE HOTELRFPID = ?1 ";

		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPGroupsAndMeetings HotelRFPGroupPricing = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return HotelRFPGroupPricing;

	}

	public void updateGroupMeeting(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_updategroupmeetings(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); end; ");
				try {
					Long compRoom1 = null;
					if ((rfpHotel.getComprooms() != null) && (!rfpHotel.getComprooms().equals(""))) {
						compRoom1 = new Long(rfpHotel.getComprooms());
					}
					Long minAmount1 = null;
					if (rfpHotel.getMinamount() != null && !(rfpHotel.getMinamount().equals(""))) {
						minAmount1 = new Long(rfpHotel.getMinamount());
					}
					Long maxAmount1 = null;
					if ((rfpHotel.getMaxamount() != null) && (!rfpHotel.getMaxamount().equals(""))) {
						maxAmount1 = new Long(rfpHotel.getMaxamount());
					}
					Long cardMaxAmount1 = null;
					if ((rfpHotel.getCardmaxamount() != null) && (!rfpHotel.getCardmaxamount().equals(""))) {
						cardMaxAmount1 = new Long(rfpHotel.getCardmaxamount());
					}

					stmt.setLong(1, hotelrfpid);
					stmt.setString(2, rfpHotel.getDiscfb());
					stmt.setString(3, rfpHotel.getDiscav());
					stmt.setObject(4, compRoom1, Types.NUMERIC);
					stmt.setString(5, rfpHotel.getCompparking());
					stmt.setString(6, rfpHotel.getDirectbill());
					stmt.setString(7, rfpHotel.getPayterms());
					stmt.setString(8, rfpHotel.getMinspend());
					stmt.setObject(9, minAmount1, Types.NUMERIC);
					stmt.setString(10, rfpHotel.getMaxspend());
					stmt.setObject(11, maxAmount1, Types.NUMERIC);
					stmt.setString(12, rfpHotel.getUpfrontdep());
					stmt.setString(13, rfpHotel.getCorporate_mtngcard());
					stmt.setString(14, rfpHotel.getMtngcardfunds());
					stmt.setString(15, rfpHotel.getCardmax());
					stmt.setObject(16, cardMaxAmount1, Types.NUMERIC);
					if (rfpHotel.getMeetingrmhsiafee() == null)
						stmt.setNull(17, Types.NUMERIC);
					else
						stmt.setObject(17, rfpHotel.getMeetingrmhsiafee(), Types.NUMERIC);
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
	
	public HotelRFPGroupsAndMeetings getHotelRFPPayPricing(long hotelrfpid) {
		String queryString = "SELECT  tabpaygmsflg, upfrontdep, directbill, payterms, corporate_mtngcard, mtngcardfunds FROM MFPDBO.HOTELRFP "
				  + " WHERE HOTELRFPID = ?1 ";

		Query q = em.createNativeQuery(queryString, HotelRFPGroupsAndMeetings.class);
		q.setParameter(1, hotelrfpid);
		HotelRFPGroupsAndMeetings HotelRFPPayPricing = (HotelRFPGroupsAndMeetings) q.getSingleResult();
		return HotelRFPPayPricing;

	}
	
	public void updateHotelRFPPayPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_update_paypricing(?,?,?,?,?,?,?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.setString(2, rfpHotel.getUpfrontdep());
					stmt.setString(3, rfpHotel.getDirectbill());
					stmt.setString(4, rfpHotel.getPayterms());
					stmt.setString(5, rfpHotel.getCorporate_mtngcard());
					stmt.setString(6, rfpHotel.getMtngcardfunds());
					stmt.setString(7, rfpHotel.getTabpaygmsflg());
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

	public String getCurrencyUsedInQuote(long hotelrfpid) {

		String queryString = "SELECT      b.currencyname   FROM   mfpdbo.hotelrfp a, mfpdbo.currency_ref b  WHERE   (a.currencycode = b.currencycode(+))  AND hotelrfpid = ?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String currency = null;
		try {
			currency = (String) q.getSingleResult();
		} catch (NoResultException e) {
			currency = null;
		}
		return currency;
	}
	private List<HotelRFPRmPools> getRFPRoomPools(List<HotelRFPRoomPool> resultList) {
		Map<Long,HotelRFPRmPools> roomClassMap = new HashMap<Long, HotelRFPRmPools>();
		for(HotelRFPRoomPool roomPoolClass : resultList) {
			if(roomClassMap.containsKey(roomPoolClass.getRoomClassSeq())) {
				roomClassMap.get(roomPoolClass.getRoomClassSeq()).getRoomPoolList().add(roomPoolClass.getRoomPool());
			}else {
				HotelRFPRmPools roomPool = new HotelRFPRmPools();
				List<String> roomPools = new ArrayList<String>();
				roomPool.setRequired(roomPoolClass.getRequired());
				roomPools.add(roomPoolClass.getRoomPool());
				roomPool.setRoomPoolList(roomPools);
				roomPool.setSeq(roomPoolClass.getRoomClassSeq());
				roomClassMap.put(roomPoolClass.getRoomClassSeq(), roomPool);
			}
		}
		List<HotelRFPRmPools> RFPRoomPoolList = new ArrayList<HotelRFPRmPools>(roomClassMap.values());
		Collections.sort(RFPRoomPoolList, new Comparator<HotelRFPRmPools>() {

			@Override
			public int compare(HotelRFPRmPools object1, HotelRFPRmPools object2) {
				return object1.getSeq().compareTo( object2.getSeq());
			}
		});
		return removeNullRoomPoolExceptSeq1(RFPRoomPoolList);
//		return RFPRoomPoolList;
	}

	private List<HotelRFPRmPools> removeNullRoomPoolExceptSeq1(List<HotelRFPRmPools> rFPRoomPoolList) {
		List<HotelRFPRmPools> finalRFPRoomPoolList = new ArrayList<HotelRFPRmPools>();
		for(HotelRFPRmPools hotelRFPRmPool : rFPRoomPoolList) {
			HotelRFPRmPools localHotelRFPRmPool = hotelRFPRmPool;
			List<String> roomPoolList = new ArrayList<String>();
			for(String roomPool : hotelRFPRmPool.getRoomPoolList()) {
				if(roomPool != null) {
					roomPoolList.add(roomPool);
				}
			}
			localHotelRFPRmPool.setRoomPoolList(roomPoolList);
			finalRFPRoomPoolList.add(localHotelRFPRmPool);
		}
		return finalRFPRoomPoolList;
	}
}
