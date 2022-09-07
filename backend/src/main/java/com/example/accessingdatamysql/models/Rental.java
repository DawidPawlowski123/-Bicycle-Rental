package com.example.accessingdatamysql.models;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity // This tells Hibernate to make a table out of this class

public class Rental {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", nullable=false)
    private Client client;

    @OneToOne(mappedBy = "rental")
    private Payment payment;

    @OneToOne(mappedBy = "rental")
    private Kit kit;

    @Column(nullable = false, length = 20)
    private Date startDate;

    @Column(nullable = false, length = 20)
    private Date endDate;

    @Column(nullable = false, length = 20)
    private Time startTime;

    @Column(nullable = false, length = 20)
    private Time endTime;

    @Column(nullable = false)
    private boolean rentalStatus;

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {this.id = id; }

    public Client  getClient() {return client;}

    public void setClient(Client  client) {this.client = client; }

    public Date  getStartDate() {return startDate; }

    public void setStartDate(Date  startDate) {this.startDate = startDate; }

    public Date  getEndDate() {return endDate; }

    public void setEndDate(Date  endDate) {this.endDate = endDate; }

    public Time  getStartTime() {return startTime; }

    public void setStartTime(Time  startTime) {this.startTime = startTime; }

    public Time  getEndTime() {return endTime; }

    public void setEndTime(Time  endTime) {this.endTime = endTime; }

    public boolean  getRentalStatus() {
        return rentalStatus;
    }

    public void setRentalStatus(boolean  rentalStatus) {this.rentalStatus = rentalStatus; }
}
