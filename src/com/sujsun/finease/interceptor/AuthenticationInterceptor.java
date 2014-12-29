package com.sujsun.finease.interceptor;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sujsun.finease.controllers.viewMappings.RegistrationViewMapping;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger log = Logger.getLogger( RegistrationViewMapping.class.getName() );
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean isSuccess = false;
		log.info( "AuthenticationInterceptor: Request intercepted for URL : " + request.getRequestURI() );
		isSuccess = true;
		log.info( "AuthenticationInterceptor: Returning : " + isSuccess );
		return isSuccess;
	}
}