package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.business.pricing.admin.api.HPPRateOfferRpgmLookupService;
import com.marriott.rfp.object.pricing.account.HPPRateOffer;
import com.marriott.rfp.object.pricing.account.HPPRateProgram;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

public class HPPRateOfferRpgmLookupController extends BaseController {

    @SuppressWarnings("unused")
    private static final long serialVersionUID = 1L;

    @Autowired
    private HPPRateOfferRpgmLookupService hppRateOfferRpgmLookupService;

    public String getLookUpRateOffer() throws Exception {
        return SUCCESS;
    }

    public String findRateOffers(String range, String name) {
        //String range = getRequest().getHeader("Range");
        Long start =0L;
        Long count = 0L;
        List<HPPRateOffer> hppRateOffer = new ArrayList<>();
        if (range != null) {
            String[] parts = range.split("-");
             start = Long.parseLong(parts[0].replaceAll("items=", ""));
             count = Long.parseLong(parts[1]) - start + 1;
        }
        hppRateOffer = hppRateOfferRpgmLookupService.getRateOffers(name, start, count);
        getResponse().addHeader("Content-Range", start + "-" + (start + hppRateOffer.size() - 1) + "/100000");
        return gsonStream(hppRateOffer);
    }

    public String findRatePrograms(Long rateOfferId) {
        List<HPPRateProgram> hppRateProgram = new ArrayList<>();
        if (rateOfferId != null) {
            hppRateProgram = hppRateOfferRpgmLookupService.getRatePrograms(rateOfferId);
        }
        return gsonStream(hppRateProgram);
    }


}
