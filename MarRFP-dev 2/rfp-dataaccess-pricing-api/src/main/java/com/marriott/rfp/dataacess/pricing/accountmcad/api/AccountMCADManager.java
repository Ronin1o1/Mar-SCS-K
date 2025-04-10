package com.marriott.rfp.dataacess.pricing.accountmcad.api;

import java.util.List;

import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;


public interface AccountMCADManager {
	public List<MCADData> findOracleMCAD(long accountrecid);
	
	public void updateMCAD(long accountrecid, MCADDetail mcadDetail);

	public void deleteMCAD(long accountrecid);
	
	public MCADDetail findOracleMCADDetail(long accountrecid,  long businessid);

}
