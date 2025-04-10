package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusRef;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/changeaccountstatus")
public class ChangeAccountStatusController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(ChangeAccountStatusController.class);
    @Autowired
    private PortfolioService portfolioService = null;


    public ChangeAccountStatusController() {
        super();
    }

    @Autowired
    public ChangeAccountStatusController(PortfolioService portfolioService) {
        super();
        this.setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getAllAccStatus", method = GET)
    public String getAllAccStatus() throws Exception {
        try {
            List<AccountStatusRef> allAccountStatus = portfolioService.getAllAccountStatusRef();
            return objectMapperStream(allAccountStatus);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

}
