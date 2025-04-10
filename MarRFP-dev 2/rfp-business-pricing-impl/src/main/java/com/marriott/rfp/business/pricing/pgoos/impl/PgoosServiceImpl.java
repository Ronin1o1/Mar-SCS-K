package com.marriott.rfp.business.pricing.pgoos.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pgoos.admin.api.PgoosPropagateProductService;
import com.marriott.rfp.business.pgoos.api.PGOOSPublishService;
import com.marriott.rfp.business.pricing.pgoos.api.PgoosService;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSSetupManager;
import com.marriott.rfp.dataacess.pricing.pgoos.api.PgoosPropagateManager;
import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosLoad;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintAvail;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintSelected;
import com.marriott.rfp.object.pricing.pgoos.PgoosSelect;
import com.marriott.rfp.object.user.User;
@Transactional("transactionManagerRfpCommon")
@Service
public class PgoosServiceImpl implements PgoosService {

	@Autowired
	private PgoosPropagateManager pgoosPropagateMgr = null;

	@Autowired
	private PgoosPropagateProductService pgoosPropagateProductService;

	@Autowired
	private PGOOSSetupManager pgoosSetupManager;

	@Autowired
	private PGOOSPublishService pgoosPublishService;

	public List<PgoosMaintAvail> findPgoosableHotelFilteredList(PricingFilterSelections filterValues, User user) {
		if (filterValues != null) {
			return pgoosPropagateMgr.findPgoosableHotelFilteredList(filterValues, user);
		}

		else {
			return null;
		}
	}

	public String updatePgoosMaint(PricingFilterSelections filterValues, List<Long> pgoosSelect, User user) {
		return pgoosPropagateMgr.updatePgoosMaint(filterValues, pgoosSelect, user);
	}

	public List<PgoosMaintSelected> findPgoosSelectedRecsFilteredList(PricingFilterSelections filterValues, User user) {
		if (filterValues != null)
			return pgoosPropagateMgr.findPgoosSelectedRecsFilteredList(filterValues, user);

		else
			return null;
	}

	public void deletePgoosMaint(List<PgoosSelect> pgoosSelect) {
		pgoosPropagateMgr.deletePgoosMaint(pgoosSelect);
	}

	public void deleteMCB() {
		pgoosPropagateMgr.deleteMCB();
	}

	public Long pgoospropagate(PricingFilterSelections filterValues, User user, Long prodIter) {
		Long batchId = 0L;
		Long prodCount = 0L;

		if (filterValues.getBatchId() == 0) {
			batchId = pgoosSetupManager.getNextBatchId();
			pgoosPropagateMgr.findMCBProdRecord();
		} else {
			batchId = filterValues.getBatchId();
		}

		/* Starting the batch */
		if (filterValues.getPgoosStatus() == null) {
			updatePgoosBatch(batchId, "LOAD", "MCBLoad", user.getEid());
			if (filterValues.getPgoosType().equals("M")) {
					if (filterValues.getSendVrpa().equals("A")) {
				filterValues.setPgoosStatus("A");
					} else if (filterValues.getSendVrpe().equals("E") && filterValues.getSendVrpx().equals("X")) {
						filterValues.setPgoosStatus("H");  /*D*/
					} else if (filterValues.getSendVrpe().equals("E") && filterValues.getSendProd().equals("P")) {
						filterValues.setPgoosStatus("A"); /*F*/
					} else if (filterValues.getSendVrpx().equals("X") && filterValues.getSendProd().equals("P")) {
						filterValues.setPgoosStatus("A"); /*C*/
					}  else if (filterValues.getSendVrpe().equals("E")) {
						filterValues.setPgoosStatus("H"); /*E*/
					} else if (filterValues.getSendVrpx().equals("X")) {
						filterValues.setPgoosStatus("H"); /*Z*/
					} else if (filterValues.getSendProd().equals("P")) {
						filterValues.setPgoosStatus("A"); /*P Product*/
					}
			} else if (filterValues.getPgoosType().equals("K")) {
				filterValues.setPgoosStatus("K");
			} else if (filterValues.getPgoosType().equals("R")) {
				filterValues.setPgoosStatus("R");
			}

		}
		if (filterValues.getPgoosType().equals("M") && !filterValues.getPgoosStatus().equals("H")) {
			/* A - Verifying and Assigning product code from Marsha */
			if (filterValues.getPgoosStatus().equals("A")) {
				pgoosPropagateProductService.accountRunMCBVerifyProdProcess(batchId, user);
				filterValues.setPgoosStatus("P");
				return batchId;
			}

			/* P - Sending the hotel amenity to Marsha */
			if (filterValues.getPgoosStatus().equals("P")) {
				pgoosPropagateProductService.accountRunMCBHotelProdProcess(batchId, user, prodIter);
				prodCount = pgoosPropagateProductService.hotelProductSize(prodIter);
				if (prodCount > 0) {
					filterValues.setPgoosStatus("P");
				}else if ( (filterValues.getSendProd().equals("P")) 
						  && !filterValues.getSendVrpe().equals("E") && !filterValues.getSendVrpx().equals("X") ){
							updatePgoosBatch(batchId, "DONE", "MCBLoad", user.getEid());
							filterValues.setPgoosStatus("D"); 
			    }else {
					filterValues.setPgoosStatus("H");
				}
				return batchId;
			}
		}
		if (filterValues.getPgoosStatus().equals("H") || filterValues.getPgoosType().equals("K") || filterValues.getPgoosType().equals("R")) {
			TransactionType transtype = null;
			if (filterValues.getPgoosType().equals("M")) {
				if (filterValues.getSendVrpa().equals("A")) {
					transtype = TransactionType.MCBVRPA;	
				} else if (filterValues.getSendVrpe().equals("E") && filterValues.getSendVrpx().equals("X")) {
					transtype = TransactionType.MCBVREX;
				} else if (filterValues.getSendVrpe().equals("E") && filterValues.getSendProd().equals("P")) {
					transtype = TransactionType.MCBVREP;
				} else if (filterValues.getSendVrpx().equals("X") && filterValues.getSendProd().equals("P")) {
					transtype = TransactionType.MCBVRXP;
				}  else if (filterValues.getSendVrpe().equals("E")) {
				transtype = TransactionType.MCBVRPE;
				} else if (filterValues.getSendVrpx().equals("X")) {
					transtype = TransactionType.MCBVRXK;
				} else if (filterValues.getSendProd().equals("P")) {
					transtype = TransactionType.MCBVRPP;
				}
			} else if (filterValues.getPgoosType().equals("K")) {
				transtype = TransactionType.MCBVRPK;
			} else if (filterValues.getPgoosType().equals("R")) {
				transtype = TransactionType.MCBVRPX;
			}
			pgoosPublishService.publishMCBBatch(batchId, user, transtype, filterValues.getByYear());
			filterValues.setPgoosStatus("C");
		}
		/* H - Sending the VRPE commands to HPP */
		/* Complete the batch update */
		if (filterValues.getPgoosStatus().equals("C")) {
			updatePgoosBatch(batchId, "DONE", "MCBLoad", user.getEid());
			filterValues.setPgoosStatus("D");
		}
		return batchId;

	}

	public Long getMCBCount() {
		return pgoosPropagateMgr.getMCBCount();
	}

	public void deleteMCBRecord(Long accountrecid, Long hotelid) {
		pgoosPropagateMgr.deleteMCBRecord(accountrecid, hotelid);
	}

	public void updatePgoosBatch(Long batchid, String status, String loadtype, String userid) {
		pgoosSetupManager.updatePgoosBatch(batchid, status, loadtype, userid);
	}

	public PgoosLoad findPgoosLoad() {
		return pgoosPropagateMgr.findPgoosLoad();
	}

}
