package com.marriott.rfp.object.roomdef;

import java.util.Vector;

public class RoomDefMenu {
	private String roomPool;
	private Vector <RoomDefMenuModel> roomDefNameMenu;
	
	public RoomDefMenu() {
		
	}

	public String getRoomPool() {
		return roomPool;
	}

	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}

	public void setRoomDefNameMenu(Vector <RoomDefMenuModel> roomDefNameMenu) {
		this.roomDefNameMenu = roomDefNameMenu;
	}

	public Vector <RoomDefMenuModel> getRoomDefNameMenu() {
		return roomDefNameMenu;
	}


}
