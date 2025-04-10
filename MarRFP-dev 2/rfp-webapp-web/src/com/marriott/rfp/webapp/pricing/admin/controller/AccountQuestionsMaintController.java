package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.io.IOUtils;
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
@RequestMapping("/accountquestionmaintedit")
public class AccountQuestionsMaintController extends BaseController {

    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private PricingAdminService pricingAdminService = null;

    private static final Logger log = LoggerFactory.getLogger(AccountQuestionsMaintController.class);

    public AccountQuestionsMaintController() {
        super();
    }

    public String importExcelDialog() {
        return SUCCESS;
    }


    @RequestMapping(value = "/importExcelData", method = POST)
    public String importExcelData(MultipartFile qfile, Long accountrecid, Long max_questions) {
        ByteArrayInputStream byteArrayInputStream = null;
        try {
            byteArrayInputStream = convertMultiPartToByteArray(qfile);
            max_questions = getConstantsService().getMaxAccountQuestions();
            String impFailMsg = pricingAdminService.saveExcelDataQues(byteArrayInputStream, accountrecid, max_questions, getUserProperties());
            return objectMapperStream(impFailMsg);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        } finally {
            IOUtils.closeQuietly(byteArrayInputStream);
        }
    }

    @RequestMapping(value = "/download", method = GET)
    public ResponseEntity<byte[]> download(HttpServletResponse response) {
        String fileName = "Template_Addendum_Questions.xlsx";
        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        return super.download(fileName, absoluteDiskPath, response);
    }

    @Autowired
    public AccountQuestionsMaintController(PricingAdminService pricingAdminService, ConstantsService constantsService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setConstantsService(constantsService);
    }


    @RequestMapping(value = "/getAccSpecQuestions", method = GET)
    public String getAccSpecQuestions(Long accountrecid, Long period) throws Exception {
        try {
            List<AccountSpecQuestions> accountSpecQuestions = pricingAdminService.getQuestions(accountrecid);
            Long max_questions = constantsService.getMaxAccountQuestions();
            Account accountInfo = pricingAdminService.findAccountInfo(accountrecid);
            Map<String, Object> accountQuestions = new HashMap<>();
            accountQuestions.put("accountSpecQuestions", accountSpecQuestions);
            accountQuestions.put("max_questions", max_questions);
            accountQuestions.put("accountInfo", accountInfo);
            return objectMapperStream(accountQuestions);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long accountrecid, String formChg, String strAccountSpecQuestions) throws Exception {
        try {
            Type collectionType = new TypeToken<List<AccountSpecQuestions>>() {
            }.getType();
            List<AccountSpecQuestions> accountSpecQuestions = (List<AccountSpecQuestions>) fromJson(strAccountSpecQuestions, collectionType);
            if (formChg.equals("Y")) //not to flip screenstatus when no change
                pricingAdminService.updateQuestions(accountSpecQuestions, accountrecid, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/delete", method = POST)
    public String delete(Long delquest, Long accountrecid) throws Exception {
        try {
            pricingAdminService.deleteQuestion(delquest, accountrecid, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
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
