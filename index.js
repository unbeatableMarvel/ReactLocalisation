import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ReactLocalisation from './container';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';

var locale = JSON.parse(localStorage.getItem('locale'));
var localeValue;
var localizedMessages = {};

if(locale==null)
{
  localeValue='en-us';
}
else
{
    

    try {
        localizedMessages = require('./translations/' + locale.locale + '.json');
    }
    catch (err) {
        
    }
}


addLocaleData([...en, ...fr]);

console.log("localizedMessages", localizedMessages)

ReactDOM.render(
    <IntlProvider locale={localeValue} messages={localizedMessages}>
        <ReactLocalisation />
    </IntlProvider>
    , document.getElementById('app'));