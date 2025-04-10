package com.marriott.marrfp.batch.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import com.marriott.marrfp.batch.dao.HotelSolicitationManagerDao;
import com.marriott.marrfp.batch.core.Contact;
import com.marriott.marrfp.batch.core.HotelSolicitationEmail;
import com.marriott.marrfp.batch.core.RespondentEmail;
import com.marriott.marrfp.batch.core.AccountDetail;

public class HotelSolicitationManagerDaoImpl extends JdbcDaoSupport implements HotelSolicitationManagerDao{
	
	private static final Logger logger = Logger.getLogger(HotelSolicitationManagerDaoImpl.class);
	public HotelSolicitationEmail getEmailBodyData(Long accountrecid, Long hotelid, String addemailtext_screentype) throws SQLException {
		HotelSolicitationEmail hotelSolicitationEmail = new HotelSolicitationEmail();
		boolean isExists = isExistsAdditionalEmailInfo(accountrecid, addemailtext_screentype);
		String strDueDate = "";
		String addInfo = "";
		if(addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			strDueDate = "to_char(decode(ha.rebid_flag3,'Y',ha.rebid_due3, decode(ha.rebid_flag2,'Y',ha.rebid_due2,decode(ha.rebid_flag,'Y',ha.rebid_due,sysdate+5))),'fmDay, Month dd, yyyy') duedate, ";
		}
		
		if (isExists) {
			addInfo = "aaet.additional_text freeFormText, nvl(aaet.sendfromtype,1) sendfromtype  ";
			if (addemailtext_screentype.equalsIgnoreCase("S")) {
				strDueDate = "decode(to_char(DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail),'mm/dd/yyyy'), '12/31/9999','TBD', decode(to_char(DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail),'mm/dd/yyyy'), '01/01/9999','CBC Collection',TO_CHAR (DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail), 'fmDay, Month dd, yyyy'))) duedate, ";
			}
		}
		else { 
			addInfo = "null as freeFormText, 1 as sendfromtype  ";
			if (addemailtext_screentype.equalsIgnoreCase("S")) {
				strDueDate = "decode(to_char(pp.duedate,'mm/dd/yyyy'), '12/31/9999','TBD',decode(to_char(pp.duedate,'mm/dd/yyyy'), '01/01/9999','CBC Collection', TO_CHAR ( pp.duedate, 'fmDay, Month dd, yyyy'))) duedate, ";
			}
		}
		String queryString = "SELECT h.NAME hotelname, marshacode, accountname, a.period,  "
			+  strDueDate + "ai_g.url accounturl, "
			+ " ai_g.contactname globalContact, ai_g.contactemail globalContactEmail,  ai_b.contactname btamContact, ai_b.contactemail btamContactEmail, "
			+ " (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'CONTACT_EMAIL') adminEmail, (select constant_value from mfpdbo.rfp_constants where constant_name='CONTACT_NAME') adminName, a.accountpricingtype,  " + addInfo
			+ " FROM mfpdbo.ACCOUNT a,  mfpdbo.pricingperiod pp,  mfpdbo.pricingperiod_accounts ppa,  mfpdbo.hotel h, mfpdbo.account_addemailtext aaet, "
			+ " mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr, "
			+ " (SELECT ai.accountrecid, ai.url, aic.contactname, aic.contactemail "
			+ " FROM mfpdbo.accountinfo ai, mfpdbo.accountinfo_contacts aic "
			+ " WHERE ai.accountinfoid = aic.accountinfoid AND aic.contacttypeid = 1) ai_g, "
			+ " (SELECT ai.accountrecid, aic.contactname, aic.contactemail "
			+ " FROM mfpdbo.accountinfo ai, mfpdbo.accountinfo_contacts aic "
			+ " WHERE ai.accountinfoid = aic.accountinfoid AND aic.contacttypeid = 8) ai_b "
			+ " WHERE a.accountrecid = ppa.accountrecid(+)  AND pp.pricingperiodid(+) = ppa.pricingperiodid  AND a.accountrecid = ai_g.accountrecid(+)  AND a.accountrecid = ai_b.accountrecid(+)  AND a.accountrecid = aaet.accountrecid(+) "
			+ " and h.hotelid = hr.hotelid and a.accountrecid = ha.accountrecid and a.period = hr.period and ha.hotelrfpid = hr.hotelrfpid"
			+ "  AND a.hotel_display='Y' AND  a.accountrecid =  ? AND h.hotelid =?";
			if (isExists) {
				queryString += " and aaet.addemailtext_screentype=? ";	
			}
		try {
			if (isExists) {
				hotelSolicitationEmail = (HotelSolicitationEmail) getJdbcTemplate().queryForObject(queryString, new Object[] { accountrecid, hotelid , addemailtext_screentype },  new BeanPropertyRowMapper<HotelSolicitationEmail>(HotelSolicitationEmail.class) );
			}
			else {
				hotelSolicitationEmail = (HotelSolicitationEmail) getJdbcTemplate().queryForObject(queryString, new Object[] { accountrecid, hotelid },  new BeanPropertyRowMapper<HotelSolicitationEmail>(HotelSolicitationEmail.class) );
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotelSolicitationEmail;
	}
	
	public boolean isExistsAdditionalEmailInfo(long accountrecid, String addemailtext_screentype) {
		boolean isExists = false;
		Long count = null;
		String sql = "SELECT COUNT(*) FROM MFPDBO.ACCOUNT_ADDEMAILTEXT WHERE ACCOUNTRECID= ? AND ADDEMAILTEXT_SCREENTYPE=?";
			
		try {
			count = (Long) getJdbcTemplate().queryForObject(sql, new Object[] { accountrecid, addemailtext_screentype }, Long.class );
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (count > 0) {
			isExists = true;
		}
		return isExists;
	}
	
	public List<String> getEmailBodyDataQuestions(Long accountrecid) {
		List<String> questions = null;
		String queryString = "SELECT   question   FROM mfpdbo.account_specific_questions asq   WHERE asq.accountrecid = ? ORDER BY question_seq";
		try {
			questions = getJdbcTemplate().query(queryString, new Object[] { accountrecid }, new BeanPropertyRowMapper<String>(String.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return questions;
	}

	public List<String> getEmailBodyDataRespondents(Long hotelid, Long period) {
		
		List<String> respondents = null;
		String queryString = "SELECT trim(hrr.email)  FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelrfp_respondent hrr "
				+ " WHERE h.hotelid = hr.hotelid AND hr.hotelrfpid = hrr.hotelrfpid AND h.hotelid = ? AND period =?";
		try {
			respondents = getJdbcTemplate().queryForList(queryString, new Object[] { hotelid, period }, (String.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return respondents;
	}

	public List<String> getEmailBodyDataRespondents2(Long hotelid, Long period, String addemailtext_screentype) {
		List<String> respondents = null;
		String rfpcontactsfilter = "";
		if (addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			rfpcontactsfilter = "and hrre.emailtypeid in ('1') ";
		}
		String queryString = "SELECT hrre.email " + " FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelrfp_respondent hrr, mfpdbo.hotelrfp_res_emails hrre "
				+ " WHERE h.hotelid = hr.hotelid(+) and hr.hotelrfpid=hrr.hotelrfpid(+) " + " and hrr.rfprespondentid=hrre.rfprespondentid(+)AND h.hotelid =? and period=? "
				+ " and hrre.email is not null " + rfpcontactsfilter + " and hrre.emailtypeid not in ('4') " + "ORDER BY emailtypeid ";
		try {
			respondents =  getJdbcTemplate().queryForList(queryString, new Object[] { hotelid, period }, (String.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return respondents;
	}
	
	public List<RespondentEmail> getEmailBodyDataRespondents3(Long hotelid, Long period, String addemailtext_screentype) {
		List<RespondentEmail> respondents = null;
		String rfpcontactsfilter = "";
		if (addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			rfpcontactsfilter = "and hrre.emailtypeid in ('1') ";
		}
		String queryString = "SELECT hrre.email, hrre.emailtypeid " + " FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelrfp_respondent hrr, mfpdbo.hotelrfp_res_emails hrre "
				+ " WHERE h.hotelid = hr.hotelid(+) and hr.hotelrfpid=hrr.hotelrfpid(+) " + " and hrr.rfprespondentid=hrre.rfprespondentid(+)AND h.hotelid =? and period=? "
				+ " and hrre.email is not null " + rfpcontactsfilter + " and hrre.emailtypeid not in ('4') " + "ORDER BY emailtypeid ";
		try {
			respondents =  getJdbcTemplate().query(queryString, new Object[] { hotelid, period }, new BeanPropertyRowMapper<RespondentEmail>(RespondentEmail.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return respondents;
	}


	public Contact getEmailBodyDataSalesContact(Long hotelid, Long accountrecid) {
		Contact salescontact = null;
		String queryString = "SELECT mfpproc.fn_getsalesname (hr.hotelrfpid, h.marshacode, ha.accountrecid) contactname, "
				+ " mfpproc.fn_getsalesemail (hr.hotelrfpid, h.marshacode, ha.accountrecid) contactemail "
				+ " FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha  WHERE h.hotelid = hr.hotelid(+) "
				+ " AND hr.hotelrfpid = ha.hotelrfpid(+)  AND h.hotelid =?  AND ha.accountrecid =?";
		
		try {
		salescontact = getJdbcTemplate().queryForObject(queryString, new Object[] { hotelid, accountrecid }, new BeanPropertyRowMapper<Contact>(Contact.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return salescontact;
	}

	public Contact getEmailBodyDataMAESalesContact(Long hotelid, Long accountrecid) {
		Contact salescontact = null;
		String queryString = "SELECT sr.personname contactname, sr.email contactemail FROM mfpdbo.ACCOUNT a, mfpdbo.salesresp_prim_htlacct srph, "
				+ " mfpdbo.sales_respondent sr, mfpdbo.hotel h WHERE (sr.salesrespondentid = srph.salesrespondentid) "
				+ " AND (srph.accountid = a.accountid) AND srph.marshacode = h.marshacode AND (a.accountrecid = ? " + ") AND h.hotelid = ? ";
		
		try {
		salescontact = getJdbcTemplate().queryForObject(queryString, new Object[] { accountrecid, hotelid }, new BeanPropertyRowMapper<Contact>(Contact.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return salescontact;
	}

	public void updateEmailSentBatch(long accountrecid, long hotelid, boolean emailSent, String eid , String mailType) {

		CallableStatement stmt = null;
			Connection con = (Connection) getConnection();
			try {
				stmt = con.prepareCall("begin  mfpproc.sp_update_acct_solicit_email (?,?,?,?); end; ");
				
					stmt.setLong(1, accountrecid);
					stmt.setLong(2, hotelid);
					if(mailType.equals("sendemail")){
						stmt.setString(3, ((emailSent) ? "Y" : "P"));
						stmt.setString(4, "N");
					}else{
						stmt.setString(3, "N");
						stmt.setString(4, ((emailSent) ? "Y" : "P"));
					}
					stmt.execute();
				 
			} catch (SQLException ex) {
				ex.printStackTrace();
			} finally {

				try {
					if (stmt != null) {
						stmt.close();
					}
					if (con != null) {
						con.close();
					}
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
			}	}
	
	public String getConstantsDetails(String constant_name) {
		String value = null;
		String queryString = "select c.constant_value from mfpdbo.RFP_Constants c where c.constant_name= ? ";
		try {
			value = getJdbcTemplate().queryForObject(queryString, new Object[] { constant_name }, (String.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
	
	public AccountDetail getAccountHotelDetail(Long accountrecid, Long hotelid) {
		AccountDetail accountDetail = null;
		String queryString = "select a.ACCOUNTNAME, h.MARSHACODE from MFPDBO.ACCOUNT a, MFPDBO.HOTEL h where a.ACCOUNTRECID = ? and h.hotelid =?";
		
		try {
			accountDetail = getJdbcTemplate().queryForObject(queryString, new Object[] { accountrecid, hotelid }, new BeanPropertyRowMapper<AccountDetail>(AccountDetail.class) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return accountDetail;
	}
	
	public void updateChaseEmailMissingData(Long accountrecid, Long hotelid, String datamissing, Long batchid, String emailSent) {
		String sql = "update  mfpdbo.CHASEEMAIL_BATCH_STAGE  set STATUS=?, EMAILSENT=? where batchid=? and ACCOUNTRECID=? and hotelid=?";
		
		try {
			getJdbcTemplate().update(sql, new Object[] { datamissing, emailSent, batchid, accountrecid, hotelid});	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}