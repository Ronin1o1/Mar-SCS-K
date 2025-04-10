package com.marriott.rfp.dataaccess.userregistration.impl;

import javax.jms.JMSException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.xml.bind.JAXBException;

import java.util.logging.Level;

import javax.jms.Destination;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Message;


import com.marriott.rfp.mq.data.client.MQCommunicator;
import com.marriott.rfp.mq.data.client.common.MQConnectionBean;


public class RequestCenterResponseUtil {

	private static final Logger log = LoggerFactory.getLogger(RequestCenterResponseUtil.class);

	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private Destination requestCenterInboundQ;
	
    private static final String XML_HEADER = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    private static final String HEADER = "<batchResponse xmlns=\"urn:oasis:names:tc:DSML:2:0:core\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
    private static final String FOOTER = "</modifyResponse></batchResponse>";
   

    public void sendRCResponse(String reqId, boolean status, String errorMessage) throws NamingException, JMSException, JAXBException {

	String responseXML = "";
	try {
	    responseXML = constructXML(reqId, status, errorMessage);
	} catch (Exception e) {
	    throw new RuntimeException("Request Center - Exception while Constructing Request Center response" + e.getLocalizedMessage());
	}
	log.info("Request Center - Response: " + responseXML);

	// Submit to Request center.
	try {
			log.info("jmsTemplate : " + jmsTemplate + " " + "RCInbound Queue : " + requestCenterInboundQ);
			jmsTemplate.send(requestCenterInboundQ ,new MessageCreator() {
			public Message createMessage(Session session) throws JMSException {
				log.info("Session : " + session);
				TextMessage message = session.createTextMessage(constructXML(reqId, status, errorMessage));
				log.info(message.toString());
				return message;
			}
		});	
		
		
	    log.info("Request Center - Response sent: " + responseXML);
	} catch (Exception e) {
		log.info("Request Center - Response exception ");
		log.error(e.getMessage(),e);
	    throw new RuntimeException("Request Center - Exception while sending jms message" + e.getLocalizedMessage());
	}
    }

    private static String constructXML(String reqId, boolean success, String errorMessage) {
	String MODIFY_RESPONSE = "<modifyResponse matchedDN=\"cn=appro109,ou=people,dc=marriott,dc=com\" requestID=\"" + reqId + "\">";
	String RESULT_CODE = "";
	if (success) {
	    RESULT_CODE = RESULT_CODE + "<resultCode code=\"0\" descr=\"success\"/>";
	} else {
	    RESULT_CODE = RESULT_CODE + "<resultCode code=\"99\" descr=\"failed\"/>";
	    RESULT_CODE = RESULT_CODE + "<errorMessage>" + errorMessage + "</errorMessage>";
	}
	String finalString = XML_HEADER + HEADER + MODIFY_RESPONSE + RESULT_CODE + FOOTER;

	return finalString;
    }

}
