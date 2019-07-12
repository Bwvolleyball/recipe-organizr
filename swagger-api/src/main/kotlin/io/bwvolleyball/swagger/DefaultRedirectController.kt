//package io.bwvolleyball.swagger
//
//import mu.KotlinLogging
//import org.springframework.stereotype.Controller
//import org.springframework.web.bind.annotation.RequestMapping
//
//@Controller
//class DefaultRedirectController{
//
//    private val logger = KotlinLogging.logger {}
//
//    @RequestMapping("/**")
//    fun redirect(): String {
//        logger.warn("Received a request for an unknown path, redirecting to the Swagger UI.")
//        return "forward:/swagger-ui.html"
//    }
//}