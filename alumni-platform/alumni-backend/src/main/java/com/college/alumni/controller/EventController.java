package com.college.alumni.controller;

import com.college.alumni.entity.Event;
import com.college.alumni.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAllByOrderByEventDateDesc();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ALUMNI')")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        return eventRepository.findById(id).map(event -> {
            eventRepository.delete(event);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
