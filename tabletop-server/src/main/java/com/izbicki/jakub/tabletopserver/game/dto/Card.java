package com.izbicki.jakub.tabletopserver.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Card {

  private String name;

  private int col;

  private int row;
}
