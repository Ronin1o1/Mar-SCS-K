package com.marriott.rfp.business.wholesaler.roomselection.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.roomselection.api.WholesalerRoomSelectionService;
import com.marriott.rfp.dataaccess.wholesaler.roomselection.api.RoomSelectionManager;
import com.marriott.rfp.object.wholesaler.roomselection.RoomSelection;

/**
 * Session Bean implementation class WholesalerParticipateServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerRoomSelectionServiceImpl implements WholesalerRoomSelectionService {

	@Autowired
	RoomSelectionManager rsmgr=null;	
	
	public WholesalerRoomSelectionServiceImpl() { }

	public List<RoomSelection> findAllRoomPools() {
		List<RoomSelection> rs =rsmgr.findAllRoomPools();
		return  rs;
	}
	
	public List<RoomSelection> findRoomPoolsByParticipationId(long participationid){
		List<RoomSelection> rsList =rsmgr.findRoomPoolsByParticipationId(participationid);
		return rsList;
	}

	public void updateRoomSelection(long wsid, Map<String, RoomSelection> roomselectionChk, String formchange, String role, boolean bPeriodExpired, String username){
		RoomSelection roomSelection;
		Iterator<String> it = roomselectionChk.keySet().iterator();
		String[]cb=new String[roomselectionChk.size()];
		String[]cbChanged=new String[roomselectionChk.size()];
		Integer[] cbValue =new Integer[roomselectionChk.size()];
	    for(int i=0;i<roomselectionChk.size();i++){
	    	String key = (String) it.next();
	    	roomSelection = (RoomSelection) roomselectionChk.get(key);
	    	cb[i]=roomSelection.getCheckbox_();
		    cbChanged[i]=roomSelection.getCheckbox_changed_();
		    cbValue[i]=Integer.parseInt(roomSelection.getCheckbox_values_());
		}

	    rsmgr.updateRoomSelection(wsid,cb,cbChanged,cbValue,formchange,role, bPeriodExpired,username);
	    
	}

}