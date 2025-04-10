package com.marriott.rfp.mq.data.client;

import com.marriott.rfp.mq.data.client.common.RFPMQException;
import javax.jms.JMSException;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSender;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class RFPMessageQueueClient {

	private static final Log LOGGER = LogFactory.getLog(RFPMessageQueueClient.class);
	  
	  public String sendMessageToQueue(String qcfJndi, String queueJndi, Object msg, Long timeToLive)
	    throws RFPMQException
	  {
	    QueueSession qSession = null;
	    QueueConnection quConn = null;
	    String messageID = "";
	    try
	    {
	      InitialContext context = new InitialContext();
	      String jndiNameString = qcfJndi;
	      QueueConnectionFactory qConnectionFactory = (QueueConnectionFactory)context.lookup(jndiNameString);
	      jndiNameString = queueJndi;
	      Queue queue = (Queue)context.lookup(jndiNameString);
	      quConn = qConnectionFactory.createQueueConnection();
	      qSession = quConn.createQueueSession(false, 1);
	      QueueSender sender = qSession.createSender(queue);
	      TextMessage message = qSession.createTextMessage();
	      String msgToSend = (String)msg;
	      message.setText(msgToSend);
	      sender.setTimeToLive(timeToLive.longValue());
	      sender.send(message);
	      messageID = message.getJMSMessageID();
	      LOGGER.info("Sent message to the queue. JMSMessageID = '" + messageID + "' JMSExpiration = " + sender.getTimeToLive());
	      if (qSession != null) {
	        try
	        {
	          qSession.close();
	        }
	        catch (JMSException je)
	        {
	          LOGGER.error("Exception in establishing the queue session", je); throw 
	            new RFPMQException("Exception in establishing the queue session", je, "10009");
	        }
	      }
	      if (quConn != null) {
	        try
	        {
	          quConn.close();
	        }
	        catch (JMSException je)
	        {
	          LOGGER.error("Exception in establishing the queue connection", je); throw 
	            new RFPMQException("Exception in establishing the queue connection", je, "10009");
	        }
	      }
	      if (!messageID.isEmpty()) {
	    	  return messageID;
	      }
	    }
	    catch (Exception exp)
	    {
	      LOGGER.error("Exception in sending message to Queue", exp);
	      throw new RFPMQException("Exception in sending message to Queue", exp, "10009");
	    }
	    finally
	    {
	      if (qSession != null) {
	        try
	        {
	          qSession.close();
	        }
	        catch (JMSException je)
	        {
	          LOGGER.error("Exception in establishing the queue session", je);
	          throw new RFPMQException("Exception in establishing the queue session", je, "10009");
	        }
	      }
	      if (quConn != null) {
	        try
	        {
	          quConn.close();
	        }
	        catch (JMSException je)
	        {
	          LOGGER.error("Exception in establishing the queue connection", je);
	          throw new RFPMQException("Exception in establishing the queue connection", je, "10009");
	        }
	      }
	    }
	    LOGGER.debug("Unable to get the JMS MessageID for the current transaction");
	    throw new RFPMQException("Unable to get the JMS MessageID for the current transaction", "10009");
	  }
}
