package com.marriott.rfp.dataacess.pricing.bedtyperoomtype.api;

import java.util.List;



import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;


public interface BedtypeRoomtypeManager {
	public void deleteBedtype(long bedtypeid);

	public void deleteRoomtype(long promo_roomtypeid);

	public Bedtype getBedtypeForMaintenance(long bedtypeid);

	public List<Bedtype> getBedtypesForMaintenance(String orderBy);

	public Roomtype getRoomtypeForMaintenance(long promo_roomtypeid);

	public List<Roomtype> getRoomtypesForMaintenance(String orderBy);

	public void updateBedtype(Bedtype bedtype);

	public void updateRoomtype(Roomtype roomtype);

	public List<Roomtype> getRoomtypeList();

	public List<Bedtype> getBedtypeList();
}
