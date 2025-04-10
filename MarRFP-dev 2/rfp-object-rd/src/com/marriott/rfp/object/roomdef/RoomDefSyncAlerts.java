package com.marriott.rfp.object.roomdef;

import java.util.Vector;

public class RoomDefSyncAlerts {
	private String roomPool;
	private String rateProgram;
	private Vector <String> syncAlerts;
	
	public RoomDefSyncAlerts() {
		
	}

	public RoomDefSyncAlerts(String roomPool, String rateProgram) {
		this.roomPool=roomPool;
		this.rateProgram=rateProgram;
	}

	public String getRoomPool() {
		return roomPool;
	}

	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}

	public void setRateProgram(String rateProgram) {
		this.rateProgram = rateProgram;
	}

	public String getRateProgram() {
		return rateProgram;
	}

	public void setSyncAlerts(Vector <String> syncAlerts) {
		this.syncAlerts = syncAlerts;
	}

	public Vector <String> getSyncAlerts() {
		return syncAlerts;
	}



}
