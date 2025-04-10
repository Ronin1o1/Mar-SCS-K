package com.marriott.rfp.object.rd.common;


public class RateProgram {
	private String rateProgram;
	private boolean hasRoomDefinition;
	private boolean hasSyncAlert;
	
	public RateProgram() {
		
	}


	public String getRateProgram() {
		return rateProgram;
	}


	public void setRateProgram(String rateProgram) {
		this.rateProgram = rateProgram;
	}


	public boolean getHasRoomDefinition() {
		return hasRoomDefinition;
	}

	public void setHasRoomDefinition(boolean hasRoomDefinition) {
		this.hasRoomDefinition = hasRoomDefinition;
	}

	public boolean getHasSyncAlert() {
		return hasSyncAlert;
	}

	public void setHasSyncAlert(boolean hasSyncAlert) {
		this.hasSyncAlert = hasSyncAlert;
	}


	

}
