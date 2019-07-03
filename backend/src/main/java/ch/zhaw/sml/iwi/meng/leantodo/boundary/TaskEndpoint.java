package ch.zhaw.sml.iwi.meng.leantodo.boundary;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.zhaw.sml.iwi.meng.leantodo.controller.TaskController;
import ch.zhaw.sml.iwi.meng.leantodo.entity.Task;


@RestController
public class TaskEndpoint {

    @Autowired
    private TaskController taskController;

    @RequestMapping(path = "/api/task", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public List<Task> toDo(Principal principal) {
        return taskController.listAllTasks(principal.getName());
    }

    @RequestMapping(path = "/api/task", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    public void addToDo(@RequestBody Task newToDo, Principal principal) {
        taskController.persistTask(newToDo);
    }
    
    // @RequestMapping(path = "/api/task", method = RequestMethod.PUT)
    // @PreAuthorize("isAuthenticated() AND hasRole('USER')")
    // public void updateToDo(@RequestBody ToDo toDo, Principal principal) {
    //     toDoController.updateToDo(toDo, principal.getName());
    // }
}