package com.marriott.rfp.business.hpp.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.namespace.QName;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;

public class HPPSoapHandler implements SOAPHandler<SOAPMessageContext> {
	private static final Logger logger = Logger.getLogger(HPPSoapHandler.class.getName());

	@Override
	public boolean handleMessage(SOAPMessageContext context) {

		SOAPMessage soapmsg = context.getMessage();
		if (soapmsg != null) {
			Boolean outbound = (Boolean) context.get(MessageContext.MESSAGE_OUTBOUND_PROPERTY);
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				soapmsg.writeTo(out);
			} catch (SOAPException e) {

			} catch (IOException e) {

			}
			String strMsg = new String(out.toByteArray());

			String outmsg = "";
			if (outbound)
				outmsg += "Outbound: " + strMsg;
			else
				outmsg += "Inbound: " + strMsg;
			logger.log(Level.INFO, outmsg);
		}

		return true;
	}

	@Override
	public boolean handleFault(SOAPMessageContext context) {
		SOAPMessage soapmsg = context.getMessage();
		if (soapmsg != null) {
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				soapmsg.writeTo(out);
			} catch (SOAPException e) {

			} catch (IOException e) {

			}
			String strMsg = new String(out.toByteArray());

			logger.log(Level.INFO, "Fault: " + strMsg);
		}
		return true;
	}

	@Override
	public void close(MessageContext context) {

	}

	@Override
	public Set<QName> getHeaders() {

		return null;
	}

}
