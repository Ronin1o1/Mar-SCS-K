package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class ComplexityAndRatings implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long ratingval;
	private String ratingtext;
	
	public Long getRatingval() {
		return ratingval;
	}
	public void setRatingval(Long ratingval) {
		this.ratingval = ratingval;
	}
	public String getRatingtext() {
		return ratingtext;
	}
	public void setRatingtext(String ratingtext) {
		this.ratingtext = ratingtext;
	}
	
}
