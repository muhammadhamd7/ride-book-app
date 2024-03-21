import React, { useState, useEffect } from "react";

const Home = () => {
  const [offersArray, setOffersArray] = useState([]);
  const AcceptReqHandler = (id) => {
    // Handle accept action with the given id
  };
  
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
      <div>
        <h3 className="text-xl font-bold">
          apply for ride
        </h3>
      </div>
      <div className="max-w-[400px] flex flex-col items-center gap-4">
        {offersArray.map((offer) => (
          <div key={offer.id} className="bg-slate-100 rounded p-[20px] w-full">
            <div>
            <h1>
              {offer.driverName}<span>{}</span>
            </h1>
            <h3>
              Distance - <span>{offer.distance}</span>
              <span>idis : {offer.id}</span>
            </h3>
            </div>
            <div>
            <button onClick={() => AcceptReqHandler(offer.id)}>Apply</button>
<button onClick={() => RemoveReqHandler(offer.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
