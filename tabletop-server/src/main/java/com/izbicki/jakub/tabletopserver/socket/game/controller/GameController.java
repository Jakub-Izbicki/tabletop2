package com.izbicki.jakub.tabletopserver.socket.game.controller;

import com.izbicki.jakub.tabletopserver.socket.common.SimpSender;
import com.izbicki.jakub.tabletopserver.socket.game.dto.MoveCardToSlotAction;
import com.izbicki.jakub.tabletopserver.socket.game.dto.Transform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

  private final SimpUserRegistry simpUserRegistry;

  private final SimpMessagingTemplate simpMessagingTemplate;

  @Autowired
  public GameController(SimpUserRegistry simpUserRegistry,
      SimpMessagingTemplate simpMessagingTemplate) {
    this.simpUserRegistry = simpUserRegistry;
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @MessageMapping("/game/moveCardToSlot")
  public void gameGrid(MoveCardToSlotAction moveCardToSlotAction,
      StompHeaderAccessor headers) {
    sendToRemainingSubs("/game/moveCardToSlot", moveCardToSlotAction, headers);
  }

  @MessageMapping("/game/moveCard")
  public void gameGrid(Transform transform, StompHeaderAccessor headers) {
    sendToRemainingSubs("/game/moveCard", transform, headers);
  }

  private void sendToRemainingSubs(String destination, Object payload,
      StompHeaderAccessor headers) {
    SimpSender.sendToRemainingSubs(destination, payload, headers, simpUserRegistry,
        simpMessagingTemplate);
  }
}
