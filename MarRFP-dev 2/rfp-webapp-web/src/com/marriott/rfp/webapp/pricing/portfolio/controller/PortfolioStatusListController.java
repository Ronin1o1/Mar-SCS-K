package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatus;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.misc.JsonResponse;
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

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/portfoliostatuslist")
public class PortfolioStatusListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioStatusListController.class);

    @Autowired
    private PortfolioService portfolioService;


    public PortfolioStatusListController() {
        super();

    }

    @Autowired
    public PortfolioStatusListController(PortfolioService portfolioService) {
        super();//Added super
        setPortfolioService(portfolioService);
    }

   // Upgrade-revisit not tested entire controller
    @RequestMapping(value ="/getPortfolioStatus" ,method = {GET,POST})
    public String getPortfolioStatus(String strFilterValues) throws Exception {
        try {
            PricingFilterSelections filterValues=null;
            List<PortfolioStatus>  portfolioStatusList=null;
            if(StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            portfolioStatusList = portfolioService.findPortfolioStatus(filterValues, getUserProperties());
            List<String> tempList = new ArrayList<String>();
            String notfound = "";
    	    if(filterValues != null){
    	    	if(filterValues.getList() != null && !filterValues.getList().equalsIgnoreCase("")){
    	    		List<String> list = Arrays.asList(filterValues.getList().split(","));
    	    		boolean found;
    	    		for(int i=0; i<list.size(); i++){
    	    			found = true;
    	    			if(list.get(i) != null && !list.get(i).equalsIgnoreCase("")){
    	    				found = false;
    	    				for(int j=0; j<portfolioStatusList.size(); j++){
    		    				if(portfolioStatusList.get(j).getMarshacode() != null && !portfolioStatusList.get(j).getMarshacode().equalsIgnoreCase("")){
    		    					if(portfolioStatusList.get(j).getMarshacode().equalsIgnoreCase(list.get(i))){
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
            info.put("portfolioStatusList",portfolioStatusList);
            info.put("tempList",tempList);
            info.put("notfound",notfound);
            return objectMapperStream(info);
           } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value ="/update" ,method = POST)
    public String update(String strPortfolioStatusList,Long accountrecid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<PortfolioStatus>>(){}.getType();
            List<PortfolioStatus> portfolioStatusList = (List<PortfolioStatus>) fromJson(strPortfolioStatusList, collectionType);
            portfolioService.updatePortfolioStatusList(portfolioStatusList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value ="/acceptAll" ,method = POST)
    public String acceptAll(String strPortfolioStatusList,Long accountrecid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<PortfolioStatus>>(){}.getType();
            List<PortfolioStatus> portfolioStatusList = (List<PortfolioStatus>) fromJson(strPortfolioStatusList, collectionType);
            portfolioService.updateAcceptancePortfolioStatusList("A", portfolioStatusList, accountrecid, getUserProperties(), -1);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value ="/rejectAll" ,method = POST)
    public String rejectAll(String strPortfolioStatusList,Long accountrecid, int rejectionReasonID) throws Exception {
        try {
            Type collectionType = new TypeToken<List<PortfolioStatus>>(){}.getType();
            List<PortfolioStatus> portfolioStatusList = (List<PortfolioStatus>) fromJson(strPortfolioStatusList, collectionType);
            portfolioService.updateAcceptancePortfolioStatusList("R", portfolioStatusList, accountrecid, getUserProperties(), rejectionReasonID);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value ="/ajaxsave" ,method = POST)
    public String ajaxsave(String rawSaveData,Long accountrecid) throws Exception {
        if (rawSaveData != null) {
            GsonBuilder gson = new GsonBuilder();
            gson.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
                @Override
                public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                    String raw = json.getAsString();
                    SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
                    Date d = null; try {
                        d = sdf.parse(raw);
                    } catch (ParseException e) {
                        log.error(e.getMessage(),e);
                    }
                    return d;
                }
            });
            List<PortfolioStatus>   portfolioStatusList = gson.create().fromJson(rawSaveData, new TypeToken<List<PortfolioStatus>>(){}.getType());
            portfolioService.updatePortfolioStatusList(portfolioStatusList, accountrecid, getUserProperties());
            JsonResponse jsonResponse = new JsonResponse();
            List<String> ids = new ArrayList<String>();
            for (PortfolioStatus ps : portfolioStatusList) {
                ids.add(ps.getMarshacode());
            }
            jsonResponse.setItems(ids);
        }

        return SUCCESS;
    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }

}
