"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex justify-between w-11/12 ">
        <div className="flex justify-center w-full gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full  px-4 py-2 ml-4 text-gray-700  bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />

          <button type="submit" className="relative right-12">
            <svg
              className="w-6 h-6 text-blue-500 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <Select>
            <SelectTrigger className="w-[180px] border-sky-500">
              <SelectValue placeholder="SORT BY"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NONE">NONE</SelectItem>
              <SelectItem value="status">STATUS</SelectItem>
              <SelectItem value="deadline">DEADLINE</SelectItem>
              <SelectItem value="priority">PRIORITY</SelectItem>
              <SelectItem value="createdAt">CREATED AT</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
      </div>
    </form>
  );
}
