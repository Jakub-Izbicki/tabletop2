package com.izbicki.jakub.tabletopserver.game.controller;

import com.izbicki.jakub.tabletopserver.game.dto.Card;
import com.izbicki.jakub.tabletopserver.game.dto.GridCards;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class GameController {

  private GridCards gridCards;

  @PostConstruct
  private void setupGrid() {
    ArrayList<Card> cards = new ArrayList<>();
    cards.add(new Card("card1", 1, 2));
    cards.add(new Card("card2", 2, 2));
    cards.add(new Card("card3", 3, 2));
    this.gridCards = new GridCards(cards);
  }

  @CrossOrigin(origins = "http://localhost:8080")
  @MessageMapping("/updateGridCards")
  @SendTo("/game/gridCards")
  public GridCards gameGrid(GridCards updatedGrid) {
    this.gridCards.getGridCards().clear();
    this.gridCards.getGridCards().addAll(updatedGrid.getGridCards());

    return this.gridCards;
  }
}
