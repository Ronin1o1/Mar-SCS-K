package com.marriott.rfp.dataacess.pricing.pgoos.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosLoad;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintAvail;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintSelected;
import com.marriott.rfp.object.pricing.pgoos.PgoosSelect;
import com.marriott.rfp.object.user.User;


public interface PgoosPropagateManager {

	public List<PgoosMaintAvail> findPgoosableHotelFilteredList(PricingFilterSelections filterValues, User user);

	public String updatePgoosMaint(PricingFilterSelections filterValues, List<Long> pgoosSelect, User user);

	public List<PgoosMaintSelected> findPgoosSelectedRecsFilteredList(PricingFilterSelections filterValues, User user);

	public void deletePgoosMaint(List<PgoosSelect> pgoosSelect);

	public void deleteMCB();

	public Long getPgoosBatchId();

	public Long getMCBCount();

	public void deleteMCBRecord(Long accountrecid, Long hotelid);

	public PgoosLoad findPgoosLoad();

	public void findMCBProdRecord();

	public void updateMCBProdRecord();
}
