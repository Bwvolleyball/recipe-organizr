package io.bwvolleyball.auth.domain

import io.jsonwebtoken.Jwt
import io.jsonwebtoken.impl.DefaultClaims

/**
 * A data class representing the key Okta signs our JWT tokens with.
 */
data class OktaCredentials(private val idToken: Jwt<*, DefaultClaims>, private val accessToken: Jwt<*, DefaultClaims>){

}