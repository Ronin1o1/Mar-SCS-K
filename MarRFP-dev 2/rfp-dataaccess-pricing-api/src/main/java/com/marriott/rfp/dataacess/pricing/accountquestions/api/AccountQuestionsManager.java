package com.marriott.rfp.dataacess.pricing.accountquestions.api;

import com.marriott.rfp.object.pricing.account.AccountSpecQuestionTypes;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.object.user.User;

import java.io.ByteArrayInputStream;
import java.util.List;


public interface AccountQuestionsManager {
	public List<AccountSpecQuestions> getQuestions(long accountrecid);

	public List<AccountSpecQuestionTypes> getQuestionTypes();
	
	public void updateQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user);	

	public List<String> getCustomAnswersForQuestion(String questionId, String accspec);

	public List<String> getCustomAnswers(String quesId, String accspec);

	public String saveExcelDataQues(ByteArrayInputStream byteArrayInputStream, Long accountrecid, long max_questions, User user);
}
