package com.marriott.rfp.object.pgoos;

public enum CeilingRuleType {

	FIXED("1"), PERCENT_BELOW("3"),BT_SPECIAL_RULE("10");

	private final String value;

	CeilingRuleType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static CeilingRuleType fromValue(String v) {
		for (CeilingRuleType c : CeilingRuleType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}

}
