package com.marriott.rfp.webapp.pricing.mudroom.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.utility.NumberUtility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
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

@RestController
@RequestMapping("/salesmudroompc")
public class SalesMudroomPCController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(SalesMudroomPCController.class);
    @Autowired
    private MudroomService mudroomService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public SalesMudroomPCController() {
        super();
    }

    @Autowired
    public SalesMudroomPCController(MudroomService mudroomService) {
        super();
        this.setMudroomService(mudroomService);
    }
    //renamed execute to getSalesMudroomPC
    @RequestMapping(value = "/getSalesMudroomPC", method = {GET, POST})
    public String getSalesMudroomPC(String strPcpage, Long pcOrderby) throws Exception {
        try {
            Page pcpage = new Page();
            if (StringUtils.isNotEmpty(strPcpage)) {
                pcpage = fromJson(strPcpage, Page.class);
            }
            //pcOrderby = pcOrderby == null ? 0 : pcOrderby;//no need
            pcOrderby=(pcOrderby == null)?0:pcOrderby;
            if (pcpage == null) {
                pcpage = new Page();
                pcpage.setMaxpagelen(constantsService.getSalesMudPCMaxPageLen());
            }
            //initialize(pcOrderby);//pass pcorderBy
            long totalPCPages = NumberUtility.getTotalPages(mudroomService.getTotalSalesMudroomPC(getUserProperties()), pcpage.getMaxpagelen());
            List<SalesMudroomHotelAccount> salesMudrromPC = mudroomService.getSalesMudroomPrimaryContact(pcOrderby, getUserProperties(), pcpage);
            Map<String, Object> info = new HashMap<>();
            info.put("totalPCPages", totalPCPages);
            info.put("salesMudrromPC", salesMudrromPC);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
//could not find method salesrespondent

   /* private void initialize(Long pcOrderby) {
        this.pcOrderby=(pcOrderby == null)?0:pcOrderby;
        if (pcpage == null) {
            pcpage = new Page();
        }
        pcpage.setMaxpagelen(constantsService.getSalesMudPCMaxPageLen());
    }*/

    public MudroomService getMudroomService() {
        return mudroomService;
    }

    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

}
