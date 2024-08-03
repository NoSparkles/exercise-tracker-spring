package com.robertas.exerciseTracker.controllers;

import java.util.List;

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
import com.robertas.exerciseTracker.services.ExerciseService;

@RequestMapping("/exercises")
@RestController
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Exercise>> getExercises() {
        return ResponseEntity.ok(exerciseService.getExercises());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Exercise>> getExercisesByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(exerciseService.getExercisesByUserId(userId));
    }

    @PostMapping("/create")
    public ResponseEntity<Exercise> create(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        return ResponseEntity.ok(exerciseService.createExercise(exerciseCreateRequest));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Exercise> updateExerciseName(@PathVariable Integer id,
            @RequestBody ExerciseUpdateNameRequest exerciseUpdateNameRequest) {
        return ResponseEntity.ok(exerciseService.updateExercise(id, exerciseUpdateNameRequest.getName()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> create(@PathVariable Integer id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.ok("deleted");
    }

}
