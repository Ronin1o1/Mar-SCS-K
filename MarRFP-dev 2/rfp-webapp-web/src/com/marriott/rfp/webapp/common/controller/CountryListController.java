package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.object.country.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/countrylist")
public class CountryListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(CountryListController.class);
    @Autowired
    private ListsService listService = null;

    public CountryListController() {
        super();
    }

    @Autowired
    public CountryListController(ListsService listService) {
        super();
        this.listService = listService;
    }

    @RequestMapping(value = "/getCountries", method = RequestMethod.GET)
    public String getCountries() throws Exception {
        try {
            List<Country> countryList = listService.getCountries();
            return objectMapperStream(countryList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


}