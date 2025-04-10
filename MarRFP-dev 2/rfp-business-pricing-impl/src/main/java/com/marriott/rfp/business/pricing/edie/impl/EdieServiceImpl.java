package com.marriott.rfp.business.pricing.edie.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.dataacess.pricing.edie.api.EdieManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.edie.EdieColumns;
import com.marriott.rfp.object.pricing.edie.EdieColumnsUpdate;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfileColumn;
import com.marriott.rfp.object.pricing.edie.UpdateColumn;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class EdieServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class EdieServiceImpl implements EdieService {

    @Autowired
    private EdieManager edieMgr = null;

    public List<EdieProfile> getEdieProfiles() {
	return edieMgr.getEdieProfiles();
    }

    public String getEdieProfileName(long profileid) {
	return edieMgr.getEdieProfileName(profileid);
    }

    public List<EdieColumns> getColumnsNotInEdieProfile(long profileid, String colfind) {
	return edieMgr.getColumnsNotInEdieProfile(profileid, colfind);
    }

    public List<EdieColumns> getEdieProfileColumns(long profileid) {
	return edieMgr.getEdieProfileColumns(profileid);
    }

    public List<EdieColumnsUpdate> getEdieAllColumns(String colfind) {
	return edieMgr.getEdieAllColumns(colfind);
    }

    public String getEdieProfileColumnsDescription(long columnid) {
	return edieMgr.getEdieProfileColumnsDescription(columnid);
    }

    public void updateProfile(long profileid, String profilename, Map<Long, UpdateColumn> edieColumns) {
	edieMgr.updateProfileName(profileid, profilename);
	edieMgr.deleteProfileColumns(profileid);
	if (edieColumns != null) {
	    for (Long key : edieColumns.keySet()) {
		EdieProfileColumn epc = new EdieProfileColumn();
		epc.setColumn_id(key);
		epc.setColumn_order(edieColumns.get(key).getValue());

		edieMgr.updateProfileColumns(profileid, epc);

	    }
	}
    }

    public void updateEdieColumnDescription(List<EdieColumnsUpdate> edieColumnsList) {
	if (edieColumnsList != null) {
	    for (int i = 0; i < edieColumnsList.size(); i++) {
		EdieColumnsUpdate ecu = edieColumnsList.get(i);
		if (ecu.getChanged() != null && ecu.getChanged().equals("Y"))
		    edieMgr.updateEdieColumnDescription(ecu);
	    }
	}
    }

    public void deleteProfile(long profileid) {
	edieMgr.deleteProfile(profileid);
    }

    public Long addProfile(String profilename, long copyprofileid) {
	return edieMgr.addProfile(profilename, copyprofileid);
    }

    public List<EdieHotelProfile> getEdieHotelProfiles() {
	return edieMgr.getEdieHotelProfiles();
    }

    public EdieHotelProfile getEdieHotelProfile(Long profileid) {
	return edieMgr.getEdieHotelProfile(profileid);
    }

    public Long addHotelProfile(String profilename) {
	return edieMgr.addHotelProfile(profilename);
    }

    public void deleteHotelProfile(long profileid) {
	edieMgr.deleteHotelProfile(profileid);
    }

    public void updateHotelProfileName(List<EdieHotelProfile> edieHotelProfile) {
	if (edieHotelProfile != null)
	    edieMgr.updateHotelProfileName(edieHotelProfile);
    }

    public List<HotelListData> findHotelProfileAvail(PricingFilterSelections filterValues, User user) {
	if (filterValues != null)
	    return edieMgr.findHotelProfileAvail(filterValues, user);
	else
	    return null;
    }

    public List<HotelListData> findHotelProfileSelected(PricingFilterSelections filterValues, User user) {
	if (filterValues != null)
	    return edieMgr.findHotelProfileSelected(filterValues, user);
	else
	    return null;
    }

    public void updateHotelProfile(long profileid, List<Long> hotelList) {
	edieMgr.updateHotelProfile(profileid, hotelList);
    }

    public void deleteHotelProfile(long profileid, List<Long> hotelList) {
	edieMgr.deleteHotelProfile(profileid, hotelList);
    }
    
    public void updateProfileUsage (long profileid, User user) {
    	edieMgr.updateProfileUsage(profileid, user);
    }
}
