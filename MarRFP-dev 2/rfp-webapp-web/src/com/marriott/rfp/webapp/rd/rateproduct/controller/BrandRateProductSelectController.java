package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.roomdef.beans.HotelBrand;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("/rateproductbrandselect")
public class BrandRateProductSelectController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BrandRateProductSelectController.class);
    @Autowired
    private RateProductService rateProductService = null;


    public BrandRateProductSelectController() {
        super();
    }

    @Autowired
    public BrandRateProductSelectController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
    }
    //renamed execute
    @RequestMapping(value = "/getBrandRateProductSelect", method = GET)
    public String getBrandRateProductSelect() throws Exception {
        HotelBrand[] hotelBrands=null;
        try {
            hotelBrands = rateProductService.getHotelBrands();
            return objectMapperStream(hotelBrands);
        } catch (Exception e) {
            log.error(e.getMessage());
            return FATAL_ERROR;
        }
    }


    public RateProductService getRateProductService() {
        return rateProductService;
    }


    public void setRateProductService(RateProductService rateProductService) {
        this.rateProductService = rateProductService;
    }

}
