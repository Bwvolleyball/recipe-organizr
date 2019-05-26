package io.bwvolleyball.auth.domain

import io.jsonwebtoken.Jwt
import io.jsonwebtoken.impl.DefaultClaims
import java.time.Clock
import java.time.Instant
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table


@Entity
@Table(name = "users")
data class User(@Id val userId: String, val email: String, val username: String, val name: String, val lastLogin: Instant = Instant.now(Clock.systemUTC()))
/**
 * A token parser that creates the domain objects from the raw token.
 */
class TokenParser {
    private lateinit var idToken: Jwt<*, DefaultClaims>
    private lateinit var accessToken: Jwt<*, DefaultClaims>

    fun idToken(idToken: Jwt<*, DefaultClaims>): TokenParser {
        this.idToken = idToken
        return this
    }

    fun accessToken(accessToken: Jwt<*, DefaultClaims>): TokenParser {
        this.accessToken = accessToken
        return this
    }

    fun build(): User {
        val accessTokenBody = accessToken.body
        val idTokenBody = idToken.body
        return User(accessTokenBody.get("uid", String::class.java),
                idTokenBody.get("email", String::class.java),
                idTokenBody.get("preferred_username", String::class.java),
                idTokenBody.get("name", String::class.java))
    }
}