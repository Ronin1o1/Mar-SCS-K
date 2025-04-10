package com.marriott.rfp.webapp.common.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.marriott.rfp.common.util.ConfigurationUtil;
import com.marriott.rfp.object.user.User;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.io.File;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;

public class BaseController {

    public static final String SUCCESS = "success";
    public static final String AUTHENTICATION_FAILED = "error";
    public static final String AUTHORIZATION_FAILED = "error";
    public static final String SESSION_NOT_FOUND = "success";
    public static final String FATAL_ERROR = "error";
    public static final String RESOURCE_NOT_FOUND_ERROR = "success";
    public static final String REDIRECT = "redirect";
    public static final String DATE_FORMAT = "MM/dd/yyyy";
    public static final String ERROR = "error";

    private Gson gson;
    private GsonBuilder gsonBuilder;

    @Autowired
    public HttpServletRequest request;
    @Autowired
    public HttpServletResponse response;

    private static final Logger log = LoggerFactory.getLogger(BaseController.class);

    public BaseController() {
        super();
    }

    public String getUsername() {

        return ((User) request.getAttribute("userproperties")).getEid();
    }

    public void setUsername(String username) {

    }

    public String getUserFullname() {
        return ((User) request.getAttribute("userproperties")).getFullName();
    }

    public void setUserProperties(User userProperties) {
        request.setAttribute("userproperties", userProperties);
    }

    public User getUserProperties() {
        return (User) request.getAttribute("userproperties");
    }

    public String getRfpjunction() {
        String junctionname = "/" + ConfigurationUtil.getProperty("jspJunction");
        if (junctionname.equals("/"))
            junctionname = "";
        return junctionname;
    }


    public String getMarrFormsUrl() {
        return ((User) request.getAttribute("userproperties")).getMarrformsUrl();
    }

    protected GsonBuilder getGsonBuilder() {
        if (gsonBuilder == null) {
            gsonBuilder = new GsonBuilder();
        }
        return gsonBuilder;
    }

    protected Gson getGson() {
        if (gson == null) {
            gson = getGsonBuilder().serializeNulls().setDateFormat(DATE_FORMAT).create();
        }
        return gson;
    }

    protected <T> T fromJson(String json, Type collectionType) {
        T target = null;
        if (StringUtils.isNotEmpty(json))
            target = getGson().fromJson(json, collectionType);
        return target;
    }

    protected <T> T fromJson(Gson gson, String json, Type collectionType) {
        T target = null;
        if (StringUtils.isNotEmpty(json))
            target = gson.fromJson(json, collectionType);
        return target;
    }

    protected String objectMapperStream(Object value) throws JsonProcessingException {
        String json = new ObjectMapper().writeValueAsString(value);
        return json;
    }

    public String gsonStream(Object src) {
        String json = getGson().toJson(src);
        return json;
    }

    public ResponseEntity<byte[]> download(String fileName, String absoluteDiskPath, HttpServletResponse response) {
        try {
            File file = new File(absoluteDiskPath, fileName);
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
            byte[] bytes = Files.readAllBytes(Paths.get(file.getAbsolutePath()));
            return new ResponseEntity<byte[]>(bytes, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error while downloading the file", e);
            throw new GenericException(e.getMessage(), e);
        }

    }


    public WebApplicationContext getContext() {
        return ContextLoader.getCurrentWebApplicationContext();
    }

    public HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    public ByteArrayInputStream convertMultiPartToByteArray(MultipartFile file) throws IOException {
        ByteArrayInputStream byteArrayOutputStream = new ByteArrayInputStream(file.getBytes());
        return byteArrayOutputStream;
    }

    protected String getMethod() {
        return getRequest().getMethod();
    }
}
