/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAppSelector } from "@/redux/hooks" // Import the useAppSelector hook

export type Outpass = {
  id: string
  name: string
  email: string
  leavePeriod: string
  status: "pending" | "success" | "failed"
} 

// Move sendEmailToStudent outside the column definition
const sendEmailToStudentHandler = async (emailMessage: string, fromMail: string) => {
  try {

    console.log('This is the message:', emailMessage, fromMail)
  } catch (err) {
    console.error('Failed to send email:', err)
  }
}

export const columns: ColumnDef<Outpass>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }: { getValue: () => unknown }) => {
      const fromMail = useAppSelector(state => state.authUser.user?.email) as string // Use the hook correctly
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="text-blue-600 active:text-red-500 underline">
                {getValue() as string}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <span className="font-normal text-sm"> Send mail to</span> {getValue() as string}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="relative border border-red-600">
                <Textarea id="email-textarea" className="resize-none h-32 border-none active:border-none focus:border-none" />
                <div className="w-full flex justify-end bg-white">
                  <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent">
                    <button
                      className="rounded bg-zinc-300/40 px-3"
                      onClick={() => {
                        const textarea = document.getElementById("email-textarea") as HTMLTextAreaElement | null;
                        if (textarea) {
                          sendEmailToStudentHandler(textarea.value, fromMail); // Pass email message to handler
                        } else {
                          console.error('Textarea with id "email-textarea" not found');
                        }
                      }}
                    >
                      Send
                    </button>
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
  {
    accessorKey: "leavePeriod",
    header: "Leave Period",
    cell: ({ getValue }) => `${getValue()} days`,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]