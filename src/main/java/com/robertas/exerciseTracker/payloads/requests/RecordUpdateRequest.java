package com.robertas.exerciseTracker.payloads.requests;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordUpdateRequest {
    private Date date;

    private Integer set1Weight;

    private Integer set2Weight;

    private Integer set3Weight;

    private Integer set4Weight;

    private Integer set1Reps;

    private Integer set2Reps;

    private Integer set3Reps;

    private Integer set4Reps;
}
