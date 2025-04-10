package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestAvail;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestSelected;
import com.marriott.rfp.object.pricing.portfolio.CBCSelect;
import com.marriott.rfp.object.pricing.portfolio.CBCStatus;
import com.marriott.rfp.object.user.User;


public interface CBCRequestManager {

	public List<CBCRequestAvail> findAvailCBCRequest(PricingFilterSelections filterValues, User user);

	public List<CBCRequestSelected> findSelectedCBCRequest(PricingFilterSelections filterValues, User user);

	public String updateAccountCBCSelect(long accountrecid, List<CBCSelect> cbcSelect, User user);

	public void updateAccountCBCAvail(long accountrecid, List<Long> cbcAvail, User user);
	
	public List<CBCStatus> findSelectedCBCStatus(PricingFilterSelections filterValues, User user);
	
	public void updateAcceptanceCBCStatusList( List<CBCStatus> pslist, Long accountrecid, User user);
	
	public void updateCBCListByProperty(String status, List<CBCStatus> pslist, Long accountrecid, User user);

	public void updateAllAcceptanceCBCStatusList(String status, List<CBCStatus> pslist, Long accountrecid, User user);
	
	public List<RejectionReason> findRejectionReasons();
}
