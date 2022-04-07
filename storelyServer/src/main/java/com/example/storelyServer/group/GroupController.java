package com.example.storelyServer.group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="group")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public List<Group> show(){
        return groupService.getGroups();
    }

    @GetMapping("{groupId}")
    public Group getById(@PathVariable Long groupId){
        return groupService.getGroupById(groupId);
    }

    @PostMapping
    public void registerNewUser(@RequestBody Group group){
        groupService.addNewGroup(group);
    }
}
