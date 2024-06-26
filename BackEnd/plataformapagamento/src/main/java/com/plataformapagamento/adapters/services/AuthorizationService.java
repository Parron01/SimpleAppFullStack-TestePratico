package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.repositories.UserRepository;
import com.plataformapagamento.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class AuthorizationService implements UserDetailsService {
    //Configuração Para Spring Security
    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String document) throws UsernameNotFoundException {
        return userRepository.findUserByDocument(document);
    }

    //Consumo de Api de Autorização
    @Autowired
    private RestTemplate restTemplate;

    public boolean authorizeTransaction(User sender, BigDecimal value){
        //Lógica necessária para o Teste Técnico
        //ResponseEntity<Map> authorizationResponse = restTemplate.getForEntity("https://util.devi.tools/api/v2/authorize", Map.class);

        //if(authorizationResponse.getStatusCode()== HttpStatus.OK){
        //    String message = (String) authorizationResponse.getBody().get("status");
        //    return "success".equalsIgnoreCase(message);
        //}else return false;
        return true;
    }

}
