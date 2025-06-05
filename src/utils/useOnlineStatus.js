import React from 'react'
import { useState, useEffect } from 'react';
const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        window.addEventListener("online", () => {
            setIsOnline(true);
            console.log("You are online now");
        }
        );
        window.addEventListener("offline", () => {
            setIsOnline(false);
            console.log("You are offline now");
        }
        );
    }, []);
    return isOnline;

}
export default useOnlineStatus