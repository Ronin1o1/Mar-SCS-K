package com.marriott.rfp.object.pricing.edie;

import java.io.Serializable;

public class EdieColumns implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long column_id;
	private String column_name;
	private String column_label;
	private Long column_seq;
	private Long column_order;
	private String column_desc = "";
	private String epic_path="";
	private String logic="";
	private String column_hasDesc;

	public Long getColumn_id() {
		return column_id;
	}

	public void setColumn_id(Long column_id) {
		this.column_id = column_id;
	}

	public String getColumn_name() {
		return column_name;
	}

	public void setColumn_name(String column_name) {
		this.column_name = column_name;
	}

	public String getColumn_label() {
		return column_label;
	}

	public void setColumn_label(String column_label) {
		this.column_label = column_label;
	}

	public String getColumn_desc() {
		return column_desc;
	}

	public void setColumn_desc(String column_desc) {
		this.column_desc = column_desc;
	}

	public void setColumn_seq(Long column_seq) {
		this.column_seq = column_seq;
	}

	public Long getColumn_seq() {
		return column_seq;
	}

	public void setColumn_hasDesc(String column_hasDesc) {
		this.column_hasDesc = column_hasDesc;
	}

	public String getColumn_hasDesc() {
		return column_hasDesc;
	}

	public void setColumn_order(Long column_order) {
		this.column_order = column_order;
	}

	public Long getColumn_order() {
		return column_order;
	}

	public void setEpic_path(String epic_path) {
		this.epic_path = epic_path;
	}

	public String getEpic_path() {
		return epic_path;
	}

	public void setLogic(String logic) {
		this.logic = logic;
	}

	public String getLogic() {
		return logic;
	}

}
