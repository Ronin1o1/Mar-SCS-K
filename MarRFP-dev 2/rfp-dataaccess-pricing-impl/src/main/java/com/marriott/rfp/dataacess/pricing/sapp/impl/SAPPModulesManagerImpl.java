package com.marriott.rfp.dataacess.pricing.sapp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.sapp.api.SAPPModulesManager;
import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class SAPPModulesManagerImpl
 */
@Service
public class SAPPModulesManagerImpl implements SAPPModulesManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<SAPPModule> findSAPPModules(long accountrecid, User user) {
		String participate = findParticipateHotelFlag(user);
		if (participate.equals("U"))
			return null;
		String queryString = " SELECT   a.moduleid, a.modulename FROM mfpdbo.accountinfo_modules_ref a ";
		if (user.getIsSalesUser())
			queryString += "WHERE moduleid != 'N' or (moduleid in ('N','O') and EXISTS ( SELECT *  FROM mfpdbo.ACCOUNT a, mfpdbo.ds_group b, mfpdbo.ds_accountusers c, mfpdbo.ds_user d "
					+ " WHERE (c.accountid = a.accountid)  AND (b.ou_groupid = c.ou_groupid)  AND (d.cn_userid = c.cn_userid)  AND (LOWER (d.eid) = LOWER ('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "'))  AND (b.ou_group = 'MFPSALES') AND (a.accountrecid = " + accountrecid + "))) ";
		else if (user.getIsLimitedSalesUser()) {
			if (participate.equals("H") || participate.equals("A") || user.getEnhanced_Reporting().equals("Y"))
				queryString += "WHERE moduleid != 'N' ";
			else if (participate.equals("N"))
				queryString += "WHERE moduleid not in ('N','O') ";
			queryString += " or (moduleid in ('N','O') and EXISTS ( SELECT *  FROM mfpdbo.ACCOUNT a, mfpdbo.ds_group b, mfpdbo.ds_accountusers c, mfpdbo.ds_user d "
					+ " WHERE (c.accountid = a.accountid)  AND (b.ou_groupid = c.ou_groupid)  AND (d.cn_userid = c.cn_userid)  AND (LOWER (d.eid) = LOWER ('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "'))  AND (b.ou_group = 'MFPFSALE') AND (a.accountrecid = " + accountrecid + "))) ";
		} else if (user.getIsHotelUser()) {
			if (participate.equals("H") || user.getEnhanced_Reporting().equals("Y"))
				queryString += "WHERE moduleid != 'N'";
			else if (participate.equals("N"))
				queryString += "WHERE moduleid not in ('N','O')";

		}
		queryString += " ORDER BY moduleseq ";

		Query q = em.createNativeQuery(queryString, SAPPModule.class);
		@SuppressWarnings("unchecked")
		List<SAPPModule> sappmodulelist = q.getResultList();

		return sappmodulelist;
	}

	public String findParticipateHotelFlag(User user) {
		String queryString = "";
		String participate = "U";
		if (user.getIsAdminRole()) {
			participate = "Y";
		} else {
			if (user.getIsAnySalesUser()) {
				queryString = " SELECT DECODE (COUNT (*), 0, 'U', 'A') participate FROM mfpdbo.ACCOUNT a, mfpdbo.ds_accountusers c, mfpdbo.ds_user d "
						+ " WHERE (c.accountid = a.accountid)    AND (d.cn_userid = c.cn_userid)  AND (LOWER (d.eid) = LOWER ('" + StringUtility.replaceSingleQuotes(user.getEid()) + "')) ";
				Query q = em.createNativeQuery(queryString, String.class);
				try {
					participate = (String) q.getSingleResult();
				} catch (NoResultException ex) {
					participate = "U";
				}
			}
		}
		if (user.getIsLimitedSalesUser() || user.getIsHotelUser()) {
			queryString = " SELECT DECODE (count(*), 0, 'U', 'H')  participate FROM mfpdbo.ds_user d, mfpdbo.ds_propusers p, mfpdbo.hotel h  WHERE d.cn_userid = p.cn_userid AND (LOWER (d.eid) = LOWER ('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) AND (h.marshacode = p.marshacode)  ";
			Query q = em.createNativeQuery(queryString, String.class);
			String participate2 = "U";
			try {
				participate2 = (String) q.getSingleResult();
			} catch (NoResultException ex) {
				participate2 = "U";
			}
			if (!participate2.equals("U")) {
				queryString = " SELECT DECODE (count(*), 0, 'N', 'H')  participate FROM mfpdbo.ds_user d, mfpdbo.ds_propusers p, mfpdbo.hotel h  WHERE d.cn_userid = p.cn_userid AND (LOWER (d.eid) = LOWER ('"
						+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) AND (h.marshacode = p.marshacode)  and h.sfo_participate='Y' ";
				q = em.createNativeQuery(queryString, String.class);
				try {
					participate2 = (String) q.getSingleResult();
				} catch (NoResultException ex) {
					participate2 = "U";
				}
				if (user.getIsLimitedSalesUser()) {
					if (!participate2.equals("U")) {
						participate = participate2;
					}
				} else
					participate = participate2;
			} else if (user.getIsHotelUser())
				participate = participate2;

		}
		return participate;

	}

	public List<User> findGlobalContactsWithMyAccount(User user, boolean incMarriottContact) {

		String queryString = "SELECT DISTINCT  u.eid, u.cn_lastname || ', ' ||  u.cn_firstname fullname  FROM mfpdbo.ds_accountusers a, mfpdbo.ds_user u, "
				+ " mfpdbo.accountinfo_contacts ac, mfpdbo.accountinfo_bl_contacts blc " + " WHERE (a.ou_groupid in (281,530)) "
				+ " AND (a.cn_userid = u.cn_userid)  and (u.eid=ac.eid(+))  AND (u.eid=blc.eid(+)) ";
		if (incMarriottContact)
			queryString += " AND (ac.contacttypeid IN (1, 15) OR blc.contacttypeid in (26,27))   ";
		else
			queryString += " AND (ac.contacttypeid IN (1, 15)) ";

		queryString += " AND (u.cn_refresh != -1) ";

		if (user.getIsAnySalesUser())
			queryString += " AND a.accountid IN (SELECT a.accountid  FROM mfpdbo.ds_accountusers a, mfpdbo.ds_user u  WHERE a.cn_userid = u.cn_userid AND u.cn_refresh != -1 AND u.eid ='"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') ";
		queryString += " ORDER BY fullname ";

		Query q = em.createNativeQuery(queryString, User.class);
		@SuppressWarnings("unchecked")
		List<User> globalContacts = q.getResultList();

		return globalContacts;
	}
}
