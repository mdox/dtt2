import { useMemo } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { DriverCardContainer } from "../components/DriverCardContainer";
import { Driver } from "../lib/types";

export function Drivers() {
  // SWR
  const { data, mutate } = useSWR<Driver[]>("/api/drivers", (url) =>
    fetch(url).then((res) => res.json())
  );

  // Memos
  const memoDrivers = useMemo(() => {
    if (!data) return [];
    return data.sort((a, b) => (a.place! < b.place! ? -1 : 1));
  }, [data]);

  // Events
  async function onTakePlace(takerDriverId: number, holderDriverId: number) {
    mutate(
      await fetch(`/api/drivers/${takerDriverId}/takeplace/${holderDriverId}`, {
        method: "POST",
      }).then((res) => res.json())
    );
  }

  async function onOvertake(driverId: number) {
    mutate(
      await fetch(`/api/drivers/${driverId}/overtake`, {
        method: "POST",
      }).then((res) => res.json())
    );
  }

  // Renders
  return (
    <div className="flex flex-col gap-2">
      <p>
        <Link to="/">Back to Home please.</Link>
      </p>

      <DriverCardContainer
        items={memoDrivers}
        onTakePlace={onTakePlace}
        onOvertake={onOvertake}
      />
    </div>
  );
}
