import React, { useState, useEffect } from "react";
import { Header, Container, Form, Button, Icon } from "semantic-ui-react";

const VehicleForm = ({ onClear, onSave, vehicle }) => {
  const [formData, setFormData] = useState(vehicle);

  useEffect(() => {
    if (vehicle) setFormData(vehicle);
  }, [vehicle]);

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Header as="h3" content="Add/Edit Your Vehicles" />
      <Form>
        <Form.Input
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleInputChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Year"
            name="vehicleYear"
            value={formData.vehicleYear}
            onChange={handleInputChange}
          />
          <Form.Input
            label="VIN"
            name="vin"
            value={formData.vin}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={() => onSave(formData)}
          >
            <Icon name="car" />
            {vehicle?.id ? "Update Vehicle" : "Add Vehicle"}
          </Button>
          <Button
            floated="right"
            icon
            labelPosition="left"
            color="red"
            size="small"
            onClick={onClear}
          >
            <Icon name="remove" /> Clear
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default VehicleForm;
