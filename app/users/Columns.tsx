"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronUp } from "lucide-react";

type UserType = {
  id: string;
  name: string;
  email: string;
  coutry_code: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<UserType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 cursor-pointer  w-max items-center"
        >
          <h1>Email</h1>
          <ChevronUp
            className={`${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            } transition-all`}
          />
        </div>
      );
    },
    accessorKey: "email",
  },
  {
    header: "Country Code",
    accessorKey: "coutry_code",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: (info) => (
      <span>{new Date(info.row.getValue("createdAt")).toLocaleString()}</span>
    ),
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: (info) => (
      <span>{new Date(info.row.getValue("updatedAt")).toLocaleString()}</span>
    ),
  },
];
