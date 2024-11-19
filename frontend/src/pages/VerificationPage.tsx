import { Loading } from "@/components";
import { VERIFY_USER } from "@/graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerificationPage() {
  const { token } = useParams();
  const [verify, { loading }] = useMutation(VERIFY_USER, {
    refetchQueries: [GET_AUTHENTICATED_USER],
  });
  const [data, setData] = useState();

  const handleVerification = async () => {
    try {
      const { data } = await verify({ variables: { verifyToken: token } });
      setData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    handleVerification();
  }, []);

  console.log("this is the useState data", data);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full flex justify-center items-center text-4xl font-semibold">
      somethiing
    </div>
  );
}

export default VerificationPage;
