/*
 * Copyright 2001-2004 The Apache Software Foundation.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.marriott.rfp.dataaccess.rd.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;

import javax.xml.soap.MimeHeader;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPException;

import org.apache.axis.AxisFault;
import org.apache.axis.Constants;
import org.apache.axis.Message;
import org.apache.axis.MessageContext;
import org.apache.axis.components.logger.LogFactory;
import org.apache.axis.components.net.BooleanHolder;
import org.apache.axis.encoding.Base64;
import org.apache.axis.handlers.BasicHandler;
import org.apache.axis.soap.SOAP12Constants;
import org.apache.axis.soap.SOAPConstants;
import org.apache.axis.transport.http.ChunkedInputStream;
import org.apache.axis.transport.http.ChunkedOutputStream;
import org.apache.axis.transport.http.HTTPConstants;
import org.apache.axis.utils.Messages;
import org.apache.axis.utils.TeeOutputStream;
import org.apache.commons.logging.Log;

/**
 * This is meant to be used on a SOAP Client to call a SOAP server.
 *
 * @author Doug Davis (dug@us.ibm.com)
 * @author Davanum Srinivas (dims@yahoo.com)
 */
@SuppressWarnings({ "unused", "serial" })
public class HTTPSender extends BasicHandler {

	protected static Log log = LogFactory.getLog(HTTPSender.class.getName());

		private static final String ACCEPT_HEADERS = HTTPConstants.HEADER_ACCEPT + //Limit to the types that are meaningful to us.
		": "
			+ HTTPConstants.HEADER_ACCEPT_APPL_SOAP
			+ ", "
			+ HTTPConstants.HEADER_ACCEPT_APPLICATION_DIME
			+ ", "
			+ HTTPConstants.HEADER_ACCEPT_MULTIPART_RELATED
			+ ", "
			+ HTTPConstants.HEADER_ACCEPT_TEXT_ALL
			+ "\r\n"
			+ HTTPConstants.HEADER_USER_AGENT
	+ //Tell who we are.
	": " + Messages.getMessage("axisUserAgent") + "\r\n";

		private static final String CACHE_HEADERS = HTTPConstants.HEADER_CACHE_CONTROL + //Stop caching proxies from caching SOAP reqeuest.
	": " + HTTPConstants.HEADER_CACHE_CONTROL_NOCACHE + "\r\n" + HTTPConstants.HEADER_PRAGMA + ": " + HTTPConstants.HEADER_CACHE_CONTROL_NOCACHE + "\r\n";

	private static final String CHUNKED_HEADER = HTTPConstants.HEADER_TRANSFER_ENCODING + ": " + HTTPConstants.HEADER_TRANSFER_ENCODING_CHUNKED + "\r\n";

	private static final String HEADER_CONTENT_TYPE_LC = HTTPConstants.HEADER_CONTENT_TYPE.toLowerCase();

	private static final String HEADER_LOCATION_LC = HTTPConstants.HEADER_LOCATION.toLowerCase();

	private static final String HEADER_CONTENT_LOCATION_LC = HTTPConstants.HEADER_CONTENT_LOCATION.toLowerCase();

	private static final String HEADER_CONTENT_LENGTH_LC = HTTPConstants.HEADER_CONTENT_LENGTH.toLowerCase();

	private static final String HEADER_TRANSFER_ENCODING_LC = HTTPConstants.HEADER_TRANSFER_ENCODING.toLowerCase();

	/**
	 * the url; used for error reporting
	 */
	URL targetURL;

	/**
	 * invoke creates a socket connection, sends the request SOAP message and then
	 * reads the response SOAP message back from the SOAP server
	 *
	 * @param msgContext the messsage context
	 *
	 * @throws AxisFault
	 */
	@SuppressWarnings("rawtypes")
	public void invoke(MessageContext msgContext) throws AxisFault {

		if (log.isDebugEnabled()) {
			log.debug(Messages.getMessage("enter00", "HTTPSender::invoke"));
		}

		HttpURLConnection conn = null;
		try {
			BooleanHolder useFullURL = new BooleanHolder(false);
			Hashtable otherHeaders = new Hashtable();
			targetURL = new URL(msgContext.getStrProp(MessageContext.TRANS_URL));
			String host = targetURL.getHost();
			int port = targetURL.getPort();

			conn = (HttpURLConnection) targetURL.openConnection();
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			conn.setAllowUserInteraction(true);

			// Send the SOAP request to the server
			InputStream inp = writeToURLConnection(conn, msgContext, targetURL, otherHeaders, host, port, msgContext.getTimeout(), useFullURL);
			// Send the SOAP request to the server
			//      InputStream inp = writeToSocket(socketHolder, msgContext, targetURL,          otherHeaders, host, port, msgContext.getTimeout(), useFullURL);

			// Read the response back from the server
			Hashtable headers = new Hashtable();
			inp = readHeadersFromURLConnection(conn, msgContext, inp, headers);
			readFromURLConnection(conn, msgContext, inp, headers);
		} catch (Exception e) {
			log.debug(e);
			try {
				if (conn != null) {
					conn.disconnect();
				}
			} catch (Exception ie) {
				// we shouldn't get here.
			}
			throw AxisFault.makeFault(e);
		}
		if (log.isDebugEnabled()) {
			log.debug(Messages.getMessage("exit00", "HTTPDispatchHandler::invoke"));
		}
	}

	/**
	 * Send the soap request message to the server
	 *
	 * @param msgContext message context
	 * @param tmpURL url to connect to
	 * @param otherHeaders other headers if any
	 * @param host host name
	 * @param port port
	 * @param useFullURL flag to indicate if the whole url needs to be sent
	 *
	 * @throws IOException
	 */

	/**
	 * Send the soap request message to the server
	 *
	 * @param msgContext message context
	 * @param tmpURL url to connect to
	 * @param otherHeaders other headers if any
	 * @param host host name
	 * @param port port
	 * @param useFullURL flag to indicate if the whole url needs to be sent
	 *
	 * @throws IOException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private InputStream writeToURLConnection(HttpURLConnection conn, MessageContext msgContext, URL tmpURL, Hashtable otherHeaders, String host, int port, int timeout, BooleanHolder useFullURL)
		throws Exception {

		String userID = msgContext.getUsername();
		String passwd = msgContext.getPassword();

		// Get SOAPAction, default to ""
		String action = msgContext.useSOAPAction() ? msgContext.getSOAPActionURI() : "";

		if (action == null) {
			action = "";
		}

		// if UserID is not part of the context, but is in the URL, use
		// the one in the URL.
		if ((userID == null) && (tmpURL.getUserInfo() != null)) {
			String info = tmpURL.getUserInfo();
			int sep = info.indexOf(':');

			if ((sep >= 0) && (sep + 1 < info.length())) {
				userID = info.substring(0, sep);
				passwd = info.substring(sep + 1);
			} else {
				userID = info;
			}
		}
		if (userID != null) {
			StringBuffer tmpBuf = new StringBuffer();

			tmpBuf.append(userID).append(":").append((passwd == null) ? "" : passwd);
			otherHeaders.put(HTTPConstants.HEADER_AUTHORIZATION, "Basic " + Base64.encode(tmpBuf.toString().getBytes()));
		}

		// don't forget the cookies!
		// mmm... cookies
		if (msgContext.getMaintainSession()) {
			String cookie = msgContext.getStrProp(HTTPConstants.HEADER_COOKIE);
			String cookie2 = msgContext.getStrProp(HTTPConstants.HEADER_COOKIE2);

			if (cookie != null) {
				otherHeaders.put(HTTPConstants.HEADER_COOKIE, cookie);
			}
			if (cookie2 != null) {
				otherHeaders.put(HTTPConstants.HEADER_COOKIE2, cookie2);
			}
		}

//		StringBuffer header2 = new StringBuffer();

		String webMethod = null;
		boolean posting = true;
		
		// If we're SOAP 1.2, allow the web method to be set from the
		// MessageContext.
		if (msgContext.getSOAPConstants() == SOAPConstants.SOAP12_CONSTANTS) {
			webMethod = msgContext.getStrProp(SOAP12Constants.PROP_WEBMETHOD);
		}
		if (webMethod == null) {
			webMethod = HTTPConstants.HEADER_POST;
		} else {
			posting = webMethod.equals(HTTPConstants.HEADER_POST);
		}

		conn.setRequestMethod(webMethod);

		Message reqMessage = msgContext.getRequestMessage();

		boolean http10 = true; //True if this is to use HTTP 1.0 / false HTTP 1.1
		boolean httpChunkStream = false; //Use HTTP chunking or not.
		boolean httpContinueExpected = false; //Under HTTP 1.1 if false you *MAY* need to wait for a 100 rc,
		//  if true the server MUST reply with 100 continue.
		String httpConnection = null;

		String httpver = msgContext.getStrProp(MessageContext.HTTP_TRANSPORT_VERSION);
		if (null == httpver) {
			httpver = HTTPConstants.HEADER_PROTOCOL_V10;
		}
		httpver = httpver.trim();
		if (httpver.equals(HTTPConstants.HEADER_PROTOCOL_V11)) {
			http10 = false;
		}

		//process user defined headers for information.
		Hashtable userHeaderTable = (Hashtable) msgContext.getProperty(HTTPConstants.REQUEST_HEADERS);

		if (userHeaderTable != null) {
			if (null == otherHeaders) {
				otherHeaders = new Hashtable();
			}

			for (java.util.Iterator e = userHeaderTable.entrySet().iterator(); e.hasNext();) {

				java.util.Map.Entry me = (java.util.Map.Entry) e.next();
				Object keyObj = me.getKey();
				if (null == keyObj)
					continue;
				String key = keyObj.toString().trim();

				if (key.equalsIgnoreCase(HTTPConstants.HEADER_TRANSFER_ENCODING)) {
					if (!http10) {
						String val = me.getValue().toString();
						if (null != val && val.trim().equalsIgnoreCase(HTTPConstants.HEADER_TRANSFER_ENCODING_CHUNKED))
							httpChunkStream = true;
					}
				} else if (key.equalsIgnoreCase(HTTPConstants.HEADER_CONNECTION)) {
					if (!http10) {
						String val = me.getValue().toString();
						if (val.trim().equalsIgnoreCase(HTTPConstants.HEADER_CONNECTION_CLOSE))
							httpConnection = HTTPConstants.HEADER_CONNECTION_CLOSE;
					}
					//HTTP 1.0 will always close.
					//HTTP 1.1 will use persistent. //no need to specify
				} else {
					if (!http10 && key.equalsIgnoreCase(HTTPConstants.HEADER_EXPECT)) {
						String val = me.getValue().toString();
						if (null != val && val.trim().equalsIgnoreCase(HTTPConstants.HEADER_EXPECT_100_Continue))
							httpContinueExpected = true;
					}

					otherHeaders.put(key, me.getValue());
				}
			}
		}

		if (!http10) {
			//Force close for now.

			httpConnection = HTTPConstants.HEADER_CONNECTION_CLOSE;
		}


		otherHeaders.put(http10 ? HTTPConstants.HEADER_PROTOCOL_10 : HTTPConstants.HEADER_PROTOCOL_11,"");
		MimeHeaders mimeHeaders = reqMessage.getMimeHeaders();

		if (posting) {
			String contentType;
			final String[] header = mimeHeaders.getHeader(HTTPConstants.HEADER_CONTENT_TYPE);
			if (header != null && header.length > 0) {
				contentType = mimeHeaders.getHeader(HTTPConstants.HEADER_CONTENT_TYPE)[0];
			} else {
				contentType = reqMessage.getContentType(msgContext.getSOAPConstants());
			}

			//fix for AXIS-2027
			if (contentType == null || contentType.equals("")) {
				throw new Exception(Messages.getMessage("missingContentType"));
			}
			otherHeaders.put(HTTPConstants.HEADER_CONTENT_TYPE, contentType);
		}

		otherHeaders.put(
			HTTPConstants.HEADER_ACCEPT,
			(new StringBuffer()
				.append(HTTPConstants.HEADER_ACCEPT_APPL_SOAP)
				.append(", ")
				.append(HTTPConstants.HEADER_ACCEPT_APPLICATION_DIME)
				.append(", ")
				.append(HTTPConstants.HEADER_ACCEPT_MULTIPART_RELATED)
				.append(", ")
				.append(HTTPConstants.HEADER_ACCEPT_TEXT_ALL))
				.toString());
		otherHeaders.put(HTTPConstants.HEADER_USER_AGENT, Messages.getMessage("axisUserAgent"));
		otherHeaders.put(HTTPConstants.HEADER_HOST, (new StringBuffer().append(host).append((port == -1) ? ("") : (":" + port))).toString());
		otherHeaders.put(HTTPConstants.HEADER_CACHE_CONTROL, HTTPConstants.HEADER_CACHE_CONTROL_NOCACHE);
		otherHeaders.put(HTTPConstants.HEADER_PRAGMA, HTTPConstants.HEADER_CACHE_CONTROL_NOCACHE);
		otherHeaders.put(HTTPConstants.HEADER_SOAP_ACTION, (new StringBuffer().append("\"").append(action).append("\"")).toString());


		if (posting) {
			if (!httpChunkStream) {
				//Content length MUST be sent on HTTP 1.0 requests.
				otherHeaders.put(HTTPConstants.HEADER_CONTENT_LENGTH, String.valueOf(reqMessage.getContentLength()));
			} else {
				//Do http chunking.
				otherHeaders.put(HTTPConstants.HEADER_TRANSFER_ENCODING, HTTPConstants.HEADER_TRANSFER_ENCODING_CHUNKED);
			}
		}

		// Transfer MIME headers of SOAPMessage to HTTP headers. 
		if (mimeHeaders != null) {
			for (Iterator i = mimeHeaders.getAllHeaders(); i.hasNext();) {
				MimeHeader mimeHeader = (MimeHeader) i.next();
				String headerName = mimeHeader.getName();
				if (headerName.equals(HTTPConstants.HEADER_CONTENT_TYPE) || headerName.equals(HTTPConstants.HEADER_SOAP_ACTION)) {
					continue;
				}
				otherHeaders.put(mimeHeader.getName(), mimeHeader.getValue());
			}
		}

		if (null != httpConnection) {
			otherHeaders.put(HTTPConstants.HEADER_CONNECTION, httpConnection);
		}

		//getSocket(sockHolder, msgContext, targetURL.getProtocol(),  host, port, timeout, otherHeaders, useFullURL);

		if (null != otherHeaders) {

			//Add other headers to the end.
			for (java.util.Iterator e = otherHeaders.entrySet().iterator(); e.hasNext();) {

				java.util.Map.Entry me = (java.util.Map.Entry) e.next();
				Object keyObj = me.getKey();
				if (null == keyObj)
					continue;
				String val = me.getValue().toString();
				if (null == val)
					val = "";
				conn.setRequestProperty(keyObj.toString(), val);
			}
		}


	//	StringBuffer header = new StringBuffer();


//		header.append(header2.toString());

		OutputStream out = conn.getOutputStream();

		if (!posting) {
//			out.write(header.toString().getBytes(HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING));
			out.flush();
			return null;
		}


	/*	if (httpChunkStream || httpContinueExpected) {
			out.write(header.toString().getBytes(HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING));
		}*/

		InputStream inp = null;

		if (httpContinueExpected) { //We need to get a reply from the server as to whether
			// it wants us send anything more.
			out.flush();
			Hashtable cheaders = new Hashtable();
			inp = readHeadersFromURLConnection(conn, msgContext, null, cheaders);
			int returnCode = -1;
			Integer Irc = (Integer) msgContext.getProperty(HTTPConstants.MC_HTTP_STATUS_CODE);
			if (null != Irc) {
				returnCode = Irc.intValue();
			}
			if (100 == returnCode) { // got 100 we may continue.
				//Need todo a little msgContext house keeping....
				msgContext.removeProperty(HTTPConstants.MC_HTTP_STATUS_CODE);
				msgContext.removeProperty(HTTPConstants.MC_HTTP_STATUS_MESSAGE);
			} else { //If no 100 Continue then we must not send anything!
				String statusMessage = (String) msgContext.getProperty(HTTPConstants.MC_HTTP_STATUS_MESSAGE);

				AxisFault fault = new AxisFault("HTTP", "(" + returnCode + ")" + statusMessage, null, null);

				fault.setFaultDetailString(Messages.getMessage("return01", "" + returnCode, ""));
				throw fault;
			}
		}
		ByteArrayOutputStream baos = null;
		if (log.isDebugEnabled()) {
			log.debug(Messages.getMessage("xmlSent00"));
			log.debug("---------------------------------------------------");
			baos = new ByteArrayOutputStream();
		}
		if (httpChunkStream) {
			ChunkedOutputStream chunkedOutputStream = new ChunkedOutputStream(out);
			out = new BufferedOutputStream(chunkedOutputStream, Constants.HTTP_TXR_BUFFER_SIZE);
			try {
				if (baos != null) {
					out = new TeeOutputStream(out, baos);
				}
				reqMessage.writeTo(out);
			} catch (SOAPException e) {
				log.error(Messages.getMessage("exception00"), e);
			}
			out.flush();
			chunkedOutputStream.eos();
		} else {
			out = new BufferedOutputStream(out, Constants.HTTP_TXR_BUFFER_SIZE);
			try {
/*				if (!httpContinueExpected) {
					out.write(header.toString().getBytes(HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING));
				}*/
				if (baos != null) {
					out = new TeeOutputStream(out, baos);
				}
				//uncomment to show data.
				//String themessage=reqMessage.getSOAPPartAsString();
				reqMessage.writeTo(out);
				
			} catch (SOAPException e) {
				log.error(Messages.getMessage("exception00"), e);
			}
			// Flush ONLY once.
			out.flush();
		}
/*		if (log.isDebugEnabled()) {
			log.debug(header + new String(baos.toByteArray()));
		}*/

		return inp;
	}

	/**
	 * Get cookies from message context and add it to the headers 
	 * @param msgContext
	 * @param header
	 * @param otherHeaders
	 */
	private void fillHeaders(MessageContext msgContext, String header, StringBuffer otherHeaders) {
		Object ck1 = msgContext.getProperty(header);
		if (ck1 != null) {
			if (ck1 instanceof String[]) {
				String[] cookies = (String[]) ck1;
				for (int i = 0; i < cookies.length; i++) {
					addCookie(otherHeaders, header, cookies[i]);
				}
			} else {
				addCookie(otherHeaders, header, (String) ck1);
			}
		}
	}

	/**
	 * add cookie to headers
	 * @param otherHeaders
	 * @param header
	 * @param cookie
	 */
	private void addCookie(StringBuffer otherHeaders, String header, String cookie) {
		otherHeaders.append(header).append(": ").append(cookie).append("\r\n");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private InputStream readHeadersFromURLConnection(HttpURLConnection conn, MessageContext msgContext, InputStream inp, Hashtable headers) throws IOException {
		byte b = 0;
		int len = 0;
		int colonIndex = -1;
		String name, value;
		int returnCode = 0;
		if (null == inp) {
			if (conn.getResponseCode() < 400) {
				inp = new BufferedInputStream(conn.getInputStream());
			} else {
				/* error from server */
				inp = new BufferedInputStream(conn.getErrorStream());
			}
		}

		if (msgContext.getProperty(HTTPConstants.MC_HTTP_STATUS_CODE) == null) {

			// Reader status code
			returnCode = conn.getResponseCode();
			msgContext.setProperty(HTTPConstants.MC_HTTP_STATUS_CODE, new Integer(returnCode));
			msgContext.setProperty(HTTPConstants.MC_HTTP_STATUS_MESSAGE, conn.getResponseMessage());
		}

		if (headers == null) {
			headers = new Hashtable();
		}

		// Should help performance. Temporary fix only till its all stream oriented.
		// Need to add logic for getting the version # and the return code
		// but that's for tomorrow!

		/* Logic to read HTTP response headers */
		boolean readTooMuch = false;
		ByteArrayOutputStream buf = new ByteArrayOutputStream(4097);
		/*for (ByteArrayOutputStream buf = new ByteArrayOutputStream(4097);;) {
			if (!readTooMuch) {
				b = (byte) inp.read();
			}
			if (b == -1) {
				break;
			}
			readTooMuch = false;
			if ((b != '\r') && (b != '\n')) {
				if ((b == ':') && (colonIndex == -1)) {
					colonIndex = len;
				}
				len++;
				buf.write(b);
			} else if (b == '\r') {
				continue;
			} else { // b== '\n'
				if (len == 0) {
					break;
				}
				b = (byte) inp.read();
				readTooMuch = true;

				// A space or tab at the begining of a line means the header continues.
				if ((b == ' ') || (b == '\t')) {
					continue;
				}
				buf.close();*/
				byte[] hdata = buf.toByteArray();
				buf.reset();
				if (colonIndex != -1) {
					name = new String(hdata, 0, colonIndex, HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING);
					value = new String(hdata, colonIndex + 1, len - 1 - colonIndex, HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING);
					colonIndex = -1;
				} else {

					name = new String(hdata, 0, len, HTTPConstants.HEADER_DEFAULT_CHAR_ENCODING);
					value = "";
				}
				if (log.isDebugEnabled()) {
					log.debug(name + value);
				}
				if (msgContext.getProperty(HTTPConstants.MC_HTTP_STATUS_CODE) == null) {

					// Reader status code
			/*		int start = name.indexOf(' ') + 1;
					String tmp = name.substring(start).trim();
					int end = tmp.indexOf(' ');

					if (end != -1) {
						tmp = tmp.substring(0, end);
					}*/
					returnCode = conn.getResponseCode();
					msgContext.setProperty(HTTPConstants.MC_HTTP_STATUS_CODE, new Integer(returnCode));
					msgContext.setProperty(HTTPConstants.MC_HTTP_STATUS_MESSAGE,  conn.getResponseMessage());
				} else {
					// if we are maintaining session state,
					// handle cookies (if any)
					if (msgContext.getMaintainSession()) {
						final String nameLowerCase = name.toLowerCase();
						if (nameLowerCase.equalsIgnoreCase(HTTPConstants.HEADER_SET_COOKIE)) {
							handleCookie(HTTPConstants.HEADER_COOKIE, null, value, msgContext);
						} else if (nameLowerCase.equalsIgnoreCase(HTTPConstants.HEADER_SET_COOKIE2)) {
							handleCookie(HTTPConstants.HEADER_COOKIE2, null, value, msgContext);
						} else {
							headers.put(name.toLowerCase(), value);
						}
					} else {
						headers.put(name.toLowerCase(), value);
					}
				}
				/*len = 0;
			}
		}*/

		return inp;
	}

	/**
	 * Reads the SOAP response back from the server
	 *
	 * @param msgContext message context
	 *
	 * @throws IOException
	 */

	/**
	 * Reads the SOAP response back from the server
	 *
	 * @param msgContext message context
	 *
	 * @throws IOException
	 */
	@SuppressWarnings({ "rawtypes" })
	private InputStream readFromURLConnection(HttpURLConnection conn, MessageContext msgContext, InputStream inp, Hashtable headers) throws IOException {
		Message outMsg = null;
		byte b;

		Integer rc = (Integer) msgContext.getProperty(HTTPConstants.MC_HTTP_STATUS_CODE);
		int returnCode = 0;
		if (rc != null) {
			returnCode = rc.intValue();
		} else {
			// No return code?? Should have one by now.
		}

		/* All HTTP headers have been read. */
		String contentType = (String) headers.get(HEADER_CONTENT_TYPE_LC);

		contentType = (null == contentType) ? null : contentType.trim();

		String location = (String) headers.get(HEADER_LOCATION_LC);

		location = (null == location) ? null : location.trim();

		if ((returnCode > 199) && (returnCode < 300)) {
			if (returnCode == 202) {
				return inp;
			}
			// SOAP return is OK - so fall through
		} else if (msgContext.getSOAPConstants() == SOAPConstants.SOAP12_CONSTANTS) {
			// For now, if we're SOAP 1.2, fall through, since the range of
			// valid result codes is much greater
		} else if ((contentType != null) && !contentType.startsWith("text/html") && ((returnCode > 499) && (returnCode < 600))) {
			// SOAP Fault should be in here - so fall through
		} else if ((location != null) && ((returnCode == 302) || (returnCode == 307))) {
			// Temporary Redirect (HTTP: 302/307)            
			// close old connection
			inp.close();
			conn.disconnect();
			// remove former result and set new target url
			msgContext.removeProperty(HTTPConstants.MC_HTTP_STATUS_CODE);
			msgContext.setProperty(MessageContext.TRANS_URL, location);
			// next try
			invoke(msgContext);
			return inp;
		} else if (returnCode == 100) {
			msgContext.removeProperty(HTTPConstants.MC_HTTP_STATUS_CODE);
			msgContext.removeProperty(HTTPConstants.MC_HTTP_STATUS_MESSAGE);
			readHeadersFromURLConnection(conn, msgContext, inp, headers);
			return readFromURLConnection(conn, msgContext, inp, headers);
		} else {
			// Unknown return code - so wrap up the content into a
			// SOAP Fault.
			ByteArrayOutputStream buf = new ByteArrayOutputStream(4097);

			while (-1 != (b = (byte) inp.read())) {
				buf.write(b);
			}
			String statusMessage = msgContext.getStrProp(HTTPConstants.MC_HTTP_STATUS_MESSAGE);
			AxisFault fault = new AxisFault("HTTP", "(" + returnCode + ")" + statusMessage, null, null);

			fault.setFaultDetailString(Messages.getMessage("return01", "" + returnCode, buf.toString()));
			fault.addFaultDetail(Constants.QNAME_FAULTDETAIL_HTTPERRORCODE, Integer.toString(returnCode));
			throw fault;
		}

		String contentLocation = (String) headers.get(HEADER_CONTENT_LOCATION_LC);

		contentLocation = (null == contentLocation) ? null : contentLocation.trim();

		String contentLength = (String) headers.get(HEADER_CONTENT_LENGTH_LC);

		contentLength = (null == contentLength) ? null : contentLength.trim();

		String transferEncoding = (String) headers.get(HEADER_TRANSFER_ENCODING_LC);

		if (null != transferEncoding) {
			transferEncoding = transferEncoding.trim().toLowerCase();
			if (transferEncoding.equals(HTTPConstants.HEADER_TRANSFER_ENCODING_CHUNKED)) {
				inp = new ChunkedInputStream(inp);
			}
		}

		outMsg = new Message(inp, false, contentType, contentLocation);
		// Transfer HTTP headers of HTTP message to MIME headers of SOAP message
	/*	MimeHeaders mimeHeaders = outMsg.getMimeHeaders();
		for (Enumeration e = headers.keys(); e.hasMoreElements();) {
			String key = (String) e.nextElement();
			mimeHeaders.addHeader(key, ((String) headers.get(key)).trim());
		}*/
		outMsg.setMessageType(Message.RESPONSE);
		msgContext.setResponseMessage(outMsg);
		if (log.isDebugEnabled()) {
			if (null == contentLength) {
				log.debug("\n" + Messages.getMessage("no00", "Content-Length"));
			}
			log.debug("\n" + Messages.getMessage("xmlRecd00"));
			log.debug("-----------------------------------------------");
			log.debug(outMsg.getSOAPEnvelope().toString());
		}

		return inp;
	}

	/**
	 * little helper function for cookies. fills up the message context with
	 * a string or an array of strings (if there are more than one Set-Cookie)
	 *
	 * @param cookieName
	 * @param setCookieName
	 * @param cookie
	 * @param msgContext
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void handleCookie(String cookieName, String setCookieName, String cookie, MessageContext msgContext) {

		cookie = cleanupCookie(cookie);
		int keyIndex = cookie.indexOf("=");
		String key = (keyIndex != -1) ? cookie.substring(0, keyIndex) : cookie;

		ArrayList cookies = new ArrayList();
		Object oldCookies = msgContext.getProperty(cookieName);
		boolean alreadyExist = false;
		if (oldCookies != null) {
			if (oldCookies instanceof String[]) {
				String[] oldCookiesArray = (String[]) oldCookies;
				for (int i = 0; i < oldCookiesArray.length; i++) {
					String anOldCookie = oldCookiesArray[i];
					if (key != null && anOldCookie.indexOf(key) == 0) { // same cookie key
						anOldCookie = cookie; // update to new one
						alreadyExist = true;
					}
					cookies.add(anOldCookie);
				}
			} else {
				String oldCookie = (String) oldCookies;
				if (key != null && oldCookie.indexOf(key) == 0) { // same cookie key
					oldCookie = cookie; // update to new one
					alreadyExist = true;
				}
				cookies.add(oldCookie);
			}
		}

		if (!alreadyExist) {
			cookies.add(cookie);
		}

		if (cookies.size() == 1) {
			msgContext.setProperty(cookieName, cookies.get(0));
		} else if (cookies.size() > 1) {
			msgContext.setProperty(cookieName, cookies.toArray(new String[cookies.size()]));
		}
	}

	/**
	 * cleanup the cookie value.
	 *
	 * @param cookie initial cookie value
	 *
	 * @return a cleaned up cookie value.
	 */
	private String cleanupCookie(String cookie) {
		cookie = cookie.trim();
		// chop after first ; a la Apache SOAP (see HTTPUtils.java there)
		int index = cookie.indexOf(';');
		if (index != -1) {
			cookie = cookie.substring(0, index);
		}
		return cookie;
	}
}
