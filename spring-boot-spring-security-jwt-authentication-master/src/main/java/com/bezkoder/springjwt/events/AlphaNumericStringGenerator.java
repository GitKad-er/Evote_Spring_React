package com.bezkoder.springjwt.events;

import java.nio.charset.Charset;
import java.util.Random;

public class AlphaNumericStringGenerator {
    public static String genererString(int i) {

        byte[] bytearray;
        String mystring;
        StringBuffer valeur;

        bytearray = new byte[256];
        new Random().nextBytes(bytearray);

        mystring
                = new String(bytearray, Charset.forName("UTF-8"));

        // Create the StringBuffer
        valeur = new StringBuffer();

        for (int m = 0; m < mystring.length(); m++) {

            char n = mystring.charAt(m);

            if (((n >= 'A' && n <= 'Z')
                    || (n >= '0' && n <= '9'))
                    && (i > 0)) {

                valeur.append(n);
                i--;
            }
        }

        // resulting string
        return valeur.toString();
    }
}