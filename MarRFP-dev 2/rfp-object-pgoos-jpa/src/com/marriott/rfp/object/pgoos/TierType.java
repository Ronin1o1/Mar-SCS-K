package com.marriott.rfp.object.pgoos;

public enum TierType {

	TIER1("1"), TIER2("2"), TIER3("3"), TIER4("4");

	private final String value;

	TierType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static TierType fromValue(String v) {
		for (TierType c : TierType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}

}
