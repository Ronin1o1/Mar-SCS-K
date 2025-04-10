package com.marriott.rfp.webapp.pricing.portfolio.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAvail;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/hotelsolicitationavail")
public class HotelSolicitationAvailController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSolicitationAvailController.class);
    @Autowired
    private PortfolioService portfolioService;

    public HotelSolicitationAvailController() {
        super();

    }

    @Autowired
    public HotelSolicitationAvailController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getHotelSolicitationAvail",method = {GET,POST})
    public String getHotelSolicitationAvail(String strFilterValues) throws Exception{
        PricingFilterSelections filterValues = null;
        try {
            if(StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<HotelSolicitationAvail> hotelSolicitAvailList = portfolioService.findAvailHotelSolicitation(filterValues, getUserProperties());
            ArrayList<String> tempList = new ArrayList<String>();
            String notfound = "";
            if(filterValues != null){
                if(filterValues.getList() != null && !filterValues.getList().equalsIgnoreCase("")){
                    List<String> list = Arrays.asList(filterValues.getList().split(","));
                    boolean found;
                    for(int i=0; i<list.size(); i++){
                        found = true;
                        if(list.get(i) != null && !list.get(i).equalsIgnoreCase("")){
                            found = false;
                            for(int j=0; j<hotelSolicitAvailList.size(); j++){
                                if(hotelSolicitAvailList.get(j).getMarshacode() != null && !hotelSolicitAvailList.get(j).getMarshacode().equalsIgnoreCase("")){
                                    if(hotelSolicitAvailList.get(j).getMarshacode().equalsIgnoreCase(list.get(i))){
                                        found = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if(!found){
                            tempList.add(list.get(i).toUpperCase());
                            if(notfound != null){
                                notfound = notfound + list.get(i).toUpperCase() + " ";
                            } else {
                                notfound = list.get(i).toUpperCase() + " ";
                            }
                        }
                    }
                    if(!tempList.isEmpty()){
                        if(tempList.size() == 1){
                            tempList.add(0, "The following MARSHA code was not found");
                            notfound = "The following MARSHA code was not found: " + notfound;
                        } else {
                            tempList.add(0, "The following MARSHA codes were not found");
                            notfound = "The following MARSHA codes were not found: " + notfound;
                        }
                    } else {
                        notfound = "";
                    }
                } else {
                    filterValues.setList("");
                }
            }
            Map<String,Object> info =new HashMap<>();
            info.put("hotelSolicitAvailList",hotelSolicitAvailList);
            info.put("tempList",tempList);
            info.put("notfound",notfound);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update",method = POST)
    public String update(Long accountrecid,String strCheckAvail) throws Exception {
        boolean updateOtherList = false;
        try {
            Type collectionType = new TypeToken<List<Long>>(){}.getType();
            List<Long> checkAvail = (List<Long>) fromJson(strCheckAvail, collectionType);
            if (accountrecid != null && checkAvail != null)
                portfolioService.updateAccountSolicitationAvail(accountrecid, checkAvail, getUserProperties());
            updateOtherList = true;
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }
    
}
