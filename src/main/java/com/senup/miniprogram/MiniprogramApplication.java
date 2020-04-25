package com.senup.miniprogram;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = "com.senup.miniprogram.mapper")
public class MiniprogramApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniprogramApplication.class, args);
		System.out.println("------------------------------------------------------");
	}

}
