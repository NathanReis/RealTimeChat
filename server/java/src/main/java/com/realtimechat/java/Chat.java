package com.realtimechat.java;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/realtimechat")
public class Chat {
    private final Set<Session> sessions;
    
    public Chat() {
        this.sessions = Collections.synchronizedSet(new HashSet<Session>());
    }
    
    @OnOpen
    public void onOpen(Session session) {
        this.sessions.add(session);
        
        System.out.println("Nova conexão: " + session.getId());
    }
    
    @OnClose
    public void onClose(Session session) {
        this.sessions.remove(session);
        
        System.out.println("Conexão encerrada: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable t) throws IOException {
        session.close();
        
        System.out.println("Erro: " + t.getMessage());
        System.out.println("Para conexão: " + session.getId());
    }
    
    @OnMessage
    public void onMessage(Session senderSession, String message) throws IOException {
        for (Session session : this.sessions) {
            if (!session.equals(senderSession)) {
                session.getBasicRemote().sendText(message);
            }
        }
    }
}
