/**
 * 
 */
package com.marriott.rfp.object.pricing.hotelrfp;

/**
 * @author bindu.kanneganti
 *
 */
public class HotelAccountSpecificPGOOSData {
	 private Long roomClassSequence;
	 private Long roomPoolSequence;
	  private Long removalreasonid;  
	  private String pgoos = "N"; 
	  private String removalreason;
	  
	  public Long getRoomClassSequence() {
		return roomClassSequence;
	}
	public void setRoomClassSequence(Long roomClassSequence) {
		this.roomClassSequence = roomClassSequence;
	}
	public Long getRoomPoolSequence() {
		return roomPoolSequence;
	}
	public void setRoomPoolSequence(Long roomPoolSequence) {
		this.roomPoolSequence = roomPoolSequence;
	}
	public Long getRemovalreasonid() {
		return removalreasonid;
	}
	public void setRemovalreasonid(Long removalreasonid) {
		this.removalreasonid = removalreasonid;
	}
	public String getPgoos() {
		return pgoos;
	}
	public void setPgoos(String pgoos) {
		this.pgoos = pgoos;
	}
	public String getRemovalreason() {
		return removalreason;
	}
	public void setRemovalreason(String removalreason) {
		this.removalreason = removalreason;
	}
	

}
