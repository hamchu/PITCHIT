package com.alppano.speakon.domain.feedback.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.feedback.dto.FeedbackInfo;
import com.alppano.speakon.domain.feedback.dto.FeedbackRequest;
import com.alppano.speakon.domain.feedback.service.FeedbackService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "피드백 관리")
@RestController
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // TODO: Pathvariable로 questionId 받을 수도 있으므로 비교해보고 선택이 필요함
    @Operation(summary = "피드백 생성")
    @PostMapping("/feedbacks")
    public ResponseEntity<ApiResponse> createFeedback(@AuthenticationPrincipal LoginUser loginUser,
                                                      @RequestBody FeedbackRequest dto) {
        feedbackService.createFeedback(dto, loginUser.getId());
        ApiResponse result = new ApiResponse(true, "피드백 생성 성공");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "피드백 삭제")
    @DeleteMapping("/feedbacks/{id}")
    public ResponseEntity<ApiResponse> deleteFeedback(@AuthenticationPrincipal LoginUser loginUser,
                                                      @PathVariable("id") Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId, loginUser.getId());
        ApiResponse result = new ApiResponse(true, "피드백 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "질문의 피드백 목록 조회")
    @GetMapping("/questions/{questionId}/feedbacks")
    public ResponseEntity<ApiResponse<List<FeedbackInfo>>> getFeedbacksByQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                                                  @PathVariable Long questionId) {
        List<FeedbackInfo> list = feedbackService.getFeedbacksByQuestion(questionId, loginUser.getId());
        ApiResponse<List<FeedbackInfo>> result = new ApiResponse(true, "조회 성공", list);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
