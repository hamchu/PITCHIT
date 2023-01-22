package com.alppano.speakon.recording.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.datafile.entity.DataFile;
import com.alppano.speakon.interview.entity.InterviewJoin;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Recording extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "interview_join_id", unique = true)
    private InterviewJoin interviewJoin;

    @OneToOne
    @JoinColumn(name = "data_file_id")
    private DataFile dataFile;

    @Builder.Default
    @OneToMany(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecordingTimestamp> recordingTimestamps = new ArrayList<>();

}