package com.example.storelyServer.user;

import org.hibernate.search.engine.search.sort.dsl.SortOrder;

public enum UserSort {
    ADDED,
    SURNAME,
    NAME;

    private String value;


    public String getValue(){
        switch (this){
            case SURNAME:
                return "surname_sort";
            case NAME:
                return "name_sort";
            case ADDED:
            default:
                return "registered";
        }
    }

    public SortOrder getOrder(){
        switch (this){
            case ADDED:
                return SortOrder.DESC;
            case NAME:
            case SURNAME:
            default:
                return SortOrder.ASC;
        }
    }
}
