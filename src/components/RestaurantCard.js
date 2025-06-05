import { CDN_URL } from "../utils/constants";
const RestaurantCard = ({resData}) => {
    
    return (
       // Make all cards same height
        <div className="w-75 h-90 p-4 m-2 shadow-lg bg-gray-50 rounded-lg hover:bg-gray-100">
            <img src= {CDN_URL +  resData?.info.cloudinaryImageId} alt="Restaurant Logo" className="rounded-lg w-50 h-50 ml-8 mt-4" />
            <h2 className="mt-4 font-bold">{resData?.info.name}</h2>
            <p className="font-light">{resData?.info.cuisines.join(", ")}</p>
            <p className="res-rating">Rating: {resData?.info.avgRating} ⭐</p>
        </div>
    )
}

export default RestaurantCard;