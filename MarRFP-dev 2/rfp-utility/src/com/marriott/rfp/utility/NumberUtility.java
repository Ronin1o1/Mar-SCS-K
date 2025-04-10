package com.marriott.rfp.utility;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class NumberUtility {
	private static final DecimalFormat CURRENCY_FORMATTER = new DecimalFormat("#0.00");
	private static final DecimalFormat PERCENTAGE_FORMATTER = new DecimalFormat("#0.0");
	private static final DecimalFormat PERCENTAGEWHOLE_FORMATTER = new DecimalFormat("#0");
	private static final DecimalFormat WHOLE_NUMBER_FORMATTER = new DecimalFormat("#0");

	public static String formatCurrencyNumber(BigDecimal number) {
		if (number == null) {
			return "";
		} else {
			return CURRENCY_FORMATTER.format(number);
		}
	}

	public static String formatRateNumber(double thenum) {
		if (thenum == 0)
			return "";
		else {
			int num = (int) thenum;
			if (num == thenum) {
				return WHOLE_NUMBER_FORMATTER.format(thenum);
			} else {
				return CURRENCY_FORMATTER.format(thenum);
			}
		}
	}

	public static String formatPercentage(double thenum) {
		if (thenum == 0)
			return "0";
		else {
			return PERCENTAGE_FORMATTER.format(thenum);
		}
	}

	public static String formatWholePercentage(double thenum) {
		if (thenum == 0)
			return "0";
		else {
			return PERCENTAGEWHOLE_FORMATTER.format(thenum);
		}
	}

	public static long getTotalPages(long numdetails, long maxpagelen) {
		long totalPages = 0;

		if (numdetails > 0) {
			totalPages = numdetails / maxpagelen;
			if (maxpagelen * totalPages < numdetails)
				totalPages++;
		}
		return totalPages;
	}
}
