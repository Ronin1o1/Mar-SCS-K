package com.marriott.rfp.object.pgoos;

public enum StayType {

	EXTENDED("Y"), NON_EXTENDED("N");

	private final String value;

	StayType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static StayType fromValue(String v) {
		for (StayType c : StayType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}

}
