package com.marriott.rfp.dataacess.pricing.sapp.api;

import java.util.List;

import com.marriott.rfp.object.pricing.sapp.DetailList;

public interface DetailListManager {

	public List<DetailList> getDetailListGlb();
	public List<DetailList> getDetailListAssn();
	public List<DetailList> getDetailListGrm();
	public List<DetailList> getDetailListInf();
	public long getRevStreamId(String revStream);
	public List<DetailList> getDetailListAreaPlan();
	public List<DetailList> getDetailListRevStream();
	public List<DetailList> getDetailListBuyerTypes();
	
}
