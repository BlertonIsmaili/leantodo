package ch.zhaw.sml.iwi.meng.leantodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Project;
import ch.zhaw.sml.iwi.meng.leantodo.entity.ProjectRepository;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import ch.zhaw.sml.iwi.meng.leantodo.entity.TaskRepository;


@Component
public class ProjectController {


    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;


    public List<Project> listAllProjects(String loginName) {
        return projectRepository.findByOwner(loginName);
    }

    public void persistProject(Project newProject, String owner) {
        newProject.setId(null);
        // We only create empty projects
        newProject.getTasks().clear();
        newProject.setOwner(owner);
        projectRepository.save(newProject);
    }

    public void addToDo(Long projectId, Task toDo, String responsible) {
        Project project = projectRepository.getOne(projectId);
        if(project == null || !project.getOwner().equals(responsible)) {
            return;
        }  
        // Ensure that JPA creates a new entity
        toDo.setId(null);
        toDo.setResponsible(responsible);
        project.getTasks().add(toDo);
        projectRepository.save(project);
    }

    public void addProject(Project project, String owner) {
     
        project.setId(null);
        project.setOwner(owner);
        projectRepository.save(project);
    }
    
}