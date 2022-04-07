package com.example.storelyServer.rental;

import com.example.storelyServer.item.Item;

public class RentalPostDto {

    private Integer quantity;
    private Long itemCode;
    private Item item;

    public RentalPostDto() {
    }

    public RentalPostDto(Integer quantity,  Long itemId, Item item) {
        this.quantity = quantity;
        this.itemCode = itemId;
        this.item = item;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public Long getItemCode() {
        return itemCode;
    }

    public void setItemCode(Long itemCode) {
        this.itemCode = itemCode;
    }


    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
