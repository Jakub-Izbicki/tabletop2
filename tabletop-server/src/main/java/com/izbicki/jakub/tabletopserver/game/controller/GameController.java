package com.izbicki.jakub.tabletopserver.game.controller;

import com.izbicki.jakub.tabletopserver.game.dto.MoveCardToSlotAction;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

  @MessageMapping("/moveCardToSlot")
  @SendTo("/game/gridCards")
  public MoveCardToSlotAction gameGrid(MoveCardToSlotAction moveCardToSlotAction) {
    return moveCardToSlotAction;
  }
}
