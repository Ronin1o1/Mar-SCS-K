package com.marriott.rfp.business.wholesaler.roomselection.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.wholesaler.roomselection.RoomSelection;


public interface WholesalerRoomSelectionService {
	
	public List<RoomSelection> findAllRoomPools();
	
	public List<RoomSelection> findRoomPoolsByParticipationId( long participationid);
	
	public void updateRoomSelection(long wsid, Map<String, RoomSelection> m, String formchange, String role, boolean bPeriodExpired, String username);

}