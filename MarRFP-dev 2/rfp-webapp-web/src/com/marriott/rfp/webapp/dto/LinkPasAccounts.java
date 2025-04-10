package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.period.Period;

import java.util.List;

public class LinkPasAccounts {
    List<AdminMudroom> pasManagerList;
    List<Period> periodList;
    AdminMudroom adminRespondent;

    public List<AdminMudroom> getPasManagerList() {
        return pasManagerList;
    }

    public void setPasManagerList(List<AdminMudroom> pasManagerList) {
        this.pasManagerList = pasManagerList;
    }

    public List<Period> getPeriodList() {
        return periodList;
    }

    public void setPeriodList(List<Period> periodList) {
        this.periodList = periodList;
    }

    public AdminMudroom getAdminRespondent() {
        return adminRespondent;
    }

    public void setAdminRespondent(AdminMudroom adminRespondent) {
        this.adminRespondent = adminRespondent;
    }
}
