package com.marriott.rfp.dataacess.pricing.hotel.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotel.HotelRoomPool;
import com.marriott.rfp.object.user.User;


public interface HotelRoomPoolManager {
    public List<HotelRoomPool> findRoomPools(Long hotelid, Long hotelrfpid, User user, String softLaunchEnabled);

    public boolean hasBeenUpdatedToday(Long hotelid);

    public void updateHotelRoomPool(Long hotelid,List<HotelRoomPool> hotelroompoollist, User user);

    public void deleteHotelRoomPool(Long hotelid, User user);
    
    public void updateHotelRFPRoomPool(Long hotelrfpid, User user);
    
	public void updateHotelRoomPoolDate(Long hotelid);

}
