/**
 * GetRateProductDefinitionListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount;

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
import org.apache.axis.utils.JavaUtils;

import com.marriott.rfp.dataaccess.rd.common.UriLiteralConstant;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.InvCount;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.InvCounts;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.Inventories;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.Inventory;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRQ;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.StatusApplicationControl;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;
import com.marriott.rfp.utility.DateUtility;

@SuppressWarnings({ "unchecked", "rawtypes" })
public class GetHotelInvCountBindingStub extends org.apache.axis.client.Stub implements GetHotelInvCountPortType {
    private Vector cachedSerClasses = new Vector();
    private Vector cachedSerQNames = new Vector();
    private Vector cachedSerFactories = new Vector();
    private Vector cachedDeserFactories = new Vector();

    public GetHotelInvCountBindingStub() throws org.apache.axis.AxisFault {
	this(null);
    }

    public GetHotelInvCountBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
	this(service);
	super.cachedEndpoint = endpointURL;
    }

    public GetHotelInvCountBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
	java.lang.Class hoteldf = MI_HotelRSDeserFactory.class;
	java.lang.Class hotelsf = MI_HotelListSerializerFactory.class;

	qName = new QName("", ">OTA_HotelInvCountRS");
	cachedSerQNames.add(qName);
	cls = OTA_HotelInvCountRS.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(beansf);
	cachedDeserFactories.add(beandf);

	qName = new QName("http://www.opentravel.org/OTA/2003/05", ">OTA_HotelInvCountRS");
	cachedSerQNames.add(qName);
	cls = OTA_HotelInvCountRS.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(beansf);
	cachedDeserFactories.add(hoteldf);

	qName = new QName("http://www.opentravel.org/OTA/2003/05", ">OTA_HotelInvCountRQ");
	cachedSerQNames.add(qName);
	cls = OTA_HotelInvCountRQ.class;
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

	qName = new QName("http://www.opentravel.org/OTA/2003/05", "Inventories");
	cachedSerQNames.add(qName);
	cls = Inventories.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(hotelsf);
	cachedDeserFactories.add(hoteldf);

	qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">Inventory");
	cachedSerQNames.add(qName);
	cls = Inventory.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(hotelsf);
	cachedDeserFactories.add(hoteldf);

	qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">StatusApplicationControl");
	cachedSerQNames.add(qName);
	cls = StatusApplicationControl.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(hotelsf);
	cachedDeserFactories.add(hoteldf);

	qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">InvCount");
	cachedSerQNames.add(qName);
	cls = InvCount.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(hotelsf);
	cachedDeserFactories.add(hoteldf);

	qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">InvCounts");
	cachedSerQNames.add(qName);
	cls = InvCounts.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(hotelsf);
	cachedDeserFactories.add(hoteldf);

	qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
	cachedSerQNames.add(qName);
	cls = Errors.class;
	cachedSerClasses.add(cls);
	cachedSerFactories.add(beansf);
	cachedDeserFactories.add(hoteldf);

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
	cachedDeserFactories.add(beandf);
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

    public OTA_HotelInvCountRS OTA_HotelInvCountRQ(OTA_HotelInvCountRQ OTA_HotelInvCountRQ, String SoapPort_address) throws RemoteException,
	    ServiceException {
	if (super.cachedEndpoint == null) {
	    throw new org.apache.axis.NoEndPointException();
	}
	Call _call = createCall();
	_call.addParameter(new QName("http://www.opentravel.org/OTA/2003/05", "OTA_HotelInvCountRQ"), new QName(
		"http://www.opentravel.org/OTA/2003/05", ">OTA_HotelInvCountRQ"), OTA_HotelInvCountRQ.class, ParameterMode.IN);
	_call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">OTA_HotelInvCountRS"), OTA_HotelInvCountRS.class);
	_call.setUseSOAPAction(true);
	_call.setSOAPActionURI("OTA_HotelInvCountRQ");
	_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
	_call.setOperationStyle("document");
	_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "OTA_HotelInvCountRQ"));

	java.lang.Object _resp;
	try {
	    _resp = _call.invoke(new Object[] { OTA_HotelInvCountRQ });
	    if (_resp instanceof java.rmi.RemoteException) {
		throw (java.rmi.RemoteException) _resp;
	    } else {
		try {
		    return (OTA_HotelInvCountRS) _resp;
		} catch (Exception _exception) {
		    return (OTA_HotelInvCountRS) JavaUtils.convert(_resp, OTA_HotelInvCountRS.class);
		}
	    }
	} catch (Exception e) {
	    throw new ServiceException("Hotel Inventory Count: " + e.getMessage());
	}
    }

    public OTA_HotelInvCountRS OTA_HotelInvCountRQ(String marshacode, String SoapPort_address)
	    throws RemoteException, ServiceException {
	return OTA_HotelInvCountRQ(GetRequestMessage(marshacode), SoapPort_address);

    }

    private OTA_HotelInvCountRQ GetRequestMessage(String marshacode) {
	OTA_HotelInvCountRQ req_msg = new OTA_HotelInvCountRQ();
	req_msg.setEchoToken("A");
	req_msg.setVersion("1.0");

	RequestorID r_id = new RequestorID();
	r_id.setID("CRMHQ");
	Source s = new Source();
	s.setRequestorID(r_id);
	POS pos = new POS();
	pos.setSource(s);
	req_msg.setPOS(pos);

	Inventories inventories = new Inventories();
	inventories.setHotelCode(marshacode);
	Inventory[] inv=new Inventory[1];
	inv[0] = new Inventory();
	StatusApplicationControl statusapplicationcontrol=new StatusApplicationControl();
	String today=DateUtility.getTodayYYYYMMDD();
	statusapplicationcontrol.setStart(today);
	statusapplicationcontrol.setEnd(today);
	inv[0].setStatusApplicationControl(statusapplicationcontrol);
	inventories.setInventory(inv);
	req_msg.setInventories(inventories);

	return req_msg;
    }
}