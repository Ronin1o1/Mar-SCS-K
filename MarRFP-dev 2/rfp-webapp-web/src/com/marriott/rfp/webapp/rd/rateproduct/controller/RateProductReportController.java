package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

//Could not found respective struts file
@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("/rateProductReport")
public class RateProductReportController extends BaseReportController {

    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Rate Product";
    private static final String REPORT_EXECUTABLE = "FR_RateProduct.rox";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;
    private static final Logger log = LoggerFactory.getLogger(RateProductReportController.class);


    public RateProductReportController() {
        super();
    }

    @Autowired
    public RateProductReportController(ConstantsService constantsService) {
        super(constantsService);
       // String marshaXMLUrl = constantsService.getMarshaXMLUrl();
        /*setReportTitle("Rate Product");
        setReportExecutable("FR_RateProduct.rox");
        setBIncludeExcelDownload(false);*/
    }
    //Added request mapping
    @RequestMapping(value = "/getRateProduct", method = GET)
    public String getRateProduct(String brandCode, String brandName, String productCode, String marshaCode, String hotelName) throws Exception {
        try {
            String marshaXMLUrl = constService.getMarshaXMLUrl();
            return getQueryString(marshaXMLUrl, brandCode, brandName, productCode, marshaCode, hotelName);

        } catch (Exception e) {
            log.error(e.getMessage());
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(String marshaXMLUrl, String brandCode, String brandName, String productCode, String marshaCode, String hotelName) {
        String queryString = "ParmHost=" + marshaXMLUrl;
        if (brandCode != null && !brandCode.equals("")) {
            queryString += "&pBrand=" + brandCode;
            if (brandName != null && !brandName.equals("")) {
                queryString += "&pBrandName=" + brandName;
            }
        }
        queryString += "&pProductCode=" + productCode;
        if (marshaCode != null && !marshaCode.equals("")) {
            queryString += "&pHotelCode=" + marshaCode + "&pHotelName=" + hotelName;
        }
        return queryString;
    }


}
