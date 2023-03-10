import Table from "react-bootstrap/Table";
import './TaskSection.css';

const TaskSection = ({ tasks, time }) => {
  return (
    <>
      <Table className="table" responsive>
        <thead>
          <tr>
            <th>Time</th>
            <th>Title</th>  
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {tasks.map((task, index) => {
            return (
              <tr key={index}>
                <td>{task.time} <span className="seconds">seconds(00:00:{task.time})</span></td>
                <td>{task.title}</td>
                <td className="wrap">{task.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TaskSection;
