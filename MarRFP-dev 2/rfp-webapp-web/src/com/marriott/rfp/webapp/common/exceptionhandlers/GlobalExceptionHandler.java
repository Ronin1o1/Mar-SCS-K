package com.marriott.rfp.webapp.common.exceptionhandlers;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(GenericException.class)
    @ResponseBody
    public String handleGenericException(GenericException e){
       return e.getMessage();
    }
}
