package com.serge.restapp.cucumber.stepdefs;

import com.serge.restapp.HipsterappApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = HipsterappApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
