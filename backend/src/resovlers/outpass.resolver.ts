const outpassResolvers = {
  Query: {
    // Adjusted to return all the fields as per the Outpass type definition
    getOutpass: (_: any, { id }: any) => {
      // In a real-world scenario, fetch outpass from the database using the ID
      return {
        id,
        name: 'John Doe', // Dummy name
        dateFrom: '2024-11-10T10:00:00Z', // Date in ISO format (matching DateTime)
        dateTo: '2024-11-10T18:00:00Z', // Date in ISO format (matching DateTime)
        hostelNumber: '101', // Dummy hostel number
        contactNumber: '9876543210', // Dummy contact number
        reason: 'Personal work', // Dummy reason
        block: 'BLOCK_A', // Enum value for block
        user: { id: '123', name: 'John Doe', email: 'john.doe@example.com' }, // Simulated User
      };
    },
    getAllOutpasses: () => {
      // Simulate fetching all outpasses from the database
      return [
        {
          id: '1',
          name: 'John Doe',
          dateFrom: '2024-11-10T10:00:00Z',
          dateTo: '2024-11-10T18:00:00Z',
          hostelNumber: '101',
          contactNumber: '9876543210',
          reason: 'Personal work',
          block: 'BLOCK_A',
          user: { id: '123', name: 'John Doe', email: 'john.doe@example.com' },
        },
        {
          id: '2',
          name: 'Jane Doe',
          dateFrom: '2024-11-11T09:00:00Z',
          dateTo: '2024-11-11T17:00:00Z',
          hostelNumber: '102',
          contactNumber: '9876543211',
          reason: 'Medical',
          block: 'BLOCK_B',
          user: { id: '124', name: 'Jane Doe', email: 'jane.doe@example.com' },
        },
      ];
    },
  },

  Mutation: {
    createOutpass: (_: any, { input }: any) => {
      // Simulate creating a new outpass, typically this would involve saving to a database
      const newOutpass = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID (for testing)
        ...input, // Spread the input properties to create a new outpass
      };
      return newOutpass;
    },

    updateOutpass: (_: any, { id, input }: any) => {
      // Simulate updating outpass in the database
      return { id, ...input }; // Return updated outpass
    },

    deleteOutpass: (_: any, { id }: any) => {
      // Simulate deleting an outpass
      return { id, reason: 'Deleted outpass', date: '2024-11-10' };
    },
  },
};

export default outpassResolvers;