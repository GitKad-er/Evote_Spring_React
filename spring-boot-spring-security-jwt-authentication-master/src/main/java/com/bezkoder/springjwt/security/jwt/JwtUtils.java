package com.bezkoder.springjwt.security.jwt;

import java.util.Date;

import com.bezkoder.springjwt.models.UserDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${bezkoder.app.jwtSecret}")
  private String jwtSecret;

  @Value("${bezkoder.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication) {

    UserDetail userPrincipal = (UserDetail) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getEmail()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public String getEmailFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException e) {
      logger.error("Clé JWT Invalide: {}", e.getMessage());
    } catch (MalformedJwtException e) {
      logger.error("Clé JWT invalide : {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("Clé JWT expirée: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("Clé JWT non reconnue: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("Clé JWT Inexistante: {}", e.getMessage());
    }

    return false;
  }
}
