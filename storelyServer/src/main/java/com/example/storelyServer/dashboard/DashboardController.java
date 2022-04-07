package com.example.storelyServer.dashboard;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * kontroler zapytan do glownego ekranu (dashboardu)
 */
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * pobiera 4 widgety ekranu glownego
     * @return <code>DashboardWidgets</code> klasa zawierajaca nazwy i dane widgetow
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("widgets")
    public DashboardWidgets show(){
        return dashboardService.getWidgets();
    }

    /**
     * pobiera dane do wykresu wypozyczen z ostatnich 30 dni
     * @return <code>List<DashboardChartBar></code> zwraca liste obiektow zawierajacych date i ilosc wypozyczen
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("chart/rental")
    public List<DashboardChartBar> rentalChart(){
        return dashboardService.getThisMonthRentals();
    }

    /**
     * pobiera dane do wykresu pobran z ostatnich 30 dni
     * @return <code>List<DashboardChartBar></code> zwraca liste obiektow zawierajacych date i ilosc pobran
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("chart/retrieval")
    public List<DashboardChartBar> retrievalChart(){
        return dashboardService.getThisMonthRetrievals();
    }
}