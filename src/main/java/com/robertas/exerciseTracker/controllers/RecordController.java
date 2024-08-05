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
import com.robertas.exerciseTracker.services.RecordService;

@RequestMapping("/records")
@RestController
public class RecordController {
        private final RecordService recordService;

        public RecordController(RecordService recordService) {
                this.recordService = recordService;
        }

        @GetMapping("/")
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

        @GetMapping("/by-exercise/{id}")
        public ResponseEntity<List<Record>> getRecordsByExerciseId(@PathVariable Integer exerciseId) {
                return ResponseEntity.ok(recordService.getRecordsByExerciseId(exerciseId));
        }

        @PostMapping("/create")
        public ResponseEntity<Record> createRecord(@RequestBody RecordCreateRequest recordCreateRequest) {
                if (recordCreateRequest.getDate() == null
                                ||
                                recordCreateRequest.getExerciseId() == null
                                ||
                                (recordCreateRequest.getSet1Reps() == null &&
                                                recordCreateRequest.getSet1Weight() == null)
                                ||
                                (recordCreateRequest.getSet1Reps() != null &&
                                                recordCreateRequest.getSet1Weight() != null)
                                ||
                                (recordCreateRequest.getSet2Reps() == null &&
                                                recordCreateRequest.getSet2Weight() == null)
                                ||
                                (recordCreateRequest.getSet2Reps() != null &&
                                                recordCreateRequest.getSet2Weight() != null)
                                ||
                                (recordCreateRequest.getSet3Reps() == null &&
                                                recordCreateRequest.getSet3Weight() == null)
                                ||
                                (recordCreateRequest.getSet3Reps() != null &&
                                                recordCreateRequest.getSet3Weight() != null)
                                ||
                                (recordCreateRequest.getSet4Reps() == null &&
                                                recordCreateRequest.getSet4Weight() == null)
                                ||
                                (recordCreateRequest.getSet4Reps() != null &&
                                                recordCreateRequest.getSet4Weight() != null)) {
                        return ResponseEntity.badRequest().build();
                }
                return ResponseEntity.ok(recordService.createRecord(recordCreateRequest));
        }

        @PutMapping("update/{id}")
        public ResponseEntity<Record> updateRecord(@PathVariable Integer id,
                        @RequestBody RecordUpdateRequest recordUpdateRequest) {
                if (recordUpdateRequest.getDate() == null
                                ||
                                (recordUpdateRequest.getSet1Reps() == null &&
                                                recordUpdateRequest.getSet1Weight() == null)
                                ||
                                (recordUpdateRequest.getSet1Reps() != null &&
                                                recordUpdateRequest.getSet1Weight() != null)
                                ||
                                (recordUpdateRequest.getSet2Reps() == null &&
                                                recordUpdateRequest.getSet2Weight() == null)
                                ||
                                (recordUpdateRequest.getSet2Reps() != null &&
                                                recordUpdateRequest.getSet2Weight() != null)
                                ||
                                (recordUpdateRequest.getSet3Reps() == null &&
                                                recordUpdateRequest.getSet3Weight() == null)
                                ||
                                (recordUpdateRequest.getSet3Reps() != null &&
                                                recordUpdateRequest.getSet3Weight() != null)
                                ||
                                (recordUpdateRequest.getSet4Reps() == null &&
                                                recordUpdateRequest.getSet4Weight() == null)
                                ||
                                (recordUpdateRequest.getSet4Reps() != null &&
                                                recordUpdateRequest.getSet4Weight() != null)) {
                        return ResponseEntity.badRequest().build();
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
