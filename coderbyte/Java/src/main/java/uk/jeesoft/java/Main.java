package uk.jeesoft.java;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static int _SEARCHED_VALUE = 50;
    private static String _AGENT_KEY = "http.agent";
    private static String _AGENT_VALUE = "Chrome";
    private static String _API_URL = "https://coderbyte.com/api/challenges/json/age-counting";

    private static String _ENCODING = "UTF-8";
    private static String _VALID_RESULTS = "valid";
    private static String _INVALID_RESULTS = "invalid";
    private static String _KEY_IDENTIFIER = "key=";
    private static String _VALUE_IDENTIFIER = "age=";
    private static CharSequence _HEADER_IDENTIFIER = "{\"data\":\"";
    private static CharSequence _TAIL_IDENTIFIER = "\"}";
    private static CharSequence _EMPTY_STRING = "";

    public static void main(String[] args) {
        HashMap<String, Map<String, String>> resultMap = new HashMap<>();
        System.setProperty(_AGENT_KEY, _AGENT_VALUE);
        try {
            URL url = new URL(_API_URL);
            URLConnection connection = url.openConnection();
            InputStream inputStream = connection.getInputStream();

            final int bufferSize = 1024;
            final char[] buffer = new char[bufferSize];
            final StringBuilder out = new StringBuilder();
            Reader in = new InputStreamReader(inputStream, _ENCODING);
            for (;;) {
                int rsz = in.read(buffer, 0, buffer.length);
                if (rsz < 0) {
                    break;
                }
                out.append(buffer, 0, rsz);
            }
            String jsonString = out.toString();
            resultMap.putAll(parseJsonString(jsonString));;

        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        System.out.println("validResults = " + resultMap.get(_VALID_RESULTS).size());
    }

    private static HashMap<String, Map<String, String>> parseJsonString(String jsonString) {
        String valuesString = jsonString.replace(_HEADER_IDENTIFIER, _EMPTY_STRING).replace(_TAIL_IDENTIFIER, _EMPTY_STRING);
        String[] valesArray = valuesString.split(",");
        String key = null;
        String stringValue;
        Map<String, String> validEntriesMap = new HashMap<>();
        Map<String, String> invalidEntriesMap = new HashMap<>();
        for (String entryPart : valesArray) {
            entryPart = entryPart.trim();
            if (entryPart.startsWith(_KEY_IDENTIFIER)) {
                key = entryPart.replace(_KEY_IDENTIFIER, _EMPTY_STRING);
            } else if (entryPart.startsWith(_VALUE_IDENTIFIER)) {
                if (key == null) {
                    throw new IllegalArgumentException("Key was missing to this value ..." + entryPart);
                }
                stringValue = entryPart.replace(_VALUE_IDENTIFIER, _EMPTY_STRING);
                int value = Integer.parseInt(stringValue);
                if (value >= _SEARCHED_VALUE) {
                    validEntriesMap.put(key, stringValue);
                } else {
                    invalidEntriesMap.put(key, stringValue);
                }
            } else {
                throw new IllegalArgumentException("Unknown entry found ..." + entryPart);
            }
        }
        System.out.println("Condition :: age > " + _SEARCHED_VALUE);
        System.out.println("found valid Entries = " + validEntriesMap.size());
        System.out.println("invalid Entries = " + invalidEntriesMap.size());
        HashMap<String, Map<String, String>> resultMap = new HashMap<>();
        resultMap.put(_VALID_RESULTS, validEntriesMap);
        resultMap.put(_INVALID_RESULTS, invalidEntriesMap);
        return resultMap;
    }
}
