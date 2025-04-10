package com.marriott.rfp.dataacess.pricing.hotelrfprespondent.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondent;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondentEmails;


public interface HotelRFPRespondentManager {
	public void checkRFPRespondent(long hotelrfpid, String loginName);
	public HotelRFPRespondent getHotelRFPRespondent(long hotelrfpid);
	public List<HotelRFPRespondentEmails> getHotelRFPRespondentEmails(long respondentid);
	public long getHotelRFPRespondentId(long hotelrfpid) ;
	public void updateRFPRespondent(HotelRFPRespondent hotelRFPRespondent, String loginName);
	public void updateRFPRespondentEmails(HotelRFPRespondentEmails hotelRFPRespondentEmails, String loginName);
	public void updateBTflag(Long hotelrfpid, String acceptbtflg, String eid);
}
