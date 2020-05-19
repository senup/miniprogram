package com.senup.wxapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
class WxappApplicationTests {

    @Test
    void contextLoads() {
        String s = UUID.randomUUID().toString();
        System.out.println(s);

    }

}
