import RestaurantCard from "./RestaurantCard";
import resList from "../utils/constants"
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";
const Body = () => {

    // Local state Variable -> Super powerful variable that can be used to store data in a component.
    // It is used to store data that can change over time, like user input, API responses, etc.
    // useState is a hook that allows you to add state to a functional component.
    
    // const [restaurants, setRestaurants] = useState(resList);
    const [restaurants, setRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // After the component is rendered, useEffect is called.
    // If no dependency array is passed, it will be called after every render.
    // If an empty dependency array is passed, it will be called only once after the first render.
    // If a dependency array is passed with some variables, it will be called after the first render and whenever any of the variables in the array change.
    // useEffect is used to perform side effects in a functional component, like fetching data, subscribing to events, etc.

    useEffect(() => {
        console.log('====================================');
        console.log('useEffect called');
        console.log('====================================');

        fetchData();
    },[])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4945128&lng=78.3664454&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setFilteredRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    }


    console.log("body rendered");

    const isOnline = useOnlineStatus();
    if (!isOnline ) {
        return <h1>Looks like you are offline. Please check your internet connection.</h1>
    }

    return filteredRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="m-4 flex items-center justify-between">
                <button className = "cursor-pointer h-8 w-50 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => {
                    const filteredList = restaurants.filter((restaurant) => restaurant?.info.avgRating > 4.5);
                    setFilteredRestaurants(filteredList);
                }}>Top Rated Restaurants</button>
                <button className="cursor-pointer h-8 w-50 rounded-lg bg-gray-200 hover:bg-gray-300" onClick = {() => fetchData()}>Reset</button>

                <div className="search">

                <input type="text" className="border border-solid border-b-gray-700 p-1" placeholder="Search for restaurants..." value={searchText} onChange={(event) => {
                    setSearchText(event.target.value);
                    const filteredRestaurants = restaurants.filter((restaurant) => {
                        return restaurant?.info.name.toLowerCase().includes(event.target.value.toLowerCase());
                    } )
                    setFilteredRestaurants(filteredRestaurants);
                }} ></input>
                
            </div>
            </div>


            <div className="flex flex-wrap justify-center items-center gap-4">
                {filteredRestaurants.map((restaurant) => (
                    <Link key={restaurant?.info.id} to= {"/restaurants/" + restaurant?.info.id } >
                    <RestaurantCard  resData={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Body;