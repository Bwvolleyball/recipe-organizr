package io.bwvolleyball.swagger.config


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.web.server.ErrorPage
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import springfox.documentation.spi.DocumentationType
import springfox.documentation.swagger.web.SwaggerResource
import springfox.documentation.swagger.web.SwaggerResourcesProvider

@Configuration
class SwaggerConfig(private val swaggerProperties: SwaggerProperties): WebMvcConfigurer {

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/not-found").setViewName("redirect:${swaggerProperties.ownDomain}/swagger-ui.html")
    }

    @Bean
    fun containerCustomizer(): WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>{
        return WebServerFactoryCustomizer { it.addErrorPages(ErrorPage(HttpStatus.NOT_FOUND, "/not-found")) }
    }

}

@Component
@Primary
class SwaggerAggregationController(private val swagger: SwaggerProperties): SwaggerResourcesProvider {
    override fun get(): MutableList<SwaggerResource> {
        return mutableListOf(
                authResources(),
                recipeResources(),
                cookbookResources()
        )
    }

    private fun authResources(): SwaggerResource {
        return genericResources("auth-service", "auth")
    }

    private fun recipeResources(): SwaggerResource {
        return genericResources("recipe-service", "recipe")
    }

    private fun cookbookResources(): SwaggerResource {
        return genericResources("cookbook-service", "cookbook")
    }

    private fun genericResources(name: String, prefix: String): SwaggerResource {
        return SwaggerResource().apply{
            this.name = name
            this.location = "http://$prefix${swagger.gatewayUrl}/v2/api-docs"
            swaggerVersion = DocumentationType.SWAGGER_2.version
        }
    }
}

@Component
@ConfigurationProperties("bwvolleyball.swagger")
class SwaggerProperties {

    lateinit var gatewayUrl: String
    lateinit var ownDomain: String
}