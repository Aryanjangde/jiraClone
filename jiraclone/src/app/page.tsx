// import Image from "next/image";
// import CreateIssue from "../components/CreateIssue"
import SearchBar from "@/components/SearchBar";
import TaskBoard from "@/components/task-board";

export default function Home() {
  return (
    <div className="container mx-auto px-3 py-8 h-screen">
      <SearchBar/>
      <TaskBoard/>
    </div>
  );
}
