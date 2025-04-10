package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.object.state.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/statelist")
public class StateListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(StateListController.class);
    @Autowired
    private ListsService listService = null;

    public StateListController() {
        super();
    }

    @Autowired
    public StateListController(ListsService listService) {
        super();
        this.listService = listService;
    }

    @RequestMapping(value = "/getStates", method = RequestMethod.GET)
    public String getStates(String country) throws Exception {
        try {
            List<State> stateList = listService.getStates(country);
            return objectMapperStream(stateList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setListService(ListsService listService) {
        this.listService = listService;
    }
    public ListsService getListService() {
        return listService;
    }
}
