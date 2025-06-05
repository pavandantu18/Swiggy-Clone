// import React from "react";
// import ReactDOM from "react-dom/client";

// // React.createElement is used to create a React element. -> it is an object that describes a DOM node or a component. // It takes three arguments: type, props, and children.
// // It is not a DOM node, it is a plain JavaScript object that describes the element.
// // It is rendered as HTML by ReactDOM.render() or ReactDOM.createRoot().

// // const heading = React.createElement("h1",{id: "heading"},"Hello World from React");
// // console.log('====================================');
// // console.log(heading);// object
// // console.log('====================================');
// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(heading);

// // JSX

// // JSX is not HTML, it is a syntax extension for JavaScript that looks like HTML.
// // It is used to describe the UI in a more readable way.
// // JSX -> React.createElement -> JS Object -> HTML Element(render)
// const heading = <h2 id="heading" className="head">Hello World from React</h2>;
// // If you write in multiple lines, you need to wrap it in parentheses to avoid syntax errors.
// // const heading = (
// //   <h1 id="heading" className="head">
// //     Hello World from React
// //   </h1>
// // );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(heading);

// // JSX is transpiled to React.createElement() calls by Babel or other compilers.

// // React Component
// // A React component is a function or a class that returns a React element.
// // It can be a functional component or a class component.
// // Functional components are simpler and easier to write, while class components are more powerful and can have state and lifecycle methods.

// const HeadingComponent = () => (
    
//     <div id="container">
//         <h1 className="heading">Hello World from React Component</h1>
//         {heading}
//     </div>
    
// )

// // Componenet inside a component is called component composition.
// root.render(<HeadingComponent />);


import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantCard from "./components/RestaurantCard";
// import Grocery from "./components/Grocery";
import Error from "./components/Error";

import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

// Chunking
// Code splitting is a technique to split the code into smaller chunks that can be loaded on demand.
// Dynamic Bundling
// Lazy loading is a technique to load the components only when they are needed.
// on demand loading
// React.lazy is used to lazy load the components.

const Grocery = lazy(() => import("./components/Grocery")); // Lazy loading the Grocery component

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
            {/* Outlet is a placeholder for the child routes */}
            {/* It will render the child component based on the current route */}
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading...</h1>}>
                    <Grocery />
                </Suspense>
            }
        ],
        errorElement: <Error />,
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={appRouter} />
);







