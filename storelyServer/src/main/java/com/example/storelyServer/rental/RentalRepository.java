package com.example.storelyServer.rental;

import com.example.storelyServer.dashboard.DashboardChartBar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    public List<Rental> findByItem_code(Long code);
    public List<Rental> findByUser_email(String userId);

    @Query("SELECT count(e) FROM #{#entityName} e WHERE e.rentDate > ?1 and e.item.itemTemplate.isReturnable is true")
    public Integer countAllRentalsAfterDate(LocalDateTime date);

    @Query("SELECT count(e) FROM #{#entityName} e WHERE e.rentDate > ?1 and e.item.itemTemplate.isReturnable is false")
    public Integer countAllRetrievalsAfterDate(LocalDateTime date);

    @Query("SELECT count(e) FROM #{#entityName} e WHERE e.returnDate > ?1 and e.item.itemTemplate.isReturnable is true")
    public Integer countAllReturnsAfterDate(LocalDateTime date);

    //@Query("SELECT e.rentLocalDate as date, count(e) as amount FROM #{#entityName} e WHERE e.item.itemTemplate.isReturnable is true GROUP BY e.rentLocalDate")
    //public List<DashboardChartBar> getRentalsGroupedByDaysAfterDate(LocalDateTime date);//TODO paradoksalnie to glownie SpEL prosze pani


//    @Query(value = "SELECT function('date_format', e.rentDate, '%Y, %m, %d') as date FROM #{#entityName} e ")
//    @Query(value = "SELECT DATE(e.rent_date) as date, count(*) as date FROM rental e, item i, item_template t WHERE (SELECT i from item i WHERE (SELECT item_template t where t.is_returnable = true and i.item_template_id = t.id) and i.id = e.item_id) GROUP BY DATE(e.rent_date) ",
//    nativeQuery = true)

    @Query(value = "  WITH Date_Range_T(d_range) AS " +
            "     (\n" +
            "   SELECT date_trunc('day', dd)\\:\\: date" +
            "   FROM generate_series\n" +
            "        ( date(?1)\\:\\:timestamp " +
            "        , date(now())\\:\\:timestamp" +
            "        , '1 day'\\:\\:interval) dd" +
            ")" +
            "  SELECT d_range as date, COUNT(r) as amount " +
            "  FROM Date_Range_T " +
            "       LEFT JOIN (SELECT e.* FROM rental e, item i, item_template t WHERE t.is_returnable = true and e.item_id=i.id and i.item_template_id = t.id ) as r on (date(rent_date)=d_range)\n" +
            "   GROUP BY d_range ORDER BY d_range ASC;",
    nativeQuery = true)
    public List<DashboardChartBar> getRentalsGroupedByDaysSinceDate(LocalDateTime date);

    @Query(value = "  WITH Date_Range_T(d_range) AS " +
            "     (" +
            "   SELECT date_trunc('day', dd)\\:\\: date" +
            "   FROM generate_series\n" +
            "        ( date( ?1 )\\:\\:timestamp " +
            "        , date(now())\\:\\:timestamp" +
            "        , '1 day'\\:\\:interval) dd" +
            ")" +
            "  SELECT d_range as date, COUNT(r) as amount " +
            "  FROM Date_Range_T " +
            "       LEFT JOIN (SELECT e.* FROM rental e, item i, item_template t WHERE t.is_returnable = false and e.item_id=i.id and i.item_template_id = t.id ) as r on (date(rent_date)=d_range)\n" +
            "   GROUP BY d_range ORDER BY d_range ASC;",
            nativeQuery = true)
    public List<DashboardChartBar> getRetrievalsGroupedByDaysSinceDate(LocalDateTime date);

    public Integer getAverageRentalsById(Long id);
}
