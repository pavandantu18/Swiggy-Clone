import React from 'react'

import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
const RestaurantMenu = () => {
    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);
   
    if( resInfo === null) {
      return <Shimmer />
    }

    const {name,cuisines,costForTwoMessage} = resInfo?.cards[2]?.card.card.info;
    const itemNames = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

    if (!itemNames) {
        return <h1>Menu not available</h1>
    }
  return (
    <div className='menu'>
        <h1>{name}</h1>
        <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
        <h2>Menu</h2>
        <ul>
            {itemNames.map(item => {
                return (
                     <li key={item.card.info.id}>{item.card.info.name || item.card.info.title}</li>
                )
            })}
        </ul>
    </div>
  )
}

export default RestaurantMenu