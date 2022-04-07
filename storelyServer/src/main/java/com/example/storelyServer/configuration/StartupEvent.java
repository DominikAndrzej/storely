package com.example.storelyServer.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class StartupEvent implements ApplicationListener<ApplicationReadyEvent> {

    private final IndexingService service;

    @Autowired
    public StartupEvent(IndexingService service) {
        this.service = service;
    }


    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        try {
            service.initiateIndexing();
        } catch (InterruptedException e) {
        }
    }
}