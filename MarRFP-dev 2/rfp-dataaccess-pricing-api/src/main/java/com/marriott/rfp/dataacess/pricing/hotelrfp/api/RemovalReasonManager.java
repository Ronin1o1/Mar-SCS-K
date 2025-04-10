package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.RemovalReason;


public interface RemovalReasonManager {
	public List<RemovalReason> findRemovalReasons();
}
