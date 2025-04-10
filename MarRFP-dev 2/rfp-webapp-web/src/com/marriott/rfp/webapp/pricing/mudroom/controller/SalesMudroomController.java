package com.marriott.rfp.webapp.pricing.mudroom.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.marketsalesregion.MarketSalesRegion;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.NumberUtility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPFSALE", "MFPSALES"})
@RestController
@RequestMapping("/salesmudroom")
public class SalesMudroomController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(SalesMudroomController.class);
    @Autowired
    private MudroomService mudroomService = null;
    @Autowired
    private ListsService listsService = null;
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public SalesMudroomController() {
        super();
    }

    @Autowired
    public SalesMudroomController(MudroomService mudroomService) {
        super();
        this.setMudroomService(mudroomService);
    }

    //renamed execute to getSalesMudroomDetails
    @RequestMapping(value = "/getSalesMudroomDetails", method = {GET, POST})
    public String getSalesMudroomDetails(String strAcctpage, String strHtlpage, Long orderBy,Boolean alreadyAssigned) throws Exception {
        Page acctpage=null;
        Page htlpage=null;
        try {
            if (StringUtils.isNotEmpty(strAcctpage))
                acctpage = fromJson(strAcctpage, Page.class);
            if (StringUtils.isNotEmpty(strHtlpage))
                htlpage = fromJson(strHtlpage, Page.class);

            if (orderBy == null) {
                orderBy = new Long(0);
                alreadyAssigned = false;
            }
            if (acctpage == null) {
                acctpage = new Page();
            }
            if (htlpage == null) {
                htlpage = new Page();
            }
            acctpage.setMaxpagelen(constantsService.getSalesMudAccMaxPageLen());
            htlpage.setMaxpagelen(constantsService.getSalesMudHtlMaxPageLen());

            Long totalAcctPages = NumberUtility.getTotalPages(mudroomService.getNumSalesMudroomAccountLinked(getUserProperties()), acctpage.getMaxpagelen());
            Long totalHtlPages = NumberUtility.getTotalPages(mudroomService.getNumSalesMudroomHotelLinked(getUserProperties()), htlpage.getMaxpagelen());
            SalesMudroom salesMudroom = mudroomService.getSalesMudroomDetail(getUserProperties(), acctpage, htlpage, orderBy);
            List<AccountSegment> accountSegmentList = mudroomService.getSalesAccountSegments();
            List<ReportingRegion> salesRegionList = listsService.getReportingRegions();
            List<MarketSalesRegion> marketSalesRegionList = pricingCommonService.getMarketSalesRegion();
            Map<String, Object> info = new HashMap<>();
            info.put("totalAcctPages", totalAcctPages);
            info.put("totalHtlPages", totalHtlPages);
            info.put("salesMudroom", salesMudroom);
            info.put("accountSegmentList", accountSegmentList);
            info.put("salesRegionList", salesRegionList);
            info.put("marketSalesRegionList", marketSalesRegionList);
            info.put("alreadyAssigned",alreadyAssigned);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updatesalesmudroom", method = POST)
    public String updatesalesmudroom(String strSalesMudroom, String strPrimeContact, String strAcctList, String strHotelList) throws Exception {
        Boolean alreadyAssigned=null;
        Map<Long, SalesMudroomHotelAccount>  primeContact = null;
        Map<Long, String>   acctList =null;
        Map<String, String> hotelList =null;
        Map<String, Object> info = new HashMap<>();
        try {
            if(StringUtils.isNotEmpty(strPrimeContact)) {
                Type collectionType = new TypeToken<Map<Long, SalesMudroomHotelAccount>>() {
                }.getType();
                primeContact = (Map<Long, SalesMudroomHotelAccount>) fromJson(strPrimeContact, collectionType);
            }
            if(StringUtils.isNotEmpty(strAcctList)) {
                Type collectionType1 = new TypeToken<Map<Long, String>>() {
                }.getType();
                acctList = (Map<Long, String>) fromJson(strAcctList, collectionType1);
            }
            if(StringUtils.isNotEmpty(strHotelList)) {
                Type collectionType2 = new TypeToken<Map<String, String>>() {
                }.getType();
                hotelList = (Map<String, String>) fromJson(strHotelList, collectionType2);
            }

            SalesMudroom  salesMudroom = fromJson(strSalesMudroom, SalesMudroom.class);
            alreadyAssigned = mudroomService.updateSalesMudroom(salesMudroom, primeContact, acctList, hotelList);
            User u = getUserProperties();
            u.setUpdateContactInfo(false);
            info.put("alreadyAssigned", alreadyAssigned);
            info.put("status", SUCCESS);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            info.put("alreadyAssigned", alreadyAssigned);
            info.put("status", RFPConstants.FATAL_ERROR);
            return gsonStream(info);
        }
    }

    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public MudroomService getMudroomService() {
        return mudroomService;
    }

    public ListsService getListsService() {
        return listsService;
    }

    public void setListsService(ListsService listsService) {
        this.listsService = listsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

}
