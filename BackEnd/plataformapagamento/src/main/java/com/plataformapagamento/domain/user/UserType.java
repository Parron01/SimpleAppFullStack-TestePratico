package com.plataformapagamento.domain.user;

public enum UserType {
    COMUM("comum"),
    LOJISTA("lojista");

    private String type;

    UserType(String type){
        this.type = type;
    }

    public String getType(){
        return type;
    }
}
