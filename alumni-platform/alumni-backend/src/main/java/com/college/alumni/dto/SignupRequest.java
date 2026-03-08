package com.college.alumni.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private String role; // "ALUMNI" or "STUDENT"
    
    // For alumni specific fields during signup
    private String fullName;
    private Integer batchYear;
}
