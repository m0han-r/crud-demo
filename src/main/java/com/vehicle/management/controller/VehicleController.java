package com.vehicle.management.controller;

import com.vehicle.management.model.Vehicle;
import com.vehicle.management.repo.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VehicleController {

    @Autowired
    VehicleRepo vehicleRepo;

    @GetMapping("vehicles")
    public List<Vehicle> getVehicles(
            @RequestParam(required = false) SearchCriteria searchField,
            @RequestParam(required = false, defaultValue = "") String searchValue) {
        if (searchField == null || searchValue.isBlank())
            return vehicleRepo.findAll();
        else
            return vehicleRepo.findAll((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(searchField.getValue())), searchValue.toLowerCase() + "%"
                    )
            );
    }

    @PostMapping("vehicle")
    public Vehicle addVehicle(@Validated @RequestBody Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    @PutMapping("vehicle")
    public Vehicle updateVehicle(@Validated @RequestBody Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    @DeleteMapping("vehicle/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleRepo.deleteById(id);
    }

    enum SearchCriteria {
        OWNER_NAME("ownerName"),
        MAKE("make"),
        MODEL("model"),
        VIN("vin"),
        VEHICLE_YEAR("vehicleYear");

        private final String value;

        SearchCriteria(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

}
