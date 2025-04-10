package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationSelected;
import com.marriott.rfp.object.pricing.portfolio.SolicitSelect;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@Security(value = { "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/hotelsolicitationselect")
public class HotelSolicitationSelectedController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelSolicitationSelectedController.class);

    @Autowired
    private PortfolioService portfolioService;


    public HotelSolicitationSelectedController() {
        super();
    }

    @Autowired
    public HotelSolicitationSelectedController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getHotelSolicitationSelected",method = {GET,POST})
    public String getHotelSolicitationSelected(String strFilterValues) throws Exception{
        PricingFilterSelections filterValues = null;
        List<HotelSolicitationSelected> hotelSolicitSelectedlList = null;
        List<String> emailNotSent = null;

        try {
            if(StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            hotelSolicitSelectedlList = portfolioService.findSelectedHotelSolicitation(filterValues, getUserProperties());
            emailNotSent = portfolioService.getEmailNotSent(filterValues, "S");
            Map<String,Object> info =  new HashMap<>();
            info.put("hotelSolicitSelectedlList",hotelSolicitSelectedlList);
            info.put("emailNotSent",emailNotSent);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update",method = POST)
    public String update(String strSolicitSelect,Long accountrecid) throws Exception {
        boolean updateOtherList = false;
        try {
            Type collectionType = new TypeToken<List<SolicitSelect>>(){}.getType();
            List<SolicitSelect> solicitSelect = (List<SolicitSelect>) fromJson(strSolicitSelect, collectionType);
            if (accountrecid != null && solicitSelect != null)
                portfolioService.updateAccountSolicitationSelect(accountrecid, solicitSelect, getUserProperties());
            updateOtherList = true;
            return objectMapperStream(updateOtherList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/sendEmail",method = POST)
    public String sendEmail(String strSolicitSelect, MultipartFile myFile,Long accountrecid,Long period,Boolean myFileSizeFlag,String myFileName) throws Exception {
        String fileName="";
        byte[] bytes =null;
        try {

            Type collectionType = new TypeToken<List<SolicitSelect>>(){}.getType();
            List<SolicitSelect> solicitSelect = (List<SolicitSelect>) fromJson(strSolicitSelect, collectionType);
            if (accountrecid == null && solicitSelect == null && myFile == null) {
                myFileSizeFlag = true;
                return SUCCESS;
            } else {
                myFileSizeFlag = false;
            }
            if(myFile!=null) {
                bytes = getBytes(myFile);
            }
            fileName=myFileName;
            if(StringUtils.isNotEmpty(fileName) && bytes!=null) {
                portfolioService.sendSolicitationEmails(accountrecid, period, solicitSelect, bytes, fileName, getUserProperties());
            }
            else
            {
                portfolioService.sendSolicitationEmails(accountrecid,period,solicitSelect,getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    private byte[] getBytes(MultipartFile myFile) throws IOException {
        ByteArrayInputStream byteArrayInputStream = null;
        try {
            byteArrayInputStream = convertMultiPartToByteArray(myFile);
            byte[] bytes = new byte[byteArrayInputStream.available()];
            byteArrayInputStream.read(bytes);
            return bytes;
        } finally {
            IOUtils.closeQuietly(byteArrayInputStream);
        }
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }




   /* public String getEmailNotSentList() {
        String notSent = "";
        if (emailNotSent != null) {
            for (int i = 0; i < emailNotSent.size(); i++) {
                notSent += "<td><tr>" + emailNotSent.get(i) + "</td></tr>";
            }
        }
        return notSent;
    }*/


}
