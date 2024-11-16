import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOutpassSchema } from "@/types and schemas/createOutpassSchema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { CREATE_OUTPASS } from "@/graphql/mutations/outpass.mutation";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // React Hook Form setup with Zod schema
const form = useForm<z.infer<typeof createOutpassSchema>>({
  resolver: zodResolver(createOutpassSchema),
  defaultValues: {
    name: "",
    dateFrom: "",
    dateTo: "",
    hostelNumber: "",
    contactNumber: "",
    reason: "",
    block: "A",
  },
});
  const [createOutpass, {loading}] = useMutation(CREATE_OUTPASS)

  const onSubmit = async (data: z.infer<typeof createOutpassSchema>) => {
    try {
      console.log("Outpass data submitted:", data);
  await createOutpass({
  variables: {
    input: {
      name: data.name,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      hostelNumber: data.hostelNumber,
      contactNumber: data.contactNumber,
      reason: data.reason,
      block: data.block,
      userId: "user123", 
    },
  },
});
      toast({ title: "Outpass request submitted successfully!" });
      navigate("/home");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting outpass request:", error);
      toast({ title: "Failed to submit the request", description: `${error.message}` });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Student Dashboard
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Welcome! Here you can request and manage your outpasses.
          </p>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date From */}
          <FormField
            control={form.control}
            name="dateFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date From</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date To */}
          <FormField
            control={form.control}
            name="dateTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date To</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hostel Number */}
          <FormField
            control={form.control}
            name="hostelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hostel Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your hostel number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your 10-digit contact number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Outpass</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the reason for your outpass" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Block */}
          <FormField
            control={form.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <select {...field} className="border border-gray-300 p-2 w-full rounded">
                    <option value="">Select Block</option>
                    {["A", "B", "C", "D"].map((block) => (
                      <option key={block} value={block}>
                        Block {block}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Submit Request
          </Button>
        </form>
      </Form>

      {/* Back to Home Button */}
      <Button
        onClick={() => navigate("/home")}
        variant="outline"
        className="w-full mt-4"
        type="button"
      >
        Back to Home
      </Button>
    </div>
  );
};