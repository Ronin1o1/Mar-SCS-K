/**
 * Version.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

public class Version implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.math.BigDecimal _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected Version(java.math.BigDecimal value) {
        _value_ = value;
        _table_.put(_value_,this);
    };

    public static final java.math.BigDecimal _value1 = new java.math.BigDecimal("1.0");
    public static final Version value1 = new Version(_value1);
    public java.math.BigDecimal getValue() { return _value_;}
    public static Version fromValue(java.math.BigDecimal value)
          throws java.lang.IllegalStateException {
        Version tenum = (Version)
            _table_.get(value);
        if (tenum==null) throw new java.lang.IllegalStateException();
        return tenum;
    }
    public static Version fromString(java.lang.String value)
          throws java.lang.IllegalStateException {
        try {
            return fromValue(new java.math.BigDecimal(value));
        } catch (Exception e) {
            throw new java.lang.IllegalStateException();
        }
    }
    @Override
	public boolean equals(java.lang.Object obj) {return (obj == this);}
    @Override
	public int hashCode() { return toString().hashCode();}
    @Override
	public java.lang.String toString() { return _value_.toPlainString();}
}
