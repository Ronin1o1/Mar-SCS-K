package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;


public interface RejectionReasonManager {
	public List<RejectionReason> findRejectionReasons();
}
