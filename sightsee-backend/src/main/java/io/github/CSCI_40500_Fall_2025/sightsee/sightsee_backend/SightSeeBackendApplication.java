package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
//@EnableScheduling
public class SightSeeBackendApplication {

	//TODO: remove tests from this class
//	@Autowired
//	private JdbcTemplate jdbcTemplate;
//
//	//tests database connection
//	@Scheduled(fixedDelay = 1000L)
//	public void scheduledTask() {
//		System.out.println(jdbcTemplate.queryForObject("select 1", String.class));
//	}

	public static void main(String[] args) {
		SpringApplication.run(SightSeeBackendApplication.class, args);
	}

}
