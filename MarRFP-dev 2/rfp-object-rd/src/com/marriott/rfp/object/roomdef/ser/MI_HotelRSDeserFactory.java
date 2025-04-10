/*
 * Created on Aug 22, 2006
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.marriott.rfp.object.roomdef.ser;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.xml.namespace.QName;

import org.apache.axis.description.TypeDesc;
import org.apache.axis.encoding.Deserializer;
import org.apache.axis.encoding.ser.BaseDeserializerFactory;
import org.apache.axis.encoding.ser.BeanDeserializer;
import org.apache.axis.encoding.ser.EnumDeserializer;
import org.apache.axis.utils.BeanPropertyDescriptor;
import org.apache.axis.utils.BeanUtils;
import org.apache.axis.utils.JavaUtils;

/**
 * @author lawat057
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
//public class MI_HotelRoomPoolListRSDeserFactory implements DeserializerFactory {
public class MI_HotelRSDeserFactory extends BaseDeserializerFactory {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/** Type metadata about this class for XML deserialization */
	protected transient TypeDesc typeDesc = null;
	@SuppressWarnings("rawtypes")
	protected transient Map propertyMap = null;

	@SuppressWarnings({ "rawtypes" })
	public MI_HotelRSDeserFactory(Class javaType, QName xmlType) {
		super(MI_HotelListRSDeserializer.class, xmlType, javaType);
        
		// Sometimes an Enumeration class is registered as a Bean.
		// If this is the case, silently switch to the EnumDeserializer
		if (JavaUtils.isEnumClass(javaType)) {
			deserClass = EnumDeserializer.class;
		}

		typeDesc = TypeDesc.getTypeDescForClass(javaType);
		propertyMap = getProperties(javaType, typeDesc);
	}

   /**
	 * Get a list of the bean properties
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map getProperties(Class javaType, TypeDesc typeDesc ) {
		Map propertyMap = null;

		if (typeDesc != null) {
			propertyMap = typeDesc.getPropertyDescriptorMap();
		} else {
			BeanPropertyDescriptor[] pd = BeanUtils.getPd(javaType, null);
			propertyMap = new HashMap();
			// loop through properties and grab the names for later
			for (int i = 0; i < pd.length; i++) {
				BeanPropertyDescriptor descriptor = pd[i];
				propertyMap.put(descriptor.getName(), descriptor);
			}
		}

		return propertyMap;
	}

   /**
	 * Optimize construction of a BeanDeserializer by caching the
	 * type descriptor and property map.
	 */
	@Override
	protected Deserializer getGeneralPurpose(String mechanismType) {
		if (javaType == null || xmlType == null) {
		   return super.getGeneralPurpose(mechanismType);
		}

		if (deserClass == EnumDeserializer.class) {
		   return super.getGeneralPurpose(mechanismType);
		}

		return new BeanDeserializer(javaType, xmlType, typeDesc, propertyMap);
	}


	private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException {
		in.defaultReadObject();
		typeDesc = TypeDesc.getTypeDescForClass(javaType);
		propertyMap = getProperties(javaType, typeDesc);
	}


/***************************************************************************************************/

//	private Vector mechanisms;

/*	public MI_HotelRoomPoolListRSDeserFactory() {
		String test="";
	}*/
	/* (non-Javadoc)
	 * @see javax.xml.rpc.encoding.DeserializerFactory#getDeserializerAs(java.lang.String)
	 */
/*	public Deserializer getDeserializerAs(String arg0) {
		return new MI_HotelRoomPoolListRSDeserializer();
	}
*/
	/* (non-Javadoc)
	 * @see javax.xml.rpc.encoding.DeserializerFactory#getSupportedMechanismTypes()
	 */
/*	public Iterator getSupportedMechanismTypes() {
		if (mechanisms == null) {
			mechanisms = new Vector();
			mechanisms.add(Constants.AXIS_SAX);
		}
		return mechanisms.iterator();
	}*/



}
