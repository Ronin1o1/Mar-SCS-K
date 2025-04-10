package com.marriott.rfp.dataaccess.userregistration.impl;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import org.apache.axis.components.logger.LogFactory;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.dataaccess.userregistration.api.UserRegistrationManager;

/**
 * Message-Driven Bean implementation class for: RequestCenterMDB
 * 
 **/
public class RequestCenterMDB implements MessageListener {
    protected static Log log = LogFactory.getLog(RequestCenterMDB.class.getName());

    @Autowired
    UserRegistrationManager userRegistrationMgr;

    @Transactional(propagation=Propagation.NOT_SUPPORTED)
    public void onMessage(Message message) {
	String text;
	try {
	    text = ((TextMessage) message).getText();
	    userRegistrationMgr.processUserRegistrationMessage(text);
	} catch (JMSException e) {
	    log.error("Request Center - Error reading the XML message from Q", e);
	    throw new RuntimeException("Request Center - Error reading XML message from Q" + e.getLocalizedMessage());  
	} catch (Exception e) {
	    throw new RuntimeException("Request Center - Failed to process Request center JMS message)=" + message, e); 
	}
    }
    

}
