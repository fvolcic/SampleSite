
import { useId, useState } from 'react';
import './App.css';

import qs from 'querystring';

var client_id = '231521e53a6d4fe1b1729d4037b2efb2'; // Your client id
var client_secret = '627eb37c52a4409d861273d9ac6d4768'; // Your secret
var redirect_uri = 'http://localhost:3000/'; // Your redirect uri

var stateKey = 'spotify_auth_state';

var wifiSSID; 
var wifiPASS;

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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in the data below to get started with your spotify album frame!
        </p>

        <SpotifyLogin></SpotifyLogin>    
        <Input updateValue={updateWifiSSID} getValue={getWifiSSID} placeholder="Wifi SSID"/>
        <Input updateValue={updateWifiPASS} getValue={getWifiPASS} placeholder="Wifi Password"/>

        <button onClick={onDownloadClick}>Download</button>
      </header>
    </div>
  );
}

function SpotifyLogin(props){
  return (
    <div>
      <button onClick={onSpotifyLogin}>Login with spotify</button>
    </div>
  );
}

function onSpotifyLogin() {
  var scope = ''; 
  var state = generateRandomString(16); 
  window.location.href = 'https://accounts.spotify.com/authorize?' + 
  qs.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });
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
  download('credentials.txt', generateDownloadDocument(getWifiPASS(), getWifiSSID()));
}

function generateDownloadDocument(wifiPass, wifiSSID) {
  var text = 'wifi_pass=' + wifiPass + '\nwifi_ssid=' + wifiSSID;
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

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default App;
