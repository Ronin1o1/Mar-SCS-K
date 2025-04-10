package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorInfo;
import com.marriott.rfp.object.pricing.pgoos.MirrorSearchCriteria;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelmirrorlist")
public class HotelMirrorListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelMirrorListController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public HotelMirrorListController() {
        super();
    }

    @Autowired
    public HotelMirrorListController(PricingAdminService pricingAdminService, PricingCommonService pricingCommonService, ConstantsService constantsService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setPricingCommonService(pricingCommonService);
        this.setConstantsService(constantsService);
    }

    @RequestMapping(value = "/getMirrorDetails", method = {GET, POST})
    public String getMirrorDetails(String strMirrorSearchCriteria) throws Exception {
        try {
            MirrorSearchCriteria mirrorSearchCriteria = fromJson(strMirrorSearchCriteria, MirrorSearchCriteria.class);
            List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
            if (mirrorSearchCriteria == null) {
                //  initialize();
                mirrorSearchCriteria.getPage().setPage(1);
                mirrorSearchCriteria.setFilterType("ALL");
                mirrorSearchCriteria.setOrderby(0);
            }
            mirrorSearchCriteria.getPage().setMaxpagelen(constantsService.getAccountCenterMaxPageLen());
            Long totalPages = pricingAdminService.getMirrorHotelsNumPages(mirrorSearchCriteria.getPage().getMaxpagelen(), mirrorSearchCriteria);
            List<MirrorDetail> mirrorList = pricingAdminService.findMirrorsForHotels(mirrorSearchCriteria);
            Map<String, Object> mirrorDetails = new HashMap<>();
            mirrorDetails.put("mirrorList", mirrorList);
            mirrorDetails.put("periodList", periodList);
            mirrorDetails.put("totalPages", totalPages);
            return objectMapperStream(mirrorDetails);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    /*private void initialize() {
        MirrorSearchCriteria mirrorSearchCriteria = new MirrorSearchCriteria();
        mirrorSearchCriteria.getPage().setPage(1);
        mirrorSearchCriteria.setFilterType("ALL");
        mirrorSearchCriteria.setOrderby(0);
    }*/


    @RequestMapping(value = "/delete", method = POST)
    public String delete(Long hotelid) throws Exception {
        try {
            pricingAdminService.deleteMirror(hotelid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strMirrorInfo) throws Exception {
        try {
            MirrorInfo mirrorInfo = fromJson(strMirrorInfo, MirrorInfo.class);
            pricingAdminService.updateMirror(mirrorInfo);
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

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }


    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

}
