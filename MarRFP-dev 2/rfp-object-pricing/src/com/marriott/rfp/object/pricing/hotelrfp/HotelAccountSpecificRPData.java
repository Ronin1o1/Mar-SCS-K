/**
 * 
 */
package com.marriott.rfp.object.pricing.hotelrfp;

/**
 * @author bindu.kanneganti
 *
 */
public class HotelAccountSpecificRPData {
	
	private Long sequence;
	private Long subsequence;
	private String rateprog;
	private String rateentity;
	private String rateload;
	private HotelAccountSpecificStatus latestStatus;
	public Long getSequence() {
		return sequence;
	}
	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}
	public Long getSubsequence() {
		return subsequence;
	}
	public void setSubsequence(Long subsequence) {
		this.subsequence = subsequence;
	}
	
	public HotelAccountSpecificStatus getLatestStatus() {
		return latestStatus;
	}
	public void setLatestStatus(HotelAccountSpecificStatus latestStatus) {
		this.latestStatus = latestStatus;
	}
	public String getRateprog() {
		return rateprog;
	}
	public void setRateprog(String rateprog) {
		this.rateprog = rateprog;
	}
	public String getRateentity() {
		return rateentity;
	}
	public void setRateentity(String rateentity) {
		this.rateentity = rateentity;
	}
	public String getRateload() {
		return rateload;
	}
	public void setRateload(String rateload) {
		this.rateload = rateload;
	}

}
