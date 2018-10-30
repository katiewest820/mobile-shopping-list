package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

//import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GroceryItemHistoryController {

    //private final AtomicLong counter = new AtomicLong();

    @Autowired
    ItemHistoryRepository itemHistoryRepository;

    @Autowired
    MongoOperations mongoOperations;


    //add new item and update date for existing items
    @RequestMapping(value = "/addItemHistory", method = POST)
    public ResponseEntity<ItemHistory> update(@RequestBody ItemHistory newItem){
        System.out.println(newItem.item);
        ItemHistory newItemHistory = mongoOperations.findOne(new Query(Criteria.where("item").is(newItem.item)), ItemHistory.class, "itemHistory");

        System.out.println(newItemHistory);
        if(newItemHistory == null){
            itemHistoryRepository.save(newItem);
            return ResponseEntity.ok(newItem);
        }else{

            System.out.println(newItemHistory.addedDate);
            newItemHistory.setAddedDate(newItem.addedDate);
            System.out.println(newItemHistory.addedDate);
            mongoOperations.save(newItemHistory);
            return ResponseEntity.ok(newItemHistory);
        }
    }

    //get all items and remove those that were added > 2 mo ago
    @RequestMapping(value = "/allItemsFromHistory", method = RequestMethod.GET)
    public List<ItemHistory> getAllHistoricalItems(){

        List<ItemHistory> itemHistory = itemHistoryRepository.findAll();
        System.out.println(itemHistory);
        System.out.println(itemHistory.size());
        LocalDate cutoff = LocalDate.now().minusMonths(2);
        System.out.println(cutoff);
        for(int i = 0; i < itemHistory.size(); i++){

            ItemHistory newItem = itemHistory.get(i);
            System.out.println(newItem.addedDate);
            System.out.println(itemHistory.get(i));
            if(newItem.addedDate.isBefore(cutoff)){
                mongoOperations.findAndRemove(new Query(Criteria.where("id").is(newItem.id)), ItemHistory.class,"itemHistory");
            }
        }
        return itemHistoryRepository.findAll();
    }

    //get all items by search term
    @RequestMapping(value = "/allMatchingItems/{itemString}", method = RequestMethod.GET)
    public List<ItemHistory> findItemByString(@PathVariable("itemString") String itemString){
        System.out.println(itemString);
        Query query = new Query();
        query.addCriteria(Criteria.where("item").regex(itemString));
        List itemList = mongoOperations.find(query,ItemHistory.class);
        return itemList;
    }





}
