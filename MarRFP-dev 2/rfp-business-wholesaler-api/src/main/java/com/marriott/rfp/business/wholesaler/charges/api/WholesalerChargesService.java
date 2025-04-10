package com.marriott.rfp.business.wholesaler.charges.api;

import java.util.List;

import com.marriott.rfp.object.wholesaler.charges.Charges;


public interface WholesalerChargesService {

	public List<Charges> findAllCharges();
	
	public List<Charges> findAdditionalCharges(long participationid);
	
	public void updateCharges(Charges charges, boolean bUpdate, long wsid,String loginName);

}