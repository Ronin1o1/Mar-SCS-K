package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentDataView;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproductassignmentreport")
public class RateProductAssignmentReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(RateProductAssignmentReportController.class);
    //Inputs to WebService Call to create Cognos report RateProgramAssignment

    @Autowired
    private RateProductService rateProductService;
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Rate Product";
    private static final String REPORT_EXECUTABLE = "eFR_RateProgramAssignment";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;



    public RateProductAssignmentReportController() {
        super();
    }

    @Autowired
    public RateProductAssignmentReportController(ConstantsService constantsService, RateProductService rateProductService) {
        super(constantsService);
        /*setReportTitle("Rate Product");
        setReportExecutable("eFR_RateProgramAssignment");*/
        this.rateProductService = rateProductService;
        //entryLevel = "HotelReport";
    }

    //Execute report to call RateProgram Assignment Webservice call and insert data into oracle table.
    @RequestMapping(value = "/getRateProductAssignmentReport", method = RequestMethod.GET)
    public String getRateProductAssignmentReport(String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName) throws Exception {
        RateProductAssignmentView rateProductAssignmentView=null;
        Long reportId=null;
        try {
            /*String reportTitle="Rate Product";
            String reportExecutable="eFR_RateProgramAssignment";*/
            entryLevel=(entryLevel==null)?"HotelReport":entryLevel;
            long listSize = 0;
            String startRateplancode = null;
            String endRateplancode = "";
            int i = 0;
            Vector<RateProductAssignmentDataView> RatePlanAssignmentDataCompleteList = null;

            //First time call to webservice, this webservice pulls only 300 records at a time.
            if (listSize == 0) {

                rateProductAssignmentView = rateProductService.getRatePlanAssignmentListforReport(marshaCode, brandCode, entryLevel, rpgmCode, rpgmName, "", "", "", "");
                //Get the list of the data for the first time call, if the list is null don't do anything
                if (rateProductAssignmentView != null) {
                    if (rateProductAssignmentView.getRatePlanAssignmentDataList() != null) {
                        listSize = rateProductAssignmentView.getRatePlanAssignmentDataList().size();
                    }

                    //Get the last Rate plan code from the list and set as StartRatePlanCode for the next call.
                    if (listSize != 0) {
                        i = (int) listSize - 1;
                        @SuppressWarnings("unchecked")
                        Vector<RateProductAssignmentDataView> RatePlanAssignmentDataList = rateProductAssignmentView.getRatePlanAssignmentDataList();
                        startRateplancode = RatePlanAssignmentDataList.get(i).getRatePlanCode();
                        //Assign the list of data to other list (which is a final list)
                        RatePlanAssignmentDataCompleteList = RatePlanAssignmentDataList;
                    }
                }
                //Second and future Call to webservices.
                while (listSize == 300) {

                    //With the startPlanCode assigned, this method will retrieve next 300 list.
                    rateProductAssignmentView = rateProductService.getRatePlanAssignmentListforReport(marshaCode, brandCode, entryLevel, rpgmCode, rpgmName, startRateplancode, endRateplancode, "", "");
                    //Get the last Rate plan code from the list and set as StartPlanCode for the next call.
                    if (rateProductAssignmentView.getRatePlanAssignmentDataList() != null) {
                        listSize = rateProductAssignmentView.getRatePlanAssignmentDataList().size();
                        i = (int) listSize - 1;
                        @SuppressWarnings("unchecked")
                        Vector<RateProductAssignmentDataView> RatePlanAssignmentDataList = rateProductAssignmentView.getRatePlanAssignmentDataList();
                        startRateplancode = RatePlanAssignmentDataList.get(i).getRatePlanCode();
                        RatePlanAssignmentDataCompleteList.addAll(RatePlanAssignmentDataList);
                    }
                    //To handle if the complete size of the list is 300.
                    else {
                        listSize = -1;
                    }
                }
                //set the complete list.
                rateProductAssignmentView.setRatePlanAssignmentDataList(RatePlanAssignmentDataCompleteList);
                //Method called to insert the list of data to the oracle table.
                if (rateProductAssignmentView.getRatePlanAssignmentDataList() != null) {
                    reportId = rateProductService.insertPlanAssignmentList(rateProductAssignmentView, marshaCode, brandCode);
                }
            }
            if (reportId != null) {
                String reportQueryString=setQueryString(REPORT_EXECUTABLE,marshaCode,reportId);
                Map<String,Object> info= new HashMap<>();
                info.put("reportQueryString",reportQueryString);
                info.put("excelDownloadLocation",constService.getExcelDownloadLocation());
                info.put("reportServer",constService.getReportOndemandUrl());
                info.put("reportUrl",getReportUrl( constService.getReportOndemandUrl(), reportQueryString));
                return  objectMapperStream(info);
            } else {
                return FATAL_ERROR;
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    //method to set input parameters for the cognos report.
    private String  setQueryString(String reportExecutable,String marshaCode,Long reportId) {
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        queryString += "&p_marshacode=" + marshaCode + "&p_seqid=" + reportId;
       return queryString;
    }



}
