package hello;

public class GroceryItem {
    public long id;
    public String item;
    public int quantity;
    public boolean active;

    public GroceryItem(String item, int quantity, boolean active) {

        this.item = item;
        this.quantity = quantity;
        this.active = active;
    }


}
