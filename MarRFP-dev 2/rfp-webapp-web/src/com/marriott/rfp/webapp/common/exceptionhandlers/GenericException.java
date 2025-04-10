package com.marriott.rfp.webapp.common.exceptionhandlers;

public class GenericException extends RuntimeException{


    public GenericException(String msg){
        super(msg);

    }

    public GenericException(String message,Throwable ex){
        super(message,ex);
    }
}
