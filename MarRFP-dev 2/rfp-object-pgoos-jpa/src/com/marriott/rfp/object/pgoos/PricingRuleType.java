package com.marriott.rfp.object.pgoos;

public enum PricingRuleType {

	FIXED("1"), PERCENT_BELOW("3");

	private final String value;

	PricingRuleType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static PricingRuleType fromValue(String v) {
		for (PricingRuleType c : PricingRuleType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}

}
