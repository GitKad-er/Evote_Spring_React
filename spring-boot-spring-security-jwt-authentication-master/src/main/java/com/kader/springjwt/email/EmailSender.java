package com.kader.springjwt.email;

public interface EmailSender {
    void send(String to, String email);
}
