package tab_line.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import tab_line.demo.repository.MemoryMemberRepository;
import tab_line.demo.repository.MemberRepository;
import tab_line.demo.service.MemberService;

@Configuration
public class SpringConfig {
    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }
    
    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}
