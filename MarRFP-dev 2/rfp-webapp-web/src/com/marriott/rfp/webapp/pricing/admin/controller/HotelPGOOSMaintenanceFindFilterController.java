package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.object.pricing.filterLists.FindFilterOption;
import com.marriott.rfp.webapp.common.controller.BaseFindFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelpgoosmaintfindfilter")
public class HotelPGOOSMaintenanceFindFilterController extends BaseFindFilterController {
    private static final Logger log = LoggerFactory.getLogger(HotelPGOOSMaintenanceFindFilterController.class);
    public HotelPGOOSMaintenanceFindFilterController() {
        super();
    }

    @RequestMapping(value = "/getHotelPGOOSFindFilter", method = GET)
    public String getHotelPGOOSFindFilter() {
        List<FindFilterOption> findList = new Vector<FindFilterOption>(4);
        findList.add(new FindFilterOption("Marshacode", 0L));
        findList.add(new FindFilterOption("City", 6L));
        findList.add(new FindFilterOption("State", 7L));
        findList.add(new FindFilterOption("Country", 8L));
        try {
            return objectMapperStream(findList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
