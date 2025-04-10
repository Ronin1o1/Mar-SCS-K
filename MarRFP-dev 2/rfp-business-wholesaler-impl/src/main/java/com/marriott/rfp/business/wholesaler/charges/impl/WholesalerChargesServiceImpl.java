package com.marriott.rfp.business.wholesaler.charges.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.charges.api.WholesalerChargesService;
import com.marriott.rfp.dataaccess.wholesaler.charges.api.ChargesManager;
import com.marriott.rfp.object.wholesaler.charges.Charges;

/**
 * Session Bean implementation class WholesalerChargesServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerChargesServiceImpl implements WholesalerChargesService {

	@Autowired
	ChargesManager chmgr=null;	

	public WholesalerChargesServiceImpl() {}

	public List<Charges> findAllCharges(){
		List<Charges> ch =chmgr.findAllCharges();
		return  ch;
	}
	
	public List<Charges> findAdditionalCharges(long participationid){
		List<Charges> addChargesList =chmgr.findAdditionalCharges(participationid);
		return addChargesList;
	}

	public void updateCharges(Charges charges, boolean bUpdate, long wsid,String loginName){
		chmgr.updateCharges(charges, bUpdate, wsid, loginName);
	}
	
}