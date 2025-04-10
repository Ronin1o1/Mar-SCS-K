package com.marriott.rfp.business.pricing.hotelrfpgeneral.impl;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelGeneralRatesManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelGeneralRulesManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPLOSManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPSeasonManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRateTypeManager;
import com.marriott.rfp.dataacess.pricing.hotelrfpdos.api.HotelRFPDOSManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelLRA_NLRA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.pricing.hotelrfp.RateTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.RoomTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPGeneralRatesServiceImpl implements HotelRFPGeneralRatesService {

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;

	@Autowired
	HotelRFPLOSManager losMgr = null;

	@Autowired
	HotelRFPSeasonManager seasonMgr = null;

	@Autowired
	HotelRFPDOSManager dosMgr = null;

	@Autowired
	HotelRateTypeManager ratetypeMgr = null;

	@Autowired
	HotelGeneralRatesManager genRateMgr = null;

	@Autowired
	HotelGeneralRulesManager genRuleMgr = null;

	@Autowired
	HotelRFPManager hotelRFPMgr = null;

	public String isDOSEnhanced(long hotelrfpid) {
		return dosMgr.isDOSEnhanced(hotelrfpid);
	}

	public List<LengthOfStay> getHotelLOS(long hotelrfpid) {
		return losMgr.getHotelLOS(hotelrfpid);
	}

	public List<LengthOfStay> getHotelLOSWithDefault(long hotelrfpid) {
		List<LengthOfStay> losList = losMgr.getHotelLOS(hotelrfpid);
		List<LengthOfStay> finallosList = new Vector<LengthOfStay>();
		if (losList.size() == 0) {
			LengthOfStay los = new LengthOfStay();
			los.setLengthofstayid(1L);
			los.setRoomnightsfrom(1L);
			los.setRoomnightsto(255L);
			finallosList.add(los);
		} else {
			for (int i = 0; i < losList.size(); i++) {
				finallosList.add(losList.get(i));
			}
		}
		return finallosList;
	}

	public void updateHotelLOS(String formChg, long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user) {
		if (user.getIsPASAdmin() || user.getIsHotelUser() && lengthOfStayList != null)
			losMgr.updateHotelLOS(hotelrfpid, lengthOfStayList, user);
		hotelMenuMgr.update(hotelrfpid, 19, 0, "", "C", user, "Y", "");

	}

	public void updateHotelLOS(String formChg, long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user) {
		if ((user.getIsPASAdmin() || user.getIsHotelUser()) && hotelLOS != null) {
			losMgr.updateHotelLOS(hotelrfpid, hotelLOS, user);
			hotelMenuMgr.update(hotelrfpid, 19, 0, "", "C", user, "Y", "");
		}

	}

	public List<LengthOfStay> getHotelGovLOS(long hotelrfpid) {
		return losMgr.getHotelGovLOS(hotelrfpid);
	}

	public void updateHotelGovLOS(String formChg, long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user) {
		if ((user.getIsPASAdmin() || user.getIsHotelUser()) && lengthOfStayList != null) {
			losMgr.updateHotelGovLOS(hotelrfpid, lengthOfStayList, user);
			hotelMenuMgr.update(hotelrfpid, 17, 0, "", "C", user, "Y", "");
		}
	}

	public void updateHotelGovLOS(String formChg, long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user) {
		if ((user.getIsPASAdmin() || user.getIsHotelUser()) && hotelLOS != null)
			losMgr.updateHotelGovLOS(hotelrfpid, hotelLOS, user);
		hotelMenuMgr.update(hotelrfpid, 17, 0, "", "C", user, "Y", "");
	}

	public List<Season> getHotelSeason(long hotelrfpid) {
		return seasonMgr.getHotelSeason(hotelrfpid);
	}

	public List<Season> getHotelSeasonWithDefault(long hotelrfpid, long period) {
		List<Season> seasonList = seasonMgr.getHotelSeason(hotelrfpid);
		List<Season> finalseasonList = new Vector<Season>();
		if (seasonList.size() == 0) {
			Season defaultSeason = new Season();
			defaultSeason.setSeasonid(1L);
			try {
				defaultSeason.setStartdate(DateUtility.parseDate("01/01/" + period));
				defaultSeason.setEnddate(DateUtility.parseDate("12/31/" + period));
			} catch (ParseException e) {
			}
			finalseasonList.add(defaultSeason);
		} else {
			for (int i = 0; i < seasonList.size(); i++) {
				finalseasonList.add(seasonList.get(i));
			}
		}
		return finalseasonList;
	}

	public void updateHotelSeason(String formChg, long hotelrfpid, List<Season> seasonList, User user) {
		if (formChg != null && formChg.equals("Y") && seasonList != null)
			seasonMgr.updateHotelSeasons(hotelrfpid, seasonList, user);
		hotelMenuMgr.update(hotelrfpid, 5, 0, "", "C", user, "Y", "");
	}

	public void updateHotelSeason(String formChg, long hotelrfpid, Map<String, Season> hotelSeason, User user, String num_seasoninitial) {
		if (hotelSeason != null && formChg != null && (formChg.equals("Y") || (formChg.equals("N") && (num_seasoninitial.equals("1")))))
			seasonMgr.updateHotelSeasons(hotelrfpid, hotelSeason, user);
		hotelMenuMgr.update(hotelrfpid, 5, 0, "", "C", user, "Y", "");
	}

	public List<Season> getHotelGovSeason(long hotelrfpid, long period) {
		List<Season> seasonList = seasonMgr.getHotelGovSeason(hotelrfpid);
		List<Season> finalseasonList = new Vector<Season>();
		if (seasonList == null || seasonList.size() == 0) {
			Season model = new Season();
			model.setSeasonid(new Long(1));
			model.setRfpseasonid(new Long(-1));
			try {
				model.setStartdate(DateUtility.parseDate("01/01/" + period));
				model.setEnddate(DateUtility.parseDate("09/30/" + period));
			} catch (ParseException e) {
			}
			finalseasonList.add(model);
			Season model2 = new Season();
			model2.setSeasonid(new Long(2));
			model.setRfpseasonid(new Long(-1));
			try {
				model2.setStartdate(DateUtility.parseDate("10/01/" + period));
				model2.setEnddate(DateUtility.parseDate("12/31/" + period));
			} catch (ParseException e) {
			}
			finalseasonList.add(model2);
		} else {
			for (int i = 0; i < seasonList.size(); i++) {
				finalseasonList.add(seasonList.get(i));
			}
		}

		return finalseasonList;
	}

	public void updateHotelGovSeason(String formChg, long hotelrfpid, List<Season> seasonList, User user) {
		if (formChg != null && formChg.equals("Y") && seasonList != null)
			seasonMgr.updateHotelGovSeasons(hotelrfpid, seasonList, user);
		hotelMenuMgr.update(hotelrfpid, 14, 0, "", "C", user, "Y", "");
	}

	public void updateHotelGovSeason(String formChg, long hotelrfpid, Map<String, Season> hotelSeason, User user) {
		if (formChg != null && formChg.equals("Y") && hotelSeason != null)
			seasonMgr.updateHotelGovSeasons(hotelrfpid, hotelSeason, user);
		hotelMenuMgr.update(hotelrfpid, 14, 0, "", "C", user, "Y", "");
	}

	public RateTypeRef findRateDefDetail(long ratetypeid) {
		return ratetypeMgr.findRateDefDetail(ratetypeid);
	}

	public List<HotelLRA_NLRA> findLRAProductsDetail(long ratetypeid) {
		return ratetypeMgr.findLRAProductsDetail(ratetypeid);
	}

	public List<RoomTypeRef> findRoomTypesDetail(long affiliationid) {
		return ratetypeMgr.findRoomTypesDetail(affiliationid);
	}
	
	public List<HotelRFPRmPools> getHotelRFPRmPools(long hotelrfp) {
		return hotelRFPMgr.getHotelRFPRmPools(hotelrfp);
	}


	public List<HotelRules> findGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user) {
		return genRuleMgr.findGenRulesDetail(hotelrfpid, ratetypeid, isInternational, user);
	}

	public void updateGeneralRules(String formChg, long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user) {
		if (formChg != null && formChg.equals("Y"))
			genRuleMgr.updateGeneralRules(hotelrfpid, ratetypeid, ruleslist, user);
	}

	public List<HotelRules> findGovGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user) {
		return genRuleMgr.findGovGenRulesDetail(hotelrfpid, ratetypeid, isInternational, user);
	}

	public void updateGovGeneralRules(String formChg, long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user) {
		if (formChg != null && formChg.equals("Y"))
			genRuleMgr.updateGovGeneralRules(hotelrfpid, ratetypeid, ruleslist, user);
	}

	public HashMap<String, HotelRates> findGenRatesDetail(long hotelrfpid, long ratetypeid) {
		List<HotelRates> hotelrateslist = genRateMgr.findGenRatesDetail(hotelrfpid, ratetypeid);
		HashMap<String, HotelRates> hotelrates = new HashMap<String, HotelRates>();
		if (hotelrateslist != null && hotelrateslist.size() > 0) {
			for (int i = 0; i < hotelrateslist.size(); i++) {
				HotelRates hr = hotelrateslist.get(i);
				String newkey = hr.getSeasonid() + "_" + hr.getLengthofstayid() + "_" + hr.getRoompool() + "_" + hr.getProductid() + "_" + hr.getRoomtypeid();
				hotelrates.put(newkey, hr);
			}
		}
		return hotelrates;
	}

	public void updateGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {
		if (rateslist == null)
			return;
		if (formChg != null && formChg.equals("Y"))
			genRateMgr.updateGeneralRates(hotelrfpid, ratetypeid, rateslist, user);
		// if the rate if a fixed rate, then do addition updates
		if (ratetypeid == 1) {
			if (formChg != null && formChg.equals("Y"))
				genRateMgr.updateGeneralFixedRates(hotelrfpid, user);
			hotelMenuMgr.update(hotelrfpid, 7, 0, "", "C", user, "Y", "");
		} else if (ratetypeid == 4)
			hotelMenuMgr.update(hotelrfpid, 10, 0, "", "C", user, "Y", "");

	}

	public void updateGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, Map<String, Season> seasons, Map<String, LengthOfStay> loss, User user) {
		if (rateslist == null)
			return;
		if (formChg != null && formChg.equals("Y")) {
			for (String keyRates : rateslist.keySet()) {
				HotelRates rate = rateslist.get(keyRates);
				String[] splitKeyRates = keyRates.split("_");
				Season season = seasons.get(splitKeyRates[0]);
				rate.setSeasonid(season.getSeasonid());
				if (loss != null) {
					LengthOfStay los = loss.get(splitKeyRates[0] + "_" + splitKeyRates[1]);
					rate.setLengthofstayid(los.getLengthofstayid());
				} else
					rate.setLengthofstayid(1L);
			}
			genRateMgr.updateGeneralRates2(hotelrfpid, ratetypeid, rateslist, user);
		}
		// if the rate if a fixed rate, then do addition updates
		if (ratetypeid == 1) {
			if (formChg != null && formChg.equals("Y"))
				genRateMgr.updateGeneralFixedRates(hotelrfpid, user);
			hotelMenuMgr.update(hotelrfpid, 7, 0, "", "C", user, "Y", "");
		} else if (ratetypeid == 4)
			hotelMenuMgr.update(hotelrfpid, 10, 0, "", "C", user, "Y", "");

	}

	public HashMap<String, HotelRates> findGovGenRatesDetail(long hotelrfpid, long ratetypeid) {
		List<HotelRates> hotelrateslist = genRateMgr.findGovGenRatesDetail(hotelrfpid, ratetypeid);
		HashMap<String, HotelRates> hotelrates = new HashMap<String, HotelRates>();
		if (hotelrateslist != null && hotelrateslist.size() > 0) {
			for (int i = 0; i < hotelrateslist.size(); i++) {
				HotelRates hr = hotelrateslist.get(i);
				String newkey = hr.getSeasonid() + "_" + hr.getLengthofstayid() + "_" +  hr.getRoompool() + "_" + hr.getProductid() + "_" + hr.getRoomtypeid();
				hotelrates.put(newkey, hr);
			}
		}
		return hotelrates;
	}

	public void updateGovGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {
		if (formChg != null && formChg.equals("Y"))
			genRateMgr.updateGovGeneralRates(hotelrfpid, ratetypeid, rateslist, user);
		hotelMenuMgr.update(hotelrfpid, 18, 0, "", "C", user, "Y", "");
	}

	public void updateGovGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, Map<String, Season> seasons, Map<String, LengthOfStay> loss, User user) {
		if (rateslist == null)
			return;
		if (formChg != null && formChg.equals("Y")) {
			for (String keyRates : rateslist.keySet()) {
				HotelRates rate = rateslist.get(keyRates);
				String[] splitKeyRates = keyRates.split("_");
				Season season = seasons.get(splitKeyRates[0]);
				rate.setSeasonid(season.getSeasonid());
				if (loss != null) {
					LengthOfStay los = loss.get(splitKeyRates[0] + "_" + splitKeyRates[1]);
					rate.setLengthofstayid(los.getLengthofstayid());
				} else
					rate.setLengthofstayid(1L);
			}
			genRateMgr.updateGovGeneralRates2(hotelrfpid, ratetypeid, rateslist, user);
		}
		hotelMenuMgr.update(hotelrfpid, 18, 0, "", "C", user, "Y", "");

	}

}
