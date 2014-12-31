package com.sujsun.finease.controllers;

import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.type.TypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sujsun.finease.controllers.viewMappings.RegistrationViewMapping;
import com.sujsun.finease.factories.ContactFactory;
import com.sujsun.finease.finalObjects.ObjectMapper;
import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.mode.UrlMode;
import com.sujsun.finease.services.AccountService;
import com.sujsun.finease.services.ContactService;

@Controller
@RequestMapping( value="/" )
public class RegistrationController {
	
	private static final Logger log = Logger.getLogger( RegistrationController.class.getName() );
	
	@RequestMapping( value="register", method=RequestMethod.POST )
	public @ResponseBody Contact register( @RequestBody String requestJSONString, HttpServletRequest requset, HttpServletResponse response ) {
		return new ContactService().create( requset, response, requestJSONString );
	}

}
