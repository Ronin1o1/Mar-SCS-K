package com.marriott.rfp.business.pgoos.pricing.impl;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import com.marriott.rfp.business.pgoos.pricing.api.PGOOSBatchStagingService;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSBatchManager;
import com.marriott.rfp.object.pgoos.PGOOSBatchRecord;
import com.marriott.rfp.utility.ConfigurationUtility;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;

@Service
@Transactional("transactionManagerRfpCommon")
public class PGOOSBatchStagingServiceImpl implements PGOOSBatchStagingService {

	private static final Logger logger = Logger.getLogger(PGOOSBatchStagingServiceImpl.class.getName());

	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private Destination marRfpBatchQ;

	@Autowired
	private MQQueueConnectionFactory ibmMQConnectionFactory;

	@Autowired
	private PGOOSBatchManager pgoosBatchManager;

	public PGOOSBatchStagingServiceImpl() {
	}

	public PGOOSBatchStagingServiceImpl(PGOOSBatchManager pgoosBatchManager) {
		this.pgoosBatchManager = pgoosBatchManager;
	}

	public PGOOSBatchManager getPgoosBatchManager() {
		return pgoosBatchManager;
	}

	public void setPgoosBatchManager(PGOOSBatchManager pgoosBatchManager) {
		this.pgoosBatchManager = pgoosBatchManager;
	}

	// @Transactional(propagation=Propagation.REQUIRES_NEW)
	public void executeQueueForBatch(Long batchid, Long count, String eid) {
		List<PGOOSBatchRecord> records = pgoosBatchManager.getBatchRecords(batchid, count);
		//SWIRM-1617-Throttling changes
		ConfigurationUtility.delay(false);
		for (PGOOSBatchRecord record : records) {

			// Publish it
			sendMessage(record.toDelimitedString());
			pgoosBatchManager.updateBatchRecord(record.getStageseq());
		}
	}

	private void sendMessage(String record) {

		try {

			logger.log(Level.INFO, "Staging For PGOOS Batch: " + record);
			//logger.log(Level.INFO, "ibmMQConnectionFactory: " + ibmMQConnectionFactory);
			logger.log(Level.INFO, "jmsTemplate: " + jmsTemplate);
			jmsTemplate.send(marRfpBatchQ, new MessageCreator() {
				public Message createMessage(Session session) throws JMSException {
					TextMessage message = session.createTextMessage(record);
					return message;
				}
			});
			logger.log(Level.INFO, "Staging For PGOOS Batch record sent");

		} catch (Exception e) {
			logger.log(Level.SEVERE, e.getMessage());

		} finally {

		}
		logger.log(Level.INFO, "Done batch stage send message");
	}
}
