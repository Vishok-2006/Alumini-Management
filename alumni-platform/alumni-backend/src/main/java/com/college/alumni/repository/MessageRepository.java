package com.college.alumni.repository;

import com.college.alumni.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverIdOrSenderIdOrderBySentAtDesc(Long receiverId, Long senderId);
}
