package com.marriott.rfp.object.report;

import java.io.Serializable;

public class ExcelDateFormats implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String dateformats;
	private String defaultvalue;

	public void setDateformats(String dateformats) {
		this.dateformats = dateformats;
	}

	public String getDateformats() {
		return dateformats;
	}

	public void setDefaultvalue(String defaultvalue) {
		this.defaultvalue = defaultvalue;
	}

	public String getDefaultvalue() {
		return defaultvalue;
	}

}
