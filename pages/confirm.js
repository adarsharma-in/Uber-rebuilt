import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/dist/client/router";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query; //fetching the pickup and dropoff locations from previous page.

  // console.log("pickup:", pickup);
  // console.log("dropoff:", dropoff);

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + //Fetching the coordinates of the pickup location.
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWRhcnNoLXNoYXJtYTYyMTgiLCJhIjoiY2t2bHA5bDZuMDMzNjJ3cjJjYzNuNG1ieCJ9.QdNHT48FzKYo-MW9BsMUDA",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.features[0].center);
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + //Fetching the coordinates of the dropoff location.
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWRhcnNoLXNoYXJtYTYyMTgiLCJhIjoiY2t2bHA5bDZuMDMzNjJ3cjJjYzNuNG1ieCJ9.QdNHT48FzKYo-MW9BsMUDA",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.features[0].center);
        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <BackIconContainer>
        <Link href="/search" passHref>
          <BackButton
            src="https://img.icons8.com/ios-filled/50/000000/left.png"
            alt="back icon"
          />
        </Link>
      </BackIconContainer>

      <Map //loading map with desired pickup and dropoff coordinates.
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />

      {/*Ride selector options along with their prices*/}
      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
   h-screen flex flex-col
`;

const RideContainer = tw.div`
    flex flex-col
`;

const ConfirmButtonContainer = tw.div`
flex justify-center border-t-2
`;

const ConfirmButton = tw.div`
bg-black text-white cursor-pointer rounded-lg transform hover:scale-105 transition w-2/3 text-center p-2 text-lg my-2
`;

const BackIconContainer = tw.div`
absolute top-4 left-4 z-10 bg-white rounded-full cursor-pointer shadow-lg
`;

const BackButton = tw.img`
object-contain `;
