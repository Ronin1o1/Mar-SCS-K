package com.marriott.rfp.webapp.pricing.portfolio.controller;


import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAddEmailInfo;
import com.marriott.rfp.object.pricing.sapp.Contacttype;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.misc.JsonResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping({"/hotelsolicitationemailinfo","/hotelsolicitationemailinfonew"})
public class HotelSolicitationAddEmailInfoController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSolicitationAddEmailInfoController.class);

    @Autowired
    private PortfolioService portfolioService;
    public HotelSolicitationAddEmailInfoController() {
        super();
    }

    @Autowired
    public HotelSolicitationAddEmailInfoController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getHotelSolicitationAddEmail",method = {GET,POST})
    public String getHotelSolicitationAddEmail(Long accountrecid,String addemailtext_screentype) throws Exception{
        try {
            HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo = portfolioService.getAccountSolicitEmailAdditionalEmail(accountrecid, addemailtext_screentype);
            List<Contacttype> emailtypelist = portfolioService.getEmailContactOptions(addemailtext_screentype);
            Map<String,Object> info = new HashMap<>();
            info.put("emailtypelist",emailtypelist);
            info.put("hotelSolicitationAddEmailInfo",hotelSolicitationAddEmailInfo);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update",method = POST)
    public String updateAdditionalEmailInfo(Long accountrecid,String strHotelSolicitationAddEmailInfo) throws Exception {
        try {
            HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo = fromJson(strHotelSolicitationAddEmailInfo, HotelSolicitationAddEmailInfo.class);
            portfolioService.updateHotelSolicitationAddEmailInfo(accountrecid, hotelSolicitationAddEmailInfo, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getContactType",method = GET)
    public String getContactType(Long accountrecid,String addemailtext_screentype) throws Exception {
        JsonResponse jsonResponse = new JsonResponse();
        try {
            Contacttype contact = portfolioService.getEmailContactOption(accountrecid, addemailtext_screentype);
            String contacttype = contact.getContacttypedesc();
            List<String> alist=new Vector<String>();
            alist.add(contacttype);
            jsonResponse.setItems(alist);
            jsonResponse.setIdentifier("contacttype");
            jsonResponse.setLabel("contacttype");
            return  objectMapperStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }
    public PortfolioService getPortfolioService() {
        return portfolioService;
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
}
