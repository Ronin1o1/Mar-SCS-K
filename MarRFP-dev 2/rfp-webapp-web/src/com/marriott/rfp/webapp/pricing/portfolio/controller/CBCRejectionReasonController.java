package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = {"/cbcrejectionreason", "/cbcquickselect"})
public class CBCRejectionReasonController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(CBCRejectionReasonController.class);
    @Autowired
    private PortfolioService portfolioService;


    public CBCRejectionReasonController() {
        super();
    }

    @Autowired
    public CBCRejectionReasonController(PortfolioService portfolioService) {
        super();
        this.setPortfolioService(portfolioService);
    }

    //view tiles type method but already renamed in action
    @RequestMapping(value = "/getCBCRejectReasonList", method = GET)
    public String getCBCRejectReasonList() throws Exception {
        List<RejectionReason> rejectionReasonList = null;
        try {
            rejectionReasonList = portfolioService.findCBCRejectionReasons();
            return objectMapperStream(rejectionReasonList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }


}
