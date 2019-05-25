package io.bwvolleyball.auth.service

import com.nimbusds.jose.jwk.RSAKey
import com.nimbusds.jose.util.Base64URL
import com.okta.jwt.JwtVerifiers
import io.bwvolleyball.auth.domain.Login
import io.bwvolleyball.auth.feign.OktaFeignClient
import io.jsonwebtoken.Jwt
import io.jsonwebtoken.Jwts
import org.springframework.stereotype.Service
import java.time.Duration


interface JwtService {
    fun decodeLogin(login: Login)
}

@Service
internal class JwtServiceImpl(private val oktaFeignClient: OktaFeignClient) : JwtService {
    // TODO: Should probably leverage this from the filter?
    override fun decodeLogin(login: Login) {
        val idToken = decodeTokenUnsecure(login.idToken)
        val accessToken = decodeTokenUnsecure(login.accessToken)

        // TODO: need to cache this signing key.
//        val jwtVerifier = JwtVerifiers.idTokenVerifierBuilder()
//                .setIssuer("https://dev-331898.okta.com/oauth2/default")
//                .setClientId("0oam1iayfZDqSKNw1356")
//                .setAudience("0oam1iayfZDqSKNw1356")      // defaults to 'api://default'
//                .setConnectionTimeout(Duration.ofSeconds(1)) // defaults to 1000ms
//                .setReadTimeout(Duration.ofSeconds(1)) // defaults to 1000ms
//                .build()
//        val jwt = jwtVerifier.decode(login.token, "brandon")
//        val oktaKey = oktaFeignClient.getKeys().keys.firstOrNull() ?: throw IllegalStateException("No signing keys were found!")
//        val keyFactory = KeyFactory.getInstance("RSA256")
//        val publicKey = keyFactory.generatePublic(RSAPublicKeySpec(DatatypeConverter.parseInteger(oktaKey.n), DatatypeConverter.parseInteger(oktaKey.e)))
//        val jwt = Jwts.parser().setSigningKey(publicKey).parse(login.token)

//        val rsaKey = RSAKey.Builder(Base64URL(oktaKey.n), Base64URL(oktaKey.e)).build()
//        val publicKey = rsaKey.toRSAPublicKey()
//        val jwt = Jwts.parser().setSigningKey(publicKey).parseClaimsJws(login.token)
        println("$idToken\n$accessToken")
    }

    /**
     * Okta's signing policy is tricky, and I have more important fish to fry, so we decode the token in an unsecured fashion.
     */
    private fun decodeTokenUnsecure(rawToken: String): Jwt<*, Any> {
        val tokenParts = rawToken.split('.')
        return Jwts.parser().parse("${tokenParts[0]}.${tokenParts[1]}.")
    }

}