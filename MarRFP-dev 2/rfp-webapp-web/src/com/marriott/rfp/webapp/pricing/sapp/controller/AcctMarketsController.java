package com.marriott.rfp.webapp.pricing.sapp.controller;


import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.pricing.sapp.Markets;
import com.marriott.rfp.object.state.State;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/acctmarkets")
public class AcctMarketsController extends BaseSAPPController{
    @Autowired
    private ListsService listsService = null;
    private static final Logger log = LoggerFactory.getLogger(AcctMarketsController.class);

    private static final String CURRENT_SCREEN = "acctmarkets";
    private static final String  NEXT_SCREEN = "groupsprofile";
    private static final String  PREVIOUS_SCREEN = "acctbtoverview";

    public AcctMarketsController() {
        super();
    }

    @Autowired
    public AcctMarketsController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                             AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
        this.listsService = listsService;
    }

    @RequestMapping(value = "/getAcctMarkets",method = {GET,POST})
    public String getAcctMarkets(Long accountrecid,String sortByInter,String sortByUS,Long recid,@RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                 @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                 @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate="";
        boolean checkFields=false;
        try {
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "OverviewMarkets");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;
            if (StringUtils.isEmpty(sortByUS))
                sortByUS = "0";
            if (StringUtils.isEmpty(sortByInter))
                sortByInter = "0";

            List<Markets> usMarkets = getAccountOverviewService().getAcctOverviewMarkets(accountrecid, true, new Integer(sortByUS).intValue());
            List<Markets> intlMarkets = getAccountOverviewService().getAcctOverviewMarkets(accountrecid, false, new Integer(sortByInter).intValue());
            Long maxTravelMarkets = getConstantsService().getMaxTravelMarkets();
            Map<Integer, Markets> usMarketsMap = new HashMap<Integer, Markets>();
            for (int i = 0; i < usMarkets.size(); i++) {
                Markets init1 = usMarkets.get(i);
                long recid1 = init1.getRecid();
                init1.setCurractivity(getAccountOverviewService().getAcctOverviewMarketInfo(recid1).getCurractivity());
                init1.setNotes(getAccountOverviewService().getAcctOverviewMarketInfo(recid1).getNotes());
                Integer key = i + 1;
                usMarketsMap.put(key, init1);
            }


            Map<Integer, Markets> intlMarketsMap = new HashMap<Integer, Markets>();
            for (int i = 0; i < intlMarkets.size(); i++) {
                Markets init2 = intlMarkets.get(i);
                long recid2 = init2.getRecid();
                init2.setCurractivity(getAccountOverviewService().getAcctOverviewMarketInfo(recid2).getCurractivity());
                init2.setNotes(getAccountOverviewService().getAcctOverviewMarketInfo(recid2).getNotes());
                Integer key = i + 1;
                intlMarketsMap.put(key, init2);
            }


            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields=false;
            } else {
                checkFields=true;
            }

            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("sortByUS", sortByUS);
            info.put("sortByInter", sortByInter);
            info.put("usMarkets", usMarkets);
            info.put("intlMarkets", intlMarkets);
            info.put("maxTravelMarkets", maxTravelMarkets);
            info.put("usMarketsMap", usMarketsMap);
            info.put("intlMarketsMap", intlMarketsMap);
            info.put("checkFields", checkFields);
            info.put("currentScreen", currentScreen);
            info.put("nextScreen", nextScreen);
            info.put("previousScreen", previousScreen);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error("error",e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    // Added by TCS for INC000002650694 - Export feature for the BT/Business
    // Transient - City/Markets screen information - Start
    /**
     * Exports the data in City/Markets screen to a csv file in the template
     * already defined
     *
     * @return SUCCESS
     * @throws Exception
     */
    @RequestMapping(value = "/export",method = GET)
    public ResponseEntity<byte[]> export(String sortByUS, String sortByInter, String marketType, HttpServletResponse response, Long accountrecid) throws Exception {

        try {

            if (sortByUS == null)
                sortByUS = "0";
            if (sortByInter == null)
                sortByInter = "0";

            byte[] byteArray = null;

            if (marketType.equals("US")) {
                List<Markets> usMarkets = getAccountOverviewService().getAcctOverviewMarkets(
                        accountrecid, true,
                        new Integer(sortByUS).intValue());

                byteArray =  getAccountOverviewService().getExportDataSAPP(marketType, usMarkets);

            } else if (marketType.equals("International")) {
                List<Markets> intlMarkets = getAccountOverviewService()
                        .getAcctOverviewMarkets(accountrecid, false,
                                new Integer(sortByInter).intValue());

                byteArray =getAccountOverviewService().getExportDataSAPP(marketType, intlMarkets);
            }

            if (byteArray.length>0) {
                String myFileFileName =null;
//TO-DO:revist --check logic and functionality with tester
                if (marketType.equals("US")) {
                     myFileFileName ="US_City-markets_Export.csv";
                }
                else if(marketType.equals("International"))
                {
                     myFileFileName ="International_City-Markets_Export.csv";
                }
                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+myFileFileName);
                byte[] bytes = byteArray;
                return new ResponseEntity<byte[]>(bytes, HttpStatus.OK);

            } else {

                // If there is any exception, just export the template without
                // any data

                String fileName = "";
                log.error("filename"+fileName+"fileName");
                if (marketType.equals("US")) {
                    fileName = "Template_US_City-markets_Import.csv";
                } else if (marketType.equals("International")) {
                    fileName = "Template_International_City-Markets_Import.csv";
                }

                String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
               return  super.download(fileName,absoluteDiskPath,response);

            }

        } catch (Exception e) {
            log.error("error",e);
            throw new GenericException(e.getMessage(),e);
        }
    }
    // Added by TCS for INC000002650694 - Export feature for the BT/Business
    // Transient - City/Markets screen information - Start


    @RequestMapping(value = {"/download"},method = {GET,POST})
    public ResponseEntity<byte[]> download(String marketType, HttpServletResponse response){
        String fileName = "";
        if(marketType.equals("US")){
            fileName = "Template_US_City-markets_Import.csv";
        }else if(marketType.equals("International")){
            fileName = "Template_International_City-Markets_Import.csv";
        }else if(marketType.equals("US-Instruction")){
            fileName = "US_States_and_Two_letter_abbreviations.xlsx";
        }else if (marketType.equals("International-Instruction")){
            fileName = "Countries_and_Two_letter_abbreviations.xlsx";
        }

        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        return super.download(fileName,absoluteDiskPath,response);
    }

    @RequestMapping(value = {"/downloadtemplate"},method = {GET,POST})
    public ResponseEntity<byte[]> downloadTemplate(String marketType, HttpServletResponse response){
        String fileName = "";
        if(marketType.equals("US")){
            fileName = "Template_US_City-markets_Import.csv";
        }else if(marketType.equals("International")){
            fileName = "Template_International_City-Markets_Import.csv";
        }else if(marketType.equals("US-Instruction")){
            fileName = "US_States_and_Two_letter_abbreviations.xlsx";
        }else if (marketType.equals("International-Instruction")){
            fileName = "Countries_and_Two_letter_abbreviations.xlsx";
        }
        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        return super.download(fileName,absoluteDiskPath,response);
    }

    @RequestMapping(value = "/importExcelData",method = POST)
    public String importExcelData(MultipartFile myFile, String marketType,Long accountrecid){
        BufferedReader br = null ;
        try{
            ByteArrayInputStream byteArrayInputStream = convertMultiPartToByteArray(myFile);
            br=new BufferedReader(new InputStreamReader(byteArrayInputStream));
            List<String> stateNames = new ArrayList<String>();
            List<String> countryNames =  new ArrayList<String>();
            List<State> stateRef = listsService.getStates("US");
            List<Country> countryRef = listsService.getCountries();
            Long maxTravelMarkets = getConstantsService().getMaxTravelMarkets();
            for (State st : stateRef) {
                stateNames.add(st.getState());
            }
            for (Country ct : countryRef) {
                countryNames.add(ct.getCountry());
            }
            String importFailMsg = getAccountOverviewService().saveExcelDataSAPP(br,maxTravelMarkets,marketType,accountrecid,stateNames,countryNames);
            return objectMapperStream(importFailMsg);

        }
        catch(Exception e){
            log.error("error",e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/deleteAllUSMarkets",method = POST)
    public String deleteAllUSMarkets(Long accountrecid) throws Exception {
        try {
            getAccountOverviewService().deleteAcctMarketsbyCountry(accountrecid, "Y");
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error("error",e);
            throw new GenericException(e.getMessage(),e);
        }
    }

    @RequestMapping(value = "/deleteAllIntlMarkets",method = POST)
    public String deleteAllIntlMarkets(Long accountrecid) throws Exception {
        try {
            getAccountOverviewService().deleteAcctMarketsbyCountry(accountrecid, "N");
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error("error",e);
            throw new GenericException(e.getMessage(),e);
        }
    }

    @RequestMapping(value = "/deleteMarket",method = POST)
    public String deleteMarket(Long recid,String usMarket, Long accountrecid) throws Exception {
        try {
            getAccountOverviewService().deleteAcctOverviewMarketLevel( recid,  usMarket, accountrecid);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error("error",e);
            throw new GenericException(e.getMessage(),e);
        }
    }


    //retaining them :otheriwse FE will have to send huge object of data
}
