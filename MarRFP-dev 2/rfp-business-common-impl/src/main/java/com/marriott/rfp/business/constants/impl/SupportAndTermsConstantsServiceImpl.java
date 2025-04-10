package com.marriott.rfp.business.constants.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.constants.api.SupportAndTermsConstantsService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.constants.api.WSConstantsManager;
import com.marriott.rfp.object.constants.Constants;

/**
 * Session Bean implementation class SupportAndTermsConstantsServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class SupportAndTermsConstantsServiceImpl implements SupportAndTermsConstantsService {
	@Autowired
	private RFPConstantsManager rfpConstantsMgr = null;

	@Autowired
	private WSConstantsManager wsConstantsMgr = null;


     public SupportAndTermsConstantsServiceImpl() {
        
    }

	public HashMap<String, String> getSupportInfomation() {
		HashMap<String, String> h = new HashMap<String, String>();
		addToHashMap(h, rfpConstantsMgr.getContactPhone());
		addToHashMap(h, rfpConstantsMgr.getContactEmail());
		addToHashMap(h, rfpConstantsMgr.getContactName());
		addToHashMap(h, rfpConstantsMgr.getContactLongName());
		addToHashMap(h, rfpConstantsMgr.getSAPP_Email());
		addToHashMap(h, rfpConstantsMgr.getRoomDefContactPhone());
		addToHashMap(h, rfpConstantsMgr.getRoomDefContactEmail());
		addToHashMap(h, rfpConstantsMgr.getRoomDefContactName());
		addToHashMap(h, rfpConstantsMgr.getRateDefContactPhone());
		addToHashMap(h, rfpConstantsMgr.getRateDefContactEmail());
		addToHashMap(h, rfpConstantsMgr.getRateDefContactName());
		addToHashMap(h, rfpConstantsMgr.getScptToolContactName());
		addToHashMap(h, rfpConstantsMgr.getScptSupportContactEmail());
		addToHashMap(h, wsConstantsMgr.getWSContactEmail());
		return h;
	}

	public HashMap<String, String> getTermsInformation() {
		HashMap<String, String> h = new HashMap<String, String>();
		addToHashMap(h, rfpConstantsMgr.getTermsEmail());
		return h;
	}

    private void addToHashMap(HashMap<String, String> h, Constants c) {
		h.put(c.getConstant_name(), c.getConstant_value());    	
    }
}
