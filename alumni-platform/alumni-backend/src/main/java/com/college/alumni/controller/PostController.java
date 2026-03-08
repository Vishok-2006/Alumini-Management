package com.college.alumni.controller;

import com.college.alumni.entity.Post;
import com.college.alumni.entity.User;
import com.college.alumni.repository.PostRepository;
import com.college.alumni.repository.UserRepository;
import com.college.alumni.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ALUMNI')")
    public Post createPost(@RequestBody Post post, Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();     
        User user = userRepository.findById(userPrincipal.getId()).orElse(null);
        post.setUser(user);
        return postRepository.save(post);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ALUMNI')")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        return postRepository.findById(id).map(post -> {
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
