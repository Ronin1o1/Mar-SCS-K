package com.marriott.rfp.business.wholesaler.participate.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.participate.api.WholesalerParticipateService;
import com.marriott.rfp.dataaccess.wholesaler.participate.api.ParticipateManager;
import com.marriott.rfp.object.wholesaler.participate.Participiate;

/**
 * Session Bean implementation class WholesalerParticipateServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerParticipateServiceImpl implements WholesalerParticipateService {

	@Autowired
	ParticipateManager pmgr=null;	
	
	public WholesalerParticipateServiceImpl() { }

	public long findWSParticipationID(String marshacode, long period, String loginName){
		long lng=pmgr.findWSParticipationID(marshacode, period, loginName);
		return lng;
	}
	
	public String isParticipating(long participationid){
		String strPart=pmgr.isParticipating(participationid);
		return strPart;
	}
	
	public  String hasPeriodExpired(long period, long participationid){
		String strPeriodExpired=pmgr.hasPeriodExpired(period,participationid);
		return strPeriodExpired;
	}
	
	public  Participiate findRespondentDetails(long wsid, String role, String loginName){
		Participiate partcipiate=null;	
		partcipiate=pmgr.findRespondentDetails(wsid, role, loginName);
		return partcipiate;
	}
	public void updateRespondent(Participiate participate,long wsid, String changed, String role, boolean isPeriodExpired, String loginName){
		pmgr.updateRespondent(participate, wsid, changed, role, isPeriodExpired, loginName);
		pmgr.updateParticipiant(participate, wsid, changed, role, isPeriodExpired, loginName);
	}
	
}