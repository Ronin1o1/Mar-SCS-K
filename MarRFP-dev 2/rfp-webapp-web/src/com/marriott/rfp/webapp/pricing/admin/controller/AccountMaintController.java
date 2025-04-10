package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.*;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.utility.DateUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmaintedit")
public class AccountMaintController extends HPPRateOfferRpgmLookupController {

    private static final Logger log = LoggerFactory.getLogger(AccountMaintController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public static final String DUPLICATE_ACCOUNT = "duplicate_account";

    public AccountMaintController() {
        super();
    }

    @Autowired
    public AccountMaintController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/download", method = GET)
    public ResponseEntity<byte[]> download(HttpServletResponse response) {
       String fileName = "Account_Complexity_Matrix_Rating_Criteria.xlsx";
        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        return super.download(fileName,absoluteDiskPath,response);

    }

    @RequestMapping(value = "/getAdditionalText", method = GET)
    public String getAdditionalText(Long accountrecid) throws Exception {
        try {
            RfpLaunchRecapEmail rfpLaunchRecapEmail = pricingAdminService.getRFPAdditionalText(accountrecid);
            log.info("rfpLaunchRecapEmail " + rfpLaunchRecapEmail.getAdditional_text());
            return objectMapperStream(rfpLaunchRecapEmail);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/rfpLaunchEmail", method = GET)
    public String rfpLaunchEmail(Long accountrecid, Long period, String additional_Text) throws Exception {
        try {
            AccountEmailInfo accountEmailInfo = null;
            if (accountrecid != null) {
                log.info("Entering rfpLaunchEmail()");
                RfpLaunchRecapEmail rfpLaunchRecapEmail = new RfpLaunchRecapEmail();
                rfpLaunchRecapEmail.setAdditional_text(additional_Text);
                accountEmailInfo = pricingAdminService.sendRFPLaunchEmail(accountrecid, rfpLaunchRecapEmail, getUserProperties());
                log.info("accountEmailInfo ReturnMessage " + accountEmailInfo.getReturnMessage());
                return objectMapperStream(accountEmailInfo);
            } else {
                accountEmailInfo.setReturnMessage("RFP Launch email will be available for existing accounts");
                return FATAL_ERROR;
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateAdditionalText", method = GET)
    public String updateAdditionalText(Long accountrecid, String additional_Text, Long period) throws Exception {
        try {
            RfpLaunchRecapEmail rfpLaunchRecapEmail = new RfpLaunchRecapEmail();
            rfpLaunchRecapEmail.setAdditional_text(additional_Text);
            pricingAdminService.updateRFPAdditionalText(accountrecid, rfpLaunchRecapEmail, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getContentOnlyTab1", method = GET)
    public String getContentOnlyTab1(Long period, Long accountrecid) throws Exception {
        String shortRfppulldate = "";
        String shortNextcontractstart = "";
        String shortContractend = "";
        String shortPrevcontractend = "";
        String shortRemindersdate = "";
        String shortPassubmissiondate = "";
        String shortClientduedate = "";
        String shortContractstart = "";
        try {
            AccountDetailGeneral accountDetailGeneral = pricingAdminService.getGeneralAccountDetails(accountrecid, getUserProperties());
            if (period == null || period.equals(0)) {
                period = accountDetailGeneral.getPeriod();
            }
            AccountDropDownLists accountDropDowns = pricingAdminService.findAccountMaintDropDowns(period);
            Period periodDetails = pricingAdminService.findPeriodDetails(period);
            if (accountrecid == 0) {
                accountDetailGeneral.setContractstart(periodDetails.getStartdate());
                accountDetailGeneral.setContractend(periodDetails.getEnddate());
            }
            String sysdate = pricingAdminService.getSysDate();
            if (accountDetailGeneral.getRfppulldate() != null) {
                shortRfppulldate = DateUtility.formatShortDate(accountDetailGeneral.getRfppulldate());
            }
            if (accountDetailGeneral.getNextcontractstart() != null) {
                shortNextcontractstart = DateUtility.formatShortDate(accountDetailGeneral.getNextcontractstart());
            }

            shortContractend = DateUtility.formatShortDate(accountDetailGeneral.getContractend());
            shortContractstart = DateUtility.formatShortDate(accountDetailGeneral.getContractstart());
            if (accountDetailGeneral.getPrevcontractend() != null) {
                shortPrevcontractend = DateUtility.formatShortDate(accountDetailGeneral.getPrevcontractend());
            }

            if (accountDetailGeneral.getRemindersdate() != null) {
                shortRemindersdate = DateUtility.formatShortDate(accountDetailGeneral.getRemindersdate());
            }
            if (accountDetailGeneral.getPassubmissiondate() != null) {
                shortPassubmissiondate = DateUtility.formatShortDate(accountDetailGeneral.getPassubmissiondate());
            }
            if (accountDetailGeneral.getClientduedate() != null) {
                shortClientduedate = DateUtility.formatShortDate(accountDetailGeneral.getClientduedate());
            }
            Map<String, Object> accountDetails = new HashMap<>();
            accountDetails.put("accountDetailGeneral", accountDetailGeneral);
            accountDetails.put("longDate",accountDetailGeneral.getCbcduedate());
            accountDetails.put("accountDropDowns", accountDropDowns);
            accountDetails.put("periodDetails", periodDetails);
            accountDetails.put("shortClientduedate", shortClientduedate);
            accountDetails.put("shortContractend", shortContractend);
            accountDetails.put("shortContractstart",shortContractstart);
            accountDetails.put("shortNextcontractstart",shortNextcontractstart);
            accountDetails.put("shortPassubmissiondate",shortPassubmissiondate);
            accountDetails.put("shortPrevcontractend",shortPrevcontractend);
            accountDetails.put("shortRemindersdate",shortRemindersdate);
            accountDetails.put("shortRfppulldate",shortRfppulldate);
            accountDetails.put("testsquatter",accountDetailGeneral.getNosquatter());
            //added objectMapperStream instead gsonStream for MRFP-8094 longDate format fix
            return objectMapperStream(accountDetails);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getContentOnlyTab2", method = GET)
    public String getContentOnlyTab2(Long accountrecid, Long period) throws Exception {
        try {
            AccountDetailBrands accountDetailBrands = pricingAdminService.getBrandAccountDetails(accountrecid, getUserProperties());

            if (period == null || period.equals(0)) {
                period = accountDetailBrands.getPeriod();
            }
            String sysdate = pricingAdminService.getSysDate();
            return objectMapperStream(accountDetailBrands);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getContentOnlyTab3", method = GET)
    public String getContentOnlyTab3(Long accountrecid) throws Exception {
        try {
            AccountDetailRFP accountDetailRFP = pricingAdminService.getAccountDetailRFP(accountrecid);
            RfpSettingsDropDownLists rfpSettingsDropDowns = pricingAdminService.findRfpSettingsDropDowns(accountrecid);
            if (null != rfpSettingsDropDowns.getAccLeadList() && rfpSettingsDropDowns.getAccLeadList().size() > 0) {
                if (null != rfpSettingsDropDowns.getAccLeadList().get(0).getName())
                    accountDetailRFP.setAccleadname(rfpSettingsDropDowns.getAccLeadList().get(0).getName());
                if (null != rfpSettingsDropDowns.getAccLeadList().get(0).getPhone())
                    accountDetailRFP.setAccleadphone(rfpSettingsDropDowns.getAccLeadList().get(0).getPhone());
            }
            if (null != rfpSettingsDropDowns.getSharedaccLeadList() && rfpSettingsDropDowns.getSharedaccLeadList().size() > 0) {
                if (null != rfpSettingsDropDowns.getSharedaccLeadList().get(0).getName())
                    accountDetailRFP.setSharedaccleadname(rfpSettingsDropDowns.getSharedaccLeadList().get(0).getName());
                if (null != rfpSettingsDropDowns.getSharedaccLeadList().get(0).getPhone())
                    accountDetailRFP.setSharedaccleadphone(rfpSettingsDropDowns.getSharedaccLeadList().get(0).getPhone());
            }
            if (null != rfpSettingsDropDowns.getBtamList() && rfpSettingsDropDowns.getBtamList().size() > 0) {
                if (null != rfpSettingsDropDowns.getBtamList().get(0).getName())
                    accountDetailRFP.setBtamname(rfpSettingsDropDowns.getBtamList().get(0).getName());
                if (null != rfpSettingsDropDowns.getBtamList().get(0).getPhone())
                    accountDetailRFP.setBtamphone(rfpSettingsDropDowns.getBtamList().get(0).getPhone());
            }
            Map<String, Object> settings = new HashMap<>();
            settings.put("accountDetailRFP", accountDetailRFP);
            settings.put("rfpSettingsDropDowns", rfpSettingsDropDowns);
            return objectMapperStream(settings);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getContentOnlyTab4", method = GET)
    public String getContentOnlyTab4(Long accountrecid) throws Exception {
        try {
            AccountDetailCompMatrix accountDetailCompMatrix = pricingAdminService.getAccountDetailCompMatrix(accountrecid);
            AccountCompDropDownLists accountCompDropDowns = pricingAdminService.findAccountCompDropDowns();
            accountDetailCompMatrix.setRfpfilesent(pricingAdminService.getRfpFileList(accountrecid));
            accountDetailCompMatrix.setRenegsubmit(pricingAdminService.getRenegSubmitList(accountrecid));
            Map<String, Object> accountDetails = new HashMap<>();
            accountDetails.put("accountCompDropDowns", accountCompDropDowns);
            accountDetails.put("accountDetailCompMatrix", accountDetailCompMatrix);
            return objectMapperStream(accountDetails);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateTab1", method = POST)
    public String updateTab1(String strAccountDetailGeneral, Long period, Long accountrecid) throws Exception {
        try {
            AccountDetailGeneral accountDetailGeneral = fromJson(strAccountDetailGeneral, AccountDetailGeneral.class);
            accountDetailGeneral.setPeriod(period);
            AccountUpdateInfo accountUpdateInfo = pricingAdminService.updateAccount(accountDetailGeneral, getUserProperties());
            Map<String, Object> response = new HashMap<>();
            response.put("accountrecid", accountUpdateInfo.getAccountrecid());
            response.put("brateprogsok", accountUpdateInfo.getBrateprogsok());
            response.put("baccountnameexists", accountUpdateInfo.getBaccountnameexists());
            return gsonStream(response);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateTab2", method = POST)
    public String updateTab2(String strAccountDetailBrands) throws Exception {
        try {
            AccountDetailBrands accountDetailBrands = fromJson(strAccountDetailBrands, AccountDetailBrands.class);
            AccountUpdateInfo accountUpdateInfo = pricingAdminService.updateAccountBrands(accountDetailBrands, getUserProperties());
            Map<String, Object> response= new HashMap<>();
            response.put("accountrecid",accountUpdateInfo.getAccountrecid());
            response.put("brateprogsok",accountUpdateInfo.getBrateprogsok());
            response.put("baccountnameexists",accountUpdateInfo.getBaccountnameexists());
            return gsonStream(response);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateTab3", method = POST)
    public String updateTab3(String strAccountDetailRFP) throws Exception {
        try {
            AccountDetailRFP accountDetailRFP = fromJson(strAccountDetailRFP, AccountDetailRFP.class);
            pricingAdminService.updateAccountDetailRFP(accountDetailRFP, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateTab4", method = POST)
    public String updateTab4(String strAccountDetailCompMatrix) throws Exception {
        try {
            AccountDetailCompMatrix accountDetailCompMatrix = fromJson(strAccountDetailCompMatrix, AccountDetailCompMatrix.class);
            pricingAdminService.updateAccountDetailCompMatrix(accountDetailCompMatrix, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteAccount", method = POST)
    public String deleteAccount(Long accountrecid) throws Exception {
        try {
            pricingAdminService.deleteAccount(accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/findRateOffers", method = GET)
    public String findRateOffers(String range, String name){
        return super.findRateOffers(range, name);
    }

    @RequestMapping(value = "/findRatePrograms", method = GET)
    public String findRatePrograms(Long rateOfferId){
        return super.findRatePrograms(rateOfferId);
    }

    @RequestMapping(value = "/lookUpRateOffer", method = GET)
    public String lookUpRateOffer() throws Exception {
        return super.getLookUpRateOffer();
    }
    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

}
