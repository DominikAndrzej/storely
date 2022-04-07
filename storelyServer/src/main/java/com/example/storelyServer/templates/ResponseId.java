package com.example.storelyServer.templates;

public class ResponseId {
    private Long id;

    public ResponseId(Long toReturn) {
        this.id = toReturn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
