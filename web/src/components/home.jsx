import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [offersArray, setOffersArray] = useState([]);
  const [position, setPosition] = useState(null);
  const [locationis, setlocation] = useState(null)

  const AcceptReqHandler = (id) => {
    // Handle accept action with the given id
  };
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    // Get the current position
    const successHandler = (position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorHandler = (error) => {
      console.error('Error getting geolocation:', error);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []); // Empty dependency array to run only once on component mount

  const getAddressHandler = async()=>{
      const { latitude, longitude } = position;
      const apiKey = 'pk.361ab1d315be84a492e73c8f66522542';

      axios.get(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json&`,)
        .then((response) =>{
          console.log("response is",response)
            setlocation(response.data.display_name)
        })
        
        
        .catch((error) => {
          console.error('Error fetching address:', error);
        });
        console.log("sfs")
  }
  useEffect(() => {
    console.log("positions is",position)
    if (position) {
      getAddressHandler()
    }
  }, [position]);    
  
  const RemoveReqHandler = (id) => {
    // Handle remove action with the given id
    setOffersArray(offersArray.filter((e)=> e.id !== id))
  };
  useEffect(() => {
    // Function to add a new card to the array
    const addNewCard = () => {
      setOffersArray((prevOffers) => [
        {
          driverName: "New Driver",
          viName: "New Vehicle",
          distance: "New Distance",
          id: prevOffers.length + 1 // Assign a unique ID
        },
        ...prevOffers
      ]);
    };

    // Interval for adding a new card every 4 seconds
    const intervalId = setInterval(addNewCard, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  return (
    <>
      <div className="flex">
        <div>
            <div>
        <h3 className="text-xl font-bold">
          You will get offers by your current location
          {locationis}
        </h3>
           </div>
               {/* <div className="max-w-[400px] flex flex-col items-center gap-4">
        {offersArray.map((offer) => (
          <div key={offer.id} className="bg-slate-100 rounded p-[20px] w-full">
            <div>
            <h1>
              {offer.driverName}- <span>{offer.viName}</span>
            </h1>
            <h3>
              Distance - <span>{offer.distance}</span>
              <span>idis : {offer.id}</span>
            </h3>
            </div>
            <div>
            <button onClick={() => AcceptReqHandler(offer.id)}>Accept</button>
<button onClick={() => RemoveReqHandler(offer.id)}>Remove</button>
            </div>
          </div>
        ))}
               </div> */}
         </div>
         <div>
          {/* <Map /> */}
         </div>
      </div>
    </>
  );
};

export default Home;
