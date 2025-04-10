/**
 * GetHotelRateProductDefinitionListBindingStub.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

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
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;

@SuppressWarnings({"unchecked","rawtypes"})
public class SetRateProductDefinitionsBindingStub extends org.apache.axis.client.Stub implements SetRateProductDefinitionsPortType {
	private Vector cachedSerClasses = new Vector();

    private Vector cachedSerQNames = new Vector();

    private Vector cachedSerFactories = new Vector();

    private Vector cachedDeserFactories = new Vector();

    public SetRateProductDefinitionsBindingStub() throws org.apache.axis.AxisFault {
        this(null);
    }

    public SetRateProductDefinitionsBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
        this(service);
        super.cachedEndpoint = endpointURL;
    }

    public SetRateProductDefinitionsBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
        java.lang.Class simplesf = SimpleSerializerFactory.class;
        java.lang.Class simpledf = SimpleDeserializerFactory.class;
        java.lang.Class hoteldf = MI_HotelRSDeserFactory.class;
		java.lang.Class hotelsf = MI_HotelListSerializerFactory.class;

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
        cachedSerQNames.add(qName);
        cls = BasicPropertyInfo.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("", ">MI_RateProductDefinitionsNotifRS");
        cachedSerQNames.add(qName);
        cls = MI_RateProductDefinitionsNotifRS.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_RateProductDefinitionsNotifRS");
        cachedSerQNames.add(qName);
        cls = MI_RateProductDefinitionsNotifRS.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(hoteldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_RateProductDefinitionsNotifRQ");
        cachedSerQNames.add(qName);
        cls = MI_RateProductDefinitionsNotifRQ.class;
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
        
        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Type");
        cachedSerQNames.add(qName);
        cls = Type.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Brand");
        cachedSerQNames.add(qName);
        cls = Brand.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);
      

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "RateProductDefinitions");
		cachedSerQNames.add(qName);
		cls = RateProductDefinitions.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(hoteldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">RateProductDefinition");
		 cachedSerQNames.add(qName);
		 cls = RateProductDefinition.class;
		 cachedSerClasses.add(cls);
		 cachedSerFactories.add(hotelsf);
		 cachedDeserFactories.add(hoteldf);


		qName = new QName("http://www.opentravel.org/OTA/2003/05", "UnitOfMeasure");
		cachedSerQNames.add(qName);
		cls = UnitOfMeasure.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		 cachedDeserFactories.add(simpledf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "SupplementaryData");
		cachedSerQNames.add(qName);
		cls = SupplementaryData.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(hoteldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Description");
		cachedSerQNames.add(qName);
		cls = Description.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(hoteldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Text");
		cachedSerQNames.add(qName);
		cls = Text.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);
	

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

    public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ(
            MI_RateProductDefinitionsNotifRQ MI_RateProductDefinitionsNotifRQ,String SoapPort_address) throws RemoteException,
            ServiceException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        Call _call = createCall();
        _call.addParameter(new QName("http://www.opentravel.org/OTA/2003/05", "MI_RateProductDefinitionsNotifRQ"), new QName(
                "http://www.opentravel.org/OTA/2003/05", ">MI_RateProductDefinitionsNotifRQ"),
                MI_RateProductDefinitionsNotifRQ.class, ParameterMode.IN);
        _call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_RateProductDefinitionsNotifRS"),
                MI_RateProductDefinitionsNotifRS.class);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("MI_RateProductDefinitionsNotifRQ");
        _call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
        _call.setOperationStyle("document");
        _call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_RateProductDefinitionsNotifRQ"));

        java.lang.Object _resp;
        try {
            _resp = _call.invoke(new Object[] { MI_RateProductDefinitionsNotifRQ });
            if (_resp instanceof java.rmi.RemoteException) {
                throw (java.rmi.RemoteException) _resp;
            } else {
                try {
                    return (MI_RateProductDefinitionsNotifRS) _resp;
                } catch (Exception _exception) {
                    return (MI_RateProductDefinitionsNotifRS) JavaUtils.convert(_resp,
                            MI_RateProductDefinitionsNotifRS.class);
                }
            }
        } catch (Exception e) {
            throw new ServiceException(" RateProduct DefinitionNotif" + e.getMessage());
        }
    }

    public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ( String marshacode, String brandcode,
            RateProductDefinitions roomtypenameinfo, String loginName,String SoapPort_address) throws RemoteException,
            ServiceException {
        return MI_RateProductDefinitionsNotifRQ(GetRequestMessage(  marshacode,  brandcode,roomtypenameinfo, loginName),SoapPort_address);

    }

    private MI_RateProductDefinitionsNotifRQ GetRequestMessage(  String marshacode, String brandcode,RateProductDefinitions roomtypenameinfo,
            String loginName) {
        MI_RateProductDefinitionsNotifRQ req_msg = new MI_RateProductDefinitionsNotifRQ();
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

        if ((marshacode != null && marshacode.length() > 0) || (brandcode != null && brandcode.length() > 0)) {
            BasicPropertyInfo binfo = new BasicPropertyInfo();
            if (marshacode != null && marshacode.length() > 0)
                binfo.setHotelCode(marshacode);
            if (brandcode != null && brandcode.length() > 0)
                binfo.setBrandCode(brandcode);
            req_msg.setBasicPropertyInfo(binfo);
        }

        RateProductDefinition[] rtnd=roomtypenameinfo.getRateProductDefinition();
        for (int i=0; i<rtnd.length; i++) {
            rtnd[i].setSupplementaryData(null);
            rtnd[i].setText(null);
        }
        if (roomtypenameinfo.getProductCode() != null && roomtypenameinfo.getProductCode().equals(""))
            roomtypenameinfo.setProductCode(null);
        req_msg.setRateProductDefinitions(roomtypenameinfo);
        return req_msg;
    }
}