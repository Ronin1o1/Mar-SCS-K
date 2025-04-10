package com.marriott.rfp.object.pgoos.propagate;

import java.io.Serializable;

public class PGOOSProductAmenity implements Serializable {

    private static final long serialVersionUID = 1L;

    private String fr_brandcode;
    private String fr_brandlist;
    private String fr_rp_code;
    private String fr_rp_groupcode;
    private String fr_rp_listcode;
    private String fr_rp_name;
    private String fr_typecode;
    private String fr_typelistcode;
    private String fr_uom_code;
    private String fr_uom_list;
    private String amenityvalue;

    public String getFr_brandcode() {
	return fr_brandcode;
    }

    public void setFr_brandcode(String fr_brandcode) {
	this.fr_brandcode = fr_brandcode;
    }

    public String getFr_brandlist() {
	return fr_brandlist;
    }

    public void setFr_brandlist(String fr_brandlist) {
	this.fr_brandlist = fr_brandlist;
    }

    public String getFr_rp_code() {
	return fr_rp_code;
    }

    public void setFr_rp_code(String fr_rp_code) {
	this.fr_rp_code = fr_rp_code;
    }

    public String getFr_rp_groupcode() {
	return fr_rp_groupcode;
    }

    public void setFr_rp_groupcode(String fr_rp_groupcode) {
	this.fr_rp_groupcode = fr_rp_groupcode;
    }

    public String getFr_rp_listcode() {
	return fr_rp_listcode;
    }

    public void setFr_rp_listcode(String fr_rp_listcode) {
	this.fr_rp_listcode = fr_rp_listcode;
    }

    public String getFr_rp_name() {
	return fr_rp_name;
    }

    public void setFr_rp_name(String fr_rp_name) {
	this.fr_rp_name = fr_rp_name;
    }

    public String getFr_typecode() {
	return fr_typecode;
    }

    public void setFr_typecode(String fr_typecode) {
	this.fr_typecode = fr_typecode;
    }

    public String getFr_typelistcode() {
	return fr_typelistcode;
    }

    public void setFr_typelistcode(String fr_typelistcode) {
	this.fr_typelistcode = fr_typelistcode;
    }

    public String getFr_uom_code() {
	return fr_uom_code;
    }

    public void setFr_uom_code(String fr_uom_code) {
	this.fr_uom_code = fr_uom_code;
    }

    public String getFr_uom_list() {
	return fr_uom_list;
    }

    public void setFr_uom_list(String fr_uom_list) {
	this.fr_uom_list = fr_uom_list;
    }

 
    public void setAmenityvalue(String amenityvalue) {
	this.amenityvalue = amenityvalue;
    }

    public String getAmenityvalue() {
	return amenityvalue;
    }

}