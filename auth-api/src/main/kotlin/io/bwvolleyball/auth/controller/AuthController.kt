package io.bwvolleyball.auth.controller

import io.bwvolleyball.auth.domain.Login
import io.bwvolleyball.auth.domain.User
import io.bwvolleyball.auth.repository.UserRepository
import io.bwvolleyball.auth.service.JwtService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpClientErrorException

@RestController
@RequestMapping("/api/auth")
class AuthController(private val jwtService: JwtService, private val userRepository: UserRepository) {

    @PostMapping(path = ["/login"])
    fun login(@RequestBody login: Login): User {
        // TODO: put this in a filter.
        if (!login.authenticated){
            throw HttpClientErrorException(HttpStatus.UNAUTHORIZED)
        }
        // end TODO: for a filter.
        val message = "login request received with: $login"
        println(message)
        val user = jwtService.decodeLogin(login)
        userRepository.save(user)
        return user
    }

    @GetMapping
    fun test(): String {
        return "test works"
    }

    @GetMapping(path = ["/two"])
    fun testTwo(): String {
        return "test two works"
    }

    @GetMapping(path = ["/multi/path"])
    fun testThree(): String {
        return "multi path works"
    }
}