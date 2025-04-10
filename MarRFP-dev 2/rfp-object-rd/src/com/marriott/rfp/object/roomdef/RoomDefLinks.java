package com.marriott.rfp.object.roomdef;


public class RoomDefLinks {
	private String KORDefLink;
	private String KORWorksheetLink;
	private String KORInstructionsLink;
	private String KORFAQLink;
	
	public RoomDefLinks() {
		super();
	}
	public String getKORDefLink() {
		return KORDefLink;
	}
	public void setKORDefLink(String defLink) {
		KORDefLink = defLink;
	}
	public String getKORWorksheetLink() {
		return KORWorksheetLink;
	}
	public void setKORWorksheetLink(String worksheetLink) {
		KORWorksheetLink = worksheetLink;
	}
	public String getKORInstructionsLink() {
		return KORInstructionsLink;
	}
	public void setKORInstructionsLink(String instructionsLink) {
		KORInstructionsLink = instructionsLink;
	}
	public String getKORFAQLink() {
		return KORFAQLink;
	}
	public void setKORFAQLink(String link) {
		KORFAQLink = link;
	}
	
	public void copy(RoomDefLinks roomDefLinks) {
		this.KORDefLink = roomDefLinks.getKORDefLink();
		this.KORWorksheetLink = roomDefLinks.getKORWorksheetLink();
		this.KORInstructionsLink = roomDefLinks.getKORInstructionsLink();
		this.KORFAQLink = roomDefLinks.getKORFAQLink();
	}

}
