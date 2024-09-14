// import Image from "next/image";
// import CreateIssue from "../components/CreateIssue"
import Sidebar from "../components/Sidebar"
import Login from '../components/Login'
import SearchBar from "../components/SearchBar"
import TaskBoard from "../components/task-board"
export default function Home() {
  return (
    <div>
      {/* <Login/> */}
      {/* <SearchBar/> */}
      <TaskBoard/>
    </div>
  );
}
