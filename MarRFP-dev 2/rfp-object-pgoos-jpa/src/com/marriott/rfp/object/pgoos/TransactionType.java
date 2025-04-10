package com.marriott.rfp.object.pgoos;

public enum TransactionType {

	LIVE("L"), MCBVRPA("R"), MCBVRPK("K"),MCBVRPX("X"), BATCH("B"),MCB("R"), 
	MCBVRPE("E"), MCBVRXK("Z"), MCBVRPP("P"), MCBVREP("F"), MCBVRXP("C"), MCBVREX("D");

	/* MCBVRPE - cmd text only
	 * MCBVRXK - gpp accts relinquish-kill
	 * MCBVRPP - send only amenities
	 * MCBVREP - cmd text and amenities
	 * MCBVRXP - GPP rel/kill and amenities
	 * MCBVREX - GPP cmd text and rel/kill
	 * 
	 */
	private final String value;

	TransactionType(String v) {
		value = v;
	}

	public String value() {
		return value;
	}

	public static TransactionType fromValue(String v) {
		for (TransactionType c : TransactionType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException(v);
	}
}
