package com.marriott.rfp.utility;

import java.util.ArrayList;
import java.util.List;

public class StringUtility {
	public static String pad(String origString, int padlen, String pad) {
		String padding ="";
		int len = Math.abs(padlen) - origString.length();
		if (len < 1)
			return origString;
		for (int i = 0; i < len; ++i)
			padding = padding + pad;

		return (padlen < 0 ? padding + origString : origString + padding);
	}

	public static String trimLeadingZeros(String origString) {
		Integer tmpInt = new Integer(origString);
		return String.valueOf(tmpInt.intValue());
	}

	public static String replace(String originalString, String replaceString, String replaceWithString) {
		int index = 0;
		int index2 = 0;
		String tmpString;
		String tmpString2 = "";
		if (originalString != null) {
			tmpString = originalString;
			index2 = tmpString.indexOf(replaceString, index);
			if (index2 == -1)
				return tmpString;

			while (index2 != -1) {
				tmpString2 += tmpString.substring(index, index2) + replaceWithString;
				index2 += replaceString.length();
				index = index2;
				index2 = tmpString.indexOf(replaceString, index);
			}
			tmpString2 += tmpString.substring(index);
		}
		return tmpString2;
	}

	public static String replaceSingleQuotes(String origString) {
		return replace(origString, "'", "''");
	}

	public static String removeKORInvalidChars(String origString) {
		origString = replace(origString, "%", "");
		origString = replace(origString, "+", "");
		origString = replace(origString, "_", "");
		origString = replace(origString, "'", "");
		origString = replace(origString, "~", "");
		origString = replace(origString, "|", "");
		origString = replace(replace(origString, "'", "\\'"), "\"", "&#34;");
		return origString;
	}

	public static String replaceFormatChars(String origString) {

		int strlength = 0;
		int i;
		String tmpString = "";
		char tmp2;
		if (origString != null) {
			strlength = origString.length();

			for (i = 0; i < strlength; i++) {
				tmp2 = origString.charAt(i);
				if (tmp2 > '\u001F')
					tmpString += tmp2;
				else
					tmpString += " ";
			}
		}
		return tmpString;
	}

	public static String replaceWildForFilename(String origString) {
		origString = StringUtility.replace(origString, " ", "");
		origString = StringUtility.replace(origString, "&", "");
		origString = StringUtility.replace(origString, "/", "");
		origString = StringUtility.replace(origString, "\\", "");
		origString = StringUtility.replace(origString, "~", "");
		origString = StringUtility.replace(origString, "!", "");
		origString = StringUtility.replace(origString, "@", "");
		origString = StringUtility.replace(origString, "#", "");
		origString = StringUtility.replace(origString, "$", "");
		origString = StringUtility.replace(origString, "%", "");
		origString = StringUtility.replace(origString, "^", "");
		origString = StringUtility.replace(origString, "*", "");
		origString = StringUtility.replace(origString, "+", "");
		origString = StringUtility.replace(origString, "|", "");
		origString = StringUtility.replace(origString, "'", "");
		origString = StringUtility.replace(origString, "<", "");
		origString = StringUtility.replace(origString, ">", "");
		origString = StringUtility.replace(origString, "?", "");
		origString = StringUtility.replace(origString, ".", "");
		origString = StringUtility.replace(origString, ",", "");
		return origString;
	}
	public static String SubStr(String strValue, int length) {
		String temp = null;
		int flen = length;
		if (strValue != null) {
			if (strValue.length() < flen)
				flen = strValue.length();
			temp = strValue.substring(0,flen);
		}
		return temp;
	}
	
	public static List<String> getDefinedDelimitedSubString(String hotelAccountinfoString, String delimiter, int maxDelimiterCount) {
		List<String> strList = new ArrayList<String>();
		String[] strHAInfoIDArr = hotelAccountinfoString.split(delimiter);
		StringBuffer strbuf = new StringBuffer();
		int initCount = 1;
		
		for (int i=0; i<strHAInfoIDArr.length; i++) {
			String strHAInfoID = strHAInfoIDArr[i];

				if (initCount == maxDelimiterCount+1) {
					strList.add(strbuf.toString());
					initCount = 1;
					strbuf = new StringBuffer();
				}
				
				strbuf = strbuf.append(strHAInfoID);
				if (initCount < maxDelimiterCount && i != strHAInfoIDArr.length-1) {
					strbuf = strbuf.append(",");
				}
				initCount++;
		}
		
		if (strbuf != null) {
			strList.add(strbuf.toString());
		}
		
		return strList;
		
	}
	
}
