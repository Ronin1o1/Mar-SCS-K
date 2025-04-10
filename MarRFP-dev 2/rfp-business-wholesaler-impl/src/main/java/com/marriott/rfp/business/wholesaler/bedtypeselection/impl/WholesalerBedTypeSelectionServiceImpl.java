package com.marriott.rfp.business.wholesaler.bedtypeselection.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.bedtypeselection.api.WholesalerBedTypeSelectionService;
import com.marriott.rfp.dataaccess.currency.api.CurrencyManager;
import com.marriott.rfp.dataaccess.wholesaler.bedtypeselection.api.BedTypeSelectionManager;
import com.marriott.rfp.dataaccess.wholesaler.charges.api.ChargesManager;
import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.wholesaler.bedtypeselection.BedTypeSelection;
import com.marriott.rfp.object.wholesaler.charges.Charges;

/**
 * Session Bean implementation class WholesalerBedTypeSelectionService
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class WholesalerBedTypeSelectionServiceImpl implements WholesalerBedTypeSelectionService {
	
	EntityManager em;
	@Autowired
	BedTypeSelectionManager btmgr=null;	
	@Autowired
	CurrencyManager crmgr=null;
	@Autowired
	ChargesManager chmgr=null;
	
	public WholesalerBedTypeSelectionServiceImpl() { }

	public List<BedTypeSelection> findAllBedTypes(){
		List<BedTypeSelection> rs =btmgr.findAllBedTypes();
		return  rs;
	}
	
	public List<BedTypeSelection> findBedTypeByParticipationId(long wsid){
		List<BedTypeSelection> bedTypeList =btmgr.findBedTypeByParticipationId(wsid);
		return bedTypeList;
	}

	public String getCurrency(long wsid){
		String strCurrency	=btmgr.getCurrency(wsid);
		return strCurrency;
	}

	public List<CurrencyData> findCurrencyList(String currencyCode){
		List<CurrencyData> currencyAllList=crmgr.findCurrencyList(currencyCode);
		return currencyAllList;
	}

	public void update(BedTypeSelection bedTypeSelection, long participationid, Charges charges,CurrencyData cuurency, boolean changed, String role, boolean isPeriodExpired, String loginName){
		btmgr.updateBedTypeSelection(bedTypeSelection, participationid, changed, role, isPeriodExpired, loginName);
		btmgr.updateWSCurrency(participationid, cuurency, loginName);
		chmgr.updateCharges(charges, true, participationid, loginName);
	}

	public List<BedTypeSelection> findBedTypeByParticipationIdWithoutComma(long participationid){
		List<BedTypeSelection> bedTypeTempList=btmgr.findBedTypeByParticipationIdWithoutComma(participationid);
		return bedTypeTempList;
	}

}