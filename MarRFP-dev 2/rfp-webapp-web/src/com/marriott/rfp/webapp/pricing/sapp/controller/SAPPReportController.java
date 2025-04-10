package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping("/sappreport")
public class SAPPReportController extends BaseReportController {

	private static final Logger log = LoggerFactory.getLogger(SAPPReportController.class);
	@Autowired
	private ConstantsService constService;
	private static final String REPORT_TITLE = "Account Plan (SAPP) Report";
	private static final String REPORT_EXECUTABLE = "AccountPlan";
	private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;
	/* Cognos : on-demand report ends */
	public SAPPReportController() {
		super();
	}

	@Autowired
	public SAPPReportController(ConstantsService constantsService) {
		super(constantsService);
		/*setReportTitle("Account Plan (SAPP) Report");
		*//* Cognos : Removed .Rox starts *//*
		setReportExecutable("AccountPlan");
		*//* Cognos : Removed .Rox ends *//*
		setBIncludeExcelDownload(false);*/
	}

	@RequestMapping(value = "/getSAPPReport",method = GET )
	public String getSAPPReport(String moduleid,Long accountrecid, Long period, String accountname) throws Exception {
		try {
			//setQueryString( moduleid, accountrecid,  period,  accountname);
			Map<String, Object> info = new HashMap<>();
			info.put("reportQueryString", getQueryString(moduleid, accountrecid,  period,  accountname));
			info.put("reportTitle", REPORT_TITLE);
			info.put("reportExecutable", REPORT_EXECUTABLE);
			info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
			info.put("reportServer", constService.getReportOndemandUrl());
			info.put("excelDownloadLocation",constService.getExcelDownloadLocation());
			info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}

	private String getQueryString(String moduleid,Long accountrecid, Long period, String accountname) {
		/* Cognos : on-demand report parameters change starts */
		String reportExecutable="AccountPlan";
		String reportQueryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
		reportQueryString += "&p_paccount=" + accountrecid;
		reportQueryString += "&p_pmodule=" + moduleid;
		reportQueryString += "&p_pAccountname=" + accountname;
		reportQueryString += "&p_period=" + period;
		return reportQueryString;
		/* Cognos : on-demand report parameters change ends */
	}
}
