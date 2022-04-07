package com.example.storelyServer.templates;

public class ResponseCode {
    private Long code;
    private Long id;
    private Boolean successful;
    private String error;

    public ResponseCode(Long code, Long id) {
        this.code = code;
        this.id = id;
        this.successful = true;
    }

    public ResponseCode(Long code, String error) {
        this.code = code;
        this.successful = false;
        this.error = error;
    }

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getSuccessful() {
        return successful;
    }

    public void setSuccessful(Boolean successful) {
        this.successful = successful;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
