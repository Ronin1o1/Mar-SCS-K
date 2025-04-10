package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.MultiHotelAccountSpecificRatesDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/multihotelaccountspecrates")
public class MultiHotelAccountSpecificRatesController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(MultiHotelAccountSpecificRatesController.class);
    private static final String CURRENTITEM="multihotelaccountspecrates";

    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public MultiHotelAccountSpecificRatesController() {
        super();
    }

    @Autowired
    public MultiHotelAccountSpecificRatesController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super();
        this.hotelMenuService = hotelMenuService;
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        this.hotelService = hotelService;
        String returnaction="/multihotelaccountcenter/view.action";
        String returnbutton="btnReturnHotelCenter.gif";
        String groupmeetingaction="multihotelaccountspecgroupmeetings";
        String currentItem="multihotelaccountspecrates";
    }

    @RequestMapping(value = "/getMultiHotelAccountSpecificRates", method = GET)
    public MultiHotelAccountSpecificRatesDto getMultiHotelAccountSpecificRates(String marshaCode,  Long hotelrfpid, Long hotel_accountinfoid,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem, Long accountrecid) throws Exception {
        MultiHotelAccountSpecificRatesDto multiHotelAccountSpecificRatesDto = new MultiHotelAccountSpecificRatesDto();

        try {
            multiHotelAccountSpecificRatesDto.setHotelDetailData(hotelService.findPropertyDetail(marshaCode));
            multiHotelAccountSpecificRatesDto.setCurrencyused(hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            multiHotelAccountSpecificRatesDto.setScreenStatus(getHotelMenuService().getScreenStatus(hotelrfpid, currentItem, hotel_accountinfoid));
            multiHotelAccountSpecificRatesDto.setHotelAccountSpecificData(hotelRFPAccountSpecificService.findTabHotelAccountSpecific(hotel_accountinfoid, getUserProperties()));
            HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
            multiHotelAccountSpecificRatesDto.setHotelAccountSpecific(hotelAccountSpecific);
            multiHotelAccountSpecificRatesDto.getHotelAccountSpecific().setHotelAccountSpecificData(multiHotelAccountSpecificRatesDto.getHotelAccountSpecificData());
            multiHotelAccountSpecificRatesDto.setAccountCenterInfo(pricingFilterListsService.getShortAccountInfo(accountrecid));

            return multiHotelAccountSpecificRatesDto;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }

    }


    @RequestMapping(value = "/update", method = POST)
    public String update(Long hotel_accountinfoid, String strhassu) throws Exception {
        try {
            HotelAccountSpecificStatusUpdate hassu = fromJson(strhassu, HotelAccountSpecificStatusUpdate.class);

            if (hassu != null) {
                hotelRFPAccountSpecificService.updateAccountSpecific(hotel_accountinfoid, hassu, getUserProperties(), false);
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updatePublish", method = POST)
    public String updateandpub(String strhassu, Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecificStatusUpdate   hassu = fromJson(strhassu, HotelAccountSpecificStatusUpdate.class);

            if (hassu != null) {
                hotelRFPAccountSpecificService.updateAccountSpecific(hotel_accountinfoid, hassu, getUserProperties(), true);
                hotelRFPAccountSpecificService.sendProductToMarshandPublishToHPP(hotel_accountinfoid, getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }


    public HotelService getHotelService() {
        return hotelService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public void setHotelMenuService(HotelMenuService hotelMenuService) {
        this.hotelMenuService = hotelMenuService;
    }

    public HotelMenuService getHotelMenuService() {
        return hotelMenuService;
    }

    public HotelRFPService getHotelRFPService() {
        return hotelRFPService;
    }

    public void setHotelRFPService(HotelRFPService hotelRFPService) {
        this.hotelRFPService = hotelRFPService;
    }
}
