package com.marriott.rfp.webapp.security.aop;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.user.User;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * This Aspect will intercept before and after of a method which class is annotated with com.marriott.rfp.annotation.Security
 * And the method which is annotated with any of the @org.springframework.web.bind.annotation.RequestMapping,@org.springframework.web.bind.annotation.GetMapping,
 *
 * @org.springframework.web.bind.annotation.PostMapping,@org.springframework.web.bind.annotation.PutMapping,@org.springframework.web.bind.annotation.DeleteMapping annotations,
 * Other wise the method will be skipped from the Authorization.
 */
@Aspect
@Component
public class MarrfpAuthorizationAspect {
    private static final Log log = LogFactory.getLog(MarrfpAuthorizationAspect.class);
    public static final String ACCOUNTRECID = "accountrecid";
    private static final String ERROR_KEY = "Error : ";
    private static final String NO_PRIVILEGES = "No privileges";
    public static final String HOTEL_ACCOUNTINFOID = "hotel_accountinfoid";
    public static final String MARSHA_CODE = "marshaCode";
    public static final String HOTELID = "hotelid";
    public static final String USERPROPERTIES = "userproperties";
    @Autowired
    private UserService userService;
    @Autowired
    HttpServletRequest request;

    /*@RequestMapping
    @Pointcut("execution(public * *(..))")
    public void publicMethod() {
    }*/

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void requestMapping() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void getMapping() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void postMapping() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PutMapping)")
    public void putMapping() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.DeleteMapping)")
    public void deleteMapping() {
    }

    @Pointcut("within(@com.marriott.rfp.annotation.Security *)")
    private void classAnnotatedWithSecurity() {

    }

    @Pointcut("classAnnotatedWithSecurity() && (requestMapping() || getMapping() || postMapping() || putMapping() || deleteMapping())")
    public void publicMethodInsideAClassMarkedWithSecurity() {
    }

    @Around("publicMethodInsideAClassMarkedWithSecurity()")
    public Object processMethodsAnnotatedWithProjectSecuredAnnotation(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Security secAnnotation = signature.getMethod().getDeclaringClass().getAnnotation(Security.class);
        User principal = (User) request.getAttribute(USERPROPERTIES);
        if (!processPermission(principal, secAnnotation)) {
            throw new AccessDeniedException(ERROR_KEY + NO_PRIVILEGES);
        }
        return joinPoint.proceed();
    }


    private boolean processPermission(User userProperties, Security security) throws SecurityException, NoSuchMethodException {
        boolean hasPermission = processActionPermission(security, userProperties);
        if (hasPermission)
            hasPermission = processAttributePermission(userProperties);
        return hasPermission;
    }

    private boolean processAttributePermission(User userProperties) {
        boolean hasPermission = true;
        if (userProperties.getIsAdminRole())
            return true;
        if (hasPermission && (userProperties.getHasLimitedHotels() || userProperties.getHasLimitedAccounts())) {
            String strhotel_accountinfoid = request.getParameter(HOTEL_ACCOUNTINFOID);
            Long hotel_accountinfoid = null;
            if (strhotel_accountinfoid != null && !strhotel_accountinfoid.equals(""))
                hotel_accountinfoid = Long.valueOf(strhotel_accountinfoid);
            if (hotel_accountinfoid != null && !hotel_accountinfoid.equals(0))
                hasPermission = userService.verifyUserHotelAccountinfoidAccess(hotel_accountinfoid, userProperties);

        } else {
            if (hasPermission && userProperties.getHasLimitedHotels()) {
                String marshacode = (String) request.getParameter(MARSHA_CODE);
                if (marshacode != null && !marshacode.equals(""))
                    hasPermission = userService.verifyUserHotelAccess(marshacode, userProperties);
                else {
                    String strhotelid = request.getParameter(HOTELID);
                    Long hotelid = null;
                    if (strhotelid != null && strhotelid.equals(""))
                        hotelid = Long.valueOf(strhotelid);
                    if (hotelid != null && !hotelid.equals(0))
                        hasPermission = userService.verifyUserHotelAccess(hotelid, userProperties);

                }
            }
            if (hasPermission && userProperties.getHasLimitedAccounts()) {
                String straccountrecid = request.getParameter(ACCOUNTRECID);
                Long accountrecid = null;
                if (straccountrecid != null && !straccountrecid.equals(""))
                    accountrecid = Long.valueOf(straccountrecid);
                if (accountrecid != null && !accountrecid.equals(0))
                    hasPermission = userService.verifyUserHotelAccess(accountrecid, userProperties);
            }
        }
        return hasPermission;
    }

    private boolean processActionPermission(Security secAnnotation, User userProperties) throws SecurityException, NoSuchMethodException {
        boolean hasPermission = false;
        String[] secValue = secAnnotation.value();
        for (int i = 0; i < secValue.length; i++) {
            if (secValue[i].equals(userProperties.getRole())) {
                hasPermission = true;
                break;
            }
        }
        return hasPermission;
    }
}
