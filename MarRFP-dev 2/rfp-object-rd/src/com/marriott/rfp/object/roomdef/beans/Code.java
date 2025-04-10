/**
 * Code.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

@SuppressWarnings("unchecked")
public class Code implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private short _value_;
	private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected Code(short value) {
        _value_ = value;
        _table_.put(new java.lang.Short(_value_),this);
    };

    public static final short _value1 = 800;
    public static final Code value1 = new Code(_value1);
    public short getValue() { return _value_;}
    public static Code fromValue(short value)
          throws java.lang.IllegalStateException {
        Code tenum = (Code)
            _table_.get(new java.lang.Short(value));
        if (tenum==null) throw new java.lang.IllegalStateException();
        return tenum;
    }
    public static Code fromString(java.lang.String value)
          throws java.lang.IllegalStateException {
        try {
            return fromValue(java.lang.Short.parseShort(value));
        } catch (Exception e) {
            throw new java.lang.IllegalStateException();
        }
    }
    @Override
	public boolean equals(java.lang.Object obj) {return (obj == this);}
    @Override
	public int hashCode() { return toString().hashCode();}
    @Override
	public java.lang.String toString() { return java.lang.String.valueOf(_value_);}
}
