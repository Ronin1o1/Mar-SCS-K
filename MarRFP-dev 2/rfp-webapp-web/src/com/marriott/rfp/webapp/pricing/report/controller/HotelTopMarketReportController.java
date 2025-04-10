package com.marriott.rfp.webapp.pricing.report.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.state.State;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import com.marriott.rfp.webapp.pricing.edie.controller.EdieHotelProfileAddController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/toptravelmarkets")
public class HotelTopMarketReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelTopMarketReportController.class);
    @Autowired
    private ListsService listsService = null;
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Top Travel Market Report";
    private static final String REPORT_EXECUTABLE = "eTopMarkets";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;

    /* Cognos : on-demand report ends */
    public HotelTopMarketReportController() {
        super();
    }

    @Autowired
    public HotelTopMarketReportController(ConstantsService constantsService, ListsService listsService) {
        super(constantsService);
        this.listsService = listsService;

    }

    @RequestMapping(value = "/getHTopMarketReport", method = RequestMethod.GET)
    public String getHTopMarketReport() throws Exception {
        try {

            Map<String, Object> info = new HashMap<>();
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

    @RequestMapping(value = "/getHotelTopMarketReport", method = RequestMethod.POST)
    public String getHotelTopMarketReport(Long hotelid, String strStates, String strCountries, Long period) throws Exception {
        try {
            List<String> states = fromJson(strStates, new TypeToken<List<String>>() {
            }.getType());
            List<String> countries = fromJson(strCountries, new TypeToken<List<String>>() {
            }.getType());
           // setQueryString(hotelid, states, countries, period);

            return objectMapperStream(getQueryString(hotelid, states, countries, period));
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/topMarketReportParams", method = RequestMethod.GET)
    public String getParameters() throws Exception {
        try {
            List<State> states = listsService.getStates("US");
            List<Country> countries = listsService.getCountries();

            Map<String, Object> info = new HashMap<>();
            info.put("states", states);
            info.put("countries", countries);

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(Long hotelid, List<String> states, List<String> countries, Long period) {
        /* Cognos : Adhoc report parameters change starts */
        String reportExecutable = "eTopMarkets";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        queryString += "&p_period=" + period;
        if (hotelid != null)
            queryString += "&p_photelid=" + hotelid;
        String statestr = getStateString(states);
        if (statestr != null && !statestr.equals(""))
            queryString += "&p_pstates=" + statestr;
        String countrystr = getCountryString(countries);
        if (countrystr != null && !countrystr.equals(""))
            queryString += "&p_pcountries=" + countrystr;
        return  queryString;
    }

    private String getStateString(List<String> state) {
        String thestates = "";
        if (state != null && state.size() > 0) {
            for (int i = 0; i < state.size(); i++) {
                if (state.get(i) != null) {
                    if (thestates.length() > 0)
                        thestates += ",";
                    thestates += "'" + state.get(i) + "'";
                }
            }
        }
        return thestates;
    }

    private String getCountryString(List<String> country) {
        String thecountries = "";
        if (country != null && country.size() > 0) {
            for (int i = 0; i < country.size(); i++) {
                if (country.get(i) != null) {
                    if (thecountries.length() > 0)
                        thecountries += ",";
                    thecountries += "'" + country.get(i) + "'";
                }
            }
        }
        return thecountries;
    }

    public void setListsService(ListsService listsService) {
        this.listsService = listsService;
    }

    public ListsService getListsService() {
        return listsService;
    }

}
