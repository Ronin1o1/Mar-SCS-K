package com.marriott.rfp.object.pgoos;

public enum OccupancyType {

	SINGLE(1L), DOUBLE(2L);

	private final Long value;

	OccupancyType(Long v) {
		value = v;
	}

	public Long value() {
		return value;
	}

	public static OccupancyType fromValue(Long v) {
		for (OccupancyType c : OccupancyType.values()) {
			if (c.value.equals(v)) {
				return c;
			}
		}
		throw new IllegalArgumentException((v != null) ? v.toString(): null);
	}

}
