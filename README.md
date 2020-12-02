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

## 프로필에서 영상 리스트가 다 출력 안됨... profile/video

## 모바일 렌더링 시 오류
- 프로필에서 태그 이미지 없을 때 컬러 div가 겹쳐서 보임..(모바일)

<hr/>

# 구현할 것

## float button (1순위)
### 글쓰기, 뒤로 버튼 float로 처리 (hidden 속성 사용)
- 뒤로 가기는 왼쪽 하단, 글쓰기 버튼은 오른쪽 하단(모바일, 태블릿 에서만!)
- 뒤로 가기 버튼은 App.js 하단에 설정

## 키워드별 영상 분류, 장바구니 (2순위) - 제일 빡셈ㅡㅡ

## 회원정보 설정에 국가 설정
- https://material-ui.com/components/autocomplete/#country-select

## tag로 검색 -> autocomplete 
- https://material-ui.com/components/autocomplete/

## loading 부분 skeleton component 사용

### Focus on next field when pressing enter React.js
- 이 부분 배포 전 처리하기 

## 이메일 관련 (배포 직전, 비디오, 알림부터 구현 하고!)
- Radio input은 처리 완료
- smtp 도메인 등록 후 관리자 => 회원은 설정 안 어려울 듯
- mailtrap or emailjs 써서 회원이 관리자한테 메일 보내기(틀린 양식일 때 전송 안되게 설정)
- mailgun 알아보기

## post 기능 (imgbot 학생 공짜 오퍼 이용)

<br/>
<hr/>

## 배포 후 진행할 것
- Name.com 도메인 처리
  - https://www.name.com/github-students
  - 주소는 musicsseolprise.rocks 로 예정
  - 아니면 musicsseolprise.band 
  - musicsseolprise.net
  - musicsseolprise.com

- 전체공개 페이지 (영상 정리)는 서버사이드로 전환 -> 검색엔진 최적화
- DM 기능 (배포 후에 넣기로 허락 완료)
- 주제별 채팅방??
  - customerly 사용해보기

- 다국어 기능 for foreign fans, 자막 서비스
- react native로 모바일 앱 제작

<hr/>

