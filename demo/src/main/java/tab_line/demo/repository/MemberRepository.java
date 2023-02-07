package tab_line.demo.repository;

import java.util.List;
import java.util.Optional;

import tab_line.demo.domain.Member;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();
}
