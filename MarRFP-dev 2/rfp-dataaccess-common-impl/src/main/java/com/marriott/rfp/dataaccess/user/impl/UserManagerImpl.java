package com.marriott.rfp.dataaccess.user.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.user.api.UserManager;
import com.marriott.rfp.object.mainmenu.MainMenu;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfo;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.Role;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.user.UserPrefs;

/**
 * Session Bean implementation class UserManagerImpl
 */
@Service

public class UserManagerImpl implements UserManager {
	@PersistenceContext(unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public UserManagerImpl() {

	}

	@SuppressWarnings("unchecked")
	public User findUser(String eid) {
		String queryString = "select eid, cn_firstname || ' ' || cn_lastname fullname, ou_group role, enhanced_reporting, du.cn_mail email, du.cn_phone phone  "
				+ " from mfpdbo.ds_user du, mfpdbo.ds_member dm, mfpdbo.ds_group dg "
				+ " where du.cn_userid=dm.cn_userid and dm.ou_groupid=dg.ou_groupid and lower(du.eid)=lower(?1) and du.cn_refresh=5";
		Query q = em.createNativeQuery(queryString, User.class);
		q.setParameter(1, eid);
		User u = null;
		try {
			u = (User) q.getSingleResult();
		} catch (NoResultException e) {
			u = null;
		}
		if (u != null) {
			Query query = em.createNativeQuery(
					"select rm.menuid from mfpdbo.rfp_menu rm, mfpdbo.rfp_menu_access rma where rm.menuid=rma.menuid and role=?1 and (enhanced_only=?2 or enhanced_only='N')", MainMenu.class);
			query.setParameter(1, u.getRole());
			query.setParameter(2, u.getEnhanced_Reporting());
			List<MainMenu> menus = query.getResultList();
			
			HashMap<String, MainMenu> usermenu = u.getMenus();
			for (int i = 0; i < menus.size(); i++) {
				// MainMenu m = new MainMenu();
				// m.setMenuid(menus.get(i).getMenuid());
				usermenu.put(String.valueOf(menus.get(i).getMenuid()), menus.get(i));
			}
			u.setMenus(usermenu);

			// check to make sure the monitoring eid is not forced to update
			// terms
			// or contact info
			String monitoreid = (String) em.createNativeQuery("select constant_value from mfpdbo.rfp_constants where constant_name='IGNORE_TERMS_ID'").getSingleResult();
			if (!monitoreid.equals(u.getEid().toLowerCase())) {
				String agreeterms = (String) em.createNativeQuery("SELECT mfpproc.fn_get_termsagreed(eid)  FROM mfpdbo.ds_user where lower(eid) = lower(?1)").setParameter(1, eid).getSingleResult();
				if (agreeterms.equalsIgnoreCase("true"))
					u.setAgreedtoTerms(true);
				String sql = "";
				if (u.getRole().equals("MFPADMIN"))
					sql = "SELECT mfpproc.fn_adminupdate (b.last_updatedate) FROM mfpdbo.admin_respondent b WHERE upper(EID)=upper(?1)";
				else if (u.getRole().equals("MFPUSER"))
					sql = "SELECT mfpproc.fn_salesupdate (b.last_updatedate) FROM mfpdbo.hoteluser_respondent b WHERE upper(EID)=upper(?1)";
				else if (u.getRole().equals("MFPSALES") || u.getRole().equals("MFPFSALE"))
					sql = "SELECT   mfpproc.fn_salesupdate(b.last_updatedate)  FROM   MFPDBO.SALES_RESPONDENT B  WHERE upper(EID)=upper(?1)";
				if (!sql.equals("")) {
					String updateContactInfo;

					try {
						updateContactInfo = (String) em.createNativeQuery(sql).setParameter(1, eid).getSingleResult();
					} catch (NoResultException ex) {
						updateContactInfo = "Y";
					}
					if (updateContactInfo == null || updateContactInfo.equalsIgnoreCase("Y"))
						u.setUpdateContactInfo(true);
				}
			} else {
				u.setAgreedtoTerms(true);
			}
		}
		return u;
	}

	public boolean verifyUserHotelAccess(String marshacode, User user) {
		String queryString = "select count(*) from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_propusers dp "
				+ " where du.cn_userid=dp.cn_userid and dp.marshacode=h.marshacode and h.partition_idx='M' and h.marshacode=?1 and lower(du.eid)=lower(?2) ";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, marshacode);
		q.setParameter(2, user.getEid());
		Long numAccess = (Long) q.getSingleResult();
		return numAccess > 0;
	}

	public boolean verifyUserHotelAccess(long hotelid, User user) {
		String queryString = "select count(*) from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_propusers dp "
				+ " where du.cn_userid=dp.cn_userid and dp.marshacode=h.marshacode and h.partition_idx='M' and h.hotelid=?1 and lower(du.eid)=lower(?2) ";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, user.getEid());
		Long numAccess = (Long) q.getSingleResult();
		return numAccess > 0;
	}

	public boolean verifyUserAccountAccess(long accountrecid, User user) {
		String queryString = "select count(*) from mfpdbo.account a, mfpdbo.ds_user du, mfpdbo.ds_accountusers da "
				+ " where du.cn_userid=da.cn_userid and da.accountid=a.accountid and  a.accountrecid=?1 and lower(du.eid)=lower(?2) ";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, user.getEid());
		Long numAccess = (Long) q.getSingleResult();
		return numAccess > 0;
	}

	public boolean verifyUserHotelAccountinfoidAccess(long hotel_accountinfoid, User user) {
		String queryString = "select hr.hotelid, ha.accountrecid from mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr " + " where ha.hotelrfpid=hr.hotelrfpid and ha.hotel_accountinfoid=?1 ";
		Query q = em.createNativeQuery(queryString, HotelAccountInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountInfo ha = (HotelAccountInfo) q.getSingleResult();

		boolean hasPermission = true;
		if (user.getHasLimitedHotels())
			hasPermission = verifyUserHotelAccess(ha.getHotelid(), user);
		if (hasPermission && user.getHasLimitedAccounts())
			hasPermission = verifyUserAccountAccess(ha.getAccountrecid(), user);
		return hasPermission;
	}

	public void acceptTerms(String eid) {
		Query q = em.createNativeQuery("UPDATE mfpdbo.ds_user SET terms_app_date = SYSDATE WHERE LOWER (eid) = LOWER (?1)");
		q.setParameter(1, eid);
		q.executeUpdate();
	}

	public List<Role> getRoles() {
		String queryString = "select ou_group role from mfpdbo.ds_group where ou_group like 'MFP%' and ou_group not in ('MFPWSADM' , 'MFPPPADM', 'MFPFSALES', 'MFPFUSER', 'MFPSALE') order by ou_group asc ";
		Query q = em.createNativeQuery(queryString, Role.class);
		@SuppressWarnings("unchecked")
		List<Role> rolelist = q.getResultList();
		return rolelist;
	}

	@SuppressWarnings("unchecked")
	public List<DSUser> getAccountPlanUserList(long accountrecid) {

		String queryString = "SELECT  A.EID ,A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_LASTNAME||','||A.CN_FIRSTNAME NAME "
				+ "FROM MFPDBO.DS_USER A , MFPDBO.DS_MEMBER B,MFPDBO.DS_ACCOUNTUSERS C,MFPDBO.ACCOUNT D, MFPDBO.DS_GROUP E " + "WHERE (B.CN_USERID = A.CN_USERID) "
				+ "AND (B.OU_GROUPID = E.ou_groupid) " + "AND (E.ou_group  in ('MFPSALES','MFPFSALE')) " + "AND (B.cn_userid = C.cn_userid) " + "AND (B.ou_groupid = C.ou_groupid) "
				+ "AND (A.CN_REFRESH != -1) " + "AND D.accountid = c.accountid " + "AND (D.accountrecid = ?1) ";

		Query q = em.createNativeQuery(queryString, DSUser.class);
		q.setParameter(1, accountrecid);
		List<DSUser> acctPlanUserList = q.getResultList();
		return acctPlanUserList;

	}

	public UserPrefs getUserHomePagePref(User user) {
		String queryString = "select eid, marshacode from mfpdbo.ds_userpref where eid=lower(?1) and rownum=1 ";
		Query q = em.createNativeQuery(queryString, UserPrefs.class);
		UserPrefs up = null;
		try {
			q.setParameter(1, user.getEid());
			up = (UserPrefs) q.getSingleResult();
		} catch (NoResultException ex) {
			up = new UserPrefs();
			up.setEid(user.getEid());
			queryString = "select marshacode from (select  h.marshacode ";
			if (user.getHasLimitedHotels()) {
				queryString += "from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_group dg, mfpdbo.ds_propusers dpu "
						+ " where lower(du.eid)=lower(?1) and dg.ou_group in ('MFPUSER', 'MFPFSALE') and dpu.cn_userid=du.cn_userid and dpu.ou_groupid=dg.ou_groupid and "
						+ " dpu.marshacode = h.marshacode and partition_idx='M' ";
			} else {
				queryString += " from mfpdbo.hotel h where (marshacode >='A') and h.partition_idx in ('M' ";

				queryString += ") ";
			}

			queryString += " order by h.marshacode ASC) where rownum=1 ";
			q = em.createNativeQuery(queryString, String.class);

			if (user.getHasLimitedHotels())
				q.setParameter(1, user.getEid());
			try {
				String marshaCode = (String) q.getSingleResult();
				up.setMarshaCode(marshaCode);
			} catch (NoResultException e) {

			}
		}

		return up;
	}

	public void updateUserPrefs(UserPrefs userPrefs, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			//Connection con = (Connection) kem.unwrap(Connection.class);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_update_userprefs(?, ?)}");
				try {
					cstmt.setString(1, user.getEid());
					cstmt.setString(2, userPrefs.getMarshaCode());
					cstmt.execute();
				} finally {
					cstmt.close();
				}
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}

	}
	public void updateLoginDate(String eid) {
		Query q = em.createNativeQuery("UPDATE mfpdbo.ds_user SET login_date = SYSDATE WHERE LOWER (eid) = LOWER (?1)");
		q.setParameter(1, eid);
		q.executeUpdate();
	}
	
}
