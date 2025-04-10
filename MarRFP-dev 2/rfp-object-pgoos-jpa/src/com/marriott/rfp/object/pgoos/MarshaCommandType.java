package com.marriott.rfp.object.pgoos;

public enum MarshaCommandType {

	VRPE("VRPE"), VRPX("VRPX"), VRPK("VRPK"), NONE("NONE");

	private final String value;

	MarshaCommandType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static MarshaCommandType fromValue(String v) {
		for (MarshaCommandType c : MarshaCommandType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}

}
