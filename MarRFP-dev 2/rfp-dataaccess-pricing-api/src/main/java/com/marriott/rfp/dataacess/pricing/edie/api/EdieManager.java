package com.marriott.rfp.dataacess.pricing.edie.api;

import java.util.List;



import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.edie.EdieColumns;
import com.marriott.rfp.object.pricing.edie.EdieColumnsUpdate;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfileColumn;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.user.User;


public interface EdieManager {
    public List<EdieProfile> getEdieProfiles();

    public String getEdieProfileName(long profileid);

    public List<EdieColumns> getColumnsNotInEdieProfile(long profileid, String colfind);

    public List<EdieColumns> getEdieProfileColumns(long profileid);

    public List<EdieColumnsUpdate> getEdieAllColumns(String colfind);

    public String getEdieProfileColumnsDescription(long columnid);

    public void updateProfileName(long profileid, String profilename);

    public void deleteProfileColumns(long profileid);

    public void updateProfileColumns(long profileid, EdieProfileColumn edieColumns);

    public void updateEdieColumnDescription(EdieColumns edieColumns);

    public void deleteProfile(long profileid);

    public Long addProfile(String profilename, long copyprofileid);

    public List<EdieHotelProfile> getEdieHotelProfiles();

    public EdieHotelProfile getEdieHotelProfile(Long profileid);

    public Long addHotelProfile(String profilename);

    public void deleteHotelProfile(long profileid);

    public void updateHotelProfileName(List<EdieHotelProfile> edieHotelProfile);

    public List<HotelListData> findHotelProfileAvail(PricingFilterSelections filterValues, User user);

    public List<HotelListData> findHotelProfileSelected(PricingFilterSelections filterValues, User user);

    public void updateHotelProfile(long profileid, List<Long> hotelList);

    public void deleteHotelProfile(long profileid, List<Long> hotelList);
    
    public void updateProfileUsage (long profileid, User user);
}
