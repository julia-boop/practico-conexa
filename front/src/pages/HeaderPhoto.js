import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function HeaderPhoto() {
    return(
        <div>
          <h1 className="title"><Link to="/photos" exact="true">Photos</Link></h1>
          <div className="underline"/>
        </div>
    )
}

export default HeaderPhoto