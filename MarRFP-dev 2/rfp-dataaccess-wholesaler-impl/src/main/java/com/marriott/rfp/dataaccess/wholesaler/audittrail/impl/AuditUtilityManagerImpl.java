package com.marriott.rfp.dataaccess.wholesaler.audittrail.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class AuditUtilityManagerImpl {

    private long sid = -1;
    private String loginName = "";

    public AuditUtilityManagerImpl() {
    	super();
    }

    public AuditUtilityManagerImpl(String loginName) {
    	super();
    	this.loginName = loginName;
    }

    public void setAuditUser(Connection con) throws SQLException {

		String queryString = "select sid  from v$mystat where statistic# = 0";
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(queryString);
		if (rs.next()) sid = rs.getLong(1);
		rs.close();
		stmt.close();
		stmt = null;
		deleteAuditUser(con);
		CallableStatement stmt2;
		stmt2 = con.prepareCall("begin insert into mfpdbo.audit_user ( NAME , SID ) values (?,?); end; ");
		try {
		    stmt2.setString(1, loginName);
		    stmt2.setLong(2, sid);
		    stmt2.execute();
		} finally {
		    stmt2.close();
		    stmt2 = null;
		}
    }

    public void deleteAuditUser(Connection con) throws SQLException {
		CallableStatement stmt;
		if (loginName != "") {
		    stmt = con.prepareCall("begin delete from mfpdbo.audit_user where name is null; end; ");
		    try {
		    	stmt.execute();
		    } finally {
		    	stmt.close();
		    	stmt = null;
		    }
		}
		
		if (sid != -1) {
		    stmt = con.prepareCall("begin delete from mfpdbo.audit_user where sid=?; end; ");
		    try {
		    	stmt.setLong(1, sid);
		    	stmt.execute();
		    } finally {
		    	stmt.close();
		    	stmt = null;
		    }
		}
    }

}