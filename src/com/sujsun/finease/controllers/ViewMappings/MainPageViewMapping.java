package com.sujsun.finease.controllers.viewMappings;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sujsun.finease.mode.ApplicationMode;
import com.sujsun.finease.mode.UrlMode;
import com.sujsun.finease.util.URLHelper;

@Controller
@RequestMapping( value="" )
public class MainPageViewMapping {
	
	private static final Logger log = Logger.getLogger( MainPageViewMapping.class.getName() );
	
	@RequestMapping( value="", method=RequestMethod.GET )
	public String defaultRoute() {
		return "redirect:login";
	}
	
	@RequestMapping( value="home", method=RequestMethod.GET )
	public ModelAndView showMainPage() {
		log.info( "MainPageViewMapping :: Inside showMainPage()." );
		ModelAndView modelAndView = new ModelAndView();
		try {
			modelAndView.setViewName( "MainPage" );
		} catch( Exception exception ) {
			log.info( "Exception while showing the main page." );
			exception.printStackTrace();
		}
		return modelAndView;
	}
	
	@RequestMapping( value="login", method=RequestMethod.GET )
	public String showLoginPage( HttpServletRequest request, HttpServletResponse response ) {
		boolean isSuccess = false;
		ModelAndView modelAndView = new ModelAndView();
		Map<String, Object> returnHashMap = new HashMap<String, Object>();
		try {
			modelAndView.setViewName( "" );
		} catch( Exception exception ) {
			log.info( "Exception while detecting the subDomain." );
			exception.printStackTrace();
		} finally {
			returnHashMap.put( "success", isSuccess );
		}
		return "Login";
	}
	
	@RequestMapping( value="getSubDomain", method=RequestMethod.GET )
	public @ResponseBody Map<String, Object> testController( HttpServletRequest request, HttpServletResponse response ) {
		boolean isSuccess = false;
		Map<String, Object> returnHashMap = new HashMap<String, Object>();
		try {
			URLHelper urlHelper = new URLHelper();
			String subDomain = urlHelper.getSubDomain( new URL( String.valueOf( request.getRequestURL() ) ) );
			returnHashMap.put( "subDomain", subDomain );
			isSuccess = true;
		} catch( Exception exception ) {
			log.info( "Exception while detecting the subDomain." );
			exception.printStackTrace();
		} finally {
			returnHashMap.put( "success", isSuccess );
		}
		return returnHashMap;
	}
	
}
