import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function HeaderPost() {
    return(
        <div>
          <h1 className="title"><Link to="/post" exact="true">Post</Link></h1>
          <div className="underline"/>
        </div>
    )
}

export default HeaderPost