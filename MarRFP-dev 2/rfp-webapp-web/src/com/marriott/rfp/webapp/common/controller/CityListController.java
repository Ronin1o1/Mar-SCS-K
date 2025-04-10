package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.lists.api.ListsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/citylist")
public class CityListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(CityListController.class);
    @Autowired
    private ListsService listService = null;

    public CityListController() {
        super();
    }

    @Autowired
    public CityListController(ListsService listService) {
        super();
        this.listService = listService;
    }


    @RequestMapping(value = "/getCities", method = RequestMethod.GET)
    public String getCities(String country, String state) throws Exception {
        try {
            List<String> cityList = listService.getCities(country, state);
            return objectMapperStream(cityList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
