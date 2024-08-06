package com.robertas.exerciseTracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.robertas.exerciseTracker.models.Exercise;
import com.robertas.exerciseTracker.models.User;
import com.robertas.exerciseTracker.payloads.requests.ExerciseCreateRequest;
import com.robertas.exerciseTracker.payloads.requests.ExerciseUpdateNameRequest;
import com.robertas.exerciseTracker.repositories.ExerciseRepository;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getExercises() {
        return this.exerciseRepository.findAll();
    }

    public Optional<Exercise> getExerciseById(Integer id) {
        return this.exerciseRepository.findById(id);
    }

    public List<Exercise> getExercisesByUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.exerciseRepository.findAllByUserId(user.getId());
    }

    public Exercise createExercise(ExerciseCreateRequest exerciseCreateRequest) {
        Exercise exercise = new Exercise();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        exercise.setName(exerciseCreateRequest.getName());
        exercise.setUserId(user.getId());
        return this.exerciseRepository.save(exercise);
    }

    public Optional<Exercise> updateExercise(Integer id, ExerciseUpdateNameRequest exerciseUpdateNameRequest) {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);

        if (optionalExercise.isPresent()) {
            Exercise exercise = optionalExercise.get();
            exercise.setName(exerciseUpdateNameRequest.getName());
            return Optional.of(this.exerciseRepository.save(exercise));
        }
        return Optional.of(null);
    }

    public Boolean deleteExercise(Integer id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        if (exercise.isPresent()) {
            exerciseRepository.delete(exercise.get());
            return true;
        }
        return false;
    }
}
