package io.bwvolleyball.auth.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "bwvolleyball.auth")
class AuthProperties{
    lateinit var oktaDomain: String
}