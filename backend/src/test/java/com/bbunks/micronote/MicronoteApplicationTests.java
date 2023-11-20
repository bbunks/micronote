package com.bbunks.micronote;

import com.bbunks.micronote.config.JpaPersistenceConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

@SpringBootTest
@EntityScan(basePackages = "com.bbunks.micronote.entities")
class MicronoteApplicationTests {

	@Test
	void contextLoads() {
	}

}
