import "./App.css";
import React, { useState, useEffect, useCallback  } from "react";
import VehicleForm from "./VehicleForm";
import VehiclesList from "./VehicleList";
import { Divider,Header, Container } from "semantic-ui-react";

function App() {
  const API_URL = 'http://localhost:8080/vehicle';
  const newVehicle = {
    ownerName: "",
    make: "",
    model: "",
    vehicleYear: "",
    vin: "",
  };

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(newVehicle);
  
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const handleSave = async (vehicle) => {
    const method = selectedVehicle?.id ? 'PATCH' : 'POST';
  
    try {
      const response = await fetch(API_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${selectedVehicle?.id ? 'update' : 'create'} vehicle`);
      }
  
      const data = await response.json();
      setVehicles(selectedVehicle?.id ? vehicles.map(v => v.id === data.id ? data : v) : [...vehicles, data]);
      alert(`Vehicle ${selectedVehicle?.id ? 'updated' : 'created'} successfully`);
      handleClear();
    } catch (error) {
      alert(`Error ${selectedVehicle?.id ? 'updating' : 'creating'} vehicle: ${error.message}`);
    }
  };
  
  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleClear = () => {
    setSelectedVehicle(newVehicle);
  }
  
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to delete vehicle");
        } else {
          alert("Vehicle Deleted");
          setVehicles((prevVehicles) =>
            prevVehicles.filter((vehicle) => vehicle.id !== id)
          );
        }
      })
      .catch((error) => {
        alert("Failed to delete vehicle");
        console.error("Error deleting vehicle:", error);
      });
  };

  const handleSearch = useCallback((search) => {
      fetch(`${API_URL}?searchField=${search.field}&searchValue=${search.value}`)
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [])
  
  return (
    <Container>
      <Header
        as="h1"
        content="Vehicle Management CRUD Demo"
        textAlign="center"
      />
      <VehicleForm vehicle={selectedVehicle} onSave={handleSave} onClear={handleClear}/>
      <Divider/>
      <VehiclesList vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} onSearch={handleSearch}/>
    </Container>
  );
}

export default App;
