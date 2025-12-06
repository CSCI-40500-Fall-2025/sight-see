package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/testLog")
    public String testLog() {
        logger.debug("DEBUG log — Hello Splunk!");
        logger.info("INFO log — Hello Splunk!");
        logger.warn("WARN log — This is a warning!");
        logger.error("ERROR log — Something went wrong!");
        return "Logged to Splunk!";
    }

    @GetMapping("/testErrorLog")
    public String testErrorLog() {
        logger.error("TEST ERROR LOG — should go to Splunk!");
        return "Error log triggered!";
    }
}