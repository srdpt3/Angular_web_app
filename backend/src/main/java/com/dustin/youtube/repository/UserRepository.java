package com.dustin.youtube.repository;

import com.dustin.youtube.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {


    Optional<User> findBySub(String sub);

}

