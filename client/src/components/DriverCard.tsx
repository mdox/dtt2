import { useMemo } from "react";
import { Driver } from "../lib/types";

export interface DriverCardProps extends Driver {}

export function DriverCard(props: DriverCardProps) {
  // Memos
  const memoPlace = useMemo(() => {
    return props.place! + 1;
  }, [props.place]);

  const memoFullname = useMemo(
    () => `${props.firstname} ${props.lastname}`,
    [props.firstname, props.lastname]
  );

  // Renders
  return (
    <div className="flex gap-4 p-2 rounded shadow">
      <div className="relative w-36 h-36 shrink-0">
        <img src={props.imgUrl} alt={memoFullname} className="rounded shadow" />
        <span className="absolute right-2 bottom-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          {memoPlace}
        </span>
      </div>
      <div className="flex flex-col gap-2 grow">
        <div className="flex justify-between items-start">
          <h2>{memoFullname}</h2>
          <button
            type="button"
            disabled={memoPlace === 1}
            className="flex items-center justify-center px-3 py-2 bg-stone-300 disabled:opacity-25"
          >
            Overtake
          </button>
        </div>
        <p>TEAM: {props.team}</p>
        <p>CODE: {props.code}</p>
      </div>
    </div>
  );
}
