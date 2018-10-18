package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.UnknownHostException;

@SpringBootApplication
public class Application {

    public static void main(String[] args) throws UnknownHostException {
        SpringApplication.run(Application.class, args);


//        MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://admin:admin123@ds253821.mlab.com:53821/shopping-list"));
//        DB database = mongoClient.getDB("shopping-list");
//        DBCollection collection = database.getCollection("item");

//        Item item = createItem();
//
//        DBObject doc = createDBObject();
//
//        WriteResult result = collection.insert(doc);

    }

//    private static DBObject createDBObject() {
//        BasicDBObjectBuilder docBuilder = BasicDBObjectBuilder.start();
//
//        docBuilder.append("_id", 123);
//        docBuilder.append("item", "apple");
//        docBuilder.append("quantity", 20);
//        docBuilder.append("active", true);
//        return docBuilder.get();
//    }
//
//
//    private static Item createItem() {
//        Item i = new Item();
//        i.setItem("Apple");
//        i.setQuantity(10);
//        i.setActive(true);
//        return i;
//    }
}
