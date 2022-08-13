
import { useId, useState } from 'react';
import './App.css';

var wifiSSID; 
var wifiPASS;
var spotifyUsername; 
var spotifyPassword; 

function updateWifiSSID(value) {
  wifiSSID = value;
}

function getWifiSSID() {
  return wifiSSID;
}

function getWifiPASS() {
  return wifiPASS;
}

function updateWifiPASS(value) {
  wifiPASS = value;
}

function updateSpotifyUsername(value) {
  spotifyUsername = value;
}

function getSpotifyUsername() {
  return spotifyUsername;
}

function getSpotifyPassword() {
  return spotifyPassword;
}

function updateSpotifyPassword(value) {
  spotifyPassword = value;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in the data below to get started!
        </p>
    
        <Input updateValue={updateWifiSSID} getValue={getWifiSSID} placeholder="Wifi SSID"/>
        <Input updateValue={updateWifiPASS} getValue={getWifiPASS} placeholder="Wifi Password"/>
        <Input updateValue={updateSpotifyUsername} getValue={getSpotifyUsername} placeholder="Spotify Username"/>
        <Input updateValue={updateSpotifyPassword} getValue={getSpotifyPassword} placeholder="Spotify Password"/>

        <button onClick={onDownloadClick}>Download</button>
      </header>
    </div>
  );
}

function Input(props) {
  const id = useId();

  const updateValue = props.updateValue; 
  const getValue = props.getValue; 

  return (
    <div>
    <input id={id} value={getValue()} onInput={e => updateValue(e.target.value)} placeholder={props.placeholder}/>
    </div>
  );
}

function onDownloadClick() {
  download('credentials.txt', generateDownloadDocument(getWifiPASS(), getWifiSSID(), getSpotifyUsername(), getSpotifyPassword()));
}

function generateDownloadDocument(wifiPass, wifiSSID, spotifyUsername, spotifyPassword) {
  var text = 'wifi_pass=' + wifiPass + '\nwifi_ssid=' + wifiSSID + '\nspotify_username=' + spotifyUsername + '\nspotify_password=' + spotifyPassword;
  return text;
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default App;
