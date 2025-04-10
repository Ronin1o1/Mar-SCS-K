package com.marriott.rfp.business.sync.impl;

import java.util.Hashtable;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.sync.api.SyncService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.sync.api.SyncManager;
import com.marriott.rfp.object.user.DSUser;

/**
 * Session Bean implementation class InfoServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class SyncServiceImpl implements SyncService {

	@Autowired
	private SyncManager syncMgr = null;
	@Autowired
	private RFPConstantsManager constantsMgr = null;

	/**
	 * Default constructor.
	 */
	public SyncServiceImpl() {

	}

	public void Synchronize(String firstLetter, String secondLetter, String ldapserver, String ldapuser) {
		String password = constantsMgr.getLDAP_PWD();
		Hashtable<String, DSUser> ldapUsers = syncMgr.getLdapUsers(firstLetter, secondLetter, ldapuser, password, ldapserver);
		Hashtable<String, DSUser> oracleUsers = getOracleUsers(firstLetter, secondLetter);
		if (!oracleUsers.isEmpty())
			updatePhaseI(oracleUsers, ldapUsers);
		if (!ldapUsers.isEmpty())
			updatePhaseII(oracleUsers, ldapUsers);
	}

	private Hashtable<String, DSUser> getOracleUsers(String firstLetter, String secondLetter) {
		List<DSUser> oracleUserList = syncMgr.getOracleUsers(firstLetter, secondLetter);
		Hashtable<String, DSUser> oracleUsers = new Hashtable<String, DSUser>();
		if (oracleUserList != null) {
			for (DSUser user : oracleUserList) {
				oracleUsers.put(user.getEid(), user);
			}
		}
		return oracleUsers;
	}

	private void updatePhaseI(Hashtable<String, DSUser> oracleUsers, Hashtable<String, DSUser> ldapUsers) {
		for (Entry<String, DSUser> oracleuser : oracleUsers.entrySet()) {
			if (ldapUsers.containsKey(oracleuser.getKey())) {
				DSUser ldapUser = ldapUsers.get(oracleuser.getKey());
				DSUser oracleUser = (DSUser) oracleuser.getValue();
				if (!ldapUser.equals(oracleUser))
					syncMgr.updateUser(ldapUser, oracleUser.getRole());
			} else
				syncMgr.deleteUser(oracleuser.getValue(), oracleuser.getValue().getRole());
		}
	}

	private void updatePhaseII(Hashtable<String, DSUser> oracleUsers, Hashtable<String, DSUser> ldapUsers) {
		for (Entry<String, DSUser> ldapuser : ldapUsers.entrySet()) {
			String therole = null;
			if (oracleUsers.containsKey(ldapuser.getKey())) {
				DSUser oracleUser = oracleUsers.get(ldapuser.getKey());
				therole = oracleUser.getRole();
			}
			DSUser ldapUser = (DSUser) ldapuser.getValue();
			syncMgr.updateUser(ldapUser, therole);
		}
	}
}
