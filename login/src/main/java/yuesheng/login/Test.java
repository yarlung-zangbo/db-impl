package yuesheng.login;

public class Test {
    public static void main(String[] args) {
        String confirm_base_uri = "hello", username = "world";
        String confirm_uri = confirm_base_uri.concat(username);
        System.out.println(confirm_uri);
    }
}
