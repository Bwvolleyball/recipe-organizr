package io.bwvolleyball.auth.controller

import io.bwvolleyball.auth.annotations.Authenticated
import io.bwvolleyball.auth.domain.Login
import io.bwvolleyball.auth.domain.User
import io.bwvolleyball.auth.repository.UserRepository
import io.bwvolleyball.auth.service.JwtService
import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(private val jwtService: JwtService, private val userRepository: UserRepository) {

    private val logger = KotlinLogging.logger {  }

    @Authenticated
    @PostMapping(path = ["/login"])
    fun login(@RequestBody login: Login): User {
        logger.info("login request received with: {}", login)
        val user = jwtService.decodeLogin(login)
        userRepository.save(user)
        return user
    }
}