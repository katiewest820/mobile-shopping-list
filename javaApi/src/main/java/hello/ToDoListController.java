package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class ToDoListController {

    @Autowired
    ToDoListRepository ToDoListRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    MongoOperations mongoOperations;

    //add to-do list
    @RequestMapping(value = "/addToDoList", method = POST)
    public ResponseEntity<ToDoList> update(@RequestBody ToDoList newToDoList){
        ToDoListRepository.save(newToDoList);
        System.out.println(newToDoList);
        System.out.println(newToDoList.getName() + " successfully added");
        return ResponseEntity.ok(newToDoList);
    }

    //get all to do lists
    @RequestMapping(value = "/allToDoLists", method = RequestMethod.GET)
    public List<ToDoList> getAllToDoLists(){
        return ToDoListRepository.findAll();
    }

    @RequestMapping(value = "/oneToDoList/{id}", method = RequestMethod.GET)
    public Optional<ToDoList> findtById(@PathVariable("id") String id){
        return ToDoListRepository.findById(id);

    }

    @RequestMapping(value = "/deleteToDoListById/{id}", method = RequestMethod.DELETE)
    public List<ToDoList> deleteToDoListById(@PathVariable("id") String id){
        ToDoList deleteToDoList = mongoOperations.findAndRemove(new Query(Criteria.where("id").is(id)), ToDoList.class, "toDoList");
        System.out.println(deleteToDoList);
        return ToDoListRepository.findAll();
    }
}
