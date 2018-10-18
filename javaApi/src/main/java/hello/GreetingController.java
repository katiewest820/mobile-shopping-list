package hello;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                String.format(template, name), "blue", 300, "Chocolate Chip");
    }

    @RequestMapping(value = "/changeGreeting", method = RequestMethod.POST)
    public ResponseEntity<Greeting> update(@RequestBody Greeting updateGreeting){
        return ResponseEntity.ok(updateGreeting);
    }





}


