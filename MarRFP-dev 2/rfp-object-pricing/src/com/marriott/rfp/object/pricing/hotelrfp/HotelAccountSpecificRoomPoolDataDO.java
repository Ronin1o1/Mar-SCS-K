/**
 * 
 */
package com.marriott.rfp.object.pricing.hotelrfp;

/**
 * @author bindu.kanneganti
 *
 */
public class HotelAccountSpecificRoomPoolDataDO {
	private Long accountrpflagid;
	private Long roomclassseq;
	private String lra;
	private String accepted; 
	private Long removalreasonid;
	private String pgoos = "N";
	private Long rejectreasonid;
	private String rejectionreason; 
	private Long roompoolseq;
	private String removalreason;
	private String isSelected;
	
	public Long getAccountrpflagid() {
		return accountrpflagid;
	}
	public void setAccountrpflagid(Long accountrpflagid) {
		this.accountrpflagid = accountrpflagid;
	}
	public Long getRoomclassseq() {
		return roomclassseq;
	}
	public void setRoomclassseq(Long roomclassseq) {
		this.roomclassseq = roomclassseq;
	}
	public String getLra() {
		return lra;
	}
	public void setLra(String lra) {
		this.lra = lra;
	}
	public String getAccepted() {
		return accepted;
	}
	public void setAccepted(String accepted) {
		this.accepted = accepted;
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
	public Long getRejectreasonid() {
		return rejectreasonid;
	}
	public void setRejectreasonid(Long rejectreasonid) {
		this.rejectreasonid = rejectreasonid;
	}
	public String getRejectionreason() {
		return rejectionreason;
	}
	public void setRejectionreason(String rejectionreason) {
		this.rejectionreason = rejectionreason;
	}
	public Long getRoompoolseq() {
		return roompoolseq;
	}
	public void setRoompoolseq(Long roompoolseq) {
		this.roompoolseq = roompoolseq;
	}
	public String getRemovalreason() {
		return removalreason;
	}
	public void setRemovalreason(String removalreason) {
		this.removalreason = removalreason;
	}
	public String getIsSelected() {
		return isSelected;
	}
	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

}
