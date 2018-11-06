package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

//import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ToDoItemController {


    @Autowired
    ToDoItemRepository ToDoItemRepository;

    @Autowired
    GroceryListRepository groceryListRepository;

    @Autowired
    MongoOperations mongoOperations;

    //add one item
    @RequestMapping(value = "/addToDoItem", method = POST)
    public ResponseEntity<ToDoItem> update(@RequestBody ToDoItem newToDoItem) {
        ToDoItemRepository.save(newToDoItem);
        ToDoList toDoList = mongoOperations.findOne(new Query(Criteria.where("id").is(newToDoItem.toDoListId)), ToDoList.class, "toDoList");
        long itemCount = toDoList.itemCount + 1;
        System.out.println(itemCount);

        toDoList.setItemCount(itemCount++);
        mongoOperations.save(toDoList);
        //Optional <GroceryList> editedGroceryList = groceryListRepository.findById(newItem.groceryListId);
        System.out.println(toDoList);
        System.out.println(newToDoItem.item + " successfully added");
        return ResponseEntity.ok(newToDoItem);
    }

    //get all items
    @RequestMapping(value = "/allToDoItems", method = RequestMethod.GET)
    public List<ToDoItem> getItems() {
        return ToDoItemRepository.findAll();
    }

    //get all items by grocery list id
    @RequestMapping(value = "/allToDoItemsByList/{toDoListId}", method = RequestMethod.GET)
    public List<ToDoItem> findByToDoListId(@PathVariable("toDoListId") String toDoListId){
        List getToDoList = mongoOperations.find(new Query(Criteria.where("toDoListId").is(toDoListId)), ToDoItem.class, "toDoItem");
        System.out.println(getToDoList);
        return getToDoList;
    }

    //delete one by id
    @RequestMapping(value = "/deleteOneToDoItem/{id}", method = RequestMethod.DELETE)
    public List<ToDoItem> deleteOne(@PathVariable("id") String id){
        ToDoItem deletedItem = mongoOperations.findAndRemove(new Query(Criteria.where("id").is(id)), ToDoItem.class,"toDoItem");
        System.out.println(deletedItem);
        ToDoList toDoList = mongoOperations.findOne(new Query(Criteria.where("id").is(deletedItem.toDoListId)), ToDoList.class, "toDoList");
        long itemCount = toDoList.itemCount -1;
        System.out.println(itemCount);
        toDoList.setItemCount(itemCount);
        mongoOperations.save(toDoList);
        System.out.println(deletedItem);
        List getToDoList = mongoOperations.find(new Query(Criteria.where("toDoListId").is(deletedItem.toDoListId)), ToDoItem.class, "toDoItem");
        return getToDoList;
    }

    //edit item
    @RequestMapping(value = "/editOneToDoItem/{id}", method = RequestMethod.PUT)
    public List<ToDoItem> editOne(@PathVariable("id") String id, @RequestBody ToDoItem editedItemDetails){
        System.out.println(editedItemDetails);
        ToDoItem editItem = mongoOperations.findOne(new Query(Criteria.where("id").is(id)), ToDoItem.class, "toDoItem");
        System.out.println(editedItemDetails);
        System.out.println(editItem);
        editItem.setActive(editedItemDetails.active);
        editItem.setId(id);
        editItem.setDueDate(editedItemDetails.dueDate);
        editItem.setNotes(editedItemDetails.notes);
        editItem.setItem(editedItemDetails.item);
        editItem.setToDoListId(editedItemDetails.toDoListId);
        mongoOperations.save(editItem);
        return ToDoItemRepository.findAll();
    }
}



