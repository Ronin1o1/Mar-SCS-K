package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDropDownLists;
import com.marriott.rfp.object.pricing.account.MCADSearch;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmcadmaint")
public class AccountMCADMaintController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountMCADMaintController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public AccountMCADMaintController() {
        super();
    }

    public AccountMCADMaintController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getAccountMCAD", method = GET)
    public String getAccountMCAD(Long accountrecid,String strMcadSearch) throws Exception {
        Account accountInfo=null;
        List<MCADData> mcadOracleDataList=null;
        MCADDropDownLists mcadDropDowns=null;
        long maxMCADLink=0l;
        try {
            MCADSearch mcadSearch = fromJson(strMcadSearch,MCADSearch.class);
            if (mcadSearch == null) {
                mcadSearch = new MCADSearch();
            }
            accountInfo = pricingAdminService.findAccountInfo(accountrecid);
            mcadOracleDataList = pricingAdminService.findOracleMCAD(accountrecid);
            for(int j=0;j<mcadOracleDataList.size();j++)
            {
                mcadOracleDataList.get(j).setStateabbrev(pricingAdminService.findOracleMCADDetail(mcadOracleDataList.get(j).getAccountrecid(),mcadOracleDataList.get(j).getBusinessid()).getStateabbrev());
            }
            mcadDropDowns = pricingAdminService.getMCADDropDownLists();
            maxMCADLink = pricingAdminService.getMaxMCADLink();
            Map<String, Object> accountMCAD = new HashMap<>();
            accountMCAD.put("accountInfo", accountInfo);
            accountMCAD.put("maxMCADLink", maxMCADLink);
            accountMCAD.put("mcadDropDowns", mcadDropDowns);
            accountMCAD.put("mcadSearch", mcadSearch);
            accountMCAD.put("mcadOracleDataList", mcadOracleDataList);
            return gsonStream(accountMCAD);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long accountrecid, String strUmcadMap) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<String, MCADData>>() {
            }.getType();
            Map<String, MCADData> umcadMap = (Map<String, MCADData>) fromJson(strUmcadMap, collectionType);
            pricingAdminService.updateMCADData(accountrecid, umcadMap);
            return gsonStream(accountrecid);
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


}
