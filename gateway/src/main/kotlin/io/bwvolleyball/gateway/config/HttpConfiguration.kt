package io.bwvolleyball.gateway.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.embedded.netty.NettyReactiveWebServerFactory
import org.springframework.boot.web.server.WebServer
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.http.server.reactive.HttpHandler
import org.springframework.stereotype.Component
import java.net.URI
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

@Configuration
class HttpConfiguration(private val httpHandler: HttpHandler,
                        @Value("\${bwvolleyball.server.https-only}") private val httpsOnly: Boolean,
                        @Value("\${bwvolleyball.server.http-port}") private val httpPort: Int,
                        @Value("\${bwvolleyball.server.public-https-port}") private val httpsPort: Int
) {

    private lateinit var httpWebServer: WebServer

    @PostConstruct
    fun startHttp() {
        val factory = NettyReactiveWebServerFactory(httpPort)
        httpWebServer = if (httpsOnly){
            factory.getWebServer {
                request, response ->
                val httpUri = request.uri
                val httpsUri = URI("https", httpUri.userInfo, httpUri.host, httpsPort, httpUri.path, httpUri.query, httpUri.fragment)
                response.statusCode = HttpStatus.MOVED_PERMANENTLY
                response.headers.location = httpsUri
                response.setComplete()
            }
        } else {
            factory.getWebServer(httpHandler)
        }
//        httpWebServer = factory.getWebServer(httpHandler)
        httpWebServer.start()
    }

    @PreDestroy
    fun stopHttp(){
        httpWebServer.stop()
    }

}