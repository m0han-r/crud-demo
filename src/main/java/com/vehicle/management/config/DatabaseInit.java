package com.vehicle.management.config;

import com.vehicle.management.model.Vehicle;
import com.vehicle.management.repo.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInit implements CommandLineRunner {

    @Autowired
    VehicleRepo vehicleRepo;

    @Override
    public void run(String... args) throws Exception {
        Vehicle v1 = new Vehicle();
        v1.setMake("Toyota");
        v1.setModel("Supra");
        v1.setOwnerName("Mohan");
        v1.setVehicleYear("2009");
        v1.setVin("1234567890");
        vehicleRepo.save(v1);
    }
}
