package com.marriott.rfp.webapp.common.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.UsersDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
@RestController
@RequestMapping("/user")
public class UsersDetailsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(UsersDetailsController.class);
    @RequestMapping(value = "/getUserDetails", method = GET)
    public UsersDetails getUserDetails() throws JsonProcessingException {
        try {
            UsersDetails usersDetails=new UsersDetails();
            usersDetails.setUser(getUserProperties());
            return usersDetails;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }
}
