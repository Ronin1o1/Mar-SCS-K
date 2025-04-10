package com.marriott.rfp.webapp.security;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.travelspending.api.TravelSpendingService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.roomdef.RoomDefLinks;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.webapp.dto.CredentialInfo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * This filter only do authentication and the authorization is done by the MarrfpAuthorizationAspect
 */
@Component
public class MarrfpAuthenticationFilter extends OncePerRequestFilter {

    public static final String EMPTY = "";
    private static final Log log = LogFactory.getLog(MarrfpAuthenticationFilter.class);
    private static final String USERNAME = "iv-user";
    private static final String RFPROLE = "rfprole";
    private static final String SESSION_CREDENTIALINFO = "session_credentialinfo";
    public static final String USERPROPERTIES = "userproperties";
    public static final String SSL_SOCKET_FACTORY_PROVIDER = "ssl.SocketFactory.provider";
    public static final String SUN_SECURITY_SSL_SSLSOCKET_FACTORY_IMPL = "sun.security.ssl.SSLSocketFactoryImpl";
    public static final String SSL_SERVER_SOCKET_FACTORY_PROVIDER = "ssl.ServerSocketFactory.provider";
    public static final String SUN_SECURITY_SSL_SSLSERVER_SOCKET_FACTORY_IMPL = "sun.security.ssl.SSLServerSocketFactoryImpl";
    public static final String JAVAX_NET_SSL_TRUST_STORE = "javax.net.ssl.trustStore";
    public static final String JAVAX_NET_SSL_TRUST_STORE_SECRET = "javax.net.ssl.trustStorePassword";
    public static final String TRUST_STORE_PATH = "trustStorePath";
    public static final String TRUST_STORE_SECRET = "trustStorePassword";

    @Autowired
    private UserService userService;

    @Autowired
    private ConstantsService constantsService;

    @Autowired
    private TravelSpendingService travelSpendingService;

    private RoomDefLinks roomDefLinks;


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        CredentialInfo credentialInfo = null;
        HttpSession session = httpServletRequest.getSession();
        if (session != null && session.getAttribute(SESSION_CREDENTIALINFO) != null) {
            credentialInfo = (CredentialInfo) session.getAttribute(SESSION_CREDENTIALINFO);
            httpServletRequest.setAttribute(USERPROPERTIES, credentialInfo.getPrincipal());
            SecurityContextHolder.getContext().setAuthentication(credentialInfo);
        } else {
            User authenticate = authenticate(httpServletRequest);
            if (authenticate != null) {
                credentialInfo = new CredentialInfo(authenticate, "");
                SecurityContextHolder.getContext().setAuthentication(credentialInfo);
                HttpSession newSession = httpServletRequest.getSession(true);
                httpServletRequest.setAttribute(USERPROPERTIES, authenticate);
                newSession.setAttribute(SESSION_CREDENTIALINFO, credentialInfo);
            } else {
                SecurityContextHolder.getContext().setAuthentication(null);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    public User authenticate(HttpServletRequest request) {
        // Get the username and password submitted by the user from the
        // HttpRequest.
        String username = "";
        String rfprole = "";
        log.error("User ::" + request.getHeader(USERNAME));
        if (request.getHeader(USERNAME) != null) {
            username = request.getHeader(USERNAME);
        }
        if (request.getHeader(RFPROLE) != null) {
            rfprole = request.getHeader(RFPROLE);
        }
        if (username == null || username.equals(EMPTY) || rfprole == null || rfprole.equals(EMPTY)) {
            return null;
        }

        User user = userService.findUser(username);
        if (user != null) { // The user has successfully logged in. Store their
            // user object in their HttpSession. Then return
            // true.
            user.setTravelspendingList(travelSpendingService.findAllQuarters());
            user.setEpicUrl(constantsService.getEpicUrl());
            user.setInfoHubUrl(constantsService.getInfoHubUrl());
            user.setMarrformsUrl(constantsService.getMarrFormsUrl());
            user.setShowPricing(constantsService.getShowPricing());
            //Upgrade - copy doesn't retain userProperties/roomDefLinks.
            roomDefLinks = constantsService.getRoomDefLinks();
            if (user.getIsPASAdmin()) {
                HttpSession session = request.getSession();
                java.security.Security.setProperty(SSL_SOCKET_FACTORY_PROVIDER, SUN_SECURITY_SSL_SSLSOCKET_FACTORY_IMPL);
                java.security.Security.setProperty(SSL_SERVER_SOCKET_FACTORY_PROVIDER, SUN_SECURITY_SSL_SSLSERVER_SOCKET_FACTORY_IMPL);
                ServletContext ctx = session.getServletContext();
                System.setProperty(JAVAX_NET_SSL_TRUST_STORE, ctx.getRealPath(ctx.getInitParameter(TRUST_STORE_PATH)));
                System.setProperty(JAVAX_NET_SSL_TRUST_STORE_SECRET, ctx.getInitParameter(TRUST_STORE_SECRET));
            }

        }
        return user;
    }

}
