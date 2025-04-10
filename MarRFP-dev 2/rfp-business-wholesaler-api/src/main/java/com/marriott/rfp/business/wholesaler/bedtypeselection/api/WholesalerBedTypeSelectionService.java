package com.marriott.rfp.business.wholesaler.bedtypeselection.api;

import java.util.List;



import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.wholesaler.bedtypeselection.BedTypeSelection;
import com.marriott.rfp.object.wholesaler.charges.Charges;


public interface WholesalerBedTypeSelectionService {
	
	public List<BedTypeSelection> findAllBedTypes();
	
	public List<BedTypeSelection> findBedTypeByParticipationId(long wsid);
	
	public String getCurrency(long wsid);
	
	public List<CurrencyData> findCurrencyList(String currencyCode);
	
	public void update(BedTypeSelection bedTypeSelection,long participationid, Charges charges,CurrencyData cuurency,boolean changed,String role,boolean isPeriodExpired,String loginName);
	
	public List<BedTypeSelection> findBedTypeByParticipationIdWithoutComma(long participationid);
	
}