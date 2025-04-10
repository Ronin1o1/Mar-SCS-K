/**
 * @author rklak551
 * RatePlanAssignmentNotify.java
 */
package com.marriott.rfp.object.roomdef.beans;

public class RatePlanAssignmentNotify implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RatePlanAssignment[] ratePlanAssignment;

    public RatePlanAssignmentNotify() {
    }

    public RatePlanAssignment[] getRatePlanAssignment() {
        return ratePlanAssignment;
    }

    public void setRatePlanAssignment(RatePlanAssignment[] ratePlanAssignment) {
        this.ratePlanAssignment = ratePlanAssignment;
    }

    public RatePlanAssignment getRatePlanAssignment(int i) {
        return ratePlanAssignment[i];
    }

    public void setRatePlanAssignment(int i, RatePlanAssignment value) {
        this.ratePlanAssignment[i] = value;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RatePlanAssignmentNotify))
            return false;
        RatePlanAssignmentNotify other = (RatePlanAssignmentNotify) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((ratePlanAssignment == null && other.getRatePlanAssignment() == null) || (ratePlanAssignment != null && java.util.Arrays.equals(ratePlanAssignment, other
                .getRatePlanAssignment())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;

    @Override
	public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getRatePlanAssignment() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRatePlanAssignment()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRatePlanAssignment(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RatePlanAssignmentNotify.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("ratePlanAssignment");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlanAssignment"));
        typeDesc.addFieldDesc(field);
    };

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
    }

}
