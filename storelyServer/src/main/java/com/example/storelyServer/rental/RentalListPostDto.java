package com.example.storelyServer.rental;

public class RentalListPostDto {
    private Long code;
    private Integer quantity;


    public RentalListPostDto(Long code) {
        this.code = code;
    }

    public RentalListPostDto(Long code, Integer quantity) {
        this.code = code;
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }
}
