package com.robertas.exerciseTracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.robertas.exerciseTracker.models.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    public List<Exercise> findAllByUserId(Integer userId);
}
