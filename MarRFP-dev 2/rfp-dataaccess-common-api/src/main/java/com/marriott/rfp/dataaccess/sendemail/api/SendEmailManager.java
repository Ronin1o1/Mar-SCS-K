package com.marriott.rfp.dataaccess.sendemail.api;

import com.marriott.rfp.object.sendemail.SendEmail;


public interface SendEmailManager {
    public void sendEmail(SendEmail em) throws Exception;
}
