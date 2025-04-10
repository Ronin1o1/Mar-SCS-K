/**
 * GetHotelRoomPoolListBindingStub.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext;

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
import com.marriott.rfp.object.roomdef.beans.AlternateText;
import com.marriott.rfp.object.roomdef.beans.AlternateTextList;
import com.marriott.rfp.object.roomdef.beans.AlternateTextLists;
import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.RoomProduct;
import com.marriott.rfp.object.roomdef.beans.RoomProducts;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinition;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;

@SuppressWarnings("unchecked")
public class SetMasterRoomTypeNameDisplayTextNotifBindingStub extends org.apache.axis.client.Stub implements
        SetMasterRoomTypeNameDisplayTextNotifPortType {
	private Vector cachedSerClasses = new Vector();
    private Vector cachedSerQNames = new Vector();
    private Vector cachedSerFactories = new Vector();
    private Vector cachedDeserFactories = new Vector();

    public SetMasterRoomTypeNameDisplayTextNotifBindingStub() throws org.apache.axis.AxisFault {
        this(null);
    }

    public SetMasterRoomTypeNameDisplayTextNotifBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
        this(service);
        super.cachedEndpoint = endpointURL;
    }

    public SetMasterRoomTypeNameDisplayTextNotifBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
        java.lang.Class roompooldf = MI_HotelRSDeserFactory.class;
        java.lang.Class roompoolsf = MI_HotelListSerializerFactory.class;

        qName = new QName("", ">MI_MasterRoomTypeNameDisplayTextNotifRS");
        cachedSerQNames.add(qName);
        cls = MI_MasterRoomTypeNameDisplayTextNotifRS.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_MasterRoomTypeNameDisplayTextNotifRS");
        cachedSerQNames.add(qName);
        cls = MI_MasterRoomTypeNameDisplayTextNotifRS.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(roompooldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_MasterRoomTypeNameDisplayTextNotifRQ");
        cachedSerQNames.add(qName);
        cls = MI_MasterRoomTypeNameDisplayTextNotifRQ.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(roompoolsf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
        cachedSerQNames.add(qName);
        cls = BasicPropertyInfo.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomProducts");
        cachedSerQNames.add(qName);
        cls = RoomProducts.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(roompoolsf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RoomProduct");
        cachedSerQNames.add(qName);
        cls = RoomProduct.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(roompoolsf);
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

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Channel");
        cachedSerQNames.add(qName);
        cls = Channel.class;
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

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomTypeNameDefinitions");
        cachedSerQNames.add(qName);
        cls = RoomTypeNameDefinitions.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(roompooldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomTypeNameDefinition");
        cachedSerQNames.add(qName);
        cls = RoomTypeNameDefinition.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(roompooldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">UnitsOfMeasureList");
        cachedSerQNames.add(qName);
        cls = UnitsOfMeasureList.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "UnitsOfMeasure");
        cachedSerQNames.add(qName);
        cls = UnitsOfMeasure.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">UnitOfMeasure");
        cachedSerQNames.add(qName);
        cls = UnitOfMeasure.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">TypeLists");
        cachedSerQNames.add(qName);
        cls = TypeLists.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "TypeList");
        cachedSerQNames.add(qName);
        cls = TypeList.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Type");
        cachedSerQNames.add(qName);
        cls = Type.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">AlternateTextLists");
        cachedSerQNames.add(qName);
        cls = AlternateTextLists.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "AlternateTextList");
        cachedSerQNames.add(qName);
        cls = AlternateTextList.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(beandf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">AlternateText");
        cachedSerQNames.add(qName);
        cls = AlternateText.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);

        qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
        cachedSerQNames.add(qName);
        cls = Errors.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(roompooldf);

        qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error");
        cachedSerQNames.add(qName);
        cls = com.marriott.rfp.object.roomdef.beans.Error.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(beansf);
        cachedDeserFactories.add(roompooldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", "Description");
        cachedSerQNames.add(qName);
        cls = Description.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(roompoolsf);
        cachedDeserFactories.add(roompooldf);

        qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Text");
        cachedSerQNames.add(qName);
        cls = Text.class;
        cachedSerClasses.add(cls);
        cachedSerFactories.add(simplesf);
        cachedDeserFactories.add(simpledf);
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

    public MI_MasterRoomTypeNameDisplayTextNotifRS MI_MasterRoomTypeNameDisplayTextNotifRQ(
            MI_MasterRoomTypeNameDisplayTextNotifRQ MI_MasterRoomTypeNameDisplayTextNotifRQ,String SoapPort_address)
            throws RemoteException, ServiceException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        Call _call = createCall();
        _call.addParameter(new QName("http://www.opentravel.org/OTA/2003/05", "MI_MasterRoomTypeNameDisplayTextNotifRQ"), new QName(
                "http://www.opentravel.org/OTA/2003/05", ">MI_MasterRoomTypeNameDisplayTextNotifRQ"),
                MI_MasterRoomTypeNameDisplayTextNotifRQ.class, ParameterMode.IN);
        _call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_MasterRoomTypeNameDisplayTextNotifRS"),
                MI_MasterRoomTypeNameDisplayTextNotifRS.class);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("RemoveMasterRoomTypeNameDisplayTextNotif");
        _call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
        _call.setOperationStyle("document");
        _call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_MasterRoomTypeNameDisplayTextNotifRQ"));

        java.lang.Object _resp;
        try {
            _resp = _call.invoke(new Object[] { MI_MasterRoomTypeNameDisplayTextNotifRQ });
            if (_resp instanceof java.rmi.RemoteException) {
                throw (java.rmi.RemoteException) _resp;
            } else {
                try {
                    return (MI_MasterRoomTypeNameDisplayTextNotifRS) _resp;
                } catch (Exception _exception) {
                    return (MI_MasterRoomTypeNameDisplayTextNotifRS) JavaUtils.convert(_resp,
                            MI_MasterRoomTypeNameDisplayTextNotifRS.class);
                }
            }
        } catch (Exception e) {
            throw new ServiceException("Hotel Room Product Info Notif Not Found");
        }
    }

    public MI_MasterRoomTypeNameDisplayTextNotifRS UpdateDisplayText(MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName,String SoapPort_address)
            throws RemoteException, ServiceException {
        return MI_MasterRoomTypeNameDisplayTextNotifRQ(GetUpdateRequestMessage(roomproductInfo, loginName), SoapPort_address);

    }

    private MI_MasterRoomTypeNameDisplayTextNotifRQ GetUpdateRequestMessage(MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName) {
        //both marshacode and roompool must be present
        MI_MasterRoomTypeNameDisplayTextNotifRQ req_msg = new MI_MasterRoomTypeNameDisplayTextNotifRQ();
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
        req_msg.setPrimaryLangID(roomproductInfo.getPrimaryLangID());
        req_msg.setUnitsOfMeasureList(roomproductInfo.getUnitsOfMeasureList());
        req_msg.setTypeLists(roomproductInfo.getTypeLists());
        req_msg.setAlternateTextLists(roomproductInfo.getAlternateTextLists());
        req_msg.setRoomTypeNameDefinitions(roomproductInfo.getRoomTypeNameDefinitions());
        return req_msg;
    }

}
