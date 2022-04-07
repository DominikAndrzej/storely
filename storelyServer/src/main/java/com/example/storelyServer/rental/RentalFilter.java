package com.example.storelyServer.rental;

public enum RentalFilter {
    RETURNABLE,
    NON_RETURNABLE,
    ALL;

    public String getValue(){
        switch (this){
            case RETURNABLE:
                return "true";
            case NON_RETURNABLE:
                return "false";
            default:
                return "*";
        }
    }
}
