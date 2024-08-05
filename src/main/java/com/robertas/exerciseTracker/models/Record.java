package com.robertas.exerciseTracker.models;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "records")
@Entity
@Getter
@Setter
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private Integer exerciseId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Integer set1Weight;

    @Column
    private Integer set2Weight;

    @Column
    private Integer set3Weight;

    @Column
    private Integer set4Weight;

    @Column(nullable = false)
    private Integer set1Reps;

    @Column
    private Integer set2Reps;

    @Column
    private Integer set3Reps;

    @Column
    private Integer set4Reps;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
}
