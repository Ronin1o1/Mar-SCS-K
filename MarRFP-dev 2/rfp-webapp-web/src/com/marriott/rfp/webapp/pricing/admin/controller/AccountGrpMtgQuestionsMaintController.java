package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.common.util.CommonAPIConstants;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping(CommonAPIConstants.ACCOUNT_GRPMTG_QUESTIONS_MAINT_CONTROLLER)
public class AccountGrpMtgQuestionsMaintController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountGrpMtgQuestionsMaintController.class);
    @Autowired
    private ConstantsService constantsService = null;

    @Autowired
    private PricingAdminService pricingAdminService = null;

    public AccountGrpMtgQuestionsMaintController() {
        super();
    }

    @RequestMapping(value = CommonAPIConstants.IMPORT_EXCEL_DATA, method = POST)
    public String importExcelData(Long accountrecid, MultipartFile gmqfile) {
        try {
            ByteArrayInputStream byteArrayInputStream = convertMultiPartToByteArray(gmqfile);
            Long max_questions = getConstantsService().getMaxAccountQuestions();
            String impGrpMsg = pricingAdminService.saveExcelDataGMQues(byteArrayInputStream, accountrecid, max_questions, getUserProperties());
            return objectMapperStream(impGrpMsg);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/download", method = GET)
    public ResponseEntity<byte[]> download(HttpServletResponse response) {
        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        String fileName = "Template_Addendum_Questions.xlsx";
        return super.download(fileName, absoluteDiskPath,response);
    }

    public AccountGrpMtgQuestionsMaintController(PricingAdminService pricingAdminService, ConstantsService constantsService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setConstantsService(constantsService);
    }

    @RequestMapping(value = "/getAccGrpQuestions", method = GET)
    public String getAccGrpQuestions(Long accountrecid) throws Exception {
        try {
            List<AccountSpecQuestions> accountSpecQuestions = pricingAdminService.getGroupMtgQuestions(accountrecid);
            Long max_questions = constantsService.getMaxAccountQuestions();
            Account accountInfo = pricingAdminService.findAccountInfo(accountrecid);
            Map<String, Object> accountQuestions = new HashMap<>();
            accountQuestions.put("accountSpecQuestions", accountSpecQuestions);
            accountQuestions.put("max_questions", max_questions);
            accountQuestions.put("accountInfo", accountInfo);
            return objectMapperStream(accountQuestions);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long accountrecid, String strAccountSpecQuestions, String formChg) throws Exception {
        try {
            Type collectionType = new TypeToken<List<AccountSpecQuestions>>() {
            }.getType();
            List<AccountSpecQuestions> accountSpecQuestions = (List<AccountSpecQuestions>) fromJson(strAccountSpecQuestions, collectionType);
            if (formChg.equals("Y")) //not to flip screenstatus when no change
                pricingAdminService.updateGroupMtgQuestions(accountSpecQuestions, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/delete", method = POST)
    public String delete(Long delquest, Long accountrecid) throws Exception {
        try {
            pricingAdminService.deleteGroupMtgQuestion(delquest, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }


    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

}
