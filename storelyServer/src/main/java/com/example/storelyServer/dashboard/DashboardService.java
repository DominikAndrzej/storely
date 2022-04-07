package com.example.storelyServer.dashboard;


import com.example.storelyServer.item.ItemRepository;
import com.example.storelyServer.rental.RentalRepository;
import org.hibernate.SessionFactory;
import org.hibernate.hql.internal.ast.ASTQueryTranslatorFactory;
import org.hibernate.hql.internal.ast.QueryTranslatorImpl;
import org.hibernate.hql.spi.QueryTranslatorFactory;
import org.hibernate.internal.SessionFactoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * service endpointu <code>/dashboard</code>
 */
@Service
public class DashboardService {

    private final ItemRepository itemRepository;
    private final RentalRepository rentalRepository;

    @Autowired
    public DashboardService(ItemRepository itemRepository, RentalRepository rentalRepository) {
        this.itemRepository = itemRepository;
        this.rentalRepository = rentalRepository;
    }



    public DashboardWidgets getWidgets(){
        LocalDateTime date = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);

        Integer rentalsToday = rentalRepository.countAllRentalsAfterDate(date);

        Integer retrievalsToday = rentalRepository.countAllRetrievalsAfterDate(date);

        Integer returnsToday = rentalRepository.countAllReturnsAfterDate(date);

        Integer itemsAddedToday = itemRepository.countAllAfterDate(date);

        return new DashboardWidgets(rentalsToday, retrievalsToday, returnsToday, itemsAddedToday);
    }

    public List<DashboardChartBar> getThisMonthRentals(){
        LocalDateTime date = LocalDateTime.now().minusDays(30);

        return rentalRepository.getRentalsGroupedByDaysSinceDate(date);
    }

    public List<DashboardChartBar> getThisMonthRetrievals(){
        LocalDateTime date = LocalDateTime.now().minusDays(30);

        return rentalRepository.getRetrievalsGroupedByDaysSinceDate(date);
    }


}
