package com.marriott.rfp.dataacess.pricing.alternateCancPolicy.api;

/**
 * @author Kperl585
 */
import java.util.List;

import com.marriott.rfp.object.pricing.account.AlternateCancPolicy;


public interface AlternateCancPolicyManager {
	public List<AlternateCancPolicy> getAlternateCancPolicylist();

	public List<AlternateCancPolicy> getAlternateCancPolicyTimelist();
	
	public List<AlternateCancPolicy> getAlternateCancPolicyOptionlist();
	
	public List<AlternateCancPolicy> getAlternateCxlPolicyTimelist();
	
	public List<AlternateCancPolicy> getCxlorderlist();

}
