package com.vehicle.management.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vehicle.management.model.Vehicle;
import com.vehicle.management.repo.VehicleRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private VehicleRepo vehicleRepo;

    private Vehicle vehicle;

    @BeforeEach
    void createVehicle() {
        vehicle = new Vehicle("Mohan", "Toyota", "Supra", "2009", "QWERTY1232");
        vehicleRepo.save(vehicle);
    }

    @AfterEach
    void cleanUp() {
        vehicleRepo.deleteAll();
    }

    @Test
    void fetchAllVehicles() throws Exception {
        mockMvc.perform(get("/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].vin").exists());
    }

    @Test
    void addVehicle() throws Exception {
        Vehicle vehicle = new Vehicle("Test", "Toyota", "Supra", "2020", "123456789012345");
        mockMvc.perform(post("/vehicle")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vehicle)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vin").value("123456789012345"));
    }

    @Test
    void updateVehicle() throws Exception {
        // Update the vehicle
        vehicle.setMake("Honda");
        mockMvc.perform(put("/vehicle", vehicle.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vehicle)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Honda"));
    }

    @Test
    void deleteVehicle() throws Exception {
        mockMvc.perform(delete("/vehicle/{id}", vehicle.getId()))
                .andExpect(status().isOk());

        // Verify the vehicle is deleted
        mockMvc.perform(get("/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id == " + vehicle.getId() + ")]").doesNotExist());
    }
}
