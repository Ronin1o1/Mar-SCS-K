package com.marriott.rfp.webapp.pricing.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestionTypes;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/accountquestiontype")
public class AccountQuestionTypeController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountQuestionTypeController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public AccountQuestionTypeController() {
        super();
    }

    public AccountQuestionTypeController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }


    @RequestMapping(value = "/getAccQuestionTypes", method = GET)
    public String getAccQuestionTypes() throws Exception {
        try {
            List<AccountSpecQuestionTypes> accountSpecQuestionsTypes = pricingAdminService.getQuestionTypes();
            return objectMapperStream(accountSpecQuestionsTypes);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/getCustomAns", method = GET)
    public String getCustomAns(String questionId, String accSpec) {
        try {
            long customAnsLength = constantsService.getCustomAnswersLen();
            List<String> customAnswers = pricingAdminService.getCustomAnswersForQuestion(questionId, accSpec);
            Map<String, Object> customAns = new HashMap<>();
            customAns.put("customAnsLength", customAnsLength);
            customAns.put("customAnswers", customAnswers);
            return objectMapperStream(customAns);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;// Catch should have return statement so added this
        }

    }

    @RequestMapping(value = "/fetchAnswered", method = GET)
    public String fetchAnswersForQuestion(String questionId, String accSpec, String setTypeValue) {
        String val = "not answered";
        List<String> answers = null;
        Map<String, Object> info = new HashMap<>();
        if ("Y".equals(setTypeValue)) {
            answers = pricingAdminService.getCustomAnswersForQuestion(questionId, accSpec);
            if (answers.size() != 0) {
                val="answered";
                info.put("questionId",questionId);
                info.put("val",val);
                info.put("answers",answers);
                return gsonStream(info);
            }
        }
        answers = pricingAdminService.getCustomAnswers(questionId, accSpec);
        if (answers.size() != 0) {
            val="answered";
            info.put("questionId",questionId);
            info.put("val",val);
            info.put("answers",answers);
            return gsonStream(info);
        } else {
            info.put("questionId",questionId);
            info.put("val",val);
            info.put("answers",answers);
            return gsonStream(info);
        }


    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }


}
