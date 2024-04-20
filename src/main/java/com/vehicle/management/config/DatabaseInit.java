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
        vehicleRepo.save(new Vehicle("Mohan", "Toyota", "Supra","2009","1234567890"));
    }
}
