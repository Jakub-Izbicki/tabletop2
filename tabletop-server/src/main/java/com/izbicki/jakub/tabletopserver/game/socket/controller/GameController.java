package com.izbicki.jakub.tabletopserver.game.socket.controller;

import com.izbicki.jakub.tabletopserver.game.socket.dto.MoveCardToSlotAction;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

  @MessageMapping("/game/moveCardToSlot")
  @SendTo("/game/moveCardToSlot")
  public MoveCardToSlotAction gameGrid(MoveCardToSlotAction moveCardToSlotAction) {
    return moveCardToSlotAction;
  }
}
