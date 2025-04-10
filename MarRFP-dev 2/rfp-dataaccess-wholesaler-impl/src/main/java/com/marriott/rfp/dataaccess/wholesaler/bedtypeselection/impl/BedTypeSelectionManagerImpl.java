package com.marriott.rfp.dataaccess.wholesaler.bedtypeselection.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.bedtypeselection.api.BedTypeSelectionManager;
import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.wholesaler.bedtypeselection.BedTypeSelection;

/**
 * Session Bean implementation class BedTypeSelectionManager
 */

@Service
public class BedTypeSelectionManagerImpl implements BedTypeSelectionManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	
	public BedTypeSelectionManagerImpl() { }

	@SuppressWarnings("unchecked")
	public List<BedTypeSelection> findAllBedTypes() {

		List<BedTypeSelection> retBed = new ArrayList<BedTypeSelection>();
		String queryString = "select combo_id from mfpdbo.ws_bedtype_combo order by combo_id ";

		Query q = em.createNativeQuery(queryString, BedTypeSelection.class);
		List<BedTypeSelection> allBedTypeSelectionList = q.getResultList();
		for (int i = 0; i < allBedTypeSelectionList.size(); i++) {
			BedTypeSelection bedTypeselection = allBedTypeSelectionList.get(i);
			bedTypeselection.setBedtype(findBedTypeByComboId(bedTypeselection
					.getCombo_id()));
		}

		BedTypeSelection bedEmpty = new BedTypeSelection();
		bedEmpty.setCombo_id(0);
		bedEmpty.setBedtype("");
		bedEmpty.setBedtype_id(0);
		retBed.add(bedEmpty);

		for (BedTypeSelection bedSel : allBedTypeSelectionList) {
			retBed.add(bedSel);
		}
		return retBed;
	}

	@SuppressWarnings("unchecked")
	public List<BedTypeSelection> findBedTypeByParticipationId(
			long participationid) {

		String queryString = "select bedtype_id,combo_id from mfpdbo.ws_bedtype where participation_id = ?1";

		Query q = em.createNativeQuery(queryString, BedTypeSelection.class);
		q.setParameter(1, participationid);
		List<BedTypeSelection> bedTypeSelectionList = q.getResultList();
		for (int i = 0; i < bedTypeSelectionList.size(); i++) {
			BedTypeSelection bedTypeselection = bedTypeSelectionList.get(i);
			bedTypeselection.setBedtype(findBedTypeByComboId(bedTypeselection.getCombo_id()));
			bedTypeselection.setBedtype_ref_id(findRefIdByComboId(bedTypeselection.getCombo_id()));
			bedTypeselection.setHasRates(hasRates(bedTypeselection.getBedtype_id()));
		}

		return bedTypeSelectionList;

	}

	@SuppressWarnings("unchecked")
	private String findBedTypeByComboId(long comboid) {
		String strBedType = "";
		String queryString = "select a.bedtype from mfpdbo.ws_bedtype_ref a, mfpdbo.ws_bedtype_validcombo b"
				+ " where b.combo_id= ?1 and a.bedtype_ref_id=b.bedtype_ref_id order by b.bedtype_seq";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, comboid);
		List<String> strBedTypeList = q.getResultList();
		for (int i = 0; i < strBedTypeList.size(); i++) {
			strBedType += (String) strBedTypeList.get(i) + ",";
		}
		
		return strBedType.substring(0, strBedType.length() - 1);

	}

	@SuppressWarnings("unchecked")
	private String findRefIdByComboId(long comboid) {
		String strRefId = "";
		String queryString = "select a.bedtype_ref_id from mfpdbo.ws_bedtype_ref a, mfpdbo.ws_bedtype_validcombo b"
				+ " where b.combo_id = ?1 and a.bedtype_ref_id=b.bedtype_ref_id order by b.bedtype_seq";
		
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, comboid);
		List<Long> strBedTypeList = q.getResultList();

		for (int i = 0; i < strBedTypeList.size(); i++) {
			strRefId += ((Long) strBedTypeList.get(i)).toString() + ",";
		}

		return strRefId.substring(0, strRefId.length() - 1);

	}

	public boolean hasRates(long bedtypeid) {
		boolean b = false;
		String queryString = "select count(*) from mfpdbo.ws_rates where bedtype_id = ?1";
		Query q = em.createNativeQuery(queryString, Integer.class);
		q.setParameter(1, bedtypeid);
		Integer IntCl = (Integer) q.getSingleResult();
		int cnt = IntCl.intValue();
		if (cnt > 0) {
			b = true;
		}
		return b;
	}

	public String getCurrency(long wsid) {
		String queryString = "SELECT NVL(A.CURRENCYNAME,' ') CURRENCYNAME "
				+ "FROM MFPDBO.CURRENCY_REF A, MFPDBO.WS_PARTICIPATION B "
				+ "WHERE (A.CURRENCYCODE = B.CURRENCYCODE) "
				+ "AND B.PARTICIPATION_ID = ?1";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, wsid);
		String strCurrency = (String) q.getSingleResult();
		return strCurrency;
	}

	public void updateBedTypeSelection(	BedTypeSelection bedTypeSelection, long participationid, boolean changed, String role,
			boolean isPeriodExpired, String loginName) {

		CallableStatement stmt;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				String strChanged = changed ? "Y" : "N";
				stmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATEBEDTYPE(?,?," + bedTypeSelection.isHasRates() + ",?,?,?," + isPeriodExpired + "); end; ");
				
				try {
					stmt.setLong(1, Long.parseLong(bedTypeSelection.getBedtype()));
					stmt.setLong(2, participationid);
					stmt.setLong(3, Long.parseLong(bedTypeSelection.getbTOrig()));
					stmt.setString(4, strChanged);
					stmt.setString(5, role);
					stmt.execute();
				} finally {
					stmt.close();
				}

				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}
	
	public void updateWSCurrency(long wsid, CurrencyData currency, String loginName) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATECURRENCY(?,?); end;");
				try {
					stmt.setLong(1, wsid);
					stmt.setString(2, currency.getCurrencycode());
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
				
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

	}

	public List<BedTypeSelection> findBedTypeByParticipationIdWithoutComma(long participationid) {
		List<BedTypeSelection> bedTypeListTemp = findBedTypeByParticipationId(participationid);
		List<BedTypeSelection> bedtypes = new ArrayList<BedTypeSelection>();

		if (bedTypeListTemp != null && bedTypeListTemp.size() > 0) {
			BedTypeSelection bedTypeSelect = (BedTypeSelection) bedTypeListTemp.get(0);
			long bedType_id = bedTypeSelect.getBedtype_id();
			String strBedType = bedTypeSelect.getBedtype();
			String strBedRefid = bedTypeSelect.getBedtype_ref_id();
			if (!strBedType.equals("")) {
				StringTokenizer st = new StringTokenizer(strBedType, ",");
				StringTokenizer st1 = new StringTokenizer(strBedRefid, ",");
				if (st.countTokens() > 0) {
					while (st.hasMoreTokens()) {
						BedTypeSelection bedTypeSelectTemp = new BedTypeSelection();
						bedTypeSelectTemp.setBedtype_id(bedType_id);
						bedTypeSelectTemp.setBedtype(st.nextToken().trim());
						bedTypeSelectTemp.setBedtype_ref_id(st1.nextToken().trim());
						bedtypes.add(bedTypeSelectTemp);
					}
				}
			}
		}

		return bedtypes;

	}

}