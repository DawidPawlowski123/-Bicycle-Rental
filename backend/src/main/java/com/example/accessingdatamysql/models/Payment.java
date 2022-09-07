package com.example.accessingdatamysql.models;






import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;


@Entity // This tells Hibernate to make a table out of this class

public class Payment {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

    @OneToMany
    @JoinColumn(name = "payment_id") // we need to duplicate the physical information
    private Set<SubPayment> subPayments;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id", referencedColumnName = "id")
    private Rental rental;

    @Column(nullable = false)
    private boolean paymentStatus;

    @Column(nullable = false)
    private BigDecimal amount;

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {this.id = id; }

    public boolean  getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(boolean  paymentStatus) {this.paymentStatus = paymentStatus; }

    public BigDecimal  getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal  amount) {this.amount = amount; }

}
