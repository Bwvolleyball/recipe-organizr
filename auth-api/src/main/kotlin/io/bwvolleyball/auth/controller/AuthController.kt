package io.bwvolleyball.auth.controller

import io.bwvolleyball.auth.domain.Login
import io.bwvolleyball.auth.service.JwtService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpClientErrorException

@RestController
@RequestMapping("/api/auth")
class AuthController(private val jwtService: JwtService) {

    @PostMapping(path = ["/login"])
    fun login(@RequestBody login: Login): Login {
        // TODO: put this in a filter.
        if (!login.authenticated){
            throw HttpClientErrorException(HttpStatus.UNAUTHORIZED)
        }
        // end TODO: for a filter.
        val message = "login request received with: $login"
        println(message)
        jwtService.decodeLogin(login)
        return login
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