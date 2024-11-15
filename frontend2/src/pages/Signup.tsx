import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { signUpSchema } from "@/types and schemas/signupSchema";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserTypeSwitcher from "@/components/UserTypeSwitcher";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/graphql/mutations/user.mutation";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
    const navigate = useNavigate();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    });

    const [signup, { loading, error }] = useMutation(SIGNUP_USER)
    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            console.log("Signup data:", data);
            if (data.confirmPassword !== data.password) throw "Password does not match"
            
            await signup({
                variables: {
                    input: data
                }
            })
            toast({title: "Successfully registered"})
            navigate('/login')
        } catch (error) {
            toast({ title: `${error}` })
            console.error('Error:',error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Register</h2>

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
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <label className="text-gray-700">Male</label>
                                        <Switch
                                            checked={field.value === "MALE"}
                                            onCheckedChange={(checked) => field.onChange(checked ? "MALE" : "FEMALE")}
                                        />
                                        <label className="text-gray-700">Female</label>
                                    </div>
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
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full mt-4" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
}