## post 구성
1. preview
2. header
3. body (여기도 매뉴가 들어감!)
  - media
  - comment
4. footer

## card style
- 배열에 후보수를 생성해서, math.random을 활용해서 배경 출력


## post view
- 영상일 경우 썸네일 클릭 시 유튜브 페이지로 접속
- 서브 매뉴
  - [공통] go to post (포스트 디테일 페이지)
  - 유튜브일때랑, post일때랑 따로 설정
    - youtube: [go to post, add favorite]
    - post: [go to post, edit, delete]
- 하트: 좋아요, 채팅창: 댓글 로딩하기(view more -> detail page 연결)

## 유튜브 iframe api

``` html
<iframe width="560" height="315" src="https://www.youtube.com/embed/AMM9gikcGdY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/TRZl3cVTwAY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```