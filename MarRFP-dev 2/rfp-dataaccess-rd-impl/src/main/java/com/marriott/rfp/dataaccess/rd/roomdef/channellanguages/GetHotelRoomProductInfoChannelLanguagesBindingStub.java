/**
 * GetHotelRoomPoolListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channellanguages;

import java.rmi.RemoteException;
import java.util.Enumeration;
import java.util.Vector;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.rpc.ServiceException;

import org.apache.axis.AxisFault;
import org.apache.axis.client.Call;
import org.apache.axis.encoding.ser.BeanDeserializerFactory;
import org.apache.axis.encoding.ser.BeanSerializerFactory;
import org.apache.axis.encoding.ser.SimpleDeserializerFactory;
import org.apache.axis.encoding.ser.SimpleSerializerFactory;
import org.apache.axis.utils.JavaUtils;

import com.marriott.rfp.dataaccess.rd.common.UriLiteralConstant;
import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Channels;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;
 
@SuppressWarnings({"unchecked","rawtypes"})
public class GetHotelRoomProductInfoChannelLanguagesBindingStub extends org.apache.axis.client.Stub implements GetHotelRoomProductInfoChannelLanguagesPortType {
	private Vector cachedSerClasses = new Vector();
	private Vector cachedSerQNames = new Vector();
	private Vector cachedSerFactories = new Vector();
	private Vector cachedDeserFactories = new Vector();

	public GetHotelRoomProductInfoChannelLanguagesBindingStub() throws org.apache.axis.AxisFault {
		this(null);
	}

	public GetHotelRoomProductInfoChannelLanguagesBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		super.cachedEndpoint = endpointURL;
	}

	public GetHotelRoomProductInfoChannelLanguagesBindingStub(javax.xml.rpc.Service service) throws AxisFault {
		if (service == null) {
			super.service = new org.apache.axis.client.Service();
		} else {
			super.service = service;
		}
		java.lang.Class cls;
		javax.xml.namespace.QName qName;
		java.lang.Class beansf = BeanSerializerFactory.class;
		java.lang.Class beandf = BeanDeserializerFactory.class;
		java.lang.Class enumsf = org.apache.axis.encoding.ser.EnumSerializerFactory.class;
		java.lang.Class enumdf = org.apache.axis.encoding.ser.EnumDeserializerFactory.class;
		@SuppressWarnings("unused")
		java.lang.Class simplesf = SimpleSerializerFactory.class;
		@SuppressWarnings("unused")
		java.lang.Class simpledf = SimpleDeserializerFactory.class;
		@SuppressWarnings("unused")
		java.lang.Class roompoolsf = MI_HotelListSerializerFactory.class;
		java.lang.Class roompooldf = MI_HotelRSDeserFactory.class;

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
		cachedSerQNames.add(qName);
		cls =BasicPropertyInfo.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("", ">MI_HotelRoomProductInfoChannelLanguagesRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoChannelLanguagesRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelLanguagesRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoChannelLanguagesRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelLanguagesRQ");
		cachedSerQNames.add(qName);
		cls =MI_HotelRoomProductInfoChannelLanguagesRQ.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">POS");
		cachedSerQNames.add(qName);
		cls = POS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RequestorID");
		cachedSerQNames.add(qName);
		cls = RequestorID.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Source");
		cachedSerQNames.add(qName);
		cls = Source.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Channels");
		cachedSerQNames.add(qName);
		cls = Channels.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Channel");
		cachedSerQNames.add(qName);
		cls = Channel.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);
		
		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Languages");
		cachedSerQNames.add(qName);
		cls = Languages.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);
		
		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Language");
		cachedSerQNames.add(qName);
		cls = Language.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
		cachedSerQNames.add(qName);
		cls =  Errors.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS");
		cachedSerQNames.add(qName);
		cls =  OTA_ResRetrieveRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS>Version");
		cachedSerQNames.add(qName);
		cls =  Version.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(enumsf);
		cachedDeserFactories.add(enumdf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error");
		cachedSerQNames.add(qName);
		cls =  com.marriott.rfp.object.roomdef.beans.Error.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);
	}

	private Call createCall() throws RemoteException {
		try {
			Call _call = (Call) super.service.createCall();
			if (super.maintainSessionSet) {
				_call.setMaintainSession(super.maintainSession);
			}
			if (super.cachedUsername != null) {
				_call.setUsername(super.cachedUsername);
			}
			if (super.cachedPassword != null) {
				_call.setPassword(super.cachedPassword);
			}
			if (super.cachedEndpoint != null) {
				_call.setTargetEndpointAddress(super.cachedEndpoint);
			}
			if (super.cachedTimeout != null) {
				_call.setTimeout(super.cachedTimeout);
			}
			if (super.cachedPortName != null) {
				_call.setPortName(super.cachedPortName);
			}
			Enumeration keys = super.cachedProperties.keys();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				if (_call.isPropertySupported(key))
					_call.setProperty(key, super.cachedProperties.get(key));
			}
			// All the type mapping information is registered
			// when the first call is made.
			// The type mapping information is actually registered in
			// the TypeMappingRegistry of the service, which
			// is the reason why registration is only needed for the first call.
			synchronized (this) {
				if (firstCall()) {
					// must set encoding style before registering serializers
					_call.setEncodingStyle(null);
					for (int i = 0; i < cachedSerFactories.size(); ++i) {
						java.lang.Class cls = (java.lang.Class) cachedSerClasses.get(i);
						QName qName = (QName) cachedSerQNames.get(i);
						Class sf = (java.lang.Class) cachedSerFactories.get(i);
						Class df = (java.lang.Class) cachedDeserFactories.get(i);
						_call.registerTypeMapping(cls, qName, sf, df, false);
					}
				}
			}
			return _call;
		} catch (Throwable t) {
			throw new AxisFault("Failure trying to get the Call object", t);
		}
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(MI_HotelRoomProductInfoChannelLanguagesRQ MI_HotelRoomProductInfoChannelLanguagesRQ, String SoapPort_address) throws RemoteException{
		if (super.cachedEndpoint == null) {
			throw new org.apache.axis.NoEndPointException();
		}
		Call _call = createCall();
		_call.addParameter(
			new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoChannelLanguagesRQ"),
			new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelLanguagesRQ"),
			MI_HotelRoomProductInfoChannelLanguagesRQ.class,
			ParameterMode.IN);
		_call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelLanguagesRS"), MI_HotelRoomProductInfoChannelLanguagesRS.class);
		_call.setUseSOAPAction(true);
		//_call.setSOAPActionURI("GetHotelRoomProductInfoChannelLanguages");	
		_call.setSOAPActionURI("mi_hotelroomproductinfochannellanguagesrq");
		_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
		_call.setOperationStyle("document");
		_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoChannelLanguagesRQ"));

		java.lang.Object _resp;
			_resp = _call.invoke(new Object[] { MI_HotelRoomProductInfoChannelLanguagesRQ });
			if (_resp instanceof java.rmi.RemoteException) {
				throw (java.rmi.RemoteException) _resp;
			} else {
				try {
					return (MI_HotelRoomProductInfoChannelLanguagesRS) _resp;
				} catch (Exception _exception) {
					return (MI_HotelRoomProductInfoChannelLanguagesRS) JavaUtils.convert(_resp, MI_HotelRoomProductInfoChannelLanguagesRS.class);
				}
			}
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(Channel channel, String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetRequestMessage(channel),SoapPort_address);

	}
	
	public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetRequestMessage(),SoapPort_address);

	}

	private MI_HotelRoomProductInfoChannelLanguagesRQ GetRequestMessage(Channel channel) {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFP");
		r_id.setType("10");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);
		
		if (channel != null && !channel.equals("")) {
			Channels channels = new Channels();				
			java.util.ArrayList ch = new java.util.ArrayList(); 
			ch.add(channel);
			java.util.List list = java.util.Arrays.asList(ch.toArray());
			channels.setChannel((Channel[]) list.toArray(new Channel[list.size()]));
			req_msg.setChannels(channels);
		} else {
			req_msg.setChannels(null);
		}

		return req_msg;
	}
	
	private MI_HotelRoomProductInfoChannelLanguagesRQ GetRequestMessage() {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFP");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		return req_msg;
	}

	public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(Channel channel, String SoapPort_address) throws RemoteException {
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetFormattedRatesRequestMessage(channel),SoapPort_address);

	}
	
	public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(String SoapPort_address) throws RemoteException {
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetFormattedRatesRequestMessage(),SoapPort_address);

	}

	private MI_HotelRoomProductInfoChannelLanguagesRQ GetFormattedRatesRequestMessage(Channel channel) {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFPRPN");
		r_id.setType("10");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);
		
		if (channel != null && !channel.equals("")) {
			Channels channels = new Channels();				
			java.util.ArrayList ch = new java.util.ArrayList(); 
			ch.add(channel);
			java.util.List list = java.util.Arrays.asList(ch.toArray());
			channels.setChannel((Channel[]) list.toArray(new Channel[list.size()]));
			req_msg.setChannels(channels);
		} else {
			req_msg.setChannels(null);
		}

		return req_msg;
	}
	
	private MI_HotelRoomProductInfoChannelLanguagesRQ GetFormattedRatesRequestMessage() {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFPRPN");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		return req_msg;
	}
	
	public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(Channel channel, String SoapPort_address) throws RemoteException, ServiceException{
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetRateProductChannelRequestMessage(channel),SoapPort_address);

	}
	
	public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoChannelLanguagesRQ(GetRateProductChannelRequestMessage(),SoapPort_address);

	}

	private MI_HotelRoomProductInfoChannelLanguagesRQ GetRateProductChannelRequestMessage(Channel channel) {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFPRTD");
		r_id.setType("10");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);
		
		if (channel != null && !channel.equals("")) {
			Channels channels = new Channels();				
			java.util.ArrayList ch = new java.util.ArrayList(); 
			ch.add(channel);
			java.util.List list = java.util.Arrays.asList(ch.toArray());
			channels.setChannel((Channel[]) list.toArray(new Channel[list.size()]));
			req_msg.setChannels(channels);
		} else {
			req_msg.setChannels(null);
		}

		return req_msg;
	}
	
	private MI_HotelRoomProductInfoChannelLanguagesRQ GetRateProductChannelRequestMessage() {
		MI_HotelRoomProductInfoChannelLanguagesRQ req_msg = new MI_HotelRoomProductInfoChannelLanguagesRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFPRTD");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		return req_msg;
	}
}
