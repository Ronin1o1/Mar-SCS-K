package com.marriott.rfp.dataaccess.sendemail.impl;

import java.util.List;
import java.util.Properties;
import java.util.Vector;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.annotation.Resource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.sendemail.api.SendEmailManager;
import com.marriott.rfp.object.sendemail.SendEmail;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service 
public class SendEmailManagerImpl implements SendEmailManager {

	private static final Logger log = LoggerFactory.getLogger(SendEmailManagerImpl.class);
	@Autowired
	Session mailSession; // inject a Mail Session 
	
    /**
     * Default constructor.
     */
    public SendEmailManagerImpl() {
    	
    }

    public void sendEmail(SendEmail em) throws Exception {
    	
	if (em.getTo() == null || em.getTo().size() == 0 || em.getHtmlTextMessage() == null || em.getHtmlTextMessage().equals(""))
	    return;

	List<InternetAddress> toAddress = new Vector<InternetAddress>();

	for (int i = 0; i < em.getTo().size(); i++)
	    toAddress.add(new InternetAddress((String) em.getTo().get(i)));
	InternetAddress[] toAddresses;
	toAddresses = (InternetAddress[]) toAddress.toArray(new InternetAddress[toAddress.size()]);

	List<InternetAddress> ccAddress = null;
	InternetAddress[] ccAddresses = null;
	if (em.getCc() != null && em.getCc().size() != 0) {
	    ccAddress = new Vector<InternetAddress>();
	    for (int i = 0; i < em.getCc().size(); i++)
		ccAddress.add(new InternetAddress((String) em.getCc().get(i)));
	    ccAddresses = (InternetAddress[]) ccAddress.toArray(new InternetAddress[ccAddress.size()]);
	}
	MimeMessage message = new MimeMessage(mailSession);
	message.setFrom(new InternetAddress(em.getFrom()));
	message.setRecipients(Message.RecipientType.TO, toAddresses);
	if (em.getCc() != null && em.getCc().size() != 0)
	    message.setRecipients(Message.RecipientType.CC, ccAddresses);
	if (em.getBcc() != null && !em.getBcc().equals(""))
	    message.setRecipient(Message.RecipientType.BCC, new InternetAddress(em.getBcc()));

	message.setSubject(em.getSubject(), "UTF-8");

	Multipart multipart = new MimeMultipart("alternative");

	BodyPart plainMessageBodyPart = new MimeBodyPart();
	plainMessageBodyPart.setContent(em.getPlainTextMessage(), "text/plain;charset=UTF-8");
	multipart.addBodyPart(plainMessageBodyPart);

	BodyPart htmlMessageBodyPart = new MimeBodyPart();
	htmlMessageBodyPart.setContent(em.getHtmlTextMessage(), "text/html;charset=UTF-8");
	multipart.addBodyPart(htmlMessageBodyPart);

	if (em.getMyFile() != null) {
		BodyPart attachPart = new MimeBodyPart();
		try {
			DataSource dataSource = new ByteArrayDataSource(em.getMyFile(),"text/html;charset=UTF-8");
		    attachPart.setDataHandler(new DataHandler(dataSource));
			attachPart.setFileName(em.getFileName());
		    multipart.addBodyPart(attachPart);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return;
		}
	}
	
	message.setContent(multipart);
	if (em.getHighimportance())
	    message.setHeader("Importance", "High");
	//Adding below print statements to monitor the values passed for Email in logs
	//DO NOT DELETE THESE PRINT STATEMENTS
		log.info("*************Send Email*************");
		log.info("Email Subject------>"+message.getSubject());
		log.info("Email From------>"+message.getFrom());
		log.info("Email All Recipients------>"+message.getAllRecipients());
	if(em.getTo() != null){
		for(int i=0; i<em.getTo().size(); i++){
			log.info("Em Get To---"+i+"--->"+em.getTo().get(i));
		}
	}
	if(em.getCc() != null){
		for(int i=0; i<em.getCc().size(); i++){
			log.info("Em Get Cc---"+i+"--->"+em.getCc().get(i));
		}
	}
	log.info("Em Get Bcc--->"+em.getBcc());
	Transport.send(message);

    }

}
