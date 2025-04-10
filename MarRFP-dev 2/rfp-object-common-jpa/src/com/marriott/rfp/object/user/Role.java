package com.marriott.rfp.object.user;

import java.io.Serializable;

public class Role implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String role;

    public void setRole(String role) {
	this.role = role;
    }

    public String getRole() {
	return role;
    }
}
