import TaskForm from "../components/TaskForm";

function EditTask() {
  return (
    <div>
      <TaskForm isEditing={true} />
    </div>
  );
}

export default EditTask;
