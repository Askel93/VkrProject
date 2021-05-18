package com.example.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

import javax.annotation.Resource;

@Configuration
@EnableAuthorizationServer
public class OAuth2Config extends AuthorizationServerConfigurerAdapter {

    private final TokenStore tokenStore = new InMemoryTokenStore();

    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;

    @Resource(name = "accountService")
    private UserDetailsService userDetailsService;

    @Autowired
    private Environment env;

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints.authenticationManager(authenticationManager)
            .tokenStore(tokenStore)
            .userDetailsService(userDetailsService)
        ;
    }

    @SuppressWarnings("deprecation")
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) {
        security
            .tokenKeyAccess("permitAll()")
            .checkTokenAccess("permitAll()")
            .passwordEncoder(NoOpPasswordEncoder.getInstance())
        ;
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("account-service")
            .secret(env.getProperty("ACCOUNT_SERVICE_PASSWORD"))
            .scopes("server")
            .authorizedGrantTypes("client_credentials", "refresh_token")

            .and()
            .withClient("ship-service")
            .secret(env.getProperty("SHIP_SERVICE_PASSWORD"))
            .scopes("server")
            .authorizedGrantTypes("client_credentials", "refresh_token")

            .and()
            .withClient("excel-service")
            .secret(env.getProperty("EXCEL_SERVICE_PASSWORD"))
            .scopes("server")
            .authorizedGrantTypes("client_credentials", "refresh_token")

            .and()
            .withClient("browser")
            .authorizedGrantTypes("refresh_token", "password")
            .scopes("ui")
            .accessTokenValiditySeconds(180)
            .refreshTokenValiditySeconds(864000)
        ;
    }
}
