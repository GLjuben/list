import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {

  // An array of objects of countries;
  const [ countries, setCountries ] = useState([]);

  // A state hook to track the current country;
  const [ country, setCountry ] = useState('');

  // Hook for selecting to edit a country;
  // we will set the state to null because we won't be editing anything at the beggining/till the btn is clicked;
  const [ editCountry, setEditCountry ] = useState(null);

  //Hook to keep track for the editing of the text of the country;
  // This will be before the submit button is clicked;
  // When we click the edit buton, the div with country.text value will transform into an input,
  // and we can readjust our value;
  const [ textEdit, setTextEdit ] = useState('');

  // A function to handle the form submit;
  const handleSubmit = (e) => {
    // common practice to prevent the form's submit.
    e.preventDefault();


    // Object for our countries list;
    // completed will be false at first because the name of the country is not given yet;
    const newCountry = {
      id: uuidv4(),
      text: country,
    };
    

    // a spread operator to clone our list of countries variable and add the new country;
    // a way to prevent the mutation of data
    setCountries([...countries, newCountry]);
    // anytime we add a country we want to reset the input to an empty string;
    setCountry("");
  };

  // delete button
  const deleteCountry = (id) => {
    // The way to delete is to take the country list and filter out the country we are trying to delete with the corresponding id;
    // This will be true for every one country except the one we are deleting;
    const updatedCountries = [...countries ].filter((country) => country.id !== id );
    setCountries(updatedCountries);

  };

  //Edit button
  // 
  const submitBtn = (id) => {
    const updatedCountries = [...countries].map((country) => {
      if (country.id === id) {
        country.text = textEdit
      }

      return country;
    });

    setCountries(updatedCountries);
    setEditCountry(null);
    setTextEdit('');
  };
  



  return (
    <div className="App">
      {/* To add our country to our list of countries we will add an onSubmit event handler to the form */}
      {/* It will run anytime a button with the type of submit is clicked */}
      {/*  */}

      <form onSubmit={handleSubmit}> 
        {/* The onChange handler will set the country hook to whatever is typed inside of the input */}
        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country}/>
        <button type="submmit"> Add country </button>
      </form>

      {/* we map throughout the list of countries and we create a separate div for each of it,displaying the text */}
      {countries.map((country) => 
        <div key={country.id}>
          {/* Whatever country we are editing is equal to the current country we are mapping over  */}
          {/* then the div will be transformed into an input  */} 
          {/* If it's not,then return a div with the current value */}

          {editCountry === country.id ? (<input type="text" onChange={(e) => setTextEdit(e.target.value)} value={textEdit}/>) : (<div>{country.text}</div>)}

          <button onClick={() => deleteCountry(country.id)}>Delete</button>
          <br/>

           {/* These buttons are for edditing and submiting. This terniary operator will choose to display only one button at a time */}
           {/* If we are edditing the country, the submit button will show, otherwise the edit button will be displayed */}
          {editCountry === country.id ? (<button onClick={() => submitBtn(country.id)}> Submit </button>) : (<button onClick={() => setEditCountry(country.id)} > Edit </button>)}
        </div>)}
    </div>
  );
};

export default App;
