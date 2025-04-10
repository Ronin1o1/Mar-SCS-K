package com.marriott.rfp.dataacess.pricing.hotel.api;

import java.util.List;



import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.hotel.Ignore2ndRoomPool;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetailDO;
import com.marriott.rfp.object.pricing.pgoos.MirrorInfo;
import com.marriott.rfp.object.pricing.pgoos.MirrorSearchCriteria;


public interface HotelPricingManager {
	public List<HotelListData> findAccountTrackingHotels();

	public void updateAccountTrackingHotels(HotelListData hotelList);

	public List<HotelListData> getRoomPoolExemptList(long affiliationid, String pgoosable, int orderHotelBy);

	public void updateRoomPoolExemptList(HotelListData hotelList);

	public List<HotelAffiliation> getAffiliations();

	public HotelAffiliation getAffiliation(Long affiliationid);

	public List<Ignore2ndRoomPool> getIgnore2ndRoomPoolOptions();
	public List<MirrorDetailDO> findMirrorsForHotels(MirrorSearchCriteria mirrorexpsearch);

	public MirrorDetailDO findMirrorsForHotel(Long hotelid, Long roomClassSequence, Long roomPoolSequence);

	public long getMirrorHotelsNum(MirrorSearchCriteria mirrorSearchCriteria);

	public void updateMirror(MirrorInfo model);

	public List<String> getFranchByList();
}
