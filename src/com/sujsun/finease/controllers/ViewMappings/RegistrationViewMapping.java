package com.sujsun.finease.controllers.viewMappings;

import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping( value="/" )
public class RegistrationViewMapping {
	
	private static final Logger log = Logger.getLogger( RegistrationViewMapping.class.getName() );
	
	@RequestMapping( value="register", method=RequestMethod.GET )
	public String register() {
		return "Register";
	}
	
}