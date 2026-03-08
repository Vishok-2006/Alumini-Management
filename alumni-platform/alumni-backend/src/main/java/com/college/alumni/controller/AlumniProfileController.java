package com.college.alumni.controller;

import com.college.alumni.entity.AlumniProfile;
import com.college.alumni.repository.AlumniProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
public class AlumniProfileController {

    @Autowired
    AlumniProfileRepository alumniProfileRepository;

    @GetMapping("/all")
    public List<AlumniProfile> getAllAlumni() {
        return alumniProfileRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniProfile> getAlumniById(@PathVariable Long id) {
        return alumniProfileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<AlumniProfile> searchAlumni(@RequestParam(required = false) Integer batchYear,
                                            @RequestParam(required = false) String currentCompany) {
        if (batchYear != null) {
            return alumniProfileRepository.findByBatchYear(batchYear);
        } else if (currentCompany != null) {
            return alumniProfileRepository.findByCurrentCompanyIgnoreCaseContaining(currentCompany);
        }
        return alumniProfileRepository.findAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ALUMNI')")
    public ResponseEntity<AlumniProfile> updateProfile(@PathVariable Long id, @RequestBody AlumniProfile profileDetails) {
        return alumniProfileRepository.findById(id).map(profile -> {
            profile.setFullName(profileDetails.getFullName());
            profile.setBatchYear(profileDetails.getBatchYear());
            profile.setCurrentCompany(profileDetails.getCurrentCompany());
            profile.setJobTitle(profileDetails.getJobTitle());
            profile.setLocation(profileDetails.getLocation());
            profile.setPhone(profileDetails.getPhone());
            profile.setLinkedinUrl(profileDetails.getLinkedinUrl());
            // Admin can approve
            if (profileDetails.getIsApproved() != null) {
                profile.setIsApproved(profileDetails.getIsApproved());
            }
            return ResponseEntity.ok(alumniProfileRepository.save(profile));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAlumni(@PathVariable Long id) {
        return alumniProfileRepository.findById(id).map(profile -> {
            alumniProfileRepository.delete(profile);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
