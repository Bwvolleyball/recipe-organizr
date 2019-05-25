package io.bwvolleyball.auth.domain

data class OktaSigningKey(val keys: List<OktaKey>)

/**
 * A data class representing the key Okta signs our JWT tokens with.
 */
data class OktaKey(val kty: String, val alg: String, val kid: String, val use: String, val e: String, val n: String)