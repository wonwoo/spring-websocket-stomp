package me.wonwoo.web;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wonwoo on 2017. 3. 22..
 */
@RestController
public class MessageSenderController {

  private final SimpMessagingTemplate simpMessagingTemplate;

  public MessageSenderController(SimpMessagingTemplate simpMessagingTemplate) {
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @GetMapping("/message")
  public String message(String message) {
    simpMessagingTemplate.convertAndSend("/topic/message", new Message(message));
    return "ok";
  }
}
