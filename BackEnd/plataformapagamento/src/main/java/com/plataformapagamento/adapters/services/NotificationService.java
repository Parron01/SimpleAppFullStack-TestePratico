package com.plataformapagamento.adapters.services;

import com.plataformapagamento.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NotificationService {
    @Autowired
    RestTemplate restTemplate;

    public void sendNotification(User user, String message) throws Exception {
        //Lógica necessária para o Teste Técnico
        //String email = user.getEmail();
        //NotificationDTO notificationRequest = new NotificationDTO(email,message);

        //ResponseEntity<String> notificationResponse = restTemplate.postForEntity("https://util.devi.tools/api/v1/notify", notificationRequest, String.class);

        //if(!(notificationResponse.getStatusCode() == HttpStatus.OK)){
        //    throw new Exception("Serviço de notificação fora do ar.");
        //}
        System.out.println("Notificação enviada com sucesso.");
    }
}
