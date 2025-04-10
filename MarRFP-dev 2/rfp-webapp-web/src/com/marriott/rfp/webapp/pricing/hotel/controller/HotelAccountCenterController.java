package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
public class HotelAccountCenterController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountCenterController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;

    public HotelAccountCenterController() {
        super();
    }

    public HotelAccountCenterController(HotelMenuService hotelMenuService, HotelRFPService hotelRFPService,
                                        HotelRFPAccountCenterService hotelRFPAccountCenterService, ConstantsService constantsService, HotelService hotelService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
    }

    public String getHotelAccountCenter(String strOrderby, Long hotelrfpid, String strPage, Long period, String accountpricingtype,String marshaCode, String filterString, String displayString, String dueDateFrom, String dueDateTo, String currentItem) throws Exception {
        try {
            Orderby orderby = new Orderby();
            Page page = new Page();
            PricingMenuData hotelPricingMenu =setMenuAndHotelData(hotelrfpid, currentItem, period);
            if(StringUtils.isNotEmpty(strOrderby))
                orderby = fromJson(strOrderby, Orderby.class);
            if(StringUtils.isNotEmpty(strPage))
                page = fromJson(strPage, Page.class);
            page.setMaxpagelen(getConstantsService().getAccountCenterMaxPageLen());
            AccountCenterView accountCenterView = hotelRFPAccountCenterService.findAccountCenterDetail(
                    hotelrfpid, period, accountpricingtype, filterString, displayString, dueDateFrom, dueDateTo,
                    orderby, page, getUserProperties(), hotelService.findPropertyDetail(marshaCode));
            if (accountCenterView!=null && accountCenterView.getTotalPages() == 0)
                page.setPage(0);
            Map<String, Object> info = new HashMap<>();
            info.put("accountCenterView", accountCenterView);
            info.put("hotelPeriodData", hotelService.findAllPeriodsforProperty(marshaCode, getUserProperties().getRole()));
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("currency", hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("Page", page);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    public String updateHotelAccountCenter(String strHotelAccountCenterUpdate, String formChg) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountCenterUpdate>>() {
            }.getType();
            Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate = fromJson(strHotelAccountCenterUpdate, collectionType);
            if (formChg != null && formChg.equals("Y"))
                hotelRFPAccountCenterService.updateAccountCenter(hotelAccountCenterUpdate, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    //upgrade-revisit:no curl,not tested
    //INC000002650685_ Switch between pricing years
    /*public String switchHotelAccountCenterYear(String strHotelAccountCenterUpdate) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountCenterUpdate>>() {
            }.getType();
            Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate = fromJson(strHotelAccountCenterUpdate,collectionType);
            if (getFormChg() != null && getFormChg().equals("Y"))
                hotelRFPAccountCenterService.updateAccountCenter(hotelAccountCenterUpdate, getUserProperties());
            setHotelPeriodSwitchData();
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }*/
    //INC000002650685_ Switch between pricing years

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

}
