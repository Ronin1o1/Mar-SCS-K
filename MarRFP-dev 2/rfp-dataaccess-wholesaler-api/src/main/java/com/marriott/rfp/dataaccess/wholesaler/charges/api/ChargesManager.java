package com.marriott.rfp.dataaccess.wholesaler.charges.api;

import java.util.List;

import com.marriott.rfp.object.wholesaler.charges.Charges;


public interface ChargesManager {
	
	public List<Charges> findAllCharges();
	
	public List<Charges> findAdditionalCharges(long participationid);
	
	public void updateCharges(Charges charges, boolean bUpdate, long wsid,String loginName);

}