/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_ALL_OUTPASSES } from '@/graphql/queries/outpass.query';
import { formatHostel } from '@/lib/formatHostelString';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataTable } from '../outpasses-table/data-table';
import { columns, Outpass } from '../outpasses-table/columns';
import { GetAllOutpassesResponse, GetAllOutpassesVariables } from '@/graphql/mutations/outpass.mutation';
import { Loading } from '@/components';

async function getData(): Promise<Payment[]> {
  // Mock API data fetching
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      leavePeriod: '5',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      leavePeriod: '10',
      status: 'success',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      leavePeriod: '7',
      status: 'failed',
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      leavePeriod: '15',
      status: 'pending',
    },
    {
      id: '5',
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      leavePeriod: '12',
      status: 'success',
    },
  ];
}

export const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { hostel } = useParams();
  const hostelName = formatHostel(hostel) as string

  const { data: outpassData, loading, error } = useQuery<GetAllOutpassesResponse, GetAllOutpassesVariables>(GET_ALL_OUTPASSES, {
    variables: { hostelName },
  });

  const [tableData, setTableData] = useState<Outpass[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getData();
      setTableData(data);
    };
    fetchTableData();
  }, []);

  

  console.log('GraphQL data', outpassData?.getAllOutpasses);
  console.log('GraphQL error', error?.message);

  if(loading) return <h1>loader</h1> // temperary
  if(outpassData?.getAllOutpasses == undefined) return null // iska bhi logic likhna ha

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-6xl mx-auto border border-blue-400/20 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Faculty Dashboard</h2>

        {/* Pending Outpasses Section */}
        <div className='flex gap-2 justify-center items-center'>
          
          <span className="text-xl font-semibold flex text-gray-700">Pending Outpasses: </span>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <p className='font-semibold'>  {outpassData?.getAllOutpasses?.length }</p>
          )}

          </div>
        {/* Payments Data Table Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Payments Table</h3>
          <DataTable columns={columns} data={outpassData?.getAllOutpasses} />
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};