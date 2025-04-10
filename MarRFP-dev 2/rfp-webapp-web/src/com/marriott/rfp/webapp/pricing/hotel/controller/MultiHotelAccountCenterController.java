package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterFilterLists;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterSearch;
import com.marriott.rfp.object.pricing.hotelrfp.PriceButtonProductData;
import com.marriott.rfp.object.user.InternalNotes;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("multihotelaccountcenter")
public class MultiHotelAccountCenterController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(MultiHotelAccountCenterController.class);

    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;

    @Autowired
    private ConstantsService constantsService = null;


    public MultiHotelAccountCenterController() {
        super();
    }

    @Autowired
    public MultiHotelAccountCenterController(HotelRFPAccountCenterService hotelRFPAccountCenterService, ConstantsService constantsService) {
        super();
        this.setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
        this.setConstantsService(constantsService);
        /*orderby = new Orderby();
        page = new Page();
        page.setMaxpagelen(getConstantsService().getAccountCenterMaxPageLen());
        mhacsearch = new MultiHotelAccountCenterSearch();*/
    }

    @RequestMapping(value = "/getMultiHotelAccountCenter", method = {RequestMethod.POST, RequestMethod.GET})
    public String getMultiHotelAccountCenter(String strMhacsearch, String strOrderby, String strpageby, String filterString) throws Exception {
        MultiHotelAccountCenterSearch mhacsearch=new MultiHotelAccountCenterSearch();
        Orderby orderby=new Orderby();
        Page page=new Page();
        page.setMaxpagelen(getConstantsService().getAccountCenterMaxPageLen());
        AccountCenterView accountCenterView=null;
        MultiHotelAccountCenterFilterLists filterlists=null;
        AccountCenterInfo accountCenterInfo=null;
        PriceButtonProductData priceButtonProductData = null;
        try {
            if(StringUtils.isNotEmpty(strMhacsearch)){
                mhacsearch = fromJson(strMhacsearch, MultiHotelAccountCenterSearch.class);}
            if(StringUtils.isNotEmpty(strOrderby)){
            orderby = fromJson(strOrderby, Orderby.class);}
            if(StringUtils.isNotEmpty(strpageby)) {
                page = fromJson(strpageby, Page.class);

                page.setMaxpagelen(page.getMaxpagelen() != 0 ? page.getMaxpagelen() : getConstantsService().getAccountCenterMaxPageLen());
            }
            if (page != null && page.getPage() == 0)
                page.setPage(1);
            accountCenterView = hotelRFPAccountCenterService.findMultiHotelAccountCenterDetail(mhacsearch, filterString, orderby, page, getUserProperties());
            filterlists = hotelRFPAccountCenterService.getMultiHotelAccountCenterFilterList(getUserProperties());
            if (mhacsearch != null && mhacsearch.getAccountrecid() != null){
                accountCenterInfo = pricingFilterListsService.getShortAccountInfo(mhacsearch.getAccountrecid());
                priceButtonProductData = hotelRFPAccountCenterService.getAccountMaintanenceFloatData( mhacsearch.getAccountrecid());
            }

            if (accountCenterView.getTotalPages() == 0)
                page.setPage(0);

            Map<String, Object> info = new HashMap<>();
            info.put("accountCenterView", accountCenterView);
            info.put("filterlists", filterlists);
            info.put("accountCenterInfo", accountCenterInfo);
            info.put("priceButtonProductData", priceButtonProductData);
            info.put("page", page);
			return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

	@RequestMapping(value = "/updateHotelAccountCenter", method = RequestMethod.POST)
    public String updateHotelAccountCenter(String strHotelAccountCenterUpdate, String formChg) throws Exception {
        Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate=null;
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountCenterUpdate>>(){}.getType();
            hotelAccountCenterUpdate = fromJson(strHotelAccountCenterUpdate, collectionType);
            if (formChg.equals("Y")) {
				hotelRFPAccountCenterService.updateAccountCenter(hotelAccountCenterUpdate, getUserProperties());
			}
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    public HotelRFPAccountCenterService getHotelRFPAccountCenterService() {
        return hotelRFPAccountCenterService;
    }


    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }


    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }


}
