package com.example.sseuim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.sseuim.member","com.example.sseuim.member.mapper", "com.example.sseuim.jwt"})
public class SseuimApplication {

	public static void main(String[] args) {
		SpringApplication.run(SseuimApplication.class, args);
	}

}
