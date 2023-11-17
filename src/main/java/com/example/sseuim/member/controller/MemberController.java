package com.example.sseuim.member.controller;

import com.example.sseuim.member.domain.JoinVo;
import com.example.sseuim.member.domain.MemberVo;
import com.example.sseuim.member.service.MemberServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {

    private final MemberServiceImpl service;
    @Autowired
    public MemberController(MemberServiceImpl service){
        this.service = service;
    }
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @PostMapping("join")
    public int saveMember(@RequestBody MemberVo vo){

        logger.info("가입정보 ============>>> {}", vo);

        return service.saveMember(vo);
    }

    @GetMapping("idCheck")
    public int getIsDuple(@RequestParam String id ){
        int result = 0;

        try{

            if(!id.isEmpty()){
                result = service.getIdDuple(id);
            }else{
                throw  new NullPointerException("아이디를 입력해주세요");
            }

        }catch (Exception e){
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        logger.info("사용자 아이디 ====== > " + id);


        return result;
    }

}
