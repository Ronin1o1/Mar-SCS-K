package com.marriott.rfp.object.pricing.hotel;

import java.io.Serializable;
import java.util.Date;

public class HotelRoomPool implements Serializable {

    private Long roompoolid;
    private Long hotelid;
    private String roompool;
    private Long actualnumrooms;
    private Date lastupdate_date;;
    private static final long serialVersionUID = 1L;

    public HotelRoomPool() {
	super();
    }

    public Long getRoompoolid() {
        return roompoolid;
    }

    public void setRoompoolid(Long roompoolid) {
        this.roompoolid = roompoolid;
    }

    public Long getHotelid() {
        return hotelid;
    }

    public void setHotelid(Long hotelid) {
        this.hotelid = hotelid;
    }

    public String getRoompool() {
        return roompool;
    }

    public void setRoompool(String roompool) {
        this.roompool = roompool;
    }

    public Long getActualnumrooms() {
        return actualnumrooms;
    }

    public void setActualnumrooms(Long actualnumrooms) {
        this.actualnumrooms = actualnumrooms;
    }

    public Date getLastupdate_date() {
        return lastupdate_date;
    }

    public void setLastupdate_date(Date lastupdate_date) {
        this.lastupdate_date = lastupdate_date;
    }

    
}
