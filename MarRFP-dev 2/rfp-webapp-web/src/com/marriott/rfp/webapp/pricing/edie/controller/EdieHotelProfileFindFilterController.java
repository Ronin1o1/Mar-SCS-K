package com.marriott.rfp.webapp.pricing.edie.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.FindFilterOption;
import com.marriott.rfp.webapp.common.controller.BaseFindFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security(value = {"MFPADMIN"})
@RestController
@RequestMapping("/ediehotelprofilefindfilter")
public class EdieHotelProfileFindFilterController extends BaseFindFilterController {

    private static final Logger log = LoggerFactory.getLogger(EdieHotelProfileFindFilterController.class);

    public EdieHotelProfileFindFilterController() {
        super();
    }

    @RequestMapping(value = "/getEdieHotelProfileFindFilter", method = GET)
    public String getEdieHotelProfileFindFilter() {
        Boolean bcanSearchDoubleFrame = true;
        List<FindFilterOption> findList = new Vector<FindFilterOption>(5);
        findList.add(new FindFilterOption("Marshacode", 1L));
        findList.add(new FindFilterOption("Name", 2L));
        findList.add(new FindFilterOption("City", 3L));
        findList.add(new FindFilterOption("State", 4L));
        findList.add(new FindFilterOption("Country", 5L));
        Map<String, Object> info = new HashMap<>();
        info.put("findList", findList);
        info.put("BcanScearchDoubleFrame", bcanSearchDoubleFrame);
        try {
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}
