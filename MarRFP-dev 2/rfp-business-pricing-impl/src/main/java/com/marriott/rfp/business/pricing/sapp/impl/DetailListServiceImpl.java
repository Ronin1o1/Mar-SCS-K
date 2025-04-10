package com.marriott.rfp.business.pricing.sapp.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.dataacess.pricing.sapp.api.DetailListManager;
import com.marriott.rfp.object.pricing.sapp.DetailList;

/**
 * Session Bean implementation class SAPPCommonServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class DetailListServiceImpl implements DetailListService {

	/**
	 * Default constructor.
	 */
	public DetailListServiceImpl() {
	}

	@Autowired
	private DetailListManager detailListMgr = null;
	
	public List<DetailList> getDetailListGlb() {
		return detailListMgr.getDetailListGlb();
	}
	
	public List<DetailList> getDetailListAssn() {
		return detailListMgr.getDetailListAssn();
	}
	
	public List<DetailList> getDetailListGrm() {
		return detailListMgr.getDetailListGrm();
	}
	
	public List<DetailList> getDetailListInf() {
		return detailListMgr.getDetailListInf();
	}
	
	public long getRevStreamId(String revStream) {
		return detailListMgr.getRevStreamId(revStream);
	}
	
	public List<DetailList> getDetailListAreaPlan() {
		return detailListMgr.getDetailListAreaPlan();
	}
	
	public List<DetailList> getDetailListRevStream() {
		return detailListMgr.getDetailListRevStream();
	}
	
	public List<DetailList> getDetailListBuyerTypes() {
		return detailListMgr.getDetailListBuyerTypes();
	}
	
	
}