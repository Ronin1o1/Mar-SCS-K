package com.marriott.marrfp.batch.core;

import java.util.List;
import java.util.Vector;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.marriott.marrfp.batch.core.SendEmail;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service 


public class SendEmailManagerImpl {

	private static final Logger log = LoggerFactory.getLogger(SendEmailManagerImpl.class);

	@Resource(name="marrfpMailSession",
	    mappedName="mail/marrfpMailSession", type=javax.mail.Session.class) 
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

	for (int i = 0; i < em.getTo().size(); i++) {
	    try {
	    	toAddress.add(new InternetAddress((String) em.getTo().get(i)));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	}
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
			DataSource dataSource = new FileDataSource(em.getMyFile().toString());
		    attachPart.setDataHandler(new DataHandler(dataSource));
		    attachPart.setFileName(em.getFileName());
		    multipart.addBodyPart(attachPart);
		} catch (Exception e) {
			return;
		}
	}
	
	message.setContent(multipart);
	if (em.getHighimportance())
	    message.setHeader("Importance", "High");
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
	Transport.send(message);

    }

}
