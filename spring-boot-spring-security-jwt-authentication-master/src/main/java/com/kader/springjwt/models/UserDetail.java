package com.kader.springjwt.models;

import java.util.*;

import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity

@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "firstname"),
                @UniqueConstraint(columnNames = "email")
        })
@NoArgsConstructor
public class UserDetail implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  @Size(max = 20)
  private String firstname;
  private String lastname;
  private Date birthdate;

  private int age;
  private char sex;
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;
  @NotBlank
  @Size(max = 120)
  private String password;

  @Enumerated(EnumType.STRING)
  private ERole eRole;
  private Boolean locked = false;
  private Boolean enabled = false;


  //Relation Avec BulletinVotes
  @OneToMany(mappedBy = "userDetail")
  List<BulletinVote> bulletinVotes;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  //private Collection<? extends GrantedAuthority> authorities;

  public UserDetail(Long id, String firstname, String lastname, Date birthdate, int age ,String email, String password, ERole eRole
                    //    Collection<? extends GrantedAuthority> authorities
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
    this.eRole = eRole;
    //this.authorities = authorities;
  }

  /*public static UserDetail build(UserDetail userDetailsImpl) {
    List<GrantedAuthority> authorities = userDetailsImpl.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetail(
            userDetailsImpl.getId(),
            userDetailsImpl.getUsername(),
            userDetailsImpl.getEmail(),
            userDetailsImpl.getPassword());

            //authorities);
  }*/


  public UserDetail(String firstname,
                    String email,
                    String password,
                    ERole eRole) {
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.eRole = eRole;
  }
  public UserDetail(String firstname, String lastname, Date birthdate, int age , char sex, String email, String password
                    //    Collection<? extends GrantedAuthority> authorities
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.age = age;
    this.sex = sex;
    this.email = email;
    this.password = password;
    //this.authorities = authorities;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority =
            new SimpleGrantedAuthority(eRole.name());
    return Collections.singletonList(authority);
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return null;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public Date getBirthdate() {
    return birthdate;
  }

  public int getAge() {
    return age;
  }

  public char getSex() {
    return sex;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !locked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }




  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }


  public void setEmail(String email) {
    this.email = email;
  }



  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public void setBirthdate(Date birthdate) {
    this.birthdate = birthdate;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public void setSex(char sex) {
    this.sex = sex;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetail user = (UserDetail) o;
    return Objects.equals(id, user.id);
  }
}
