package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.user.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class CredentialInfo extends UsernamePasswordAuthenticationToken {
    private String name;
    private Object principal;

    public CredentialInfo(Object principal, Object credentials) {
        super(principal, credentials);
        this.principal = principal;
    }

    @Override
    public String getName() {
        User u = (User) principal;
        return u.getEid();
    }
}
