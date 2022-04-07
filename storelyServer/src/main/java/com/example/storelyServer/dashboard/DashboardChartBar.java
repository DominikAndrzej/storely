package com.example.storelyServer.dashboard;

import java.time.LocalDate;
import java.util.Date;

/**
 * interface do mapowania danych do wykresow na ekranie glownym
 */
public interface DashboardChartBar {

    public Date getDate();

    public Integer getAmount();


}
