const userResolver = {
  Query: {
    getOutpass: () => {
      return { id: 1, reason: 'Personal work', date: '2024-11-10' }; // Dummy outpass data
    },
  },
  Mutation: {
    createOutpass: (_: any, { reason, date }: any) => {
      return { id: 2, reason, date }; // Create a dummy outpass entry
    },
  },
};

export default userResolver ;