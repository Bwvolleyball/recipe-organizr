package io.bwvolleyball.auth.annotations

import io.bwvolleyball.auth.domain.Login
import mu.KotlinLogging
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.client.HttpClientErrorException
import java.lang.annotation.Inherited

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@Inherited
@MustBeDocumented
annotation class Authenticated

@Aspect
@Component
class AuthenticatedAspect {

    private val logger = KotlinLogging.logger { }

    @Before(value = "@annotation(io.bwvolleyball.auth.annotations.Authenticated)")
    fun verifyAuthenticated(joinPoint: JoinPoint) {
        val logins = joinPoint.args.filter { it is Login }.map { it as Login }
        if (logins.isEmpty()) {
            logger.warn("""
                |The Authenticated annotation validates logins  before allowing work to be done.
                |  {} receives no Login object to validate!
                |  {} were the arguments received.
                |Verify this is intentional, and either add a Login to this function, or delete the @Authenticated.
            """.trimMargin(), joinPoint.toShortString(), joinPoint.args)
        } else {
            logins.forEach{
                if (!it.authenticated){
                    throw HttpClientErrorException(HttpStatus.UNAUTHORIZED)
                }
            }
        }
    }

}