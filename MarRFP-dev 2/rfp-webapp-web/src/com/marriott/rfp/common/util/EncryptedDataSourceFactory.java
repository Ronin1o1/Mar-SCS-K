package com.marriott.rfp.common.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Enumeration;
import java.util.Hashtable;

import javax.crypto.NoSuchPaddingException;
import javax.naming.Context;
import javax.naming.Name;
import javax.naming.RefAddr;
import javax.naming.Reference;
import javax.naming.StringRefAddr;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zaxxer.hikari.HikariJNDIFactory;

public class EncryptedDataSourceFactory extends HikariJNDIFactory {

	private static final Logger log = LoggerFactory.getLogger(EncryptedDataSourceFactory.class);
	
	private Encryptor encryptor = null;

	public EncryptedDataSourceFactory() {
		try {
            encryptor = new Encryptor(); // If you've used your own secret key, pass it in...
        } catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | UnsupportedEncodingException e) {
            log.error("Error instantiating decryption class.", e);
            throw new RuntimeException(e);
        }
	}

	@Override
	synchronized public Object getObjectInstance(Object obj, Name name, Context nameCtx, Hashtable<?, ?> environment)
			throws Exception {

		if (obj instanceof Reference) {			
			setPassword((Reference) obj);
		}
		return super.getObjectInstance(obj, name, nameCtx, environment);
	}

	private void setPassword(Reference ref) throws Exception {

		boolean findDecryptAndReplace = findDecryptAndReplace("dataSource.password", ref);
		if (!findDecryptAndReplace) {
			findDecryptAndReplace = findDecryptAndReplace("password", ref);
		}

		if (!findDecryptAndReplace) {
			String error = String.format("The \"password\" name/value pair was not found in the Reference object [%s]",
					ref.toString());

			throw new Exception(error);
		}

	}

	private boolean findDecryptAndReplace(String refName, Reference ref) throws Exception {
		boolean isFind = false;

		int idx = findIndexByRefName(refName, ref);
		if (idx != -1) {
			String decrypted = decrypt(idx, ref);
			replace(idx, refName, decrypted, ref);
			isFind = true;
		}

		return isFind;
	}

	private void replace(int idx, String refName, String newValue, Reference ref) {
		ref.remove(idx);
		ref.add(idx, new StringRefAddr(refName, newValue));
	}

	private String decrypt(int idx, Reference ref) throws Exception {
		String encrypted = ref.get(idx).getContent().toString();
		log.info("Encrypting password");
		return encryptor.decrypt(encrypted);
	}

	private int findIndexByRefName(String refName, Reference ref) {
		Enumeration<RefAddr> enu = ref.getAll();
		for (int i = 0; enu.hasMoreElements(); i++) {
			RefAddr addr = enu.nextElement();
			if (addr.getType().compareTo(refName) == 0)
				return i;
		}

		return -1;
	}
}
