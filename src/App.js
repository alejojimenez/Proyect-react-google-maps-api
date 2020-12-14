import React, {useState} from 'react';
import './App.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    console.log("Resultado Code", results)

    const latLng = await getLatLng(results[0]);
    console.log("Coordenada", latLng)

    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <>
      <PlacesAutocomplete 
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>latitude: {coordinates.lat}</p>
            <p>longitude: {coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Ingrese direccion" })}/>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}

            </div>
          </div>)}
      </PlacesAutocomplete>
    </>
  );
}

export default App;
