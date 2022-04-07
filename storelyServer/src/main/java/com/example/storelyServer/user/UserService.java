package com.example.storelyServer.user;

import com.example.storelyServer.shortage.Shortage;
import com.example.storelyServer.shortage.ShortageSort;
import org.apache.lucene.search.Query;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EntityManager entityManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.entityManager = entityManager;
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono uzytkowika"));
    }

    public List<User> getUserSearchOldXD(String word, Integer offset) {
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<User> result = searchSession.search(User.class)
                .where(f -> f.match()
                        .fields("name","surname","email","group.name") //TODO:dodac grupe
                        .matching(word)
                        .fuzzy(2))
                .fetch(offset, 20);

        long totalHitCount = result.total().hitCount();
        List<User> hits = result.hits();

        return hits;
    }

    public List<User> getUserSearch(String word, Integer offset, UserSort sort) {
        SearchSession searchSession = Search.session(entityManager);
        if(word.length()>0) {
            SearchResult<User> result = searchSession.search(User.class)
                    .where(f -> f.match()
                            .fields("surname", "email", "name",
                                    "group.name")
                            .matching(word)
                            .fuzzy(2))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "surname_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
        else{
            SearchResult<User> result = searchSession.search(User.class)
                    .where(f->f.matchAll())
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "surname_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
    }





    public List<User> getUsers(Integer offset, String searchText) {

//        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(centityManager);
//        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(User.class).get();
//        Query luceneQuery = qb.keyword().fuzzy().withEditDistanceUpTo(1).withPrefixLength(1).onFields("name")
//                .matching(searchText).createQuery();
//
//        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, User.class);
//
//        // execute search
//
//        List<User> users = null;
//        try {
//            users = jpaQuery.getResultList();
//        } catch (NoResultException nre) {
//            ;// do nothing
//
//        }



        List<User> users = userRepository.findAll().stream()
                .filter(x -> x.getName() != null && x.getName().contains(searchText)).collect(Collectors.toList());

        if (offset * 10 + 10 < users.size()) {
            return users.subList(offset * 10, offset * 10 + 10);
        } else if (offset * 10 < users.size()) {
            return users.subList(offset * 10, users.size());
        }
        else{
            throw new ResponseStatusException(HttpStatus.NO_CONTENT,"To już wszystko");
        }
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Uzytkownik nie istnieje"));
    }

    public User getUserByEmail(String email) throws UsernameNotFoundException{
        return userRepository.findUserByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("Nie znaleziono uzytkowika"));
    }


    public void addNewUser(User user){
        Optional<User> userByEmail = userRepository
                .findUserByEmail(user.getEmail());
        if(userByEmail.isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Ten email jest już zajety");
        }
        System.out.println(user.getPassword());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public void updateUserByEmail(String email, UserPutDto user){
        User userToEdit = userRepository.findUserByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("Nieznany blad"));

        if(!passwordEncoder.matches(user.getPassword(), userToEdit.getPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Niepoprawne haslo");
        }

        if(user.getNewEmail()!=null){
            userToEdit.setEmail(user.getNewEmail());
        }
        if(user.getNewPassword()!=null){
            userToEdit.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(userToEdit);
    }

    public void updateUserById(Long id, User user){
        User userToEdit = userRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("Nie znaleziono uzytkowika"));

        if(user.getEmail()!=null){
            userToEdit.setEmail(user.getEmail());
        }
        if(user.getPassword()!=null){
            userToEdit.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if(user.getName()!=null){
            userToEdit.setName(user.getName());
        }
        if(user.getSurname()!=null){
            userToEdit.setSurname(user.getSurname());
        }
        if(user.getRole()!=null){
            //userToEdit.setRole(user.getRole());
        }
        if(user.getGroup()!=null){
            userToEdit.setGroup(user.getGroup());
        }

        userRepository.save(userToEdit);

    }

    public void deleteUser(Long userId){
        userRepository.findById(userId)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Uzytkownik nie istnieje"));
        userRepository.deleteById(userId);
    }



}
