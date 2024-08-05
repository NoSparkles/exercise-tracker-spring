package com.robertas.exerciseTracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.robertas.exerciseTracker.models.Record;

public interface RecordRepository extends JpaRepository<Record, Integer> {
    public List<Record> findAllByExerciseId(Integer exerciseId);
}
