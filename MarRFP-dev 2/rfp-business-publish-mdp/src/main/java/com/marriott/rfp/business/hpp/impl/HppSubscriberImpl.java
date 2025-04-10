package com.marriott.rfp.business.hpp.impl;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jms.*;
import javax.xml.bind.JAXBException;

import javax.xml.parsers.ParserConfigurationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.xml.sax.SAXException;

import com.marriott.rfp.business.hpp.impl.util.PGOOSUtils;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSBatchManager;
import com.marriott.rfp.object.pgoos.PublishResponse;


public class HppSubscriberImpl implements MessageListener {

	private static final Logger logger = Logger.getLogger(HppSubscriberImpl.class.getName());

	@Autowired
	private PGOOSBatchManager pgoosBatchManager;


	public HppSubscriberImpl() {
	}

	public HppSubscriberImpl(PGOOSBatchManager pgoosBatchManager) {
		this.pgoosBatchManager = pgoosBatchManager;
	}

	public void onMessage(Message message) {

		logger.log(Level.INFO, "Received JMS message from HPP");

		if (message instanceof TextMessage) {

			TextMessage text = (TextMessage) message;

			try {

				logger.log(Level.INFO, "Received JMS TextMessage from HPP:\n" + text.getText());
				
				List<PublishResponse> response = PGOOSUtils.parseHppResponse(text.getText());

				logger.log(Level.INFO, "Parsed message successfully!");

				pgoosBatchManager.savePublishResponseDetails(response);

				logger.log(Level.INFO, "Saved message to MarRFP database successfully!");

			} catch (JMSException e) {
				logger.log(Level.SEVERE, e.getMessage());
			} catch (JAXBException jaxbe) {
				logger.log(Level.SEVERE, jaxbe.getMessage());
			} catch (ParserConfigurationException e) {
				logger.log(Level.SEVERE, e.getMessage());
            } catch (SAXException e) {
            	logger.log(Level.SEVERE, e.getMessage());
			}
		}
	}
}
