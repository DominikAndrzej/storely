package com.example.storelyServer.dashboard;

/**
 * Klasa do mapowania danych do widgetow na ekranie glownym aplikacji desktopowej
 */
public class DashboardWidgets {
    private Integer rentalsToday;
    private Integer retrievalsToday;
    private Integer returnsToday;
    private Integer itemsAddedToday;

    public DashboardWidgets(Integer rentalsToday, Integer retrivalsToday, Integer returnsToday, Integer itemsAddedToday) {
        this.rentalsToday = rentalsToday;
        this.retrievalsToday = retrivalsToday;
        this.returnsToday = returnsToday;
        this.itemsAddedToday = itemsAddedToday;
    }

    public DashboardWidgets() {
    }

    public Integer getRentalsToday() {
        return rentalsToday;
    }

    public Integer getRetrievalsToday() {
        return retrievalsToday;
    }

    public Integer getReturnsToday() {
        return returnsToday;
    }

    public Integer getItemsAddedToday() {
        return itemsAddedToday;
    }
}
