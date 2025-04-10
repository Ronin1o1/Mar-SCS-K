package com.marriott.rfp.dataacess.pricing.accountgrpmtgquestions.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountgrpmtgquestions.api.AccountGrpMtgQuestionsManager;
import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.object.user.User;

import oracle.jdbc.OracleConnection;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;

/**
 * Session Bean implementation class AccountManagerImpl
 */
@Service
public class AccountGrpMtgQuestionsManagerImpl implements AccountGrpMtgQuestionsManager {
	private static final Logger log = LoggerFactory.getLogger(AccountGrpMtgQuestionsManagerImpl.class);
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<AccountSpecQuestions> getQuestions(long accountrecid) {
	String queryString = "select gm_question question, gm_max_len max_len, q.gm_question_id question_id, gm_question_seq question_seq ,"
		+ " decode(a.hasrecs, '', 'N', 'Y') hasrecs, gm_edie_column_label edie_column_label , "
		+ "  qat.typeid, qat.typedescription"
		+ " FROM mfpdbo.group_mtgs_specific_questions q, "
		+ "(select count(*) hasrecs, gm_question_id from mfpdbo.group_mtgs_specific_answers where gm_answer is not null and gm_question_id in "
		+ " (select gm_question_id from mfpdbo.group_mtgs_specific_questions where  accountrecid=?1 "
		+ ")  group by gm_question_id) a ,  mfpdbo.question_answer_type qat WHERE (q.ACCOUNTRECID =?2  "
		+ ")   and a.gm_question_id(+)=q.gm_question_id AND qat.typeid(+) = decode(q.typeid,null,1, q.typeid) and q.gm_question_seq != 0 ORDER BY q.gm_question_seq ASC ";

	Query q = em.createNativeQuery(queryString, AccountSpecQuestions.class);
	q.setParameter(1, accountrecid);
	q.setParameter(2, accountrecid);
	@SuppressWarnings("unchecked")
	List<AccountSpecQuestions> accountList = q.getResultList();
	return accountList;
    }

    public void updateQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user) {
    	try {
    		 
    			 /*InitialContext initialContext = new InitialContext();

    				DataSource dataSource = (DataSource) initialContext.lookup("jdbc/MarRFP");
    				Connection connection = dataSource.getConnection();
    				Connection con = WSCallHelper.getNativeConnection(((WSJdbcConnection) connection));
*/    				
    				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
    				Connection con = (Connection) kem.getConnection();
				Connection conn = con.unwrap(OracleConnection.class);  /*Con replaced to conn - tomcat*/

    				
    				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
    			    audit.setAuditUser(con);
		
    			
    		    try {
    		    	ArrayDescriptor customAnswers;
    		    	ARRAY customAnswersArray;
    		    	customAnswers = ArrayDescriptor.createDescriptor("MFPPROC.OBJ_CUSTOM_ANSWERS", conn);  /*Con replaced to conn - tomcat*/

    			CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATE_GRPMTGSPECIFIC_QUE(?, ?, ?, ?, ?, ?, ?, ?, ?)}");
    			try {
    				Long seq = 0L;
    			    for (int i = 0; i < aq.size(); i++) {
    				if (aq.get(i).getQuestion_id() != 0)
    				    cstmt.setLong(1, aq.get(i).getQuestion_id());
    				else
    				    cstmt.setNull(1, Types.NUMERIC);

    				if (accountrecid!=null && accountrecid != 0)
    				    cstmt.setLong(2, accountrecid);
    				else
    				    cstmt.setNull(2, Types.NUMERIC);

    				cstmt.setString(3, aq.get(i).getQuestion());
    				if (((aq.get(i).getQuestion_seq() != null && aq.get(i).getQuestion_seq() != 0) &&
    						 (aq.get(i).getQuestion()!=null && !aq.get(i).getQuestion().equals("")) )
    						 || aq.get(i).getQuestion_id() != 0){
    					seq = seq+1;
    				    cstmt.setLong(4, seq);
    				}
    				else
    				    cstmt.setNull(4, Types.NUMERIC);
    				if (aq.get(i).getMax_len() != null)
    				    cstmt.setLong(5, aq.get(i).getMax_len());
    				else
    				    cstmt.setNull(5, Types.NUMERIC);
    				cstmt.setString(6, aq.get(i).getEdie_column_label());
    				if (aq.get(i).getTypeid() != null && aq.get(i).getTypeid() != 0)
    				    cstmt.setLong(7, aq.get(i).getTypeid());
    				else
    				    cstmt.setNull(7, Types.NUMERIC);
    				if(aq.get(i).getCustomAnswers() != null && aq.get(i).getCustomAnswers().size() != 0){
    					customAnswersArray = new ARRAY(customAnswers, conn, aq.get(i).getCustomAnswers().toArray()); /*Con replaced to conn - tomcat*/

    					cstmt.setArray(8, customAnswersArray);				
    				}
    				else{
    					customAnswersArray = new ARRAY(customAnswers, conn,null); /*Con replaced to conn - tomcat*/
    					 cstmt.setArray(8,customAnswersArray);
    				}
    				if ( aq.get(i).getAnsEdited() != null && aq.get(i).getAnsEdited().equals("Y") )
    					cstmt.setString(9, "Y");
    				else
    				    cstmt.setNull(9, Types.NUMERIC);
    				cstmt.execute();
    			    }
    			} catch (Exception e) {
					log.error(e.getMessage(),e);
    			} finally {
    			    cstmt.close();
    			}
    			audit.deleteAuditUser(con);
    		    } finally {
//    		    	connection.close();
    		    }

    		} catch (SQLException ex) {
    		    ex.printStackTrace();
    		} 
    		/*catch (NamingException e) {
    			e.printStackTrace();
    		}*/
    }
    
    public String saveExcelDataGMQues(ByteArrayInputStream byteArrayInputStream, Long accountrecid, long max_questions, User user) {
    	String impGrpMsg="";
    	int lastRow=0;
    	long rowCount=0;
    	boolean proceed=true;
    	List<AccountSpecQuestions> asqList;
    	AccountSpecQuestions asq;
    	try{
    		Workbook workbook = WorkbookFactory.create(byteArrayInputStream);
    		Sheet sheet = workbook.getSheetAt(0);
    		DataFormatter dataFormatter = new DataFormatter();
    		lastRow = sheet.getLastRowNum();
    		if (lastRow == 0){
    			impGrpMsg="The file is empty. No Details found";
    		}
    		if (lastRow > max_questions){
    			impGrpMsg="Total Number of questions should not be greater than "+max_questions;
    		}
    		if(impGrpMsg.equalsIgnoreCase("")){
    			Iterator<Row> rowIterator = sheet.rowIterator();
    			asqList = new ArrayList<AccountSpecQuestions>();
    			boolean col0Check, col1Check, col2Check, col3Check;
    			String col0Value, col1Value, col2Value, col3Value;
        	    while (rowIterator.hasNext()) {
        	    	col0Check=false; col1Check=false; col2Check=false; col3Check=false;
        	    	col0Value=""; col1Value=""; col2Value=""; col3Value="";
        	    	Row row = rowIterator.next();
        	    	if(rowCount != 0){
           	            Iterator<Cell> cellIterator = row.cellIterator();
           	    	    asq = new AccountSpecQuestions();
           	    	    asq.setQuestion_seq(rowCount);
           	    	    asq.setQuestion_id((long) 0);
           	            while (cellIterator.hasNext()) {
           	                Cell cell = cellIterator.next();
           	                if(cell.getColumnIndex() == 0){
           	                	col0Check=true;
           	                	col0Value = dataFormatter.formatCellValue(cell);
           	                }
           	                if(cell.getColumnIndex() == 1){
           	                	col1Check=true;
           	                	col1Value = dataFormatter.formatCellValue(cell);
        	                }
           	                if(cell.getColumnIndex() == 2){
           	                	col2Check=true;
           	                	col2Value = dataFormatter.formatCellValue(cell);
           	                }
           	                if(cell.getColumnIndex() == 3){
           	                	col3Check=true;
           	                	col3Value = dataFormatter.formatCellValue(cell);
           	                }
           	            }
           	            if(!col0Check){
           	            	impGrpMsg="Question is a required field";
           	            }
           	            if(impGrpMsg.equalsIgnoreCase("") && col0Value.length()==0){
           	            	impGrpMsg="Question is a required field";
           	            }
           	            if(impGrpMsg.equalsIgnoreCase("") && col0Value.length()>400){
           	            	impGrpMsg="Question can not be more than 400 characters";
        	            }
           	            if(impGrpMsg.equalsIgnoreCase("") && col1Check && col1Value.length()>70){
           	            	impGrpMsg="EDIE Excel Label can not be more than 70 characters";
           	            }
           	            if(impGrpMsg.equalsIgnoreCase("") && !col2Check){
           	            	if(col3Value.equalsIgnoreCase("Free Form") || col3Value.equalsIgnoreCase("Number")){
           	            		impGrpMsg="Answer Length must be between 1 and 255";
           	            	}
           	            }
           	            if(impGrpMsg.equalsIgnoreCase("") && col2Check){
           	            	if(col3Value.equalsIgnoreCase("Free Form") || col3Value.equalsIgnoreCase("Number") || col3Value.equalsIgnoreCase("")){
           	            		if(col2Value.length()>3){
           	            			impGrpMsg="Answer Length can not be more than 3 digits";
           	            		}
           	            		if(col2Value.equalsIgnoreCase("0") || col2Value.equalsIgnoreCase("00") || col2Value.equalsIgnoreCase("000")){
           	            			impGrpMsg="Answer Length must be between 1 and 255";
           	            		}
           	            		if(col2Value.length()==0){
           	            			impGrpMsg="Answer Length must be between 1 and 255";
           	            		}
           	            	}
           	            }
           	            if(!impGrpMsg.equalsIgnoreCase("")){
           	            	proceed=false;
           	            	break;
           	            }else{
           	            	asq.setQuestion(col0Value);
           	            	asq.setEdie_column_label(col1Value);
           	            	if(col3Value.equalsIgnoreCase("Free Form")){
           	            		asq.setTypeid((long) 1);
           	            	}else if(col3Value.equalsIgnoreCase("Number")){
           	            		asq.setTypeid((long) 2);
           	            	}else if(col3Value.equalsIgnoreCase("Date")){
           	            		asq.setTypeid((long) 3);
           	            		asq.setMax_len((long) 10);
           	            	}else if(col3Value.equalsIgnoreCase("Yes/No")){
           	            		asq.setTypeid((long) 4);
           	            		asq.setMax_len((long) 1);
           	            	}else if(col3Value.equalsIgnoreCase("Custom Answers")){
           	            		asq.setTypeid((long) 5);
           	            		asq.setMax_len(null);
           	            	}else{
           	            		asq.setTypeid((long) 1);
           	            	}
           	            	if(col3Value.equalsIgnoreCase("Free Form") || col3Value.equalsIgnoreCase("Number")){
           	            		try{
           	            			asq.setMax_len(Long.parseLong(col2Value));
           	            		}catch(NumberFormatException e){
           	            			impGrpMsg="Answer Length should be number";
									log.error(e.getMessage(),e);
           	            		}
           	            	}
           	            	if(!impGrpMsg.equalsIgnoreCase("")){
           	            		proceed=false;
           	            		break;
           	            	}else{
           	            		asqList.add(asq);
           	            	}
           	            }
        	    	}
        	    	rowCount += 1;
       	        }
        	    if(proceed){
        	    	updateQuestions(asqList, accountrecid, user);
        	    }
    		}
    	}catch (IOException ie) {
    		impGrpMsg = "Error parsing Excel file";
			log.error(ie.getMessage(),ie);
    	}catch (InvalidFormatException ife) {
    		impGrpMsg = "Invalid format exception occured while parsing Excel file";
			log.error(ife.getMessage(),ife);
    	}catch (Exception e) {
			log.error(e.getMessage(),e);
		}
    	return impGrpMsg;
    }

}
