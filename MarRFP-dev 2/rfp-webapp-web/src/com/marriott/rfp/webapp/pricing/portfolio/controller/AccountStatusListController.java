package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.filterLists.AccountFilterLists;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusList;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusRef;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN", "MFPFSALE", "MFPSALES" })
@RestController
@RequestMapping("/accountstatus")
public class AccountStatusListController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(AccountStatusListController.class);
	@Autowired
	private PricingAdminService pricingAdminService = null;
	@Autowired
	private PricingFilterListsService pricingFilterListsService = null;
	@Autowired
	private PortfolioService portfolioService = null;
	@Autowired
	private ConstantsService constantsService = null;
	@Autowired
	private MudroomService mudroomService = null;

	public AccountStatusListController() {
		super();
	}
	@Autowired
	public AccountStatusListController(PortfolioService portfolioService) {
		super();
	}
	@RequestMapping(value = "/getListOfAccountStatus",method = {GET,POST})
	public String getListOfAccountStatus(Long searchperiod, String strPage, String accountpricingtype, String accountsegment, Integer orderby, String alphaOrder, String showPortfolio, String pasManager, Long accountstatus) throws Exception {
		Page page = new Page();
		List<AdminMudroom> pasManagerList = null;
		AccountFilterLists accountfilterlists=null;
		List<AccountStatusRef> accountStatusRefList = null;
		List<AccountStatusList> accountStatusList=null;
		Long totalPages = 0L;
		try {
			if(StringUtils.isNotEmpty((strPage)))
			{
				page=fromJson(strPage, Page.class);
			}

			if (page != null && page.getPage() == 0) {
				page.setPage(1);
			}
			page.setMaxpagelen(constantsService.getAccountStatusMaxPageLen());
			if (searchperiod == null) {
				orderby = 0;
				searchperiod = (long) 0;
			}
			if (accountpricingtype == null || accountpricingtype.equals("")) {
				if (getUserProperties().getIsPASAdmin())
					accountpricingtype = "C";
				else
					accountpricingtype = "*";
			}
			if (accountsegment == null || accountsegment.equals("")) {
				accountsegment = "*";
			}
			if (pasManager == null || pasManager.equals("")) {
				pasManager = "*";
			}

			showPortfolio=(showPortfolio==null)?"N":showPortfolio;
			//Calendar c= Calendar.getInstance();//added for null check for searchPeriod
			//searchperiod=(searchperiod==null)?c.getTime().getYear():searchperiod;
			orderby=(orderby==null)?1:orderby;//for null issue
			accountstatus=(accountstatus==null)?1L:accountstatus;//for null issue
			accountfilterlists = pricingAdminService.getPricingAccountFilterLists();
			accountfilterlists.setAccountPricingTypeList(pricingFilterListsService.getDisplayAccountPricingTypes());
			//initialize();
			pasManagerList = mudroomService.findPASManagerList();
			totalPages = portfolioService.getTotalAccoutStatusListPages(searchperiod, accountpricingtype,
					accountsegment, orderby, alphaOrder, getUserProperties(), page.getMaxpagelen(), pasManager,showPortfolio);
			accountStatusRefList = portfolioService.getAllAccountStatusRef();
			accountStatusList = portfolioService.findAccountStatusListDetail(searchperiod, accountpricingtype,
					accountsegment, orderby, page, alphaOrder, getUserProperties(), pasManager, accountstatus,
					showPortfolio);
			if (totalPages == 0) {
				page.setPage(0);
			}
			Map<String, Object> status =new HashMap<>();
			status.put("accountfilterlists",accountfilterlists);
			status.put("pasManagerList",pasManagerList);
			status.put("totalPages",totalPages);
			status.put("accountStatusRefList",accountStatusRefList);
			status.put("accountStatusList",accountStatusList);
			return gsonStream(status);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/updateaccountstatus" ,method = POST)
	public String updateaccountstatus(String strAccountStatusUpdate, String formChg) throws Exception {
		Map<Long, AccountStatusList> accountStatusUpdate = null;
		try {
			Type collectionType = new TypeToken<Map<Long, AccountStatusList>>(){}.getType();
			accountStatusUpdate = (Map<Long, AccountStatusList>) fromJson(strAccountStatusUpdate, collectionType);
			if (formChg != null && formChg.equals("Y"))
				portfolioService.updateAccountStatus(accountStatusUpdate, getUserProperties());
			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}


	public void setPricingAdminService(PricingAdminService pricingAdminService) {
		this.pricingAdminService = pricingAdminService;
	}

	public PricingAdminService getPricingAdminService() {
		return pricingAdminService;
	}

	public PortfolioService getPortfolioService() {
		return portfolioService;
	}

	public void setPortfolioService(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}

	public void setConstantsService(ConstantsService constantsService) {
		this.constantsService = constantsService;
	}

	public ConstantsService getConstantsService() {
		return constantsService;
	}

	public MudroomService getMudroomService() {
		return mudroomService;
	}

	public void setMudroomService(MudroomService mudroomService) {
		this.mudroomService = mudroomService;
	}

	public PricingFilterListsService getPricingFilterListsService() {
		return pricingFilterListsService;
	}

	public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
		this.pricingFilterListsService = pricingFilterListsService;
	}


}
