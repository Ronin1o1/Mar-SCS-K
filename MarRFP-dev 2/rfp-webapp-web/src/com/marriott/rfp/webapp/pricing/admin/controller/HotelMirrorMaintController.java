package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.mirrorlookup.api.MirrorLookupService;
import com.marriott.rfp.object.mirror.PropertyMirrorRateEntity;
import com.marriott.rfp.object.mirror.PropertyMirrorRateOffer;
import com.marriott.rfp.object.mirror.RateType;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.misc.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelmirroredit")
public class HotelMirrorMaintController extends BaseController {

    @Autowired
    private PricingAdminService pricingAdminService = null;

    @Autowired
    private MirrorLookupService mirrorLookupService;


    public HotelMirrorMaintController() {
        super();
    }

    public HotelMirrorMaintController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }


    @RequestMapping(value = "/getMirrorEdit", method = GET)
    public String getMirrorEdit(Long hotelid, Long roomClassSequence, Long roomPoolSequence) throws Exception {

        List<RateType> rateTypeList=mirrorLookupService.getRateTypes();;
        MirrorDetail mirrorDetail = pricingAdminService.findMirrorsForHotel(hotelid, roomClassSequence, roomPoolSequence);
        Map<String, Object> hotelMirrorDetails = new HashMap<>();
        hotelMirrorDetails.put("mirrorDetail", mirrorDetail);
        hotelMirrorDetails.put("rateTypeList", rateTypeList);
        return objectMapperStream(hotelMirrorDetails);
    }

    @RequestMapping(value = "/findRateOffers", method = POST)
    public String findRateOffers(Long hotelid, Long rateOfferId, Long rateTypeId) {
        JsonResponse jsonResponse = new JsonResponse();
        List<PropertyMirrorRateOffer> rateOffers = mirrorLookupService.findEligibleParentPropertyROs(hotelid, rateOfferId, rateTypeId);

        jsonResponse.setItems(rateOffers);
        jsonResponse.setIdentifier("rateOfferId");
        jsonResponse.setLabel("rateOfferName");

        return gsonStream(jsonResponse);
    }

    @RequestMapping(value = "/findRateEntities", method = POST)
    public String findRateEntities(Long hotelid, Long rateOfferId) {
        JsonResponse jsonResponse = new JsonResponse();
        List<PropertyMirrorRateEntity> rateEntities = mirrorLookupService.findAllPropertyREs(hotelid, rateOfferId);

        jsonResponse.setItems(rateEntities);
        jsonResponse.setIdentifier("rateEntityId");
        jsonResponse.setLabel("roomPoolCode");

        return gsonStream(jsonResponse);
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }







}
