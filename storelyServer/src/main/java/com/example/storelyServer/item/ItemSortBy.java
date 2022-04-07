package com.example.storelyServer.item;

import org.hibernate.search.engine.search.sort.dsl.SortOrder;

public enum ItemSortBy {
    ADDED,
    QUANTITY,
    NAME;
    private String value;


    public String getValue(){
        switch (this){
            case QUANTITY:
                return "quantity";
            case NAME:
                return "name_sort";
            case ADDED:
            default:
                return "added";
        }
    }

    public SortOrder getOrder(){
        switch (this){
            case QUANTITY:
            case ADDED:
            case NAME:
                return SortOrder.DESC;
            default:
                return SortOrder.ASC;

        }
    }
}
