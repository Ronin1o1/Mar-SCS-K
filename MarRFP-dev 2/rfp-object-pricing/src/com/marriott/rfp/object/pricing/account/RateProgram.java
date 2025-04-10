package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class RateProgram implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String rateProg;
    private String is_aer_rpgm;
    private Long sequence;
    private Long subsequence;
	private Long rateOfferId;
    private String rateOfferName;
    
    /**
	 * @return the subsequence
	 */
	public Long getSubsequence() {
		return subsequence;
	}

	/**
	 * @param subsequence the subsequence to set
	 */
	public void setSubsequence(Long subsequence) {
		this.subsequence = subsequence;
	}



    public void setRateProg(String rateProg) {
	this.rateProg = rateProg;
    }

    public String getRateProg() {
	if (rateProg != null)
	    return rateProg.toUpperCase();
	return rateProg;
    }

    public void setIs_aer_rpgm(String is_aer_rpgm) {
	this.is_aer_rpgm = is_aer_rpgm;
    }

    public String getIs_aer_rpgm() {
	return is_aer_rpgm;
    }

    public void setSequence(Long sequence) {
	this.sequence = sequence;
    }

    public Long getSequence() {
	return sequence;
    }

    public Long getRateOfferId() {
	return rateOfferId;
    }

    public void setRateOfferId(Long rateOfferId) {
	this.rateOfferId = rateOfferId;
    }

    public String getRateOfferName() {
	return rateOfferName;
    }

    public void setRateOfferName(String rateOfferName) {
	this.rateOfferName = rateOfferName;
    }

}
