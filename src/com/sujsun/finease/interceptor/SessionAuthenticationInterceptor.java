package com.sujsun.finease.interceptor;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sujsun.finease.util.SessionUtil;

@Component
public class SessionAuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger log = Logger.getLogger( SessionAuthenticationInterceptor.class.getName() );
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean isSuccess = false;
		boolean hasSession = false;
		try {
			hasSession = new SessionUtil().checkSession( request, response );
			if( !hasSession ) {
				response.sendError( 403 ); 	// Forbidden Response Code = 403
			} else {
				isSuccess = true;
			}
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Exception in preHandle of SessionAuthenticationInterceptor. Exception message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		log.info( "SessionAuthenticationInterceptor: Intercepted reqeust for URL: " + request.getRequestURI() + "  Result: " + isSuccess );
		return isSuccess;
	}

}
