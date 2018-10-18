package hello;

public class Greeting {

    private final long id;
    private final String content;
    public String color;
    public int favNumber;
    public String iceCream;

    public Greeting(long id, String content, String color, int number, String iceCream) {
        this.id = id;
        this.content = content;
        this.color = color;
        this.favNumber = number;
        this.iceCream = iceCream;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getColor() {
        return color;
    }

    public int getFavNumber() {
        return favNumber;
    }

    public String getIceCream() {
        return iceCream;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setFavNumber(int favNumber) {
        this.favNumber = favNumber;
    }

    public void setIceCream(String iceCream) {
        this.iceCream = iceCream;
    }
}