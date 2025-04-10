package com.marriott.rfp.dataaccess.wholesaler.roomselection.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.roomselection.RoomSelection;


public interface RoomSelectionManager {
	
	public List<RoomSelection> findAllRoomPools();
	
	public List<RoomSelection> findRoomPoolsByParticipationId( long participationid);
	
	public void updateRoomSelection(long wsid,String[]cb,String[]cbChanged,Integer[] cbValue,String formchange,String role, boolean bPeriodExpired,String username);

}