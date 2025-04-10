package com.marriott.rfp.business.info.api;

import java.util.List;

import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.object.user.User;


public interface InfoService {
	public List<GeneralInfo> getAllGeneralInfoList();

	public List<GeneralInfo> getGeneralInfoList();

	public void deleteGeneralInfo(Long infoid);

	public GeneralInfo getGeneralInfo(Long infoid);

	public void updateGeneralInfo(GeneralInfo info);

	public List<RFPInfo> getInfoList(Long infotypeid);
	
	public List<RFPInfo> getInfoPricingList();

	public List<RFPInfo> getInfoListForRole(User user);

	public void deleteInfo(Long infoid);

	public RFPInfo getInfo(Long infoid);
	
	public RFPInfo getPricingInfo(Long infoid);

	public void updateRDInfo(RFPInfo info);

	public void updateWSInfo(RFPInfo info);

	public void updatePricingInfo(RFPInfo info);

	public List<RFPInfo> getInfoListForUser(User user);

	public void deleteInfoUser(User user, Long infoid);
	
	public String getCam_passport_url();

}
