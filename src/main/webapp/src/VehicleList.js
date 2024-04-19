import React, { useState, useEffect } from "react";
import {
  Input,
  Dropdown,
  Header,
  Table,
  Button,
  Icon,
  Container,
} from "semantic-ui-react";

const VehicleList = ({ vehicles, onEdit, onDelete, onSearch }) => {
  const options = [
    { key: "ownerName", text: "Owner Name", value: "ownerName" },
    { key: "make", text: "Make", value: "make" },
    { key: "model", text: "Model", value: "model" },
    { key: "vin", text: "VIN", value: "vin" },
    { key: "vehicleYear", text: "Year", value: "vehicleYear" },
  ];

  const [search, setSearch] = useState({
    field: "vin",
    value: "",
  });

  const handleSearchChange = (e, { name, value }) => {
    setSearch({ ...search, [name]: value });
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(search);
    }, 500); // Adjust debounce delay as needed

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search, onSearch]);

  return (
    <Container>
      <Header as="h3" content="Vehicles List" />
      <Input
        icon="search"
        iconPosition="left"
        label={
          <Dropdown
            value={search.field}
            name="field"
            options={options}
            onChange={handleSearchChange}
          />
        }
        labelPosition="right"
        placeholder="Search.."
        name="value"
        value={search.value}
        onChange={handleSearchChange}
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
          {vehicles.length ? (
            vehicles.map((vehicle, index) => (
              <Table.Row key={vehicle.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{vehicle.ownerName}</Table.Cell>
                <Table.Cell>{vehicle.make}</Table.Cell>
                <Table.Cell>{vehicle.model}</Table.Cell>
                <Table.Cell>{vehicle.vehicleYear}</Table.Cell>
                <Table.Cell>{vehicle.vin}</Table.Cell>
                <Table.Cell>
                  <Button icon onClick={() => onEdit(vehicle)} color="primary">
                    <Icon name="edit" size="small" />
                  </Button>
                  <Button icon onClick={() => onDelete(vehicle.id)} color="red">
                    <Icon name="trash alternate" size="small" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Cell colspan='7'>
            <Header as="h4" textAlign="center">
              No Records Found
            </Header>
            </Table.Cell>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default VehicleList;
