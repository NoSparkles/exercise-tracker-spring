package com.robertas.exerciseTracker.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.robertas.exerciseTracker.models.Exercise;
import com.robertas.exerciseTracker.payloads.requests.ExerciseCreateRequest;
import com.robertas.exerciseTracker.payloads.requests.ExerciseUpdateNameRequest;
import com.robertas.exerciseTracker.payloads.responses.MessageResponse;
import com.robertas.exerciseTracker.services.ExerciseService;

@RequestMapping("/exercises")
@RestController
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("")
    public ResponseEntity<List<Exercise>> getExercises() {
        return ResponseEntity.ok(exerciseService.getExercises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Integer id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Exercise> exercise = exerciseService.getExerciseById(id);
        if (exercise.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(exercise.get());
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Exercise>> getMyExercises() {
        return ResponseEntity.ok(exerciseService.getExercisesByUserId());
    }

    @PostMapping("/create")
    public ResponseEntity<Exercise> createExercise(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        if (exerciseCreateRequest.getName() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(exerciseService.createExercise(exerciseCreateRequest));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Integer id,
            @RequestBody ExerciseUpdateNameRequest exerciseUpdateNameRequest) {
        if (id == null || exerciseUpdateNameRequest.getName() == null
                || exerciseUpdateNameRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Exercise> exercise = exerciseService.updateExercise(id, exerciseUpdateNameRequest);
        if (exercise.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(exercise.get());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Integer id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        if (exerciseService.deleteExercise(id)) {
            return ResponseEntity.ok(new MessageResponse("Resource was succesfully deleted"));
        }
        return ResponseEntity.notFound().build();
    }
}
