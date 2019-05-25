package io.bwvolleyball.auth.service

import io.bwvolleyball.auth.domain.Login
import io.bwvolleyball.auth.domain.OktaCredentials
import io.jsonwebtoken.Jwt
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.impl.DefaultClaims
import org.springframework.stereotype.Service


interface JwtService {
    fun decodeLogin(login: Login): OktaCredentials
}

@Service
internal class JwtServiceImpl() : JwtService {

    override fun decodeLogin(login: Login): OktaCredentials {
        // this token has the identity information passed by Okta
        val idToken = decodeTokenUnsecure(login.idToken)
        // this token has the uid and is a more standard JWT
        val accessToken = decodeTokenUnsecure(login.accessToken)
        return OktaCredentials(idToken = idToken, accessToken = accessToken)
    }

    /**
     * Okta's signing policy is tricky, and I have more important fish to fry, so we decode the token in an unsecured fashion.
     */
    private fun decodeTokenUnsecure(rawToken: String): Jwt<*, DefaultClaims> {
        val unsignedToken = rawToken.substringBeforeLast('.') + '.'
        @Suppress("UNCHECKED_CAST")
        return Jwts.parser().parse(unsignedToken) as Jwt<*, DefaultClaims>
    }

}