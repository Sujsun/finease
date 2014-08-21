package com.sujsun.finease.controllers;

import java.util.Map;
import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sujsun.finease.mode.ApplicationMode;
import com.sujsun.finease.mode.UrlMode;

@Controller
@RequestMapping( value="services/0.1/account" )
public class AccountController {
	
	private static final Logger log = Logger.getLogger( AccountController.class.getName() );
	
	@RequestMapping( method=RequestMethod.POST )
	public @ResponseBody Map<String, Object> createAccount( @RequestBody String requestBody ) {
		return null;
	}
	
	@RequestMapping( method=RequestMethod.GET )
	public @ResponseBody Map<String, Object> getAccount( @RequestBody String requestBody ) {
		System.out.println( UrlMode.getCMSContactUrl() );
		return null;
	}
	
}
