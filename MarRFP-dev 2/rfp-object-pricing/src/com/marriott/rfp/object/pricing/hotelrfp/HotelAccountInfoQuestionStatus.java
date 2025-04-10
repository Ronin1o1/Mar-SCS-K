package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountInfoQuestionStatus implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String locked;
	private String answersModifiable;

	public String getLocked() {
		return locked;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

	public String getAnswersModifiable() {
		return answersModifiable;
	}

	public void setAnswersModifiable(String answersModifiable) {
		this.answersModifiable = answersModifiable;
	}

}
