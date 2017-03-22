package me.wonwoo.web;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by wonwoo on 2017. 3. 22..
 */
@Controller
public class MessageController {

  @MessageMapping("/message")
  @SendTo("/topic/message")
  public Message sendMessage(String message) throws InterruptedException {
    return new Message(message);
  }
}
