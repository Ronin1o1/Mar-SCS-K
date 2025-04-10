package com.marriott.rfp.business.rd.api;

import java.util.Map;
import java.util.Vector;



import com.marriott.rfp.object.rd.common.RateProgram;
import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.object.roomdef.RoomDefDataView;
import com.marriott.rfp.object.roomdef.RoomDefDefinitionUpdateView;
import com.marriott.rfp.object.roomdef.RoomDefSyncAlerts;


public interface RoomDefService {

	public Vector<RoomPool> getHotelRoomPoolList(String marshaCode);

	public Vector<RateProgram> getHotelRateProgramList(String marshacode, String roomPool);

	public RoomDefDataView getHotelDataForDefinition(String marshaCode, String roomPool, Boolean newInd, String elementTypeCode);

	public RoomDefDataView getHotelMenuForDefinition(String marshaCode, String roomPool);

	public RoomDefDataView getHotelDataForDefinition(String marshaCode, String roomPool, String rateProgram, String elementTypeCode);

	public void updateRoomPoolDefinition(String marshaCode, String roomPool,Map<String, RoomDefDefinitionUpdateView> roomDefDefinition,
			boolean updateSyncsOnly, String loginName);

	public void updateRateProgramDefinition(String marshaCode, String roomPool, String rateProgram,
			Map<String, RoomDefDefinitionUpdateView> roomDefDefinition, boolean updateSyncsOnly, String loginName);

	public Vector<RoomDefSyncAlerts> getHotelSyncAlerts(String marshaCode, String roomPool);

	public void removeRateLevel(String marshaCode, String roomPool, String rateProgram, String loginName);
	//Method to retrieve the details for the Webservice Cognos report Rate program assignment report
	public Long getHotelDataForDefinitionReport(String marshaCode, String roomPool, String roompoolonly);
}
