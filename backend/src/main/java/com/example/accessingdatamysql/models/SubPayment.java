package com.example.accessingdatamysql.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity // This tells Hibernate to make a table out of this class

public class SubPayment {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id", nullable=false)
    private Payment payment;

    @Column(nullable = false)
    private BigDecimal subAmount;

    @Column(nullable = false, length = 20)
    private String paymentType;

    @Column(nullable = false, length = 20)
    private Date paymentDate;

    public Long  getId() {return id; }

    public void setId(Long  id) {this.id = id; }

    public Payment  getPayment() {
        return payment;
    }

    public void setPayment(Payment  payment) {this.payment = payment; }

    public BigDecimal  getSubAmount() {
        return subAmount;
    }

    public void setSubAmount(BigDecimal  subAmount) {this.subAmount = subAmount; }

    public String  getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String  id) {this.paymentType = paymentType; }

    public Date  getPaymentDate() {return paymentDate; }

    public void setPaymentDate(Date  id) {this.paymentDate = paymentDate; }
}
