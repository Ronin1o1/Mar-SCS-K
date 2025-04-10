package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.util.List;

public class AccountSpecQuestions implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long max_len;
	private String question;
	private Long question_id;
	private Long question_seq;
	private String hasrecs;
	private String edie_column_label;
	private Long typeid;
	private String typedescription;
	private List<String> customAnswers ;
	private String ansEdited;
	
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

	public Long getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Long question_id) {
		this.question_id = question_id;
	}

	public Long getQuestion_seq() {
		return question_seq;
	}

	public void setQuestion_seq(Long question_seq) {
		this.question_seq = question_seq;
	}

	public String getHasrecs() {
		return hasrecs;
	}

	public void setHasrecs(String hasrecs) {
		this.hasrecs = hasrecs;
	}

	public String getEdie_column_label() {
		return edie_column_label;
	}

	public void setEdie_column_label(String edie_column_label) {
		this.edie_column_label = edie_column_label;
	}

	public Long getTypeid() {
		return typeid;
	}

	public void setTypeid(Long typeid) {
		this.typeid = typeid;
	}

	public String getTypedescription() {
		return typedescription;
	}

	public void setTypedescription(String typedescription) {
		this.typedescription = typedescription;
	}

	public List<String> getCustomAnswers() {
		return customAnswers;
	}

	public void setCustomAnswers(List<String> customAnswers) {
		this.customAnswers = customAnswers;
	}

	public String getAnsEdited() {
		return ansEdited;
	}

	public void setAnsEdited(String ansEdited) {
		this.ansEdited = ansEdited;
	}

}
