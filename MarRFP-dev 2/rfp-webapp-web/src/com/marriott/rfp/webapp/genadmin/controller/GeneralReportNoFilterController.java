package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.webapp.common.controller.BaseReportNoFilterController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN",  "MFPAPADM", "MFPPPADM", "MFPRDADM" })
@RestController
@RequestMapping("/generalreportnofilter")
public class GeneralReportNoFilterController extends BaseReportNoFilterController {

    public GeneralReportNoFilterController() {	super();
        //String listViewAction="/generalreportnofilterlist/view.action";
    }
    @RequestMapping(value ="/getReportNoFilter" ,method = {GET,POST})
    public String getReportNoFilter(String strFilterValues,String reportType) throws Exception{
        return super.getReportNoFilter();

    }
}
