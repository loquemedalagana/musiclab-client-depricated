## app structure
<ul>
    <li>User</li>
    <li>Media(Youtube)</li>
    <li>Post</li>
</ul>

## 야다 전인혁의 뮤직 썰! 프라이즈(기본 기능) - client
- 전인혁, 야다 관련 유튜브 영상 분류
- 내가 보고 싶은 인혁 영상만 저장!
- 회원 커버곡 인혁 피드백 제공
- 인혁 관련 새 영상 나올 시 이메일로 알림옴(공식채널/일반영상 분리)
- 기존 팬카페처럼 커뮤니티 게시판 기능 제공

## 요구사항 정리
- focus를 Yada보다 전인혁Band에 두기
- 덕질 등 진지하지 않은(?) 용어 사용 지양
- 복잡한 interface는 피하기!

<hr/>

## 영상 미디어 UI 구현
- 리스트
- 개별 컴포넌트 따로 분류 -> card에 thumbnail, 설명 기록 ()


<hr/>

# 오류 사항

## 모바일 렌더링 시 오류
- 프로필에서 태그 이미지 없을 때 컬러 div가 겹쳐서 보임..(모바일)

<hr/>

### Focus on next field when pressing enter React.js
- 이 부분 배포 전 처리하기 

## 이메일 관련 (배포 직전, 비디오, 알림부터 구현 하고!)
- Radio input은 처리 완료
- smtp 도메인 등록 후 관리자 => 회원은 설정 안 어려울 듯
- mailtrap or emailjs 써서 회원이 관리자한테 메일 보내기(틀린 양식일 때 전송 안되게 설정)

## 배포 후 진행할 것
- 전체공개 페이지 (영상 정리)는 서버사이드로 전환 -> 검색엔진 최적화
- DM 기능 (배포 후에 넣기로 허락 완료)
- 주제별 채팅방??
- 다국어 기능 for foreign fans, 자막 서비스
- react native로 모바일 앱 제작

<hr/>

