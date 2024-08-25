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

import com.robertas.exerciseTracker.models.Record;
import com.robertas.exerciseTracker.payloads.requests.RecordCreateRequest;
import com.robertas.exerciseTracker.payloads.requests.RecordUpdateRequest;
import com.robertas.exerciseTracker.payloads.responses.MessageResponse;
import com.robertas.exerciseTracker.services.ExerciseService;
import com.robertas.exerciseTracker.services.RecordService;

@RequestMapping("/records")
@RestController
public class RecordController {
  private final RecordService recordService;
  private final ExerciseService exerciseService;

  public RecordController(RecordService recordService, ExerciseService exerciseService) {
    this.recordService = recordService;
    this.exerciseService = exerciseService;
  }

  @GetMapping("")
  public ResponseEntity<List<Record>> getRecords() {
    return ResponseEntity.ok(recordService.getRecords());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Record> getRecordById(@PathVariable Integer id) {
    if (id == null) {
      return ResponseEntity.badRequest().build();
    }
    Optional<Record> record = recordService.getRecordById(id);
    if (record.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(record.get());
  }

  @PostMapping("/create")
  public ResponseEntity<?> createRecord(@RequestBody RecordCreateRequest recordCreateRequest) {
    if (recordCreateRequest.getDate() == null ||
        recordCreateRequest.getExerciseId() == null ||
        exerciseService.getExerciseById(recordCreateRequest.getExerciseId()).isEmpty()) {
      return ResponseEntity.badRequest().body(new MessageResponse("Invalid request: Missing required fields"));
    }

    Record record = recordService.createRecord(recordCreateRequest);
    return ResponseEntity.ok(record);
  }

  @PutMapping("update/{id}")
  public ResponseEntity<?> updateRecord(@PathVariable Integer id,
      @RequestBody RecordUpdateRequest recordUpdateRequest) {
    if (recordUpdateRequest.getDate() == null) {
      return ResponseEntity.badRequest().body(new MessageResponse("Invalid request: Missing required fields"));
    }
    Optional<Record> record = recordService.updateRecord(id, recordUpdateRequest);
    if (record.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(record.get());
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<MessageResponse> deleteRecord(@PathVariable Integer id) {
    if (id == null) {
      return ResponseEntity.badRequest().build();
    }
    if (recordService.deleteRecord(id)) {
      return ResponseEntity.ok(new MessageResponse("Resource was succesfully deleted"));
    }
    return ResponseEntity.notFound().build();
  }
}
