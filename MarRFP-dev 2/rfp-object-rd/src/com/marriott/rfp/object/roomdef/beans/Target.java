/**
 * Target.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

public class Target implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected Target(String value) {
        _value_ = value;
        _table_.put(_value_,this);
    };

    public static final String _value1 = new String("");
    public static final Target value1 = new Target(_value1);
    public String getValue() { return _value_;}
    public static Target fromValue(String value)
          throws java.lang.IllegalStateException {
        Target tenum = (Target)
            _table_.get(value);
        if (tenum==null) throw new java.lang.IllegalStateException();
        return tenum;
    }
    public static Target fromString(java.lang.String value)
          throws java.lang.IllegalStateException {
        try {
            return fromValue(new String(value));
        } catch (Exception e) {
            throw new java.lang.IllegalStateException();
        }
    }
    @Override
	public boolean equals(java.lang.Object obj) {return (obj == this);}
    @Override
	public int hashCode() { return toString().hashCode();}
    @Override
	public java.lang.String toString() { return _value_.toString();}
}
