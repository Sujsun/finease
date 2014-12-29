package com.sujsun.finease.controllers;

import java.util.Map;
import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping( value="" )
public class AuthenticationController {
	
	private static final Logger log = Logger.getLogger( AuthenticationController.class.getName() );
	
	@RequestMapping( value="login", method=RequestMethod.POST )
	public String authenticate( @RequestBody String requestBody ) {
		return "redirect:home";
	}

}
