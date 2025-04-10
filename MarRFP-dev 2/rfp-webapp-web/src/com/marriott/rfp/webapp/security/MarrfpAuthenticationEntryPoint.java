package com.marriott.rfp.webapp.security;

import com.marriott.rfp.business.constants.api.ConstantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
@Component
public class MarrfpAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    private static final String ERROR_KEY = "Error : ";

    @Autowired
    private ConstantsService constantsService;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendRedirect(constantsService.getMarrFormsUrl());
    }
}
