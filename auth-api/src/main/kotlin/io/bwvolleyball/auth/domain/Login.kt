package io.bwvolleyball.auth.domain

data class Login(val authenticated: Boolean, val idToken: String, val accessToken: String)
