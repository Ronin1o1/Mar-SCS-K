package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class HotelAccountSpecQandA implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String answer;
	private Long max_len;
	private String question;
	private Long questionid;
	private Long typeid;
	private boolean isEditable;
	private Long question_seq;
	private List<String> customAnswers = new ArrayList<String>();
	private String selectedAns;
	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Long getMax_len() {
		return max_len;
	}

	public void setMax_len(Long max_len) {
		this.max_len = max_len;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Long getQuestionid() {
		return questionid;
	}

	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}

	public Long getTypeid() {
		return typeid;
	}

	public void setTypeid(Long typeid) {
		this.typeid = typeid;
	}

	public void setEditable(boolean isEditable) {
		this.isEditable = isEditable;
	}

	public boolean isEditable() {
		return isEditable;
	}

	public void setQuestion_seq(Long question_seq) {
		this.question_seq = question_seq;
	}

	public Long getQuestion_seq() {
		return question_seq;
	}

	public List<String> getCustomAnswers() {
		return customAnswers;
	}

	public void setCustomAnswers(List<String> customAnswers) {
		this.customAnswers = customAnswers;
	}

	public String getSelectedAns() {
		return selectedAns;
	}

	public void setSelectedAns(String selectedAns) {
		this.selectedAns = selectedAns;
	}
	
	

}
