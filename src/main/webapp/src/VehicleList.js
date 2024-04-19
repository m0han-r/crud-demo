import React from "react";
import { Header, Table, Button, Icon, Container } from "semantic-ui-react";

const VehicleList = ({ vehicles, onEdit, onDelete }) => {

  return (
    <Container>
        <Header
        as="h3"
        content="Vehicles List"
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>S.NO</Table.HeaderCell>
            <Table.HeaderCell>Owner Name</Table.HeaderCell>
            <Table.HeaderCell>Make</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>VIN</Table.HeaderCell>
            <Table.HeaderCell>ACTION</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {vehicles.map((vehicle, index) => (
            <Table.Row key={vehicle.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{vehicle.ownerName}</Table.Cell>
              <Table.Cell>{vehicle.make}</Table.Cell>
              <Table.Cell>{vehicle.model}</Table.Cell>
              <Table.Cell>{vehicle.vehicleYear}</Table.Cell>
              <Table.Cell>{vehicle.vin}</Table.Cell>
              <Table.Cell>
                <Button icon onClick={() => onEdit(vehicle) } color="primary">
                  <Icon name="edit" size="small" />
                </Button>
                <Button icon onClick={() => onDelete(vehicle.id)} color="red">
                  <Icon name="trash alternate" size="small" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default VehicleList;
