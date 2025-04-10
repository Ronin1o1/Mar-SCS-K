package com.marriott.rfp.business.pricing.pgoos.api;

import java.util.List;


import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosLoad;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintAvail;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintSelected;
import com.marriott.rfp.object.pricing.pgoos.PgoosSelect;
import com.marriott.rfp.object.user.User;


public interface PgoosService {
	public List<PgoosMaintAvail> findPgoosableHotelFilteredList(PricingFilterSelections filterValues, User user);

	public String updatePgoosMaint(PricingFilterSelections filterValues, List<Long> pgoosSelect, User user);

	public List<PgoosMaintSelected> findPgoosSelectedRecsFilteredList(PricingFilterSelections filterValues, User user);

	public void deletePgoosMaint(List<PgoosSelect> pgoosSelect);

	public void deleteMCB();

	public Long pgoospropagate(PricingFilterSelections filterValues, User user, Long prodIter);

	public Long getMCBCount();

	public void deleteMCBRecord(Long accountrecid, Long hotelid);

	public void updatePgoosBatch(Long batchid, String status, String loadtype, String userid);

	public PgoosLoad findPgoosLoad();

}
