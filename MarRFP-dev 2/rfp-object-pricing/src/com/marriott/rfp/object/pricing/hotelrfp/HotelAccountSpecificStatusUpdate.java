package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountSpecificStatusUpdate implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long hotelid;
    private Long hotelrfpid;
    private Long hotel_accountinfoid;
    private Long accountrecid;
    private String markComplete="N";
	private String tabrebid_status;
	private String tabstatus_status;
	private String tabrates_status;
	private String tabelig_status;
	private String tabcompel_status;
	private String tabgroup_status;
	private String tabblackout_status;
	private String tabfacility_status;
	private String tabquest_status;
	private String tabgengroup_status;
	private String tabspecificquest_status; 



    public void setHotel_accountinfoid(Long hotel_accountinfoid) {
	this.hotel_accountinfoid = hotel_accountinfoid;
    }

    public Long getHotel_accountinfoid() {
	return hotel_accountinfoid;
    }

    public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
	this.hotelrfpid = hotelrfpid;
    }

    public Long getHotelrfpid() {
	return hotelrfpid;
    }

    public void setAccountrecid(Long accountrecid) {
	this.accountrecid = accountrecid;
    }

    public Long getAccountrecid() {
	return accountrecid;
    }

	public String getTabrebid_status() {
		return tabrebid_status;
	}

	public void setTabrebid_status(String tabrebid_status) {
		this.tabrebid_status = tabrebid_status;
	}

	public String getTabstatus_status() {
		return tabstatus_status;
	}

	public void setTabstatus_status(String tabstatus_status) {
		this.tabstatus_status = tabstatus_status;
	}

	public String getTabrates_status() {
		return tabrates_status;
	}

	public void setTabrates_status(String tabrates_status) {
		this.tabrates_status = tabrates_status;
	}

	public String getTabelig_status() {
		return tabelig_status;
	}

	public void setTabelig_status(String tabelig_status) {
		this.tabelig_status = tabelig_status;
	}

	public String getTabcompel_status() {
		return tabcompel_status;
	}

	public void setTabcompel_status(String tabcompel_status) {
		this.tabcompel_status = tabcompel_status;
	}

	public String getTabgroup_status() {
		return tabgroup_status;
	}

	public void setTabgroup_status(String tabgroup_status) {
		this.tabgroup_status = tabgroup_status;
	}

	public String getTabblackout_status() {
		return tabblackout_status;
	}

	public void setTabblackout_status(String tabblackout_status) {
		this.tabblackout_status = tabblackout_status;
	}

	public String getTabfacility_status() {
		return tabfacility_status;
	}

	public void setTabfacility_status(String tabfacility_status) {
		this.tabfacility_status = tabfacility_status;
	}

	public String getTabquest_status() {
		return tabquest_status;
	}

	public void setTabquest_status(String tabquest_status) {
		this.tabquest_status = tabquest_status;
	}

	public void setMarkComplete(String markComplete) {
		this.markComplete = markComplete;
	}

	public String getMarkComplete() {
		return markComplete;
	}

	public String getTabgengroup_status() {
		return tabgengroup_status;
	}

	public void setTabgengroup_status(String tabgengroup_status) {
		this.tabgengroup_status = tabgengroup_status;
	}

	public String getTabspecificquest_status() {
		return tabspecificquest_status;
	}

	public void setTabspecificquest_status(String tabspecificquest_status) {
		this.tabspecificquest_status = tabspecificquest_status;
	}
	


}
