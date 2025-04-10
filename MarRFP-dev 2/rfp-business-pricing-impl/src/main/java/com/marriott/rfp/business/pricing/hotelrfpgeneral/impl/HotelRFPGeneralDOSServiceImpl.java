package com.marriott.rfp.business.pricing.hotelrfpgeneral.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralDOSService;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.hotelrfpdos.api.HotelRFPDOSManager;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Ranges;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPGeneralDOSServiceImpl implements HotelRFPGeneralDOSService {

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;

	@Autowired
	HotelRFPDOSManager dosMgr = null;

	public SalesDepth getHotelRFPDOS(long hotelrfpid, long seasonid) {
		SalesDepth sd = dosMgr.getSalesDepth(hotelrfpid);
		if (sd == null) {
			sd = new SalesDepth();
			sd.setIsenhanced("N");
		}

		if (sd.getSalesdepthid() != null && sd.getIsenhanced().equals("N")) {
			sd.setSalesdepth_ranges(dosMgr.getSalesDepthRanges(sd.getSalesdepthid()));
		} else if(sd.getSalesdepthid() != null ) {
			if (seasonid == 0)
				seasonid = 1;
			sd.setSalesdepth_en_season(dosMgr.getSalesDepthEnhancedSeason(sd.getSalesdepthid(), seasonid));
			sd.setSalesdepth_en_loslist(dosMgr.getSalesDepthEnhancedLOS(sd.getSalesdepthid()));
			List<SalesDepth_En_Ranges> snl = dosMgr.getSalesDepthEnhancedRanges(sd.getSalesdepthid(), seasonid);
			for (int i = 0; i < snl.size(); i++) {
				SalesDepth_En_Ranges ser = snl.get(i);
				ser.setSalesdepth_en_rates(dosMgr.getSalesDepthEnhancedRates(ser.getSalesdepth_en_ranges_id()));
			}
			sd.setSalesdepth_en_ranges(snl);
		}
		return sd;
	}
	public boolean getHotelRFPEnhancedDOSCompletionStatus(SalesDepth sd, long seasonid) {
		boolean status = true;
	
		if(sd.getSalesdepthid() != null && (dosMgr.getEnhancedSalesDepthCompletionStatus(sd.getSalesdepthid(),seasonid).equals("N")) )
			status = false;
		return status;
		
	}

	public void updateSalesDepth(SalesDepth salesDepth, String switched, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			dosMgr.updateSalesDepth(salesDepth, switched, user);
			if (!switched.equalsIgnoreCase("Y")) {

				if (salesDepth.getIsenhanced().equals("N"))
					dosMgr.updateSalesRanges(salesDepth.getHotelrfpid(), salesDepth.getSalesdepth_ranges(), user);
				else
					dosMgr.updateEnSalesRanges(salesDepth.getHotelrfpid(), salesDepth.getSalesdepth_en_ranges(), user);
			}
			hotelMenuMgr.update(salesDepth.getHotelrfpid(), 20, 0, "", "C", user, "N", "");
		}
	}

}
