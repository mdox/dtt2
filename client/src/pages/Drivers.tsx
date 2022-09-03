import { Link } from "react-router-dom";
import { DriverCard } from "../components/DriverCard";

export function Drivers() {
  // Renders
  return (
    <div className="flex flex-col gap-2">
      <p>
        <Link to="/">Back to Home please.</Link>
      </p>

      <DriverCard
        id={-23}
        firstname="John"
        lastname="Doe"
        code="CODE_231"
        country="FR"
        team="Red"
        imgUrl="/static/alb.png"
        place={3}
      ></DriverCard>
    </div>
  );
}
