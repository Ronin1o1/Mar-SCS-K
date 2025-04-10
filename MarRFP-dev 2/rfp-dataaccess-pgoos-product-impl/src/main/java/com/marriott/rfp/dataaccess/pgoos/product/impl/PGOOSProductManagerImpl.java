package com.marriott.rfp.dataaccess.pgoos.product.impl;



import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.pgoos.product.api.PGOOSProductManager;
import com.marriott.rfp.object.pgoos.propagate.PGOOSAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSHotelAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSProductAmenity;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class PropagateManagerImpl
 */

@Service
public class PGOOSProductManagerImpl implements PGOOSProductManager {

	private static final Logger log = LoggerFactory.getLogger(PGOOSProductManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<PGOOSProductAmenity> getAccountAmenities(long accountrecid, long hotelid) {

		String queryString;
		queryString = "SELECT decode(VALUE,'Y','Y', mfpproc.px.fn_get_break_include(hotel_accountinfoid)) amenityvalue, fr_rp_listcode, fr_rp_groupcode, fr_rp_name, fr_rp_code, fr_uom_list, fr_uom_code, fr_typelistcode, fr_typecode, fr_brandlist,  fr_brandcode"
				+ "  FROM (SELECT   aa.VALUE, ar.fr_rp_listcode, ar.fr_rp_groupcode, ar.fr_rp_name, ar.fr_rp_code, ar.fr_uom_list, ar.fr_uom_code, ar.fr_typelistcode, "
				+ "                 ar.fr_typecode, ar.fr_brandlist, ar.fr_brandcode, ha.hotel_accountinfoid "
				+ "            FROM mfpdbo.accountamenities aa, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.amenities_ref ar "
				+ "           WHERE (    (hr.hotelrfpid = ha.hotelrfpid) "
				+ "                  AND (ha.hotel_accountinfoid = aa.hotel_accountinfoid) "
				+ "                  AND (ar.amenityid = aa.amenityid) "
				+ "                  AND (hr.hotelid = ?1 )"
				+ "                  AND (ha.accountrecid =  ?2) "
				+ "                  AND (ar.fr_rp_listcode IS NOT NULL) "
				+ "                  AND (ar.fr_rp_listcode = '0203' AND ar.fr_rp_groupcode = '0001' AND ar.fr_rp_name = 'MPFD' AND ar.fr_rp_code = '0001') "
				+ "                 ) "
				+ "        ORDER BY aa.VALUE DESC) "
				+ " WHERE ROWNUM = 1 "
				+ " UNION "
				+ " SELECT aa.VALUE amenityvalue, ar.fr_rp_listcode, ar.fr_rp_groupcode, ar.fr_rp_name, ar.fr_rp_code, ar.fr_uom_list, ar.fr_uom_code, ar.fr_typelistcode, "
				+ "        ar.fr_typecode, ar.fr_brandlist, ar.fr_brandcode "
				+ "   FROM mfpdbo.accountamenities aa, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.amenities_ref ar "
				+ "  WHERE (    (hr.hotelrfpid = ha.hotelrfpid) "
				+ "         AND (ha.hotel_accountinfoid = aa.hotel_accountinfoid) "
				+ "         AND (ar.amenityid = aa.amenityid) "
				+ "         AND (hr.hotelid = ?1 )"
				+ "         AND (ha.accountrecid = ?2) "
				+ "         AND (ar.fr_rp_listcode IS NOT NULL) "
				+ "         AND NOT (ar.fr_rp_listcode = '0203' AND ar.fr_rp_groupcode = '0001' AND ar.fr_rp_name = 'MPFD' AND ar.fr_rp_code = '0001') "
				+ "        )"
				+ " UNION "
                + " SELECT 'N' amenityvalue, '0204' fr_rp_listcode, '0000' fr_rp_groupcode, 'MPPI' fr_rp_name, '0002' fr_rp_code, null fr_uom_list, null fr_uom_code, null fr_typelistcode, " 
                + "        null fr_typecode, null fr_brandlist, null fr_brandcode " 
                + "   FROM mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha "
                + "  WHERE (    (hr.hotelrfpid = ha.hotelrfpid) " 
                + "         AND (hr.hotelid = ?1 ) "
                + "         AND (ha.accountrecid = ?2 ) " 
                + "        ) "
				+ " order by fr_rp_listcode, fr_rp_groupcode, fr_rp_name, fr_rp_code ";
		Query q = em.createNativeQuery(queryString, PGOOSProductAmenity.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountrecid);

		@SuppressWarnings("unchecked")
		List<PGOOSProductAmenity> pglist = q.getResultList();
		return pglist;
	}

	public long getAccountProductSize() {
		String queryString = " select count(*)   from  mfpdbo.account a, mfpdbo.mcb_selection mcb  where mcb.accountrecid = a.accountrecid " + " AND product_id is null ";
		Long accountCount;
		Query q = em.createNativeQuery(queryString, Long.class);
		try {
			accountCount = (Long) q.getSingleResult();
		} catch (NoResultException ex) {
			accountCount = 0L;
		}
		return accountCount;
	}

	public List<PGOOSAccountProduct> getBatchAccountProduct() {
		String queryString = null;
		queryString = " select distinct a.period, a.accountrecid, product_id  productid from mfpdbo.account a, mfpdbo.accountdirectory ad,mfpdbo.hotel_accountinfo ha ,mfpdbo.hotelrfp hr, mfpdbo.hotel h where a.accountrecid=ad.accountrecid "
				+ " and  ha.accountrecid = ad.accountrecid and hr.hotelrfpid =ha.hotelrfpid and hr.hotelid =h.hotelid and ad.hotelid =h.hotelid and  mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) and a.locked='Y' "
				+ " and product_id is  null and  ((SELECT /*+ index (accountrpflags_roompools PK_ACCOUNTRPFLAGS_ROOMPOOLS) */ COUNT (*) FROM mfpdbo.accountrpflags_roompools  WHERE hotel_accountinfoid = ha.hotel_accountinfoid AND pgoos = 'Y') > 0) and "
				+ " nvl(ad.sendproduct,'Y')='Y'  and ((a.aer_account='N' and selected='Y' and (SELECT COUNT(*) FROM mfpdbo.accountrpflags  WHERE hotel_accountinfoid=ha.hotel_accountinfoid AND accepted IN ('Y','P'))>0 )  or a.aer_account='Y') ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		@SuppressWarnings("unchecked")
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}

	public List<PGOOSHotelAccountProduct> getBatchHotelProduct() {
		String queryString = "SELECT DISTINCT ad.hotelid, h.marshacode, a.accountrecid, a.product_id productid, a.period, NVL (ad.amenity_diff, 'N') amenity_diff, "
				+ " mfpproc.fn_getisloadrateaer(ad.hotelid, a.accountrecid) isaer FROM mfpdbo.account a, mfpdbo.accountdirectory ad, mfpdbo.hotel h "
				+ "  WHERE     a.accountrecid = ad.accountrecid AND mfpproc.fn_getcontractend (a.accountrecid) >= TRUNC (SYSDATE) AND a.locked = 'Y'  "
				+ "AND NVL (ad.sendproduct, 'Y') = 'Y'   AND h.hotelid = ad.hotelid  AND h.partition_idx = 'M'  "
				+ " AND mfpproc.fn_ishotelaccountpgoosable_hpp (h.hotelid, a.accountrecid) = 'Y'";
		Query q = em.createNativeQuery(queryString, PGOOSHotelAccountProduct.class);
		@SuppressWarnings("unchecked")
		List<PGOOSHotelAccountProduct> product = q.getResultList();
		return product;
	}

	public List<PGOOSAccountProduct> getBatchVerifyAccountProduct() {
		String queryString = null;
		queryString = " select distinct period, a.accountrecid, product_id productid from mfpdbo.account a, mfpdbo.accountdirectory ad where a.accountrecid=ad.accountrecid and "
				+ "  mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) and a.locked='Y' "
				+ " and product_id is not null and  pgoos='Y' and nvl(ad.sendproduct,'Y')='Y'  and ((a.aer_account='N' and selected='Y' and nvl(accepted,'Y')='Y') or a.aer_account='Y') ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		@SuppressWarnings("unchecked")
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}
	public List<PGOOSProductAmenity> getHotelAmenities(long accountrecid, long hotelid) {

		String queryString;
		queryString = "SELECT VALUE amenityvalue, fr_rp_listcode, fr_rp_groupcode, fr_rp_name, fr_rp_code, fr_uom_list, fr_uom_code, fr_typelistcode, fr_typecode, fr_brandlist,  fr_brandcode"
				+ "  FROM (SELECT   aa.VALUE, ar.fr_rp_listcode, ar.fr_rp_groupcode, ar.fr_rp_name, ar.fr_rp_code, ar.fr_uom_list, ar.fr_uom_code, ar.fr_typelistcode, "
				+ "                 ar.fr_typecode, ar.fr_brandlist, ar.fr_brandcode "
				+ "            FROM mfpdbo.hotelamenities aa, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.amenities_ref ar " + "           WHERE (    (hr.hotelrfpid = ha.hotelrfpid) "
				+ "                  AND (ha.hotelrfpid = aa.hotelrfpid) " + "                  AND (ar.amenityid = aa.amenityid) " + "                  AND (hr.hotelid = ?1 )"
				+ "                  AND (ha.accountrecid = ?2 )" + "                  AND (ar.fr_rp_listcode IS NOT NULL) "
				+ "                  AND (ar.fr_rp_listcode = '0203' AND ar.fr_rp_groupcode = '0001' AND ar.fr_rp_name = 'MPFD' AND ar.fr_rp_code = '0001') " + "                 ) "
				+ "        ORDER BY aa.VALUE DESC) " + " WHERE ROWNUM = 1 " + " UNION "
				+ " SELECT aa.VALUE amenityvalue, ar.fr_rp_listcode, ar.fr_rp_groupcode, ar.fr_rp_name, ar.fr_rp_code, ar.fr_uom_list, ar.fr_uom_code, ar.fr_typelistcode, "
				+ "        ar.fr_typecode, ar.fr_brandlist, ar.fr_brandcode " + "   FROM mfpdbo.hotelamenities aa, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.amenities_ref ar "
				+ "  WHERE (    (hr.hotelrfpid = ha.hotelrfpid) " + "         AND (ha.hotelrfpid = aa.hotelrfpid) " + "         AND (ar.amenityid = aa.amenityid) " + "         AND (hr.hotelid = ?1) "
				+ "         AND (ha.accountrecid = ?2) " + "         AND (ar.fr_rp_listcode IS NOT NULL) "
				+ "         AND NOT (ar.fr_rp_listcode = '0203' AND ar.fr_rp_groupcode = '0001' AND ar.fr_rp_name = 'MPFD' AND ar.fr_rp_code = '0001') "
				+ "			AND NOT (ar.fr_rp_listcode = '0204' AND ar.fr_rp_groupcode = '0000' AND ar.fr_rp_name = 'MPPI' AND ar.fr_rp_code = '0004') "
				+ "        )"
				+ " UNION "
				+ " SELECT decode(mfpproc.wifirewards_eligiblity(hr.hotelrfpid),'Y',decode(a.top_account,decode(hr.exempt_rewardswifi,'Y',aa.VALUE,'Y'),'Y',aa.VALUE), aa.VALUE) amenityvalue, ar.fr_rp_listcode, ar.fr_rp_groupcode, ar.fr_rp_name, ar.fr_rp_code, ar.fr_uom_list, ar.fr_uom_code, ar.fr_typelistcode," 
				+ " 		ar.fr_typecode, ar.fr_brandlist, ar.fr_brandcode "
				+ "   FROM mfpdbo.hotelamenities aa, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.amenities_ref ar,mfpdbo.account a " 
				+ "	 WHERE (    (hr.hotelrfpid = ha.hotelrfpid) "
				+ "			AND (ha.hotelrfpid = aa.hotelrfpid) "
				+ "			AND (ar.amenityid = aa.amenityid) "
				+ "			AND (hr.hotelid = ?1) " 
				+ "			AND (ha.accountrecid = ?2) "
				+ "			AND (ha.accountrecid = a.accountrecid)"
				+ "			AND (ar.fr_rp_listcode IS NOT NULL)"
				+ " 		AND (ar.fr_rp_listcode = '0204' AND ar.fr_rp_groupcode = '0000' AND ar.fr_rp_name = 'MPPI' AND ar.fr_rp_code = '0004'))"
				+ " UNION "
                + " SELECT 'N' amenityvalue, '0204' fr_rp_listcode, '0000' fr_rp_groupcode, 'MPPI' fr_rp_name, '0002' fr_rp_code, null fr_uom_list, null fr_uom_code, null fr_typelistcode, " 
                + "        null fr_typecode, null fr_brandlist, null fr_brandcode " 
                + "   FROM mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha "
                + "  WHERE (    (hr.hotelrfpid = ha.hotelrfpid) " 
                + "         AND (hr.hotelid = ?1 ) "
                + "         AND (ha.accountrecid = ?2 ) " 
                + "        ) "
				+ "  order by fr_rp_listcode, fr_rp_groupcode, fr_rp_name, fr_rp_code ";
		Query q = em.createNativeQuery(queryString, PGOOSProductAmenity.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountrecid);

		@SuppressWarnings("unchecked")
		List<PGOOSProductAmenity> pglist = q.getResultList();
		return pglist;

	}

	public long getHotelProductSize(long numver) {
		long start = (numver * 10);

		String queryString = null;

		queryString = " select count(*)   FROM mfpdbo.mcb_selection a";

		Query q = em.createNativeQuery(queryString, Long.class);
		Long hotelCount;
		try {
			hotelCount = (Long) q.getSingleResult();
			hotelCount -= start;
		} catch (NoResultException ex) {
			hotelCount = 0L;
		}
		return hotelCount;
	}

	public List<PGOOSAccountProduct> getLiveAccountProduct(long accountrecid) {
		String queryString = " SELECT a.period, a.accountrecid, a.product_id productid "
				+ "FROM mfpdbo.account a   WHERE a.accountrecid =?1 and product_id is  null and a.locked='Y' and mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}
	

	public List<PGOOSHotelAccountProduct> getLiveHotelProduct(long hotelid, long accountrecid) {
		String queryString = "SELECT DISTINCT ad.hotelid, h.marshacode, a.accountrecid, a.product_id productid, a.period, NVL (ad.amenity_diff, 'N') amenity_diff, "
				+ " mfpproc.fn_getisloadrateaer(ad.hotelid, a.accountrecid) isaer FROM mfpdbo.account a, mfpdbo.accountdirectory ad, mfpdbo.hotel h "
				+ "  WHERE     a.accountrecid = ad.accountrecid AND h.hotelid = ad.hotelid AND h.partition_idx = 'M' and h.hotelid=?1 and a.accountrecid=?2 "
				+ " and a.locked='Y' and mfpproc.fn_ishotelaccountpgoosable_hpp(h.hotelid, a.accountrecid)='Y' and nvl(ad.sendproduct,'Y')='Y' "
				+ " and mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) ";

		Query q = em.createNativeQuery(queryString, PGOOSHotelAccountProduct.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountrecid);
		@SuppressWarnings("unchecked")
		List<PGOOSHotelAccountProduct> product = q.getResultList();
		return product;
	}

	public List<PGOOSAccountProduct> getLiveVerifyAccountProduct(long accountrecid) {
		String queryString = null;
		queryString = " SELECT a.period, a.accountrecid, a.product_id productid " + "FROM mfpdbo.account a   WHERE  a.accountrecid =?1 and product_id is not null  and a.locked='Y' ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}

	public List<PGOOSAccountProduct> getRunMCBAccountProduct(String eid) {
		String queryString = "  SELECT  period, accountrecid, productid FROM (SELECT DISTINCT a.accountrecid, a.period, a.product_id productid"
				+ " FROM mfpdbo.mcb_selection mcb, mfpdbo.account a  WHERE mcb.accountrecid = a.accountrecid and ( mcb.eid = ?1 ) AND product_id IS NULL ) ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		q.setParameter(1, eid);
		@SuppressWarnings("unchecked")
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}

	public List<PGOOSHotelAccountProduct> getRunMCBHotelProduct(long numver) {

		long start = ((numver - 1) * 10) + 1;
		long end = (numver * 10);
		String queryString = " SELECT DISTINCT ad.hotelid, h.marshacode, a.accountrecid, a.product_id productid, a.period, "
				+ " DECODE( NVL(ad.amenities_exempt,'N'),'Y','N', NVL(ad.amenity_diff,'N'), 'N','N') amenity_diff, "
				+ " mfpproc.fn_getisloadrateaer(ad.hotelid, a.accountrecid) isaer FROM mfpdbo.account a, mfpdbo.accountdirectory ad, mfpdbo.hotel h, "
				+ " (select hotelid, accountrecid from (select hotelid, accountrecid, rownum anum from (select hotelid, accountrecid from mfpdbo.mcb_selection order by hotelid, accountrecid)) where anum>="
				+ start + " and anum<" + end + " ) mcb  WHERE     a.accountrecid = ad.accountrecid AND h.hotelid = ad.hotelid AND h.partition_idx = 'M'  "
				+ " AND mcb.hotelid = h.hotelid AND mcb.accountrecid = a.accountrecid AND ad.sendproduct = 'Y'  and mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) ";

		Query q = em.createNativeQuery(queryString, PGOOSHotelAccountProduct.class);
		@SuppressWarnings("unchecked")
		List<PGOOSHotelAccountProduct> product = q.getResultList();
		return product;
	}

	@SuppressWarnings("unchecked")
	public List<PGOOSAccountProduct> getRunMCBVerifyAccountProduct() {
		String queryString = null;
		queryString = " SELECT  MAX (period) period, MAX (accountrecid) accountrecid, product_id productid "
				+ " FROM (SELECT   a.period, a.accountrecid, a.product_id  FROM mfpdbo.ACCOUNT a, mfpdbo.mcb_selection mcb "
				+ " WHERE a.accountrecid = mcb.accountrecid AND a.product_id IS NOT NULL) group by product_id ";
		Query q = em.createNativeQuery(queryString, PGOOSAccountProduct.class);
		List<PGOOSAccountProduct> product = q.getResultList();
		return product;
	}

	public void setAccountProduct(String productCode, long accountrecid) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountproduct_hpp(?,?); end; ");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setString(2, productCode);
					stmt.execute();

				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void setHotelProduct(long batchid, Long transactionstatusid, long hotelid, long accountrecid, String status, String errorText, String amenitiesSet, String user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement stmt = con.prepareCall("{call mfpproc.pkg_pgoos_hpp.sp_updatestatus_proprod_hpp(?,?,?,?,?,?, ?, ?)}");

				try {
					stmt.setLong(1, batchid);
					if (transactionstatusid == null)
						stmt.setNull(2, Types.NUMERIC);
					else
						stmt.setLong(2, transactionstatusid);
					stmt.setString(3, status);
					stmt.setString(4, errorText);
					stmt.setString(5, amenitiesSet);
					stmt.setLong(6, hotelid);
					stmt.setLong(7, accountrecid);
					stmt.setString(8, user);
					stmt.execute();

				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void setHotelProduct(long action_id, String status, String errorText, String amenitiesSet, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("{call mfpproc.SP_UPDATE_PROPAGATESTATUS_PROD(?,?,?,?,?,?)}");

				try {
					stmt.setLong(1, action_id);
					stmt.setString(2, status);
					stmt.setString(3, errorText);
					stmt.setString(4, amenitiesSet);
					stmt.setBigDecimal(5, null);
					stmt.setBigDecimal(6, null);
					stmt.execute();

				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void updateCompareAmenityBatch() {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("{call mfpproc.pkg_pgoos_hpp.sp_compare_batchamenities()}");

				try {
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void updateCompareAmenitylive(long hotelid, long accountrecid) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("{call mfpproc.pkg_pgoos_hpp.sp_compare_liveamenities(?,?)}");

				try {
					stmt.setLong(1, hotelid);
					stmt.setLong(2, accountrecid);
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void updateCompareAmenityRunmcb(String eid) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("{call mfpproc.pkg_pgoos_hpp.sp_compare_runmcbamenities(?)}");

				try {
					stmt.setString(1, eid);
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}
}
