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
public class GroceryListController {

    @Autowired
    GroceryListRepository groceryListRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    MongoOperations mongoOperations;

    //add grocery list
    @RequestMapping(value = "/addGroceryList", method = POST)
    public ResponseEntity<GroceryList> update(@RequestBody GroceryList newGroceryList){
        groceryListRepository.save(newGroceryList);
        System.out.println(newGroceryList);
        System.out.println(newGroceryList.getName() + " successfully added");
        return ResponseEntity.ok(newGroceryList);
    }

    //get all grocery lists
    @RequestMapping(value = "/allGroceryLists", method = RequestMethod.GET)
    public List<GroceryList> getAllGroceryLists(){
        return groceryListRepository.findAll();
    }

    //get one grocery list by id
    @RequestMapping(value = "/oneGroceryList/{id}", method = RequestMethod.GET)
    public Optional<GroceryList> findById(@PathVariable("id") String id){
        return groceryListRepository.findById(id);
    }

    //get one grocery list by name
    @RequestMapping(value = "/oneGroceryListByName/{name}", method = RequestMethod.GET)
    public List<GroceryList> findByName(@PathVariable("name") String name){
        return groceryListRepository.findByName(name);
    }

    //edit one grocery list
    @RequestMapping(value = "/editGroceryList/{id}", method = RequestMethod.PUT)
    public List<GroceryList> editGroceryList(@PathVariable("id") String id, @RequestBody GroceryList editedGroceryList){
        long itemCount = mongoOperations.count(new Query(Criteria.where("groceryListId").is(editedGroceryList.id)), Item.class, "item");
        GroceryList groceryList = mongoOperations.findOne(new Query(Criteria.where("id").is(id)), GroceryList.class, "groceryList");
        groceryList.setItemCount(itemCount);
        groceryList.setActive(editedGroceryList.active);
        groceryList.setId(editedGroceryList.id);
        groceryList.setName(editedGroceryList.name);
        mongoOperations.save(groceryList);
        return groceryListRepository.findAll();
    }

    //delete one grocery list by id
    @RequestMapping(value = "/deleteGroceryListById/{id}", method = RequestMethod.DELETE)
    public List<GroceryList> deleteGroceryListById(@PathVariable("id") String id){
        GroceryList deletedGroceryList = mongoOperations.findAndRemove(new Query(Criteria.where("id").is(id)), GroceryList.class, "groceryList");
        System.out.println(deletedGroceryList);
        return groceryListRepository.findAll();
    }

    //delete one grocery list by name
    @RequestMapping(value = "/deleteGroceryListByName/{name}", method = RequestMethod.DELETE)
    public List<GroceryList> deleteGroceryListByName(@PathVariable("name") String name){
        GroceryList deletedGroceryList = mongoOperations.findAndRemove(new Query(Criteria.where("name").is(name)), GroceryList.class, "groceryList");
        System.out.println(deletedGroceryList);
        return groceryListRepository.findAll();
    }


}
