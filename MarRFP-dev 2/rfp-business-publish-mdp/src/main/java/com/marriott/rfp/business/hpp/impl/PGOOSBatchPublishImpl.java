package com.marriott.rfp.business.hpp.impl;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jms.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.rfp.business.pgoos.api.PGOOSPublishService;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSBatchManager;
import com.marriott.rfp.object.pgoos.PGOOSBatchRecord;
import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.user.User;

public class PGOOSBatchPublishImpl implements MessageListener {

	private static final Logger logger = Logger.getLogger(PGOOSBatchPublishImpl.class.getName());

	@Autowired
	private PGOOSPublishService pgoosPublishService;

	@Autowired
	private PGOOSBatchManager pgoosBatchManager;

	public PGOOSBatchPublishImpl() {
	}

	public PGOOSBatchPublishImpl(PGOOSPublishService pgoosPublishService) {
		this.pgoosPublishService = pgoosPublishService;
	}

	public void onMessage(Message message) {

		logger.log(Level.INFO, "Received MarRFP batch JMS message");

		if (message instanceof TextMessage) {

			TextMessage text = (TextMessage) message;

			try {
				logger.log(Level.INFO, "Received MarRFP batch message for processing: " + text.getText());

				PGOOSBatchRecord record = PGOOSBatchRecord.fromDelimitedString(text.getText());
				logger.log(Level.INFO, "Parsed MarRFP batch JMS message successfully!");

				if (record != null) {
					User user = new User();
					user.setEid(record.getEid());
					boolean holdpublish = true;
					if (record.getTransactionType() == TransactionType.LIVE) {
						holdpublish = false;
					}
					try {
						pgoosPublishService.publishHotelAccount(record.getHotelId(), record.getAccountRecId(), record.getRpgms(), record.getBatchId(), user, holdpublish, record.getByPeriod(),
								record.getTransactionType());

						logger.log(Level.INFO,"Published MarRFP batch JMS message to HPP successfully!");
					} finally {
						pgoosBatchManager.deleteBatchRecord(record.getStageseq());
					}
					if (holdpublish) {
						logger.log(Level.INFO, "Check publish!");
						
						if (pgoosBatchManager.countBatchRecord(record.getBatchId(), record.getHotelId()).longValue() == 0) {
							logger.log(Level.INFO, "Publish " + record.getHotelId());
							pgoosPublishService.publishHotels(record.getBatchId(), record.getHotelId(), user);
							logger.log(Level.INFO, "Successfully Publish " + record.getHotelId());
						}
					}
				}
			}  catch (JMSException jmse) {
				logger.log(Level.SEVERE, jmse.getMessage());

			} catch (Exception ex) {
				logger.log(Level.SEVERE,"Failed publish");
				logger.log(Level.SEVERE, ex.getMessage());
			}
		}
	}

}
