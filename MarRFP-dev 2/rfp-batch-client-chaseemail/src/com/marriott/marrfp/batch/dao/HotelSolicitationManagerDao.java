package com.marriott.marrfp.batch.dao;

import java.sql.SQLException;
import java.util.List;

import com.marriott.marrfp.batch.core.Contact;
import com.marriott.marrfp.batch.core.HotelSolicitationEmail;
import com.marriott.marrfp.batch.core.RespondentEmail;
import com.marriott.marrfp.batch.core.AccountDetail;

public interface HotelSolicitationManagerDao {

	public HotelSolicitationEmail getEmailBodyData(Long accountrecid, Long hotelid, String addemailtext_screentype) throws SQLException;

	public boolean isExistsAdditionalEmailInfo(long accountrecid, String addemailtext_screentype);

	public void updateEmailSentBatch(long accountrecid, long hotelid, boolean emailSent, String user,String mailType);

	public List<String> getEmailBodyDataQuestions(Long accountrecid);

	public List<String> getEmailBodyDataRespondents(Long hotelid, Long period);

	public List<String> getEmailBodyDataRespondents2(Long hotelid, Long period, String addemailtext_screentype); 

	public Contact getEmailBodyDataSalesContact(Long hotelid, Long accountrecid);

	public Contact getEmailBodyDataMAESalesContact(Long hotelid, Long accountrecid);

	public String getConstantsDetails(String constant_name);
	
	public AccountDetail getAccountHotelDetail(Long accountrecid, Long hotelid);

	public void updateChaseEmailMissingData(Long accountrecid, Long hotelid, String datamissing, Long batchid, String emailSent);
	
	public List<RespondentEmail> getEmailBodyDataRespondents3(Long hotelid, Long period, String addemailtext_screentype);
}
