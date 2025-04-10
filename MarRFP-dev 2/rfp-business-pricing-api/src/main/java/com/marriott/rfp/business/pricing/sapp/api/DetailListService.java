package com.marriott.rfp.business.pricing.sapp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.sapp.DetailList;


public interface DetailListService {

	public List<DetailList> getDetailListGlb();
	public List<DetailList> getDetailListAssn();
	public List<DetailList> getDetailListGrm();
	public List<DetailList> getDetailListInf();
	public long getRevStreamId(String revStream);
	public List<DetailList> getDetailListAreaPlan();
	public List<DetailList> getDetailListRevStream();
	public List<DetailList> getDetailListBuyerTypes();
	
}