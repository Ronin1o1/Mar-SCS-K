package com.marriott.rfp.dataaccess.rd.hotelinvcount.api;

import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;

public interface HotelInvCountManager {
    public OTA_HotelInvCountRS getHotelInvCount(String marshacode);
}
