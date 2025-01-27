import BounceLoader from "react-spinners/BounceLoader";

const LinkSpinner = ({ isLoading }) => {
    const color = isLoading ? 'green' : 'red';
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BounceLoader color={color}
        speedMultiplier={0.5}
        size={25}
         />
      </div>
    );
  };

export default LinkSpinner;

       