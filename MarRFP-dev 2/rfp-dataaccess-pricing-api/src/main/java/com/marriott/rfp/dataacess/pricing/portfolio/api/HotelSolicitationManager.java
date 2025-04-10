package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAddEmailInfo;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAvail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationEmail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationSelected;
import com.marriott.rfp.object.pricing.portfolio.SolicitSelect;
import com.marriott.rfp.object.pricing.sapp.Contacttype;
import com.marriott.rfp.object.user.User;

//
public interface HotelSolicitationManager {
	public Long findPriorYearAccount(long accountrecid, long period);

	public List<HotelSolicitationAvail> findAvailHotelSolicitation(PricingFilterSelections filterValues, User user);

	public List<HotelSolicitationSelected> findSelectedHotelSolicitation(PricingFilterSelections filterValues, User user);

	public String updateAccountSolicitationSelect(long accountrecid, List<SolicitSelect> solicitSelect, User user);

	public void updateAccountSolicitationAvail(long accountrecid, List<Long> solictAvail, User user);

	public HotelSolicitationEmail getEmailBodyData(Long accountrecid, Long hotelid, String addemailtext_screentype); 

	public List<String> getEmailBodyDataQuestions(Long accountrecid);

	public List<String> getEmailBodyDataRespondents(Long hotelid, Long period);

	public List<String> getEmailBodyDataRespondents2(Long hotelid, Long period, String addemailtext_screentype); 

	public Contact getEmailBodyDataSalesContact(Long hotelid, Long accountrecid);

	public Contact getEmailBodyDataMAESalesContact(Long hotelid, Long accountrecid);

	public void updateEmailSent(long accountrecid, long hotelid, boolean emailSent, User user,String mailType);

	public HotelSolicitationAddEmailInfo getAccountSolicitEmailAdditionalEmail(Long accountrecid, String addemailtext_screentype); 

	public void updateRebidEmailSent(long accountrecid, long hotelid, long period, boolean emailSent, User user); 
	
	public void updateResetRebidEmailSent(PricingFilterSelections filterValues); 
	
	public void updateHotelSolicitationAddEmailInfo(Long accountrecid, HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo, User user);

	public List<String> getEmailNotSent(PricingFilterSelections filterValues, String addemailtext_screentype); 

	public List<Contacttype> getEmailContactOptions(String addemailtext_screentype); 

	public Contacttype getEmailContactOption(Long accountrecid, String addemailtext_screentype); 
	
	public boolean isExistsAdditionalEmailInfo(long accountrecid, String addemailtext_screentype);
	
	public void deleteAdditionalEmailTextAndDate(Long accountrecid, String addemailtext_screentype, User user);
	
}
