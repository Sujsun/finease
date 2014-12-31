package com.sujsun.finease.controllers;

import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.services.AuthenticationService;
import com.sujsun.finease.services.ContactService;

@Controller
@RequestMapping( value="" )
public class AuthenticationController {
	
	private static final Logger log = Logger.getLogger( AuthenticationController.class.getName() );
	
	@RequestMapping( value="login", method=RequestMethod.POST )
	public String authenticate( @RequestParam( value="authenticationBy" ) String authenticationBy, @RequestParam( value="login" ) String login, @RequestParam( value="password", required = false ) String password, HttpServletRequest request, HttpServletResponse response ) {
		return new ContactService().autheticate( authenticationBy, login, password, request, response );
	}
	
	@RequestMapping( value="logout", method=RequestMethod.GET )
	public String logout( HttpServletRequest request, HttpServletResponse response ) {
		return new AuthenticationService().logout( request, response );
	}

}
