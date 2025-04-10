package com.marriott.rfp.utility;

public class BooleanUtility {

	public static final String YES = "Y";
	public static final String NO = "N";

	public static String toYesNoStr(Boolean bool) {
		return ((bool == null) ? null : (bool.booleanValue() ? YES : NO));
	}

	public static Boolean fromYesNoStr(String str) {
		return ((str == null) ? null : (YES.equals(str) ? Boolean.TRUE : Boolean.FALSE));
	}

}
