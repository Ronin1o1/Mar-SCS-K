package com.marriott.rfp.business.rd.api;

import java.util.Map;
import java.util.Vector;



import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDataView;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDefinitionUpdateView;


public interface RoomTypeNameService {

	public Vector<RoomPool> getMasterRoomPoolList();

	public Vector<RoomPool> getHotelRoomPoolList(String marshaCode);

	public RoomTypeNameDataView getMasterDataForDefinition(String roomPool, String rtnd_ListCode);

	public RoomTypeNameDataView getHotelDataForDefinition(String marshaCode, String roomPool, String rtnd_ListCode);

	public RoomTypeNameDataView getDataForMenuOnly(String roomPool);

	public void updateHotelRoomTypeNameDefinition(String marshaCode, String roomPool,
			Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition, String loginName);
	
	public void updateMasterRoomTypeNameDefinition(String roomPool, Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition,
			String loginName);
}