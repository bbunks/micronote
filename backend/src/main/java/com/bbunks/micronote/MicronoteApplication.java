package com.bbunks.micronote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.bbunks.micronote.dao")
@EntityScan(basePackages = "com.bbunks.micronote.entities")
public class MicronoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicronoteApplication.class, args);
	}

}
