package com.marriott.rfp.dataacess.pricing.accountgrpmtgquestions.api;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.List;

import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.object.user.User;


public interface AccountGrpMtgQuestionsManager {
	public List<AccountSpecQuestions> getQuestions(long accountrecid);

	public void updateQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user);
	
	public String saveExcelDataGMQues(ByteArrayInputStream byteArrayInputStream, Long accountrecid, long max_questions, User user);
}
