package com.marriott.rfp.dataaccess.wholesaler.charges.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.charges.api.ChargesManager;
import com.marriott.rfp.object.wholesaler.charges.Charges;

/**
 * Session Bean implementation class ChargesManagerImpl
 */

@Service
public class ChargesManagerImpl implements ChargesManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public ChargesManagerImpl() { }

	@SuppressWarnings("unchecked")
	public List<Charges> findAllCharges() {
		String queryString = "select charges_ref,charges_ref_id from mfpdbo.ws_charges_room_ref order by charges_ref_seq";
		Query q = em.createNativeQuery(queryString, Charges.class);
		List<Charges> chargesList = q.getResultList();
		return chargesList;
	}

	@SuppressWarnings("unchecked")
	public List<Charges> findAdditionalCharges(long participationid) {
		String queryString = "select charges_id,tax_included,tax_rate,breakfast_included, "
				+ "add_charge_room,nvl(charges_ref_id_room,0)charges_ref_id_room,add_charge_level,"
				+ "nvl(charges_ref_id_level,0) charges_ref_id_level, trim(add_charge_desc) add_charge_desc "
				+ "from mfpdbo.ws_charges where participation_id = ?";
		Query q = em.createNativeQuery(queryString, Charges.class);
		q.setParameter(1, participationid);
		List<Charges> chargesList = q.getResultList();
		return chargesList;
	}

	public void updateCharges(Charges charges, boolean bUpdate, long wsid, String loginName) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATECHARGES(?,?,?,?,?,?,?,?,?,?," + bUpdate + "); end; ");
				try {
					stmt.setLong(1, charges.getCharges_id());
					stmt.setLong(2, wsid);
					stmt.setObject(3, String.valueOf(charges.getTax_included()), Types.CHAR);
					stmt.setFloat(4, charges.getTax_rate());
					stmt.setObject(5, String.valueOf(charges.getBreakfast_included()), Types.CHAR);
					stmt.setFloat(6, charges.getAdd_charge_room());
					stmt.setLong(7, charges.getCharges_ref_id_room());
					stmt.setFloat(8, charges.getAdd_charge_level());
					stmt.setLong(9, charges.getCharges_ref_id_level());
					stmt.setString(10, (charges.getAdd_charge_desc()));
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

}