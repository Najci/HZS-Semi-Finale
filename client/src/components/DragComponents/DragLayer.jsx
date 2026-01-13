import { FoodNormal } from "../FoodComponents/FoodProp";

function DragLayer({ dragging }) {
    if (!dragging) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          left: dragging.x,
          top: dragging.y,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999
        }}
      >
        <img src={dragging.food.Img} width={64} />
      </div>
    );
  }
  
  export default DragLayer;
  