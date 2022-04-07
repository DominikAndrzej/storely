package com.example.storelyServer.shortage;

import org.hibernate.search.engine.search.sort.dsl.SortOrder;

public enum ShortageSort {
    ADDED,
    QUANTITY,
    NAME,
    CRITICAL,
    COVER,
    AVG;


    private String value;


    public String getValue(){
        switch (this){
            case QUANTITY:
                return "quantity";
            case COVER:
                return "cover";
            case NAME:
                return "name_sort";
            case CRITICAL:
                return "criticalQuantity";
            case AVG:
                return "averageRentals";
            case ADDED:
            default:
                return "added";
        }
    }

    public SortOrder getOrder(){
        switch (this){
            case ADDED:
            case NAME:
            case AVG:
                return SortOrder.DESC;
            case QUANTITY:
            case CRITICAL:
            case COVER:
            default:
                return SortOrder.ASC;
        }
    }
}
