package com.marriott.rfp.business.wholesaler.daysofweek.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.daysofweek.api.WholesalerDaysOfWeekService;
import com.marriott.rfp.dataaccess.wholesaler.daysofweek.api.DaysOfWeekManager;
import com.marriott.rfp.object.wholesaler.daysofweek.DaysOfWeek;

/**
 * Session Bean implementation class WholesalerDaysOfWeekService
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerDaysOfWeekServiceImpl implements WholesalerDaysOfWeekService {

	EntityManager em;
	@Autowired
	DaysOfWeekManager dowamgr = null;

	public WholesalerDaysOfWeekServiceImpl() { }

	public List<DaysOfWeek> findAllDaysOfWeek() {
		List<DaysOfWeek> daysOfWeekList = dowamgr.findAllDaysOfWeek();
		return daysOfWeekList;
	}
	
	public List<DaysOfWeek> findDOWByParticipationId(long wsid) {
		List<DaysOfWeek> daysOfWeekList = dowamgr.findDOWByParticipationId(wsid);
		return daysOfWeekList;
	}

	public void updateDaysofWeek(List<DaysOfWeek> dow, long wsid, String formChanged, long period, boolean isPeriodExpired, String role, String loginName) {
		dowamgr.updateDaysofWeek(dow, wsid, formChanged, period, isPeriodExpired, role, loginName);
	}

	public List<DaysOfWeek> findDOWByParticipationIdwithoutComma(long wsid) { 
		List<DaysOfWeek> dowV = dowamgr.findDOWByParticipationIdwithoutComma(wsid);
		return dowV;
	}

}