package com.marriott.rfp.business.wholesaler.seasons.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.seasons.api.WholesalerSeasonsService;
import com.marriott.rfp.dataaccess.wholesaler.seasons.api.SeasonsManager;
import com.marriott.rfp.object.wholesaler.seasons.Seasons;

/**
 * Session Bean implementation class WholesalerSeasonsService
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerSeasonsServiceImpl implements WholesalerSeasonsService {
	
	EntityManager em;
	@Autowired
	SeasonsManager seamgr=null;	

	public WholesalerSeasonsServiceImpl() { }

	public List<Seasons> getSeasonDetails(long wsid) {
		List<Seasons> seasonsList =seamgr.getSeasonDetails(wsid);
		return seasonsList;
	}

	public void updateSeasons(List<Seasons> seasonList,long wsid,String formChanged, long period, String role, boolean isPeriodExpired, String loginName){
		seamgr.updateSeasons(seasonList,wsid,formChanged, period, role, isPeriodExpired, loginName);
	}

}