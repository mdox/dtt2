import { useMemo } from "react";
import { Driver } from "../lib/types";

export interface DriverCardProps extends Driver {
  onOvertake(driverId: number): void;
}

// prettier-ignore
const teamColors: Record<string, string> = {
  "Williams"       : "rgba(  0,   0,   0, 0.5)",
  "Alpine"         : "rgba(255,   0,   0, 0.5)",
  "Alfa Romeo"     : "rgba(  0, 255,   0, 0.5)",
  "AlphaTauri"     : "rgba(  0,   0, 255, 0.5)",
  "Mercedes"       : "rgba(255, 255,   0, 0.5)",
  "Aston Martin"   : "rgba(  0, 255, 255, 0.5)",
  "Ferrari"        : "rgba(255,   0, 255, 0.5)",
  "Haas F1 Team"   : "rgba( 16, 244,   0, 0.5)",
  "McLaren"        : "rgba(  0,  16, 244, 0.5)",
  "Red Bull Racing": "rgba(255,   0,  16, 0.5)",
};

export function DriverCard(props: DriverCardProps) {
  // Memos
  const memoTeamColor = useMemo(() => {
    return teamColors[props.team] ?? "000";
  }, [props.team]);

  const memoPlace = useMemo(() => {
    return props.place! + 1;
  }, [props.place]);

  const memoFullname = useMemo(
    () => `${props.firstname} ${props.lastname}`,
    [props.firstname, props.lastname]
  );

  // Events
  function onOvertake() {
    props.onOvertake(props.id);
  }

  // Renders
  return (
    <div className="flex gap-4 p-2 rounded shadow">
      <div className="relative w-36 h-36 shrink-0">
        <img
          src={props.imgUrl}
          alt={memoFullname}
          style={{
            backgroundColor: memoTeamColor,
          }}
          className="rounded shadow"
        />
        <span className="absolute right-2 bottom-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          {memoPlace}
        </span>
      </div>
      <div className="flex flex-col gap-2 grow">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <img
              src={`https://countryflagsapi.com/svg/${props.country}`}
              alt={props.country}
              className="w-8"
            />
            <h2 className="m-0">{memoFullname}</h2>
          </div>
          <button
            type="button"
            disabled={memoPlace === 1}
            className="flex items-center justify-center px-3 py-2 bg-stone-300 disabled:opacity-25"
            onClick={onOvertake}
          >
            Overtake
          </button>
        </div>
        <p>{props.team}</p>
        <p>{props.code}</p>
      </div>
    </div>
  );
}
