package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfoQuestionStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.user.User;


public interface HotelAccountSpecQuestionsManager {
	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetail(long hotel_accountinfoid);

	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetail(long hotel_accountinfoid);

	public HotelAccountInfoQuestionStatus findAccountSpecQuestionsModifiable(long hotel_accountinfoid);
	
	public void updateAccountSpecAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user) ;
	
	public void updateAccountSpecGroupAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user);
	
	//GBTA-4 Questions not editable functionality
	public Long getHotelAccountProductInfo(long hotel_accountinfoid);
}
