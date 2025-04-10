package com.marriott.rfp.object.wholesaler.charges;

import java.io.Serializable;

public class Charges  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private String charges_ref;
	private long charges_ref_id;
	private long charges_id;
	private String tax_included;
	private float tax_rate;
	private String breakfast_included;
	private float add_charge_room;
	private long charges_ref_id_room;
	private float add_charge_level;
	private long charges_ref_id_level;
	private String add_charge_desc;
	
	public String getCharges_ref() {
		return charges_ref;
	}
	
	public void setCharges_ref(String charges_ref) {
		this.charges_ref = charges_ref;
	}
	
	public long getCharges_ref_id() {
		return charges_ref_id;
	}
	
	public void setCharges_ref_id(long charges_ref_id) {
		this.charges_ref_id = charges_ref_id;
	}
	
	public long getCharges_id() {
		return charges_id;
	}
	
	public void setCharges_id(long charges_id) {
		this.charges_id = charges_id;
	}
	
	public String getTax_included() {
		return tax_included;
	}
	
	public void setTax_included(String tax_included) {
		this.tax_included = tax_included;
	}
	
	public String getBreakfast_included() {
		return breakfast_included;
	}
	
	public void setBreakfast_included(String breakfast_included) {
		this.breakfast_included = breakfast_included;
	}
	
	public float getAdd_charge_room() {
		return add_charge_room;
	}
	
	public void setAdd_charge_room(float add_charge_room) {
		this.add_charge_room = add_charge_room;
	}
	
	public long getCharges_ref_id_room() {
		return charges_ref_id_room;
	}
	
	public void setCharges_ref_id_room(long charges_ref_id_room) {
		this.charges_ref_id_room = charges_ref_id_room;
	}
	
	public float getAdd_charge_level() {
		return add_charge_level;
	}
	
	public void setAdd_charge_level(float add_charge_level) {
		this.add_charge_level = add_charge_level;
	}
	
	public long getCharges_ref_id_level() {
		return charges_ref_id_level;
	}
	
	public void setCharges_ref_id_level(long charges_ref_id_level) {
		this.charges_ref_id_level = charges_ref_id_level;
	}
	
	public String getAdd_charge_desc() {
		return add_charge_desc;
	}
	
	public void setAdd_charge_desc(String add_charge_desc) {
		this.add_charge_desc = add_charge_desc;
	}
	
	public float getTax_rate() {
		return tax_rate;
	}
	
	public void setTax_rate(float tax_rate) {
		this.tax_rate = tax_rate;
	}

}