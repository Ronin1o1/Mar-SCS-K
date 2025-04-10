package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.pricing.sapp.*;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.state.State;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.utility.NumberUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/acctoverview")
public class AcctOverviewController extends BaseSAPPController {

	private static final Logger log = LoggerFactory.getLogger(AcctOverviewController.class);
	@Autowired
	private ListsService listsService=null;
	@Autowired
	private PricingFilterListsService pricingFilterListsService=null;

	private static final String CURRENT_SCREEN = "acctoverview";
	private static final String  NEXT_SCREEN = "acctcontacts";
	private static final String  PREVIOUS_SCREEN = null;

	public AcctOverviewController() {
		super();

	}

	@Autowired
	public AcctOverviewController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                  AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService, PricingFilterListsService pricingFilterListsService) {
		super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
		this.listsService=listsService;
		this.pricingFilterListsService=pricingFilterListsService;


	}

	@RequestMapping(value = "/getAcctOverview",method = GET)
	public String getAcctOverview(long period,Long accountrecid) throws Exception {
		AccountOverview accountOverview=null;
		long maxCompetitor=0l;
		GenHist genHistAcct=null;
		List<Competitor> pctCompetitor=null;
		List<ActualSpend> rgnActualSpend=null;
		List<Contacts> t1_title=null;
		List<Contacts> t1_title2=null;
		List<Contacts> hdq_title=null;
		List<Contacts> hdq_addr=null;
		Contacts t1_heading=null;
		Contacts t1_heading2 = null;
		Contacts hdq_heading =null;
		List<Contacts> t1_contact=null;
		List<Contacts> t1_contact2=null;
		List<Contacts> hdq_contact=null;
		List<Contacts> hdqadr_contact=null;
		Contacts teamLeader =null;
		Contacts teamLeader2=null;
		Contacts hdq = null;
		Contacts hdqadr=null;
		List<State> stateRef=null;
		List<Country> countryRef=null;
		List<DetailList> globalRef=null;
		List<RegionRef> regionRef=null;
		List<DetailList> assnRef=null;
		List<DetailList> grmRef=null;
		List<DetailList> infRef=null;
		List<DSUser> userRef=null;
		String accountname = null;
		String lastupdatedate = null;
		boolean checkFields = false;
		try {
			//setPeriod(period);
			accountOverview = getAccountOverviewService().getAcctOverview(accountrecid, period);
			accountrecid = accountOverview.getAccountrecid();
			accountname = accountOverview.getAccountname();
			lastupdatedate = accountOverview.getLastupdatedate();
			t1_title = getAccountOverviewService().getAcctOverviewContactTypes(1, 0);
			t1_title2 = getAccountOverviewService().getAcctOverviewContactTypes(15, 0);
			hdq_title = getAccountOverviewService().getAcctOverviewContactTypes(14, 0);
			hdq_addr = getAccountOverviewService().getAcctOverviewContactTypes(16, 0);
			if (t1_title != null && t1_title.size() > 0)
				t1_heading = t1_title.get(0);
			if (t1_title2 != null && t1_title2.size() > 0)
				t1_heading2 = t1_title2.get(0);
			if (hdq_title != null && hdq_title.size() > 0)
				hdq_heading = hdq_title.get(0);
			//setContactTitles();
			//setContactData();
			t1_contact = getAccountOverviewService().getAcctOverviewContacts(accountrecid, 1, 0);
			t1_contact2 = getAccountOverviewService().getAcctOverviewContacts(accountrecid, 15, 0);
			hdq_contact = getAccountOverviewService().getAcctOverviewContacts(accountrecid, 14, 0);
			hdqadr_contact = getAccountOverviewService().getAcctOverviewContacts(accountrecid, 16, 0);
			if (t1_contact != null && t1_contact.size() > 0)
				teamLeader = t1_contact.get(0);
			if (t1_contact2 != null && t1_contact2.size() > 0)
				teamLeader2 = t1_contact2.get(0);
			if (hdq_contact != null && hdq_contact.size() > 0)
				hdq = hdq_contact.get(0);
			if (hdqadr_contact != null && hdqadr_contact.size() > 0)
				hdqadr = hdqadr_contact.get(0);
			//setReferenceLists();
			maxCompetitor = getConstantsService().getMaxCompetitor();
			genHistAcct = getAccountOverviewService().getAcctOverviewGenHist(accountrecid);
			rgnActualSpend = getAccountOverviewService().findAcctOverviewActualSpend(accountrecid, "rgn");
			stateRef = listsService.getStates("US");
			countryRef = listsService.getCountries();
			globalRef = getDetailListService().getDetailListGlb();
			regionRef = listsService.getOperatingRegions();
			assnRef = getDetailListService().getDetailListAssn();
			grmRef = getDetailListService().getDetailListGrm();
			infRef = getDetailListService().getDetailListInf();
			userRef = pricingFilterListsService.getAccountPlanUserList(accountrecid);
			Map<Long, ActualSpend> map = new HashMap<Long, ActualSpend>();
			for (ActualSpend rgnActSpend : rgnActualSpend) {
				long regionid = rgnActSpend.getRegionid();
				Long key = regionid;
				map.put(key, rgnActSpend);
			}
			Map<Long, ActualSpend>	rgnActualSpendMap=map;

			pctCompetitor = getAccountOverviewService().getAcctOverviewCompetitor(accountrecid);
			Map<Integer, Competitor> pctMap = new HashMap<Integer, Competitor>();
			for (Competitor pctAcctComp : pctCompetitor) {
				Integer key = pctAcctComp.getSeqid().intValue();
				pctMap.put(key, pctAcctComp);
			}
			Map<Integer, Competitor> pctCompetitorMap = pctMap;

			if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
				checkFields = false;
			} else {
				checkFields = true;
			}

			Map<String, Object> info = new HashMap<>();
			info.put("period", period);
			info.put("accountOverview", accountOverview);
			info.put("accountrecid", accountrecid);
			info.put("accountname", accountname);
			info.put("lastupdatedate", lastupdatedate);
			info.put("t1_title", t1_title);
			info.put("t1_title2", t1_title2);
			info.put("hdq_title", hdq_title);
			info.put("hdq_addr", hdq_addr);
			info.put("t1_heading", t1_heading);
			info.put("t1_heading2", t1_heading2);
			info.put("hdq_heading", hdq_heading);
			info.put("t1_contact", t1_contact);
			info.put("t1_contact2", t1_contact2);
			info.put("hdq_contact", hdq_contact);
			info.put("hdqadr_contact", hdqadr_contact);
			info.put("teamLeader", teamLeader);
			info.put("teamLeader2", teamLeader2);
			info.put("hdqadr", hdqadr);
			info.put("hdq", hdq);
			info.put("stateRef", stateRef);
			info.put("countryRef", countryRef);
			info.put("globalRef", globalRef);
			info.put("regionRef", regionRef);
			info.put("assnRef", assnRef);
			info.put("grmRef", grmRef);
			info.put("infRef", infRef);
			info.put("userRef", userRef);
			info.put("maxCompetitor", maxCompetitor);
			info.put("genHistAcct", genHistAcct);
			info.put("rgnActualSpend", rgnActualSpend);
			info.put("rgnActualSpendMap", rgnActualSpendMap);
			info.put("pctCompetitor", pctCompetitor);
			info.put("pctCompetitorMap", pctCompetitorMap);
			info.put("checkFields", checkFields);
			info.put("currentScreen", CURRENT_SCREEN);
			info.put("nextScreen", NEXT_SCREEN);
			info.put("previousScreen", PREVIOUS_SCREEN);
			info.put("ttlglb_mar_room_rev1",NumberUtility.formatRateNumber(genHistAcct.getTtlglb_mar_room_rev()));
			info.put("ttlglb_hotelspend_rev1", NumberUtility.formatRateNumber(genHistAcct.getTtlglb_hotelspend_rev()));
			return objectMapperStream(info);


		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	@RequestMapping(value = "/updateAcctOverview",method = POST)
	public String updateAcctOverview(Long accountrecid,String formChg, long period,String strAccountOverview, String strTeamLeader, String strTeamLeader2, String strHdq,String strHdqadr, String strGenHistAcct, String strPctCompetitorMap,String strRgnActualSpendMap) throws Exception {
		AccountOverview accountOverview=null;
		Contacts teamLeader =null;
		Contacts teamLeader2=null;
		Contacts hdq = null;
		Contacts hdqadr=null;
		GenHist genHistAcct=null;
		GenHist genHistAcctUpd=null;
		Map<Integer, Competitor> pctCompetitorMap=null;
		Map<Long, ActualSpend> rgnActualSpendMap=null;
		try {
			accountOverview=fromJson(strAccountOverview, AccountOverview.class);
			teamLeader=fromJson(strTeamLeader, Contacts.class);
			teamLeader2=fromJson(strTeamLeader2, Contacts.class);
			hdq=fromJson(strHdq, Contacts.class);
			hdqadr=fromJson(strHdqadr, Contacts.class);
			genHistAcct=fromJson(strGenHistAcct, GenHist.class);

			genHistAcctUpd = getAccountOverviewService().getAcctOverviewGenHist(accountrecid);
			List<Contacts> list = new ArrayList<Contacts>();
			accountOverview.setAccountrecid(accountrecid);

			if (formChg.equals("Y")) {

				if(teamLeader.getName()!=null) {
					String name_eid[] = teamLeader.getName().split("%");
					if (name_eid.length >= 2) {
						teamLeader.setName(name_eid[0]);
						teamLeader.setEid(name_eid[1]);
					}
				}
				teamLeader.setContactTypeID(new Long(1));
				list.add(teamLeader);
				if(teamLeader2.getName()!=null ){
				String name_eid1[] = teamLeader2.getName().split("%");
				if (name_eid1.length >= 2) {
					teamLeader2.setName(name_eid1[0]);
					teamLeader2.setEid(name_eid1[1]);
				}
				}
				teamLeader2.setContactTypeID(new Long(15));
				list.add(teamLeader2);

				hdq.setName("HDQ");
				hdq.setTitle("HDQ");
				hdq.setContactTypeID(new Long(14));
				list.add(hdq);

				hdqadr.setName("HDQADR");
				hdqadr.setTitle("HDQADR");
				hdqadr.setContactTypeID(new Long(16));
				list.add(hdqadr);


				genHistAcctUpd.setMar_tracking(genHistAcct.getMar_tracking());
				genHistAcctUpd.setTtlglb_hotelspend_rev(genHistAcct.getTtlglb_hotelspend_rev());
				genHistAcctUpd.setTtlglb_mar_room_rev(genHistAcct.getTtlglb_mar_room_rev());
				genHistAcctUpd.setTtlglb_pct_marspend_rev(genHistAcct.getTtlglb_pct_marspend_rev());

				Type collectionType = new TypeToken<Map<Integer, Competitor>>(){}.getType();
				pctCompetitorMap = fromJson(strPctCompetitorMap, collectionType);

				Type collectionType1 = new TypeToken<Map<Long, ActualSpend>>(){}.getType();
				rgnActualSpendMap = fromJson(strRgnActualSpendMap, collectionType1);

				getAccountOverviewService().updateAcctOverviewsGen(accountOverview, period, accountrecid, getUserProperties().getEid());
				getAccountOverviewService().updateAcctOverviewContacts(list, accountrecid, getUserProperties().getEid());
				getAccountOverviewService().updateAcctOverviewCompetitor(pctCompetitorMap, accountrecid);
				getAccountOverviewService().updateAcctOverviewActualSpend(rgnActualSpendMap, accountrecid);
				getAccountOverviewService().updateAcctOverviewsGenHist(genHistAcctUpd, accountrecid);

			}

			return SUCCESS;

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	public void setListsService(ListsService listsService) {
		this.listsService = listsService;
	}

	public ListsService getListsService() {
		return listsService;
	}

	public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
		this.pricingFilterListsService = pricingFilterListsService;
	}

	public PricingFilterListsService getPricingFilterListsService() {
		return pricingFilterListsService;
	}


}