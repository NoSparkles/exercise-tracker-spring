package com.robertas.exerciseTracker.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.robertas.exerciseTracker.models.User;
import com.robertas.exerciseTracker.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
