package com.marriott.rfp.webapp.pricing.registration.controller;

import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/projectcodes")
public class ProjectCodesController extends BaseController {

    public ProjectCodesController() {
        super();
    }

    @RequestMapping(value = "/download", method = GET)
    public ResponseEntity<byte[]> download(HttpServletResponse response) {
        String fileName = "Project_Codes.xlsx";
        String absoluteDiskPath = getContext().getServletContext().getRealPath("/Template");
        return super.download(fileName,absoluteDiskPath,response);

    }

}
