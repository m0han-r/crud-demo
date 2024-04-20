package com.vehicle.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String ownerName;

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotBlank
    @Length(min = 4, max = 4)
    @Column(length = 4)
    private String vehicleYear;

    @Length(min = 10, max = 15)
    @Column(length = 15, unique = true)
    private String vin;

    public Vehicle() {}

    public Vehicle(String ownerName, String make, String model, String vehicleYear, String vin) {
        this.ownerName = ownerName;
        this.make = make;
        this.model = model;
        this.vehicleYear = vehicleYear;
        this.vin = vin;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(String vehicleYear) {
        this.vehicleYear = vehicleYear;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
