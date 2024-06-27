package com.plataformapagamento.adapters.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.user.UserRequestDTO;
import com.plataformapagamento.adapters.DTOs.user.UserResponseDTO;
import com.plataformapagamento.adapters.services.UserService;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private MockMvc mockMvc;
    private UserResponseDTO userResponseDTO;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .alwaysDo(print())
                .build();

        User user = new User(1L, "John", "Doe", "123456789", "john.doe@example.com",
                "password", BigDecimal.valueOf(1000), UserType.COMUM);

        userResponseDTO = new UserResponseDTO(user);

        objectMapper = new ObjectMapper();
    }

    @Nested
    public class listUser {
        @Test
        void shouldReturnListOfUsers() throws Exception {
            // Arrange
            when(userService.getAllUser()).thenReturn(Collections.singletonList(userResponseDTO));

            // Act & Assert
            mockMvc.perform(get("/users")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().json("[{'id':1,'firstName':'John','lastName':'Doe','document':'123456789','email':'john.doe@example.com','balance':1000,'userType':'COMUM'}]"));

            verify(userService,times(1)).getAllUser();
            verifyNoMoreInteractions(userService);
        }

    }

    @Nested
    class register {
        @Test
        void shouldRegisterUserSuccessfully() throws Exception {
            // Arrange
            UserRequestDTO userRequestDTO = new UserRequestDTO("John", "Doe", "123456789", "john.doe@example.com",
                    "password", BigDecimal.valueOf(1000), UserType.COMUM);
            when(userService.createUser(any(UserRequestDTO.class))).thenReturn(userResponseDTO);

            // Act & Assert
            mockMvc.perform(post("/users/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(userRequestDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(content().json(objectMapper.writeValueAsString(userResponseDTO)));

            verify(userService,times(1)).createUser(any(UserRequestDTO.class));
            verifyNoMoreInteractions(userService);
        }

    }

    @Nested
    class delete {
        @Test
        void shouldDeleteUserSuccessfully() throws Exception {
            // Arrange
            DeleteDTO deleteDTO = new DeleteDTO(1L);
            User deletedUser = new User();
            deletedUser.setId(1L);

            when(userService.deleteUser(any(DeleteDTO.class))).thenReturn(deletedUser);

            // Act & Assert
            mockMvc.perform(delete("/users/delete")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(deleteDTO)))
                    .andExpect(status().isAccepted());

            verify(userService,times(1)).deleteUser(any(DeleteDTO.class));
            verifyNoMoreInteractions(userService);
        }

    }

}
