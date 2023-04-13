import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function AppRouter(){
    return(
        <BrowserRouter>
          <Routes>
          <Route path="/"  element={ <Home /> }/>
            <Route path="/product/:id"  element={ <ProductDetails /> }/>
          </Routes>
        </BrowserRouter>
    )
}


export default AppRouter;
