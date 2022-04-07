package com.example.storelyServer.item;

import com.example.storelyServer.itemTemplate.ItemTemplate;

public class ItemPostDto {

    private Integer quantity;
    private Long code;
    private Long itemTemplateId;
    private ItemTemplate itemTemplate;

    public ItemPostDto() {
    }

    public ItemPostDto(Integer quantity, Long code, Long itemTemplateId, ItemTemplate itemTemplate) {
        this.quantity = quantity;
        this.code = code;
        this.itemTemplateId = itemTemplateId;
        this.itemTemplate = itemTemplate;
    }

    public ItemPostDto(Integer quantity, Long code, Long itemTemplateId) {
        this.quantity = quantity;
        this.code = code;
        this.itemTemplateId = itemTemplateId;
    }

    public ItemPostDto(Integer quantity, Long code, ItemTemplate itemTemplate) {
        this.quantity = quantity;
        this.code = code;
        this.itemTemplate = itemTemplate;
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

    public Long getItemTemplateId() {
        return itemTemplateId;
    }

    public void setItemTemplateId(Long itemTemplateId) {
        this.itemTemplateId = itemTemplateId;
    }

    public ItemTemplate getItemTemplate() {
        return itemTemplate;
    }

    public void setItemTemplate(ItemTemplate itemTemplate) {
        this.itemTemplate = itemTemplate;
    }
}
