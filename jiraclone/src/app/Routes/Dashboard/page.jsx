import TaskBoard from '../../../components/task-board'
import SearchBar from "../../../components/SearchBar";
export default function abc(){
    return (
        <div className="container mx-auto px-3 py-8 h-screen">
            <SearchBar/>
            <TaskBoard/>
        </div>
        
    )
}