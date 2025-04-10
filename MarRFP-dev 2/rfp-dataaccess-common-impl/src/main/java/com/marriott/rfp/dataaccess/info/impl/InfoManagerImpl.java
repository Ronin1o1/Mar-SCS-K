package com.marriott.rfp.dataaccess.info.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;
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

import com.marriott.rfp.dataaccess.info.api.InfoManager;
import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class InfoManagerImpl
 */
@Service
public class InfoManagerImpl implements InfoManager {
	private static final Logger log = LoggerFactory.getLogger(InfoManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public InfoManagerImpl() {

	}

	public List<GeneralInfo> getAllGeneralInfoList() {
		Query query = em.createNativeQuery(
				"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg  FROM mfpdbo.rfp_general_info a   order by a.infodate desc",
				GeneralInfo.class);
		@SuppressWarnings("unchecked")
		List<GeneralInfo> resultList = query.getResultList();
		return resultList;
	}

	public List<GeneralInfo> getGeneralInfoList() {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg  FROM mfpdbo.rfp_general_info a where a.infoexpiredate>=trunc(sysdate) and infodate<=trunc(sysdate)  order by a.infodate desc",
						GeneralInfo.class);
		@SuppressWarnings("unchecked")
		List<GeneralInfo> resultList = query.getResultList();
		return resultList;
	}

	public void deleteGeneralInfo(Long infoid) {
		Query query = em.createNativeQuery("delete from mfpdbo.rfp_general_info where infoid=?1");
		query.setParameter(1, infoid);
		query.executeUpdate();
	}

	public GeneralInfo getGeneralInfo(Long infoid) {
		Query query = em.createNativeQuery(
				"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg  FROM mfpdbo.rfp_general_info a where a.infoid=?1",
				GeneralInfo.class);
		query.setParameter(1, infoid);
		GeneralInfo resultList = (GeneralInfo) query.getSingleResult();
		return resultList;
	}

	public void updateGeneralInfo(GeneralInfo info) {
		Query query = em.createNativeQuery("{call mfpproc.sp_updategeneralnews (?, ?, ?, ?,?)}");
		query.setParameter(1, info.getInfoid());
		query.setParameter(2, info.getInfodate());
		query.setParameter(3, info.getInfotitle());
		query.setParameter(4, info.getInfomsg());
		query.setParameter(5, info.getInfoexpiredate());
		query.executeUpdate();
	}

	public List<RFPInfo> getInfoList(Long infotypeid) {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotype  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b where a.infotypeid=b.infotypeid and a.infotypeid=?1 order by a.infodate desc",
						RFPInfo.class);
		query.setParameter(1, infotypeid);
		@SuppressWarnings("unchecked")
		List<RFPInfo> resultList = query.getResultList();
		return resultList;
	}

	public List<RFPInfo> getInfoPricingList() {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotype, mfpproc.fn_getdistroroles(a.infoid)  groups  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b where a.infotypeid=b.infotypeid and a.infotypeid=1 order by a.infodate desc",
						RFPInfo.class);
		@SuppressWarnings("unchecked")
		List<RFPInfo> resultList = query.getResultList();
		return resultList;
	}

	public List<RFPInfo> getInfoListForRole(User user) {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotype  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b,mfpdbo.rfp_info_distro_roles r, mfpdbo.ds_group dg"
								+ " where a.infotypeid=b.infotypeid and r.infoid=a.infoid and r.ou_groupid=dg.ou_groupid and dg.ou_group=?1 and a.infoexpiredate >= TRUNC( SYSDATE ) AND infodate <= TRUNC( SYSDATE ) order by a.infodate desc",
						RFPInfo.class);
		query.setParameter(1, user.getRole());
		@SuppressWarnings("unchecked")
		List<RFPInfo> resultList = query.getResultList();
		return resultList;
	}

	public List<RFPInfo> getInfoListForUser(User user) {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotype  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b,mfpdbo.rfp_info_user r, mfpdbo.ds_user du"
								+ " where a.infotypeid=b.infotypeid and r.infoid=a.infoid and r.cn_userid=du.cn_userid and lower(du.eid) = lower(?1) and a.infoexpiredate >= TRUNC( SYSDATE ) AND infodate <= TRUNC( SYSDATE ) order by a.infodate desc",
						RFPInfo.class);
		query.setParameter(1, user.getEid());
		@SuppressWarnings("unchecked")
		List<RFPInfo> resultList = query.getResultList();
		return resultList;
	}

	public void deleteInfoUser(User user, Long infoid) {
		Query query = em
				.createNativeQuery("delete from mfpdbo.rfp_info_user where infoid=? and cn_userid in (select cn_userid from mfpdbo.ds_user where lower(eid)=lower(?2)) ");
		query.setParameter(1, infoid);
		query.setParameter(2, user.getEid());
		query.executeUpdate();
	}

	public void deleteInfo(Long infoid) {
		Query query = em.createNativeQuery("delete from mfpdbo.rfp_info where infoid=?1");
		query.setParameter(1, infoid);
		query.executeUpdate();
	}

	public RFPInfo getInfo(Long infoid) {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotypeid  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b where a.infotypeid=b.infotypeid(+) and a.infoid=?1",
						RFPInfo.class);
		query.setParameter(1, infoid);
		RFPInfo resultList = null;
		try {
			resultList = (RFPInfo) query.getSingleResult();
		} catch (NoResultException ex) {

		}
		return resultList;
	}

	public RFPInfo getPricingInfo(Long infoid) {
		Query query = em
				.createNativeQuery(
						"SELECT a.infoid, a.infodate, a.infoexpiredate, a.infotitle, a.infomsg, b.infotypeid  FROM mfpdbo.rfp_info a, mfpdbo.rfp_info_type_ref b where a.infotypeid=b.infotypeid(+) and a.infoid=?1",
						RFPInfo.class);
		query.setParameter(1, infoid);
		RFPInfo resultList = null;
		try {
			resultList = (RFPInfo) query.getSingleResult();
			String sql = " SELECT dg.ou_group  FROM mfpdbo.rfp_info_distro_roles c, mfpdbo.ds_group dg "
					+ " WHERE c.ou_groupid = dg.ou_groupid AND infoid =?1 order by ou_group";
			Query query2 = em.createNativeQuery(sql, String.class);
			query2.setParameter(1, infoid);
			@SuppressWarnings("unchecked")
			List<String> roles = query2.getResultList();
			resultList.setRoles(roles);
		} catch (NoResultException ex) {

		}
		return resultList;
	}

	public void updateRDInfo(RFPInfo info) {
		Query query = em.createNativeQuery("{call mfpproc.sp_updateroomdefnews (?, ?, ?, ?,?)}");
		query.setParameter(1, info.getInfoid());
		query.setParameter(2, info.getInfodate());
		query.setParameter(3, info.getInfotitle());
		query.setParameter(4, info.getInfomsg());
		query.setParameter(5, info.getInfoexpiredate());
		query.executeUpdate();
	}

	public void updateWSInfo(RFPInfo info) {
		Query query = em.createNativeQuery("{call mfpproc.sp_ws_updatenews (?, ?, ?, ?,?)}");
		query.setParameter(1, info.getInfoid());
		query.setParameter(2, info.getInfodate());
		query.setParameter(3, info.getInfotitle());
		query.setParameter(4, info.getInfomsg());
		query.setParameter(5, info.getInfoexpiredate());
		query.executeUpdate();
	}

	public void updatePricingInfo(RFPInfo info) {

		String isNew = "N";
		Long infoid=0L;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_updatepricingnews (?, ?, ?, ?,?,?)}");
				try {
					cstmt.registerOutParameter(1, Types.NUMERIC);
					cstmt.registerOutParameter(6, Types.VARCHAR);
					if (info.getInfoid() == null || info.getInfoid().equals(""))
						cstmt.setNull(1, Types.NUMERIC);
					else
						cstmt.setLong(1, info.getInfoid());
					if (info.getInfodate() == null || info.getInfodate().equals(""))
						cstmt.setDate(2, null);
					else
						cstmt.setDate(2, (Date) new Date(info.getInfodate().getTime()));
					cstmt.setString(3, info.getInfotitle());
					cstmt.setString(4, info.getInfomsg());
					if (info.getInfoexpiredate() == null || info.getInfoexpiredate().equals(""))
						cstmt.setDate(5, null);
					else
						cstmt.setDate(5, (Date) new Date(info.getInfoexpiredate().getTime()));

					cstmt.execute();

					isNew = cstmt.getString(6);
					infoid=cstmt.getLong(1);

				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
				cstmt = con.prepareCall("{call mfpproc.sp_updatepricingnewsroles (?, ?, ?)}");
				try {
					cstmt.setLong(1, infoid);
					cstmt.setString(3, isNew);
					for (String role : info.getRoles()) {
						cstmt.setString(2, role);
						cstmt.execute();
					}
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
			
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

		String sql = "DELETE FROM mfpdbo.rfp_info_user  WHERE info_userid IN ( SELECT riu.info_userid "
				+ " FROM mfpdbo.rfp_info_user riu,  mfpdbo.ds_user du,  mfpdbo.ds_member dm,  mfpdbo.ds_group dg "
				+ " WHERE     riu.cn_userid = du.cn_userid  AND du.cn_userid = dm.cn_userid  AND dm.ou_groupid = dg.ou_groupid "
				+ " AND dg.ou_group NOT IN (" + info.getStringRoles() + ") " + " AND riu.infoid = " + info.getInfoid() + " )";
		Query q = em.createNativeQuery(sql);
		q.executeUpdate();
		sql = "DELETE FROM mfpdbo.rfp_info_distro_roles  WHERE infodistid IN (SELECT infodistid "
				+ "  FROM mfpdbo.rfp_info_distro_roles ridr, mfpdbo.ds_group dg  WHERE ridr.ou_groupid = dg.ou_groupid "
				+ " AND dg.ou_group NOT IN (" + info.getStringRoles() + ") " + " AND ridr.infoid = " + info.getInfoid() + " )";
		q = em.createNativeQuery(sql);
		q.executeUpdate();

	}
	
	public String getCam_passport_url() {
		String queryString = "select c.constant_value from mfpdbo.RFP_Constants c where c.constant_name= ?1 ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, "CAM_PASSPORT_URL");
		String value;
		try {
			value = (String) q.getSingleResult();
		} catch (Exception ex) {
			value = null;
		}
		return value;
	}
}
