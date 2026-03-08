package com.college.alumni.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "alumni_profiles")
@Data
public class AlumniProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Column(name = "batch_year", nullable = false)
    private Integer batchYear;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
    @Column(name = "current_company")
    private String currentCompany;
    
    @Column(name = "job_title")
    private String jobTitle;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "linkedin_url")
    private String linkedinUrl;
    
    @Column(name = "is_approved")
    private Boolean isApproved = false;
}
