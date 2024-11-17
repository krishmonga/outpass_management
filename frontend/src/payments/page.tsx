import { Test } from "@/components/Test";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "dkjshuf",
      amount: 20,
      status: "pending",
      email: "m@Me.com",
    },
    {
      id: "13213",
      amount: 130,
      status: "pending",
      email: "m@data.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "dkjshuf",
      amount: 20,
      status: "pending",
      email: "m@Me.com",
    },
    {
      id: "13213",
      amount: 130,
      status: "pending",
      email: "m@data.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "dkjshuf",
      amount: 20,
      status: "pending",
      email: "m@Me.com",
    },
    {
      id: "13213",
      amount: 130,
      status: "pending",
      email: "m@data.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "dkjshuf",
      amount: 20,
      status: "pending",
      email: "m@Me.com",
    },
    {
      id: "13213",
      amount: 130,
      status: "pending",
      email: "m@data.com",
    },
    // ...
  ];
}

export const Page = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
      <Test />
    </div>
  );
};