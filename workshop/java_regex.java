import java.io.BufferedReader;
import java.io.FileReader;
import java.io:IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public  class regex{

    public static void main(String[] args){
        String file = "./resultsFutball.csv";

        Patter pat = Pattern.compile("^2011\\-.*$");

        try{
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;
            while((line = br.readLine()) != null){
                Matcher matcher = pat.matcher(line);
                if(matcher.find()){
                    system.out.println(line);
                }
            }
        }catch(Exception e){
            system.out.println("nope!");
        }
    }
}