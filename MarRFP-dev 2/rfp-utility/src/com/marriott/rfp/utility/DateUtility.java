package com.marriott.rfp.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.sql.Date;
import java.util.GregorianCalendar;

public class DateUtility {
	private static final Logger log = LoggerFactory.getLogger(DateUtility.class);
	private static SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy");
	private static SimpleDateFormat longdateFormatter=new SimpleDateFormat("yyyy-MM-dd");
	
	
	public static String formatShortDate(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("MM/dd/yyyy").format(date);
		} else {
			return "";
		}
	}
	public static String formatConvertedDate(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("dd-MMM-yyyy").format(date);
		} else {
			return "";
		}
	}


	public static String formatDate(String pattern, java.util.Date date) {

		if (date != null && pattern != null) {
			return new SimpleDateFormat(pattern).format(date);
		} else {
			return "";
		}
	}

	public static String formatLongDate(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("MMMM dd, yyyy").format(date);
		} else {
			return "";
		}
	}

	public static String formatShortStringDate(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("MMM dd, yyyy").format(date);
		} else {
			return "";
		}
	}

	public static String formatShortStringDateTime(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("MMM dd, yyyy hh:mm a").format(date);
		} else {
			return "";
		}
	}

	public static long calcDaysBetweenInclusive(java.util.Date startDate, java.util.Date endDate) {
		// caculate the number of days between including the start and end date;
		long totalDays = 0;
		double numMilliSecperDay = 86400000;
		// round to a whole day and do not account for some days being
		// milliseconds shorter
		totalDays = Math.round((double) (endDate.getTime() - startDate.getTime()) / numMilliSecperDay);
		totalDays++;
		return totalDays;
	}

	public static Date parseDate(String s) throws ParseException {
		try {
			return new Date(dateFormatter.parse(s).getTime());
		} catch (ParseException e) {
			throw e;
		}
	}

	public static Date parseLongDate(String s) throws ParseException {
		try {
			SimpleDateFormat longdateFormatter = new SimpleDateFormat("MMM dd, yyyy");
			return new Date(longdateFormatter.parse(s).getTime());
		} catch (ParseException e) {
			throw e;
		}
	}

	public static int currentYear() {
		return new GregorianCalendar().get(Calendar.YEAR);
	}

	public static int currentMonth() {
		return new GregorianCalendar().get(Calendar.MONTH);
	}

	public static boolean isAfterToDay(java.util.Date date) {
		Calendar today = new GregorianCalendar();
		today.set(Calendar.HOUR, 23);
		today.set(Calendar.MINUTE, 59);
		today.set(Calendar.SECOND, 59);
		today.set(Calendar.MILLISECOND, 59);
		today.set(Calendar.HOUR_OF_DAY, 23);

		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		return cal.after(today);
	}

	public static boolean isBeforeToDay(java.util.Date date) {
		boolean isbefore=false;
		Calendar today = new GregorianCalendar();
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		today.set(Calendar.HOUR_OF_DAY, 0);

		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		isbefore= today.before(cal);
		return isbefore;
	}

	public static boolean isDateBeforeToDay(java.util.Date date) {
		boolean isbefore=false;
		Calendar today = new GregorianCalendar();
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		today.set(Calendar.HOUR_OF_DAY, 0);

		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		isbefore= cal.before(today);
		return isbefore;
	}

	public static Date calcNBusinessDaysAfterToday(int n) {
		Calendar cal = new GregorianCalendar();
		for (int i = 0; i < n; i++) {
			cal.add(Calendar.DATE, 1);
			int dayOfWeekIndex = cal.get(Calendar.DAY_OF_WEEK);
			if (dayOfWeekIndex == Calendar.SATURDAY)
				cal.add(Calendar.DATE, 2);
			else if (dayOfWeekIndex == Calendar.SUNDAY)
				cal.add(Calendar.DATE, 1);
		}
		return new Date(cal.getTime().getTime());
	}

	public static Date getToday() {
		Calendar today = new GregorianCalendar();
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		today.set(Calendar.HOUR_OF_DAY, 0);
		return new Date(today.getTime().getTime());
	}

	public static String getTodayYYYYMMDD() {
		Date today = getToday();
		if (today != null) {
			return new SimpleDateFormat("yyyyMMdd").format(today);
		} else {
			return "";
		}
	}

	public static Date getYesterday(int n) {
		Calendar today = new GregorianCalendar();
		today.set(Calendar.HOUR, 0);
		today.set(Calendar.MINUTE, 0);
		today.set(Calendar.SECOND, 0);
		today.set(Calendar.MILLISECOND, 0);
		today.set(Calendar.HOUR_OF_DAY, 0);
		today.add(Calendar.DAY_OF_YEAR, -n);
		return new Date(today.getTime().getTime());
	}

	public static Date addDays(java.util.Date date, int days) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(Calendar.DATE, days);
		return new Date(cal.getTime().getTime());
	}

	public static String formatDateOnly(java.util.Date date) {

		if (date != null) {
			return longdateFormatter.format(date) + " 00:00:00";
		} else {
			return null;
		}
	}
	public static Short formatCancellationPolicyTime( String s ) {
		Short formattedCancellationTime = null;
		if(s.contains("hours")){
			s = "99" + s.substring(0,2);
			formattedCancellationTime = Short.parseShort(s);
		}
		else if(s.contains("days")){
			s = s.substring(0,2);
			s = s.trim();
			if (s.length() == 1){
				s = "880" + s;
			} else {
				s = "88" + s;
			}
			formattedCancellationTime = Short.parseShort(s);
		}
		else{
			try	{
				SimpleDateFormat dateformat = new SimpleDateFormat("hh:mm a");
				java.util.Date cancellationTime = dateformat.parse(s);
				formattedCancellationTime = Short.parseShort(new SimpleDateFormat("HHmm").format(cancellationTime));		
			}
			catch (ParseException e ){
				log.error(e.getMessage(),e);
			}
		}
		return formattedCancellationTime;
	}
	/* Cognos : Amenity Analysis Batch - Passing Date parameter */
	public static String formatCognosDate(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("yyyy-MM-dd").format(date);
		} else {
			return "";
		}
	}
	/* Cognos : Amenity Analysis Batch - passing Date parameter */
	
	/* Cognos : EDIE - Passing Date and Time */
	public static String formatCognosDateTime(java.util.Date date) {
		if (date != null) {
			return new SimpleDateFormat("MM-dd-yyyy_HHmmss").format(date);
		} else {
			return "";
		}
	}
	/* Cognos : EDIE - passing Date and Time */
}