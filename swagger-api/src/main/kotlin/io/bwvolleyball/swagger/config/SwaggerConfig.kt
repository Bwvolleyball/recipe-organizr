package io.bwvolleyball.swagger.config


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import springfox.documentation.spi.DocumentationType
import springfox.documentation.swagger.web.SwaggerResource
import springfox.documentation.swagger.web.SwaggerResourcesProvider

class SwaggerConfig {

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
}