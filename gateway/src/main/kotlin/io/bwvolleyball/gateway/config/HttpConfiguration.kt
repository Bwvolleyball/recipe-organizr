package io.bwvolleyball.gateway.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.embedded.netty.NettyReactiveWebServerFactory
import org.springframework.boot.web.server.WebServer
import org.springframework.http.server.reactive.HttpHandler
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

@Component
class HttpConfiguration(private val httpHandler: HttpHandler, @Value("\${bwvolleyball.server.http-port}") private val httpPort: Int) {

    private lateinit var httpWebServer: WebServer

    @PostConstruct
    fun startHttp() {
        val factory = NettyReactiveWebServerFactory(httpPort)
        httpWebServer = factory.getWebServer(httpHandler)
        httpWebServer.start()
    }

    @PreDestroy
    fun stopHttp(){
        httpWebServer.stop()
    }

}