package com.robertas.exerciseTracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.robertas.exerciseTracker.models.Exercise;
import com.robertas.exerciseTracker.payloads.requests.ExerciseCreateRequest;
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

    public List<Exercise> getExercisesByUserId(Integer userId) {
        return this.exerciseRepository.findAllByUserId(userId);
    }

    public Exercise createExercise(ExerciseCreateRequest exerciseCreateRequest) {
        Exercise exercise = new Exercise();
        exercise.setName(exerciseCreateRequest.getName());
        exercise.setUserId(exerciseCreateRequest.getUserId());
        return this.exerciseRepository.save(exercise);
    }

    public void deleteExercise(Integer id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        if (exercise.isPresent()) {
            exerciseRepository.delete(exercise.get());
        }
    }

    public Exercise updateExercise(Integer id, String name) {
        if (id == null || name == null || name.isEmpty()) {
            return null;
        }

        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);

        if (optionalExercise.isPresent()) {
            Exercise exercise = optionalExercise.get();
            exercise.setName(name);
            return exerciseRepository.save(exercise);
        }

        return null;
    }
}
