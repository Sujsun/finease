package com.sujsun.finease.interceptor;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sujsun.finease.controllers.viewMappings.RegistrationViewMapping;
import com.sujsun.finease.util.SessionUtil;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger log = Logger.getLogger( AuthenticationInterceptor.class.getName() );
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean isSuccess = false;
		boolean hasSession = false;
		try {
			hasSession = new SessionUtil().checkSession( request, response );
			if( !hasSession ) {
				response.sendRedirect( "/login" );
			}
			isSuccess = hasSession;
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Exception in preHandle of AuthenticationInterceptor. Exception message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		log.info( "AuthenticationInterceptor: Intercepted reqeust for URL: " + request.getRequestURI() + "  Result: " + isSuccess );
		return isSuccess;
	}
	
}