package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.object.franchise.Franchise;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.AccountFilterLists;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN", "MFPAPADM" })
@RestController
@RequestMapping("/useredit")
public class UserEditController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(UserEditController.class);
	@Autowired
	private UserAdminService userAdminService = null;
	@Autowired
	private ConstantsService constantsService = null;
	@Autowired
	private PricingAdminService pricingAdminService = null;
	public static final String AVAILPROP = "availPropList";
	public static final String SELPROP = "selPropList";

	public UserEditController() {
		super();
	}

	@Autowired
	public UserEditController(UserAdminService userAdminService, ConstantsService constantsService, PricingAdminService pricingAdminService) {
		super();
		this.setUserAdminService(userAdminService);
		this.setConstantsService(constantsService);
		this.setPricingAdminService(pricingAdminService);
	}

	//renamed execute to getUserEdit
	@RequestMapping(value = "/getUserEdit",method =POST )
	public String getUserEdit(String franchise, String role, boolean showProperties, String optSel, boolean showAccounts, boolean showManaged, Long userid, String strCurrPagePropSel, String alphaOrderProp, String filterByMorF, String alphaOrderAcct, String accountpricingtype, String accountsegment, String strCurrPageProp, String strCurrPageAcctSel, String strCurrPageAcct,Long totPropSelPageLen) throws Exception {
		AccountFilterLists accountfilterlists = null;
		List<RegionRef> regions = null;
		List<HotelAffiliation> hotelAffiliations = null;
		List<Franchise> franchiseList = null;
		Map<String,Object>hotelAffiliationsMap = null;
		Map<String,Object> regionMap = null;
		Map<String,Object> franchiseListMap = null;
		String franchFound = "N";
		String regionFound = "N";
		String brandFound = "N";
		String allHotels = "N";
		DSUser user = null;
		Page currPageProp = null;
		Page currPagePropSel = null;
		Page currPageAcct = null;		Page currPageAcctSel = null;
		List<Account> accountlist  = null;
		List<Account> accountlistAll = null;
		List<HotelDetailData> hotelList = null;
		Long totNumUserProp = null;
		List<HotelDetailData> hotellistAll = null;
		Long totNumProp = null;
		Long totPropPageLen = null;
		Long totAcctSelPageLen = null;
		Long totAcctPageLen = null;
		Long totNumUserAcct = null;
		Map<String, Object> populateSelPropListsMap = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelAcctListsMap = null;
		Map<String,Object> populateAvailAcctListsMap =null;
		try {
			/*accountpricingtype=accountpricingtype;
			accountsegment=accountsegment;*/
			//initialize(userid);
			user = userAdminService.getUserDetails(userid);
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageAcctSel))
				currPageAcctSel=fromJson(strCurrPageAcctSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageAcct))
				currPageAcct=fromJson(strCurrPageAcct, Page.class);
			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());


			if (currPageAcct == null) {
				currPageAcct = new Page();
			}
			currPageAcct.setMaxpagelen(constantsService.getUserEdAcctMaxLen());


			if (currPageAcctSel == null) {
				currPageAcctSel = new Page();
			}
			currPageAcctSel.setMaxpagelen(constantsService.getUserEdAcctSelMaxLen());


			if (accountpricingtype == null || accountpricingtype.equals("")) {
				if (getUserProperties().getIsPASAdmin())
					accountpricingtype = "C";
				else
					accountpricingtype = "*";
			}

			if (accountsegment == null || accountsegment.equals("")) {
				accountsegment = "*";
			}
			accountfilterlists = pricingAdminService.getAccountFilterLists();
			if (showProperties) {
				if ((franchise == null || franchise.equals("")) && role.equals("MFPFSALE")) {
					franchise = user.getFranchCode();
					if (franchise == null || franchise.equals("")) {
						showManaged=true;
						franchise = "0";
					}
				}
				hotelAffiliationsMap = getHotelAffiliations(userid);
				hotelAffiliations = (List<HotelAffiliation>) hotelAffiliationsMap.get("hotelAffiliations") ;
				brandFound = (String) hotelAffiliationsMap.get("brandFound");
				regionMap = getRegions(userid);
				regions = (List<RegionRef>) regionMap.get("regions") ;
				regionFound = (String) regionMap.get("regionFound");
				franchiseListMap = getHotelFranchiseList(userid,showManaged, role);
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelAffiliations") ;
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelFranchiseList") ;
				franchFound = (String) franchiseListMap.get("franchFound");
				populateSelPropListsMap = populateSelPropLists(userid,currPagePropSel);
				populateAvailPropListsMap = populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
			}
			if (showAccounts) {
				populateSelAcctListsMap = populateSelAcctLists(userid,currPageAcctSel);
				populateAvailAcctListsMap = populateAvailAcctLists(userid,role,alphaOrderAcct,accountpricingtype,accountsegment,currPageAcct);
			}
			if(StringUtils.isEmpty(optSel)) {
				if (optSel.equals("")) {
					if (user.getAllhotels().equals("Y")) {
						allHotels = "Y";
						optSel = "H";
					} else if ((user.getRegionIds().size() == 0) && (user.getAffiliationIds().size() == 0) && (user.getFranchCodes().size() == 0)) {
						optSel = "P";
					} else if ((user.getRegionIds().size() == 0) && (user.getAffiliationIds().size() == 0)) {
						optSel = "F";
					} else if (user.getRegionIds().size() == 0) {
						optSel = "B";
					} else {
						optSel = "R";
					}
				}
			}



			Map<String, Object> info = new HashMap<String, Object>();
			info.put("accountfilterlists",accountfilterlists);
			info.put("regions",regions);
			info.put("brandFound",brandFound);
			info.put("franchFound",franchFound);
			info.put("regionFound",regionFound);
			info.put("allHotels",allHotels);
			info.put("hotelAffiliations",hotelAffiliations);
			info.put("franchiseList",franchiseList);
			if(populateSelAcctListsMap!=null)
				info.put("accountlist",populateSelAcctListsMap.get("accountlist"));
			if(populateAvailAcctListsMap!=null)
				info.put("accountlistAll",populateAvailAcctListsMap.get("accountlistAll"));
			if(populateSelPropListsMap!=null)
				info.put("hotelList",populateSelPropListsMap.get("hotelList"));
			if(populateSelPropListsMap!=null)
				info.put("totNumUserProp",populateSelPropListsMap.get("totNumUserProp"));
			if(populateSelPropListsMap!=null)
				info.put("totPropSelPageLen",populateSelPropListsMap.get("totPropSelPageLen"));
			if(populateAvailPropListsMap!=null)
				info.put("hotellistAll",populateAvailPropListsMap.get("hotellistAll"));
			if(populateAvailPropListsMap!=null)
				info.put("totNumProp",populateAvailPropListsMap.get("totNumProp"));
			if(populateAvailPropListsMap!=null)
				info.put("totPropPageLen",populateAvailPropListsMap.get("totPropPageLen"));
			info.put("userDetails",user);
			if(populateSelAcctListsMap!=null)
				info.put("totAcctSelPageLen",populateSelAcctListsMap.get("totAcctSelPageLen"));
			if(populateAvailAcctListsMap!=null)
				info.put("totAcctPageLen",populateAvailAcctListsMap.get("totAcctPageLen"));
			if(populateSelAcctListsMap!=null)
				info.put("totNumUserAcct",populateSelAcctListsMap.get("totNumUserAcct"));
			info.put("optSel",optSel);


			return gsonStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	/*@RequestMapping(value ="/navigateUser" ,method =POST )
	public String navigateUser() throws Exception {
		try {
			return SUCCESS;
		} catch (Exception e) {
			e.printStackTrace();
			return FATAL_ERROR;
		}
	}*/
	@RequestMapping(value = "/updateProperty",method = POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public String updateProperty(String role, Long userid, String strHotelSelList, boolean showProperties, String enhancedSalesContact, String enhancedReporting, String alphaOrderProp, String filterByMorF, String strCurrPageProp,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> info = new HashMap<>();
		try {
			//initialize(userid);

			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);
			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			String[] hotelSelList=fromJson(strHotelSelList,String[].class);
			if (hotelSelList == null)
				hotelSelList = new String[0];

			if (showProperties) {
				userAdminService.updateUserProperties(userid, hotelSelList);
				if (role.equals("MFPUSER")) {
					if (enhancedReporting == null) {
						enhancedReporting = "N";
						info.put("enhancedReporting",enhancedReporting);
					} else if (enhancedReporting.equals("on")) {
						enhancedReporting = "Y";
						info.put("enhancedReporting",enhancedReporting);
					}
					userAdminService.updateUserEnhancedReporting(userid, enhancedReporting);
				}
				if (role.equals("MFPFSALE")) {
					if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
						enhancedSalesContact = "N";
						info.put("enhancedSalesContact",enhancedSalesContact);
					} else if (enhancedSalesContact.equals("on")) {
						enhancedSalesContact = "Y";
						info.put("enhancedSalesContact",enhancedSalesContact);
					}
					userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
				}
			}

			if(currPageProp!= null)
				populateAvailPropListsMap = populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
			if(populateAvailPropListsMap != null)
			{
				info.put("hotellistAll",populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp",populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen",populateAvailPropListsMap.get("totPropPageLen"));
			}
			return gsonStream(info);
			//return SUCCESS;

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}

	}
	@RequestMapping(value ="/updateBrndList" ,method =POST )
	public String updateBrndList(String role, boolean showProperties, Long userid, String optSel, String enhancedReporting, String enhancedSalesContact, String strCurrPagePropSel, String alphaOrderProp, String filterByMorF, String strCurrPageProp,String strSelectedAffiliationList,Long totPropSelPageLen) throws Exception {
		List<HotelAffiliation> hotelAffiliations = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelPropListsMap = null;
		Page currPagePropSel = null;
		Page currPageProp =null;
		Map<String,Object>hotelAffiliationsMap = null;
		String brandFound = "N";
		Map<String,Object>info=new HashMap<>();
		try {
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());



			String[] selectedAffiliationList=fromJson(strSelectedAffiliationList,String[].class);
			if (showProperties) {
				//hotelAffiliations = getHotelAffiliations(userid);
				hotelAffiliationsMap = getHotelAffiliations(userid);
				hotelAffiliations = (List<HotelAffiliation>) hotelAffiliationsMap.get("hotelAffiliations") ;
				if (!optSel.equals("B"))
					selectedAffiliationList = null;
				//if(selectedAffiliationList!=null)
					userAdminService.updateUserHotelAffiliation(userid, selectedAffiliationList, hotelAffiliations);
				//hotelAffiliations = getHotelAffiliations(userid);
				/*hotelAffiliationsMap = getHotelAffiliations(userid);
				hotelAffiliations = (List<HotelAffiliation>) hotelAffiliationsMap.get("hotelAffiliations") ;*/
				brandFound = (String) hotelAffiliationsMap.get("brandFound");

				if (role.equals("MFPUSER")) {
					if (enhancedReporting == null) {
						enhancedReporting = "N";
						info.put("enhancedReporting",enhancedReporting);
					} else if (enhancedReporting.equals("on")) {
						enhancedReporting = "Y";
						info.put("enhancedReporting",enhancedReporting);
					}
					userAdminService.updateUserEnhancedReporting(userid, enhancedReporting);
				}

				if (role.equals("MFPFSALE")) {
					if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
						enhancedSalesContact = "N";
						info.put("enhancedSalesContact",enhancedSalesContact);
					} else if (enhancedSalesContact.equals("on")) {
						enhancedSalesContact = "Y";
						info.put("enhancedSalesContact",enhancedSalesContact);
					}
					userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
				}
			}

			info.put("hotelAffiliations",hotelAffiliations);
			info.put("brandFound",brandFound);
			info.put("optSel",optSel);

			if (optSel.equals("P")) {
				if(currPageProp != null)
					populateAvailPropListsMap=	populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
				info.put("status",AVAILPROP);
				//return AVAILPROP;

			} else {
				if(currPagePropSel != null)
					populateSelPropListsMap =	populateSelPropLists(userid,currPagePropSel);
				info.put("status",SELPROP);
				//return SELPROP;
			}
			if(populateSelPropListsMap!=null) {
				info.put("hotelList", populateSelPropListsMap.get("hotelList"));
				info.put("totNumUserProp", populateSelPropListsMap.get("totNumUserProp"));
				info.put("totPropSelPageLen", populateSelPropListsMap.get("totPropSelPageLen"));
			}
			if(populateAvailPropListsMap!=null) {
				info.put("hotellistAll", populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp", populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen", populateAvailPropListsMap.get("totPropPageLen"));
			}
			return gsonStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/updateFranchList" ,method =POST )
	public String updateFranchList(String role, boolean showManaged, Long userid, String strCurrPagePropSel, String optSel, String enhancedReporting, String enhancedSalesContact, String alphaOrderProp, String filterByMorF, String strCurrPageProp,String strSelectedFranchiseList,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Page currPagePropSel = null;
		List<Franchise> franchiseList = null;
		Map<String,Object> franchiseListMap = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelPropListsMap = null;
		String franchFound = null;
		Map<String , Object> info = new HashMap<>();
		try {
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			//initialize(userid);
			//user = userAdminService.getUserDetails(userid);

			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());


			String[] selectedFranchiseList=fromJson(strSelectedFranchiseList,String[].class);
			if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
				//franchiseList = getHotelFranchiseList(userid,showManaged, role);
				franchiseListMap = getHotelFranchiseList(userid,showManaged, role);
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelAffiliations") ;
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelFranchiseList") ;
				if (!optSel.equals("F"))
					selectedFranchiseList = null;
			//	if(selectedFranchiseList!=null)
					userAdminService.updateUserFranch(userid, selectedFranchiseList, franchiseList);
				//franchiseList = getHotelFranchiseList(userid,showManaged, role);
				franchiseListMap = getHotelFranchiseList(userid,showManaged, role);
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelAffiliations") ;
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelFranchiseList") ;
				franchFound = (String) franchiseListMap.get("franchFound");
			}

			if (role.equals("MFPUSER")) {
				if (enhancedReporting == null) {
					enhancedReporting = "N";
					info.put("enhancedReporting",enhancedReporting);
				} else if (enhancedReporting.equals("on")) {
					enhancedReporting = "Y";
					info.put("enhancedReporting",enhancedReporting);
				}
				userAdminService.updateUserEnhancedReporting(userid, enhancedReporting);
			}

			if (role.equals("MFPFSALE")) {
				if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
					enhancedSalesContact = "N";
					info.put("enhancedSalesContact",enhancedSalesContact);
				} else if (enhancedSalesContact.equals("on")) {
					enhancedSalesContact = "Y";
					info.put("enhancedSalesContact",enhancedSalesContact);
				}
				userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
			}

			info.put("optSel",optSel);
			info.put("franchFound",franchFound);
			info.put("franchiseList",franchiseList);
			if (optSel.equals("P")) {
				if(currPageProp != null)
					populateAvailPropListsMap = 	populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
				info.put("status",AVAILPROP);
				//return AVAILPROP;

			} else {
				if(currPagePropSel != null)
					populateSelPropListsMap = populateSelPropLists(userid,currPagePropSel);
				info.put("status",SELPROP);

				//return SELPROP;
			}
			if(populateSelPropListsMap!=null) {
				info.put("hotelList", populateSelPropListsMap.get("hotelList"));
				info.put("totNumUserProp", populateSelPropListsMap.get("totNumUserProp"));
				info.put("totPropSelPageLen", populateSelPropListsMap.get("totPropSelPageLen"));
			}
			if(populateAvailPropListsMap!=null) {
				info.put("hotellistAll", populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp", populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen", populateAvailPropListsMap.get("totPropPageLen"));
			}
			return  gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	@RequestMapping(value ="/updateRegnList" ,method =POST )
	public String updateRegnList(String role, boolean showProperties, Long userid, String optSel, String enhancedReporting, String enhancedSalesContact, String strCurrPagePropSel, String alphaOrderProp, String filterByMorF, String strCurrPageProp,String strSelectedRegionList,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Page currPagePropSel = null;
		List<RegionRef> regions = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelPropListsMap = null;
		Map<String,Object> regionMap = null;
		String regionFound = "N";
		Map<String,Object>info=new HashMap<>();
		try {
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			String[] selectedRegionList=fromJson(strSelectedRegionList,String[].class);
			//initialize(userid);
			//user = userAdminService.getUserDetails(userid);

			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());



			if (showProperties) {
				//regions = getRegions(userid);
				regionMap = getRegions(userid);
				regions = (List<RegionRef>) regionMap.get("regions") ;
				//regionFound = (String) regionMap.get("regionFound");
				if (!optSel.equals("R"))
					selectedRegionList = null;
				//if(selectedRegionList!=null)
					userAdminService.updateUserRegion(userid, selectedRegionList, regions);
				//regions = getRegions(userid);
				regionMap = getRegions(userid);
				regions = (List<RegionRef>) regionMap.get("regions") ;
				regionFound = (String) regionMap.get("regionFound");
				if (role.equals("MFPUSER")) {
					if (enhancedReporting == null) {
						enhancedReporting = "N";
						info.put("enhancedReporting",enhancedReporting);
					} else if (enhancedReporting.equals("on")) {
						enhancedReporting = "Y";
						info.put("enhancedReporting",enhancedReporting);
					}
					userAdminService.updateUserEnhancedReporting(userid, enhancedReporting);
				}

				if (role.equals("MFPFSALE")) {
					if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
						enhancedSalesContact = "N";
						info.put("enhancedSalesContact",enhancedSalesContact);
					} else if (enhancedSalesContact.equals("on")) {
						enhancedSalesContact = "Y";
						info.put("enhancedSalesContact",enhancedSalesContact);
					}
					userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
				}
			}


			info.put("regions",regions);
			info.put("regionFound",regionFound);
			info.put("optSel",optSel);
			if (optSel.equals("P")) {
				if(currPageProp != null)
					populateAvailPropListsMap = populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
				info.put("status",AVAILPROP);
				//return AVAILPROP;
			} else {
				if(currPagePropSel != null)
					populateSelPropListsMap = populateSelPropLists(userid,currPagePropSel);
				info.put("status",SELPROP);
				//	return SELPROP;
			}
			if(populateSelPropListsMap!=null) {
				info.put("hotelList", populateSelPropListsMap.get("hotelList"));
				info.put("totNumUserProp", populateSelPropListsMap.get("totNumUserProp"));
				info.put("totPropSelPageLen", populateSelPropListsMap.get("totPropSelPageLen"));
			}
			if(populateAvailPropListsMap!=null) {
				info.put("hotellistAll", populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp", populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen", populateAvailPropListsMap.get("totPropPageLen"));
			}
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/updateAllProperties" ,method =POST )
	public String updateAllProperties(String role, boolean showProperties, Long userid, String optSel, String enhancedReporting, String enhancedSalesContact, String allHotels, String strCurrPagePropSel, String alphaOrderProp, String filterByMorF, String strCurrPageProp,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Page currPagePropSel = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelPropListsMap = null;
		Map<String, Object> info = new HashMap<>();
		try {
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			//initialize(userid);
			//user = userAdminService.getUserDetails(userid);

			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());



			if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
				if (allHotels != null)
					userAdminService.updateAllHotels(userid, allHotels);
			}

			if (role.equals("MFPUSER")) {
				if (enhancedReporting == null) {
					enhancedReporting = "N";
					info.put("enhancedReporting",enhancedReporting);
				} else if (enhancedReporting.equals("on")) {
					enhancedReporting = "Y";
					info.put("enhancedReporting",enhancedReporting);
				}
				userAdminService.updateUserEnhancedReporting(userid, enhancedReporting);
			}

			if (role.equals("MFPFSALE")) {
				if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
					enhancedSalesContact = "N";
					info.put("enhancedSalesContact",enhancedSalesContact);
				} else if (enhancedSalesContact.equals("on")) {
					enhancedSalesContact = "Y";
					info.put("enhancedSalesContact",enhancedSalesContact);
				}
				userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
			}

			info.put("allHotels",allHotels);
			info.put("optSel",optSel);
			if (optSel.equals("P")) {
				if(currPageProp != null)
					populateAvailPropListsMap = populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
				info.put("status",AVAILPROP);
				//return AVAILPROP;
			} else {
				if(currPagePropSel != null)
					populateSelPropListsMap = populateSelPropLists(userid,currPagePropSel);
				info.put("status",SELPROP);
				//return SELPROP;
			}
			if(populateSelPropListsMap!=null) {
				info.put("hotelList", populateSelPropListsMap.get("hotelList"));
				info.put("totNumUserProp", populateSelPropListsMap.get("totNumUserProp"));
				info.put("totPropSelPageLen", populateSelPropListsMap.get("totPropSelPageLen"));
			}
			else{
				info.put("hotelList", null);
				info.put("totNumUserProp", null);
				info.put("totPropSelPageLen", null);
			}
			if(populateAvailPropListsMap!=null) {
				info.put("hotellistAll", populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp", populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen", populateAvailPropListsMap.get("totPropPageLen"));
			}
			else{
				info.put("hotellistAll", null);
				info.put("totNumProp",null);
				info.put("totPropPageLen",null);
			}
			return gsonStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/updateAvailPropList" ,method =POST )
	public String updateAvailPropList(Long userid, String enhancedSalesContact, String role, String alphaOrderProp, String filterByMorF, String strCurrPageProp,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Map<String,Object> populateAvailPropListsMap = null;
		Map<String,Object> populateSelPropListsMap = null;
		Map<String, Object> info = new HashMap<>();
		try {

			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			//initialize(userid);
			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());


			if (role.equals("MFPFSALE")) {
				if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
					enhancedSalesContact = "N";
					info.put("enhancedSalesContact",enhancedSalesContact);
				} else if (enhancedSalesContact.equals("on")) {
					enhancedSalesContact = "Y";
					info.put("enhancedSalesContact",enhancedSalesContact);
				}
				userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
			}
			if(currPageProp != null)
				populateAvailPropListsMap = populateAvailPropLists(userid,role,alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);

			if(populateAvailPropListsMap != null) {
				info.put("hotellistAll",populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp",populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen",populateAvailPropListsMap.get("totPropPageLen"));
			}
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/populatePropList" ,method =POST)
	public String populatePropList(Long userid, String thelist, String role) throws Exception {
		try {
			Map<String,Object>  quickSelectList = populateQuickSelectList(userid,thelist,role);
			return gsonStream(quickSelectList);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/updateSelPropList" ,method =POST)
	public String updateSelPropList(Long userid, String enhancedSalesContact, String role, String strCurrPagePropSel) throws Exception {
		Map<String, Object> info = new HashMap<>();
		Page currPagePropSel = null;
		Map<String,Object> populateSelPropListsMap = null;
		try {
			if(StringUtils.isNotEmpty(strCurrPagePropSel))
				currPagePropSel=fromJson(strCurrPagePropSel, Page.class);

			//initialize(userid);

			if (currPagePropSel == null) {
				currPagePropSel = new Page();
			}
			currPagePropSel.setMaxpagelen(constantsService.getUserEdPropSelMaxLen());

			if (role.equals("MFPFSALE")) {
				if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
					enhancedSalesContact = "N";
					info.put("enhancedSalesContact",enhancedSalesContact);
				} else if (enhancedSalesContact.equals("on")) {
					enhancedSalesContact = "Y";
					info.put("enhancedSalesContact",enhancedSalesContact);
				}
				userAdminService.updateUserIsMAE(userid, enhancedSalesContact);
			}
			if(currPagePropSel != null)
				populateSelPropListsMap = populateSelPropLists(userid,currPagePropSel);

			if(populateSelPropListsMap != null) {
				info.put("hotelList",populateSelPropListsMap.get("hotelList"));
				info.put("totNumUserProp",populateSelPropListsMap.get("totNumUserProp"));
				info.put("totPropSelPageLen",populateSelPropListsMap.get("totPropSelPageLen"));
			}
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	//Upgrade-revisit no curl not tested
	@RequestMapping(value ="/updateAccount",method =POST)
	public String updateAccount(String role, Long userid, String enhancedSalesContact, String[] acctSelList, boolean showAccounts, String alphaOrderAcct, String accountpricingtype, String accountsegment, String strCurrPageAcct) throws Exception {
		Page currPageAcct = null;
		Map<String,Object> populateAvailAcctListsMap = null;
		Map<String, Object> info = new HashMap<>();
		try {

			if(StringUtils.isNotEmpty(strCurrPageAcct))
				currPageAcct=fromJson(strCurrPageAcct, Page.class);
			//initialize(userid);
			if (currPageAcct == null) {
				currPageAcct = new Page();
			}
			currPageAcct.setMaxpagelen(constantsService.getUserEdAcctMaxLen());



			if (acctSelList == null)
				acctSelList = new String[0];
			if (showAccounts) {
				userAdminService.updateUserAccounts(userid, acctSelList, role);
				if(currPageAcct!=null)
					populateAvailAcctListsMap = populateAvailAcctLists(userid,role,alphaOrderAcct,accountpricingtype,accountsegment,currPageAcct);
			}
			if (enhancedSalesContact == null || enhancedSalesContact.equals("")) {
				enhancedSalesContact = "N";
				info.put("enhancedSalesContact",enhancedSalesContact);
			} else if (enhancedSalesContact.equals("on")) {
				enhancedSalesContact = "Y";
				info.put("enhancedSalesContact",enhancedSalesContact);
			}
			userAdminService.updateUserIsMAE(userid, enhancedSalesContact);

			if(populateAvailAcctListsMap != null) {
				info.put("accountlistAll",populateAvailAcctListsMap.get("accountlistAll"));
				info.put("totNumAcct",populateAvailAcctListsMap.get("totNumAcct"));
				info.put("totAcctPageLen",populateAvailAcctListsMap.get("totAcctPageLen"));
			}
			info.put("userAccount",userAdminService.getUserAccountList(userid,currPageAcct));
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	//Upgrade-revist no curl not tested
	@RequestMapping(value ="/updateSelAcctList" ,method =POST)
	public String updateSelAcctList(boolean showAccounts, long userid, String strCurrPageAcctSel) throws Exception {
		Page currPageAcctSel = null;
		Map<String,Object> populateSelAcctListsMap = null;
		try {

			if(StringUtils.isNotEmpty(strCurrPageAcctSel))
				currPageAcctSel=fromJson(strCurrPageAcctSel, Page.class);

			//initialize(userid);
			if (currPageAcctSel == null) {
				currPageAcctSel = new Page();
			}
			currPageAcctSel.setMaxpagelen(constantsService.getUserEdAcctSelMaxLen());

			if (showAccounts) {
				if(currPageAcctSel != null)
					populateSelAcctListsMap = populateSelAcctLists(userid,currPageAcctSel);
			}
			Map<String, Object> info = new HashMap<>();
			if(populateSelAcctListsMap != null) {
				info.put("accountlist",populateSelAcctListsMap.get("accountlist"));
				info.put("totNumUserAcct",populateSelAcctListsMap.get("totNumUserAcct"));
				info.put("totAcctSelPageLen",populateSelAcctListsMap.get("totAcctSelPageLen"));
			}
			info.put("status",SUCCESS);


			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	//Upgrade-revisit no curl not tested
	@RequestMapping(value ="/updateAvailAcctList" ,method =POST)
	public String updateAvailAcctList(boolean showAccounts, Long userid, String role, String alphaOrderAcct, String accountpricingtype, String accountsegment, String strCurrPageAcct) throws Exception {
		Page currPageAcct = null;
		Map<String,Object> populateAvailAcctListsMap = null;
		try {

			if(StringUtils.isNotEmpty(strCurrPageAcct))
				currPageAcct=fromJson(strCurrPageAcct, Page.class);
			//initialize(userid);
			if (currPageAcct == null) {
				currPageAcct = new Page();
			}
			currPageAcct.setMaxpagelen(constantsService.getUserEdAcctMaxLen());

			if (showAccounts) {
				if(currPageAcct!= null)
					populateAvailAcctListsMap = populateAvailAcctLists(userid,role,alphaOrderAcct,accountpricingtype,accountsegment,currPageAcct);
			}
			Map<String, Object> info = new HashMap<>();
			if(populateAvailAcctListsMap != null) {
				info.put("accountlistAll",populateAvailAcctListsMap.get("accountlistAll"));
				info.put("totNumAcct",populateAvailAcctListsMap.get("totNumAcct"));
				info.put("totAcctPageLen",populateAvailAcctListsMap.get("totAcctPageLen"));
			}
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/deleteProperty" ,method =POST)
	public String deleteProperty(String role, Long userid, String strHotelSelList, String alphaOrderProp, String filterByMorF, String strCurrPageProp,Long totPropSelPageLen) throws Exception {
		Page currPageProp = null;
		Map<String,Object> populateAvailPropListsMap = null;
		try {
			if(StringUtils.isNotEmpty(strCurrPageProp))
				currPageProp=fromJson(strCurrPageProp, Page.class);

			//initialize(userid);
			if (currPageProp == null) {
				currPageProp = new Page();
			}
			currPageProp.setMaxpagelen(constantsService.getUserEdPropMaxLen());

			String[] hotelSelList=fromJson(strHotelSelList,String[].class);
			if (hotelSelList != null && hotelSelList.length > 0) {
				userAdminService.deleteUserProperties(userid, hotelSelList, role);
			}
			if(currPageProp != null)
				populateAvailPropListsMap = populateAvailPropLists(userid,role, alphaOrderProp,filterByMorF,currPageProp,totPropSelPageLen);
			Map<String, Object> info = new HashMap<>();
			if(populateAvailPropListsMap != null) {
				info.put("hotellistAll",populateAvailPropListsMap.get("hotellistAll"));
				info.put("totNumProp",populateAvailPropListsMap.get("totNumProp"));
				info.put("totPropPageLen",populateAvailPropListsMap.get("totPropPageLen"));
			}
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	//Upgrade-revisit no curl not tested
	@RequestMapping(value ="/deleteAccount" ,method =POST)
	public String deleteAccount(Long userid, String[] acctSelList, String role, String alphaOrderAcct, String accountpricingtype, String accountsegment, String strCurrPageAcct) throws Exception {
		Page currPageAcct = null;
		Map<String,Object> populateAvailAcctListsMap = null;
		try {
			if(StringUtils.isNotEmpty(strCurrPageAcct))
				currPageAcct=fromJson(strCurrPageAcct, Page.class);
			//initialize(userid);
			if (currPageAcct == null) {
				currPageAcct = new Page();
			}
			currPageAcct.setMaxpagelen(constantsService.getUserEdAcctMaxLen());

			if (acctSelList != null && acctSelList.length > 0) {
				userAdminService.deleteUserAccounts(userid, acctSelList, role);
			}
			populateAvailAcctListsMap = populateAvailAcctLists(userid,role,alphaOrderAcct,accountpricingtype,accountsegment,currPageAcct);
			Map<String, Object> info = new HashMap<>();
			if(populateAvailAcctListsMap != null) {
				info.put("accountlistAll",populateAvailAcctListsMap.get("accountlistAll"));
				info.put("totNumAcct",populateAvailAcctListsMap.get("totNumAcct"));
				info.put("totAcctPageLen",populateAvailAcctListsMap.get("totAcctPageLen"));
			}
			info.put("status",SUCCESS);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/resetRegionList",method = POST)
	public String resetRegionList(String role, Long userid,String optSel) throws Exception {
		DSUser user =null;
		List<RegionRef> regions = new ArrayList<>();
		Map<String,Object> regionMap = null;
		String regionFound = "N";
		try {
			user = userAdminService.getUserDetails(userid);
			if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
				regionMap = getRegions(userid);
				regions = (List<RegionRef>) regionMap.get("regions") ;
				regionFound = (String) regionMap.get("regionFound");
			}
			Map<String, Object> info = new HashMap<>();
			info.put("user",user);
			info.put("regions",regions);
			info.put("status",SUCCESS);
			info.put("optSel",optSel);
			info.put("regionFound",regionFound);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/resetBrandList",method = POST)
	public String resetBrandList(String role, Long userid,String optSel) throws Exception {
		DSUser user =null;
		List<HotelAffiliation> hotelAffiliations = new ArrayList<>();
		Map<String,Object>hotelAffiliationsMap = null;
		String brandFound = "N";
		try {
			user = userAdminService.getUserDetails(userid);
			if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
				//hotelAffiliations = getHotelAffiliations(userid);
				hotelAffiliationsMap = getHotelAffiliations(userid);
				hotelAffiliations = (List<HotelAffiliation>) hotelAffiliationsMap.get("hotelAffiliations") ;
				brandFound = (String) hotelAffiliationsMap.get("brandFound");
			}
			Map<String, Object> info = new HashMap<>();
			info.put("user",user);
			info.put("hotelAffiliations",hotelAffiliations);
			info.put("status",SUCCESS);
			info.put("optSel",optSel);
			info.put("brandFound",brandFound);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value ="/resetFranchiseList" ,method =POST)
	public String resetFranchiseList(String role, Long userid, boolean showManaged,String optSel) throws Exception {
		DSUser user = null;
		List<Franchise> franchiseList = new ArrayList<>();
		Map<String,Object> franchiseListMap = null;
		String franchFound = "N";
		try {
			user = userAdminService.getUserDetails(userid);
			if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
				//franchiseList = getHotelFranchiseList(userid,showManaged, role);
				franchiseListMap = getHotelFranchiseList(userid,showManaged, role);
				franchiseList = (List<Franchise>) franchiseListMap.get("hotelFranchiseList") ;
				franchFound = (String) franchiseListMap.get("franchFound");
			}
			Map<String, Object> info = new HashMap<>();
			info.put("user",user);
			info.put("franchiseList",franchiseList);
			info.put("status",SUCCESS);
			info.put("optSel",optSel);
			info.put("franchFound",franchFound);
			return gsonStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	public Map<String,Object> getRegions(Long userid) {
		String regionFound = "N";
		DSUser user = null;
		user = userAdminService.getUserDetails(userid);
		List<RegionRef> regions = new ArrayList<RegionRef>();
		regions = userAdminService.getRegions();
		if (user.getRegionIds() != null && user.getRegionIds().size() > 0) {
			regionFound = "Y";
			//setRegionFound("Y");
			for (RegionRef oRegion : regions) {
				for (int i=0; i<user.getRegionIds().size(); i++) {
					if (oRegion.getRegionid() == user.getRegionIds().get(i)) {
						oRegion.setRegionstatus("Y");
						break;
					}
				}
			}
		}
		Map<String, Object> info = new HashMap<>();
		info.put("regions",regions);
		info.put("regionFound",regionFound);
		return info;
	}

	public Map<String,Object> getHotelAffiliations(Long userid) {
		String brandFound = "N";
		List<HotelAffiliation> hotelAffiliations = new ArrayList<HotelAffiliation>();
		DSUser user = null;
		user = userAdminService.getUserDetails(userid);
		hotelAffiliations = userAdminService.getAffiliations();
		if (user.getAffiliationIds() != null && user.getAffiliationIds().size() > 0) {
			brandFound = "Y";
			//setBrandFound("Y");
			for (HotelAffiliation oHotelAffiliation : hotelAffiliations) {
				for (int i=0; i<user.getAffiliationIds().size(); i++) {
					if (oHotelAffiliation.getAffiliationid() == user.getAffiliationIds().get(i)) {
						oHotelAffiliation.setAffiliationstatus("Y");
						break;
					}
				}
			}
		}
		Map<String, Object> info = new HashMap<>();
		info.put("hotelAffiliations",hotelAffiliations);
		info.put("brandFound",brandFound);
		return info;
		//return hotelAffiliations;
	}

	public Map<String,Object> getHotelFranchiseList(Long userid, boolean showManaged, String role) {
		List<Franchise> hotelFranchiseList = new ArrayList<Franchise>();
		String franchFound = "N";
		DSUser user = null;
		user = userAdminService.getUserDetails(userid);
		hotelFranchiseList = userAdminService.getHotelFranchCompanyListWithCode(showManaged, role);
		if (user.getFranchCodes() != null && user.getFranchCodes().size() > 0) {
			//setFranchFound("Y");
			franchFound = "Y";
			for (Franchise oFranchise : hotelFranchiseList) {
				for (int i=0; i<user.getFranchCodes().size(); i++) {
					if (oFranchise.getFranchCode().equals(user.getFranchCodes().get(i))) {
						oFranchise.setFranchisestatus("Y");
						break;
					}
				}
			}
		}

		Map<String, Object> info = new HashMap<>();
		info.put("hotelFranchiseList",hotelFranchiseList);
		info.put("franchFound",franchFound);
		return info;
		//	return hotelFranchiseList;
	}
	//Add null check
	public Map<String, Object>  populateSelPropLists(Long userid, Page currPagePropSel) {
		/*if(StringUtils.isNotEmpty(strCurrPagePropSel))
			currPagePropSel=fromJson(strCurrPagePropSel, Page.class);*/
		List<HotelDetailData> hotelList = null;
		Long totNumUserProp = null;
		Long totPropSelPageLen = null;
		//initialize(userid);
		hotelList = userAdminService.getUserPropertyList(userid, currPagePropSel);
		totNumUserProp = userAdminService.getUserPropertyListNum(userid);
		totPropSelPageLen = userAdminService.getHotelListPages(userid, currPagePropSel.getMaxpagelen());
		if (totPropSelPageLen == 0) totPropSelPageLen = 1L;
		Map<String, Object> info = new HashMap<>();
		info.put("hotelList",hotelList);
		info.put("totNumUserProp",totNumUserProp);
		info.put("totPropSelPageLen",totPropSelPageLen);
		return info;


	}
	//Add null check
	public Map<String,Object> populateAvailPropLists(Long userid, String role, String alphaOrderProp, String filterByMorF, Page currPageProp,Long totPropSelPageLen) {
		/* Ticket number:11325 changes starts
		 Added one more parameter filterByMorF to the functions getUserPropertyListAll,getUserPropertyListAllNum and getHotelListAllPages
		 */
		/*if(StringUtils.isNotEmpty(strCurrPageProp))
			currPageProp=fromJson(strCurrPageProp, Page.class);*/
		//initialize(userid);
		List<HotelDetailData> hotellistAll = null;
		Long totNumProp = null;
		Long totPropPageLen = null;
		hotellistAll = userAdminService.getUserPropertyListAll(userid, role, alphaOrderProp, currPageProp, filterByMorF);
		totNumProp = userAdminService.getUserPropertyListAllNum(userid, role, alphaOrderProp, filterByMorF);
		totPropPageLen = userAdminService.getHotelListAllPages(userid, role, alphaOrderProp, currPageProp.getMaxpagelen(), filterByMorF);
		/*
		 Ticket number:11325 changes ends
		 */
		if (totPropPageLen == 0) totPropPageLen = 1L;
		if (totPropSelPageLen == null || totPropSelPageLen == 0) totPropSelPageLen = 1L;

		Map<String, Object> info = new HashMap<>();
		info.put("hotellistAll",hotellistAll);
		info.put("totNumProp",totNumProp);
		info.put("totPropPageLen",totPropPageLen);
		return info;

	}

	public Map<String,Object>  populateQuickSelectList(Long userid, String thelist, String role) {
		Long totPropPageLen = null;
		List<String> hotellist = Arrays.asList(thelist.split(","));
		List<HotelDetailData> hotellistAll = null;
		List<String> tempList =null;
		String notfound = null;
		String finallist = "( ";
		for(int i=0; i<hotellist.size(); i++){
			if (i != (hotellist.size() - 1))
				finallist += "'" +hotellist.get(i).toUpperCase()+ "',";
			else
				finallist += "'" +hotellist.get(i).toUpperCase()+ "' )";
		}
		hotellistAll = userAdminService.getQuickSelectPropertyList(userid, role, finallist);
		tempList = new ArrayList<String>();
		boolean found;
		for(int i=0; i<hotellist.size(); i++){
			found = false;
			for(int j=0; j<hotellistAll.size(); j++){
				if(hotellistAll.get(j).getMarshaCode() != null && hotellist.get(i) != null && !hotellistAll.get(j).getMarshaCode().equalsIgnoreCase("") && !hotellist.get(i).equalsIgnoreCase("")){
					if(hotellistAll.get(j).getMarshaCode().equalsIgnoreCase(hotellist.get(i))){
						found = true;
						break;
					}
				}
			}
			if(!found){
				tempList.add(hotellist.get(i).toUpperCase());
				if(notfound != null){
					notfound = notfound + hotellist.get(i).toUpperCase() + " ";
				} else {
					notfound = hotellist.get(i).toUpperCase() + " ";
				}
			}
		}
		if(!tempList.isEmpty()){
			if(tempList.size() == 1){
				tempList.add(0, "The following MARSHA code was not found");
				notfound = "The following MARSHA code was not found: " + notfound;
			} else {
				tempList.add(0, "The following MARSHA codes were not found");
				notfound = "The following MARSHA codes were not found: " + notfound;
			}
		} else {
			notfound = "";
		}
		totPropPageLen = 1L;
		Map<String,Object> info= new HashMap<>();
		info.put("hotellistAll",hotellistAll);
		info.put("tempList",tempList);
		info.put("notfound",notfound);
		return info;
	}

	public Map<String, Object> populateSelAcctLists(Long userid, Page currPageAcctSel) {
		//currPageAcctSel=fromJson(strCurrPageAcctSel, Page.class);
		List<Account> accountlist= null;
		Long totNumUserAcct =null;
		Long totAcctSelPageLen =null;
		accountlist = userAdminService.getUserAccountList(userid, currPageAcctSel);
		totNumUserAcct = userAdminService.getUserAccountListNum(userid);
		totAcctSelPageLen = userAdminService.getAcctListPages(userid, currPageAcctSel.getMaxpagelen()==0?constantsService.getUserEdAcctSelMaxLen():currPageAcctSel.getMaxpagelen());
		if (totAcctSelPageLen == 0) totAcctSelPageLen = 1L;
		Map<String,Object> info= new HashMap<>();
		info.put("accountlist",accountlist);
		info.put("totNumUserAcct",totNumUserAcct);
		info.put("totAcctSelPageLen",totAcctSelPageLen);
		return info;

	}

	public Map<String,Object>  populateAvailAcctLists(Long userid, String role, String alphaOrderAcct, String accountpricingtype, String accountsegment, Page currPageAcct ) {
		//currPageAcct=fromJson(strCurrPageAcct, Page.class);
		List<Account> accountlistAll =null;
		Long totNumAcct = null;
		Long totAcctPageLen = null;
		accountlistAll = userAdminService.getUserAccountListAll(userid,alphaOrderAcct, currPageAcct, accountpricingtype, accountsegment);
		totNumAcct = userAdminService.getUserAcctListAllNum(userid,alphaOrderAcct, accountpricingtype, accountsegment);
		totAcctPageLen = userAdminService.getAcctListAllPages(userid, role, alphaOrderAcct, accountpricingtype, accountsegment, currPageAcct.getMaxpagelen()==0?constantsService.getUserEdAcctMaxLen():currPageAcct.getMaxpagelen());
		if (totAcctPageLen == 0) totAcctPageLen = 1L;
		Map<String,Object> info= new HashMap<>();
		info.put("accountlistAll",accountlistAll);
		info.put("totNumAcct",totNumAcct);
		info.put("totAcctPageLen",totAcctPageLen);
		return info;

	}


	public PricingAdminService getPricingAdminService() {
		return pricingAdminService;
	}

	public void setPricingAdminService(PricingAdminService pricingAdminService) {
		this.pricingAdminService = pricingAdminService;
	}

	public UserAdminService getUserAdminService() {
		return userAdminService;
	}

	public void setUserAdminService(UserAdminService userAdminService) {
		this.userAdminService = userAdminService;
	}

	public ConstantsService getConstantsService() {
		return constantsService;
	}

	public void setConstantsService(ConstantsService constantsService) {
		this.constantsService = constantsService;
	}



}

