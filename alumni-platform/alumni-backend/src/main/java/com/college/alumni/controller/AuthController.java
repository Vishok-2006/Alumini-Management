package com.college.alumni.controller;

import com.college.alumni.dto.JwtResponse;
import com.college.alumni.dto.LoginRequest;
import com.college.alumni.dto.SignupRequest;
import com.college.alumni.entity.AlumniProfile;
import com.college.alumni.entity.Role;
import com.college.alumni.entity.User;
import com.college.alumni.repository.AlumniProfileRepository;
import com.college.alumni.repository.UserRepository;
import com.college.alumni.security.JwtUtils;
import com.college.alumni.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    AlumniProfileRepository alumniProfileRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();     
        User user = userRepository.findById(userDetails.getId()).orElse(null);

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                user != null ? user.getRole().name() : null));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error: Email is already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        // Create new user's account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        
        String roleStr = signUpRequest.getRole();
        Role role = Role.STUDENT; // Default
        
        if (roleStr != null) {
            if (roleStr.equalsIgnoreCase("ALUMNI")) {
                role = Role.ALUMNI;
            } else if (roleStr.equalsIgnoreCase("ADMIN")) {
                role = Role.ADMIN;
            }
        }
        
        user.setRole(role);
        User savedUser = userRepository.save(user);
        
        // If Alumni, create profile
        if (role == Role.ALUMNI) {
            AlumniProfile profile = new AlumniProfile();
            profile.setUser(savedUser);
            profile.setFullName(signUpRequest.getFullName() != null ? signUpRequest.getFullName() : "");
            profile.setBatchYear(signUpRequest.getBatchYear() != null ? signUpRequest.getBatchYear() : 0);
            alumniProfileRepository.save(profile);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }
}
