package com.sujsun.finease.controllers;

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
import com.sujsun.finease.services.ContactService;
import com.sujsun.finease.services.SessionService;

@Controller
@RequestMapping( value="/service/session" )
public class SessionController {
	
	private static final Logger log = Logger.getLogger( SessionController.class.getName() );
	
	@RequestMapping( method=RequestMethod.GET )
	public @ResponseBody Object getSession( @RequestParam( value="attribute" ) String attribute, HttpServletRequest request, HttpServletResponse response ) {
		return new SessionService().get( attribute, request, response );
	}

}
