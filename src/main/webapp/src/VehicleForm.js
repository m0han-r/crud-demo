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
      <Form onSubmit={() => onSave(formData)} onClear={onClear}>
        <Form.Input
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          required={true}
          onChange={handleInputChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Make"
            name="make"
            value={formData.make}
            required={true}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Model"
            name="model"
            value={formData.model}
            required={true}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Year"
            name="vehicleYear"
            value={formData.vehicleYear}
            required={true}
            onChange={handleInputChange}
          />
          <Form.Input
            label="VIN"
            name="vin"
            value={formData.vin}
            required={true}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Button
            type="submit"
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
          >
            <Icon name="car" />
            {vehicle?.id ? "Update Vehicle" : "Add Vehicle"}
          </Button>
          <Button
            type="onClear"
            floated="right"
            icon
            labelPosition="left"
            color="red"
            size="small"
          >
            <Icon name="remove" /> Clear
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default VehicleForm;
