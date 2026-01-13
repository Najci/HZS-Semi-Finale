import { FoodNormal } from "../FoodComponents/FoodProp";

function PlateComponent({ properties}) {

    return (
      <div
        style={{
          position: "absolute",
          left: properties.posX,
          top: properties.posY,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999
        }}
        className="h-[9vh] w-[9vh]"
      >
        <img className="drop-shadow-[5px_5px_3px_rgba(0,0,0,0.5)] mx-auto h-full w-full" src={properties.Img} width={64} />
      </div>
    );
}

  
export default PlateComponent;
  