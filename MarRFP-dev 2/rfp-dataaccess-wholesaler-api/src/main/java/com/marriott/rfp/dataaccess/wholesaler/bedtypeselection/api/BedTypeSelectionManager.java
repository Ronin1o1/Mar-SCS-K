package com.marriott.rfp.dataaccess.wholesaler.bedtypeselection.api;

import java.util.List;



import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.wholesaler.bedtypeselection.BedTypeSelection;


public interface BedTypeSelectionManager {
	
	public List<BedTypeSelection> findAllBedTypes();
	
	public List<BedTypeSelection> findBedTypeByParticipationId(long wsid);
	
	public String getCurrency(long wsid);
	
	public void updateBedTypeSelection(BedTypeSelection bedTypeSelection,long participationid, boolean changed,String role,boolean isPeriodExpired,String loginName);
	
	public void updateWSCurrency(long wsid, CurrencyData cuurency, String loginName);
	
	public List<BedTypeSelection> findBedTypeByParticipationIdWithoutComma(long wsid);
	
}