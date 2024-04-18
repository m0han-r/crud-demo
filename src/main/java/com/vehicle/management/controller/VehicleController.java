package com.vehicle.management.controller;

import com.vehicle.management.model.Vehicle;
import com.vehicle.management.repo.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vehicle")
public class VehicleController {

    @Autowired
    VehicleRepo vehicleRepo;

    @GetMapping
    public List<Vehicle> getVehicles() {
        return vehicleRepo.findAll();
    }

    @PostMapping
    public Vehicle addVehicle(@Validated @RequestBody Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    @PatchMapping
    public Vehicle updateVehicle(@Validated @RequestBody Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    @DeleteMapping("{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleRepo.deleteById(id);
    }
}
