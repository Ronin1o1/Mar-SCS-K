package com.marriott.rfp.business.info.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.dataaccess.info.api.InfoManager;
import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class InfoServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class InfoServiceImpl implements InfoService {

	@Autowired
	private InfoManager infoMgr = null;

	/**
	 * Default constructor.
	 */
	public InfoServiceImpl() {

	}

	public List<GeneralInfo> getAllGeneralInfoList() {
		return infoMgr.getAllGeneralInfoList();
	}

	public List<GeneralInfo> getGeneralInfoList() {
		return infoMgr.getGeneralInfoList();
	}

	public void deleteGeneralInfo(Long infoid) {
		infoMgr.deleteGeneralInfo(infoid);
	}

	public GeneralInfo getGeneralInfo(Long infoid) {
		if (infoid > 0)
			return infoMgr.getGeneralInfo(infoid);
		else
			return new GeneralInfo();
	}

	public void updateGeneralInfo(GeneralInfo info) {
		infoMgr.updateGeneralInfo(info);
	}

	public List<RFPInfo> getInfoList(Long infotypeid) {
		return infoMgr.getInfoList(infotypeid);
	}

	public List<RFPInfo> getInfoPricingList() {
		return infoMgr.getInfoPricingList();
	}
	
	public List<RFPInfo> getInfoListForRole(User user) {
		return infoMgr.getInfoListForRole(user);
	}

	public void deleteInfo(Long infoid) {
		infoMgr.deleteInfo(infoid);
	}

	public RFPInfo getInfo(Long infoid) {
		return infoMgr.getInfo(infoid);
	}

	public RFPInfo getPricingInfo(Long infoid) {
		return infoMgr.getPricingInfo(infoid);
	}

	public void updateRDInfo(RFPInfo info) {
		infoMgr.updateRDInfo(info);
	}

	public void updateWSInfo(RFPInfo info) {
		infoMgr.updateWSInfo(info);
	}

	public void updatePricingInfo(RFPInfo info) {
		infoMgr.updatePricingInfo(info);
	}
	
	public List<RFPInfo> getInfoListForUser(User user) {
		return infoMgr.getInfoListForUser(user);
	}

	public void deleteInfoUser(User user, Long infoid) {
		infoMgr.deleteInfoUser(user, infoid);
	}
	
	public String getCam_passport_url() {
		return infoMgr.getCam_passport_url();
	}

}
