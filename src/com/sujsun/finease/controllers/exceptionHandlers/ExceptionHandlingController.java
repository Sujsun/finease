package com.sujsun.finease.controllers.exceptionHandlers;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.sujsun.finease.mode.ExceptionMode;

@ControllerAdvice
public class ExceptionHandlingController {

	private static final Logger log = Logger.getLogger( ExceptionHandlingController.class.getName() );
	
	@ExceptionHandler( value=Exception.class )
	public ModelAndView handleException( Exception exception, HttpServletRequest request ) {
  		log.severe( "Request: " + request.getRequestURL() + " raised " + exception );
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject( "showDebugDetails", ExceptionMode.getShowDebugInformationInView() );
		modelAndView.addObject("exception", exception);
		modelAndView.addObject("url", request.getRequestURL());
		modelAndView.setViewName("Error");
		return modelAndView;
	}
}