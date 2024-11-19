/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, Link } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/types and schemas/loginSchema";
import UserTypeSwitcher from "@/components/UserTypeSwitcher";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations/user.mutation";
import { FACULTY_NOT_VERIFIED, USER_NOT_FOUND } from "@/assets/constant";
import { NotFound } from "./NotFound";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";


export const Login = () => {
  const navigate = useNavigate();
  const {toast} = useToast()
  // React Hook Form setup
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [login, {loading, error}] = useMutation(LOGIN_USER, {refetchQueries: [GET_AUTHENTICATED_USER]})

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log('this is the data', data)
   try {
     await login({variables: {input: data}})
     navigate('/')
   } catch (error : any) {
    console.error("Some error occured", error)
    toast({title: `${error.message}`, variant: 'destructive'})
   }
  };

  if(error?.message == USER_NOT_FOUND) return <NotFound userType={form.watch('userType')} />
  if(error?.message == FACULTY_NOT_VERIFIED) return <h1>${error.message}</h1>

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-blue-400/20 shadow-md rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login</h2>

          <UserTypeSwitcher name="userType" control={form.control} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging In..." : "Login"}
          </Button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}