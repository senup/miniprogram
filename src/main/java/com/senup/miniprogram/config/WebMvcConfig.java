package com.senup.miniprogram.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override//配置图片映射的时候会导致swagger被同时影响到
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/META-INF/resources/")//解决swagger静态资源被拦截的问题
                .addResourceLocations("file:D:/miniprogram/");

	}

	/**
	 * 配置拦截器的bean
	 * @return
	 */
	@Bean
	public MineInterceptor mineInterceptor(){
		return new MineInterceptor();
	}

	/**
	 * 拦截器注册中心
	 * @param registry
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//将拦截器的bean放入
		registry.addInterceptor(mineInterceptor())
				//要拦截的路径
				.addPathPatterns("/**")
				//要排除在拦截范围的路径登录和注册
				.excludePathPatterns("/wxLogin","/logout")
				.excludePathPatterns("/swagger-resources/**", "/webjars/**", "/v2/**", "/swagger-ui.html/**");
		super.addInterceptors(registry);
	}

}
