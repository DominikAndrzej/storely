package com.example.storelyServer.rental;

import org.hibernate.search.engine.search.sort.dsl.SortOrder;

public enum RentalSort {
    DATE,
    REMAINING,
    QUANTITY;

    private String value;


    public String getValue(){
        switch (this){
            case DATE:
                return "rentDate";
            case REMAINING:
                return "remainingTime";
            case QUANTITY:
            default:
                return "quantity";
        }
    }

    public SortOrder getOrder(){
        switch (this){
            case DATE:
            case REMAINING:
                return SortOrder.DESC;
            case QUANTITY:
            default:
                return SortOrder.ASC;
        }
    }
}