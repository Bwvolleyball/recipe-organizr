package io.bwvolleyball.auth.feign

import io.bwvolleyball.auth.domain.OktaKey
import io.bwvolleyball.auth.domain.OktaSigningKey
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping

@FeignClient(name = "oktaFeignClient", url = "https://\${bwvolleyball.auth.okta-domain}/oauth2")
interface OktaFeignClient {
    // https://dev-331898.okta.com/oauth2/default/v1/keys

    @GetMapping(path = ["/default/v1/keys"])
    fun getKeys(): OktaSigningKey
}