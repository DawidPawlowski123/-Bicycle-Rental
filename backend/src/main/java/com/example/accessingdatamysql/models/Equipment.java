package com.example.accessingdatamysql.models;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity // This tells Hibernate to make a table out of this class

public class Equipment {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "elementKit_id", nullable=false)
    private ElementKit elementKitId;

    @Column(nullable = false, length = 70)
    private String name;

    @Column(nullable = false, length = 50)
    private BigDecimal pricePerHour;

    @Column(nullable = false, length = 70)
    private String serialNumber;

    @Column(nullable = false, length = 70)
    private String failureInformation;

    @Column(nullable = false)
    private boolean availabilityStatus;

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {this.id = id; }

    public ElementKit  getElementKit() {return elementKitId; }

    public void setElementKit(ElementKit  elementKitId) {this.elementKitId = elementKitId; }

    public String  getName() {
        return name;
    }

    public void setName(String  name) {this.name = name; }

    public BigDecimal  getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(BigDecimal  pricePerHour) {this.pricePerHour = pricePerHour; }

    public String  getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String  serialNumber) {this.serialNumber = serialNumber; }

    public void setFailureInformation(String  failureInformation) {this.failureInformation = failureInformation; }

    public String  getFailureInformation() {
        return failureInformation;
    }

    public void setAvailabilityStatus(boolean  availabilityStatus) {this.availabilityStatus = availabilityStatus; }

    public boolean  getAvailabilityStatus() {
        return availabilityStatus;
    }


}
