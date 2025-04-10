package com.marriott.rfp.webapp.dto;

public class UserAdminAccess {
    String userRole;
    String userRoleDescription;
    String userActionNamespace;

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserRoleDescription() {
        return userRoleDescription;
    }

    public void setUserRoleDescription(String userRoleDescription) {
        this.userRoleDescription = userRoleDescription;
    }

    public String getUserActionNamespace() {
        return userActionNamespace;
    }

    public void setUserActionNamespace(String userActionNamespace) {
        this.userActionNamespace = userActionNamespace;
    }
}
