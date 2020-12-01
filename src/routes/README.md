## Route 다시 리팩토링하기

## Route types
#### 1. Route -> 회원 비회원 모두 똑같은 페이지 출력
#### 2. IsNotLoggedInRoute -> 로그인 안된 회원만 열람가능
#### 3. MemberRoute -> 등업된 회원만 열람가능
#### 4. NonMemberRoute -> 등업되지 않은 회원만 열람가능
  - NonMemberRoute -> 아직 등업 안한 유저
  - NonMemberRouteWithoutEmail -> sns로그인 유저 중 메일 등록 안한 유저
  - TokenRoute -> 비번찾기, 등급업 전용 루트

#### 5. VideoRoute 회원 비회원 모두 가능하나 다르게 출력
  - 로딩 상태일 땐 로딩 컴포넌트 출력
  - 쿼리에서 유저정보가 있지만, 검사 반드시 하자!!

<hr/>

## Query Route types
### 1) Video (VideoRoute0)
#### 0. 공통 쿼리
- userId에 값이 들어 있으면? 검사한다.

#### 1. /officialchannel/jihbandofficial, or /musicsseolpriseofficial (공식 채널)
- 공식 채널(배열에다가 채널 데이터 저장)

#### 2. /videolistbykeywords (키워드 기반)
- 비공식 채널, 키워드별로 분류함

#### 3. your video list (내 비디오 리스트) -> 회원만 접근 가능
- 유저 프로필 -> liked videos 에서 more클릭
- 내 프로필에서? -> 내 영상 리스트 클릭!

### 2) Post (MemberRoute)
  - 