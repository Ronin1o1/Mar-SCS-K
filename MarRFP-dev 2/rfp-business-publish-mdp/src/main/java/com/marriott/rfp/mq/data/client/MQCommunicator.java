package com.marriott.rfp.mq.data.client;

import com.ibm.jms.JMSTextMessage;
import com.ibm.mq.jms.MQQueue;
import com.ibm.mq.jms.MQQueueConnection;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import com.ibm.mq.jms.MQQueueSender;
import com.ibm.mq.jms.MQQueueSession;
import com.marriott.rfp.mq.data.client.common.MQConnectionBean;
import com.marriott.rfp.mq.data.client.common.RFPMQException;
import javax.jms.JMSException;
import org.apache.log4j.Logger;

public class MQCommunicator {

	private static final Logger LOGGER = Logger.getLogger(MQCommunicator.class.getName());
	  
	  public String postToMQ(String queueName, Object msg, Long timeToLive, MQConnectionBean mqConnection)
	    throws RFPMQException
	  {
	    MQQueueConnection queueConnection = null;
	    MQQueueSession queueSession = null;
	    MQQueueSender queueSender = null;
	    String messageID = null;
	    try
	    {
	      MQQueueConnectionFactory cf = new MQQueueConnectionFactory();
	      
	      cf.setHostName(mqConnection.getStrHost());
	      cf.setPort(mqConnection.getPort().intValue());
	      cf.setTransportType(1);
	      cf.setQueueManager(mqConnection.getQueueManager());
	      cf.setChannel(mqConnection.getStrChannel());
	      
	      String msgToSend = (String)msg;
	      
	      queueConnection = (MQQueueConnection)cf.createQueueConnection();
	      queueSession = (MQQueueSession)queueConnection.createQueueSession(false, 1);
	      MQQueue queue = (MQQueue)queueSession.createQueue(queueName);
	      queueSender = (MQQueueSender)queueSession.createSender(queue);
	      
	      JMSTextMessage message = (JMSTextMessage)queueSession.createTextMessage(msgToSend);
	      
	      queueConnection.start();
	      
	      queueSender.setTimeToLive(timeToLive.longValue());
	      queueSender.send(message);
	      LOGGER.info("Message to Queue sent: " + message);
	      messageID = message.getJMSMessageID();
	      LOGGER.info("Sent message to the queue. JMSMessageID = '" + messageID + "' JMSExpiration = " + queueSender.getTimeToLive());
	      
	      queueSender.close();
	      queueSession.close();
	      queueConnection.close();
	      
	      return messageID;
	    }
	    catch (JMSException jmsex)
	    {
	      LOGGER.error(" Error during posting message to MQ : " + jmsex.getMessage());
	    }
	    finally
	    {
	      try
	      {
	        if (queueSender != null) {
	          queueSender.close();
	        }
	        if (queueSession != null) {
	          queueSession.close();
	        }
	        if (queueConnection != null) {
	          queueConnection.close();
	        }
	      }
	      catch (JMSException jmsex)
	      {
	        LOGGER.error(" Error during sending message to MQ : ", jmsex);
	      }
	    }
	    return null;
	  }
}
