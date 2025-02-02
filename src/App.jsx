import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoPropjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
import Tasks from "./components/Tasks";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    const taskId = Math.random()
    setProjectsState(prevState => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]  
      }
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    });
  }


  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: id
      }
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: null
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined
      }
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random()
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProject)
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProject);
  let content = <SelectedProject project={selectedProject} 
                  onDelete={handleDeleteProject} 
                  onAddTask={handleAddTask} 
                  onDeleteTask={handleDeleteTask} 
                  tasks={projectsState.tasks}/>;

  if (projectsState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject}
        project={projectsState.projects} 
        onSelectProject={handleSelectProject} 
        selectedProjectId={projectsState.selectedProject} />
      {content}
    </main>
  );
}

export default App;
