package com.marriott.rfp.common.util;

import com.marriott.rfp.dataacess.pricing.accountregistration.impl.AccountRegistrationManagerImpl;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JasyptEncryptor {

	private static final Logger log = LoggerFactory.getLogger(JasyptEncryptor.class);

	public static void main(String[] args) {
	    StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
	    encryptor.setPassword("rmadb");   
	    encryptor.setAlgorithm("PBEWithMD5AndDES");
	    String encryptedText = encryptor.encrypt("pass word goes here");
	    log.info("Encrypted text is: " + encryptedText);

	    StandardPBEStringEncryptor decryptor = new StandardPBEStringEncryptor();
	    decryptor.setPassword("rmadb");  
	    String decryptedText = decryptor.decrypt(encryptedText);
	    log.info("Decrypted text is: " + decryptedText);
	    }
}
