package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class PortfolioRebid implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String city;
    private String country;
    private Long hotelid;
    private String hotelname;
    private Long hotelrfpid;
    private String marshacode;
    private String nopricing;
    private String product_offered;
    private Long ratetype_selected;
    private String readonly;
    private Date rebid_due;
    private Date rebid_due2;
    private Date rebid_due3;
    private String rebid_flag;
    private String rebid_flag2;
    private String rebid_flag3;
    private String rebidstatus_desc = "";
    private String rebidstatus_desc2 = "";
    private String rebidstatus_desc3 = "";
    private Long rebidstatus_id;
    private Long rebidstatus_id2;
    private Long rebidstatus_id3;
    private String regionid;
    private String subsetname;
    private String state;
    private String changed;
    private String selected;
    private String check_respond;
    private String chasemail_sent_flag;
    private String to_send_chasemail;
    private String importance;
    
    public String getImportance() {
		return importance;
	}

	public void setImportance(String importance) {
		this.importance = importance;
	}
    public String getCheck_respond() {
		return check_respond;
	}

	public void setCheck_respond(String check_respond) {
		this.check_respond = check_respond;
	}

	public String getChasemail_sent_flag() {
		return chasemail_sent_flag;
	}

	public void setChasemail_sent_flag(String chasemail_sent_flag) {
		this.chasemail_sent_flag = chasemail_sent_flag;
	}

	public String getTo_send_chasemail() {
		return to_send_chasemail;
	}

	public void setTo_send_chasemail(String to_send_chasemail) {
		this.to_send_chasemail = to_send_chasemail;
	}
   
    public String getCity() {
	return city;
    }

    public String getCountry() {
	return country;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public String getHotelname() {
	return hotelname;
    }

    public Long getHotelrfpid() {
	return hotelrfpid;
    }

    public String getMarshacode() {
	return marshacode;
    }

    public String getPricing() {
	if (nopricing == null || nopricing.equals("Y"))
	    return "N";
	else
	    return "Y";
    }

    public String getProduct_offered() {
	return product_offered;
    }

    public Long getRatetype_selected() {
	return ratetype_selected;
    }

    public String getReadonly() {
	return readonly;
    }

    public Date getRebid_due() {
	return rebid_due;
    }

    public Date getRebid_due2() {
	return rebid_due2;
    }

    public Date getRebid_due3() {
	return rebid_due3;
    }

    public String getShortRebid_due() {
	if (rebid_due == null)
	    return "";
	else
	    return DateUtility.formatShortDate(rebid_due);
    }

    public String getShortRebid_due2() {
	if (rebid_due2 == null)
	    return "";
	else
	    return DateUtility.formatShortDate(rebid_due2);
    }

    public String getShortRebid_due3() {
	if (rebid_due3 == null)
	    return "";
	else
	    return DateUtility.formatShortDate(rebid_due3);
    }

    public String getRebid_flag() {
	return rebid_flag;
    }

    public String getRebid_flag2() {
	return rebid_flag2;
    }

    public String getRebid_flag3() {
	return rebid_flag3;
    }

    public String getRebidstatus_desc() {
	return rebidstatus_desc;
    }

    public String getRebidstatus_desc2() {
	return rebidstatus_desc2;
    }

    public String getRebidstatus_desc3() {
	return rebidstatus_desc3;
    }

    public Long getRebidstatus_id() {
	return rebidstatus_id;
    }

    public Long getRebidstatus_id2() {
	return rebidstatus_id2;
    }

    public Long getRebidstatus_id3() {
	return rebidstatus_id3;
    }

    public String getRegionid() {
	return regionid;
    }

    public String getState() {
	return state;
    }

    public String getSelected() {
		return selected;
	}

	public void setSelected(String selected) {
		this.selected = selected;
	}

	public String getNopricing() {
		return nopricing;
	}

	public void setCity(String city) {
	this.city = city;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
    }

    public void setHotelrfpid(Long hotelrfpid) {
	this.hotelrfpid = hotelrfpid;
    }

    public void setMarshacode(String marshacode) {
	this.marshacode = marshacode;
    }

    public void setNopricing(String nopricing) {
	this.nopricing = nopricing;
    }

    public void setProduct_offered(String product_offered) {
	this.product_offered = product_offered;
    }

    public void setRatetype_selected(Long ratetype_selected) {
	this.ratetype_selected = ratetype_selected;
    }

    public void setReadonly(String readonly) {
	this.readonly = readonly;
    }

    public void setRebid_due(Date rebid_due) {
	this.rebid_due = rebid_due;
    }

    public void setRebid_due2(Date rebid_due2) {
	this.rebid_due2 = rebid_due2;
    }

    public void setRebid_due3(Date rebid_due3) {
	this.rebid_due3 = rebid_due3;
    }

    public void setStrRebid_due(String strrebid_due) {
	try {
	    rebid_due = DateUtility.parseDate(strrebid_due);
	} catch (ParseException e) {
	}
    }
    public void setStrRebid_due2(String strrebid_due) {
	try {
	    rebid_due2 = DateUtility.parseDate(strrebid_due);
	} catch (ParseException e) {
	}
    }
    public void setStrRebid_due3(String strrebid_due) {
	try {
	    rebid_due3 = DateUtility.parseDate(strrebid_due);
	} catch (ParseException e) {
	}
    }

    public void setRebid_flag(String rebid_flag) {
	this.rebid_flag = rebid_flag;
    }

    public void setRebid_flag2(String rebid_flag2) {
	this.rebid_flag2 = rebid_flag2;
    }

    public void setRebid_flag3(String rebid_flag3) {
	this.rebid_flag3 = rebid_flag3;
    }

    public void setRebidstatus_desc(String rebidstatus_desc) {
	this.rebidstatus_desc = rebidstatus_desc;
    }

    public void setRebidstatus_desc2(String rebidstatus_desc2) {
	this.rebidstatus_desc2 = rebidstatus_desc2;
    }

    public void setRebidstatus_desc3(String rebidstatus_desc3) {
	this.rebidstatus_desc3 = rebidstatus_desc3;
    }

    public void setRebidstatus_id(Long rebidstatus_id) {
	this.rebidstatus_id = rebidstatus_id;
    }

    public void setRebidstatus_id2(Long rebidstatus_id2) {
	this.rebidstatus_id2 = rebidstatus_id2;
    }

    public void setRebidstatus_id3(Long rebidstatus_id3) {
	this.rebidstatus_id3 = rebidstatus_id3;
    }

    public void setRegionid(String regionid) {
	this.regionid = regionid;
    }

    public void setState(String state) {
	this.state = state;
    }


    public void setChanged(String changed) {
	this.changed = changed;
    }

    public String getChanged() {
	return changed;
    }

    public Boolean getRebidRound1Editable() {
	if (rebid_flag2 != null && rebid_flag2.equals("Y"))
	    return false;
	else
	    return true;
    }

    public Boolean getRebidRound2Editable() {
	if (rebid_flag3 != null && rebid_flag3.equals("Y"))
	    return false;
	else
	    return true;
    }

    public void setSubsetname(String subsetname) {
	this.subsetname = subsetname;
    }

    public String getSubsetname() {
	return subsetname;
    }
}
