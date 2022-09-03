import { useMemo } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { DriverCard } from "../components/DriverCard";
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

      <div className="flex flex-col gap-2">
        {memoDrivers.map((driver) => (
          <DriverCard key={driver.id} {...driver} onOvertake={onOvertake} />
        ))}
      </div>
    </div>
  );
}
