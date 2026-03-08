package com.college.alumni.repository;

import com.college.alumni.entity.AlumniProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniProfileRepository extends JpaRepository<AlumniProfile, Long> {
    Optional<AlumniProfile> findByUserId(Long userId);
    List<AlumniProfile> findByBatchYear(Integer batchYear);
    List<AlumniProfile> findByDepartmentNameIgnoreCaseContaining(String departmentName);
    List<AlumniProfile> findByCurrentCompanyIgnoreCaseContaining(String company);
}
