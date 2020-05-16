package com.izbicki.jakub.tabletopserver.socket.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MoveCardToSlotAction {

  private String slotId;

  private String cardId;
}
