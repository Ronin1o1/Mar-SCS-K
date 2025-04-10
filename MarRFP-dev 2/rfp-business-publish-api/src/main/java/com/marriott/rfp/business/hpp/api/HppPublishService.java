package com.marriott.rfp.business.hpp.api;

import java.util.List;



import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.PublishResponse;
import com.marriott.rfp.object.pgoos.RoomPool;

public interface HppPublishService {

	public List<PublishResponse> publishRateEntity(HotelAccountInfo hotelAccount, String urlForBTService, Boolean holdPublish, String byPeriod, List<RoomPool> rateProgramList);

	public List<PublishHotelResponse> publishHotels(List<HotelsToPublish> hotellist, String eid, String urlForBTService);

}
