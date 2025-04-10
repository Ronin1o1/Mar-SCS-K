package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.common.misc.JsonResponse;
import com.marriott.rfp.webapp.dto.PortfolioRebidList;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/portfoliorebidlist")
public class PortfolioRebidListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioRebidListController.class);
    @Autowired
    private PortfolioService portfolioService;



    public PortfolioRebidListController() {
        super();

    }

    @Autowired
    public PortfolioRebidListController(PortfolioService portfolioService) {
        super();//Added super
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getPortfolioRebid", method = POST)
    public PortfolioRebidList getPortfolioRebid(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;

        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            PortfolioRebidList portfolioRebidList=new PortfolioRebidList();
            portfolioRebidList.setPortfolioRebidList(portfolioService.findPortfolioRebid(filterValues, getUserProperties()));
            portfolioRebidList.setEmailNotSent(portfolioService.getEmailNotSent(filterValues, "R"));
            return portfolioRebidList;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strPortfolioRebidList, Long accountrecid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<PortfolioRebid>>() {
            }.getType();
            List<PortfolioRebid> portfolioRebidList = fromJson(strPortfolioRebidList, collectionType);
            portfolioService.updatePortfolioRebidList(portfolioRebidList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/sendemail", method = POST)
    public String sendemail(String strFilterValues, String strPortfolioRebidList, Long accountrecid) throws Exception {
        PricingFilterSelections filterValues = null;
        try {
            Type collectionType = new TypeToken<List<PortfolioRebid>>() {
            }.getType();
            List<PortfolioRebid> portfolioRebidList = fromJson(strPortfolioRebidList, collectionType);

            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            if (accountrecid == null && portfolioRebidList == null) {
                return SUCCESS;
            }
            portfolioService.sendRebidEmail(accountrecid, filterValues.getYear(), portfolioRebidList, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/ajaxsave", method = POST)
    public String ajaxsave(String rawSaveData, Long accountrecid) throws Exception {
        JsonResponse jsonResponse = new JsonResponse();
        if (rawSaveData != null) {
            GsonBuilder gson = new GsonBuilder();
            gson.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
                @Override
                public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                    String raw = json.getAsString();
                    SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
                    Date d = null;
                    try {
                        d = sdf.parse(raw);
                    } catch (ParseException e) {
                        log.error(e.getMessage(),e);
                    }
                    return d;
                }
            });
            List<PortfolioRebid> portfolioRebids = gson.create().fromJson(rawSaveData, new TypeToken<List<PortfolioRebid>>() {
            }.getType());
            portfolioService.updatePortfolioRebidList(portfolioRebids, accountrecid, getUserProperties());
            List<Long> ids = new ArrayList<Long>();
            for (PortfolioRebid pr : portfolioRebids) {
                ids.add(pr.getHotelid());
            }
            jsonResponse.setItems(ids);
        }
        return objectMapperStream(jsonResponse);
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }



    public String getEmailNotSentList(List<String> emailNotSent) {
        String notSent = "";
        if (emailNotSent != null) {
            for (int i = 0; i < emailNotSent.size(); i++) {
                notSent += "<td><tr>" + emailNotSent.get(i) + "</td></tr>";
            }
        }
        return notSent;
    }
}
