package com.marriott.rfp.dataaccess.pgoos.product.api;

import java.util.List;



import com.marriott.rfp.object.pgoos.propagate.PGOOSAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSHotelAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSProductAmenity;
import com.marriott.rfp.object.user.User;


public interface PGOOSProductManager {
    public List<PGOOSAccountProduct> getRunMCBVerifyAccountProduct();

    public List<PGOOSAccountProduct> getBatchVerifyAccountProduct();

    public List<PGOOSAccountProduct> getLiveVerifyAccountProduct(long accountrecid);

    public List<PGOOSProductAmenity> getAccountAmenities(long accountrecid, long hotelid);

    public List<PGOOSProductAmenity> getHotelAmenities(long accountrecid, long hotelid);

    public List<PGOOSAccountProduct> getRunMCBAccountProduct(String eid);

    public List<PGOOSAccountProduct> getLiveAccountProduct(long accountrecid);

    public List<PGOOSAccountProduct> getBatchAccountProduct();

    public long getAccountProductSize();

    public List<PGOOSHotelAccountProduct> getRunMCBHotelProduct(long numver);

    public List<PGOOSHotelAccountProduct> getLiveHotelProduct(long hotelid, long accountrecid);

    public List<PGOOSHotelAccountProduct> getBatchHotelProduct();

    public long getHotelProductSize(long numver);

    public void setAccountProduct(String productCode, long accountrecid);

    public void setHotelProduct(long batchid, Long transactionstatusid, long hotelid, long accountrecid, String status, String errorText,
	    String amenitiesSet, String user);

    public void setHotelProduct(long action_id, String status, String errorText, String amenitiesSet, User user);

    public void updateCompareAmenityBatch();

    public void updateCompareAmenityRunmcb(String eid);

    public void updateCompareAmenitylive(long hotelid, long accountrecid);
}
