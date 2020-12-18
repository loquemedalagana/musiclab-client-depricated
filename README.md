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

## 모바일에서 프사 올릴 시 에러 뜸..
  - 서버 콘솔에 뜨지 않는거 보니, 클라이언트단 코드 손봐야 할 듯\
  - (참고) https://github.com/chengsmart/react-file-upload-mobile/blob/master/source/react-file-upload-mobile/index.tsx

<hr/>

# 구현할 것

## float button (1순위)
### 글쓰기, 뒤로 버튼 float로 처리 (hidden 속성 사용)
- 뒤로 가기 버튼은 appbar에 설정 (완료)
- 글쓰기 버튼은 오른쪽 하단에 (Create Icon 사용)
  - https://material-ui.com/components/speed-dial/ 이용하기
- 모바일에서 검색 아이콘 매뉴바 왼쪽에(투명으로)
- 매뉴바(모바일) 알림 표시하기 (!!!)

## 글쓰기, 댓글 UI 만들기

## 자동 로그인 구현 (local storage 사용)

## 키워드별 영상 분류, 장바구니 

## 영상 등록하기 버튼 클릭

## 회원정보 설정에 국가 설정
- https://material-ui.com/components/autocomplete/#country-select

## tag로 검색 -> autocomplete 
- https://material-ui.com/components/autocomplete/

## loading 부분 skeleton component 사용

### Focus on next field when pressing enter React.js
- 처리 완료(회원가입, 로그인, 등업), 비번찾기모달, 비번바꾸는페이지까지
- **정보수정(역모듈화 하기), 모달이메일엔 아직 못함**

## My Video List 위치는 어디에?

## UX 개선을 위해 not found 페이지에서 setTimeOut 적용 후 메인 화면으로 돌리기(완료)

## 에러 stack 부분 차례대로 바꿔주기

## 레벨업 후 자동 로그인 되는지 안 되는지 시험
  - 유효한 링크이면 로그인 처리해주자.

## 이메일 관련 (배포 직전, 비디오, 알림부터 구현 하고!) - 문의 부분
- 이메일 등록된 유저만 사용 가능
- selector를 이용해서 이메일 등록 안되면 클릭 안됨
- input onchange에서 email onchange event 없애기

- Radio input은 처리 완료
- smtp 도메인 등록 후 관리자 => 회원은 설정 안 어려울 듯
- mailtrap or emailjs 써서 회원이 관리자한테 메일 보내기(틀린 양식일 때 전송 안되게 설정)
- mailgun 알아보기

## post 기능 (imgbot 학생 공짜 오퍼 이용)

## 댓글 입력 시 화면을 가장 밑으로 내리기

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

