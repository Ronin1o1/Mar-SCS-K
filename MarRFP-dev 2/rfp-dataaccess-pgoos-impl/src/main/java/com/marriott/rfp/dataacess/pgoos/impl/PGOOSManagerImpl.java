package com.marriott.rfp.dataacess.pgoos.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pgoos.api.PGOOSManager;
import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelAccountRoomPool;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.PricingRule;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.RoomPool;
import com.marriott.rfp.object.pgoos.Season;
import com.marriott.rfp.object.pgoos.TransactionDetail;
import com.marriott.rfp.object.pgoos.TransactionType;

/**
 * Session Bean implementation class PGOOSManagerImpl
 */
@Service

public class PGOOSManagerImpl implements PGOOSManager {
	private static final Logger log = LoggerFactory.getLogger(PGOOSManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public HotelAccountInfo getHotelAccountSpecific(Long hotelid, Long accountrecid, TransactionType transactiontype) {
		String sql = " SELECT  hotelid, accountrecid, accountid, aeraccount, period, excludeaer, islos, mfpdbo.pgoos_processid_seq.nextval processid, marshacode, accproductid, "
				+ " startdate, contractend, discfirsttieronly, altcancelpolicytime, altcancelpolicyoptionid, hotelrfpid, hotel_accountinfoid, "
				+ " selected, affiliationid, ratetype_selected, marketcode, percentdiscount, distance, distanceunit, currencycode, extendcancelpolicy, "
				+ " altcxlpolicytimeid, altcxlpolicytime, accountname, com, breakfast, isgpp, productid1, productid2, productid3 , enhanceddiscount "
				+ " FROM ( SELECT hotelid, accountrecid, accountid, aeraccount, period, excludeaer, islos, marshacode, accproductid, startdate, contractend, discfirsttieronly, "
				+ " altcancelpolicytime, altcancelpolicyoptionid, hotelrfpid,  hotel_accountinfoid, selected,  affiliationid, "
				+ " CASE WHEN isgpp = 'Y' THEN 18 else ratetype_selected END ratetype_selected, marketcode, "
				+ " CASE WHEN isgpp = 'Y' THEN nvl(default_percent, 0) WHEN ratetype_selected = 20 THEN nvl(percentdiscount, 0) ELSE null END percentdiscount, "
				+ " distance, distanceunit, currencycode, extendcancelpolicy, altcxlpolicytimeid, altcxlpolicytime, "
				+ " CASE WHEN isgpp = 'Y' THEN aer_accountname ELSE rpgm_accountname END accountname, "
				+ "	CASE WHEN isgpp = 'Y' THEN 'N' ELSE mfpproc.fn_getrule (hotel_accountinfoid, 1) END com, "
				+ "	CASE WHEN isgpp = 'Y' THEN 'N' ELSE nvl(mfpproc.fn_getrule(hotel_accountinfoid, 3), 'N') END breakfast, isgpp, "
				+ " CASE WHEN ratetype_selected NOT IN (1, 2, 18) AND CASE WHEN isgpp = 'Y' THEN 'Y' ELSE (SELECT lra FROM MFPDBO.accountrpflags af WHERE af.hotel_accountinfoid = a.hotel_accountinfoid AND roompool = 1 and rownum = 1) END ='N' THEN '2' ELSE '1' END productid1, "
				+ " CASE WHEN ratetype_selected NOT IN (1, 2, 18) AND CASE WHEN isgpp = 'Y' THEN 'Y' ELSE (SELECT lra FROM MFPDBO.accountrpflags af WHERE af.hotel_accountinfoid = a.hotel_accountinfoid AND roompool = 2 and rownum = 1) END ='N' THEN '2' ELSE '1' END productid2, "
				+ " CASE WHEN ratetype_selected NOT IN (1, 2, 18) AND CASE WHEN isgpp = 'Y' THEN 'Y' ELSE (SELECT lra FROM MFPDBO.accountrpflags af WHERE af.hotel_accountinfoid = a.hotel_accountinfoid AND roompool = 3 and rownum = 1) END ='N' THEN '2' ELSE '1' END productid3, "
				+ " case when selected='Y' and  allowenhancedpgoos='Y' and ratetype_selected not in (2,18,20) and isgpp='N' then case when aeraccount='Y' and excludeaer='N'  and aerpgoos='Y' "
				+ " AND nvl((select value from mfpdbo.gpp_brand_accounts where affiliationid=a.affiliationid and accountrecid=a.accountrecid),'Y')='Y' then nvl(enhanceddiscountgpp,0) else nvl(enhanceddiscount,0) end else 0 end enhanceddiscount "

				+ " FROM ( SELECT h.hotelid, a.accountrecid, a.accountid, a.aer_account aeraccount, a.period, mfpproc.fn_exclude_aer(h.affiliationid) excludeaer, "
				+ " mfpproc.fn_islosbrand(h.affiliationid) islos, marshacode, a.product_id accproductid, "
				+ " mfpproc.pkg_pgoos_hpp.fn_startdate_sysdate(mfpproc.fn_getcontractstart(a.accountrecid)) startdate, "
				+ " mfpproc.fn_getcontractend(a.accountrecid) contractend, CASE WHEN mfpproc.fn_islosbrand(h.affiliationid) = 'Y' THEN nvl(a.discfirsttieronly, 'N') else 'N' END discfirsttieronly, "
				+ " mfpproc.fn_get_cxlpolicytime(a.altcancelpolicytimeid) altcancelpolicytime, nvl(a.altcancelpolicyoptionid, 0) altcancelpolicyoptionid, "
				+ "	hr.hotelrfpid, ha.hotel_accountinfoid, ad.selected, ha.ratetype_selected, ad.marketcode, ha.percentdiscount, a.default_percent, "
				+ "	distance, hr.distanceunit, a.rpgm_accountname, a.aer_accountname, CASE WHEN a.aer_account = 'Y' AND mfpproc.fn_exclude_aer (h.affiliationid) = 'N' "
				+ " AND (ratetype_selected = 18 OR (SELECT COUNT(*) FROM mfpdbo.accountrpflags WHERE hotel_accountinfoid = ha.hotel_accountinfoid AND accepted IN ('Y','P')) = 0) THEN 'Y' ELSE 'N' END isgpp, "
				+ " TRIM( hr.currencycode ) currencycode, NVL(ha.extendcancelpolicy,'N') extendcancelpolicy, nvl(ha.altcxlpolicytimeid,0) altcxlpolicytimeid, "
				+ "	mfpproc.fn_get_cxlpolicytime(ha.altcxlpolicytimeid) altcxlpolicytime, affiliationid, "
				+ " case when h.allowenhancedpgoos='Y' and a.allow_enhanced='Y' then 'Y' else 'N' end allowenhancedpgoos, a.enhanceddiscount, a.enhanceddiscountgpp, hr.aerpgoos "
				+ "	FROM mfpdbo.account a, mfpdbo.hotel h, mfpdbo.accountdirectory ad, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha "
				+ "	WHERE h.partition_idx = 'M' AND a.accountrecid = ad.accountrecid AND ad.hotelid = h.hotelid AND hr.hotelid = h.hotelid "
				+ "	AND hr.period = a.period AND hr.hotelrfpid = ha.hotelrfpid AND a.accountrecid = ha.accountrecid  AND a.accountpricingtype IN ('L', 'C') "
				+ "	AND a.locked = 'Y' AND a.accountrecid = ?1 AND h.hotelid = ?2 ";
		
		if (transactiontype == TransactionType.BATCH) 
			sql += " AND mfpproc.fn_getcontractend(a.accountrecid)>=trunc(sysdate-(SELECT TO_NUMBER (constant_value) FROM mfpdbo.rfp_constants where constant_name = 'CONTRACTEND_CLEAN')) ";
		else if (transactiontype != TransactionType.MCBVRPX && transactiontype != TransactionType.MCBVRPK) {
			sql += " AND mfpproc.fn_getcontractend(a.accountrecid)>=trunc(sysdate-1) ";
		}
		sql += " ) a ) b ";
		
		Query q = em.createNativeQuery(sql, HotelAccountInfo.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, hotelid);
		HotelAccountInfo result = null;
		try {
			result = (HotelAccountInfo) q.getSingleResult();
		} catch (NoResultException e) {
			result = null;
		}
	
		return result;
	}

	public List<RoomPool> getRoomPools(HotelAccountInfo hotelacctInfo, boolean killOrRel) {
		
		String sql = " SELECT roompool, roomclassseq, roompoolseq, lra, rateofferid, is_aer_rpgm, rateprog, "
				+ " CASE WHEN price_rateofferidexcept IS NOT NULL THEN price_rateofferidexcept ELSE CASE WHEN price_rateofferid IS NOT NULL THEN price_rateofferid ELSE price_masterrateofferid END END price_mirrorrateofferid, "
			    + " CASE WHEN price_rateofferidexcept IS NOT NULL THEN price_pricingtypeexcept ELSE CASE WHEN price_rateofferid IS NOT NULL THEN NULL ELSE price_pricing_type END END price_pricing_type, "
			    + " CASE WHEN price_rateofferidexcept IS NOT NULL THEN price_prioritytagexcept ELSE CASE WHEN price_rateofferid IS NOT NULL THEN NULL ELSE price_priority_tag END END price_priority_tag, "
			    + " CASE WHEN price_rateofferidexcept IS NOT NULL THEN NULL ELSE CASE WHEN price_rateentityid IS NOT NULL THEN price_rateentityid ELSE NULL END END price_rateentityid, "
			    + " CASE WHEN lra = 'Y' THEN CASE WHEN avail_rateofferid IS NOT NULL THEN avail_rateofferid ELSE price_masterrateofferid END ELSE NULL END avail_mirrorrateofferid, "
				+ " CASE WHEN lra = 'Y' THEN CASE WHEN avail_rateofferid IS NOT NULL THEN NULL ELSE avail_pricing_type END ELSE NULL END avail_pricing_type, "
				+ " CASE WHEN lra = 'Y' THEN CASE WHEN avail_rateofferid IS NOT NULL THEN NULL ELSE avail_priority_tag END ELSE NULL END avail_priority_tag, "
				+ " CASE WHEN lra = 'Y' THEN CASE WHEN avail_rateentityid IS NOT NULL THEN avail_rateentityid ELSE NULL END ELSE NULL END avail_rateentityid, " 			
				+ " CASE WHEN sendvrpe = 'Y' AND mfpproc.fn_getcontractend( " + hotelacctInfo.getAccountrecid() + " ) >= TRUNC(SYSDATE) THEN 'Y' ELSE 'N' END sendvrpe, sendvrpx, sendvrpk " 
				+ " FROM ( SELECT hrp.roompool, har.roomclassseq, har.roompoolseq, mfpproc.pkg_pgoos_hpp.fn_getlra_1(h.hotelid, har.accountrecid, har.roomclassseq) lra, "
				+ "	DECODE(is_aer_rpgm, 'N', ar.prateofferid, ar.grateofferid) rateofferid, is_aer_rpgm, "
				+ "	DECODE(is_aer_rpgm, 'N', ar.prateprog, ar.grateprog) rateprog, " 
				+ "	DECODE(is_aer_rpgm, 'N', ar.pprice_rateofferidexcept, ar.gprice_rateofferidexcept) price_rateofferidexcept, "
				+ "	DECODE(is_aer_rpgm, 'N', ar.pprice_pricingtypeexcept, ar.gprice_pricingtypeexcept) price_pricingtypeexcept, "
				+ "	DECODE(is_aer_rpgm, 'N', ar.pprice_prioritytagexcept, ar.gprice_prioritytagexcept) price_prioritytagexcept, "
				+ "	price_rateofferid, price_masterrateofferid, price_pricing_type, price_priority_tag, price_rateentityid, avail_rateofferid, avail_pricing_type, " 
				+ "	avail_priority_tag, avail_rateentityid, NVL(sendvrpe, 'N') sendvrpe,  NVL(sendvrpx, 'N') sendvrpx, NVL(sendvrpk, 'N') sendvrpk "
				+ "	FROM mfpdbo.hotel h "
				+ "	JOIN mfpdbo.hotelrfp hr ON h.hotelid = hr.hotelid "
				+ "	JOIN ( SELECT ? accountrecid, ? hotelid, ? hotelrfpid, rcrp.roomclassseq, rcrp.roompoolseq, sendvrpe, sendvrpx, sendvrpk, 'N' is_aer_rpgm "
				+ " FROM ( SELECT roomclassseq, roompoolseq FROM (SELECT level roomclassseq FROM dual CONNECT BY level <= ( SELECT constant_value "
				+ " FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_ROOMPOOLS')) JOIN (SELECT level roompoolseq FROM dual CONNECT BY  level <= "
				+ " (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_RMPOOLS')) rpseq ON 1 = 1) rcrp "
				+ " LEFT JOIN mfpdbo.hotel_accountinfo_roompools hai ON hai.hotelid = ? AND hai.accountrecid = ? AND hai.roomclassseq = rcrp.roomclassseq "
				+ " AND hai.roompoolseq = rcrp.roompoolseq UNION ALL "
				+ " SELECT ?, ?, ?, rcrp.roomclassseq, rcrp.roompoolseq, sendvrpe_gpp, sendvrpx_gpp, sendvrpk_gpp, 'Y' is_aer_rpgm "
				+ " FROM ( SELECT roomclassseq, roompoolseq FROM (SELECT level roomclassseq FROM dual CONNECT BY level <= ( SELECT constant_value "
				+ " FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_ROOMPOOLS')) JOIN (SELECT level roompoolseq FROM dual CONNECT BY level <= "
				+ " (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_RMPOOLS')) rpseq ON 1 = 1) rcrp " 
				+ " LEFT JOIN mfpdbo.hotel_accountinfo_roompools hai ON hai.hotelid = ? AND hai.accountrecid = ?  AND hai.roomclassseq = rcrp.roomclassseq "
				+ " AND hai.roompoolseq = rcrp.roompoolseq) har ON har.hotelid = h.hotelid AND har.hotelrfpid = hr.hotelrfpid "
				+ "	LEFT JOIN ( SELECT accountrecid, sequence, subsequence, "
				+ " MAX(CASE WHEN is_aer_rpgm = 'N' THEN rateofferid END) prateofferid, "
				+ " MAX(CASE WHEN is_aer_rpgm = 'Y' THEN rateofferid END) grateofferid, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'N' THEN rateprog END) prateprog, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'Y' THEN rateprog END) grateprog, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'N' THEN price_rateofferidexcept END) pprice_rateofferidexcept, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'Y' THEN price_rateofferidexcept END) gprice_rateofferidexcept, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'N' THEN price_prioritytagexcept END) pprice_prioritytagexcept, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'Y' THEN price_prioritytagexcept END) gprice_prioritytagexcept, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'N' THEN price_pricingtypeexcept END) pprice_pricingtypeexcept, "
			    + " MAX(CASE WHEN is_aer_rpgm = 'Y' THEN price_pricingtypeexcept END) gprice_pricingtypeexcept "
			    + " FROM mfpdbo.account_rateprog "
			    + " WHERE accountrecid = ? "
			    + " GROUP BY accountrecid, sequence, subsequence "
			    + " ) ar ON ar.accountrecid = har.accountrecid AND ar.sequence = har.roomclassseq AND ar.subsequence = har.roompoolseq "
			    + "	LEFT JOIN mfpdbo.hotelrfp_roompools hrp ON hr.hotelrfpid = hrp.hotelrfpid AND har.roomclassseq = hrp.roomclassseq AND har.roompoolseq = hrp.roompoolseq "
			    + "	LEFT JOIN mfpdbo.rfp_mirrorexceptions rme ON rme.hotelid = h.hotelid AND rme.roompoolseq = har.roomclassseq AND rme.roompoolsubseq = har.roompoolseq "
			    + "	JOIN mfpdbo.rfp_mirrordefaults rmd ON rmd.affiliationid = h.affiliationid AND rmd.room_pool_seq = har.roomclassseq) "
			    + "	WHERE 1 = 1 ";
		
		if (!killOrRel) {
			sql += " AND ( (sendvrpe = 'Y' AND mfpproc.fn_getcontractend( " + hotelacctInfo.getAccountrecid() + " ) >= TRUNC(SYSDATE)) OR sendvrpx = 'Y' OR sendvrpk = 'Y' ) ";
		} else {
			sql += " AND ( is_aer_rpgm = 'N' OR ( '" + hotelacctInfo.getAerAccount() + "' = 'Y' AND roomclassseq < 3) ) ";
		}
		
		if (hotelacctInfo.getRpgms() != null) {
			sql += " AND rateprog in (" + hotelacctInfo.getQuotedRpgms() + ") ";
		}

		Query q = em.createNativeQuery(sql, RoomPool.class);

		q.setParameter(1, hotelacctInfo.getAccountrecid());
		q.setParameter(2, hotelacctInfo.getHotelid());
		q.setParameter(3, hotelacctInfo.getHotelrfpid());
		q.setParameter(4, hotelacctInfo.getHotelid());
		q.setParameter(5, hotelacctInfo.getAccountrecid());
		q.setParameter(6, hotelacctInfo.getAccountrecid());
		q.setParameter(7, hotelacctInfo.getHotelid());
		q.setParameter(8, hotelacctInfo.getHotelrfpid());
		q.setParameter(9, hotelacctInfo.getHotelid());
		q.setParameter(10, hotelacctInfo.getAccountrecid());
		q.setParameter(11, hotelacctInfo.getAccountrecid());

		@SuppressWarnings("unchecked")
		List<RoomPool> rmPools = q.getResultList();

		return rmPools;
	}

	public String verifyTwoYear(HotelAccountInfo ha, TransactionType transactiontype) {

		Connection connection = null;
		CallableStatement stmt = null;
		String result = null;
		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.pkg_pgoos_hpp.sp_two_year_compare (?, ?, ?, ?, ?,  ?, ?, ?, ?, ?); end; ");

			stmt.setLong(1, ha.getHotelid());
			stmt.setLong(2, ha.getAccountid());
			stmt.setLong(3, ha.getPeriod());
			stmt.setString(4, ha.getIsGPP());
			stmt.registerOutParameter(5, Types.VARCHAR); // vcom
			stmt.registerOutParameter(6, Types.VARCHAR); // vaccountname
			stmt.registerOutParameter(7, Types.VARCHAR); // vdistance
			stmt.registerOutParameter(8, Types.VARCHAR); // vtwoyear
			stmt.registerOutParameter(9, Types.VARCHAR); // vthreewks
			stmt.registerOutParameter(10, Types.VARCHAR); // vstatus

			stmt.executeUpdate();

			result = stmt.getString(8);
			if (result != null) {
				ha.setTwoyear(result);
			}
			if (ha.getTwoyear().equals("Y")) {
				result = stmt.getString(9);
				if (result != null) {
					ha.setLrathreeweeks(result.trim());
				}
				if (ha.getLrathreeweeks().equals("Y") && (transactiontype == TransactionType.BATCH || transactiontype == TransactionType.LIVE)) {
					result = stmt.getString(5);
					if (result != null) {
						ha.setCom(result.trim());
					}
				}
				result = stmt.getString(6);
				if (result != null) {
					ha.setAccountName(result.trim());
				}

				Double nresult = stmt.getDouble(7);
				if (nresult != null && nresult != 0) {
					ha.setDistance(nresult);
				}
			}
			result = stmt.getString(10).trim();
			if (result == null) {
				result = "HOLD";
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}
		return result;
	}

	public String verifyData(HotelAccountInfo ha, String isLOSBrand, Long roompool) {

		Connection connection = null;
		CallableStatement stmt = null;
		String result = null;
		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.pkg_pgoos_hpp.sp_validatedata (?, ?,?, ?, ?, ? ,?); end; ");

			stmt.setLong(1, ha.getHotel_accountinfoid());
			stmt.setString(2, isLOSBrand);
			stmt.setLong(3, ha.getAffiliationid());
			stmt.setString(4, ha.getCurrencyCode());
			stmt.setString(5, ha.getProductid(roompool));
			stmt.setLong(6, roompool);
			stmt.registerOutParameter(7, Types.VARCHAR); // AccountName

			stmt.executeUpdate();
			result = stmt.getString(7);
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}
		return result;
	}

	public List<Season> getBlackoutSeasons(HotelAccountInfo ha, String isaer_rateprogram) {

		List<Season> blkOutSeasons = new ArrayList<Season>(0);

		if (isaer_rateprogram.equals("Y")) {
			blkOutSeasons = getBlackoutSeasonsForGPP(ha.getHotelid(), ha.getStartdate(), ha.getContractend());
		} else {
			blkOutSeasons = getBlackoutSeasonsForNonGPP(ha.getHotel_accountinfoid(), ha.getStartdate(), ha.getContractend());
		}
		return blkOutSeasons;
	}

	private List<Season> getBlackoutSeasonsForNonGPP(Long accountInfoId, Date contractstart, Date contractend) {

		String sql = " SELECT distinct greatest(greatest(?1, mfpproc.pkg_pgoos_hpp.fn_startdate_sysdate(startdate)), TRUNC (sysdate - 1)) startdate, "  
				+ "	least(?2, enddate) enddate"
				+ " FROM mfpdbo.accountblackoutdates b, mfpdbo.hotel_accountinfo ha"
				+ "     WHERE b.hotel_accountinfoid = ?3  AND ha.hotel_accountinfoid = b.hotel_accountinfoid  AND (ha.waiveblackouts = 'N' OR ha.waiveblackouts IS NULL)"
				+ "       AND TRUNC (enddate) >= TRUNC (SYSDATE - 1) AND TRUNC( startdate ) <= ?4 ORDER BY startdate";

		Query q = em.createNativeQuery(sql, Season.class);
		q.setParameter(1, contractstart);
		q.setParameter(2, contractend);
		q.setParameter(3, accountInfoId);
		q.setParameter(4, contractend);
		@SuppressWarnings("unchecked")
		List<Season> results = q.getResultList();

		return results;
	}

	private List<Season> getBlackoutSeasonsForGPP(Long hotelId, Date contractstart, Date contractend) {

		String sql = "  SELECT distinct greatest(greatest(?1, mfpproc.pkg_pgoos_hpp.fn_startdate_sysdate(startdate)), TRUNC (sysdate - 1)) startdate, "
				+ "			least(?2, enddate) enddate   FROM mfpdbo.hotelblackoutdates b, mfpdbo.hotelrfp h  WHERE "
				+ "      h.hotelrfpid = b.hotelrfpid    AND h.hotelid = ?3    AND TRUNC (enddate) >= TRUNC (sysdate - 1)  AND (   (?4 <= startdate AND ?5 >= enddate) "
				+ " OR (?6 <= enddate AND ?7 >= enddate)  OR (?8 <= startdate AND ?9 >= startdate))  ORDER BY startdate";

		Query q = em.createNativeQuery(sql, Season.class);
		q.setParameter(1, contractstart);
		q.setParameter(2, contractend);
		q.setParameter(3, hotelId);
		q.setParameter(4, contractstart);
		q.setParameter(5, contractend);
		q.setParameter(6, contractstart);
		q.setParameter(7, contractend);
		q.setParameter(8, contractstart);
		q.setParameter(9, contractend);
		@SuppressWarnings("unchecked")
		List<Season> results = q.getResultList();

		return results;
	}

	public List<PricingRule> getPricingRules(Long accountInfoId, Long roompool, String productid, String setPricingAmt, String zeroPrice, String zeroCeil, Double enhancedDiscount) {

		String sql = "SELECT a.hotel_accountinfoid accountInfoId, a.seasonid, mfpproc.pkg_pgoos_hpp.fn_startdate_sysdate(a.startdate) startdate, a.enddate enddate,"
				+ " al.lengthofstayid tierNumber, al.roomnightsfrom startnights, al.roomnightsto endnights,"
				+ " case when ?='Y' then ar.rate  else case when ?='Y' then case when al.lengthofstayid=1 then ? else 0 end else null end end pricingamount, "
				+ "  case when ?='N' then ar.rate  else   case when ?='Y' then case when al.lengthofstayid=1 then ? else 0 end else null end end ceilingamount, CASE WHEN roomtypeid in (1,2) then roomtypeid else NULL  END occupancy "
				+ "  FROM mfpdbo.accountseason a, mfpdbo.accountrates ar, mfpdbo.accountlengthofstay al, mfpdbo.hotel_accountinfo ha WHERE ar.lengthofstayid = al.lengthofstayid  AND ar.seasonid = a.seasonid"
				+ " AND ar.hotel_accountinfoid = al.hotel_accountinfoid  AND a.hotel_accountinfoid = al.hotel_accountinfoid and ha.hotel_accountinfoid=ar.hotel_accountinfoid "
				+ " AND ar.hotel_accountinfoid = ?   and ar.roompool=?  AND ar.productid = ?  AND a.enddate > trunc(sysdate - 1) ORDER BY ar.productid, a.seasonid, ar.roomtypeid,  al.lengthofstayid";

		Query q = em.createNativeQuery(sql, PricingRule.class);
		q.setParameter(1, setPricingAmt);
		q.setParameter(2, zeroPrice);
		q.setParameter(3, enhancedDiscount);
		q.setParameter(4, setPricingAmt);
		q.setParameter(5, zeroCeil);
		q.setParameter(6, enhancedDiscount);
		q.setParameter(7, accountInfoId);
		q.setParameter(8, roompool);
		q.setParameter(9, productid);
		@SuppressWarnings("unchecked")
		List<PricingRule> results = q.getResultList();

		return results;
	}

	public List<PricingRule> getDiscFirstTierRules(Long accountInfoId, Double pricingamount) {
		
		String sql = "SELECT ha.hotel_accountinfoid accountinfoid,  1 seasonid, mfpproc.pkg_pgoos_hpp.fn_startdate_sysdate( mfpproc.fn_getcontractstart( ha.accountrecid ) ) startdate, "
				+ " mfpproc.fn_getcontractend( ha.accountrecid ) enddate,  al.tiernumber tiernumber,  NULL startnights,  NULL endnights, "
				+ " CASE WHEN al.tiernumber = 1 THEN "; 		
		if (null == pricingamount) {
			sql += " null ";
		} else {
			sql += pricingamount;
		}
		sql += " ELSE 0 END pricingamount,  NULL ceilingmirrortier, NULL ceilingamount, "
				+ " NULL ceilingmirrorself FROM (SELECT LEVEL tierNumber FROM DUAL "
				+ " CONNECT BY LEVEL <= (SELECT TO_NUMBER( constant_value ) FROM mfpdbo.rfp_constants WHERE constant_name = 'MAX_LOS')) al, "
				+ " mfpdbo.hotel_accountinfo ha WHERE ha.hotel_accountinfoid = ?1 ORDER BY al.tierNumber ";

		Query q = em.createNativeQuery(sql, PricingRule.class);
		q.setParameter(1, accountInfoId);
		@SuppressWarnings("unchecked")
		List<PricingRule> results = q.getResultList();

		return results;
	}

	public Long getTransactionid() {
		String sql = "select mfpdbo.pgoos_transaction_seq.NEXTVAL from dual";
		Query q = em.createNativeQuery(sql, Long.class);
		Long result = null;
		try {
			result = (Long) q.getSingleResult();
		} catch (Exception ex) {
			result = null;
		}
		return result;
	}

	public void updateVRPEError(HotelAccountInfo ha, RoomPool rp) {

		Query q = em.createNativeQuery("begin mfpproc.pkg_pgoos_hpp.sp_updatevrpefailtranslog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?); end; ");

		q.setParameter(1, rp.getTransactionid());
		q.setParameter(2, ha.getBatchid());
		q.setParameter(3, ha.getAccountrecid());
		q.setParameter(4, ha.getHotelid());
		q.setParameter(5, rp.getRateprog());
		q.setParameter(6, ha.getPeriod());
		q.setParameter(7, rp.getCmdType().value());
		q.setParameter(8, rp.getRateofferid());
		q.setParameter(9, ha.getProcessid());
		q.setParameter(10, rp.getErrordesc());
		q.setParameter(11, rp.getErrorcode());

		q.executeUpdate();

	}

	public void updateAuditInfo(HotelAccountInfo ha, RoomPool rp, String byPeriod) {

		Query q = em.createNativeQuery("begin mfpproc.pkg_pgoos_hpp.sp_update_translog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?); end; ");

		q.setParameter(1, rp.getTransactionid());
		q.setParameter(2, ha.getBatchid());

		q.setParameter(3, rp.getRateofferid());
		q.setParameter(4, null);

		q.setParameter(5, ((ha != null) ? ha.getAccountrecid() : null));
		q.setParameter(6, ((ha != null) ? ha.getPeriod() : null));
		q.setParameter(7, ((ha != null) ? ha.getHotelid() : null));

		q.setParameter(8, ((rp != null) ? rp.getRateprog() : null));
		q.setParameter(9, ((rp != null) ? rp.getCmdType().value() : null));

		TransactionDetail detail = new TransactionDetail();
		q.setParameter(10, new Date()); // Load Date
		q.setParameter(11, detail.getCmdText(ha, rp, byPeriod));
		q.setParameter(12, ha.getEid());
		q.setParameter(13, ((rp != null) ? rp.getCmdType().value() : null));
		q.setParameter(14, "COMPLETE");

		q.setParameter(15, ((ha != null) ? ha.getMarketCode() : null));
		q.setParameter(16, ((ha != null) ? ha.getCom() : null));
		q.setParameter(17, ((ha != null) ? rp.getLra() : null));
		q.setParameter(18, ((rp != null) ? rp.getRoompool() : null));

		q.setParameter(19, ((rp != null) ? rp.getPrice_mirrorrateofferid() : null));
		q.setParameter(20, ((rp != null) ? rp.getPrice_rateentityid() : null));
		q.setParameter(21, ((rp != null) ? rp.getRoompool() : null));

		q.setParameter(22, ((rp != null) ? rp.getAvail_mirrorrateofferid() : null));
		q.setParameter(23, ((rp != null) ? rp.getAvail_rateentityid() : null));
		q.setParameter(24, ((rp != null) ? rp.getRoompool() : null));

		q.setParameter(25, ((rp != null) ? detail.getAllBlackOutDatesDelimited(rp.getBlackOutSeaons()) : null));
		q.setParameter(26, ((rp != null) ? detail.getRestrictionCmdText(rp, rp.getCmdType()) : null));
		q.setParameter(27, ((rp != null && ha != null) ? detail.getPriceCmdText(ha, rp) : null));
		q.setParameter(28, ha.getProcessid());
		q.setParameter(29, ""); // RET VAL

		q.executeUpdate();

	}

	public Long updateMarketcode(long haccid) {
		Long marketcode = null;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("begin ?:= mfpproc.pkg_pgoos_hpp.fn_update_marketcode(?); end; ");
				try {
					stmt.setLong(2, haccid);
					stmt.registerOutParameter(1, Types.NUMERIC);
					stmt.execute();
					marketcode = stmt.getLong(1);
				} finally {
					stmt.close();
				}

			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
		return marketcode;
	}

	public List<HotelsToPublish> getRecordsToPublish(Long batchid, Long hotelid) {
		String queryString = " select hotelid, transactionid, rpgm from mfpdbo.pgoos_transaction pt where batchid=?1 and marshacmd not in ('PROD') and status='UNPB' and hotelid=?2";

		Query q = em.createNativeQuery(queryString, HotelsToPublish.class);
		q.setParameter(1, batchid);
		q.setParameter(2, hotelid);

		@SuppressWarnings("unchecked")
		List<HotelsToPublish> results = q.getResultList();

		return results;
	}

	public void updatePublishHotel(List<PublishHotelResponse> phr, Long batchid) {
		if (phr != null) {
			for (PublishHotelResponse response : phr) {
				if (response != null) {

					Query q = em.createNativeQuery("begin mfpproc.pkg_pgoos_hpp.sp_update_hotelpublish(?, ?, ?, ?,?,?); end; ");

					q.setParameter(1, response.getHotelid());
					q.setParameter(2, batchid);
					q.setParameter(3, response.getStatus());
					q.setParameter(4, response.getSource());
					q.setParameter(5, response.getErrorCodesAsDelimitedString());
					q.setParameter(6, response.getErrorMessagesAsDelimitedString());
					q.executeUpdate();
				}
			}
		}
	}
	public String getBTtoHPPServiceUrl() {
		String constant_name ="HPP_BTSERVICE_URL";
		String queryString = "select c.constant_value from mfpdbo.RFP_Constants c where c.constant_name= ?1 ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, constant_name);
		String value;
		try {
			value = (String) q.getSingleResult();
		} catch (Exception ex) {
			value = null;
		}
		return value;
	}

	public void updateHotelAccountFlags(Long haccId, int roomClassSeq, int roomPoolSeq, String setVRPE, String setVRPX, String setVPRK) {

		Query q = em.createNativeQuery(
				"begin mfpproc.sp_update_acctdir_pgoosflags(null, null, ?, ?, ?, ?, ? ,? ,null ,false ,false ,false, false); end; ");

		q.setParameter(1, haccId);
		q.setParameter(2, roomClassSeq > 0 ? roomClassSeq : null);
		q.setParameter(3, roomPoolSeq > 0 ? roomPoolSeq : null);
		q.setParameter(4, setVRPE != null ? setVRPE : null);
		q.setParameter(5, setVRPX != null ? setVRPX : null);
		q.setParameter(6, setVPRK != null ? setVPRK : null);
		q.executeUpdate();
	}
	public void updateHotelAccountFlags_runMCB_GPP_all(Long haccId, int roomClassSeq, int roomPoolSeq, String setVRPE, String setVRPX, String setVPRK) {
		
	       Query q = em.createNativeQuery(
	                "begin mfpproc.sp_update_acctdir_pgoosflags_1(null, null, ?, ?, ?, ?, ? ,? ,null ,false ,false ,false, false); end; ");

	       q.setParameter(1, haccId);
	        q.setParameter(2, roomClassSeq > 0 ? roomClassSeq : null);
	        q.setParameter(3, roomPoolSeq > 0 ? roomPoolSeq : null);
	        q.setParameter(4, setVRPE != null ? setVRPE : null);
	        q.setParameter(5, setVRPX != null ? setVRPX : null);
	        q.setParameter(6, setVPRK != null ? setVPRK : null);
	        q.executeUpdate();
	    }
	
	public List<HotelAccountRoomPool> getRoomPoolsToRecalc(Long haccid) {
		String queryString = " SELECT b.hotel_accountinfoid, a.roomclassseq, a.roompoolseq, a.recalc_flags recalcFlags "
				+ " FROM mfpdbo.hotel_accountinfo_roompools a, mfpdbo.hotel_accountinfo b "
				+ " WHERE a.hotelrfpid = b.hotelrfpid AND a.accountrecid = b.accountrecid "
				+ " AND b.hotel_accountinfoid = ? AND (a.recalc_flags in ('Y', 'R') OR (a.recalc_flags in ('A', 'B') AND a.roomclassseq = 1 AND a.roompoolseq = 1)) ";

		Query q = em.createNativeQuery(queryString, HotelAccountRoomPool.class);
		q.setParameter(1, haccid);

		@SuppressWarnings("unchecked")
		List<HotelAccountRoomPool> results = q.getResultList();

		return results;		
	}
}
