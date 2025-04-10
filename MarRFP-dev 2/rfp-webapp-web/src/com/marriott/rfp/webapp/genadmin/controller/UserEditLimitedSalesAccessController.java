package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN", "MFPAPADM" })
@RestController
@RequestMapping("/usereditlimitedsalesaccess")
public class UserEditLimitedSalesAccessController extends UserEditController {

	public UserEditLimitedSalesAccessController() {
		super();
		//setShowProperties(true);
		//setShowAccounts(true);
		String returnnamespace ="/userlimitedsalesaccess";
	}
	@RequestMapping(value = "/getUserEditLimitedSalesAccess",method = {GET,POST})
	public String  getUserEditLimitedSalesAccess(String franchise,String role, Boolean showProperties,String optSel,Boolean showAccounts,boolean showManaged,Long userid,String strCurrPagePropSel,String alphaOrderProp,String filterByMorF,String alphaOrderAcct,String accountpricingtype,String accountsegment,String strCurrPageProp,String strCurrPageAcctSel,String strCurrPageAcct,Long totPropSelPageLen)  throws Exception {
		boolean showProperties1 = (showProperties ==null)?true:showProperties;
		boolean showAccounts1 = (showAccounts == null)? false: showAccounts;
		return super.getUserEdit(franchise,role,showProperties1,optSel,showAccounts1,showManaged,userid,strCurrPagePropSel,alphaOrderProp,filterByMorF,alphaOrderAcct,accountpricingtype,accountsegment,strCurrPageProp,strCurrPageAcctSel,strCurrPageAcct,totPropSelPageLen) ;
	}
}