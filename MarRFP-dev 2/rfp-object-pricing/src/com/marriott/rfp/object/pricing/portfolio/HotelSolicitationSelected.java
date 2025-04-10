package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class HotelSolicitationSelected implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String marshacode;
    private String hotelname;
    private String city;
    private String state;
    private String country;
    private Long hotelid;
    private Long ratetype_selected;
    private String nopricing;
    private String volunteered;
    private String email_sent_flag;
    private String to_send_email;
    private String status;
    private String check_rate;
	private String chasemail_sent_flag;
    private String to_send_chasemail;
    
    public String getMarshacode() {
	return marshacode;
    }

    public void setMarshacode(String marshacode) {
	this.marshacode = marshacode;
    }

    public String getHotelname() {
	return hotelname;
    }

    public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public Long getRatetype_selected() {
	return ratetype_selected;
    }

    public void setRatetype_selected(Long ratetype_selected) {
	this.ratetype_selected = ratetype_selected;
    }

    public String getNopricing() {
	return nopricing;
    }

    public void setNopricing(String nopricing) {
	this.nopricing = nopricing;
    }

    public String getVolunteered() {
	return volunteered;
    }

    public void setVolunteered(String volunteered) {
	this.volunteered = volunteered;
    }

    public void setEmail_sent_flag(String email_sent_flag) {
	this.email_sent_flag = email_sent_flag;
    }

    public String getEmail_sent_flag() {
	return email_sent_flag;
    }

    public void setTo_send_email(String to_send_email) {
	this.to_send_email = to_send_email;
    }

    public String getTo_send_email() {
	return to_send_email;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getStatus() {
	return status;
    }
    
    
    public String getCheck_rate() {
		return check_rate;
	}

	public void setCheck_rate(String check_rate) {
		this.check_rate = check_rate;
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





}
