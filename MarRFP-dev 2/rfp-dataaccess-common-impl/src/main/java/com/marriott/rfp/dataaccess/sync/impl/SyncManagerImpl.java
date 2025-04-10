package com.marriott.rfp.dataaccess.sync.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.sync.api.SyncManager;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class SyncManagerImpl implements SyncManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public SyncManagerImpl() {

	}

	public List<DSUser> getOracleUsers(String firstLetter, String secondLetter) {
		String queryString = "SELECT A.EID, A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_MAIL, A.CN_PHONE, A.CN_CITY, A.CN_STATE, A.CN_COUNTRY, C.OU_GROUP role, A.CN_REFRESH, A.COMPANYNAME "
				+ "FROM MFPDBO.DS_USER A, MFPDBO.DS_MEMBER B, MFPDBO.DS_GROUP C WHERE (B.CN_USERID=A.CN_USERID) AND (B.OU_GROUPID=C.OU_GROUPID) AND UPPER(SUBSTR(EID,1,2)) = '"
				+ StringUtility.replaceSingleQuotes(firstLetter) + StringUtility.replaceSingleQuotes(secondLetter) + "' ";
		Query q = em.createNativeQuery(queryString, DSUser.class);

		@SuppressWarnings("unchecked")
		List<DSUser> userList = q.getResultList();
		return userList;

	}

	public void updateUser(DSUser user, String orig_role) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_ds_addupdateuser(?,?,?,?,?,?,?,?,?,?,?,?); end; ");
				try {
					stmt.setString(1, user.getEid());
					stmt.setString(2, user.getCn_lastname());
					stmt.setString(3, user.getCn_firstname());
					stmt.setString(4, user.getCn_mail());
					stmt.setString(5, user.getCn_phone());
					stmt.setString(6, user.getCn_city());
					stmt.setString(7, user.getCn_state());
					stmt.setString(8, user.getCn_country());
					stmt.setString(9, user.getEid());
					stmt.setString(10, user.getCompanyname());
					stmt.setString(11, user.getRole());
					stmt.setString(12, orig_role);
					stmt.executeUpdate();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public void deleteUser(DSUser user, String orig_role) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_ds_deleteuser(?,?); end; ");
				try {
					stmt.setString(1, user.getEid());
					stmt.setString(2, orig_role);
					stmt.executeUpdate();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	public Hashtable<String, DSUser> getLdapUsers(String firstLetter, String secondLetter, String userid, String password, String LDAPserver) {
		try {
			@SuppressWarnings("rawtypes")
			Hashtable env = new Hashtable(11);
			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, LDAPserver);

			env.put(Context.SECURITY_PROTOCOL, "ssl");

			DirContext ctx = new InitialDirContext(env);
			Hashtable<String, DSUser> userDetails = new Hashtable<String, DSUser>();
			try {
				ctx.addToEnvironment(Context.SECURITY_PRINCIPAL, userid);
				ctx.addToEnvironment(Context.SECURITY_CREDENTIALS, password);
				String[] attrIDs = { "cn", "givenname", "mail", "secondaryEmail", "objectclass", "sn", "telephonenumber", "name", "rfprole", "adspath", "l", "st", "c", "employeestatus", "companyname" };

				SearchControls ctls = new SearchControls();
				ctls.setReturningAttributes(attrIDs);
				ctls.setReturningObjFlag(true);
				@SuppressWarnings("rawtypes")
				NamingEnumeration answer = ctx.search(LDAPserver + "??sub?(&(objectClass=marrapprfp)(&(!(employeestatus=-2))(rfprole=MFP*)(cn=" + firstLetter + secondLetter + "*)))", "", ctls);

				String eid, firstName, lastName, email, phone, city, state, country, role, companyname;
				while (answer.hasMore()) {
					DSUser model = new DSUser();
					SearchResult sr = (SearchResult) answer.next();
					Attributes attr = sr.getAttributes();

					role = getAttribute(attr, "rfprole");
					if (role != "") {
						model.setRole(role);

						eid = getAttribute(attr, "cn");
						model.setEid(eid);

						firstName = getAttribute(attr, "givenname");
						model.setCn_firstname(firstName);

						lastName = getAttribute(attr, "sn");
						model.setCn_lastname(lastName);

						email = getAttribute(attr, "mail");
						
						if(email != null && !email.trim().equals("")) {
							  model.setCn_mail(email);
							}else {
								email = getAttribute(attr, "secondaryEmail");							
								model.setCn_mail(email);							
							}

						phone = getAttribute(attr, "telephoneNumber");
						model.setCn_phone(phone);

						city = getAttribute(attr, "l");
						model.setCn_city(city);

						state = getAttribute(attr, "st");
						model.setCn_state(state);

						country = getAttribute(attr, "c");
						model.setCn_country(country);

						companyname = getAttribute(attr, "companyname");
						model.setCompanyname(companyname);

						userDetails.put(model.getEid(), model);
					}
				}
			} finally {
				ctx.close();
			}
			return userDetails;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	private String getAttribute(Attributes attr, String attrName) throws NamingException {
		Attribute attrValue;
		String strValue = "";

		attrValue = attr.get(attrName);
		if (attrValue != null)
			strValue = attrValue.get(0).toString();
		return strValue;
	}

}
