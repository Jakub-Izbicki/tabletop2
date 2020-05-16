package com.izbicki.jakub.tabletopserver.socket.common;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;

public class SimpSender {

  public static void sendToRemainingSubs(String destination, Object payload, StompHeaderAccessor headers,
      SimpUserRegistry simpUserRegistry, SimpMessagingTemplate simpMessagingTemplate) {
    Optional<String> user = Optional.ofNullable(headers.getUser())
        .map(Principal::getName);

    if (user.isPresent()) {
      List<String> subscribers = simpUserRegistry.getUsers().stream()
          .map(SimpUser::getName)
          .filter(name -> !user.get().equals(name))
          .collect(Collectors.toList());

      subscribers
          .forEach(sub -> simpMessagingTemplate.convertAndSendToUser(sub, destination, payload));
    }
  }
}
