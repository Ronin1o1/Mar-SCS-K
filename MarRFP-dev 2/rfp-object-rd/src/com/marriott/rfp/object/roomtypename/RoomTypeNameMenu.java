package com.marriott.rfp.object.roomtypename;

import java.util.Vector;

public class RoomTypeNameMenu {
	private String roomPool;
	private Vector <RoomTypeNameMenuModel> roomTypeNameMenu;
	
	public RoomTypeNameMenu() {
		
	}

	public String getRoomPool() {
		return roomPool;
	}

	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}

	public Vector<RoomTypeNameMenuModel> getRoomTypeNameMenu() {
		return roomTypeNameMenu;
	}

	public void setRoomTypeNameMenu(Vector<RoomTypeNameMenuModel> roomTypeNameMenu) {
		this.roomTypeNameMenu = roomTypeNameMenu;
	}


	
	

}
