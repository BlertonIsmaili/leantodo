package ch.zhaw.sml.iwi.meng.leantodo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Date;

@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;
    private String desc;
    private Date startTime;
    private Date endTime;
    private Boolean allDay;
    private Boolean isProject;
    
    @OneToMany
    private List<Project> Project = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

   public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Date getStarttime() {
        return startTime;
    }

    public void setStarttime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndtime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public List<Project> getProjects() {
        return Project;
    }

    public void setProject(List<Project> Project) {
        this.Project = Project;
    }

}