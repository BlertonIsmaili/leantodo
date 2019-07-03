package ch.zhaw.sml.iwi.meng.leantodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;
import ch.zhaw.sml.iwi.meng.leantodo.entity.TaskRepository;

@Component
public class TaskController {


    @Autowired
    private TaskRepository taskRepository;

    public List<Task> listAllTasks(String loginName) {
        return taskRepository.findAll();
    }

    public void persistTask(Task newToDo) {
      
        newToDo.setId(null);
        taskRepository.save(newToDo);
    }

    public void updateTask(Task toDo, String responsible) {
        Task orig = taskRepository.getOne(toDo.getId());
        // Check if the original ToDo was present and that it belonged to the same owner
        if(orig == null || !orig.getResponsible().equals(responsible)) {
            return;
        }
        // Ok, let's overwrite the existing toDo.
        taskRepository.save(toDo);
    }
    
}