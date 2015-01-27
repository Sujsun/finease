package com.sujsun.finease.util;

import org.apache.commons.lang.RandomStringUtils;

public class RandomUtil {
	
	public static String alphaNumberic() {
		return RandomStringUtils.randomAlphanumeric( 8 ) + "-" + RandomStringUtils.randomAlphanumeric( 4 ) + "-" + RandomStringUtils.randomAlphanumeric( 4 ) + "-" + RandomStringUtils.randomAlphanumeric( 4 ) + "-" + RandomStringUtils.randomAlphanumeric( 12 );
	}
	
}
