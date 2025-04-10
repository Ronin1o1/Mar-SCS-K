/**
 * GetHotelRoomPoolListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

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
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;

@SuppressWarnings("unchecked")
public class SetHotelRoomProductDisplayRulesNotifBindingStub extends org.apache.axis.client.Stub implements
		SetHotelRoomProductDisplayRulesNotifPortType {
	private Vector cachedSerClasses = new Vector();
	private Vector cachedSerQNames = new Vector();
	private Vector cachedSerFactories = new Vector();
	private Vector cachedDeserFactories = new Vector();

	public SetHotelRoomProductDisplayRulesNotifBindingStub() throws org.apache.axis.AxisFault {
		this(null);
	}

	public SetHotelRoomProductDisplayRulesNotifBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		super.cachedEndpoint = endpointURL;
	}

	public SetHotelRoomProductDisplayRulesNotifBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
		java.lang.Class roompooldf = MI_HotelRSDeserFactory.class;
		java.lang.Class roompoolsf = MI_HotelListSerializerFactory.class;

		qName = new QName("", ">MI_HotelRoomProductDisplayRulesNotifRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayRulesNotifRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayRulesNotifRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayRulesNotifRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayRulesNotifRQ");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayRulesNotifRQ.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "ProductDescriptions");
		cachedSerQNames.add(qName);
		cls = ProductDescriptions.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">ProductDescription");
		cachedSerQNames.add(qName);
		cls = ProductDescription.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "DisplayDimensions");
		cachedSerQNames.add(qName);
		cls = DisplayDimensions.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

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

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Channel");
		cachedSerQNames.add(qName);
		cls = Channel.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Entry");
		cachedSerQNames.add(qName);
		cls = Entry.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
		cachedSerQNames.add(qName);
		cls = Errors.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS");
		cachedSerQNames.add(qName);
		cls = OTA_ResRetrieveRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS>Version");
		cachedSerQNames.add(qName);
		cls = Version.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(enumsf);
		cachedDeserFactories.add(enumdf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error");
		cachedSerQNames.add(qName);
		cls = com.marriott.rfp.object.roomdef.beans.Error.class;
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

	public MI_HotelRoomProductDisplayRulesNotifRS MI_HotelRoomProductDisplayRulesNotifRQ(
			MI_HotelRoomProductDisplayRulesNotifRQ MI_HotelRoomProductDisplayRulesNotifRQ,String SoapPort_address) throws RemoteException, ServiceException {
		if (super.cachedEndpoint == null) {
			throw new org.apache.axis.NoEndPointException();
		}
		Call _call = createCall();
		_call.addParameter(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductDisplayRulesNotifRQ"), new QName(
				"http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayRulesNotifRQ"), MI_HotelRoomProductDisplayRulesNotifRQ.class,
				ParameterMode.IN);
		_call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayRulesNotifRS"),
				MI_HotelRoomProductDisplayRulesNotifRS.class);
		_call.setUseSOAPAction(true);
		_call.setSOAPActionURI("RemoveHotelRoomProductDisplayRulesNotif");
		_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
		_call.setOperationStyle("document");
		_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductDisplayRulesNotifRQ"));

		java.lang.Object _resp;
		try {
			_resp = _call.invoke(new Object[] { MI_HotelRoomProductDisplayRulesNotifRQ });
			if (_resp instanceof java.rmi.RemoteException) {
				throw (java.rmi.RemoteException) _resp;
			} else {
				try {
					return (MI_HotelRoomProductDisplayRulesNotifRS) _resp;
				} catch (Exception _exception) {
					return (MI_HotelRoomProductDisplayRulesNotifRS) JavaUtils.convert(_resp, MI_HotelRoomProductDisplayRulesNotifRS.class);
				}
			}
		} catch (Exception e) {
			throw new ServiceException("Hotel Room Product Info Notif Not Found");
		}
	}

	public MI_HotelRoomProductDisplayRulesNotifRS UpdateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName,String SoapPort_address)
			throws RemoteException, ServiceException {
		return MI_HotelRoomProductDisplayRulesNotifRQ(GetUpdateRequestMessage(roomproductInfo, loginName),SoapPort_address);

	}

	private MI_HotelRoomProductDisplayRulesNotifRQ GetUpdateRequestMessage(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName) {
		// both marshacode and roompool must be present
		MI_HotelRoomProductDisplayRulesNotifRQ req_msg = new MI_HotelRoomProductDisplayRulesNotifRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFP");
		Source s = new Source();
		s.setAgentSine(loginName);
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		req_msg.setChannel(roomproductInfo.getChannel());
		req_msg.setEntry(roomproductInfo.getEntry());
		req_msg.setDisplayDimensions(roomproductInfo.getDisplayDimensions());
		// make sure that the type code is filled in
		ProductDescriptions pds = roomproductInfo.getProductDescriptions();
		if (pds != null) {
			ProductDescription[] pd = pds.getProductDescription();
			if (pd != null) {
				for (int i = 0; i < pd.length; i++) {
					if (pd[i].getElementTypeCode() == null || pd[i].getElementTypeCode().equals("")) {
						pd[i].setElementTypeCode(pd[i].getElementTypeName());
						pd[i].setElementTypeName(null);
					}
				}
			}
		}
		req_msg.setProductDescriptions(roomproductInfo.getProductDescriptions());
		return req_msg;
	}

}
