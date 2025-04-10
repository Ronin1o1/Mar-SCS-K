package com.marriott.rfp.webapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableAspectJAutoProxy
public class MarrfpSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static String MARRFP_SOAP_SERVICES = "/services/**";
    private static String[] SERVICES_AUTH_NOT_REQ = {MARRFP_SOAP_SERVICES};
    @Autowired
    private UserDetailsService marrfpUserDetailsService;

    @Autowired
    private MarrfpAuthenticationFilter marrfpAuthenticationFilter;

    @Autowired
    private MarrfpAuthenticationEntryPoint marrfpAuthenticationEntryPoint;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(SERVICES_AUTH_NOT_REQ);

    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable().cors().disable()
                .authorizeRequests().antMatchers( "/script/**","/swagger*/**", "/v2/**", "/webjars/**","services/**").permitAll()
                .antMatchers("/**").authenticated().and()
                .exceptionHandling().authenticationEntryPoint(marrfpAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()
                .addFilterBefore(marrfpAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(marrfpUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder() {
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return true;
            }
        };
    }
}
