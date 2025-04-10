package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.period.Period;

import java.util.List;

public class AcctSelect {
    List<Period> periodList;
    String linkedMsg;
    public List<Period> getPeriodList() {
        return periodList;
    }

    public void setPeriodList(List<Period> periodList) {
        this.periodList = periodList;
    }

    public String getLinkedMsg() {
        return linkedMsg;
    }

    public void setLinkedMsg(String linkedMsg) {
        this.linkedMsg = linkedMsg;
    }
}
