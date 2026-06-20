import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Vehicle {
  customerId: string;
  customerName: string;
  registrationNumber: string;
  make: string;
  model: string;
  archived: boolean;
  createdAt: string;
  updated: string;
  jobs?: { id: string; status: string }[];
  quotes?: { id: string; amount: number }[];
  inspections?: { id: string; date: string }[];
}

export default function VehicleDetail() {
  const { id } = useParams();
  const [Vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetch('/api/vehicle/${id}')
      .then((res) => res.json())
      .then(setVehicle);
  }, [id]);

  if (!Vehicle) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow">
      {Vehicle ? (
        <>
          <h1 className="text-2xl font-blod mb-4">
            {Vehicle.make} {Vehicle.model} ({Vehicle.registrationNumber})
          </h1>
          <p>Owner: {Vehicle.customerName}</p>
          <p>Created: {new Date(Vehicle.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(Vehicle.updated).toLocaleString()}</p>
          {/* {Vehicle.archived && (
            
        )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
