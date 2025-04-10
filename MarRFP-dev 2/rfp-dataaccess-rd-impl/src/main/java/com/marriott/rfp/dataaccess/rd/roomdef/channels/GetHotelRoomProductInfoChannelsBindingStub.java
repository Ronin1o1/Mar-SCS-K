/**
 * GetHotelRoomPoolListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channels;

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
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;
 
@SuppressWarnings({"unchecked","rawtypes"})
public class GetHotelRoomProductInfoChannelsBindingStub extends org.apache.axis.client.Stub implements GetHotelRoomProductInfoChannelsPortType {
	private Vector cachedSerClasses = new Vector();
	private Vector cachedSerQNames = new Vector();
	private Vector cachedSerFactories = new Vector();
	private Vector cachedDeserFactories = new Vector();

	public GetHotelRoomProductInfoChannelsBindingStub() throws org.apache.axis.AxisFault {
		this(null);
	}

	public GetHotelRoomProductInfoChannelsBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		super.cachedEndpoint = endpointURL;
	}

	public GetHotelRoomProductInfoChannelsBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
		java.lang.Class roompoolsf = MI_HotelListSerializerFactory.class;
		java.lang.Class roompooldf = MI_HotelRSDeserFactory.class;

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
		cachedSerQNames.add(qName);
		cls = BasicPropertyInfo.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("", ">MI_HotelRoomProductInfoChannelsRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoChannelsRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelsRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoChannelsRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelsRQ");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoChannelsRQ.class;
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
		cachedSerFactories.add(roompoolsf);
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

	public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ(MI_HotelRoomProductInfoChannelsRQ MI_HotelRoomProductInfoChannelsRQ, String SoapPort_address) throws RemoteException {
		if (super.cachedEndpoint == null) {
			throw new org.apache.axis.NoEndPointException();
		}
		Call _call = createCall();
		_call.addParameter(
			new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoChannelsRQ"),
			new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelsRQ"),
			MI_HotelRoomProductInfoChannelsRQ.class,
			ParameterMode.IN);
		_call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoChannelsRS"), MI_HotelRoomProductInfoChannelsRS.class);
		_call.setUseSOAPAction(true);
		_call.setSOAPActionURI("GetHotelRoomProductInfoChannels");
		_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
		_call.setOperationStyle("document");
		_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoChannelsRQ"));

		java.lang.Object _resp;
			_resp = _call.invoke(new Object[] { MI_HotelRoomProductInfoChannelsRQ });
			if (_resp instanceof java.rmi.RemoteException) {
				throw (java.rmi.RemoteException) _resp;
			} else {
				try {
					return (MI_HotelRoomProductInfoChannelsRS) _resp;
				} catch (Exception _exception) {
					return (MI_HotelRoomProductInfoChannelsRS) JavaUtils.convert(_resp, MI_HotelRoomProductInfoChannelsRS.class);
				}
			}
	}

	public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ( String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoChannelsRQ(GetRequestMessage(),SoapPort_address);

	}

	private MI_HotelRoomProductInfoChannelsRQ GetRequestMessage() {
		MI_HotelRoomProductInfoChannelsRQ req_msg = new MI_HotelRoomProductInfoChannelsRQ();
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



}
