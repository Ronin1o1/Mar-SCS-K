package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSpecQuestionsManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfoQuestionStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountSpecQuestionsManagerImpl implements HotelAccountSpecQuestionsManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetail(long hotel_accountinfoid) {

		String queryString = "select a.question_id questionid, a.question, nvl(a.max_len, 255) max_len, b.answer, decode(a.typeid,null,1,typeid) typeid, a.question_seq "
				+ " from mfpdbo.account_specific_questions a , (select answer, question_id from mfpdbo.account_specific_answers "
				+ " where hotel_accountinfoid = ?1) b, mfpdbo.hotel_accountinfo ha  where a.question_id = b.question_id(+) AND ha.accountrecid = a.accountrecid AND ha.hotel_accountinfoid =?2 order by a.question_seq";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecQandA.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotel_accountinfoid);
		List<HotelAccountSpecQandA> questList = q.getResultList();
		String queryStr ="select c.answers from mfpdbo.account_qn_custom_answers c where c.question_id= ?1 and c.answers is not null";
		Query query = em.createNativeQuery(queryStr, String.class);
		
		String selectedAns ="select c.answer from mfpdbo.account_specific_answers c where c.question_id= ?1 and c.hotel_accountinfoid =?2 and c.answer is not null";
		Query querySelectedAns = em.createNativeQuery(selectedAns, String.class);
		for(int i =0 ; i < questList.size(); i++){
			query.setParameter(1, questList.get(i).getQuestionid());
			questList.get(i).setCustomAnswers(query.getResultList());
			querySelectedAns.setParameter(1, questList.get(i).getQuestionid());
			querySelectedAns.setParameter(2, hotel_accountinfoid);			
			if(querySelectedAns.getResultList().size()>0){
			questList.get(i).setSelectedAns((String) querySelectedAns.getResultList().get(0) );
			}
		}
		return questList;
	}

	@SuppressWarnings("unchecked")
	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetail(long hotel_accountinfoid) {

		String queryString = "select a.gm_question_id questionid, a.gm_question question, nvl(a.gm_max_len, 255) max_len, b.gm_answer answer, decode(a.typeid,null,1,typeid) typeid, a.gm_question_seq question_seq "
				+ " from mfpdbo.group_mtgs_specific_questions a,"
				+ "(select gm_answer, gm_question_id from mfpdbo.group_mtgs_specific_answers 		where hotel_accountinfoid = ?1 "
				+ ") b , mfpdbo.hotel_accountinfo c  where a.gm_question_id = b.gm_question_id (+)" + "	AND c.accountrecid = a.accountrecid AND c.hotel_accountinfoid =?2 order by a.gm_question_seq";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecQandA.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotel_accountinfoid);
		List<HotelAccountSpecQandA> questList = q.getResultList();
		String queryStr ="select c.answers from mfpdbo.account_grp_qn_custom_answers c where c.question_id= ?1 and c.answers is not null";
		Query query = em.createNativeQuery(queryStr, String.class);
		
		String selectedAns ="select c.GM_ANSWER from mfpdbo.group_mtgs_specific_answers c where c.GM_QUESTION_ID= ?1 and c.hotel_accountinfoid =?2 and c.GM_ANSWER is not null";
		Query querySelectedAns = em.createNativeQuery(selectedAns, String.class);
		for(int i =0 ; i < questList.size(); i++){
			query.setParameter(1, questList.get(i).getQuestionid());
			questList.get(i).setCustomAnswers(query.getResultList());
			querySelectedAns.setParameter(1, questList.get(i).getQuestionid());
			querySelectedAns.setParameter(2, hotel_accountinfoid);			
			if(querySelectedAns.getResultList().size()>0){
			questList.get(i).setSelectedAns((String) querySelectedAns.getResultList().get(0) );
			}
		}
		return questList;
	}

	public HotelAccountInfoQuestionStatus findAccountSpecQuestionsModifiable(long hotel_accountinfoid) {

		String queryString = "SELECT mfpproc.fn_ishotelaccountlocked (a.hotel_accountinfoid) locked, " + " DECODE (c.allow_qmods,'Y', CASE WHEN     TRUNC (c.startqmoddate) <= TRUNC (SYSDATE) "
				+ " AND TRUNC (c.endqmoddate) >= TRUNC (SYSDATE) AND mfpproc.fn_ishotelaccountlocked (a.hotel_accountinfoid) = 'Y' "
				+ " THEN 'Y' ELSE 'N' END, 'N') answersModifiable  FROM mfpdbo.hotel_accountinfo a, mfpdbo.account c " + " WHERE (a.accountrecid = c.accountrecid) AND (a.hotel_accountinfoid = ?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountInfoQuestionStatus.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountInfoQuestionStatus questStatus = (HotelAccountInfoQuestionStatus) q.getSingleResult();
		return questStatus;
	}

	public void updateAccountSpecAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_update_accountspecific_ans(?,?,?); end; ");
				try {

					for (int i = 0; i < answerList.size(); i++) {
						if (answerList.get(i) != null) {
							String answer = answerList.get(i).getAnswer();
							if (answer != null){
								answer = answer.replace("////", "'");
							}
							stmt.setLong(1, hotel_accountinfoid);
							stmt.setLong(2, answerList.get(i).getQuestionid());
							stmt.setString(3, answer);
							stmt.execute();
						}
					}
					stmt=con.prepareCall("begin update mfpdbo.hotel_accountinfo set tabquest_status='C' where hotel_accountinfoid=?; end;");
					stmt.setLong(1, hotel_accountinfoid);
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

	public void updateAccountSpecGroupAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_update_acctgrpmtgspc_ans(?,?,?); end; ");
				try {

					for (int i = 0; i < answerList.size(); i++) {
						if (answerList.get(i) != null) {
							stmt.setLong(1, hotel_accountinfoid);
							stmt.setLong(2, answerList.get(i).getQuestionid());
							stmt.setString(3, answerList.get(i).getAnswer());
							stmt.execute();
						}
					}
					//PBI000000021956  - Starts
					stmt=con.prepareCall("begin update mfpdbo.hotel_accountinfo set tabgroup_status='C' where hotel_accountinfoid=?; end;");
					stmt.setLong(1, hotel_accountinfoid);
					stmt.execute();
					//PBI000000021956  - Ends
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
	
	public Long getHotelAccountProductInfo(long hotel_accountinfoid){
        String queryString = "SELECT RATETYPE_SELECTED FROM MFPDBO.HOTEL_ACCOUNTINFO WHERE HOTEL_ACCOUNTINFOID= ?1";
        Query q = em.createNativeQuery(queryString, String.class);
        q.setParameter(1, hotel_accountinfoid);
        Long hotelAccountInfo = (Long) q.getSingleResult();
        return hotelAccountInfo;
    }

}
