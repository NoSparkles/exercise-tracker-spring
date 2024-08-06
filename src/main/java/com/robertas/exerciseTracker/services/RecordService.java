package com.robertas.exerciseTracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.robertas.exerciseTracker.models.Record;
import com.robertas.exerciseTracker.models.User;
import com.robertas.exerciseTracker.payloads.requests.RecordCreateRequest;
import com.robertas.exerciseTracker.payloads.requests.RecordUpdateRequest;
import com.robertas.exerciseTracker.repositories.ExerciseRepository;
import com.robertas.exerciseTracker.repositories.RecordRepository;

@Service
public class RecordService {
    private final RecordRepository recordRepository;
    private final ExerciseRepository exerciseRepository;

    public RecordService(RecordRepository recordRepository, ExerciseRepository exerciseRepository) {
        this.recordRepository = recordRepository;
        this.exerciseRepository = exerciseRepository;
    }

    public List<Record> getRecords() {
        return this.recordRepository.findAll();
    }

    public Optional<Record> getRecordById(Integer id) {
        return this.recordRepository.findById(id);
    }

    public Record createRecord(RecordCreateRequest recordCreateRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Record record = new Record();
        record.setUserId(user.getId());
        record.setExercise(exerciseRepository.findById(recordCreateRequest.getExerciseId()).get());
        record.setDate(recordCreateRequest.getDate());
        record.setSet1Weight(recordCreateRequest.getSet1Weight());
        record.setSet2Weight(recordCreateRequest.getSet2Weight());
        record.setSet3Weight(recordCreateRequest.getSet3Weight());
        record.setSet4Weight(recordCreateRequest.getSet4Weight());
        record.setSet1Reps(recordCreateRequest.getSet1Reps());
        record.setSet2Reps(recordCreateRequest.getSet2Reps());
        record.setSet3Reps(recordCreateRequest.getSet3Reps());
        record.setSet4Reps(recordCreateRequest.getSet4Reps());
        return this.recordRepository.save(record);
    }

    public Optional<Record> updateRecord(Integer id, RecordUpdateRequest recordUpdateRequest) {
        Optional<Record> optionalExercise = recordRepository.findById(id);

        if (optionalExercise.isPresent()) {
            Record record = optionalExercise.get();
            record.setDate(recordUpdateRequest.getDate());
            record.setSet1Weight(recordUpdateRequest.getSet1Weight());
            record.setSet2Weight(recordUpdateRequest.getSet2Weight());
            record.setSet3Weight(recordUpdateRequest.getSet3Weight());
            record.setSet4Weight(recordUpdateRequest.getSet4Weight());
            record.setSet1Reps(recordUpdateRequest.getSet1Reps());
            record.setSet2Reps(recordUpdateRequest.getSet2Reps());
            record.setSet3Reps(recordUpdateRequest.getSet3Reps());
            record.setSet4Reps(recordUpdateRequest.getSet4Reps());
            return Optional.of(recordRepository.save(record));
        }
        return Optional.of(null);
    }

    public Boolean deleteRecord(Integer id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record.isPresent()) {
            recordRepository.delete(record.get());
            return true;
        }
        return false;
    }
}
